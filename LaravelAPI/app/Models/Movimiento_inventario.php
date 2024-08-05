<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Abastecimiento\Bodega;

class Movimiento_inventario extends Model
{
    use HasFactory;
    protected $connection = 'abastecimiento';
    protected $table = "movimiento_inventario";
    protected $primaryKey = "id_movimiento_inventario";

    public function bodega()
    {
        return $this->belongsTo(Bodega::class, "id_bodega");
    }

    public static function kardex()
    {
        return self::select(
            'movimiento_inventario.id_bodega',
            'movimiento_inventario.id_producto',
            DB::raw('SUM(movimiento_inventario.entrada - movimiento_inventario.salida) AS stock_actual')
        )
            ->with('bodega')
            ->groupBy('movimiento_inventario.id_bodega', 'movimiento_inventario.id_producto')
            ->limit(20)
            ->get()
            ->map(function ($item) {
                $item->nombre_bodega = $item->bodega->descripcion; // Añadir la descripción de la bodega al resultado
                return $item;
            });
    }
}
