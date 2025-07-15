<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class VehiclesCategoriesChecklistsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['id' => 1, 'checklists_id' => 1, 'vehicles_categories_id' => 1],
            ['id' => 2, 'checklists_id' => 2, 'vehicles_categories_id' => 1],
        ];

        $this->db->table('vehicles_categories_checklists')->insertBatch($data);
    }
}
