<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateVehiclesCategories extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                   => ['type' => 'BIGINT', 'auto_increment' => true],
            'name'                 => ['type' => 'VARCHAR', 'constraint' => 200],
            'icon'                 => ['type' => 'VARCHAR', 'constraint' => 200],
            'status'               => ['type' => 'TINYINT', 'default' => 1],
            'vehicles_types_id'    => ['type' => 'BIGINT'],
            'created_at'           => ['type' => 'DATETIME', 'null' => true],
            'updated_at'           => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'           => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('vehicles_types_id', 'vehicles_types', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('vehicles_categories');
    }

    public function down()
    {
        $this->forge->dropTable('vehicles_categories');
    }
}
