<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class VehiclesCategoriesSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'name' => 'Carros e Pick-up Leves/Passeio e Aplicativo',
                'icon' => 'https://apvs-brasil-vist-hml.nyc3.cdn.digitaloceanspaces.com/assets/car.svg',
                'status' => 1,
                'vehicles_types_id' => 1
            ],
            [
                'id' => 2,
                'name' => 'Moto v2 - nova sem angular e com lateral',
                'icon' => 'https://apvs-brasil-vist-hml.nyc3.cdn.digitaloceanspaces.com/assets/moto.svg',
                'status' => 1,
                'vehicles_types_id' => 2
            ]
        ];

        $this->db->table('vehicles_categories')->insertBatch($data);
    }
}
