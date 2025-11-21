import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Migration from './pages/Migration';
import AiAssistant from './pages/AiAssistant';
import Documents from './pages/Documents';
import { View, Invoice } from './types';
import { MOCK_INVOICES } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleImport = (newInvoices: Invoice[]) => {
    setInvoices(prev => [...prev, ...newInvoices]);
    alert(`Successfully imported ${newInvoices.length} records.`);
  };

  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
    setSelectedTemplate(null); // Reset template after creation
  };

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentView(View.INVOICES);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard invoices={invoices} />;
      case View.INVOICES:
        return (
          <Invoices 
            invoices={invoices} 
            onCreateInvoice={handleAddInvoice}
            initialTemplateId={selectedTemplate}
          />
        );
      case View.MIGRATION:
        return <Migration onImport={handleImport} />;
      case View.ASSISTANT:
        return <AiAssistant invoices={invoices} />;
      case View.DOCUMENTS:
        return <Documents onUseTemplate={handleUseTemplate} />;
      case View.BANKING:
      case View.REPORTS:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
            <div className="w-16 h-16 border-2 border-slate-200 rounded-full flex items-center justify-center mb-4 border-dashed">
              <span className="text-2xl font-bold">?</span>
            </div>
            <h3 className="text-lg font-medium text-slate-600">Module Under Development</h3>
            <p>This feature is part of the Phase 2 rollout.</p>
          </div>
        );
      default:
        return <Dashboard invoices={invoices} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;