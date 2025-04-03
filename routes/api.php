<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CheckoutMonitoringController;

Route::apiResource('products', ProductController::class);
Route::get('products/search', [ProductController::class, 'search']);

Route::apiResource('cart', CartController::class)->only(['index', 'store', 'destroy']);
Route::post('checkout', [OrderController::class, 'store']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/checkouts', [CheckoutMonitoringController::class, 'index']);
    Route::get('/checkouts/{id}', [CheckoutMonitoringController::class, 'show']);
    Route::get('/checkouts/filter/{date}', [CheckoutMonitoringController::class, 'filterByDate']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');