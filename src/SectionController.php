<?php
declare(strict_types=1);

namespace Groceries;

use PDO;

class SectionController
{
    /** @var PDO */
    private $pdo;

    public function __construct(PDO $pdo) {

        $this->pdo = $pdo;
    }

    public function post()
    {
        $result = $this->pdo->query('SELECT * FROM grocery');
        var_dump($result->fetch());
    }
}
