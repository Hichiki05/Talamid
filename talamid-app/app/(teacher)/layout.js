"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TeacherLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Tableau de bord', icon: 'fa-home', path: '/teacher-dashboard' },
    { name: 'Professional Hub', icon: 'fa-graduation-cap', path: '/professional-hub' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 text-[#5c4df3] mb-10">
            <div className="w-8 h-8 bg-[#5c4df3] rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-book-open text-xs"></i>
            </div>
            <span className="text-xl font-black tracking-tight text-[#121A4B]">Talamid</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              
              const isActive = item.path === '/teacher-dashboard' 
                ? pathname === item.path 
                : pathname.startsWith(item.path);

              return (
                <Link 
                  key={item.name} 
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-[#5c4df3]' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Role Switcher Footer */}
        <div className="mt-auto p-4 border-t border-gray-50 bg-gray-50/50">
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">AA</div>
            <div className="flex bg-gray-100 rounded-lg p-1 text-[8px] font-black w-full">
              <div className="bg-[#5c4df3] text-white px-2 py-1 rounded-md flex-1 text-center">Teacher</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}