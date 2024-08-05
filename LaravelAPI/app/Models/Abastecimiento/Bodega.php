<?php

namespace App\Models\Abastecimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bodega extends Model
{
    use HasFactory;
    protected $connection = 'abastecimiento';
    protected $table = "bodega";
    protected $primaryKey = "id_bodega";
}
