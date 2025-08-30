<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:8'
        ]);


        if ($validator->fails())
            return response()->json($validator->errors());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer',]);
    }


    public function createToken(string $name, array $abilities = ['*'])
    {
        $token = $this->tokens()->create([
            'name' => $name,
            'token' => hash('sha256', $plainTextToken = Str::random(40)),
            'abilities' => $abilities,
        ]);
        return new NewAccessToken($token, $token->getKey() . '|' . $plainTextoken);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()
                ->json(['message' => 'Niste autorizovani.'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Zdravo, ' . $user->name . ', dobrodošli!', 'access_token' => $token, 'token_type' => 'Bearer',]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function loginAdmin(Request $request)
    {
        if (!Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Niste autorizovani.'], 401);
        }

        $admin = Admin::where('email', $request['email'])->firstOrFail();

        $token = $admin->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Zdravo, ' . $admin->name . ', dobrodošli u Adminsku aplikaciju!', 'access_token' => $token, 'token_type' => 'Bearer']);
    }

}
