<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recrutment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'position',
        'number',
        'description',
        'user_id',
        'department_id',
    ];

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
}
