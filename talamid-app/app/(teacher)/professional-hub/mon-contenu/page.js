"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function MonContenuPage() {
  const bannerInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

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

  const [videos, setVideos] = useState([
    { id: 1, title: "Calcul : Limites et Continuité", subject: "Mathématiques", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80" },
    { id: 2, title: "Expressions Algébriques Partie 2", subject: "Mathématiques", thumbnail: "https://images.unsplash.com/photo-1632571401005-458e9d244591?w=400&q=80" },
    { id: 3, title: "Introduction aux Dérivées", subject: "Mathématiques", thumbnail: "/data/video-photos/Ux/photo1.png" },
    { id: 4, title: "Intégration par Parties", subject: "Mathématiques", thumbnail: "/data/video-photos/Ux/photo4.png" },
  ]);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImg(URL.createObjectURL(file));
  };

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImg(URL.createObjectURL(file));
  };

  const openDeleteModal = (id) => {
    setSelectedVideoId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setVideos((prevVideos) => prevVideos.filter(v => v.id !== selectedVideoId));
    setShowDeleteModal(false);
    setSelectedVideoId(null);
  };

  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto no-scrollbar font-sans">
      
      {/* 1. Titre de l'en-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-black text-[#121A4B]">Espace Professionnel</h1>
      </div>

      {/* 2. Bannière & Profil */}
      <div className="relative mb-6">
        <div style={{ height: '180px' }} className="relative w-full rounded-[24px] overflow-hidden bg-[#121A4B]">
          {bannerImg ? (
            <img src={bannerImg} alt="Bannière" className="w-full h-full object-cover" />
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
                <img src={profileImg} alt="Profil" className="w-full h-full object-cover" />
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

      <div className="flex bg-[#F8F9FB] border border-gray-100 rounded-xl p-1 mb-8">
        <Link href="/professional-hub" className="flex-1">
          <button className="w-full py-4 rounded-lg text-xs font-black text-gray-400 hover:text-[#5c4df3] transition-all cursor-pointer">
            <i className="far fa-user mr-2"></i> Identité & Tarifs
          </button>
        </Link>
    
        <button className="flex-1 py-4 bg-white shadow-sm rounded-lg text-[#5c4df3] text-xs font-black transition-all cursor-pointer">
          <i className="far fa-file-alt mr-2"></i> Mon Contenu
        </button>
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
              <span style={{ color: '#B8860B' }} className="text-[14px] font-black uppercase tracking-tight text-center">Mieux Noté</span>
            </div>

            <div style={{ backgroundColor: '#F0F7FF', borderColor: '#E3F2FD' }} className="border p-6 rounded-[24px] flex flex-col items-center justify-center shadow-sm">
              <div style={{ backgroundColor: '#E3F2FD' }} className="w-12 h-12 rounded-full flex items-center justify-center mb-3">
                <i style={{ color: '#2196F3' }} className="fas fa-check-circle text-xl"></i>
              </div>
              <span style={{ color: '#1976D2' }} className="text-[14px] font-black uppercase tracking-tight text-center">Vérifié</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-black text-[18px] text-[#121A4B]">Bibliothèque vidéo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow p-3">
                <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 mb-4">
                  <img src={video.thumbnail} className="w-full h-full object-cover" alt="miniature" />
                </div>
                <div className="px-1">
                  <p className="text-[10px] font-bold text-[#5c4df3] uppercase tracking-wider mb-1">{video.subject}</p>
                  <h4 className="text-[14px] font-black text-[#121A4B] line-clamp-1 mb-4">{video.title}</h4>
                  <button 
                    onClick={() => openDeleteModal(video.id)}
                    className="w-full py-2.5 rounded-xl bg-red-50 text-red-500 text-[12px] font-black hover:bg-white hover:text-white transition-all cursor-pointer"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#121A4B]/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
          <div className="relative bg-white rounded-[32px] w-full max-w-sm p-6 text-center shadow-2xl">
             <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-trash-alt text-xl"></i>
             </div>
             <h3 className="text-lg font-black text-[#121A4B] mb-1">Confirmer la suppression</h3>
             <p className="text-gray-400 text-xs font-medium mb-6">
               Voulez-vous vraiment supprimer cette vidéo ?
             </p>
             
             <div className="flex gap-3 mt-4">
               <button 
                 onClick={() => setShowDeleteModal(false)} 
                 className="flex-1 py-3 bg-gray-50 text-gray-500 rounded-xl font-black text-xs hover:bg-gray-100 transition-all cursor-pointer"
               >
                 Annuler
               </button>
               <button 
                 onClick={confirmDelete} 
                 className="flex-1 text-gray-500 py-3 bg-red-500 rounded-xl font-black text-xs hover:bg-red-600 transition-all cursor-pointer shadow-md"
               >
                 Supprimer
               </button>
             </div>
          </div>
        </div>
      )}
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