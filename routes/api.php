<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckoutMonitoringController;

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::apiResource('products', ProductController::class);
Route::get('products/search', [ProductController::class, 'search']);

Route::apiResource('cart', CartController::class)->only(['index', 'store', 'destroy']);
Route::post('checkout', [OrderController::class, 'store']);



// Apply Sanctum's stateful middleware and then authentication
Route::middleware([EnsureFrontendRequestsAreStateful::class, 'auth:sanctum'])->group(function () {
    // Protected routes for authenticated users
    Route::get('/checkouts', [CheckoutMonitoringController::class, 'index']);
    Route::get('/checkouts/{id}', [CheckoutMonitoringController::class, 'show']);
    Route::get('/checkouts/filter/{date}', [CheckoutMonitoringController::class, 'filterByDate']);
});

// Public routes for registration and login (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');