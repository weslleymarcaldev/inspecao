<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Popula tabelas em ordem de dependência
        $this->call('VehiclesTypesSeeder');
        $this->call('VehiclesCategoriesSeeder');
        $this->call('CategoriesSeeder');
        $this->call('AccessoriesSeeder');
        $this->call('ChecklistsSeeder');
        $this->call('VehiclesCategoriesAccessoriesSeeder');
        $this->call('VehiclesCategoriesChecklistsSeeder');
        $this->call('CompaniesSeeder');
        $this->call('StepsSeeder');
        $this->call('InspectionsSeeder');
        $this->call('InspectionsFilesSeeder');
    }
}
