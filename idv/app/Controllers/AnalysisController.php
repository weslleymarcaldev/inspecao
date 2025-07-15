<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\InspectionAnalysisModel;

class AnalysisController extends BaseController
{
    public function salvar($inspectionId = null)
    {
        $filePath = WRITEPATH . 'uploads/teste.jpg';
        $client = \Config\Services::curlrequest();
        $response = null;
        try {
            $response = $client->request('POST', 'http://localhost:8000/analyze', [
                'multipart' => [
                    [
                        'name'     => 'file',
                        'contents' => fopen($filePath, 'r'),
                        'filename' => basename($filePath)
                    ]
                ]
            ]);

            $statusCode = $response->getStatusCode();
            if ($statusCode !== 200) {
                return $this->response->setStatusCode(502)->setJSON(['error' => 'Erro na API externa']);
            }

            $result = json_decode($response->getBody(), true);
        } catch (\Exception $e) {
            return $this->response->setStatusCode(500)->setJSON(['error' => 'Falha ao conectar à API', 'details' => $e->getMessage()]);
        }

        $model = new InspectionAnalysisModel();
        $model->save([
            'inspection_id'   => $inspectionId,
            'plate'           => $result['plate'] ?? null,
            'damage_detected' => $result['damage_detected'] ?? false,
            'damage_areas'    => json_encode($result['objects_detected'] ?? []),
            'car_condition'   => $result['car_condition'] ?? 'desconhecido',
            'car_angle'       => $result['angle_estimation'] ?? 'desconhecido',
            'confidence'      => $result['confidence'] ?? null,
        ]);

        return $this->response->setJSON(['status' => 'ok', 'data' => $result]);
    }
}
