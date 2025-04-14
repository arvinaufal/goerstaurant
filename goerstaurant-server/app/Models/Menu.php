<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Menu extends Model
{
    // Define fillable columns
    protected $fillable = [
        'restaurant_id',
        'name',
        'price',
        'rating',
        // 'is_deleted'
    ];

    // // Add on methods
    // public function scopeActive($query)
    // {
    //     return $query->where('is_deleted', 0);
    // }

    // public function softDelete()
    // {
    //     DB::transaction(function() {
    //         $this->update(['is_deleted' => 1]);
    //     });
    // }

    // Define relations
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class)->where('is_deleted', 0);
        // return $this->belongsTo(Restaurant::class);
    }
}
