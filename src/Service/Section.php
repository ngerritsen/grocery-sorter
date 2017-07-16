<?php
declare(strict_types=1);

namespace Groceries\Service;

use PDO;

class Section
{
    /** @var PDO */
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function add(string $name, string $color)
    {
        $statement = $this->pdo->prepare(<<<MYSQL
            INSERT INTO section (name, color, position)
            VALUES (:name, :color, (SELECT MAX(s.position) FROM section as s) + 1)
MYSQL
);

        $statement->execute([
            ':name' => $name,
            ':color' => $color
        ]);
    }

    public function delete(string $name)
    {
        $statement = $this->pdo->prepare('DELETE FROM section WHERE name = :name');
        $statement->execute([ ':name' => $name ]);
    }

    public function populateSections(array $groceriesWithSections): array
    {
        $statement = $this->pdo->query('SELECT name, color FROM section ORDER BY position');

        $results = $statement->fetchAll();

        $sections = array_map(function (array $result): array {
            return [
                'name' => $result[0],
                'color' => $result[1]
            ];
        }, $results);

        return $this->assingGroceriesToSections($groceriesWithSections, $sections);
    }

    public function reorder(array $sections)
    {
        $sectionValues = $this->generateSectionValues($sections);

        $this->pdo->query('UPDATE section SET position = null');
        $this->pdo->query(<<<MYSQL
            INSERT INTO section (name, color, position)
            VALUES {$sectionValues}
            ON DUPLICATE KEY UPDATE position = VALUES(position)
MYSQL
);
    }

    private function assingGroceriesToSections(array $groceriesWithSections, array $sections): array
    {
        return array_map(function (array $section) use ($groceriesWithSections): array {
            $section['groceries'] = $this->getGroceriesForSection($groceriesWithSections, $section['name']);

            return $section;
        }, $sections);
    }

    private function getGroceriesForSection(array $groceriesWithSections, string $sectionName): array
    {
        $groceriesForSection = array_filter($groceriesWithSections, function (array $grocery) use ($sectionName): bool {
            return isset($grocery['section']) && $grocery['section'] === $sectionName;
        });

        return $this->extractGroceryNames($groceriesForSection);
    }

    private function extractGroceryNames(array $groceries): array {
        return array_map(function (array $grocery): array {
            return [ 'name' => $grocery['name'] ];
        }, $groceries);
    }

    private function generateSectionValues(array $sections): string
    {
        $valueStrings = [];

        foreach($sections as $position => $section) {
            $valueStrings[] = '("' . $section . '", "fff", ' . $position . ')';
        }

        return implode(', ', $valueStrings);
    }
}
