<?php
declare(strict_types=1);

namespace Groceries\Service;

use Closure;
use PDO;

class Grocery
{
    /** @var PDO */
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function move($grocery, $section) {
        $statement = $this->pdo->prepare(<<<MYSQL
            INSERT INTO grocery(name, section_id)
            VALUES (:name, (SELECT id FROM section WHERE name = :section))
            ON DUPLICATE KEY UPDATE section_id = (SELECT id FROM section WHERE name = :section)
MYSQL
        );

        $statement->execute([
            ':name' => $grocery,
            ':section' => $section
        ]);
    }

    public function delete(string $grocery) {
        $statement = $this->pdo->prepare('DELETE FROM grocery WHERE name=:name');
        $statement->execute([ ':name' => $grocery ]);
    }

    public function addSections(array $groceries): array
    {
        $groceryPlaceholders = $this->generatePlaceholders($groceries);

        $statement = $this->pdo->prepare(<<<MYSQL
            SELECT s.name AS section, g.name AS grocery
            FROM grocery AS g
            INNER JOIN section AS s
            ON g.section_id = s.id
            WHERE g.name IN ({$groceryPlaceholders})
MYSQL
        );

        $statement->execute($groceries);
        $results = $statement->fetchAll();

        return $this->decorateGroceriesWithSections($results, $groceries);
    }

    private function generatePlaceholders(array $groceries): string {
        $placeholders = array_map(function (): string {
            return '?';
        }, $groceries);

        return implode(', ', $placeholders);
    }

    private function decorateGroceriesWithSections(array $results, array $groceries): array {
        return array_map(function (string $grocery) use ($results): array {
            $resolvedGrocery = [ 'name' => $grocery ];

            $foundGroceries = array_filter($results, function (array $result) use ($grocery): bool {
                return $grocery === $result['grocery'];
            });

            if (count($foundGroceries) > 0) {
                $foundGrocery = array_values($foundGroceries)[0];
                $resolvedGrocery['section'] = $foundGrocery['section'];
            }

            return $resolvedGrocery;
        }, $groceries);
    }

    public function getGroceriesWithoutSection(array $groceriesWithSections): array
    {
        return array_values(array_filter($groceriesWithSections, function (array $grocery): bool {
            return !isset($grocery['section']);
        }));
    }

    public function deleteForSection(string $section)
    {
        $statement = $this->pdo->prepare(<<<MYSQL
          DELETE FROM grocery
          WHERE section_id = (SELECT id FROM section WHERE name = :section)
MYSQL
        );

        $statement->execute([ ':section' => $section ]);
    }
}
