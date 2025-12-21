"use client";
import React, { useRef, useState } from 'react';

export default function TeacherDashboard() {
  const fileInputRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // State for the delete logic
  const [requests, setRequests] = useState([
    { id: 1, initial: "HB", name: "Hamza.B" },
    { id: 2, initial: "SR", name: "Maryam.T" },
    { id: 3, initial: "MT", name: "Safae.R" }
  ]);

  const deleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 bg-[#F8F9FB] p-8 overflow-y-auto no-scrollbar">
      
      {/* 1. Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[24px] font-black text-primary-dark">
          Bienvenue Karim sur votre tableau de bord
        </h1>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#27AE60] rounded-full"></span>
          
          <span className="text-[11px] font-bold uppercase tracking-wider" 
      style={{ color: '#27AE60' }}
    >
      En ligne et disponible
          </span>
        </div>
      </div>

 
      <div className="flex flex-row gap-4 mb-8 w-full">
        <StatCard icon="fa-wallet" label="Gains actuels" value="18,450.00 DH" color="text-primary-light" />
        <StatCard icon="fa-users" label="Nombre total d'étudiants" value="142" color="text-[#27AE60]" />
        <StatCard icon="fa-star" label="Note moyenne" value="4.9" color="text-yellow-500" />
        <StatCard icon="fa-clock" label="Tâches en attente" value="8" color="text-red-500" />
      </div>

 
      <div className="flex flex-row gap-8 items-stretch h-full">
        
        <div className="flex-[1.4] flex flex-col gap-8">
          
          <section className="bg-white border border-gray-100 rounded-[35px] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-black text-[18px] text-primary-dark flex items-center gap-3">
                <i className="far fa-file-alt"></i> Demandes des étudiants
              </h2>
              <div className="relative w-[350px]">
                <input 
                  type="text" 
                  placeholder="Rechercher une demande..." 
                  className="w-full px-6 py-6 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:border-primary-light transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              {requests.map((req) => (
                <RequestRow 
                  key={req.id} 
                  initial={req.initial} 
                  name={req.name} 
                  onDelete={() => deleteRequest(req.id)} 
                />
              ))}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[35px] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black text-[18px] text-primary-dark">Croissance mensuelle des revenus</h2>
              <i className="fas fa-chart-line text-primary-light"></i>
            </div>
            
            <div className="relative h-64 mt-4 mb-4 pr-4 overflow-visible">
              <div className="absolute left-0 h-full flex flex-col justify-between text-[11px] font-bold text-gray-400">
                <span>8000</span><span>6000</span><span>4000</span><span>2000</span><span>0</span>
              </div>

              <div className="ml-14 h-full relative" 
                   onMouseEnter={() => setHovered(true)} 
                   onMouseLeave={() => setHovered(false)}>
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <path d="M0,160 Q150,175 300,120 T600,60" fill="none" stroke="#4A1A9C" strokeWidth="4" />
                  <circle cx="300" cy="120" r="5" fill="#4A1A9C" />
                  
                  {hovered && (
                    <g transform="translate(310, 60)">
                      <rect width="115" height="50" rx="15" fill="white" className="drop-shadow-xl" />
                      <text x="57" y="30" textAnchor="middle" className="text-[10px] font-black fill-gray-400 uppercase">Montant : 2800</text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="flex justify-between ml-14 mt-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span>
              </div>
            </div>
          </section>
        </div>

        <div className="flex-1 min-w-[500px]"> 
          <section className="bg-primary-light p-10 rounded-[50px] text-white h-full flex flex-col relative shadow-2xl">
            <h2 className="text-[28px] font-black leading-tight mb-6">Téléversement<br/>rapide</h2>
            <p className="text-[12px] opacity-70 mb-8 font-medium leading-relaxed">
              Publiez instantanément du nouveau contenu vidéo gratuit ou payant dans votre bibliothèque.
            </p>

            <input type="file" ref={fileInputRef} className="hidden" accept="video/*" />

            <div onClick={handleUploadClick} className="border-2 border-dashed border-white/20 rounded-[35px] h-52 flex flex-col items-center justify-center mb-8 cursor-pointer hover:bg-white/5 transition-all">
              <i className="fas fa-plus text-4xl block mb-2"></i>
              <span className="text-[11px] font-black tracking-[0.2em] w-full text-center">SÉLECTIONNER UN FICHIER VIDÉO</span>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="w-full">
                <label className="text-[11px] font-black opacity-60 uppercase tracking-widest mb-2 block">TITRE *</label>
                <input type="text" placeholder="Écrivez le titre de la leçon" className="w-full bg-[#3D1A8C] rounded-2xl px-6 py-4 text-sm outline-none placeholder:text-white/30 border border-white/5 font-bold" />
              </div>
              <div className="w-full">
                <label className="text-[11px] font-black opacity-60 uppercase tracking-widest mb-2 block">DESCRIPTION (OPTIONNEL)</label>
                <textarea rows="4" placeholder="Rédigez sa description" className="w-full bg-[#3D1A8C] rounded-2xl px-6 py-4 text-sm outline-none placeholder:text-white/30 border border-white/5 resize-none font-bold" />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="bg-white text-primary-light w-full py-5 rounded-full font-black text-[15px] uppercase tracking-[0.2em] shadow-xl hover:bg-gray-50 transition-all active:scale-95">
                accepter
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-[24px] flex items-center gap-5 flex-1 shadow-sm">
      <div className="w-14 h-14 bg-[#F8F9FB] rounded-2xl flex items-center justify-center text-primary-dark text-xl">
        <i className={`fas ${icon}`}></i>
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-[17px] font-black ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function RequestRow({ initial, name, onDelete }) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-[28px] hover:shadow-sm transition-all group">
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 bg-[#E9E7FF] text-primary-light rounded-full flex items-center justify-center font-black text-xs">{initial}</div>
        <div>
          <p className="text-[14px] font-black text-primary-dark tracking-tight">Correction de l'exercice : Nombres complexes</p>
          <p className="text-[11px] text-gray-400 font-bold mt-1">Étudiant : {name} • 2e Bac • <span className="text-primary-light font-black">20 DH</span></p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button onClick={onDelete} className="hover:scale-110 transition-transform">
          <i className="fas fa-times-circle text-[24px] text-red-500 hover:text-red-700 cursor-pointer"></i>
        </button>
        <button className="bg-primary-light text-white px-10 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.1em]">accepter</button>
      </div>
    </div>
  );
}