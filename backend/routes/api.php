<?php

use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RecrutmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(UserController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('userAuth', [UserController::class, 'getAuthUser']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
    Route::resource('departments', DepartmentController::class);
    Route::resource('recrutments', RecrutmentController::class);
});
