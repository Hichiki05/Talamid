"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleGuestEntry = (e) => {
    e.preventDefault(); 
    
    document.cookie = "userRole=guest; path=/; max-age=86400";
    
    router.push('/home');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: 'color-mix(in srgb, #3f37c9, white 85%)' }}
    >
      <div className="mb-8">
        <img 
          src="/data/talamid-logo.png" 
          alt="Logo Talamid" 
          className="h-20 w-auto mx-auto mb-6 object-contain"
        />
        <h1 className="text-[28px] md:text-[32px] font-black mb-2 text-[--color-primary-dark]">
          Comment souhaitez-vous utiliser <span className="text-[--color-primary-light]">Talamid</span> ?
        </h1>
        <p className="text-[--color-sidebar-text] text-sm md:text-base max-w-md mx-auto font-medium opacity-80">
          Choisissez votre rôle pour continuer avec une expérience d'inscription personnalisée.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-8">
        
        <RoleCard 
          icon="fa-user-graduate"
          title="Je suis un étudiant"
          description="Accédez à des leçons gratuites, obtenez des corrections d'exercices et recevez une aide personnalisée."
          buttonText="Commencer"
          href="/auth/registration/student" 
        />

        <RoleCard 
          icon="fa-chalkboard-teacher"
          title="Je suis un enseignant"
          description="Partagez vos connaissances, publiez des leçons et gagnez de l'argent en aidant les étudiants."
          buttonText="Rejoindre en tant qu'enseignant"
          href="/auth/registration/teacher"
        />

        <RoleCard 
          icon="fa-eye"
          title="Je suis un invité"
          description="Explorez librement le catalogue des cours et découvrez la plateforme avant de vous inscrire."
          buttonText="Explorer le catalogue"
          onClick={handleGuestEntry} 
        />

      </div>

      <div className="mt-12 text-sm font-bold text-[--color-sidebar-text]">
        Vous avez déjà un compte ?{" "}
        <a href="/auth/login" className="text-[--color-primary-light] hover:underline font-black">
          Connectez-vous ici
        </a>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, description, buttonText, href, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-8 rounded-[35px] shadow-sm flex flex-col items-start text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-none"
    >
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[--color-primary-light] transition-all duration-300"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary-light), white 92%)' }}
      >
        <i className={`fas ${icon} text-2xl text-[--color-primary-light] group-hover:text-white transition-colors`}></i>
      </div>
      
      <h3 className="text-[18px] font-black text-[--color-primary-dark] mb-3">{title}</h3>
      <p className="text-[--color-sidebar-text] text-[13px] leading-relaxed mb-8 flex-grow font-medium opacity-70">
        {description}
      </p>

      <div className="text-[14px] font-black flex items-center gap-2 text-[--color-primary-light] group-hover:gap-3 transition-all">
        {onClick ? (
          <span className="cursor-pointer">{buttonText}</span>
        ) : (
          <a href={href}>{buttonText}</a>
        )}
        <i className="fas fa-chevron-right text-[10px]"></i>
      </div>
    </div>
  );
}