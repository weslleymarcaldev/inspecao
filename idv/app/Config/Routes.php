<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

// Página inicial (SPA ou landing)
$routes->get('/', 'Home::index');

// Rota de análise com ID opcional (GET ou POST se quiser flexibilizar)
$routes->post('api/analyze/(:num)', 'AnalysisController::salvar/$1');
$routes->post('api/analyze', 'AnalysisController::salvar'); // sem ID

// Rota coringa para SPA React
$routes->get('(:any)', 'Home::index');

$routes->get('api/inspections', 'InspectionsController::index');
$routes->get('health', function () {
  return 'ok';
});
