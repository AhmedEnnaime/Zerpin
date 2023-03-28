<?php

use App\Http\Controllers\API\CandidateController;
use App\Http\Controllers\API\ContractController;
use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\HolidayController;
use App\Http\Controllers\API\PayslipController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\RecrutmentController;
use App\Http\Controllers\API\RulesController;
use App\Models\Holiday;
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

Route::resource('candidates', CandidateController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('users', [UserController::class, 'index']);
    Route::get('userAuth', [UserController::class, 'getAuthUser']);
    Route::delete('delete/{id}', [UserController::class, 'destroy']);
    Route::resource('departments', DepartmentController::class);
    Route::resource('recrutments', RecrutmentController::class);
    Route::post('updateState/{id}', [CandidateController::class, 'updateState']);
    Route::resource('rules', RulesController::class);
    Route::resource('contracts', ContractController::class);
    Route::post('renewContract/{id}', [ContractController::class, 'updateContract']);
    Route::resource('holidays', HolidayController::class);
    Route::patch('validateHoliday/{id}', [HolidayController::class, 'validateHoliday']);
    Route::patch('rejectHoliday/{id}', [HolidayController::class, 'rejectHoliday']);
    Route::resource('payslips', PayslipController::class);
    Route::post('createPayslip/{id}', [PayslipController::class, 'createPayslip']);
});
