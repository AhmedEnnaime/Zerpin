<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\AccountCreated;


class UserController extends BaseController
{
    public function index()
    {
        $users = User::with("department", "contract")->get();
        return $this->sendResponse(UserResource::collection($users), 'Users retrieved successfully.', 200);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => 'required',
            'lname' => 'required',
            'birthday' => 'required|date',
            'cin' => 'required',
            'phone' => 'required|min:10',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'img' => 'required|image',
            'role' => 'required',
            'department_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $image_path = $request->file('img')->store('image', 'public');

        $user = User::create([
            "fname" => $request->fname,
            "lname" => $request->lname,
            "birthday" => $request->birthday,
            "cin" => $request->cin,
            "phone" => $request->phone,
            "email" => $request->email,
            "password" => bcrypt($request->password),
            "img" => $image_path,
            "role" => $request->role,
            "department_id" => $request->department_id,
        ]);

        Mail::to($user->email)->send(new AccountCreated($user));

        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['lname'] =  $user->lname;

        return $this->sendResponse($success, 'User register successfully.', 201);
    }

    public function login(Request $request)
    {

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['lname'] =  $user->lname;
            $success['id'] =  $user->id;

            return $this->sendResponse([$user,$success], 'User login successfully.', 200);
        } else {
            return $this->sendError('Invalid credentials.', ['error' => 'Email or password invalid']);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return $this->sendResponse($request, 'User logged out successfully.', 200);
    }

    public function getAuthUser()
    {
        $user = User::with('department', 'contract')->findOrFail(Auth::id());
        return $this->sendResponse($user, 'Authenticated user.', 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return $this->sendResponse([], 'User deleted successfully.', 202);
    }
}
