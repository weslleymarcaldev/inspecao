<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class CompaniesSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'name' => 'Capturia',
                's3_endpoint' => 'https://nyc3.digitaloceanspaces.com/',
                's3_key' => 'DO00PGNXC6GQZD7QPV6P',
                's3_secret' => '83q0Ho0rriqzd5iOynhv7xh6cSLAM6rhcD6LPwY7D0g',
                's3_bucket' => 'capturia-vone-hml',
                'created_at' => '2025-04-14 13:35:15',
                'updated_at' => '2025-04-14 13:35:16',
            ],
            [
                'id' => 2,
                'name' => 'Apvs Brasil',
                'logo_url' => 'https://apvs-brasil-vist-hml.nyc3.cdn.digitaloceanspaces.com/assets/logo-apvs.png',
                'logo_watermark' => 'https://apvs-brasil-vist-hml.nyc3.cdn.digitaloceanspaces.com/assets/apvs-logo-watermark.png',
                'text_watermark' => 'Apvs Brasil',
                'auth_url_api' => 'https://apiv2.apvs.vc/api/login/',
                'api_key' => 'b09d33e37705f1f0ba23de09cf9aea8df82eac9f706d528e02a21b99fdc63821',
                'hub_key' => 'wkzEfrjCFX84KSmivM0ZeuqdLNtnOp',
                'maps_key' => 'AIzaSyB5LGmBHhfFQE4M77q8LU2iOLkxMcB1KNA',
                's3_endpoint' => 'https://nyc3.digitaloceanspaces.com/',
                's3_key' => 'DO00PGNXC6GQZD7QPV6P',
                's3_secret' => '83q0Ho0rriqzd5iOynhv7xh6cSLAM6rhcD6LPwY7D0g',
                's3_bucket' => 'capturia-vone-hml',
                'created_at' => '2025-04-14 13:35:27',
                'updated_at' => '2025-04-14 13:35:27',
            ]
        ];

        $this->db->table('companies')->insertBatch($data);
    }
}
