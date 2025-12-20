"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const subjects = [
  { name: 'Mathématiques', icon: 'fa-calculator', color: '#8C479B' },
  { name: 'Physique', icon: 'fa-atom', color: '#539E00' },
  { name: 'SVT', icon: 'fa-leaf', color: '#4CAF50' },
  { name: 'Français', icon: 'fa-flag', color: '#D32F2F' },
  { name: 'Anglais', icon: 'fa-book-open', color: '#FFA000' },
  { name: 'Philosophie', icon: 'fa-scroll', color: '#303F9F' },
  { name: 'Arabe', icon: 'fa-pen-fancy', color: '#009688' },
  { name: 'Informatique', icon: 'fa-desktop', color: '#795548' },
];

const trendingCourses = [
  { 
    id: 1, 
    title: "Comprendre enfin les Dérivées : Le guide complet", 
    subject: "Maths", 
    prof: "Prof. Ahmed", 
    profImg: "/data/prof-icon/prof-icon1.png", // Added prof image
    time: "14:20", 
    img: "/data/video-photos/ux/photo6.png" 
  },
  { 
    id: 2, 
    title: "Newton's Laws of Motion", 
    subject: "Physique", 
    prof: "Sarah Bennani", 
    profImg: "/data/prof-icon/prof-icon2.png", // Added prof image
    time: "14:20", 
    img: "/data/video-photos/Ux/photo1.png" 
  },
  { 
    id: 3, 
    title: "Writing a Philosophical Essay", 
    subject: "Philo", 
    prof: "Dr. Yassine", 
    profImg: "/data/prof-icon/prof-icon3.png", // Added prof image
    time: "18:45", 
    img: "/data/video-photos/Ux/photo2.png" 
  },
  { 
    id: 4, 
    title: "Comment tracer une Fonction Affine sans se tromper", 
    subject: "Maths", 
    prof: "Prof. Laila", 
    profImg: "/data/prof-icon/prof-icon2.png", // Added prof image
    time: "12:10", 
    img: "/data/video-photos/Ux/photo3.png" 
  },
  { 
    id: 5, 
    title: "Le Logarithme Népérien : Pourquoi c'est utile?", 
    subject: "Maths", 
    prof: "Prof. Karim", 
    profImg: "/data/prof-icon/prof-icon4.png", // Added prof image
    time: "20:30", 
    img: "/data/video-photos/Ux/photo4.png" 
  },
  { 
    id: 6, 
    title: "Maîtriser les Études de Variations pas à pas", 
    subject: "Maths", 
    prof: "Miss Jane", 
    profImg: "/data/prof-icon/prof-icon6.png", // Added prof image
    time: "10:15", 
    img: "/data/video-photos/Ux/photo5.png" 
  },
];

export default function HomePage() {
  const router = useRouter();

  const handleCourseClick = (course) => {
    const params = new URLSearchParams({
      title: course.title,
      prof: course.prof,
      img: course.img
    });
    router.push(`/cours2?${params.toString()}`);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-full overflow-x-hidden">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary-light to-primary-dark text-white p-10 rounded-xl mb-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-[10px]">Maîtrisez vos études.<br />Construisez votre avenir.</h1>
        <p className="text-base opacity-80 max-w-[600px] mb-[30px]">
          Accédez à des milliers de cours gratuits et connectez-vous avec les meilleurs professeurs du Maroc.
        </p>
        
        <div className="flex flex-col md:flex-row gap-[15px] items-stretch md:items-center">
          <div className="flex items-center bg-black/20 rounded-lg px-[15px] py-[10px] flex-grow max-w-[500px] focus-within:ring-2 ring-white/30 transition-all">
            <i className="fas fa-search mr-[10px] opacity-70"></i>
            <input 
              type="text" 
              placeholder="Que souhaitez-vous apprendre ?" 
              className="bg-transparent border-none outline-none w-full text-white placeholder:text-white/70" 
            />
          </div>
          <button className="bg-accent hover:bg-accent/90 px-[25px] py-3 rounded-lg font-bold transition-all shadow-md active:scale-95">
            Trouver un professeur
          </button>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="mb-10 overflow-hidden">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-[22px] font-bold text-primary-dark">Parcourir par matière</h2>
        </div>
        <div className="flex gap-[12px] overflow-x-auto pb-[15px] no-scrollbar">
          {subjects.map((sub) => (
            <div 
              key={sub.name} 
              className="flex items-center bg-white border border-[#e0e0e0] px-[20px] py-[12px] rounded-[50px] font-bold whitespace-nowrap cursor-pointer hover:border-primary-light hover:bg-primary-light/5 hover:shadow-sm transition-all"
            >
              <i className={`fas ${sub.icon} mr-3`} style={{ color: sub.color }}></i>
              {sub.name}
            </div>
          ))}
        </div>
      </section>

      {/* Trending Courses */}
      <section className="pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-bold text-primary-dark">Cours tendance</h2>
          <button onClick={() => router.push('/cours')} className="text-sidebar-text hover:text-primary-light font-bold text-sm transition-colors">
            Voir tout
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
          {trendingCourses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => handleCourseClick(course)}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.img} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-[11px] font-bold backdrop-blur-sm">
                  {course.time}
                </span>
              </div>
              
              <div className="p-4">
                <h3 className="text-sm font-bold text-primary-dark mb-3 line-clamp-2 h-10">
                  {course.title}
                </h3>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-[12px] text-sidebar-text">
                    <i className="fas fa-graduation-cap mr-1 opacity-70"></i>
                    <span>{course.subject}</span>
                  </div>
                  
                  {/* Prof Name and Prof Photo Profile */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-primary-dark font-bold">
                      {course.prof}
                    </span>
                    <img 
                      src={course.profImg} 
                      alt={course.prof} 
                      className="w-7 h-7 rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}