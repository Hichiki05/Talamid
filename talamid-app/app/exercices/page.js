"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ExercicesPage1() {

    const [level, setLevel] = useState(null);
    const [subject, setSubject] = useState(null);
    const [service, setService] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    

    const [errors, setErrors] = useState({
        level: false,
        subject: false,
        service: false
    });

    const toggleDropdown = (srv) => {
        setOpenDropdown(openDropdown === srv ? null : srv);
    };

    const handleSelect = (group, value) => {
        if (group === 'level') setLevel(value);
        if (group === 'subject') setSubject(value);
        setErrors(prev => ({ ...prev, [group]: false }));
    };

    const handleServiceSelect = (label) => {
        setService(label);
        setOpenDropdown(null);
        setErrors(prev => ({ ...prev, service: false }));
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        const newErrors = {
            level: !level,
            subject: !subject,
            service: !service
        };
        setErrors(newErrors);

        if (!newErrors.level && !newErrors.subject && !newErrors.service) {

            window.location.href = '/exercices/step2'; 
        } else {
            alert("Veuillez sélectionner une option pour chaque question.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-[28px] font-bold mb-[5px]">Informations d'envoi</h1>
            <p className="text-[#888] mb-[30px]">Déposez votre problème pour obtenir une correction détaillée d'un professeur.</p>


            <div className="flex justify-between relative mb-10 mt-10 px-4 items-center">

    <div className="absolute top-1/2 left-[5%] right-[5%] h-[1px] bg-[#ddd] -translate-y-1/2 z-0"></div>
    

    <div className="z-10 relative">
        <span className="w-8 h-8 bg-[#5c4df3] rounded-md flex items-center justify-center text-white font-bold ring-[4px] ring-[#f4f6f9]">
            1
        </span>
    </div>


    <div className="z-10 relative">
        <span className="w-8 h-8 bg-[#ddd] rounded-md flex items-center justify-center text-white font-bold ring-[4px] ring-[#f4f6f9]">
            2
        </span>
    </div>

    <div className="z-10 relative">
        <span className="w-8 h-8 bg-[#ddd] rounded-md flex items-center justify-center text-white font-bold ring-[4px] ring-[#f4f6f9]">
            3
        </span>
    </div>
</div>


            <section className="mb-[40px] bg-white p-[30px] rounded-[12px] shadow-sm">
                <h3 className="text-primary-light border-l-4 border-primary-light pl-[10px] mb-[10px] text-[18px] font-semibold">| Niveau d'études</h3>
                <p className="text-[#888] text-[14px] mb-[20px]">Votre niveau d'études a été automatiquement sélectionné...</p>
                <div className={`flex flex-wrap gap-[10px] pb-2 ${errors.level ? 'ring-2 ring-red-500 p-2 rounded-lg' : ''}`}>
                    {["2ème Bac", "1ère Bac", "Tronc Commun", "3ère année collège", "2ère année collège", "1ère année collège"].map(lvl => (
                        <button 
                            key={lvl}
                            onClick={() => handleSelect('level', lvl)}
                            className={`whitespace-nowrap px-[18px] py-[10px] rounded-[6px] text-[14px] transition-all border ${level === lvl ? 'bg-primary-light text-white border-primary-light' : 'bg-transparent border-[#eeeeee] text-[#333] hover:border-primary-light'}`}
                        >
                            {lvl}
                        </button>
                    ))}
                </div>
            </section>


            <section className="mb-[40px] bg-white p-[30px] rounded-[12px] shadow-sm">
                <h3 className="text-primary-light border-l-4 border-primary-light pl-[10px] mb-[10px] text-[18px] font-semibold">Matière</h3>
                <div className={`flex flex-wrap gap-[10px] pb-2 ${errors.subject ? 'ring-2 ring-red-500 p-2 rounded-lg' : ''}`}>
                    {[
                        { name: "Mathématiques", icon: "fa-calculator" },
                        { name: "Physique", icon: "fa-atom" },
                        { name: "SVT", icon: "fa-dna" },
                        { name: "Français", icon: "fa-language" },
                        { name: "Anglais", icon: "fa-globe-americas" },
                        { name: "Arabe", icon: "fas fa-scroll" },
                        { name: "Histoire Géographie", icon: "fas fa-map-marked-alt" },
                        { name: "Informatique", icon: "fas fa-desktop" },
                        { name: "Technologie Industrielle", icon: "fas fa-tools" },
                        { name: "Sciences de l'ingénieur", icon: "fas fa-cogs" },
                        { name: "Economie et Organisation Administrative des Entreprises", icon: "fas fa-chart-line" },
                        { name: "Comptabilité et Mathématiques Financières", icon: "fas fa-coins" },
                        { name: "Economie Générale et Statistiques", icon: "fas fa-chart-pie" },
                        { name: "Droit", icon: "fas fa-balance-scale" },
                        { name: "Informatique de gestion", icon: "fas fa-laptop-code" },
                        { name: "Education Islamique", icon: "fas fa-quran" },
                        { name: "Sciences Végétales et Animales", icon: "fas fa-seedling" }
                    ].map(item => (
                        <button 
                            key={item.name}
                            onClick={() => handleSelect('subject', item.name)}
                            className={`flex items-center whitespace-nowrap px-[18px] py-[10px] rounded-[6px] text-[14px] transition-all border ${subject === item.name ? 'bg-primary-light text-white border-primary-light' : 'bg-transparent border-[#eeeeee] text-[#333] hover:border-primary-light'}`}
                        >
                            <i className={`fas ${item.icon} mr-2 ${subject === item.name ? 'text-white' : 'text-primary-light'}`}></i>
                            {item.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-[40px] bg-white p-[30px] rounded-[12px] shadow-sm relative">
                <h3 className="text-primary-light border-l-4 border-primary-light pl-[10px] mb-[10px] text-[18px] font-semibold">| Service Type</h3>
                <p className="text-[#888] text-[14px] mb-[20px]">Choisissez le service que vous souhaitez afin d'améliorer votre choix de professeur.</p>
                
                <div className={`flex flex-wrap gap-[10px] pb-2 ${errors.service ? 'ring-2 ring-red-500 p-2 rounded-lg' : ''}`}>
                    {["Text Explanation", "Audio Explanation", "Video Explanation", "Live Explanation"].map(srvType => (
                        <div key={srvType} className="relative">
                            <button 
                                onClick={() => toggleDropdown(srvType)}
                                className={`whitespace-nowrap px-[18px] py-[10px] rounded-[6px] text-[14px] transition-all border ${service?.startsWith(srvType) ? 'bg-primary-light text-white border-primary-light' : 'bg-transparent border-[#eeeeee] text-[#333] hover:border-primary-light'}`}
                            >
                                {service?.startsWith(srvType) ? service : srvType}
                            </button>
                            
                            {openDropdown === srvType && (
                                <div className="absolute top-full left-0 z-[110] bg-white border border-gray-300 rounded-md p-1 min-w-[180px] shadow-xl flex flex-col gap-1 mt-1">
                                    {[1, 2, 3, 4].map(num => {
                                        const label = srvType.includes("Live") ? `${srvType}: ${num * 30} min` : `${srvType}: ${num} Exercice${num > 1 ? 's' : ''}`;
                                        return (
                                            <button 
                                                key={num}
                                                onClick={() => handleServiceSelect(label)}
                                                className="border-none p-2 text-left w-full text-sm hover:bg-gray-100 rounded text-[#333]"
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>     
            </section>


            <div className="flex justify-end pb-10">
                <button 
                    onClick={handleNextStep}
                    className="bg-primary-light text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg"
                >
                    Suivant →
                </button>
            </div>
        </div>
    );
}