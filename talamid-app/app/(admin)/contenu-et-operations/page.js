"use client";
import React, { useState } from 'react';

export default function ContenuOperations() {
  const [activeTab, setActiveTab] = useState('Tarifs');
  
  const [lessons, setLessons] = useState([
    { id: 1, title: "Les Lois du Mouvement de Newton", subject: "Physique", author: "Sarah Bennani", authorInitials: "SB", color: "bg-accent", duration: "14:20", image: "/data/video-photos/Ux/photo1.png" },
    { id: 2, title: "Rédiger une Dissertation Philosophique", subject: "Philosophie", author: "Dr. Tazi", authorInitials: "DT", color: "bg-primary-light", duration: "14:20", image: "/data/video-photos/Ux/photo2.png" },
    { id: 3, title: "Calcul : Limites et Continuité", subject: "Mathématiques", author: "Prof. Ahmed", authorInitials: "PA", color: "bg-red-500", duration: "14:20", image: "/data/video-photos/Ux/photo3.png" },
    { id: 4, title: "Introduction à la Chimie Organique", subject: "Chimie", author: "Laila Karim", authorInitials: "LK", color: "bg-emerald-500", duration: "18:45", image: "/data/video-photos/Ux/photo4.png" },
    { id: 5, title: "Histoire : La Révolution Industrielle", subject: "Histoire", author: "Yassine Rouhani", authorInitials: "YR", color: "bg-accent", duration: "22:10", image: "/data/video-photos/Ux/photo5.png" },
    { id: 6, title: "Biologie : La Structure Cellulaire", subject: "Biologie", author: "Siham Alaoui", authorInitials: "SA", color: "bg-primary-light", duration: "15:30", image: "/data/video-photos/Ux/photo6.png" }
  ]);

  const [exercises] = useState([
    { id: "#EX-9921", student: "Amine Radi", teacher: "Prof. Ahmed", status: "EN ATTENTE" },
    { id: "#EX-9922", student: "Salma Bennani", teacher: "Sarah Bennani", status: "TERMINÉ" },
    { id: "#EX-9923", student: "Youssef Tazi", teacher: "Dr. Tazi", status: "TERMINÉ" },
    { id: "#EX-9924", student: "Laila Karim", teacher: "Siham Alaoui", status: "EN ATTENTE" },
  ]);

  const [prices, setPrices] = useState({
    exercise: "20",
    live: "150",
    premium: "1 200"
  });

  const [editingId, setEditingId] = useState(null);

  const deleteLesson = (id) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const handleUpdatePrice = (id, newValue) => {
    setPrices({ ...prices, [id]: newValue });
  };

  return (
    <div className="min-h-screen bg-bg-light p-4 md:p-10 font-sans text-primary-dark">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-primary-dark">Contenu & Opérations</h1>
            <p className="text-sidebar-text text-sm font-medium">Gérez les leçons, les exercices et les tarifs de la plateforme</p>
          </div>

          <div className="flex bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm w-fit">
            {['Leçons', 'Exercices', 'Tarifs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 rounded-xl text-[12px] font-black transition-all cursor-pointer ${
                  activeTab === tab 
                  ? 'bg-primary-light text-white shadow-md' 
                  : 'text-sidebar-text hover:text-primary-light hover:bg-sidebar-active'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION LEÇONS */}
        {activeTab === 'Leçons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-3 right-3 bg-primary-dark/80 text-white text-[10px] font-bold px-2 py-1 rounded-md">{lesson.duration}</div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{lesson.subject}</p>
                    <h3 className="font-black text-[15px] leading-tight h-10 line-clamp-2 text-primary-dark">{lesson.title}</h3>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${lesson.color} flex items-center justify-center text-[8px] font-black text-white`}>{lesson.authorInitials}</div>
                      <span className="text-[11px] font-bold text-sidebar-text">{lesson.author}</span>
                    </div>
                    <button onClick={() => deleteLesson(lesson.id)} className="p-2 text-sidebar-text hover:text-red-500 transition-all cursor-pointer">
                      <i className="far fa-trash-alt text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Exercices' && (
          <div className="bg-white border border-gray-200 rounded-[32px] shadow-sm overflow-hidden text-primary-dark">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0 min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest">ID Requête</th>
                    <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest">Étudiant</th>
                    <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest">Enseignant</th>
                    <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest text-center">Statut</th>
                    <th className="px-8 py-5 text-[11px] font-black text-sidebar-text uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {exercises.map((ex, index) => (
                    <tr key={index} className="hover:bg-sidebar-active/30 transition-colors">
                      <td className="px-8 py-6 text-sm font-black text-primary-light">{ex.id}</td>
                      <td className="px-8 py-6 text-sm font-bold text-primary-dark/80">{ex.student}</td>
                      <td className="px-8 py-6 text-sm font-bold text-primary-dark/80">{ex.teacher}</td>
                      <td className="px-8 py-6 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${
                          ex.status === 'TERMINÉ' 
                          ? 'bg-sidebar-active text-primary-light border border-primary-light/10' 
                          : 'bg-orange-50 text-accent border border-accent/10'
                        }`}>
                          {ex.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="text-[12px] font-black text-primary-light hover:underline cursor-pointer">Gérer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Tarifs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PriceCard 
              id="exercise" title="Correction d'Exercice" desc="Prix par demande unique de correction d'exercice"
              price={prices.exercise} editingId={editingId} setEditingId={setEditingId} onPriceChange={handleUpdatePrice}
            />
            <PriceCard 
              id="live" title="Session Live 1-à-1" desc="Tarif horaire standard pour tutorat privé"
              price={prices.live} editingId={editingId} setEditingId={setEditingId} onPriceChange={handleUpdatePrice}
            />
            <PriceCard 
              id="premium" title="Abonnement Premium" desc="Accès complet annuel pour les étudiants"
              price={prices.premium} editingId={editingId} setEditingId={setEditingId} onPriceChange={handleUpdatePrice}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PriceCard({ id, title, desc, price, editingId, setEditingId, onPriceChange }) {
  const isEditing = editingId === id;

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <h3 className="text-lg font-black text-primary-dark">{title}</h3>
        <p className="text-sidebar-text text-xs font-medium leading-relaxed">{desc}</p>
      </div>

      <div className="my-10 flex items-baseline gap-2">
        {isEditing ? (
          <input 
            type="text"
            value={price}
            onChange={(e) => onPriceChange(id, e.target.value)}
            className="text-4xl font-black text-primary-light w-32 border-b-2 border-primary-light outline-none"
            autoFocus
          />
        ) : (
          <span className="text-4xl font-black text-primary-light">{price}</span>
        )}
        <span className="text-gray-300 font-bold text-sm">MAD</span>
      </div>

      <button 
        onClick={() => setEditingId(isEditing ? null : id)}
        className={`w-full py-4 rounded-2xl text-[12px] font-black transition-all cursor-pointer border ${
          isEditing 
          ? 'bg-primary-dark text-white border-primary-dark' 
          : 'bg-bg-light text-sidebar-text border-gray-100 hover:bg-sidebar-active hover:text-primary-light'
        }`}
      >
        {isEditing ? 'Enregistrer le prix' : 'Mettre à jour le prix'}
      </button>
    </div>
  );
}