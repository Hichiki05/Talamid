"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const recentVideos = [
    { id: 1, title: "Comprendre enfin les Dérivées : Le guide complet", category: "Mathématiques", prof: "Prof. Ahmed", img: "/data/video-photos/Ux/photo3.png", duration: "14:20" },
    { id: 2, title: "Les Lois du Mouvement de Newton", category: "Physique", prof: "Sarah Bennani", img: "/data/video-photos/Ux/photo1.png", duration: "14:20" },
    { id: 3, title: "Rédiger une dissertation philosophique", category: "Philosophie", prof: "Dr. Tazi", img: "/data/video-photos/Ux/photo2.png", duration: "14:20" },
    { id: 4, title: "Comment tracer une Fonction Affine sans se tromper", category: "Mathématiques", prof: "Prof. Ahmed", img: "/data/video-photos/Ux/photo5.png", duration: "14:20" },
    { id: 5, title: "Le Logarithme Népérien : Pourquoi c'est utile?", category: "Mathématiques", prof: "Prof. Ahmed", img: "/data/video-photos/Ux/photo4.png", duration: "14:20" },
    { id: 6, title: "Maîtriser les Études de Variations pas à pas", category: "Mathématiques", prof: "Prof. Ahmed", img: "/data/video-photos/Ux/photo6.png", duration: "14:20" },
  ];

  return (
    <main className="max-w-[1200px] mx-auto pb-10 px-4 pt-4 font-sans selection:bg-purple-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      <header className="mb-8 py-2">
        <h1 className="text-2xl font-bold text-[#121A4B]">Bienvenue Karim sur votre tableau de bord</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Session à venir</p>
              <h3 className="text-[#4A1A9C] font-bold text-lg">Maths avec Prof. Ahmed</h3>
              <p className="text-gray-400 text-sm">Aujourd'hui, 18:00</p>
            </div>
            <div className="bg-indigo-50 p-2 rounded-full text-[#4A1A9C]"><i className="far fa-clock"></i></div>
          </div>
          <button className="w-full bg-[#5c4df3] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#4A1A9C] transition-all">
            Rejoindre la salle
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Solde du portefeuille</p>
              <h3 className="text-green-600 font-bold text-2xl">450.00 DH</h3>
              <p className="text-gray-400 text-sm">Dernier rechargement : il y a 2 jours</p>
            </div>
            <div className="bg-green-50 p-2 rounded-full text-green-600"><i className="fas fa-wallet"></i></div>
          </div>
          <Link 
            href="/exercices/step3?from=dashboard_action" 
            className="w-full bg-green-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-all text-center"
          >
            Ajouter des fonds
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Exercices en attente</p>
              <h3 className="text-red-500 font-bold text-2xl">2</h3>
              <p className="text-gray-400 text-sm">En attente de correction</p>
            </div>
            <div className="bg-red-50 p-2 rounded-full text-red-500"><i className="far fa-hourglass"></i></div>
          </div>
          <Link href="/exercices" className="w-full bg-red-400 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-500 transition-all text-center">
            Soumettre l'exercice
          </Link>
        </div>
      </section>

      <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-10">
        <h3 className="font-bold text-[#121A4B] mb-8">Activité d'apprentissage (Heures)</h3>
        <div className="flex h-64 gap-4">
          <div className="flex flex-col justify-between text-[10px] font-bold text-gray-400 pb-8 pt-2 text-right w-6">
            <span>10h</span><span>8h</span><span>6h</span><span>4h</span><span>2h</span><span>0h</span>
          </div>
          <div className="flex-1 flex flex-col relative">
            <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-2 pointer-events-none">
              {[...Array(6)].map((_, i) => (<div key={i} className="w-full border-t border-gray-50"></div>))}
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 relative z-10">
              <Bar day="Lun" height="25%" />
              <Bar day="Mar" height="45%" active />
              <Bar day="Mer" height="15%" />
              <Bar day="Jeu" height="55%" />
              <Bar day="Ven" height="30%" />
              <Bar day="Sam" height="70%" />
              <Bar day="Dim" height="40%" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#121A4B]">Dernières vidéos</h2>
          <Link href="/cours" className="text-[#5c4df3] text-sm font-bold hover:underline">Voir tout</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentVideos.map((video) => (
            <Link key={video.id} href={`/cours/step2?title=${encodeURIComponent(video.title)}`}>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all group h-full">
                <div className="relative h-44">
                  <img src={video.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={video.title} />
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-bold">{video.duration}</span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{video.category}</span>
                  <h4 className="font-bold text-[0.95rem] mt-1 mb-3 text-[#121A4B]">{video.title}</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#5c4df3] text-white text-[9px] flex items-center justify-center font-bold">{video.prof.substring(0, 2).toUpperCase()}</div>
                    <span className="text-xs text-gray-500">{video.prof}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function Bar({ day, height, active }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-3 h-full">
      <div className="w-full bg-gray-50/50 rounded-t-lg relative h-full flex items-end">
        <div className={`w-full rounded-t-lg ${active ? 'bg-[#5c4df3]' : 'bg-[#5c4df3]/40'}`} style={{ height: height }}></div>
      </div>
      <span className="text-xs font-bold text-gray-400">{day}</span>
    </div>
  );
}