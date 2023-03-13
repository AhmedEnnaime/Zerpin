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
        $recrutments = Recrutment::with("candidates")->get();
        return $this->sendResponse(RecrutmentResource::collection($recrutments), 'Recrutments retrieved successfully.', 200);
    }

    // URN : ZBQGkOE1ZR

    public function store(Request $request)
    {
        $input = $request->all();
        $link = "https://www.google.com/";
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
                            'text' => "New job opening!\n\n " . $recrutment->title . "\nPosition: " . $recrutment->position . "\n " . $recrutment->description . "\nNumber of Openings: " . $recrutment->number . "\n\nApply now at:\n\n " . $link . "",
                        ],
                        'shareMediaCategory' => 'IMAGE',
                        'media' => [
                            [
                                'status' => 'READY',
                                'description' => [
                                    'text' => 'Center stage!'
                                ],
                                'media' => 'urn:li:digitalmediaAsset:C5622AQHQK3xPD5qWpg',
                                'title' => [
                                    'text' => 'LinkedIn Talent Connect 2021'
                                ]
                            ]
                        ]
                    ]
                ],
                'visibility' => [
                    'com.linkedin.ugc.MemberNetworkVisibility' => 'CONNECTIONS'
                ]
            ];

            // Send POST request to create UGC post
            $response = Http::withToken('AQXWnDt1Hqg-R_g_4Sg_0sTpAfUDn_CA1By8L3oZGfkx4_PwU-eIA-IFFox3-PnPP8ftZxma5lralJ-StGHfojndMGfFOxfGy4NscqwG1QNusQL3dTlaQzKSWtfUy2XEbMBWqlHiR-rZyja3lD_XVsRmzSTA2j0U8ABhbFQEfY7pOB2OXjyE7jQGSzuQKolTMtNxzavWFHXwuC6PFzGOOgxvSCcu9Jpl-SdhrXXiXNaL3oIcVLNxybbKzuVPPWVRh2jjh_LtrQG2D6Yu9jqwf_Kad6a5Xb72IUY43wzBCn4yDPJUTlNqVPvdgEQ7k-xvKipmDYABGOTDkHM5S9UOlsID2SCwmw')
                ->post('https://api.linkedin.com/v2/ugcPosts', $ugcPostData);

            if ($response->failed()) {
                return $this->sendError('UGC post creation failed.', $response->json());
            }

            // Get the post URN
            $postUrn = $response['id'];

            // Update the Recruitment object with the post URN
            $recrutment->post_urn = $postUrn;
            $recrutment->save();

            return $this->sendResponse([
                'recrutment' => new RecrutmentResource($recrutment),
                'post_urn' => $postUrn
            ], 'Recrutment created and shared on LinkedIn successfully.', 201);
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

    public function destroy($id)
    {
        $recruitment = Recrutment::find($id);

        if (!$recruitment) {
            return $this->sendError('Recruitment not found.', [], 404);
        }

        if (Auth::user()->id != $recruitment->user_id) {
            return $this->sendError('Not authorized.', [], 401);
        }

        $postUrn = $recruitment->post_urn;

        // Delete post from LinkedIn
        $response = Http::withToken('AQXWnDt1Hqg-R_g_4Sg_0sTpAfUDn_CA1By8L3oZGfkx4_PwU-eIA-IFFox3-PnPP8ftZxma5lralJ-StGHfojndMGfFOxfGy4NscqwG1QNusQL3dTlaQzKSWtfUy2XEbMBWqlHiR-rZyja3lD_XVsRmzSTA2j0U8ABhbFQEfY7pOB2OXjyE7jQGSzuQKolTMtNxzavWFHXwuC6PFzGOOgxvSCcu9Jpl-SdhrXXiXNaL3oIcVLNxybbKzuVPPWVRh2jjh_LtrQG2D6Yu9jqwf_Kad6a5Xb72IUY43wzBCn4yDPJUTlNqVPvdgEQ7k-xvKipmDYABGOTDkHM5S9UOlsID2SCwmw')
            ->delete("https://api.linkedin.com/v2/ugcPosts/{$postUrn}");

        if ($response->failed()) {
            return $this->sendError('Failed to delete post from LinkedIn.', $response->json(), 500);
        }

        // Delete recruitment from database
        $recruitment->delete();

        return $this->sendResponse([], 'Recruitment deleted successfully.', 202);
    }
}
