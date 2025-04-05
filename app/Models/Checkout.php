<?php

namespace App\Models;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    public function items(){
        return $this->hasMany(OrderItem::class);
    }
}
