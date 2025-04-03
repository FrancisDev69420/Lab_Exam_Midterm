<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Checkout;
use Illuminate\Support\Facades\Auth;

class CheckoutMonitoringController extends Controller
{
    public function index()
    {
        return response()->json(Checkout::all(), 200);
    }

    public function show($id)
    {
        $checkout = Checkout::find($id);
        if (!$checkout) {
            return response()->json(['message' => 'Checkout not found'], 404);
        }
        return response()->json($checkout, 200);
    }

    public function filterByDate($date)
    {
        $checkouts = Checkout::whereDate('created_at', $date)->get();
        return response()->json($checkouts, 200);
    }
}
