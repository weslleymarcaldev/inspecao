<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    public function run()
    {
        $data = [
            ['id' => 1, 'name' => 'Fotos', 'url' => 'fotos', 'status' => 1, 'order' => 1],
            ['id' => 2, 'name' => 'Chassi', 'url' => 'chassi', 'status' => 1, 'order' => 2],
            ['id' => 3, 'name' => 'Avarias', 'url' => 'avarias', 'status' => 1, 'order' => 3],
            ['id' => 4, 'name' => 'Documentos', 'url' => 'documentos', 'status' => 1, 'order' => 4],
            ['id' => 5, 'name' => 'CRLV', 'url' => 'crlv', 'status' => 1, 'order' => 5],
            ['id' => 6, 'name' => 'Acessórios', 'url' => 'acessorios', 'status' => 1, 'order' => 6],
            ['id' => 7, 'name' => 'Nota Fiscal', 'url' => 'nota-fiscal', 'status' => 1, 'order' => 7],
            ['id' => 8, 'name' => 'Orçamento', 'url' => 'orcamento', 'status' => 1, 'order' => 8],
            ['id' => 9, 'name' => 'Boletim de ocorrência', 'url' => 'boletim-de-ocorrencia', 'status' => 1, 'order' => 9],
        ];

        $this->db->table('categories')->insertBatch($data);
    }
}
