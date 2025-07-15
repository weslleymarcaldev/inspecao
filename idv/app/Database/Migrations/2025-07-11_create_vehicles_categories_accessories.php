<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateVehiclesCategoriesAccessories extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                   => ['type' => 'BIGINT', 'auto_increment' => true],
            'accessories_id'       => ['type' => 'BIGINT', 'null' => true],
            'vehicles_categories_id' => ['type' => 'BIGINT', 'null' => true],
            'created_at'           => ['type' => 'DATETIME', 'null' => true],
            'updated_at'           => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'           => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('accessories_id', 'accessories', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('vehicles_categories_id', 'vehicles_categories', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('vehicles_categories_accessories');
    }

    public function down()
    {
        $this->forge->dropTable('vehicles_categories_accessories');
    }
}
