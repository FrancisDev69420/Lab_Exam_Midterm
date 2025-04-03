<?php

namespace App\Http\Controllers;
use App\Models\Cart;
use App\Models\Product;

use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Cart::with('products')->get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Product validation if product is existing and quantity is valid.
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findorFail($request->product_id);

        if($product -> stock >= $request -> quantity) {
            //Add item to cart if product is available
            $cart = Cart::create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);

            return response()->json($cart, 201);
        } else {
            //Return error if product is not available
            return response()->json(['message' => 'Insufficient stock'], 400);

        }



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
        //Find the cart item by ID
        $cart = Cart::findOrFail($id);

        //Delete the cart item
        $cart->delete();

        return response()->json(['message' => 'Cart item deleted successfully'], 200);
    }
}
