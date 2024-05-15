import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from '@/routes/Routes';

import AppLayout from '@/components/_layouts/AppLayout';
import { Spin } from 'antd';
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Spin size="large" fullscreen />}>
        <AppLayout>
          <AppRoutes />   
        </AppLayout>
      </Suspense>
    </Router>
  );
};

export default App;
