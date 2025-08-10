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
        Schema::create('pozajmice', function (Blueprint $table) {
            $table->id();
            $table->foreignId('knjiga_id')->constrained('knjige')->onDelete('cascade');
            $table->foreignId('clan_id')->constrained('clanovi')->onDelete('cascade');
            $table->date('datum_pozajmice');
            $table->date('datum_vracanja')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pozajmice');
    }
};
