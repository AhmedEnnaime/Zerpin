<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\PayslipResource;
use App\Models\Contract;
use App\Models\Payslip;
use Illuminate\Support\Facades\Auth;

class PayslipController extends BaseController
{
    public function index()
    {
        $payslips = Payslip::with("contract.rules", "contract.user")->get();
        return $this->sendResponse(PayslipResource::collection($payslips), 'Payslips retrieved successfully.', 200);
    }

    public function createPayslip($contract_id)
    {
        $contract = Contract::find($contract_id);
        $reference = 'REF-' . uniqid();
        if ($contract) {
            if (Auth::user()->role == "ADMIN") {
                $payslip = Payslip::create([
                    "ref" => $reference,
                    "contract_id" => $contract_id,
                ]);
                return $this->sendResponse(new PayslipResource($payslip), 'Payslip created successfully.', 201);
            } else {
                return $this->sendResponse([], 'Not allowed.', 404);
            }
        } else {
            return $this->sendError('Contract not found.');
        }
    }

    public function destroy(Payslip $payslip)
    {
        if (Auth::user()->role == "ADMIN") {
            $payslip->delete();
            return $this->sendResponse([], 'Payslip deleted successfully.', 202);
        } else {
            return $this->sendResponse([], 'Not allowed.', 404);
        }
    }
}
