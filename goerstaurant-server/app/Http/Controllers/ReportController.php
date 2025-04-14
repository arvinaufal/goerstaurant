<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $restaurants = Restaurant::active()->withCount(['menus'])->get()->map(
            function($restaurant) {
                return [
                    'id' => $restaurant->id,
                    'name' => $restaurant->name,
                    'views' => $restaurant->views,
                    'total_menus' => $restaurant->menus_count
                ];
            }
        );

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'message' => 'Successfully retrieved restaurant reports',
            'data' => $restaurants,
            'total' => count($restaurants)
        ], 200);
    }
}