"use client";
import React from 'react';

const CheckIcon = ({ color = "#5246E5" }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M5 13l4 4L19 7" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function SubscriptionPage() {
  const primaryBrand = "#5246E5";
  const darkBlue = "#1E1B4B";

  return (
    <div className="min-h-screen py-16 px-4 font-sans" style={{ backgroundColor: '#F8FAFF', color: darkBlue }}>
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 flex flex-col items-center">
        <div className="bg-white p-4 rounded-2xl shadow-md inline-block mb-6 border border-gray-100">
           <i className="fas fa-book-open text-2xl" style={{ color: primaryBrand }}></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
          Choisissez le plan qui correspond à vos besoins d'apprentissage
        </h1>
        <p className="text-gray-500 max-w-2xl font-medium">
          Accédez à un accompagnement personnalisé, à des corrections plus rapides et à des fonctionnalités exclusives.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* Plan 1: Explorer */}
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 flex flex-col shadow-sm">
          <div className="mb-8">
            <h3 className="font-bold text-xl">Explorer</h3>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Plan Gratuit</p>
          </div>
          <div className="mb-6">
            <span className="text-5xl font-black">Gratuit</span>
            <p className="text-gray-400 text-sm mt-4 font-bold">Pour les nouveaux étudiants</p>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color={primaryBrand} /> Vidéos de leçons gratuites</li>
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color={primaryBrand} /> Navigation par chapitres</li>
            <li className="flex items-center gap-3 text-gray-300 font-bold text-sm">
              <i className="fas fa-times w-5 text-center"></i> Correction d'exercices
            </li>
          </ul>
          <div
            className="w-full py-5 rounded-2xl font-black bg-[#F3F4F6] text-gray-400 border border-gray-100 uppercase text-[10px] tracking-widest flex items-center justify-center cursor-not-allowed"
          >
            Plan Actuel
          </div>
        </div>

        {/* Plan 2: Support */}
        <div className="bg-white rounded-[40px] p-10 relative flex flex-col shadow-2xl md:scale-105 z-10 border-2" style={{ borderColor: primaryBrand }}>
          <div className="absolute -top-5 left-0 right-0 flex justify-center">
            <div className="text-white px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center" style={{ backgroundColor: primaryBrand }}>
              Le Plus Populaire
            </div>
          </div>

          <div className="mb-8 mt-2">
            <h3 className="font-bold text-xl">Support</h3>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Plan Standard</p>
          </div>
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black" style={{ color: primaryBrand }}>99 DH</span>
              <span className="text-gray-400 font-bold">/ mois</span>
            </div>
            <p className="text-gray-400 text-sm mt-4 font-bold">Aide régulière et corrections</p>
          </div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color={primaryBrand} /> Tout du plan Explorer</li>
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color={primaryBrand} /> Corrections d'exercices</li>
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color={primaryBrand} /> Explications audio & texte</li>
          </ul>
          <a 
            href="/"
            className="w-full py-5 rounded-2xl font-black text-white transition-all hover:opacity-90 shadow-xl uppercase text-[10px] tracking-widest flex items-center justify-center cursor-pointer active:scale-[0.98]"
            style={{ backgroundColor: primaryBrand }}
          >
            S'abonner
          </a>
        </div>

        {/* Plan 3: Pro Learning */}
        <div className="rounded-[40px] p-10 text-white flex flex-col shadow-xl relative overflow-hidden" style={{ backgroundColor: primaryBrand }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          
          <div className="mb-8 relative z-10">
            <h3 className="font-bold text-xl">Pro Learning</h3>
            <p className="text-indigo-100 text-xs font-black uppercase tracking-widest">Plan Premium</p>
          </div>
          <div className="mb-6 relative z-10">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black">199 DH</span>
              <span className="text-indigo-100 font-bold">/ mois</span>
            </div>
            <p className="text-indigo-100 text-sm mt-4 font-bold">Préparation intensive au BAC</p>
          </div>
          <ul className="space-y-4 mb-10 flex-grow relative z-10">
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color="white" /> Tout du plan Standard</li>
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color="white" /> Explications Vidéos</li>
            <li className="flex items-center gap-3 font-bold text-sm"><CheckIcon color="white" /> Sessions Live 1-on-1</li>
          </ul>
          <a 
            href="/"
            className="w-full bg-white py-5 rounded-2xl font-black transition-all hover:bg-gray-50 shadow-xl relative z-10 uppercase text-[10px] tracking-widest flex items-center justify-center cursor-pointer active:scale-[0.98]"
            style={{ color: primaryBrand }}
          >
            S'abonner
          </a>
        </div>
      </div>
    </div>
  );
}