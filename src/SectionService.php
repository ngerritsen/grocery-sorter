<?php
declare(strict_types=1);

namespace Groceries;

use PDO;

class SectionService
{
    /** @var PDO */
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function group(array $groceries): array
    {
        $groceryPlaceholders = $this->generatePlaceholders($groceries);

        $statement = $this->pdo->prepare(<<<MYSQL
            SELECT s.name as section, g.name as grocery, s.color as color
            FROM grocery as g
            INNER JOIN section as s
            ON g.section_id = s.id
            WHERE g.name IN ({$groceryPlaceholders});
MYSQL
        );

        $statement->execute($groceries);
        $results = $statement->fetchAll();

        return $this->decorateGroceriesWithSections($results, $groceries);
    }

    public function store(string $name, int $color): string
    {
        $statement = $this->pdo->prepare(<<<MYSQL
            INSERT INTO section(name, color)
            VALUES (:name, :color)
            ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id), color=:color;
MYSQL
        );

        $statement->execute([
            ':name' => $name,
            ':color' => $color
        ]);

        return $this->pdo->lastInsertId();
    }

    private function generatePlaceholders(array $groceries): string {
        $placeholders = array_map(function (): string {
            return '?';
        }, $groceries);

        return implode(', ', $placeholders);
    }

    private function decorateGroceriesWithSections(array $results, array $groceries): array {
        return array_map(function (string $grocery) use ($results): array {
            $resolvedGrocery = [
                'name' => $grocery,
                'section' => null
            ];

            $foundGroceries = array_filter($results, function (array $result) use ($grocery): bool {
                return $grocery === $result['grocery'];
            });

            if (count($foundGroceries) > 0) {
                $resolvedGrocery['section'] = array_values($foundGroceries)[0]['section'];
            }

            return $resolvedGrocery;
        }, $groceries);
    }
}
