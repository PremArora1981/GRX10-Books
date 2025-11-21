import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Download, Printer, ArrowLeft, Save } from 'lucide-react';
import { Invoice, InvoiceStatus } from '../types';
import { MOCK_CUSTOMERS } from '../constants';

interface InvoicesProps {
  invoices: Invoice[];
  onCreateInvoice?: (invoice: Invoice) => void;
  initialTemplateId?: string | null;
}

const Invoices: React.FC<InvoicesProps> = ({ invoices, onCreateInvoice, initialTemplateId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [formCustomer, setFormCustomer] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formAmount, setFormAmount] = useState('');

  useEffect(() => {
    if (initialTemplateId) {
      setIsCreating(true);
    }
  }, [initialTemplateId]);

  const filteredInvoices = invoices.filter(inv => 
    inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case InvoiceStatus.OVERDUE: return 'bg-red-100 text-red-700 border-red-200';
      case InvoiceStatus.SENT: return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const handleSaveInvoice = () => {
     if (!onCreateInvoice) return;
     
     const amount = parseFloat(formAmount) || 0;
     const cust = MOCK_CUSTOMERS.find(c => c.id === formCustomer);

     const newInvoice: Invoice = {
        id: Math.random().toString(36).substring(2, 9),
        number: `INV-2024-${(invoices.length + 1).toString().padStart(3, '0')}`,
        date: formDate,
        dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        customerId: formCustomer,
        customerName: cust ? cust.name : 'Unknown Customer',
        status: InvoiceStatus.SENT,
        subTotal: amount,
        taxTotal: amount * 0.18,
        total: amount * 1.18,
        items: []
     };

     onCreateInvoice(newInvoice);
     setIsCreating(false);
     setFormAmount('');
     setFormCustomer('');
  };

  if (isCreating) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
         <div className="flex items-center gap-4">
            <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
               <ArrowLeft size={20} />
            </button>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">Create New Invoice</h2>
               <p className="text-slate-500">
                  {initialTemplateId ? `Using Template: ${initialTemplateId}` : 'Standard GST Invoice'}
               </p>
            </div>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
                  <select 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formCustomer}
                    onChange={e => setFormCustomer(e.target.value)}
                  >
                     <option value="">Select Customer</option>
                     {MOCK_CUSTOMERS.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                     ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Date</label>
                  <input 
                    type="date" 
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                  />
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Total Amount (₹)</label>
               <input 
                 type="number" 
                 placeholder="0.00" 
                 className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                 value={formAmount}
                 onChange={e => setFormAmount(e.target.value)}
               />
               <p className="text-xs text-slate-500 mt-1">GST (18%) will be calculated automatically.</p>
            </div>

            <div className="pt-4 flex justify-end gap-3">
               <button 
                 onClick={() => setIsCreating(false)}
                 className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleSaveInvoice}
                 disabled={!formCustomer || !formAmount}
                 className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 <Save size={18} /> Save Invoice
               </button>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sales Invoices</h2>
          <p className="text-slate-500">Manage your billing and GST returns</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm shadow-emerald-200"
        >
          <Plus size={18} />
          New Invoice
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Name or INV#..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Invoice #</th>
                <th className="px-6 py-4 font-semibold">Customer Name</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{inv.date}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600 whitespace-nowrap">{inv.number}</td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{inv.customerName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-700">{formatINR(inv.total)}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3 text-slate-400">
                         <button className="hover:text-blue-600 transition-colors"><Printer size={16}/></button>
                         <button className="hover:text-slate-700 transition-colors"><MoreHorizontal size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No invoices found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
           <span>Showing {filteredInvoices.length} records</span>
           <div className="flex gap-1">
             <button className="px-2 py-1 border rounded bg-white hover:bg-slate-100 disabled:opacity-50" disabled>Prev</button>
             <button className="px-2 py-1 border rounded bg-white hover:bg-slate-100">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Invoices;