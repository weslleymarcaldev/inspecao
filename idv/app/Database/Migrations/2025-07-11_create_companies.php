<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCompanies extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'               => ['type' => 'INT', 'auto_increment' => true],
            'name'             => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'logo_url'         => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'logo_watermark'   => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'text_watermark'   => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'auth_url_api'     => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'api_key'          => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'hub_key'          => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'maps_key'         => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            's3_endpoint'      => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            's3_key'           => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            's3_secret'        => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            's3_bucket'        => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'created_at'       => ['type' => 'DATETIME', 'null' => true],
            'updated_at'       => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'       => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('companies');
    }

    public function down()
    {
        $this->forge->dropTable('companies');
    }
}
