<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\RuleResource;
use App\Models\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RulesController extends BaseController
{
    public function index()
    {
        $rules = Rule::all();
        return $this->sendResponse(RuleResource::collection($rules), 'Rules retrieved successfully.', 200);
    }

    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'rule_type' => 'required',
            'rate' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        if (Auth::user()->role == "ADMIN") {
            $rule = Rule::create($input);
            return $this->sendResponse(new RuleResource($rule), 'Rule created successfully.', 201);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function destroy(Rule $rule)
    {
        if (Auth::user()->role == "ADMIN") {
            $rule->delete();
            return $this->sendResponse([], 'Rule deleted successfully.', 202);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }
}
