"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [banner, setBanner] = useState("/data/banner.jpg");
  const [profilePic, setProfilePic] = useState("/data/prof-icon/prof-icon1.png");
  const [isEditing, setIsEditing] = useState(false);
  const [userBio, setUserBio] = useState({
    name: "Walid Aaziz",
    level: "2ème Bac Sciences Maths B • Lycée Ibn Khalcloun",
    location: "Casablanca",
    joined: "Joined Sept 2023"
  });

  const bannerInput = useRef(null);
  const profileInput = useRef(null);

  const handleImageChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="max-w-6xl mx-auto pb-20 font-sans px-4">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      {/* 1. BANNER SECTION */}
      <div className="relative h-48 md:h-64 w-full rounded-3xl overflow-hidden bg-gray-200 shadow-sm mt-4">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        <button 
          onClick={() => bannerInput.current.click()}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all z-10"
        >
          <i className="fas fa-camera"></i>
        </button>
        <input type="file" ref={bannerInput} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setBanner)} />
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-end justify-between px-8 -mt-12 mb-10 relative z-20">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
          {/* Profile Picture */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-xl">
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button 
              onClick={() => profileInput.current.click()}
              className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-xs font-bold"
            >
              Modifier
            </button>
            <input type="file" ref={profileInput} className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setProfilePic)} />
          </div>

          <div className="pb-2 text-center md:text-left mt-4 md:mt-0">
            {isEditing ? (
              <div className="flex flex-col gap-2 bg-white p-4 rounded-2xl shadow-xl border border-indigo-50 min-w-[300px]">
                <input className="text-lg font-bold outline-none border-b-2 border-indigo-100 focus:border-indigo-500 py-1" value={userBio.name} onChange={(e) => setUserBio({...userBio, name: e.target.value})} />
                <input className="text-xs outline-none border-b-2 border-indigo-100 focus:border-indigo-500 py-1" value={userBio.level} onChange={(e) => setUserBio({...userBio, level: e.target.value})} />
                <div className="flex gap-2 mt-2">
                   <input className="text-[10px] w-full outline-none border-b border-gray-100" value={userBio.location} onChange={(e) => setUserBio({...userBio, location: e.target.value})} />
                   <button onClick={() => setIsEditing(false)} className="text-[10px] bg-green-500 text-white px-3 py-1 rounded font-bold uppercase">Ok</button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-black text-[#121A4B] leading-tight">{userBio.name}</h1>
                <p className="text-gray-600 text-sm font-semibold">{userBio.level}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <span><i className="fas fa-map-marker-alt text-indigo-400 mr-1"></i> {userBio.location}</span>
                  <span><i className="fas fa-calendar-alt text-indigo-400 mr-1"></i> {userBio.joined}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 md:mt-0 pb-2">
           <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#5c4df3] text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-[#4a3dc2] transition-all shadow-lg shadow-indigo-100"
            >
              {isEditing ? "Sauvegarder" : "Modifier Bio"}
            </button>
        </div>
      </div>

      {/* 3. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center text-xl"><i className="fas fa-play-circle"></i></div>
              <div><p className="text-[10px] font-black text-gray-300 tracking-tighter uppercase">COURS TERMINÉS</p><h3 className="text-2xl font-black text-[#121A4B]">42</h3></div>
           </div>
           <i className="fas fa-chevron-right text-gray-200"></i>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-xl"><i className="fas fa-tasks"></i></div>
              <div><p className="text-[10px] font-black text-gray-300 tracking-tighter uppercase">EXERCICES RÉALISÉS</p><h3 className="text-2xl font-black text-[#121A4B]">12</h3></div>
           </div>
           <i className="fas fa-chevron-right text-gray-200"></i>
        </div>
      </div>

      {/* 4. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Wallet Section */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm">
            <h2 className="text-xl font-black text-[#121A4B] mb-6">Portefeuille</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
               <div className="bg-gradient-to-br from-[#4338ca] to-[#5c4df3] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                  <p className="text-[10px] font-bold opacity-80 mb-1 uppercase tracking-widest">Solde Actuel</p>
                  <h2 className="text-3xl font-black">450.00 DH</h2>
                  <div className="mt-4 text-[9px] font-bold bg-white/20 inline-block px-3 py-1 rounded-full uppercase tracking-wider">Student Pass Active</div>
                  <i className="fas fa-wallet absolute -right-4 -bottom-4 text-7xl opacity-10 rotate-12"></i>
               </div>

               <Link href="/exercices/step3?from=dashboard_action" className="bg-white border-2 border-dashed border-gray-200 p-6 rounded-3xl flex items-center justify-between group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><i className="fas fa-plus"></i></div>
                    <div>
                      <p className="font-black text-[#121A4B] text-sm leading-tight">Recharger</p>
                      <p className="text-[10px] font-bold text-gray-400">Paiement sécurisé</p>
                    </div>
                  </div>
                  <i className="fas fa-arrow-right text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"></i>
               </Link>
            </div>

            <h4 className="text-[10px] font-black text-gray-300 uppercase mb-4 tracking-[0.2em]">Historique Récent</h4>
            <div className="space-y-4">
              <TransactionRow icon="fa-plus" color="text-green-500" bg="bg-green-50" title="Recharge via Visa" date="28 Oct 2023" amount="+300 DH" />
              <TransactionRow icon="fa-minus" color="text-red-400" bg="bg-red-50" title="Correction Exercice" date="16 Oct 2023" amount="-150 DH" />
            </div>
          </div>

          {/* Exercises History */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#121A4B]">Mes Exercices</h2>
                <div className="px-4 py-1.5 bg-gray-50 rounded-xl text-[10px] font-black text-gray-400">TOTAL 12</div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
                      <th className="pb-4">Titre de l'exercice</th>
                      <th className="pb-4">Matière</th>
                      <th className="pb-4">Statut</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <ExerciseRow title="Nombres Complexes" sub="Maths" status="Terminé" color="text-green-500 bg-green-50" />
                    <ExerciseRow title="Physique Nucléaire" sub="Physique" status="En attente" color="text-orange-500 bg-orange-50" />
                  </tbody>
               </table>
             </div>
          </div>
        </div>

        {/* 5. FOLLOWING LIST */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm h-fit">
           <h2 className="text-xl font-black text-[#121A4B] mb-8">Professeurs</h2>
           <div className="space-y-6">
              <FollowerRow name="Prof. Mohammed A." sub="Mathématiques" initial="MA" color="bg-emerald-400" />
              <FollowerRow name="Sarah Bennani" sub="Physique-Chimie" initial="SB" color="bg-indigo-400" />
           </div>
           <button className="w-full mt-10 py-4 rounded-2xl border-2 border-gray-100 text-xs font-black text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all uppercase tracking-widest">
             Voir tout les professeurs
           </button>
        </div>
      </div>
    </main>
  );
}


function TransactionRow({ icon, color, bg, title, date, amount }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-default">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center text-xs`}><i className={`fas ${icon}`}></i></div>
        <div>
          <p className="font-bold text-sm text-[#121A4B]">{title}</p>
          <p className="text-[10px] text-gray-400 font-bold">{date}</p>
        </div>
      </div>
      <p className={`font-black text-sm ${color}`}>{amount}</p>
    </div>
  );
}

function ExerciseRow({ title, sub, status, color }) {
  return (
    <tr className="border-b border-gray-50 group cursor-pointer hover:bg-gray-50/50">
      <td className="py-5 font-bold text-[#121A4B] text-sm">{title}</td>
      <td className="py-5 text-xs font-semibold text-gray-400">{sub}</td>
      <td className="py-5"><span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${color}`}>{status}</span></td>
      <td className="py-5 text-right px-4"><i className="fas fa-chevron-right text-gray-200 group-hover:text-indigo-500 transition-colors"></i></td>
    </tr>
  );
}

function FollowerRow({ name, sub, initial, color }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-gray-100 group-hover:scale-105 transition-transform`}>{initial}</div>
        <div>
          <p className="font-bold text-sm text-[#121A4B]">{name}</p>
          <p className="text-[10px] font-bold text-gray-400">{sub}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-200 hover:text-yellow-400 hover:bg-yellow-50 transition-all"><i className="fas fa-star text-xs"></i></div>
    </div>
  );
}