<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Checkout;

class CheckoutMonitoringController extends Controller
{
    public function index()
    {
        $checkouts = Checkout::with(['items.product'])->get();

        $formatted = $checkouts->map(function ($checkout) {
            return [
                'id' => $checkout->id,
                'customer' => $checkout->customer->name ?? 'Guest',
                'created_at' => $checkout->created_at,
                'total_price' => $checkout->total_price,
                'items' => $checkout->items->map(function ($item) {
                    return [
                        'product_name' => $item->product->name ?? 'Deleted Product',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                }),
            ];
        });

        return response()->json($formatted, 200);
    }

    public function show($id)
    {
        $checkout = Checkout::with(['items.product'])->find($id);
        if (!$checkout) {
            return response()->json(['message' => 'Checkout not found'], 404);
        }

        return response()->json([
            'id' => $checkout->id,
            'customer' => $checkout->customer->name ?? 'Guest',
            'created_at' => $checkout->created_at,
            'total_price' => $checkout->total_price,
            'items' => $checkout->items->map(function ($item) {
                return [
                    'product_name' => $item->product->name ?? 'Deleted Product',
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                ];
            }),
        ]);
    }

    public function filterByDate($date)
    {
        $checkouts = Checkout::with(['items.product'])
            ->whereDate('created_at', $date)
            ->get();

        $formatted = $checkouts->map(function ($checkout) {
            return [
                'id' => $checkout->id,
                'customer' => $checkout->customer->name ?? 'Guest',
                'created_at' => $checkout->created_at,
                'total_price' => $checkout->total_price,
                'items' => $checkout->items->map(function ($item) {
                    return [
                        'product_name' => $item->product->name ?? 'Deleted Product',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                    ];
                }),
            ];
        });

        return response()->json($formatted, 200);
    }
}

