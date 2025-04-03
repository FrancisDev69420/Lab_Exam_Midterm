<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;

Route::apiResource('products', ProductController::class);
Route::get('products/search', [ProductController::class, 'search']);

Route::apiResource('cart', CartController::class)->only(['index', 'store', 'destroy']);
Route::post('checkout', [OrderController::class, 'store']);