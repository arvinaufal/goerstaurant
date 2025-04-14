<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestaurantSchedule extends Model
{
    // Define fillable columns
    protected $fillable = [
        'restaurant_id',
        'day_of_week',
        'opening_time',
        'closing_time'
    ];

    // Define relations
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class)->where('is_deleted', 0);
    }
}
