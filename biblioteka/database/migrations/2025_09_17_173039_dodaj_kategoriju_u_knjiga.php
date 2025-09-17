<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('knjige', function (Blueprint $table) {
            $table->enum('kategorija', [
                'fikcija',
                'filozofija',
                'naucna_fantastika',
                'klasici',
                'triler',
                'istorija',
                'nauka',
                'drama',
                'komedija',
                'decija_knjiga',
                'popularna_psihologija',
                'prirucnik',
                'ostalo'
            ])->after('pisac');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('knjige', function (Blueprint $table) {
            $table->dropColumn('kategorija');
        });
    }
};
