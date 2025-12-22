"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/', icon: 'fa-home' },
    { name: 'Tableau de bord', href: '/tableau-de-bord', icon: 'fa-border-all' },
    { name: 'Cours', href: '/cours', icon: 'fa-book' },
    { name: 'Exercices', href: '/exercices', icon: 'fa-dumbbell' },
    { name: 'Profil', href: '/profile', icon: 'fa-user' }, // Changé fa-briefcase par fa-user pour le profil
  ];

  return (
    <>
      {/* Header Mobile */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white sticky top-0 z-[150] shadow-sm">
        <div className="h-8">
          <img src="/data/talamid-logo.png" alt="Logo Talamid" className="h-full object-contain" />
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-2xl text-[#121A4B] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Overlay pour le menu mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90] md:hidden transition-opacity duration-300" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Barre latérale (Sidebar) */}
      <aside className={`fixed top-0 left-0 h-full w-[240px] bg-white shadow-md z-[100] flex flex-col transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-gray-100`}>
        
        {/* Logo Section */}
        <div className="p-8">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img src="/data/talamid-logo.png" alt="Logo Talamid" className="block mx-auto max-w-full h-auto" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[#E0E7FF] text-[#4338ca] font-bold shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#4338ca]'}`}
                >
                  <i className={`fas ${item.icon} w-6 text-center text-lg mr-4 
                    ${isActive ? 'text-[#4338ca]' : 'text-gray-400 group-hover:text-[#4338ca]'}`}></i>
                  <span className="text-[15px]">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Profil Utilisateur (Bas de la Sidebar) */}
        <div className="p-6 border-t border-gray-50">
          <div className="flex items-center p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3 border border-indigo-50">
              <i className="fas fa-user text-indigo-500 text-sm"></i>
            </div>
            <div className="overflow-hidden">
              <div className="text-[14px] font-bold text-[#121A4B] truncate">Ahmed Houssni</div>
              <div className="text-[11px] text-gray-400 font-medium">Étudiant</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}