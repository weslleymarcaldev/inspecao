<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateSteps extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                 => ['type' => 'BIGINT', 'auto_increment' => true],
            'name'               => ['type' => 'VARCHAR', 'constraint' => 200],
            'image'              => ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true],
            'description'        => ['type' => 'TEXT'],
            'accept_mimetypes'   => ['type' => 'TEXT', 'null' => true],
            'multiple_files'     => ['type' => 'TINYINT', 'default' => 0],
            'minimum_files'      => ['type' => 'TINYINT', 'default' => 1],
            'children_rules'     => ['type' => 'TINYINT', 'default' => 1],
            'just_horizontal'    => ['type' => 'TINYINT', 'default' => 0],
            'geolocation'        => ['type' => 'TINYINT', 'default' => 0],
            'status'             => ['type' => 'TINYINT', 'default' => 1],
            'services'           => ['type' => 'INT', 'null' => true],
            'nimbloo'            => ['type' => 'TINYINT', 'default' => 0],
            'order'              => ['type' => 'BIGINT', 'default' => 1],
            'categories_id'      => ['type' => 'BIGINT', 'null' => true],
            'vehicles_categories_id' => ['type' => 'BIGINT', 'null' => true],
            'client_type_person' => ['type' => 'TEXT', 'null' => true],
            'checklist'          => ['type' => 'TEXT', 'null' => true],
            'created_at'         => ['type' => 'DATETIME', 'null' => true],
            'updated_at'         => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'         => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('categories_id', 'categories', 'id');
        $this->forge->addForeignKey('vehicles_categories_id', 'vehicles_categories', 'id');
        $this->forge->createTable('steps');
    }

    public function down()
    {
        $this->forge->dropTable('steps');
    }
}
