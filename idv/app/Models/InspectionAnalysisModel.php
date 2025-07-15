<?php

namespace App\Models;

use CodeIgniter\Model;

class InspectionAnalysisModel extends Model
{
    protected $table            = 'inspection_analysis';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $useSoftDeletes   = true;
    protected $returnType       = 'array';
    protected $allowedFields    = [
        'inspection_id',
        'plate',
        'damage_detected',
        'damage_areas',
        'car_condition',
        'car_angle',
        'confidence',
    ];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';
}
