<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckoutsTable extends Migration
{
    public function up()
    {
        Schema::create('checkouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('cart_items'); // Store cart items as JSON
            $table->string('shipping_address');
            $table->string('phone_number');
            $table->string('payment_method');
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('checkouts');
    }
}