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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("fname");
            $table->string("lname");
            $table->date("birthday");
            $table->string("cin")->unique();
            $table->string("phone")->unique();
            $table->string("email")->unique();
            $table->string("password");
            $table->string("img");
            $table->enum('role', ['ADMIN', 'CHEF', 'EMPLOYEE'])->default('EMPLOYEE');
            $table->unsignedBigInteger('department_id');
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
