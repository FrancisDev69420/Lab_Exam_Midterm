<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $products = [
            [ 'Wireless Mouse', 'Ergonomic wireless mouse with adjustable DPI', 25.99, 150, 'https://i.ebayimg.com/00/s/MTU5OVgxNDk2/z/Jt8AAOSw7kRfdohT/$_57.JPG?set_id=8800005007'],
            [ 'Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 69.99, 80, 'https://www.pcgalore.com/public/assets/images/pcgalore-800x800-microsoft-internet-ps-2-keyboard-1999--1323795460-98446.webp'],
            [ '4K Monitor', '27-inch 4K UHD monitor with HDR support', 329.99, 40, 'https://www.gilandroyprops.tv/cdn/shop/products/comp2.jpg?v=1574225350'],
            [ 'Bluetooth Speaker', 'Portable Bluetooth speaker with deep bass', 45.50, 120, 'https://i.ebayimg.com/images/g/03cAAOSwqhpkPv-s/s-l1200.jpg'],
            [ 'Smart Watch', 'Fitness tracking smartwatch with heart rate monitoring', 129.00, 75, 'https://ph.garmin.com/m/ph/g/products/lily2-classic-gold-tan-cf-lg.jpg'],
            [ 'Noise Cancelling Headphones', 'Over-ear headphones with active noise cancellation', 199.99, 60, 'https://m.media-amazon.com/images/I/4150Sao-PJL._AC_UF894,1000_QL80_.jpg'],
            [ 'Webcam 1080p', 'Full HD webcam with built-in microphone', 39.99, 100, 'https://m.media-amazon.com/images/I/41vx1bH5OdL._AC_UF894,1000_QL80_.jpg'],
            [ 'External SSD 1TB', 'High-speed USB-C external solid state drive', 149.99, 90, 'https://ameridroid.com/cdn/shop/products/Roshambo-SSD-Cartridge-a-600x600.jpg?v=1558368112'],
            [ 'Wireless Charger', 'Fast wireless charging pad compatible with all devices', 29.99, 110, 'https://i.ebayimg.com/00/s/MTUwMFgxNTAw/z/ia0AAOSwFGNcODRe/$_12.JPG?set_id=880000500F'],
            [ 'Laptop Cooling Pad', 'Silent cooling pad with adjustable fan speed', 34.95, 70, 'https://i.ytimg.com/vi/FtSmHTI_JwQ/maxresdefault.jpg'],
        ];

        $data = array_map(function ($product) {
            return [
                'product_name' => $product[0],
                'description' => $product[1],
                'price' => $product[2],
                'stock' => $product[3],
                'image' => $product[4],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $products);

        DB::table('products')->insert($data);
    }
}
