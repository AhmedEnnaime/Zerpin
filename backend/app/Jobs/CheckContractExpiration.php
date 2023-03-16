<?php

namespace App\Jobs;

use App\Models\Contract;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CheckContractExpiration implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $expired_contracts = Contract::where('final_date', '<', now()->toDateString())
            ->where('state', '!=', 'EXPIRED')
            ->get();

        foreach ($expired_contracts as $contract) {
            $contract->state = 'EXPIRED';
            $contract->save();
        }

        Log::info('Checked contracts for expiration and updated any expired contracts to EXPIRED');
    }
}
