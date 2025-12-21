"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link'; 

export default function ProfessionalHub() {
  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('identite');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Prof. Ahmed Amrani",
    specialty: "Mathematics Specialist - 2ème Bac & College",
    location: "Casablanca, Morocco",
    students: "890 étudiant",
    bio: "Expert en mathématiques pures, titulaire d'un doctorat de l'Université Mohammed V. Plus de 10 ans d'expérience dans la préparation des élèves aux examens du Baccalauréat. Approche basée sur la compréhension pratique.",
    hourlyRate: "150 DH",
    correctionFee: "20 DH",
    subjects: ["Mathématiques", "Physique", "Algèbre", "Calcul différentiel et intégral"]
  });

  const [bannerImg, setBannerImg] = useState("/data/banner.jpg"); 
  const [profileImg, setProfileImg] = useState("/data/prof-photo.png");

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImg(URL.createObjectURL(file));
  };

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  const removeSubject = (index) => {
    setProfile({
      ...profile,
      subjects: profile.subjects.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto no-scrollbar font-sans">
      
      {/* 1. Header Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-black text-[#121A4B]">Professional Hub</h1>
      </div>

      {/* 2. Banner & Profile Section */}
      <div className="relative mb-6">
        <div 
          style={{ height: '180px' }} 
          className="relative w-full rounded-[24px] overflow-hidden bg-[#121A4B]"
        >
          {bannerImg ? (
            <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-900/20">
               <i className="fas fa-image text-white/20 text-4xl"></i>
            </div>
          )}
          <div 
            onClick={() => bannerInputRef.current.click()}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2.5 rounded-full text-white border border-white/30 hover:bg-white/40 transition-all cursor-pointer z-20"
          >
            <i className="fas fa-cog text-lg"></i>
          </div>
          <input type="file" ref={bannerInputRef} hidden onChange={handleBannerChange} accept="image/*" />
        </div>

        <div className="flex items-center gap-6 -mt-10 px-8 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-[4px] border-white shadow-md overflow-hidden bg-gray-200">
              {profileImg ? (
                <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            
            <div 
              onClick={() => profileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#5c4df3] text-white w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-md cursor-pointer hover:bg-[#4a3dd9] hover:scale-105 transition-all z-20"
            >
              <i className="fas fa-camera text-[10px]"></i>
            </div>
            <input type="file" ref={profileInputRef} hidden onChange={handleProfileImgChange} accept="image/*" />
          </div>

          <div className="flex-1 pt-12"> 
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                {isEditing ? (
                  <input 
                    className="text-2xl font-black text-[#121A4B] bg-transparent border-b-2 border-[#5c4df3] outline-none w-full mb-2"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <h2 className="text-[24px] font-black text-[#121A4B]">{profile.name}</h2>
                )}
                
                {isEditing ? (
                  <input 
                    className="block w-full text-[#5c4df3] font-bold text-sm bg-transparent border-b border-gray-200 outline-none"
                    value={profile.specialty}
                    onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                  />
                ) : (
                  <p className="text-[#5c4df3] font-bold text-sm">
                    {profile.specialty} • <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] text-gray-600">⭐ 4.8</span>
                  </p>
                )}
                
                <p className="text-gray-400 font-bold text-xs mt-1">
                  <i className="fas fa-map-marker-alt mr-2"></i>{profile.location} • <i className="fas fa-user-friends mr-2"></i>{profile.students}
                </p>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-8 py-2.5 bg-[#F8F9FB] border border-gray-100 rounded-xl text-[12px] font-black text-[#5c4df3] hover:bg-gray-100 transition-all cursor-pointer shadow-sm"
              >
                {isEditing ? "Enregistrer" : "Modifier le profil"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex bg-[#F8F9FB] border border-gray-100 rounded-xl p-1 mb-8">
        <button 
          onClick={() => setActiveTab('identite')}
          className={`flex-1 py-4 rounded-lg text-xs font-black transition-all cursor-pointer ${activeTab === 'identite' ? 'bg-white shadow-sm text-[#5c4df3]' : 'text-gray-400'}`}
        >
          <i className="far fa-user mr-2"></i> Identité & Tarifs
        </button>


        <Link href="/professional-hub/mon-contenu" className="flex-1">
            <button className="w-full py-4 text-gray-400 text-xs font-black cursor-pointer hover:text-[#5c4df3] transition-colors">
            <i className="far fa-file-alt mr-2"></i> Mon Contenu
            </button>
        </Link>
         <Link href="/professional-hub/historique-des-saisies" className="flex-1">
          <button className="w-full py-4 rounded-lg text-xs font-black text-gray-400 hover:text-[#5c4df3] transition-all cursor-pointer">
            <i className="far fa-clock mr-2"></i> Historique des Saisies
          </button>
        </Link>
    
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <h3 className="font-black text-[16px] text-[#121A4B]">Tarifs actuels</h3>
          <TarifCard label="Tarif horaire" value={profile.hourlyRate} isEditing={isEditing} onChange={(v) => setProfile({...profile, hourlyRate: v})} />
          <TarifCard label="Frais de correction" value={profile.correctionFee} isEditing={isEditing} onChange={(v) => setProfile({...profile, correctionFee: v})} />

          <h3 className="font-black text-[16px] text-[#121A4B] pt-4">Badges & Récompenses</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div style={{ backgroundColor: '#FFFDF0', borderColor: '#FFF9C4' }} className="border p-6 rounded-[24px] flex flex-col items-center justify-center shadow-sm">
              <div style={{ backgroundColor: '#FFF9C4' }} className="w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <i style={{ color: '#D4AF37' }} className="fas fa-award text-xl"></i>
              </div>
              <span style={{ color: '#B8860B' }} className="text-[14px] font-black uppercase tracking-tight text-center">Top Rated</span>
            </div>

            <div style={{ backgroundColor: '#F0F7FF', borderColor: '#E3F2FD' }} className="border p-6 rounded-[24px] flex flex-col items-center justify-center shadow-sm">
              <div style={{ backgroundColor: '#E3F2FD' }} className="w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <i style={{ color: '#2196F3' }} className="fas fa-check-circle text-xl"></i>
              </div>
              <span style={{ color: '#1976D2' }} className="text-[14px] font-black uppercase tracking-tight text-center">Verified</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
            <h3 className="font-black text-[16px] text-[#121A4B] mb-4">Biographie professionnelle</h3>
            {isEditing ? (
              <textarea 
                className="w-full p-4 bg-[#F8F9FB] rounded-xl border border-gray-100 text-sm font-medium leading-relaxed outline-none focus:border-[#5c4df3]"
                rows="4"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
              />
            ) : (
              <p className="text-gray-400 text-[13px] font-medium leading-relaxed">{profile.bio}</p>
            )}
            
            <h3 className="font-black text-[16px] text-[#121A4B] mt-8 mb-4">Matières & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((s, idx) => (
                <div key={idx} className="relative group">
                  <span className="px-5 py-2.5 bg-[#F0EEFF] text-[#5c4df3] rounded-lg text-xs font-bold flex items-center gap-2">
                    {s}
                    {isEditing && (
                      <i onClick={() => removeSubject(idx)} className="fas fa-times cursor-pointer hover:text-red-500 transition-colors"></i>
                    )}
                  </span>
                </div>
              ))}
              {isEditing && (
                <button 
                  className="px-5 py-2.5 border-2 border-dashed border-gray-200 text-gray-400 rounded-lg text-xs font-bold hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    const newSub = prompt("Entrez la nouvelle matière :");
                    if (newSub && newSub.trim() !== "") {
                      setProfile({...profile, subjects: [...profile.subjects, newSub]});
                    }
                  }}
                >
                  + Ajouter
                </button>
              )}
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
            <h3 className="font-black text-[16px] text-[#121A4B] mb-6">Avis des étudiants</h3>
            <div className="space-y-6">
              <ReviewRow name="Hamza.E" date="October 24, 2025" initial="HE" comment="Sa manière d'expliquer les intégrales complexes est incroyable. Grâce à ses cours particuliers, je suis passé de 12/20 à 18/20." />
              <ReviewRow name="Safae.B" date="October 18, 2025" initial="SB" comment="Excellente pédagogie, très patient et disponible." />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TarifCard({ label, value, isEditing, onChange }) {
  return (
    <div className="bg-[#F8F9FB] border border-gray-100 p-6 rounded-2xl flex justify-between items-center shadow-sm">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      {isEditing ? (
        <input 
          className="text-xl font-black text-[#5c4df3] text-right w-24 bg-transparent border-b border-[#5c4df3] outline-none" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
        />
      ) : (
        <span className="text-[20px] font-black text-[#5c4df3]">{value}</span>
      )}
    </div>
  );
}

function ReviewRow({ name, date, comment, initial }) {
  return (
    <div className="flex gap-4 pb-6 border-b border-gray-50 last:border-0">
      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-black text-xs text-[#5c4df3]">{initial}</div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-black text-[#121A4B]">{name} <span className="text-yellow-500 ml-2">★★★★★</span></h4>
          <span className="text-[10px] text-gray-400 font-bold">{date}</span>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed italic">« {comment} »</p>
      </div>
    </div>
  );
}