<?php

namespace App\Models\Abastecimiento;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $connection = 'abastecimiento';
    protected $table = 'producto';
    protected $primaryKey = "id_producto";

    public function inventario()
    {
        return $this->hasMany(Inventario::class, "id_producto");
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria_padre');
    }
}
