<?php
declare(strict_types=1);

namespace Groceries;

use Closure;
use PDO;

class GroceryService
{
    /** @var PDO */
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function store($groceries, $sectionId) {
        $values = array_map($this->groceryToValue($sectionId), $groceries);
        $valuesString = implode(',', $values);

        $statement = $this->pdo->prepare(<<<MYSQL
            INSERT INTO grocery(name, section_id)
            VALUES ${valuesString}
            ON DUPLICATE KEY UPDATE section_id=:sectionId
MYSQL
        );

        $statement->execute([ ':sectionId' => $sectionId ]);
    }

    /**
     * @param $sectionId
     * @return Closure
     */
    private function groceryToValue($sectionId): Closure
    {
        return function ($grocery) use ($sectionId) {
            return '("' . $grocery . '", ' . $sectionId . ')';
        };
    }
}
