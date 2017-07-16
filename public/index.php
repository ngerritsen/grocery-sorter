<?php

use Groceries\Controller\Grocery as GroceryController;
use Groceries\Controller\Home as HomeController;
use Groceries\Controller\Section as SectionController;
use Slim\App;

require __DIR__ . '/../vendor/autoload.php';
$container = require(__DIR__ . '/di.php');

$app = $container->get(App::class);

$app->get('/', HomeController::class . ':get');
$app->post('/sections/populate', SectionController::class . ':populate');
$app->post('/sections/reorder', SectionController::class . ':reorder');
$app->delete('/sections/{section}', SectionController::class . ':delete');
$app->post('/sections/{section}', SectionController::class . ':add');
$app->post('/groceries/{grocery}', GroceryController::class . ':move');
$app->delete('/groceries/{grocery}', GroceryController::class . ':delete');

$app->run();
