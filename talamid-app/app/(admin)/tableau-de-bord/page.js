"use client";
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7');

  const stats = [
    { label: "Utilisateurs totaux", value: "12,403", grow: "+12.5%", color: "text-indigo-600", bg: "bg-indigo-50", icon: "fa-users" },
    { label: "Revenus de la plateforme", value: "89,200.00 DH", grow: "+8.2%", color: "text-green-600", bg: "bg-green-50", icon: "fa-wallet" },
    { label: "Enseignants actifs", value: "482", grow: "+4.1%", color: "text-blue-600", bg: "bg-blue-50", icon: "fa-chalkboard-teacher" },
    { label: "Demandes en attente", value: "23", grow: "Critique", color: "text-red-600", bg: "bg-red-50", icon: "fa-exclamation-circle" },
  ];

  const recentActivity = [
    { name: "Hamza Banani", action: "Inscrit comme Enseignant", time: "il y a 2 minutes" },
    { name: "Safae Radi", action: "Nouveau paiement : 450 MAD", time: "il y a 2 minutes" },
    { name: "Maryam Assem", action: "Nouveau paiement : 350 MAD", time: "il y a 2 minutes" },
    { name: "Hassan Taliss", action: "Inscrit comme Étudiant", time: "il y a 2 minutes" },
  ];

  const chartPaths = {
    '7': "M0,80 Q50,60 100,75 T200,40 T300,60 T400,30",
    '30': "M0,90 C50,90 100,20 150,50 S250,10 300,80 S350,40 400,10"
  };

  return (
    <div className="flex-1 space-y-8 p-2">
      <div>
        <h1 className="text-2xl font-black text-[#121A4B]">Bienvenue Karim sur votre tableau de bord</h1>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex-1 min-w-[200px]">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.grow === "Critique" ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {stat.grow}
              </span>
            </div>
            <p className="text-gray-400 text-[11px] font-bold mb-1 truncate whitespace-nowrap">{stat.label}</p>
            <h3 className={`text-[18px] font-black ${stat.grow === "Critique" ? 'text-red-600' : 'text-[#121A4B]'} truncate`}>
                {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-black text-[#121A4B] text-lg">Analyse des Revenus</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-50 border-none text-[11px] font-bold rounded-lg px-3 py-2 outline-none cursor-pointer text-gray-500"
            >
              <option value="7">7 derniers jours</option>
              <option value="30">30 derniers jours</option>
            </select>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col justify-between text-[10px] text-gray-300 font-bold h-64 pb-8">
              <span>{timeRange === '7' ? '10000' : '50000'}</span>
              <span>{timeRange === '7' ? '7500' : '37500'}</span>
              <span>{timeRange === '7' ? '5000' : '25000'}</span>
              <span>{timeRange === '7' ? '2500' : '12500'}</span>
              <span>0</span>
            </div>

            <div className="relative flex-1 h-64 pb-8"> 
              <div className="relative w-full h-full border-b border-l border-gray-100">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border-t border-gray-50 w-full h-0"></div>
                  ))}
                  <div className="h-0"></div>
                </div>

                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path 
                    d={chartPaths[timeRange]} 
                    fill="none" 
                    stroke="#5c4df3" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                  />
                </svg>
              </div>

              <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                {timeRange === '7' ? (
                  <><span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span></>
                ) : (
                  <><span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span></>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
             <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-orange-500 text-xs"></i>
             </div>
            <h3 className="font-black text-[#121A4B]">Alertes Critiques</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-red-50  border-red-100 rounded-2xl">
              <h4 className="text-red-700 font-black text-sm">Échec du paiement</h4>
              <p className="text-red-500 text-[11px] font-bold">L'enseignant ID: #4822 a échoué son retrait.</p>
            </div>
            <div className="p-4 bg-orange-50  border-orange-100 rounded-2xl">
              <h4 className="text-orange-700 font-black text-sm">Signalement contenu</h4>
              <p className="text-orange-500 text-[11px] font-bold">Vidéo signalée pour problème de qualité.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 flex justify-between items-center border-b border-gray-50">
          <h3 className="font-black text-[#121A4B] text-lg">Activité récente</h3>
          <button className="text-[#5c4df3] font-black text-sm px-4 py-2 hover:bg-indigo-50 rounded-xl transition-all">Voir tout</button>
        </div>
        <div className="divide-y divide-gray-50">
          {recentActivity.map((act, i) => (
            <div key={i} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#5c4df3] font-black text-xs shadow-sm">
                  {act.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-black text-[#121A4B] text-[14px]">{act.name}</h4>
                  <p className="text-gray-400 text-[11px] font-bold">{act.action}</p>
                </div>
              </div>
              <span className="text-gray-300 text-[10px] font-black uppercase tracking-tighter">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}