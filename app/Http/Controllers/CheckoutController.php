<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Checkout;

class CheckoutController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'cartItems' => 'required|array',
            'shippingAddress' => 'required|string',
            'phoneNumber' => 'required|string',
            'paymentMethod' => 'required|string',
        ]);

        $user = Auth::user();

        $totalAmount = 0;
        foreach ($request->cartItems as $item) {
            $totalAmount += $item['product']['price'] * $item['quantity'];
        }

        $checkout = new Checkout();
        $checkout->user_id = $user->id;
        $checkout->cart_items = $request->cartItems;
        $checkout->shipping_address = $request->shippingAddress;
        $checkout->phone_number = $request->phoneNumber;
        $checkout->payment_method = $request->paymentMethod;
        $checkout->total_amount = $totalAmount;
        $checkout->save();

        return response()->json(['message' => 'Checkout successful!'], 200);
    }

    public function index(Request $request)
    {
        $query = Checkout::with('user');

        if ($request->has('date')) {
            $query->whereDate('created_at', $request->date);
        }

        $checkouts = $query->get();

        return response()->json($checkouts);
    }

    
}