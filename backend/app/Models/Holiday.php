<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'debut_date',
        'final_date',
        'user_id',
        'state',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
