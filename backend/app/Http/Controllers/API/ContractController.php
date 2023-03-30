<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\ContractResource;
use App\Models\Candidate;
use App\Models\Contract;
use App\Models\Rule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ContractController extends BaseController
{

    public function index()
    {
        $contracts = Contract::with("user", "rules")->orderBy('created_at', 'desc')->get();
        return $this->sendResponse(ContractResource::collection($contracts), 'Contracts retrieved successfully.', 200);
    }

    public function calculateIR($baseSalary)
    {
        switch (true) {
            case in_array($baseSalary, range(0, 2500)):
                return 1;
            case in_array($baseSalary, range(2501, 4166)):
                return 0.1;
            case in_array($baseSalary, range(4167, 5000)):
                return 0.2;
            case in_array($baseSalary, range(5001, 6666)):
                return 0.3;
            case in_array($baseSalary, range(6667, 15000)):
                return 0.34;
            case ($baseSalary > 15000):
                return 0.38;
            default:
                return null;
        }
    }


    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'fname' => 'required',
            'lname' => 'required',
            'birthday' => 'required|date',
            'cin' => 'required',
            'phone' => 'required|min:10',
            'email' => 'required|email',
            'img' => 'required|image',
            'role' => 'required',
            'department_id' => 'required',
            'position' => 'required',
            'debut_date' => 'required|date',
            'base_salary' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $reference = 'REF-' . uniqid();
        $irRate = $this->calculateIR($request->base_salary);

        $rules = Rule::find($request->rule_id);

        $final_salary = $request->base_salary;

        foreach ($rules as $rule) {
            if (strcmp($rule->rule_type, "AUGMENTATION") == 0) {
                $final_salary += $rule->rate;
            } else if (strcmp($rule->rule_type, "DISCOUNT") == 0) {
                $final_salary -= ($request->base_salary * $rule->rate);
            }
        }

        if (Auth::user()->role == "ADMIN") {

            $image_path = $request->file('img')->store('image', 'public');
            $img = explode('/', $image_path)[1];
            $password = $request->fname . $request->lname . "0";
            $user = User::create([
                "fname" => $request->fname,
                "lname" => $request->lname,
                "birthday" => $request->birthday,
                "cin" => $request->cin,
                "phone" => $request->phone,
                "email" => $request->email,
                "password" => bcrypt($password),
                "img" => $img,
                "role" => $request->role,
                "department_id" => $request->department_id,
            ]);
            $employee = User::orderBy('id', 'desc')->first();

            $contract = Contract::create([
                'ref' => $reference,
                'position' => $request->position,
                'debut_date' => $request->debut_date,
                'final_date' => $request->final_date,
                'base_salary' => $request->base_salary,
                'user_id' => $employee->id,
                'final_salary' => $final_salary - ($request->base_salary * $irRate),
            ]);

            $contract->rules()->attach($rules);
            $candidate = Candidate::where('email', $request->email)->first();
            $candidate->delete();
            // SEND EMAIL

            return $this->sendResponse(new ContractResource($contract), 'Contract created successfully.', 201);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }

    public function show($id)
    {
        $contract = Contract::with('user', "rules")->find($id);

        if (is_null($contract)) {
            return $this->sendError('Department not found.');
        }

        return $this->sendResponse(new ContractResource($contract), 'Contract retrieved successfully.', 200);
    }

    public function updateContract(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'fname' => 'required',
            'lname' => 'required',
            'birthday' => 'required|date',
            'cin' => 'required',
            'phone' => 'required|min:10',
            'email' => 'required|email',
            'img' => 'required|image',
            'role' => 'required',
            'department_id' => 'required',
            'position' => 'required',
            'debut_date' => 'required|date',
            'base_salary' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $reference = 'REF-' . uniqid();
        $irRate = $this->calculateIR($request->base_salary);

        $rules = Rule::find($request->rule_id);

        $final_salary = $request->base_salary;

        foreach ($rules as $rule) {
            if (strcmp($rule->rule_type, "AUGMENTATION") == 0) {
                $final_salary += $rule->rate;
            } else if (strcmp($rule->rule_type, "DISCOUNT") == 0) {
                $final_salary -= ($request->base_salary * $rule->rate);
            }
        }

        $contract = Contract::find($id);

        if ($contract) {

            if (Auth::user()->role == "ADMIN") {

                $image_path = $request->file('img')->store('image', 'public');
                $user = User::find($contract->user_id);
                $password = $request->fname . $request->lname . "0";
                $user->update([
                    "fname" => $request->fname,
                    "lname" => $request->lname,
                    "birthday" => $request->birthday,
                    "cin" => $request->cin,
                    "phone" => $request->phone,
                    "email" => $request->email,
                    "password" => bcrypt($password),
                    "img" => $image_path,
                    "role" => $request->role,
                    "department_id" => $request->department_id,
                ]);

                $contract->update([
                    'ref' => $reference,
                    'position' => $request->position,
                    'debut_date' => $request->debut_date,
                    'final_date' => $request->final_date,
                    'base_salary' => $request->base_salary,
                    'final_salary' => $final_salary - ($request->base_salary * $irRate),
                ]);

                $contract->rules()->sync($rules);

                return $this->sendResponse(new ContractResource($contract), 'Contract updated successfully.', 200);
            } else {
                return $this->sendResponse([], 'Not allowed.', 404);
            }
        } else {
            return $this->sendError('Contract not found.');
        }
    }

    public function destroy(Contract $contract)
    {
        if (Auth::user()->role == "ADMIN") {
            $contract->delete();
            return $this->sendResponse([], 'Contract deleted successfully.', 202);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }
}
