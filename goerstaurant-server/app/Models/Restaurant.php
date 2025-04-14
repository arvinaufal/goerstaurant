<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Restaurant extends Model
{
    // Define fillable columns
    protected $fillable = [
        'name',
        'photo',
        'description',
        'rating',
        'views',
        'lat',
        'long',
        'category',
        'is_deleted'
    ];

    // Add on methods
    public function scopeActive($query)
    {
        return $query->where('is_deleted', 0);
    }

    public function softDelete()
    {
        DB::transaction(function () {
            $this->update(['is_deleted' => 1]);
        });
    }

    // Define relations
    public function menus()
    {
        // return $this->hasMany(Menu::class)->where('is_deleted', 0);
        return $this->hasMany(Menu::class);
    }

    public function restaurantSchedules()
    {
        return $this->hasMany(RestaurantSchedule::class);
    }
}
