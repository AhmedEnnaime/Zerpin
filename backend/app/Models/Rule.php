<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rule extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'rule_type',
        'rate',
    ];

    public function contracts()
    {
        return $this->belongsToMany(Contract::class);
    }
}
