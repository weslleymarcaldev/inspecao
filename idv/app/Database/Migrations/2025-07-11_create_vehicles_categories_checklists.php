<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateVehiclesCategoriesChecklists extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                   => ['type' => 'BIGINT', 'auto_increment' => true],
            'checklists_id'        => ['type' => 'BIGINT', 'null' => true],
            'vehicles_categories_id' => ['type' => 'BIGINT', 'null' => true],
            'status'               => ['type' => 'TINYINT', 'default' => 1],
            'created_at'           => ['type' => 'DATETIME', 'null' => true],
            'updated_at'           => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'           => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('checklists_id', 'checklists', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('vehicles_categories_id', 'vehicles_categories', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('vehicles_categories_checklists');
    }

    public function down()
    {
        $this->forge->dropTable('vehicles_categories_checklists');
    }
}
