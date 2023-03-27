<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\HolidayResource;
use App\Models\Holiday;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class HolidayController extends BaseController
{
    public function index()
    {
        $holidays = Holiday::with("user")->get();
        return $this->sendResponse(HolidayResource::collection($holidays), 'Holidays retrieved successfully.', 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'debut_date' => 'required|date',
            'final_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $holiday = Holiday::create([
            'debut_date' => $request->debut_date,
            'final_date' => $request->final_date,
            'user_id' => Auth::user()->id,

        ]);
        return $this->sendResponse(new HolidayResource($holiday), 'Holiday demanded successfully.', 201);
    }

    public function update(Request $request, $id)
    {
        $holiday = Holiday::find($id);

        if (!$holiday) {
            return $this->sendError('Holiday not found.');
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'debut_date' => 'required|date',
            'final_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($holiday->user_id == Auth::user()->id) {
            $holiday->debut_date = $request->debut_date;
            $holiday->final_date = $request->final_date;
            $holiday->save();

            return $this->sendResponse(new HolidayResource($holiday), 'Holiday updated successfully.', 200);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function validateHoliday($id)
    {

        $holiday = Holiday::find($id);
        $user = User::find($holiday->user_id);
        if (!$holiday) {
            return $this->sendError('Holiday not found.');
        }
        if ($user->role == "EMPLOYEE") {
            if (Auth::user()->role == "ADMIN" || (Auth::user()->role == "CHEF" && Auth::user()->department_id == $user->department_id)) {
                $holiday->state = 'VALIDATED';
                $holiday->save();
                // SENT EMAIL
                return $this->sendResponse(new HolidayResource($holiday), 'Holiday VALIDATED successfully.', 200);
            } else {
                return $this->sendResponse([], 'Not allowed.', 404);
            }
        } else if ($user->role == "CHEF") {
            if (Auth::user()->role == "ADMIN") {
                $holiday->state = 'VALIDATED';
                $holiday->save();
                // SENT EMAIL
                return $this->sendResponse(new HolidayResource($holiday), 'Holiday VALIDATED successfully.', 200);
            } else {
                return $this->sendResponse([], 'Not allowed.', 404);
            }
        }
    }

    public function rejectHoliday($id)
    {

        $holiday = Holiday::find($id);
        $user = User::find($holiday->user_id);
        if (!$holiday) {
            return $this->sendError('Holiday not found.');
        }
        if (Auth::user()->role == "ADMIN" || (Auth::user()->role == "CHEF" && Auth::user()->department_id == $user->department_id)) {
            $holiday->state = 'REJECTED';
            $holiday->save();
            // SENT EMAIL
            return $this->sendResponse(new HolidayResource($holiday), 'Holiday VALIDATED successfully.', 200);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function destroy(Holiday $holiday)
    {
        $user = User::find($holiday->user_id);
        if (Auth::user()->role == "ADMIN" || Auth::user()->id == $holiday->user_id || (Auth::user()->role == "CHEF" && Auth::user()->department_id == $user->department_id)) {
            $holiday->delete();
            return $this->sendResponse([], 'Holiday canceled successfully.', 202);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }
}
