import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import InspectionsList from './pages/InspectionsList';
import NewInspection from './pages/NewInspection';
import UploadImage from './pages/UploadImage';
import './i18n';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="inspections" element={<InspectionsList />} />
            <Route path="inspections/new" element={<NewInspection />} />
            <Route path="upload" element={<UploadImage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;