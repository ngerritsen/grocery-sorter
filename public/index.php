<?php

use Groceries\HomeController;
use Groceries\SectionController;
use Slim\App;

require __DIR__ . '/../vendor/autoload.php';
$container = require(__DIR__ . '/di.php');

$app = $container->get(App::class);

$app->get('/', HomeController::class . ':get');
$app->post('/sections/group', SectionController::class . ':group');
$app->post('/sections', SectionController::class . ':store');

$app->run();
