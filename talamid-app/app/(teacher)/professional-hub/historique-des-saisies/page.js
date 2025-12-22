"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function HistoriqueSaisiesPage() {
  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Prof. Ahmed Amrani",
    specialty: "Spécialiste en Mathématiques - 2ème Bac & Collège",
    location: "Casablanca, Maroc",
    students: "890 étudiants",
    hourlyRate: "150 DH",
    correctionFee: "20 DH",
  });

  const [bannerImg, setBannerImg] = useState("/data/banner.jpg");
  const [profileImg, setProfileImg] = useState("/data/prof-photo.png");

  const transactions = [
    { id: 1, type: "withdrawal", title: "Retrait vers CIH Bank", date: "24 Oct, 2023 • 14:30", amount: "-2,000 DH", color: "text-red-500", icon: "fas fa-arrow-up-right-from-square" },
    { id: 2, type: "commission", title: "Commission : Correction d'exercice", date: "24 Oct, 2023 • 14:30", amount: "+18.00 DH", color: "text-green-500", icon: "fas fa-sync-alt" },
    { id: 3, type: "commission", title: "Commission : Correction d'exercice", date: "24 Oct, 2023 • 14:30", amount: "+18.00 DH", color: "text-green-500", icon: "fas fa-sync-alt" },
  ];

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImg(URL.createObjectURL(file));
  };

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  return (
    <div className="flex-1 bg-white p-4 md:p-8 overflow-y-auto no-scrollbar font-sans">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[18px] md:text-[20px] font-black text-[#121A4B]">Espace Professionnel</h1>
      </div>

      <div className="relative mb-6">
        <div style={{ height: '140px' }} className="md:h-[180px] relative w-full rounded-[24px] overflow-hidden bg-[#121A4B]">
          {bannerImg ? (
            <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-indigo-900/20" />
          )}
          <div 
            onClick={() => bannerInputRef.current.click()} 
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white border border-white/30 hover:bg-white/40 transition-all cursor-pointer z-20"
          >
            <i className="fas fa-cog text-md md:text-lg"></i>
          </div>
          <input type="file" ref={bannerInputRef} hidden onChange={handleBannerChange} accept="image/*" />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 -mt-8 md:-mt-10 px-4 md:px-8 relative z-10 text-center md:text-left">
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[4px] border-white shadow-md overflow-hidden bg-gray-200">
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div 
              onClick={() => profileInputRef.current.click()} 
              className="absolute bottom-0 right-0 bg-[#5c4df3] text-white w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-all z-20"
            >
              <i className="fas fa-camera text-[8px] md:text-[10px]"></i>
            </div>
            <input type="file" ref={profileInputRef} hidden onChange={handleProfileImgChange} accept="image/*" />
          </div>

          <div className="flex-1 pt-2 md:pt-12 w-full"> 
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1 w-full">
                {isEditing ? (
                  <input 
                    className="text-xl md:text-2xl font-black text-[#121A4B] bg-transparent border-b-2 border-[#5c4df3] outline-none w-full mb-2 text-center md:text-left"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <h2 className="text-[20px] md:text-[24px] font-black text-[#121A4B]">{profile.name}</h2>
                )}
                
                {isEditing ? (
                  <input 
                    className="block w-full text-[#5c4df3] font-bold text-sm bg-transparent border-b border-gray-200 outline-none text-center md:text-left"
                    value={profile.specialty}
                    onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                  />
                ) : (
                  <p className="text-[#5c4df3] font-bold text-xs md:text-sm">
                    {profile.specialty} <span className="block md:inline-block mt-1 md:mt-0"><span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-600">⭐ 4.8</span></span>
                  </p>
                )}
                
                <p className="text-gray-400 font-bold text-[10px] md:text-xs mt-1">
                  <i className="fas fa-map-marker-alt mr-1 md:mr-2"></i>{profile.location} 
                  <span className="mx-2">•</span>
                  <i className="fas fa-user-friends mr-1 md:mr-2"></i>{profile.students}
                </p>
              </div>
              
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="w-full md:w-auto px-8 py-2.5 bg-[#F8F9FB] border border-gray-100 rounded-xl text-[12px] font-black text-[#5c4df3] shadow-sm hover:bg-[#5c4df3] hover:text-white transition-all cursor-pointer active:scale-95"
              >
                {isEditing ? "Enregistrer" : "Modifier le profil"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar bg-[#F8F9FB] border border-gray-100 rounded-xl p-1 mb-8 gap-1">
        <Link href="/professional-hub" className="min-w-[140px] md:flex-1">
          <button className="w-full py-3 md:py-4 rounded-lg text-[10px] md:text-xs font-black text-gray-400 hover:text-[#5c4df3] transition-all cursor-pointer whitespace-nowrap">
            <i className="far fa-user mr-1 md:mr-2"></i> Identité & Tarifs
          </button>
        </Link>
        <Link href="/professional-hub/mon-contenu" className="min-w-[140px] md:flex-1">
          <button className="w-full py-3 md:py-4 rounded-lg text-[10px] md:text-xs font-black text-gray-400 hover:text-[#5c4df3] transition-all cursor-pointer whitespace-nowrap">
            <i className="far fa-file-alt mr-1 md:mr-2"></i> Mon Contenu
          </button>
        </Link>
        <div className="min-w-[140px] md:flex-1">
          <button className="w-full py-3 md:py-4 bg-white shadow-sm rounded-lg text-[#5c4df3] text-[10px] md:text-xs font-black transition-all cursor-default whitespace-nowrap">
            <i className="far fa-clock mr-1 md:mr-2"></i> Historique
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="space-y-6 order-2 lg:order-1">
          <h3 className="font-black text-[16px] text-[#121A4B]">Tarifs actuels</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <TarifCard label="Tarif horaire" value={profile.hourlyRate} isEditing={isEditing} onChange={(v) => setProfile({...profile, hourlyRate: v})} />
            <TarifCard label="Frais de correction" value={profile.correctionFee} isEditing={isEditing} onChange={(v) => setProfile({...profile, correctionFee: v})} />
          </div>

          <h3 className="font-black text-[16px] text-[#121A4B] pt-4">Badges & Récompenses</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div style={{ backgroundColor: '#FFFDF0', borderColor: '#FFF9C4' }} className="border p-4 md:p-6 rounded-[24px] flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
              <div style={{ backgroundColor: '#FFF9C4' }} className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3">
                <i style={{ color: '#D4AF37' }} className="fas fa-award text-lg md:text-xl"></i>
              </div>
              <span style={{ color: '#B8860B' }} className="text-[12px] md:text-[14px] font-black uppercase tracking-tight text-center">Top Rated</span>
            </div>

            <div style={{ backgroundColor: '#F0F7FF', borderColor: '#E3F2FD' }} className="border p-4 md:p-6 rounded-[24px] flex flex-col items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
              <div style={{ backgroundColor: '#E3F2FD' }} className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3">
                <i style={{ color: '#2196F3' }} className="fas fa-check-circle text-lg md:text-xl"></i>
              </div>
              <span style={{ color: '#1976D2' }} className="text-[12px] md:text-[14px] font-black uppercase tracking-tight text-center">Verified</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
          
          <div className="relative w-full rounded-[24px] p-6 md:p-10 overflow-hidden bg-[#3a0ca3] shadow-xl flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
            <div className="relative z-20 flex flex-col">
                <span className="text-white/70 text-[14px] md:text-[16px] font-bold mb-1 md:mb-2 block">
                Available for Withdrawal
                </span>
                <h3 className="text-black text-[32px] md:text-[48px] font-bold tracking-tight leading-none">
                18,450.00 DH
                </h3>
            </div>

            <button className="w-full md:w-auto relative z-20 bg-white hover:bg-gray-100 text-[#7209B7] px-8 py-3 md:py-4 rounded-[18px] font-bold text-[14px] md:text-[15px] transition-all cursor-pointer active:scale-95 shadow-lg">
                Withdraw Funds
            </button>

            <div className="absolute inset-0 bg-gradient-to-r from-[#4A3AFF] to-[#4031D6] z-10"></div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
            <div className="p-4 md:p-6 border-b border-gray-50 flex justify-between items-center">
              <h3 className="font-black text-[16px] md:text-[18px] text-[#121A4B]">Historique des transactions</h3>
              <i className="fas fa-filter text-gray-400 cursor-pointer hover:text-[#5c4df3]"></i>
            </div>
            <div className="divide-y divide-gray-50">
              {transactions.map((t) => (
                <div key={t.id} className="p-4 md:p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors cursor-default gap-2">
                  <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center ${t.type === 'withdrawal' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                      <i className={`${t.icon} text-sm md:text-base`}></i>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-black text-[#121A4B] text-[13px] md:text-[15px] truncate">{t.title}</h4>
                      <p className="text-gray-400 text-[10px] md:text-xs font-bold">{t.date}</p>
                    </div>
                  </div>
                  <span className={`text-[14px] md:text-[16px] font-black flex-shrink-0 ${t.color}`}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TarifCard({ label, value, isEditing, onChange }) {
  return (
    <div className="bg-[#F8F9FB] border border-gray-100 p-4 md:p-6 rounded-2xl flex justify-between items-center shadow-sm transition-all">
      <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      {isEditing ? (
        <input 
          className="text-lg md:text-xl font-black text-[#5c4df3] text-right w-24 bg-transparent border-b border-[#5c4df3] outline-none cursor-text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
      ) : (
        <span className="text-[18px] md:text-[20px] font-black text-[#5c4df3]">{value}</span>
      )}
    </div>
  );
}