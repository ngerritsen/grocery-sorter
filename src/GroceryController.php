<?php
declare(strict_types=1);

namespace Groceries;

use Slim\Http\Request;
use Slim\Http\Response;

class GroceryController
{
    /** @var GroceryService */
    private $groceryService;

    public function __construct(GroceryService $groceryService)
    {
        $this->groceryService = $groceryService;
    }

    public function move(Request $request, Response $response, array $args): Response
    {
        $section = $request->getParsedBody()['section'];

        $this->groceryService->move($args['grocery'], $section);

        $response->getBody()->write('{"success":true}');

        return $response;
    }

    public function delete(Request $request, Response $response, array $args): Response
    {
        $this->groceryService->delete($args['grocery']);

        $response->getBody()->write('{"success":true}');

        return $response;
    }
}
