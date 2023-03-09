<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\DepartmentResource;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends BaseController
{
    public function index()
    {
        $departments = Department::all();
        return $this->sendResponse(DepartmentResource::collection($departments), 'Departments retrieved successfully.', 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        if (Auth::user()->role == "ADMIN") {
            $department = Department::create($input);
            return $this->sendResponse(new DepartmentResource($department), 'Department created successfully.', 201);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function show($id)
    {
        $department = Department::find($id);

        if (is_null($department)) {
            return $this->sendError('Department not found.');
        }

        return $this->sendResponse(new DepartmentResource($department), 'Department retrieved successfully.', 200);
    }

    public function update(Request $request, $id)
    {
        $department = Department::find($id);

        if (!$department) {
            return $this->sendError('Department not found.');
        }

        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $department->name = $input['name'];
        $department->save();

        return $this->sendResponse(new DepartmentResource($department), 'Department updated successfully.', 200);
    }


    public function destroy(Department $department)
    {
        if (Auth::user()->role == "ADMIN") {
            $department->delete();
            return $this->sendResponse([], 'Department deleted successfully.', 202);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }
}
