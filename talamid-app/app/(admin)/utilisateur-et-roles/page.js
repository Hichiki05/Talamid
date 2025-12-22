"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function GestionUtilisateurs() {
  const [users, setUsers] = useState([
    { id: 1, name: "Hamza Banani", email: "Hamza.banani@gmail.com", role: "ENSEIGNANT", status: "ACTIF", date: "Oct 12, 2023", img: "https://i.pravatar.cc/150?u=male1" },
    { id: 2, name: "Safae Radi", email: "safae.1290@gmail.com", role: "ENSEIGNANT", status: "ACTIF", date: "Oct 12, 2023", img: "https://i.pravatar.cc/150?u=female1" },
    { id: 3, name: "Mariam Houssni", email: "marryjawad@gmail.com", role: "ENSEIGNANT", status: "ACTIF", date: "Oct 12, 2023", img: "https://i.pravatar.cc/150?u=female2" },
    { id: 4, name: "Laila Taliss", email: "laila@gmail.com", role: "ÉTUDIANT", status: "ACTIF", date: "Oct 13, 2023", img: "https://i.pravatar.cc/150?u=female4" },
    { id: 5, name: "Siham Alaoui", email: "siham@gmail.com", role: "ÉTUDIANT", status: "SUSPENDU", date: "Oct 14, 2023", img: "https://i.pravatar.cc/150?u=female3" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('TOUT'); 
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'TOUT' || user.role === filter || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIF' ? 'SUSPENDU' : 'ACTIF' } : u));
    setOpenMenuId(null);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-bg-light p-4 md:p-8 font-sans text-primary-dark">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col gap-1 text-left">
          <h1 className="text-2xl font-black text-primary-dark">Gestion des utilisateurs</h1>
          <p className="text-sidebar-text text-sm font-medium">Gérez les étudiants, les enseignants et les contrôles d'accès</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-gray-100 rounded-2xl shadow-sm bg-white">
          <div className="flex items-center gap-3 flex-1 min-w-[300px] border border-gray-100 rounded-xl px-4 py-2 focus-within:border-primary-light transition-all">
            <i className="fas fa-search text-gray-300"></i>
            <input 
              type="text" 
              placeholder="Rechercher un nom ou email..." 
              className="w-full outline-none text-sm text-sidebar-text bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['ENSEIGNANT', 'ÉTUDIANT', 'ACTIF', 'SUSPENDU'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(filter === f ? 'TOUT' : f)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all border cursor-pointer ${
                  filter === f 
                  ? 'bg-primary-light text-white border-primary-light shadow-sm' 
                  : 'bg-white text-sidebar-text border-gray-100 hover:bg-sidebar-active hover:text-primary-light'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
            <table className="w-full text-left border-separate border-spacing-0 min-w-[800px]">
              <thead>
                <tr className="bg-bg-light/50">
                  <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest border-b border-gray-50">Utilisateur</th>
                  <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest border-b border-gray-50">Rôle</th>
                  <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest border-b border-gray-50">Statut</th>
                  <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest border-b border-gray-50">Inscription</th>
                  <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-primary-dark">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-sidebar-active/30 transition-colors">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img src={user.img} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                        <div>
                          <h4 className="font-black text-sm">{user.name}</h4>
                          <p className="text-sidebar-text text-xs font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-[10px] font-black">
                      <span className="px-4 py-1.5 rounded-full border border-sidebar-active text-primary-light bg-sidebar-active/50">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-[10px] font-black">
                      <span className={`px-4 py-1.5 rounded-full border ${
                        user.status === 'ACTIF' 
                        ? 'border-green-100 text-green-600 bg-green-50' 
                        : 'border-accent/20 text-accent bg-accent/5'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sidebar-text text-[10px] font-bold">{user.date}</td>
                    <td className="px-8 py-4 text-right">
                      <div className="relative inline-flex items-center justify-end">
                        {openMenuId === user.id && (
                          <div 
                            ref={menuRef}
                            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 w-40 bg-white border border-gray-100 shadow-2xl rounded-2xl z-[50] py-2 animate-in fade-in slide-in-from-right-2 duration-200"
                          >
                            <button 
                              onClick={() => toggleStatus(user.id)}
                              className="w-full text-left px-4 py-2 text-[10px] font-black text-sidebar-text hover:bg-sidebar-active hover:text-primary-light flex items-center gap-2 cursor-pointer"
                            >
                              <i className={`fas ${user.status === 'ACTIF' ? 'fa-user-slash text-accent' : 'fa-user-check text-green-500'}`}></i>
                              {user.status === 'ACTIF' ? 'Suspendre' : 'Activer'}
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="w-full text-left px-4 py-2 text-[10px] font-black text-red-500 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                            >
                              <i className="fas fa-trash-alt"></i> Supprimer
                            </button>
                          </div>
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === user.id ? null : user.id);
                          }}
                          className="p-2 hover:bg-sidebar-active rounded-full transition-all cursor-pointer group"
                        >
                          <i className="fas fa-ellipsis-v text-gray-300 group-hover:text-primary-light pointer-events-none"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="p-20 text-center">
              <i className="fas fa-search text-sidebar-active text-5xl mb-4"></i>
              <p className="text-sidebar-text font-bold uppercase text-[10px] tracking-widest">Aucun résultat trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}