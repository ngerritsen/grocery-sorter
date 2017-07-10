<?php
declare(strict_types=1);

namespace Groceries;

use Slim\Http\Request;
use Slim\Http\Response;

class HomeController
{
    public function get(Request $request, Response $response): Response
    {
        $html = file_get_contents(__DIR__ . '/../public/index.html');

        $response->getBody()->write($html);

        return $response;
    }
}
