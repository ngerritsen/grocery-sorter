<?php
declare(strict_types=1);

namespace Groceries;

use Slim\Http\Request;
use Slim\Http\Response;

class SectionController
{
    /** @var SectionService */
    private $sectionService;

    /** @var GroceryService */
    private $groceryService;

    public function __construct(SectionService $sectionService, GroceryService $groceryService) {
        $this->sectionService = $sectionService;
        $this->groceryService = $groceryService;
    }

    public function group(Request $request, Response $response): Response
    {
        $groceries = $request->getParsedBody();

        $groupedGroceries = $this->sectionService->group($groceries);

        $response->getBody()->write(json_encode($groupedGroceries));

        return $response;
    }

    public function store(Request $request, Response $response): Response
    {
        $section = $request->getParsedBody();
        $groceries = $section['groceries'];

        $sectionId = $this->sectionService->store($section['name'], $section['color']);

        if (count($groceries) > 0) {
            $this->groceryService->store($section['groceries'], $sectionId);
        }

        return $response->withStatus(200);
    }
}
