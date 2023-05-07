<?php

namespace Config;

use App\Controllers\WordlePlusController;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('WordlePlusController');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
$routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', [WordlePlusController::class, 'index']);

$routes->post('Solve', [WordlePlusController::class, 'Solve']);
$routes->post('ChangeDictionary', [WordlePlusController::class, 'ChangeDictionary']);

$routes->post('FilterByInput', [WordlePlusController::class, 'FilterByInput']);
$routes->post('FilterByKeys', [WordlePlusController::class, 'FilterByKeys']);

$routes->post('RandomSolve', [WordlePlusController::class, 'RandomSolve']);
$routes->post('NewGame', [WordlePlusController::class, 'NewGame']);

$routes->post('NewArcade', [WordlePlusController::class, 'NewArcade']);
$routes->post('GetArcadeClue', [WordlePlusController::class, 'GetArcadeClue']);

$routes->post('SaveArcade', [WordlePlusController::class, 'SaveArcade']);
$routes->post('SubmitGuess', [WordlePlusController::class, 'SubmitGuess']);

$routes->post('PostGame', [WordlePlusController::class, 'PostGame']);
$routes->post('FillLeaderboard', [WordlePlusController::class, 'FillLeaderboard']);

$routes->post('TEST', [WordlePlusController::class, 'TEST']);
$routes->post('startDaily', [WordlePlusController::class, 'startDaily']);

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
