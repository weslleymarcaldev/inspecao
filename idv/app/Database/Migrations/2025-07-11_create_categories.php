<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCategories extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                 => ['type' => 'BIGINT', 'auto_increment' => true],
            'name'               => ['type' => 'VARCHAR', 'constraint' => 200],
            'url'                => ['type' => 'VARCHAR', 'constraint' => 200],
            'status'             => ['type' => 'TINYINT', 'default' => 1],
            'order'              => ['type' => 'BIGINT', 'default' => 1],
            'client_type_person' => ['type' => 'TEXT', 'null' => true],
            'created_at'         => ['type' => 'DATETIME', 'null' => true],
            'updated_at'         => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'         => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('categories');
    }

    public function down()
    {
        $this->forge->dropTable('categories');
    }
}
