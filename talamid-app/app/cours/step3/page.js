"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfessorProfile() {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);

  const courses = [
    { id: 1, title: "Calculus: Limits and Continuity", img: "/data/video-photos/Ux/photo3.png", duration: "14:20" },
    { id: 2, title: "Physics: Thermodynamics 101", img: "/data/video-photos/Ux/photo5.png", duration: "18:45" },
    { id: 3, title: "Chemistry: Atomic Structure", img: "/data/video-photos/Ux/photo1.png", duration: "12:10" },
  ];

  const handleVideoClick = (course) => {
    const params = new URLSearchParams({
      title: course.title,
      img: course.img,
      prof: "Prof. Ahmed"
    });
    router.push(`/cours/step2?${params.toString()}`);
  };

  return (
    <main className="max-w-[1200px] mx-auto pb-10 px-4 pt-4 font-sans selection:bg-purple-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      <div className="mb-6">
        <Link href="/cours" className="text-gray-500 hover:text-[#4A1A9C] text-sm flex items-center gap-2 transition-colors font-medium cursor-pointer">
          <i className="fas fa-chevron-left text-[10px]"></i> Retour aux cours
        </Link>
      </div>

      <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8">
        <div className="h-44 w-full bg-gray-200">
          <img src="/data/video-photos/Ux/photo5.png" className="w-full h-full object-cover" alt="Banner" />
        </div>
        
        <div className="px-6 lg:px-10 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 mb-6">
            <img 
              src="/data/prof-photo.png" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover" 
              alt="Avatar" 
            />
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                <h1 className="text-2xl font-bold text-[#121A4B]">Prof. Ahmed</h1>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <i className="fas fa-star"></i> 4.9
                </span>
              </div>
              <p className="text-[#4f46e5] font-semibold mb-2">Mathematics Specialist</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-gray-500 text-sm">
                <span><i className="fas fa-map-marker-alt mr-2"></i>Casablanca, Morocco</span>
                <span><i className="fas fa-user-graduate mr-2"></i>+890 étudiant</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-8 py-2.5 rounded-lg font-bold transition-all cursor-pointer active:scale-95 ${
                  isFollowing ? 'bg-gray-100 text-gray-600' : 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="border border-[#4f46e5] text-[#4f46e5] px-8 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition-all cursor-pointer active:scale-95">
                Demande
              </button>
            </div>
          </div>

          <hr className="opacity-10 mb-8" />

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold mb-3 text-[#121A4B]">À propos de moi</h3>
              <p className="text-gray-600 leading-relaxed text-[0.95rem]">
                Expert en Maths, Physique et Chimie. Je privilégie la compréhension pratique et les méthodes de résolution d'examens pour des résultats rapides.
              </p>
              <div className="flex gap-2 mt-5">
                <span className="bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-xs text-gray-600 font-medium cursor-default hover:bg-white transition-colors">2ème Bac</span>
                <span className="bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-xs text-gray-600 font-medium cursor-default hover:bg-white transition-colors">Mat</span>
              </div>
            </div>
            
            <div className="bg-[#EEF2FF] p-6 rounded-xl border border-[#e0e7ff]">
              <h3 className="font-bold text-[#3730a3] mb-4">Tarifs & Disponibilité</h3>
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-indigo-900/70">Tarif horaire</span>
                <span className="font-bold text-indigo-900">120 DH</span>
              </div>
              <div className="flex justify-between mb-5 text-sm">
                <span className="text-indigo-900/70">Cours en groupe</span>
                <span className="font-bold text-indigo-900">45 DH / place</span>
              </div>
              <div className="text-[12px] text-indigo-600 font-medium flex items-center gap-2 pt-4 border-t border-indigo-100">
                <i className="far fa-clock"></i> Disponible pour des sessions le week-end
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#121A4B]">Cours de Ahmed</h2>
          <span className="text-sm font-bold text-gray-400">3 Cours publiés</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => handleVideoClick(course)}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={course.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono font-bold">{course.duration}</span>
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#8c7ae6] uppercase tracking-wider">Mathematics</span>
                <h4 className="font-bold text-[0.95rem] mt-1 mb-4 line-clamp-2 text-[#333] group-hover:text-[#4A1A9C] transition-colors">{course.title}</h4>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white text-[9px] flex items-center justify-center font-bold">PA</div>
                  <span className="text-[0.75rem] text-gray-500 font-semibold">Prof. Ahmed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-[#121A4B] mb-8">Avis des étudiants</h2>
        <div className="space-y-8">
          <ReviewItem initial="H" name="Hamza.E" stars={5} date="October 24, 2025" text="Sa manière d'expliquer les intégrales complexes est incroyable. Grâce à ses cours particuliers, je suis passé de 12/20 à 18/20 lors de mon dernier contrôle." />
          <ReviewItem initial="M" name="Mohammed" stars={4} date="juin 05, 2025" text="Excellente pédagogie ! Les concepts de physique qui me semblaient impossibles sont devenus clairs en seulement deux séances. Je recommande vivement." />
          <ReviewItem initial="F" name="Fatima" stars={5} date="mai 15, 2025" text="Grâce au coaching de Prof. Ahmed, j'ai enfin décroché un 19/20 en chimie. Sa méthode de résolution est d'une efficacité redoutable." />
        </div>
      </section>
    </main>
  );
}

function ReviewItem({ initial, name, stars, text, date }) {
  return (
    <div className="flex gap-4 lg:gap-6 border-b border-gray-50 pb-8 last:border-0 last:pb-0 group">
      <div className="w-12 h-12 rounded-full bg-[#f4f6f9] flex items-center justify-center font-bold text-[#4f46e5] shrink-0 text-sm border border-gray-100">
        {initial}
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[0.9rem] text-[#121A4B]">{name}</span>
            <div className="text-amber-400 text-[11px] flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`${i < stars ? 'fas' : 'far'} fa-star`}></i>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-gray-400 font-medium">{date}</span>
        </div>
        <p className="text-gray-600 text-[0.9rem] leading-relaxed mb-1">{text}</p>
      </div>
    </div>
  );
}