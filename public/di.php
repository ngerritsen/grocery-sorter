<?php
declare(strict_types=1);

use Groceries\Service\Grocery as GroceryService;
use Groceries\Service\Section as SectionService;
use Groceries\Controller\Grocery as GroceryController;
use Groceries\Controller\Section as SectionController;
use League\Container\Container;
use Slim\App;
use Slim\CallableResolver;

$config = require(__DIR__ . '/../etc/config.php');

$container = new Container();

$container->add(App::class, function () use ($config, $container) {
    $config['slim']['callableResolver'] = new CallableResolver($container);
    return new App($config['slim']);
});

$container->add(PDO::class, function () use ($config) {
    $mysqlConfig = $config['mysql'];
    $pdo = new PDO(
        'mysql:host=' . $mysqlConfig['host'] . ';dbname=groceries',
        $mysqlConfig['user'],
        $mysqlConfig['password']
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
});

$container->add(SectionService::class)->withArgument(PDO::class);
$container->add(GroceryService::class)->withArgument(PDO::class);
$container->add(SectionController::class)->withArguments([SectionService::class, GroceryService::class]);
$container->add(GroceryController::class)->withArgument(GroceryService::class);

return $container;
