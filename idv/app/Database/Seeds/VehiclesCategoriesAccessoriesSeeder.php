<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class VehiclesCategoriesAccessoriesSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['id' => 1, 'accessories_id' => 1, 'vehicles_categories_id' => 1],
            ['id' => 2, 'accessories_id' => 2, 'vehicles_categories_id' => 1]
        ];

        $this->db->table('vehicles_categories_accessories')->insertBatch($data);
    }
}
