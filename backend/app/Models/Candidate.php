<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'fname',
        'lname',
        'birthday',
        'cin',
        'phone',
        'email',
        'cv',
        'img',
        'recrutment_id',
        'recrutment_state',
    ];

    public function recrutment()
    {
        return $this->belongsTo(Recrutment::class);
    }
}
