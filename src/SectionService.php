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

    public function getAll()
    {
        $statement = $this->pdo->query('SELECT name, color FROM section');

        $results = $statement->fetchAll();

        return array_map(function (array $result): array {
            return [
                'name' => $result[0],
                'color' => $result[1]
            ];
        }, $results);
    }
}
