"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ExercicesPage2() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const [files, setFiles] = useState([]);
  const [realFiles, setRealFiles] = useState([]);

  const [errors, setErrors] = useState({
    subject: false,
    description: false,
    files: false,
  });

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 5);

    setRealFiles((prev) => [...prev, ...selectedFiles]);

    selectedFiles.forEach((file) => {
      const fileId = Date.now() + Math.random();
      const fileSizeKB = (file.size / 1024).toFixed(0);

      const newFile = {
        id: fileId,
        name: file.name,
        totalSize: fileSizeKB,
        currentSize: 0,
        progress: 0,
        status: "uploading",
      };

      setFiles((prev) => [...prev, newFile]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  progress,
                  currentSize: ((fileSizeKB * progress) / 100).toFixed(0),
                  status: progress >= 100 ? "completed" : "uploading",
                }
              : f
          )
        );

        if (progress >= 100) clearInterval(interval);
      }, 150);
    });

    setErrors((prev) => ({ ...prev, files: false }));
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setRealFiles((prev) => prev.slice(0, -1));
  };

  /* ================= SUBMIT ================= */
  const handleNext = async (e) => {
    e.preventDefault(); // ✅ VERY IMPORTANT

    const isSubjectValid = formData.subject.trim() !== "";
    const isDescriptionValid = formData.description.trim() !== "";
    const hasFiles = realFiles.length > 0;

    setErrors({
      subject: !isSubjectValid,
      description: !isDescriptionValid,
      files: !hasFiles,
    });

    if (!isSubjectValid || !isDescriptionValid || !hasFiles) {
      alert("Veuillez remplir tous les champs et ajouter un fichier.");
      return;
    }

    try {
      const data = new FormData();
      data.append("studentId", 1); // TEMP
      data.append("exerciseId", 1); // TEMP
      data.append("notes", formData.description);

      realFiles.forEach((file) => {
        data.append("files", file);
      });

      const res = await fetch("http://localhost:5000/api/exercise/submit", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        alert("Upload failed");
        return;
      }

      const result = await res.json();
      console.log("Submission success:", result);

      router.push("/exercices/step3");
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto pb-20 px-4 md:px-0">
      <header className="mb-8">
        <h1 className="text-[28px] font-bold text-[#121A4B]">L'envoi</h1>
        <p className="text-[#888] mt-1">
          Soumettez votre problème pour obtenir une correction détaillée d'un professeur.
        </p>
      </header>

      <form
        className="bg-white p-6 md:p-8 rounded-[12px] shadow-sm border border-[#eeeeee]"
        onSubmit={handleNext}
      >
        <div className="mb-10">
          <h3 className="text-[18px] font-semibold mb-4">Objet</h3>
          <input
            type="text"
            className="w-full p-4 rounded-lg border bg-[#f4f6f9]"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
        </div>

        <div className="mb-10">
          <h3 className="text-[18px] font-semibold mb-4">Description</h3>
          <textarea
            rows="5"
            className="w-full p-4 rounded-lg border bg-[#f4f6f9]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed p-8 text-center cursor-pointer"
        >
          <p>Choose files</p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {files.map((file) => (
          <div key={file.id} className="mt-4 flex justify-between">
            <span>{file.name}</span>
            <button type="button" onClick={() => removeFile(file.id)}>
              X
            </button>
          </div>
        ))}

        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            className="bg-[#4A1A9C] text-white px-10 py-3 rounded-lg"
          >
            Suivant →
          </button>
        </div>
      </form>
    </div>
  );
}

