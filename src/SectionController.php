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

        $groupedGroceries = $this->groceryService->group($groceries);
        $allSections = $this->sectionService->getAll();

        $response->getBody()->write(json_encode([
            'groceries' => $groupedGroceries,
            'sections' => $allSections
        ]));

        return $response;
    }
}
