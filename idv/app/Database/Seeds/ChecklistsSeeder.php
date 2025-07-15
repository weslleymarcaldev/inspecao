<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ChecklistsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['id' => 1, 'description' => 'Chassi remarcado?'],
            ['id' => 2, 'description' => 'Possui kit gás (com selo imetro)?'],
            ['id' => 3, 'description' => 'Veículo adaptado/modificado?'],
            ['id' => 4, 'description' => 'Veículo rebaixado?'],
            ['id' => 6, 'description' => 'Advindo de indenização integral?'],
            ['id' => 7, 'description' => 'Proveniente de leilão?'],
            ['id' => 8, 'description' => 'Isenção fiscal?'],
            ['id' => 9, 'description' => 'Prestador de serviço/placa vermelha?'],
        ];

        $this->db->table('checklists')->insertBatch($data);
    }
}
