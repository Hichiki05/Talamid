"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExercicesPage2() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    
    // State management
    const [formData, setFormData] = useState({ subject: '', description: '' });
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({ subject: false, description: false, files: false });

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 5); 
        
        selectedFiles.forEach(file => {
            const fileId = Date.now() + Math.random();
            const fileSizeKB = (file.size / 1024).toFixed(0);
            

            const newFile = {
                id: fileId,
                name: file.name,
                totalSize: fileSizeKB,
                currentSize: 0,
                progress: 0,
                status: 'uploading'
            };
            
            setFiles(prev => [...prev, newFile]);


            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                setFiles(prev => prev.map(f => {
                    if (f.id === fileId) {
                        return { 
                            ...f, 
                            progress: progress,
                            currentSize: ((fileSizeKB * progress) / 100).toFixed(0),
                            status: progress >= 100 ? 'completed' : 'uploading'
                        };
                    }
                    return f;
                }));

                if (progress >= 100) clearInterval(interval);
            }, 150);
        });
        setErrors(prev => ({ ...prev, files: false }));
    };


    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };


    const handleNext = () => {
        const isSubjectValid = formData.subject.trim() !== "";
        const isDescriptionValid = formData.description.trim() !== "";
        const hasCompletedFiles = files.some(f => f.status === 'completed');

        setErrors({
            subject: !isSubjectValid,
            description: !isDescriptionValid,
            files: !hasCompletedFiles
        });

        if (isSubjectValid && isDescriptionValid && hasCompletedFiles) {
            router.push('/exercices/step3'); // Navigates to page 3
        } else {
            alert("Veuillez remplir l'objet, la description et ajouter au moins un fichier.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4 md:px-0">
            <header className="mb-8">
                <h1 className="text-[28px] font-bold text-[#121A4B]">L'envoi</h1>
                <p className="text-[#888] mt-1">Soumettez votre problème pour obtenir une correction détaillée d'un professeur.</p>
            </header>


            <div className="flex justify-between relative mb-12 mt-10 px-4 items-center">
                <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-[#ddd] -translate-y-1/2 z-0"></div>
                
                <div className="z-10 relative">
                    <span className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold ring-[4px] ring-[#f4f6f9]">
                        <i className="fas fa-check text-xs"></i>
                    </span>
                </div>

                <div className="z-10 relative">
                    <span className="w-8 h-8 bg-[#5c4df3] rounded-md flex items-center justify-center text-white font-bold ring-[4px] ring-[#f4f6f9]">
                        2
                    </span>
                </div>

                <div className="z-10 relative">
                    <span className="w-8 h-8 bg-[#ddd] rounded-md flex items-center justify-center text-white font-bold ring-[4px] ring-[#f4f6f9]">
                        3
                    </span>
                </div>
            </div>

            <form className="bg-white p-6 md:p-8 rounded-[12px] shadow-sm border border-[#eeeeee]">

                <div className="mb-10">
                    <h3 className="text-[18px] font-semibold text-[#121A4B] border-l-4 border-[#4A1A9C] pl-3 mb-4">Objet</h3>
                    <input 
                        type="text" 
                        className={`w-full p-4 rounded-lg border bg-[#f4f6f9] outline-none transition-all ${errors.subject ? 'border-red-500 ring-1 ring-red-200' : 'border-[#eeeeee] focus:bg-white focus:border-[#4A1A9C]'}`}
                        placeholder="Saisissez l'objet..."
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                </div>


                <div className="mb-10">
                    <h3 className="text-[18px] font-semibold text-[#121A4B] border-l-4 border-[#4A1A9C] pl-3 mb-4">Description du problème / Question</h3>
                    <textarea 
                        rows="5" 
                        className={`w-full p-4 rounded-lg border bg-[#f4f6f9] outline-none transition-all resize-none ${errors.description ? 'border-red-500 ring-1 ring-red-200' : 'border-[#eeeeee] focus:bg-white focus:border-[#4A1A9C]'}`}
                        placeholder="Saisissez votre description..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>

   
                <div>
                    <h3 className="text-[18px] font-semibold text-[#121A4B] border-l-4 border-[#4A1A9C] pl-3 mb-2">Upload files</h3>
                    <p className="text-[#888] text-sm mb-6">Choisissez ce que vous souhaitez que l'instructeur fasse pour vous.</p>

                    <div 
                        onClick={() => fileInputRef.current.click()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center bg-[#f4f6f9] cursor-pointer transition-all hover:bg-[#f0f4ff] ${errors.files ? 'border-red-500 bg-red-50' : 'border-[#eeeeee] hover:border-[#4A1A9C]'}`}
                    >
                        <i className="fas fa-cloud-upload-alt text-4xl text-[#888] mb-4"></i>
                        <p className="text-[#333] font-medium">Choose a file or drag & drop it here</p>
                        <p className="text-[#888] text-xs mt-1">JPEG, PNG, PDF, and MP4 formats, up to 50MB</p>
                        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
                    </div>

                    <div className="mt-6 space-y-2">
                        {files.map((file) => (
                            <div key={file.id} className="flex items-center justify-between py-4 border-b border-[#eeeeee]">
                                <div className="flex items-center flex-1">
                                    <i className="fas fa-file-pdf text-[#4A1A9C] text-xl mr-4"></i>
                                    <div>
                                        <p className="font-semibold text-sm">{file.name}</p>
                                        <p className="text-xs text-[#888]">{file.currentSize} KB of {file.totalSize} KB</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-32 md:w-48 mr-6 hidden sm:block">
                                        <div className="h-1.5 w-full bg-[#eeeeee] rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-300 ${file.status === 'completed' ? 'bg-green-500' : 'bg-[#4A1A9C]'}`}
                                                style={{ width: `${file.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFile(file.id)} className="text-[#888] hover:text-red-500">
                                        <i className={`fas ${file.status === 'completed' ? 'fa-trash-alt' : 'fa-times-circle'}`}></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>

            <div className="mt-10 flex justify-end">
                <button 
                    onClick={handleNext}
                    className="bg-[#4A1A9C] text-white px-10 py-3 rounded-lg font-semibold hover:bg-[#121A4B] transition-all"
                >
                    Suivant →
                </button>
            </div>
        </div>
    );
}