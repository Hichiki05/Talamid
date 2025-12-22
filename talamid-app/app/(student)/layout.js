"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function StudentLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/home', icon: 'fa-home' },
    { name: 'Tableau de bord', href: '/dashboard', icon: 'fa-border-all' },
    { name: 'Cours', href: '/cours', icon: 'fa-book' },
    { name: 'Exercices', href: '/exercices', icon: 'fa-dumbbell' },
    { name: 'Profile', href: '/profile', icon: 'fa-briefcase' },
  ];

  return (
    <div className="flex h-screen w-full relative bg-bgLight text-[#333] overflow-hidden">
      
      <aside className={`
        fixed top-0 left-0 h-full bg-white w-[220px] flex flex-col z-[100] shadow-md transition-transform duration-300
        md:translate-x-0 md:relative shrink-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-5 pt-8 mb-6 shrink-0">
          <img src="/data/talamid-logo.png" alt="Logo" className="max-w-[80%] mb-6 block" />
          <hr className="border-none h-[1px] bg-[#eeeeee] w-full" />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 pb-32">
          {navItems.map((item) => {
            const isActive = item.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.href);

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center py-3 px-4 text-sm transition-colors rounded-xl mb-2
                  ${isActive 
                    ? 'bg-sidebar-active text-primary-light font-bold' 
                    : 'text-sidebar-text hover:bg-sidebar-active hover:text-primary-light'}
                `}
              >
                <i className={`fas ${item.icon} w-5 mr-3`}></i>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Section Profil avec le bouton S'abonner */}
        <div className="absolute bottom-0 left-0 w-full bg-white p-4 border-t border-[#eeeeee]">
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden">
              <div className="w-9 h-9 bg-[#f0f2f5] rounded-full mr-2 flex items-center justify-center text-primary-dark border border-gray-100 shrink-0">
                 <i className="fas fa-user text-xs"></i>
              </div>
              <div className="overflow-hidden">
                <div className="text-[13px] font-bold text-primary-dark truncate">User Name</div>
                <div className="text-[11px] text-[#888]">Étudiant</div>
              </div>
            </div>
            
            <Link 
              href="/subscribe" 
              className="bg-[#5246E5] text-black text-[12px] font-black px-3 py-1.5 rounded-lg hover:opacity-90 transition-all shrink-0"
            >
              S'abonner
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm z-50 shrink-0">
          <div className="h-8">
            <img src="/data/talamid-logo.png" alt="Logo" className="h-full" />
          </div>
          <div className="text-2xl text-primary-dark cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10">
          {children}
        </main>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[90] md:hidden" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}