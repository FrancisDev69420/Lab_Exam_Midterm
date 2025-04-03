<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'description',
        'price',
        'stock',
        'image', 
    ];

    public function orderItems(): HasMany
    {
        // Define the relationship with the OrderItem model
        // A product can have many order items
        return $this->hasMany(OrderItem::class);
    }

     public static function boot()
    {
        parent::boot();

        static::deleting(function ($product) {
            if ($product->orderItems()->exists()) {
                throw new \Exception("Cannot delete this product. It has been ordered.");
            }
        });
    }
}
