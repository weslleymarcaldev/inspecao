<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateInspectionAnalysis extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'                => ['type' => 'INT', 'auto_increment' => true],
            'inspection_id'     => ['type' => 'INT', 'null' => true],
            'plate'             => ['type' => 'VARCHAR', 'constraint' => 15],
            'damage_detected'   => ['type' => 'BOOLEAN', 'default' => false],
            'damage_areas'      => ['type' => 'TEXT', 'null' => true],
            'car_condition'     => ['type' => 'VARCHAR', 'constraint' => 50, 'null' => true],
            'car_angle'         => ['type' => 'VARCHAR', 'constraint' => 50, 'null' => true],
            'confidence'        => ['type' => 'FLOAT', 'null' => true],
            'created_at'        => ['type' => 'DATETIME', 'null' => true],
            'updated_at'        => ['type' => 'DATETIME', 'null' => true],
            'deleted_at'        => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('inspection_analysis');
    }

    public function down()
    {
        $this->forge->dropTable('inspection_analysis');
    }
}
