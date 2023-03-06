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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string("ref")->unique();
            $table->string("position");
            $table->date("debut_date");
            $table->date("final_date");
            $table->double("base_salary");
            $table->double("final_salary");
            $table->unsignedBigInteger('user_id');
            $table->enum('state', ['ONGOING', 'EXPIRED'])->default('ONGOING');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
