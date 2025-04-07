<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckoutMonitoringController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Http\Request;

Route::apiResource('products', ProductController::class);
Route::get('products/search', [ProductController::class, 'search']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::get('/cart', [CartController::class, 'getCartItems']);
    Route::put('/cart/{id}', [CartController::class, 'updateCartItem']);
    Route::delete('/cart/{id}', [CartController::class, 'removeFromCart']);
});
Route::post('checkout', [OrderController::class, 'store']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/checkouts', [CheckoutMonitoringController::class, 'index']);
    Route::get('/checkouts/{id}', [CheckoutMonitoringController::class, 'show']);
    Route::get('/checkouts/filter/{date}', [CheckoutMonitoringController::class, 'filterByDate']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');