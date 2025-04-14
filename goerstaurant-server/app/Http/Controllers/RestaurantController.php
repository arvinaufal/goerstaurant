<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Restaurant;
use App\Models\RestaurantSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->input('perPage') !== 'all' ? $request->input('perPage', 10) : null;
        $page = $request->input('perPage') !== 'all' ? $request->input('page', 1) : null;
        $offset = $page ? ($page - 1) * $perPage : null;

        $query = Restaurant::active()->with([
            'menus' => function($query) {
                $query->select('id', 'restaurant_id', 'name', 'price', 'rating')
                    ->orderBy('id');
            },
            'restaurantSchedules' => function($query) {
                $query->select('id', 'restaurant_id', 'day_of_week', 'opening_time', 'closing_time')
                    ->orderBy('id');
            }
        ]);

        if ($request->has('cat')) {
            $cat = $request->input('cat');
            $query->where(function($q) use ($cat) {
                $q->where('category', 'like', "%{$cat}%");
            });
        }

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%");
            });
        }

        if ($request->has('day_of_week') && !empty($request->input('day_of_week'))) {
            $days = explode(',', $request->input('day_of_week'));
            
            $query->whereHas('restaurantSchedules', function($q) use ($days) {
                $q->whereIn('day_of_week', $days);
            });
        }

        if ($request->has('opening_time') && $request->input('opening_time')) {
            $openingTime = $request->input('opening_time');
            $query->whereHas('restaurantSchedules', function($q) use ($openingTime) {
                $q->where('opening_time', '>=', $openingTime);
            });
        }

        if ($request->has('closing_time') && $request->input('closing_time')) {
            $closingTime = $request->input('closing_time');
            $query->whereHas('restaurantSchedules', function($q) use ($closingTime) {
                $q->where('closing_time', '<=', $closingTime);
            });
        }
        

        $total = $query->count();
        $dataQuery = $query->orderBy('id', 'DESC');
        
        $data = ($perPage !== null) 
            ? $dataQuery->skip($offset)->take($perPage)->get()
            : $dataQuery->get();

        $data = $data->map(function($restaurant) {
            return [
                'id' => $restaurant->id,
                'name' => $restaurant->name,
                'photo' => $restaurant->photo,
                'description' => $restaurant->description,
                'category' => $restaurant->category,
                'rating' => $restaurant->rating,
                'views' => $restaurant->views,
                'lat' => $restaurant->lat,
                'long' => $restaurant->long,
                'menus' => $restaurant->menus,
                'restaurant_schedules' => $restaurant->restaurantSchedules,
                'is_deleted' => $restaurant->is_deleted
            ];
        });

        return response()->json([
            'code'      => 200,
            'status'    => 'success',
            'message'   => 'Successfully retrieved restaurant data',
            'data'      => $data,
            'total'     => $total,
            'page'      => $page,
            'perPage'   => $perPage,
            'offset'    => $offset
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:200',
            'category' => 'required|string',
            'description' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'lat' => 'required|string',
            'long' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'status' => 'failed',
                'message' => 'Invalid fields!',
                'errors' => $validator->errors()
            ], 400);
        }
    
        DB::beginTransaction();
        try {
            $path = null;
            
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('restaurant_photos', 'public');
            }

            $restaurant = Restaurant::create([
                'name' => $request->name,
                'description' => $request->description,
                'lat' => $request->lat,
                'long' => $request->long,
                'category' => $request->category,
                'photo' => $path
            ]);
    
            DB::commit();
    
            return response()->json([
                'code' => 201,
                'status' => 'success',
                'message' => 'Restaurant created successfully',
                'data' => $restaurant
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error creating restaurant: ' . $e->getMessage());
    
            return response()->json([
                'code' => 500,
                'status' => 'failed',
                'message' => 'Error when creating restaurant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant): JsonResponse
    {
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:200',
            'description' => 'sometimes|string',
            'category' => 'sometimes|string',
            'lat' => 'sometimes|string',
            'long' => 'sometimes|string',
            'photo' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048',
            'menus' => 'sometimes|array|min:1',
            'menus.*.name' => 'required|string|max:200',
            'menus.*.price' => 'required|numeric|min:0',
            'restaurant_schedules' => 'sometimes|array|min:1',
            'restaurant_schedules.*.day_of_week' => 'required|string|max:3',
            'restaurant_schedules.*.opening_time' => 'required|string',
            'restaurant_schedules.*.closing_time' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 400,
                'status' => 'failed',
                'message' => 'Invalid fields!',
                'errors' => $validator->errors()
            ], 400);
        }

        DB::beginTransaction();
        try {
            $updateData = [
                'name' => $request->input('name', $restaurant->name),
                'description' => $request->input('description', $restaurant->description),
                'category' => $request->input('category', $restaurant->category),
                'lat' => $request->input('lat', $restaurant->lat),
                'long' => $request->input('long', $restaurant->long),
            ];

            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('restaurant_photos', 'public');
                $updateData['photo'] = $path;
            }

            $restaurant->update($updateData);

            if ($request->has('menus')) {
                $restaurant->menus()->delete();

                foreach ($request->input('menus') as $menu) {
                    Menu::create([
                        'restaurant_id' => $restaurant->id,
                        'name' => $menu['name'],
                        'price' => $menu['price'],
                        'rating' => rand(0, 5),
                    ]);
                }
            }

            if ($request->has('restaurant_schedules')) {
                $restaurant->restaurantSchedules()->delete();

                foreach ($request->input('restaurant_schedules') as $schedule) {
                    RestaurantSchedule::create([
                        'restaurant_id' => $restaurant->id,
                        'day_of_week' => $schedule['day_of_week'],
                        'opening_time' => $schedule['opening_time'],
                        'closing_time' => $schedule['closing_time'],
                    ]);
                }
            }

            DB::commit();

            $restaurant->load(['menus', 'restaurantSchedules']);

            return response()->json([
                'code' => 200,
                'status' => 'success',
                'message' => 'Restaurant updated successfully',
                'data' => $restaurant
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Error updating restaurant: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'status' => 'error',
                'message' => 'Error when updating restaurant',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        DB::beginTransaction();
        try {
            $restaurant = Restaurant::findOrFail($restaurant->id)->softDelete();

            DB::commit();

            return response()->json([
                'code'      => 200,
                'status'    => 'success',
                'message'   => 'Restaurant deleted successfully',
                'data'      => $restaurant
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();

            Log::error('Error deleting restaurant: ' . $e->getMessage());

            return response()->json([
                'code'      => 500,
                'status'    => 'failed',
                'message' => 'Error when deleting restaurant',
                'data'    => null
            ], 500);
        }
    }
}
