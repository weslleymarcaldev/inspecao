<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AccessoriesSeeder extends Seeder
{
    public function run()
    {
        $data = [];
        for ($i = 1; $i <= 42; $i++) {
            $data[] = [
                'id' => $i,
                'name' => 'Acessório ' . $i,
                'status' => 1
            ];
        }

        $this->db->table('accessories')->insertBatch($data);
    }
}
