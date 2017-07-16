<?php
declare(strict_types=1);

namespace Groceries\Controller;

use Slim\Http\Request;
use Slim\Http\Response;
use Groceries\Service\Grocery as GroceryService;

class Grocery
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

        return $this->withSuccess($response);
    }

    public function delete(Request $request, Response $response, array $args): Response
    {
        $this->groceryService->delete($args['grocery']);

        return $this->withSuccess($response);
    }

    private function withSuccess(Response $response): Response
    {
        $response->getBody()->write('{"success":true}');

        return $response;
    }
}
