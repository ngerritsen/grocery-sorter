<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

require __DIR__ . '/../vendor/autoload.php';

$app = new App();

$app->get('/', function (Request $request, Response $response) {
    return serveFile($response, __DIR__ . '/index.html');
});

function serveFile(Response $response, string $filename) {
    $html = file_get_contents($filename);

    $response->getBody()->write($html);

    return $response;
}

$app->run();
