/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useState} from 'react';
import Sidebar from './components/Sidebar';
import CreditAnalysis from './components/CreditAnalysis';
import AppraisalAnalysis from './components/AppraisalAnalysis';
import TitleValidation from './components/TitleValidation';
import './App.css';

function App() {
  const [activeFeature, setActiveFeature] = useState('ask-gemini');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderFeature = () => {
    switch (activeFeature) {
      case 'ask-gemini':
        return <CreditAnalysis />;
      case 'appraisal-analysis':
        return <AppraisalAnalysis />;
      case 'title-validation':
        return <TitleValidation />;
      default:
        return <CreditAnalysis />;
    }
  };

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        activeFeature={activeFeature}
        onFeatureChange={setActiveFeature}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="main-content">
        {renderFeature()}
      </main>
    </div>
  );
}

export default App;
