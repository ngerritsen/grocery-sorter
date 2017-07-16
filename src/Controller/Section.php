<?php
declare(strict_types=1);

namespace Groceries\Controller;

use Slim\Http\Request;
use Slim\Http\Response;
use Groceries\Service\Grocery as GroceryService;
use Groceries\Service\Section as SectionService;

class Section
{
    /** @var SectionService */
    private $sectionService;

    /** @var GroceryService */
    private $groceryService;

    public function __construct(SectionService $sectionService, GroceryService $groceryService) {
        $this->sectionService = $sectionService;
        $this->groceryService = $groceryService;
    }

    public function add(Request $request, Response $response, array $args): Response
    {
        $body = $request->getParsedBody();

        $this->sectionService->add($args['section'], $body['color']);

        return $this->withSuccess($response);
    }

    public function delete(Request $request, Response $response, array $args): Response
    {
        $this->groceryService->deleteForSection($args['section']);
        $this->sectionService->delete($args['section']);

        return $this->withSuccess($response);
    }

    public function reorder(Request $request, Response $response): Response
    {
        $sections = $request->getParsedBody();

        $this->sectionService->reorder($sections);

        return $this->withSuccess($response);
    }

    public function populate(Request $request, Response $response): Response
    {
        $groceries = $request->getParsedBody();

        $groceriesWithSections = $this->groceryService->addSections($groceries);
        $allSections = $this->sectionService->populateSections($groceriesWithSections);

        $response->getBody()->write(json_encode([
            'sections' => $allSections,
            'groceries' => $this->groceryService->getGroceriesWithoutSection($groceriesWithSections)
        ]));

        return $response;
    }

    private function withSuccess(Response $response): Response
    {
        $response->getBody()->write('{"success":true}');

        return $response;
    }
}
