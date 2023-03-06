<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string("fname");
            $table->string("lname");
            $table->date("birthday");
            $table->string("cin")->unique();
            $table->string("phone")->unique();
            $table->string("email")->unique();
            $table->string("cv");
            $table->unsignedBigInteger('recrutment_id');
            $table->foreign('recrutment_id')->references('id')->on('recrutments')->onDelete('cascade')->onUpdate('cascade');
            $table->enum('recrutment_state', ['REJECTED', 'WAITING', 'ACCEPTED'])->default('WAITING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
