"use client";
import React, { useState, useRef } from 'react';

export default function FinanceSysteme() {
  const [activeTab, setActiveTab] = useState('Paramètres');
  const fileInputRef = useRef(null);

  const defaultLogo = "/data/talamid-logo.png";

  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { id: 1, bank: "CIH Bank", acc: "****2931", amount: "2,500 MAD" },
    { id: 2, bank: "Attijariwafa", acc: "****8822", amount: "1,200 MAD" },
    { id: 3, bank: "BMCE Bank", acc: "****4400", amount: "3,750 MAD" },
    { id: 4, bank: "Banque Populaire", acc: "****1198", amount: "850 MAD" },
  ]);

  const [settings, setSettings] = useState({
    name: "Talamid",
    currency: "MAD (Dirham Marocain)",
    logo: defaultLogo 
  });

  const accessLogs = [
    { id: 1, action: "Connexion Admin Réussie", ip: "192.168.1.012", date: "Aujourd'hui, 14:32", status: "success" },
    { id: 2, action: "Mot de passe utilisateur modifié", ip: "192.168.1.024", date: "Aujourd'hui, 14:32", status: "neutral" },
    { id: 3, action: "Mot de passe utilisateur modifié", ip: "192.168.1.036", date: "Aujourd'hui, 14:32", status: "neutral" },
    { id: 4, action: "Mot de passe utilisateur modifié", ip: "192.168.1.048", date: "Aujourd'hui, 14:32", status: "neutral" },
  ];

  const handleDelete = (id) => {
    setWithdrawalRequests(withdrawalRequests.filter(req => req.id !== id));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings({ ...settings, logo: URL.createObjectURL(file) });
    }
  };

  const handleReset = () => {
    setSettings({
      name: "Talamid",
      currency: "MAD (Dirham Marocain)",
      logo: defaultLogo
    });
  };

  return (
    <div className="min-h-screen bg-bg-light p-4 md:p-10 font-sans text-primary-dark">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-primary-dark">Finance & Système</h1>
            <p className="text-sidebar-text text-sm font-medium">Suivi financier et configurations du système</p>
          </div>

          <div className="flex bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm w-fit">
            {['Finance', 'Paramètres', 'Sécurité'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-xl text-[12px] font-black transition-all cursor-pointer ${
                  activeTab === tab 
                  ? 'bg-primary-light text-white shadow-md' 
                  : 'text-sidebar-text hover:text-primary-light hover:bg-sidebar-active'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Finance' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-light p-8 rounded-[24px] text-white shadow-lg relative overflow-hidden">
                <p className="text-[11px] font-bold opacity-80 uppercase tracking-widest mb-2">Revenu net total</p>
                <h3 className="text-4xl font-black mb-6">42,300 DH</h3>
                <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-black cursor-pointer transition-all">
                  Rapport complet
                </button>
              </div>
              <div className="bg-white p-8 rounded-[24px] border-l-4 border-accent shadow-sm border border-gray-100">
                <p className="text-sidebar-text text-[11px] font-bold uppercase mb-2">Paiements en attente</p>
                <h3 className="text-4xl font-black text-primary-dark">8,450 DH</h3>
              </div>
              <div className="bg-white p-8 rounded-[24px] border-l-4 border-green-500 shadow-sm border border-gray-100">
                <p className="text-sidebar-text text-[11px] font-bold uppercase mb-2">Transactions</p>
                <h3 className="text-4xl font-black text-primary-dark">1,240</h3>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h3 className="font-black text-primary-dark">Demandes de retrait</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {withdrawalRequests.map((req) => (
                  <div key={req.id} className="p-6 flex items-center justify-between hover:bg-sidebar-active/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-bg-light rounded-xl flex items-center justify-center text-sidebar-text">
                        <i className="fas fa-wallet text-sm"></i>
                      </div>
                      <div className="text-[11px] font-bold text-sidebar-text uppercase">
                        Banque: <span className="text-primary-dark">{req.bank}</span> • COMPTE: <span className="text-primary-dark">{req.acc}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="font-black text-primary-dark text-sm">{req.amount}</span>
                      <button 
                        onClick={() => handleDelete(req.id)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm"
                      >
                        <i className="fas fa-trash-alt text-[12px]"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Paramètres' && (
          <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm animate-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <div className="p-10 space-y-12">
              <h3 className="text-xl font-bold text-gray-800">Identité visuelle</h3>
              
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="flex-1 w-full space-y-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-primary-light uppercase tracking-wider">Nom de la plateforme</label>
                    <input 
                      type="text" 
                      value={settings.name}
                      onChange={(e) => setSettings({...settings, name: e.target.value})}
                      className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none font-bold text-primary-dark focus:ring-2 focus:ring-primary-light/20 transition-all" 
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-primary-light uppercase tracking-wider">Devise de base</label>
                    <input 
                      type="text" 
                      value={settings.currency}
                      onChange={(e) => setSettings({...settings, currency: e.target.value})}
                      className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none font-bold text-primary-dark" 
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-6 min-w-[280px]">
                  <label className="block text-sm font-bold text-primary-light uppercase tracking-wider">Logo actuel</label>
                  
                  <div className="relative group">
                    <div className="flex-shrink-0 w-30 h-30 rounded-full border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center overflow-hidden aspect-square">
                        <img 
                            src={settings.logo} 
                            alt="Logo" 
                            className=" object-cover block" 
                        />
                    </div>
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-2 right-2 w-12 h-12 bg-white border border-gray-100 rounded-full shadow-lg flex items-center justify-center text-primary-light hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <i className="fas fa-camera text-lg"></i>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleLogoChange} 
                    />
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <button 
                      onClick={handleReset}
                      className="w-full py-3 border-2 border-primary-light/10 text-primary-light font-bold rounded-xl hover:bg-gray-50 transition-all cursor-pointer text-xs uppercase"
                    >
                      Réinitialiser
                    </button>
                    <button className="w-full py-4 bg-primary-light text-white font-bold rounded-xl shadow-lg shadow-primary-light/20 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer text-xs uppercase">
                      Enregistrer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Sécurité' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            
            <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex items-center gap-3">
                <i className="fas fa-lock text-sidebar-text text-sm"></i>
                <h3 className="font-bold text-primary-dark text-sm">Journaux d'accès</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {accessLogs.map((log) => (
                  <div key={log.id} className="p-5 flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-primary-light' : 'bg-gray-200'}`}></div>
                      <span className="font-bold text-primary-dark">{log.action}</span>
                    </div>
                    <div className="flex items-center gap-12 text-sidebar-text font-medium">
                      <span>IP: {log.ip}</span>
                      <span>{log.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm p-20 flex flex-col items-center justify-center text-center relative">
               <div className="absolute top-30 left-6 flex items-center gap-3">
                 <h3 className="font-bold text-primary-dark text-sm">Suivi des activités suspectes</h3>
               </div>
               
               <div className="w-10 h-20 text-green-500 rounded-3xl flex items-center justify-center mb-6">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
               </div>
               
               <h4 className="text-xl font-black text-primary-dark mb-2 absolute top-0">Système Sécurisé</h4>
               <p className="text-sidebar-text text-sm max-w-xs mb-8">Aucun comportement inhabituel détecté au cours des dernières 24 heures.</p>
               
               <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-primary-light"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
               </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}