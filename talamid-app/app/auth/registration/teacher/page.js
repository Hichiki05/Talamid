"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleTeacherSignUp = (e) => {
    e.preventDefault();

    document.cookie = "userRole=teacher; path=/; max-age=604800"; 

    router.push('/professional-hub');
  };

  return (
    <div className="min-h-screen bg-[--color-bg-light] flex items-center justify-center p-4 md:p-8 font-sans">
      
      <div className="bg-white w-full max-w-[600px] rounded-[40px] shadow-sm p-10 md:p-14 border border-gray-100">
        
        <div className="text-center mb-10">
          <h1 className="text-[24px] md:text-[28px] font-bold text-[--color-primary-dark] leading-tight mb-8">
            Connectez-vous 
          </h1>
          
          <button type="button" className="w-full flex items-center justify-center gap-3 border border-gray-300 py-4 px-6 rounded-full hover:bg-gray-50 transition-all mb-8 text-base font-semibold text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            S'inscrire avec Google
          </button>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm font-bold">OU</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <p className="text-gray-500 text-sm font-bold">S'inscrire avec votre adresse e-mail</p>
        </div>

        <form className="space-y-6" onSubmit={handleTeacherSignUp}>
          
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-gray-700 ml-1">Nom de profil</label>
            <input 
              required
              type="text" 
              placeholder="HOUSSNI Ahmed"
              className="w-full border border-gray-200 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-[--color-primary-light] focus:ring-1 focus:ring-[--color-primary-light] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-gray-700 ml-1">E-mail</label>
            <input 
              required
              type="email" 
              placeholder="ahmedhoussni@gmail.com"
              className="w-full border border-gray-200 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-[--color-primary-light] focus:ring-1 focus:ring-[--color-primary-light] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <div className="flex justify-between items-center px-1">
              <label className="text-[14px] font-bold text-gray-700">Mot de passe</label>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i> {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            <input 
              required
              minLength={8}
              type={showPassword ? "text" : "password"} 
              placeholder="Entrez votre mot de passe"
              className="w-full border border-gray-200 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:border-[--color-primary-light] focus:ring-1 focus:ring-[--color-primary-light] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-gray-700 ml-1">Quel niveau enseignez-vous ?</label>
            <div className="relative">
              <select required className="w-full border border-gray-200 rounded-2xl py-4 px-5 text-sm bg-white text-gray-400 focus:outline-none focus:border-[--color-primary-light] cursor-pointer appearance-none">
                <option value="">Choisissez niveau</option>
                <option value="bac2">2ème Bac</option>
                <option value="bac1">1ère Bac</option>
                <option value="tc">Tronc Commun</option>
                <option value="c3">3ère année collège</option>
                <option value="c2">2ère année collège</option>
                <option value="c1">1ère année collège</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-gray-700 ml-1">Quelle matière enseignez-vous ?</label>
            <div className="relative">
              <select required className="w-full border border-gray-200 rounded-2xl py-4 px-5 text-sm bg-white text-gray-400 focus:outline-none focus:border-[--color-primary-light] cursor-pointer">
                <option value="">Choisissez une filière</option>

                <option value="">Mathématiques</option>

                <option value="">Physique</option>

                <option value="">SVT</option>

                <option value="">Français</option>

                <option value="">Anglais</option>

                <option value="">Arabe</option>

                <option value="">Histoire Géographie</option>

                <option value="">Informatique</option>

                <option value="">Technologie Industrielle</option>

                <option value="">Sciences de l'ingénieur</option>

                <option value="">Économie et Organisation Administrative des Entreprises</option>

                <option value="">Comptabilité et Mathématiques Financières</option>

                <option value="">Économie Générale et Statistiques</option>

                <option value="">Droit</option>

                <option value="">Informatique de gestion</option>

                <option value="">Éducation Islamique</option>

                <option value="">Sciences Végétales et Animales</option>
              </select>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <input 
              required
              type="checkbox" 
              className="w-5 h-5 mt-0.5 rounded border-gray-300 accent-[--color-primary-light] cursor-pointer" 
              id="terms"
              defaultChecked
            />
            <label htmlFor="terms" className="text-[12px] text-gray-600 font-medium leading-tight cursor-pointer">
              En créant un compte, vous acceptez les <span className="underline font-bold">Conditions d'utilisation</span> et la <span className="underline font-bold">Politique de confidentialité</span>.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#4338ca] text-black font-black py-5 rounded-2xl hover:opacity-90 transition-all text-base shadow-lg shadow-indigo-100 mt-4 active:scale-[0.98]"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-10 text-[14px] font-bold text-gray-500 text-center">
          Vous avez déjà un compte ? <a href="/auth/login" className="text-blue-600 hover:underline font-black ml-1">Se connecter</a>
        </p>
      </div>
    </div>
  );
}