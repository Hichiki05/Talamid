"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function CoursPage() {
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Tout niveau');
  const [selectedSubject, setSelectedSubject] = useState('All Subject');
  const [activeTab, setActiveTab] = useState('All Videos');

  const videoData = [
    { id: 1, title: "Calculus: Limits and Continuity", subject: "Mathematics", level: "2ème Bac", prof: "Prof. Ahmed", duration: "16:20", thumb: "/data/video-photos/Ux/photo6.png", profIcon: "/data/prof-icon/prof-icon1.png" },
    { id: 2, title: "Newton's Laws of Motion", subject: "Physique", level: "2ème Bac", prof: "Sourav Bernard", duration: "16:20", thumb: "/data/video-photos/Ux/photo1.png", profIcon: "/data/prof-icon/prof-icon2.png" },
    { id: 3, title: "How to Write a Philosophical Essay", subject: "Philosophie", level: "1ère Bac", prof: "Du Fen", duration: "14:20", thumb: "/data/video-photos/Ux/photo2.png", profIcon: "/data/prof-icon/prof-icon3.png" },
    { id: 4, title: "Calculus: Advanced Integrals", subject: "Mathematics", level: "2ème Bac", prof: "Prof. Ahmed", duration: "16:20", thumb: "/data/video-photos/Ux/photo3.png", profIcon: "/data/prof-icon/prof-icon1.png" },
    { id: 5, title: "Algebra Basics", subject: "Mathematics", level: "Tronc Commun", prof: "Prof. Ahmed", duration: "16:20", thumb: "/data/video-photos/Ux/photo4.png", profIcon: "/data/prof-icon/prof-icon4.png" },
    { id: 6, title: "Geometry Principles", subject: "Mathematics", level: "3ère année collège", prof: "Prof. Ahmed", duration: "14:20", thumb: "/data/video-photos/Ux/photo5.png", profIcon: "/data/prof-icon/prof-icon6.png" },
  ];

  const filteredVideos = useMemo(() => {
    return videoData.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === 'Tout niveau' || video.level === selectedLevel;
      const matchesSubject = selectedSubject === 'All Subject' || video.subject === selectedSubject;
      return matchesSearch && matchesLevel && matchesSubject;
    });
  }, [searchTerm, selectedLevel, selectedSubject]);

  const handleVideoClick = (video) => {
    const query = new URLSearchParams({
      title: video.title,
      prof: video.prof,
      img: video.thumb
    }).toString();
    router.push(`/cours/step2?${query}`);
  };

  return (
    <div className="max-w-[1100px] mx-auto pb-20">
     
      <header className="mb-8">
        <h1 className="text-[1.8rem] font-bold text-[#333]">Bibliothèque de Cours</h1>
        <p className="text-[#666]">Parcourez des cours vidéo gratuits organisés par niveau, matière et chapitre.</p>
      </header>

      <div className="bg-[#5d35b1] rounded-xl p-6 mb-8 text-white flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-5">
          <img src="/data/video-photos/Ux/photo1.png" alt="Newton" className="w-[200px] h-[100px] rounded-lg object-cover hidden md:block" />
          <div>
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Continue Learning</span>
            <h3 className="text-2xl font-bold">Newton's Laws of Motion</h3>
            <p className="text-gray-200 text-sm">Physics • Mechanics</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/cours/step2')}
          className="bg-[#8c7ae6] hover:bg-[#a081ff] transition-colors px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2"
        >
          <i className="fas fa-play"></i> Suivant
        </button>
      </div>

      <section className="bg-[#EEF2FF80] border border-black/10 rounded-xl p-6 mb-8">
        <div className="flex items-center bg-white border border-gray-100 rounded-lg px-4 py-3 mb-5 shadow-sm">
          <i className="fas fa-search text-gray-400 mr-3"></i>
          <input 
            type="text" 
            placeholder="Que souhaitez-vous apprendre ?" 
            className="w-full outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mb-5">
          <select 
            className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none cursor-pointer"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option>Tout niveau</option>
            <option>2ème Bac</option>
            <option>1ère Bac</option>
            <option>Tronc Commun</option>
            <option>3ère année collège</option>
            <option>2ère année collège</option>
            <option>1ère année collège</option>
          </select>
          <select 
            className="flex-1 p-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none cursor-pointer"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option>All Subject</option>
            <option>Mathematique</option>
            <option>Physique</option>
            <option>Philosophie</option>
            <option>SVT</option>
            <option>Français</option>
            <option>Anglais</option>
            <option>Philosophie</option>
            <option>Arabe</option>
            <option>Histoire Géographie</option>
            <option>Informatique</option>
            <option>Technologie Industrielle</option>
            <option>Sciences de l'ingénieur</option>
            <option>Economie et Organisation Administrative des Entreprises</option>
            <option>Comptabilité et Mathématiques Financières</option>
            <option>Economie Générale et Statistiques</option>
            <option>Droit</option>
            <option>Informatique de gestion</option>
            <option>Education Islamique</option>
            <option>Sciences Végétales et Animales</option>
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All Videos', 'The latest', 'Highest rating', 'Channels'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all border ${
                activeTab === tab 
                ? 'bg-[#8c7ae6] text-white border-[#8c7ae6]' 
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push('/cours/step3')}>
          <img src="/data/prof-photo.png" alt="Prof. Ahmed" className="w-14 h-14 rounded-full object-cover" />
          <div>
            <h3 className="font-bold text-gray-800">Prof. Ahmed</h3>
            <p className="text-sm text-gray-500">Mathematics</p>
            <small className="text-gray-400 text-xs">500 subscribers</small>
          </div>
        </div>
        <button className="bg-[#8c7ae6] hover:bg-[#7262c5] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
          Follow
        </button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div 
            key={video.id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
            onClick={() => handleVideoClick(video)}
          >
            <div className="relative aspect-video">
              <img src={video.thumb} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">{video.duration}</span>
              <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded">Approved</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#8c7ae6] text-xs font-bold uppercase">{video.subject}</span>
                <i className="fas fa-ellipsis-v text-gray-300 hover:text-gray-600 px-1"></i>
              </div>
              <h4 className="font-bold text-gray-800 leading-tight mb-3 line-clamp-2">{video.title}</h4>
              <div className="flex items-center gap-2">
                <img src={video.profIcon} alt="" className="w-6 h-6 rounded-full" />
                <span className="text-xs text-gray-500">{video.prof}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 italic">Aucun cours ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}