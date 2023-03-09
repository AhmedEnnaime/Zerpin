<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\RecrutmentResource;
use App\Models\Recrutment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RecrutmentController extends BaseController
{
    public function index()
    {
        $recrutments = Recrutment::all();
        return $this->sendResponse(RecrutmentResource::collection($recrutments), 'Recrutments retrieved successfully.', 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'position' => 'required',
            'number' => 'required',
            'description' => 'required',
            'department_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }


        if (Auth::user()->role == "ADMIN") {

            $recrutment = Recrutment::create([
                "title" => $request->title,
                "position" => $request->position,
                "number" => $request->number,
                "description" => $request->description,
                "user_id" => Auth::user()->id,
                "department_id" => $request->department_id,
            ]);
            return $this->sendResponse(new RecrutmentResource($recrutment), 'Recrutment created successfully.', 201);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function show($id)
    {
        $recrutment = Recrutment::find($id);

        if (is_null($recrutment)) {
            return $this->sendError('Department not found.');
        }

        return $this->sendResponse(new RecrutmentResource($recrutment), 'Recrutment retrieved successfully.', 200);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'title' => 'required',
            'position' => 'required',
            'number' => 'required',
            'description' => 'required',
            'department_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $recrutment = Recrutment::find($id);

        if (Auth::user()->role == "ADMIN") {
            if ($recrutment) {
                $recrutment->update([
                    "title" => $request->title,
                    "position" => $request->position,
                    "number" => $request->number,
                    "description" => $request->description,
                    "department_id" => $request->department_id,
                ]);
                return $this->sendResponse(new RecrutmentResource($recrutment), 'Recrutment updated successfully.', 200);
            } else {
                return $this->sendError('Recrutment not found.', [], 404);
            }
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function destroy(Recrutment $recrutment)
    {
        $recrutment->delete();
        return $this->sendResponse([], 'Recrutment deleted successfully.', 202);
    }
}
