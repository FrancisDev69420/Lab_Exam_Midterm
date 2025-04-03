<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\Product;
use App\Models\Cart;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request -> validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|string|max:255',
        ]);

        $cartItems = Cart::all();

        if($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $totalPrice = 0;

        foreach ($cartItems as $item) {
            $product = Product::find($item->product_id);

            // Prevent checkout if stock is insufficient
            if ($product->stock < $item->quantity) {
                return response()->json(['error' => "Not enough stock for {$product->name}."], 400);
            }

            $totalPrice += $product->price * $item->quantity;
            $product->stock -= $item->quantity; // Deduct stock
            $product->save();
        }

        $order = Order::create([
            'customer_name' => $request->customer_name,
            'customer_email' => $request->customer_email,
            'total_price' => $totalPrice,
        ]);

        // Clear the cart after successful order
        Cart::truncate();
        return response()->json(['message' => 'Order placed successfully!', 'order' => $order], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
