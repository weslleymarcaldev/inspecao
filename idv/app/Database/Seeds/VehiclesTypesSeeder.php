<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class VehiclesTypesSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['id' => 1, 'name' => 'Carros', 'status' => 1],
            ['id' => 2, 'name' => 'Motos', 'status' => 1],
            ['id' => 3, 'name' => 'Caminhões', 'status' => 1],
            ['id' => 4, 'name' => 'Agregados', 'status' => 1],
        ];

        $this->db->table('vehicles_types')->insertBatch($data);
    }
}
