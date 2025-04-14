<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->string('photo')->nullable();
            $table->text('description')->nullable();
            $table->float('rating')->default(0);
            $table->integer('views')->default(0);
            $table->string('lat')->nullable();
            $table->string('long')->nullable();
            $table->enum('category', ['Fine Dining', 'Casual Dining', 'Buffet', 'Cafe']);
            // $table->decimal('lat', 10, 6)->nullable();
            // $table->decimal('long', 10, 6)->nullable();
            $table->integer('is_deleted')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
