"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/', icon: 'fa-home' },
    { name: 'Tableau de bord', href: '/dashboard', icon: 'fa-border-all' },
    { name: 'Cours', href: '/cours', icon: 'fa-book' },
    { name: 'Exercices', href: '/exercices', icon: 'fa-dumbbell' },
    { name: 'Portefeuille', href: '/portefeuille', icon: 'fa-briefcase' },
    { name: 'Réservations', href: '/reservations', icon: 'fa-calendar-alt' },
  ];

  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </head>
      <body className="bg-bgLight text-[#333] h-screen overflow-hidden">
        <div className="flex h-full w-full relative">
          
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

            <div className="absolute bottom-0 left-0 w-full bg-white p-5 border-t border-[#eeeeee]">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#f0f2f5] rounded-full mr-3 flex items-center justify-center text-primary-dark border border-gray-100 shrink-0">
                   <i className="fas fa-user text-sm"></i>
                </div>
                <div className="overflow-hidden">
                  <div className="text-[14px] font-bold text-primary-dark truncate">User Name</div>
                  <div className="text-[12px] text-[#888]">Étudiant</div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
            {/* Mobile Header */}
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
      </body>
    </html>
  );
}