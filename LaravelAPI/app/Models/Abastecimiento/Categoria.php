<?php

namespace App\Models\Abastecimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $connection = 'abastecimiento';
    protected $table = "categoria";
    protected $primaryKey = "id_categoria";
}
