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
    { name: 'Profile', href: '/profile', icon: 'fa-briefcase' },

  ];

  return (
    <>
      <div className="md:hidden flex justify-between items-center p-4 bg-white sticky top-0 z-[150] shadow-sm">
        <div className="h-8">
          <img src="/data/talamid-logo.png" alt="Logo" className="h-full object-contain" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-[#121A4B]">
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90] md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`fixed top-0 left-0 h-full w-[200px] bg-white shadow-md z-[100] flex flex-col transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 border-r border-gray-100`}>
        
        <div className="p-5">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img src="/data/talamid-logo.png" alt="Logo" className="block mx-auto mb-2 max-w-[80%]" />
          </Link>
          <hr className="border-[#eee] my-4" />
        </div>

        <nav className="flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-2.5 mx-[10%] mb-1 text-sm rounded-lg transition-colors 
                  ${isActive 
                    ? 'bg-[#E0E7FF] text-[#4A1A9C] font-bold' 
                    : 'text-[#666] hover:bg-[#E0E7FF] hover:text-[#4A1A9C]'}`}
              >
                <i className={`fas ${item.icon} w-5 mr-4 text-center`}></i>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center px-6 mb-10 mt-auto">
          <div className="w-8 h-8 bg-[#ddd] rounded-full mr-3"></div>
          <div>
            <div className="text-[14px] font-bold">User Name</div>
            <div className="text-[11px] text-[#888]">Student</div>
          </div>
        </div>
      </aside>
    </>
  );
}