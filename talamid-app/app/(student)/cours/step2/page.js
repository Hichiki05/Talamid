"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function VideoPlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [videoDetails, setVideoDetails] = useState({
    title: "Newton's Laws of Motion",
    prof: "Prof. Ahmed",
    img: "/data/video-photos/Ux/photo1.png"
  });

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState([
    { id: 1, user: "Sara M.", text: "Merci pour cette explication claire !", initials: "SM" }
  ]);

  useEffect(() => {
    const title = searchParams.get('title');
    const prof = searchParams.get('prof');
    const img = searchParams.get('img');

    if (title || prof || img) {
      setVideoDetails({
        title: title || "Newton's Laws of Motion",
        prof: prof || "Prof. Ahmed",
        img: img || "/data/video-photos/Ux/photo1.png"
      });
    }
  }, [searchParams]);

  const handleCommentSubmit = (e) => {
    if (e.key === 'Enter' && commentInput.trim() !== "") {
      const newComment = {
        id: Date.now(),
        user: "User Name",
        text: commentInput,
        initials: "UN"
      };
      setCommentsList([newComment, ...commentsList]);
      setCommentInput("");
    }
  };

  const deleteComment = (id) => {
    setCommentsList(commentsList.filter(c => c.id !== id));
  };

  const handleRelatedClick = (v) => {
    const query = new URLSearchParams({ title: v.title, prof: v.prof, img: v.thumb }).toString();
    router.push(`/cours/step2?${query}`);
  };

  const relatedVideos = [
    { id: 101, title: "Calculus: Limits and Continuity", subject: "Mathematics", prof: "Prof. Ahmed", thumb: "/data/video-photos/Ux/photo3.png", duration: "14:20" },
    { id: 102, title: "Geometry: Introduction", subject: "Mathematics", prof: "Prof. Ahmed", thumb: "/data/video-photos/Ux/photo5.png", duration: "14:20" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-10 px-4 pt-4 font-sans selection:bg-purple-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      <div className="mb-5">
        <Link href="/cours" className="text-gray-500 hover:text-[#4A1A9C] text-sm flex items-center gap-2 transition-colors font-medium cursor-pointer">
          <i className="fas fa-chevron-left text-[10px]"></i> Retour aux cours
        </Link>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-10">
        
        <div>
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-xl border border-gray-200 group">
            <img src={videoDetails.img} alt={videoDetails.title} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white hover:scale-110 transition-transform cursor-pointer">
                <i className="fas fa-play"></i>
              </button>
              <div className="flex-grow h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-red-600 w-[30%]"></div>
              </div>
              <span className="text-white text-[11px] font-mono">03:45 / 10:00</span>
            </div>
          </div>

          <h1 className="text-[1.8rem] font-bold mt-6 mb-4 text-[#1a1a1a]">{videoDetails.title}</h1>

          <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
 
              <Link href="/cours/step3" className="flex items-center gap-3 group no-underline cursor-pointer">
                <img 
                  src="/data/prof-photo.png" 
                  className="w-12 h-12 rounded-full object-cover border border-gray-100 group-hover:border-[#5d35b1] transition-all" 
                  alt="Prof" 
                />
                <div>
                  <h3 className="font-bold text-[1.05rem] text-[#1a1a1a] group-hover:text-[#5d35b1] transition-colors">
                    {videoDetails.prof}
                  </h3>
                  <p className="text-[0.75rem] text-gray-500">Mathematics • 105 Videos</p>
                </div>
              </Link>

              <button className="bg-[#5d35b1] hover:bg-[#4A1A9C] text-white px-5 py-2 rounded-lg font-bold text-sm ml-4 transition-all active:scale-95 cursor-pointer">
                Follow
              </button>
            </div>

    
            <div className="bg-[#f0f0f0] rounded-full flex items-center px-4 py-1.5 text-gray-600">
              <button 
                onClick={() => { setIsLiked(!isLiked); setIsDisliked(false); }} 
                className={`flex items-center gap-2 px-2 transition-colors cursor-pointer hover:text-green-600 ${isLiked ? 'text-green-600' : ''}`}
              >
                <i className={`${isLiked ? 'fas' : 'far'} fa-thumbs-up`}></i>
                <span className="text-xs font-bold">408</span>
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>
              <button 
                onClick={() => { setIsDisliked(!isDisliked); setIsLiked(false); }} 
                className={`px-2 transition-colors cursor-pointer hover:text-red-600 ${isDisliked ? 'text-red-600' : ''}`}
              >
                <i className={`${isDisliked ? 'fas' : 'far'} fa-thumbs-down`}></i>
              </button>
            </div>
          </div>

          <div className="bg-[#EEF2FF] rounded-xl p-5 mb-8 border border-[#e0e7ff]">
            <div className="text-[0.85rem] font-bold mb-2 cursor-default">500 Vues • Il y a 3 jours</div>
            <p className="text-[0.9rem] text-[#444] leading-relaxed mb-3">Bonjour chers élèves, dans cette leçon importante...</p>
            <a href="#" className="text-[#4A1A9C] text-[0.85rem] font-bold hover:underline cursor-pointer">https://drive.google.com/drive/dossier1-cours/12033482</a>
          </div>

          {/* Comments */}
          <section className="mt-10">
            <h3 className="font-bold text-[1.1rem] mb-6 cursor-default">{commentsList.length} Commentaires</h3>
            
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 bg-[#8c7ae6] text-white rounded-full flex items-center justify-center font-bold shrink-0">UN</div>
              <div className="w-full">
                <input 
                  type="text" 
                  placeholder="Ajouter un commentaire..." 
                  className="w-full outline-none py-2 text-sm border-b border-gray-200 focus:border-[#4A1A9C] transition-colors"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={handleCommentSubmit}
                />
              </div>
            </div>

            <div className="space-y-6">
              {commentsList.map((c) => (
                <div key={c.id} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-bold shrink-0 text-sm">
                    {c.initials}
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.85rem] font-bold text-[#1a1a1a]">{c.user}</span>
                        <span className="text-[0.7rem] text-gray-400">À l'instant</span>
                      </div>
                      <button 
                        onClick={() => deleteComment(c.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all cursor-pointer text-xs"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <p className="text-[0.9rem] text-[#444] mt-1">{c.text}</p>
                    <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs font-bold">
                       <button className="hover:text-gray-600 cursor-pointer transition-colors"><i className="far fa-thumbs-up mr-1"></i> Like</button>
                       <button className="hover:text-gray-600 cursor-pointer transition-colors">Répondre</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <h3 className="font-bold text-[1.1rem] mb-5 cursor-default">Vidéos associées</h3>
          <div className="flex flex-col gap-5">
            {relatedVideos.map((v) => (
              <div 
                key={v.id} 
                onClick={() => handleRelatedClick(v)} 
                className="flex gap-3 cursor-pointer group p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-[140px] h-20 shrink-0">
                  <img src={v.thumb} className="w-full h-full object-cover rounded-lg group-hover:brightness-90 transition-all" alt="" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded">{v.duration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8c7ae6] text-[10px] font-bold uppercase">{v.subject}</span>
                  <h4 className="text-[0.85rem] font-bold leading-tight text-[#333] mt-1 group-hover:text-[#4A1A9C] line-clamp-2">{v.title}</h4>
                  <div className="flex items-center gap-1.5 mt-2">
                    <img src="/data/prof-icon/prof-icon2.png" className="w-4 h-4 rounded-full" alt="" />
                    <span className="text-[0.7rem] text-gray-400 font-medium">{v.prof}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function Step2Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Chargement...</div>}>
      <VideoPlayerContent />
    </Suspense>
  );
}