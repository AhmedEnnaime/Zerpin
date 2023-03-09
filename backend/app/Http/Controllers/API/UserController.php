<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
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
            'department_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $role = "ADMIN";

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
            "role" => $role,
            "department_id" => $request->department_id,
        ]);

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

            return $this->sendResponse($success, 'User login successfully.', 200);
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
        $user = Auth::user();
        return $this->sendResponse($user, 'Authenticated user.', 200);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return $this->sendResponse([], 'User deleted successfully.', 202);
    }
}
