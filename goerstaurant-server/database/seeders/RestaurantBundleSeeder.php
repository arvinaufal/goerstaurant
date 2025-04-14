<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantBundleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurant = Restaurant::create([
            'name' => 'Kushi Tsuru',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Authentic Japanese restaurant specializing in kushiyaki skewers and fresh sushi',
            'rating' => 4.4,
            'views' => 850,
            'category' => 'Casual Dining',
            'lat' => "-6.215738284617741",
            'long' => "106.83252832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Assorted Kushiyaki Set', 'price' => 120000, 'rating' => 4.6],
            ['name' => 'Salmon Sashimi', 'price' => 95000, 'rating' => 4.7]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 2. Osakaya Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Osakaya Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Traditional Japanese cuisine with a focus on Osaka-style dishes',
            'rating' => 4.3,
            'views' => 920,
            'category' => 'Casual Dining',
            'lat' => "-6.218738284617741",
            'long' => "106.83552832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Okonomiyaki', 'price' => 85000, 'rating' => 4.5],
            ['name' => 'Takoyaki', 'price' => 45000, 'rating' => 4.4]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:30:00', 'closing_time' => '21:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 3. The Stinking Rose
        $restaurant = Restaurant::create([
            'name' => 'The Stinking Rose',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Garlic-themed restaurant offering bold flavors in every dish',
            'rating' => 4.6,
            'views' => 1100,
            'category' => 'Fine Dining',
            'lat' => "-6.225738284617741",
            'long' => "106.83852832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Garlic Roasted Chicken', 'price' => 145000, 'rating' => 4.7],
            ['name' => 'Garlic Ice Cream', 'price' => 35000, 'rating' => 4.2]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '23:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 4. Mifune Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Mifune Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Elegant Japanese restaurant known for its teppanyaki and sushi',
            'rating' => 4.5,
            'views' => 980,
            'category' => 'Fine Dining',
            'lat' => "-6.222738284617741",
            'long' => "106.84552832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Teppanyaki Set', 'price' => 185000, 'rating' => 4.8],
            ['name' => 'Dragon Roll', 'price' => 95000, 'rating' => 4.6]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:00:00', 'closing_time' => '22:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 5. The Cheesecake Factory
        $restaurant = Restaurant::create([
            'name' => 'The Cheesecake Factory',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'American restaurant chain offering extensive menu and signature cheesecakes',
            'rating' => 4.7,
            'views' => 1500,
            'category' => 'Casual Dining',
            'lat' => "-6.230738284617741",
            'long' => "106.84052832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Original Cheesecake', 'price' => 75000, 'rating' => 4.9],
            ['name' => 'Avocado Eggrolls', 'price' => 65000, 'rating' => 4.7]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:00:00', 'closing_time' => '00:30:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:00:00', 'closing_time' => '00:30:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '10:00:00', 'closing_time' => '23:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 6. New Delhi Indian Restaurant
        $restaurant = Restaurant::create([
            'name' => 'New Delhi Indian Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Authentic North Indian cuisine with rich flavors and spices',
            'rating' => 4.4,
            'views' => 780,
            'category' => 'Casual Dining',
            'lat' => "-6.220738284617741",
            'long' => "106.83052832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Butter Chicken', 'price' => 95000, 'rating' => 4.6],
            ['name' => 'Garlic Naan', 'price' => 25000, 'rating' => 4.5]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '17:30:00', 'closing_time' => '22:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 7. Iroha Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Iroha Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Japanese restaurant specializing in robatayaki and fresh seafood',
            'rating' => 4.5,
            'views' => 890,
            'category' => 'Casual Dining',
            'lat' => "-6.217738284617741",
            'long' => "106.83752832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Robatayaki Set', 'price' => 135000, 'rating' => 4.7],
            ['name' => 'Uni Don', 'price' => 175000, 'rating' => 4.6]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 8. Rose Pistola
        $restaurant = Restaurant::create([
            'name' => 'Rose Pistola',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Italian restaurant with a focus on seafood and handmade pasta',
            'rating' => 4.6,
            'views' => 950,
            'category' => 'Fine Dining',
            'lat' => "-6.227738284617741",
            'long' => "106.84252832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Lobster Spaghetti', 'price' => 195000, 'rating' => 4.8],
            ['name' => 'Tiramisu', 'price' => 55000, 'rating' => 4.7]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '22:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:30:00', 'closing_time' => '23:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 9. Alioto's Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Alioto\'s Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Classic Italian-American restaurant with waterfront views',
            'rating' => 4.5,
            'views' => 870,
            'category' => 'Casual Dining',
            'lat' => "-6.224738284617741",
            'long' => "106.83952832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Clam Chowder', 'price' => 65000, 'rating' => 4.6],
            ['name' => 'Seafood Risotto', 'price' => 145000, 'rating' => 4.7]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:00:00', 'closing_time' => '23:00:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 10. Canton Seafood & Dim Sum Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Canton Seafood & Dim Sum Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Authentic Cantonese cuisine with extensive dim sum selection',
            'rating' => 4.4,
            'views' => 920,
            'category' => 'Casual Dining',
            'lat' => "-6.219738284617741",
            'long' => "106.83352832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Har Gow (Shrimp Dumplings)', 'price' => 45000, 'rating' => 4.7],
            ['name' => 'BBQ Pork Buns', 'price' => 35000, 'rating' => 4.6]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '10:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '10:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '10:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '10:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '10:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 11. All Season Restaurant
        $restaurant = Restaurant::create([
            'name' => 'All Season Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Chinese restaurant serving all-day dining with seasonal specialties',
            'rating' => 4.3,
            'views' => 760,
            'category' => 'Casual Dining',
            'lat' => "-6.221738284617741",
            'long' => "106.83452832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Peking Duck', 'price' => 195000, 'rating' => 4.5],
            ['name' => 'Xiao Long Bao', 'price' => 55000, 'rating' => 4.4]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '10:00:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '09:30:00', 'closing_time' => '21:30:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '09:30:00', 'closing_time' => '21:30:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }

        // 12. Bombay Indian Restaurant
        $restaurant = Restaurant::create([
            'name' => 'Bombay Indian Restaurant',
            'photo' => 'restaurant_photos/bg-restaurant-default.jpg',
            'description' => 'Vibrant Indian restaurant offering classic dishes from Mumbai',
            'rating' => 4.5,
            'views' => 810,
            'category' => 'Casual Dining',
            'lat' => "-6.223738284617741",
            'long' => "106.83652832710348",
            'is_deleted' => 0
        ]);

        $menus = [
            ['name' => 'Chicken Tikka Masala', 'price' => 85000, 'rating' => 4.7],
            ['name' => 'Vegetable Samosa', 'price' => 35000, 'rating' => 4.5]
        ];

        foreach ($menus as $menu) {
            $restaurant->menus()->create($menu);
        }

        $schedules = [
            ['day_of_week' => 'Mon', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00'],
            ['day_of_week' => 'Tue', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00'],
            ['day_of_week' => 'Wed', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00'],
            ['day_of_week' => 'Thu', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00'],
            ['day_of_week' => 'Fri', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00'],
            ['day_of_week' => 'Sat', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00'],
            ['day_of_week' => 'Sun', 'opening_time' => '11:30:00', 'closing_time' => '22:30:00']
        ];
        foreach ($schedules as $schedule) {
            $restaurant->restaurantSchedules()->create($schedule);
        }
    }
}
