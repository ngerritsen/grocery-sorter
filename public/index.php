<?php

use Groceries\HomeController;
use Groceries\SectionController;
use Slim\App;

require __DIR__ . '/../vendor/autoload.php';
$container = require(__DIR__ . '/../app/di.php');

$app = $container->get(App::class);

$app->get('/', HomeController::class . ':get');
$app->get('/test', SectionController::class . ':post');

$app->run();
