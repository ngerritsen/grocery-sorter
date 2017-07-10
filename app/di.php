<?php
declare(strict_types=1);

use Groceries\SectionController;
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
    return new PDO(
        'mysql:host=' . $mysqlConfig['host'] . ';dbname=groceries',
        $mysqlConfig['user'],
        $mysqlConfig['password']
    );
});

$container->add(SectionController::class)->withArgument(PDO::class);

return $container;
