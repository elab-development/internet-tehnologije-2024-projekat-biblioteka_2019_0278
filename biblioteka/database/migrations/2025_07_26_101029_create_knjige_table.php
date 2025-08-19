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
        Schema::create('knjige', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->string('pisac');
            $table->string('izdavac')->nullable();
            $table->integer('kolicina')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knjige');
    }
};
