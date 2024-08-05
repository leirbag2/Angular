<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Abastecimiento\Inventario;

class ResumenInventario extends Controller
{
    public function index(Request $request)
    {


        // $inventarios = Inventario::whereHas('producto', function ($query) {
        //     $query->where('habilitado', 1);
        // })
        //     ->with(['producto.categoria', 'bodega'])
        //     ->where('stock_actual', '>', 0)
        //     ->limit(200)
        //     ->get();
        // $formattedInventarios = $inventarios->map(function ($inventario) {
        //     return [
        //         'id_inventario' => $inventario->id_inventario,
        //         'id_producto' => $inventario->producto->id_producto,
        //         'codigo_barra' => $inventario->producto->codigo_barra,
        //         'producto' => $inventario->producto->descripcion,
        //         'categoria' => $inventario->producto->categoria->descripcion,
        //         'bodega' => $inventario->bodega->descripcion,
        //         'stock_actual' => $inventario->stock_actual,
        //     ];
        // });

        $inventarios = Inventario::select(
            "inventario.id_inventario",
            "inventario.id_producto",
            "inventario.id_bodega",
            "inventario.stock_actual",
            "producto.codigo_barra",
            "producto.descripcion AS producto",
            "categoria.descripcion AS categoria",
            "bodega.descripcion AS bodega"
        )
            ->join("producto", "inventario.id_producto", "=", "producto.id_producto")
            ->join("categoria", "producto.id_categoria_padre", "=", "categoria.id_categoria")
            ->join("bodega", "inventario.id_bodega", "=", "bodega.id_bodega")
            ->where("producto.habilitado", 1)
            ->where("stock_actual", ">", 0)
            ->get();
        return response()->json($inventarios, 200);
    }
}
