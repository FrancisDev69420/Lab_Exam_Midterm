<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cart_items',
        'shipping_address',
        'phone_number',
        'payment_method',
        'total_amount',
    ];

    protected $casts = [
        'cart_items' => 'array', // Automatically cast to array
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}