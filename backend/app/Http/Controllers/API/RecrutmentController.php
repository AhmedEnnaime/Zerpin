<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\RecrutmentResource;
use App\Models\Recrutment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class RecrutmentController extends BaseController
{
    public function index()
    {
        $recrutments = Recrutment::all();
        return $this->sendResponse(RecrutmentResource::collection($recrutments), 'Recrutments retrieved successfully.', 200);
    }

    // URN : ZBQGkOE1ZR

    public function shareOnLinkedin()
    {
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

            $ugcPostData = [
                'author' => 'urn:li:person:ZBQGkOE1ZR',
                'lifecycleState' => 'PUBLISHED',
                'specificContent' => [
                    'com.linkedin.ugc.ShareContent' => [
                        'shareCommentary' => [
                            'text' => $recrutment->description,
                        ],
                        'shareMediaCategory' => 'IMAGE',
                        'media' => [
                            [
                                'status' => 'READY',
                                'description' => [
                                    'text' => 'Center stage!'
                                ],
                                'media' => 'urn:li:digitalmediaAsset:C5622AQH14eL6Y_9jdA',
                                'title' => [
                                    'text' => 'LinkedIn Talent Connect 2021'
                                ]
                            ]
                        ]
                    ]
                ],
                'visibility' => [
                    'com.linkedin.ugc.MemberNetworkVisibility' => 'PUBLIC'
                ]
            ];

            // Send POST request to create UGC post
            $response = Http::withToken('AQXWnDt1Hqg-R_g_4Sg_0sTpAfUDn_CA1By8L3oZGfkx4_PwU-eIA-IFFox3-PnPP8ftZxma5lralJ-StGHfojndMGfFOxfGy4NscqwG1QNusQL3dTlaQzKSWtfUy2XEbMBWqlHiR-rZyja3lD_XVsRmzSTA2j0U8ABhbFQEfY7pOB2OXjyE7jQGSzuQKolTMtNxzavWFHXwuC6PFzGOOgxvSCcu9Jpl-SdhrXXiXNaL3oIcVLNxybbKzuVPPWVRh2jjh_LtrQG2D6Yu9jqwf_Kad6a5Xb72IUY43wzBCn4yDPJUTlNqVPvdgEQ7k-xvKipmDYABGOTDkHM5S9UOlsID2SCwmw')
                ->post('https://api.linkedin.com/v2/ugcPosts', $ugcPostData);

            // Check for errors
            if ($response->failed()) {
                return $this->sendError('UGC post creation failed.', $response->json());
            }

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
        if (Auth::user()->role == "ADMIN") {
            $recrutment->delete();
            return $this->sendResponse([], 'Recrutment deleted successfully.', 202);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }
}
