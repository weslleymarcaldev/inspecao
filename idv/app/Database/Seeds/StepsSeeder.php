<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class StepsSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'name' => 'Selfie',
                'image' => 'carro-selfie-v2.jpg',
                'description' => 'Tire uma selfie na frente do carro e posicione a câmera para que o seu veículo fique no ângulo de 45º.',
                'just_horizontal' => 1,
                'order' => 1,
                'categories_id' => 1,
                'vehicles_categories_id' => 1
            ],
            [
                'id' => 2,
                'name' => 'Dianteira',
                'image' => 'carro-angular-dianteira-direita-v2.png',
                'description' => 'Tire uma foto posicionado em frente ao veículo. A placa deve estar visível.',
                'just_horizontal' => 1,
                'order' => 2,
                'categories_id' => 1,
                'vehicles_categories_id' => 1
            ]
        ];

        $this->db->table('steps')->insertBatch($data);
    }
}
