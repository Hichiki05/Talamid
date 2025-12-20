"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ExercicesPage3() {
    const router = useRouter();
    
    // Form State
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        country: '',
        paymentMethod: 'card'
    });
    
    // UI State
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // 1. Format Card Number (16 digits only)
    const handleCardNumber = (val) => {
        const cleaned = val.replace(/\D/g, '').substring(0, 16);
        setCardData({ ...cardData, number: cleaned });
    };

    // 2. Format Expiry (MM/YY)
    const handleExpiry = (val) => {
        let v = val.replace(/\D/g, '');
        if (v.length >= 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
        setCardData({ ...cardData, expiry: v.substring(0, 5) });
    };

    const handleFinish = () => {
        const newErrors = {
            number: !/^\d{16}$/.test(cardData.number),
            expiry: !/^\d{2}\/\d{2}$/.test(cardData.expiry),
            cvc: !/^\d{3}$/.test(cardData.cvc),
            country: cardData.country === ""
        };

        setErrors(newErrors);

        if (Object.values(newErrors).every(err => !err)) {
            setShowModal(true);
        } else {
            alert("Veuillez remplir correctement les informations de paiement.");
        }
    };


    const confirmPayment = () => {
        setIsSuccess(true);
       
        setTimeout(() => {
            router.push('/exercices');
        }, 5000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4 md:px-0">
            <header className="mb-8">
                <h2 className="text-[28px] font-bold text-[#121A4B]">Paiement</h2>
                <p className="text-[#888]">Déposez votre problème pour obtenir une correction détaillée d'un professeur.</p>
            </header>

            {/* Stepper */}
            <div className="flex justify-between relative mb-12 mt-10 px-4 items-center">
                <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-[#ddd] -translate-y-1/2 z-0"></div>
                <div className="z-10 bg-[#f4f6f9] px-2"><span className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white"><i className="fas fa-check"></i></span></div>
                <div className="z-10 bg-[#f4f6f9] px-2"><span className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white"><i className="fas fa-check"></i></span></div>
                <div className="z-10 bg-[#f4f6f9] px-2"><span className="w-8 h-8 bg-[#5c4df3] rounded-md flex items-center justify-center text-white font-bold">3</span></div>
            </div>

            <div className="bg-white border border-[#eeeeee] rounded-xl p-6 md:p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Wallet Card */}
                    <div className="border border-[#ddd] rounded-xl p-6 flex flex-col justify-center">
                        <div className="flex justify-between items-center text-[#888] text-xs font-bold uppercase tracking-wider">
                            <span>Solde du portefeuille</span>
                            <i className="fas fa-wallet text-green-400 text-lg"></i>
                        </div>
                        <div className="text-[28px] font-bold text-[#4338ca] my-2">40.00 DH</div>
                        <button className="w-full py-2 border border-[#ddd] rounded-lg text-[#666] text-sm hover:bg-gray-50 transition-all">Ajouter des fonds</button>
                    </div>

                    {/* Total Card */}
                    <div className="bg-[#7c69ef] text-white rounded-xl p-6 relative">
                        <div className="flex items-baseline gap-4">
                            <span className="text-xl opacity-90">Total</span>
                            <span className="text-4xl font-bold">50.00 DH</span>
                        </div>
                        <div className="mt-4 text-sm opacity-90">
                            <p>Matière : ## DH</p>
                            <p>Type de service : ## DH</p>
                        </div>
                        <i className="fas fa-wallet absolute right-6 top-6 bg-white/20 p-2 rounded-full text-green-300 text-sm"></i>
                    </div>
                </div>

                {/* Form Section */}
                <div>
                    <p className="text-[#666] mb-4 text-sm">Vous pouvez payer directement ici :</p>
                    <div className="flex items-center gap-3 p-4 border-b border-[#eee] font-medium">
                        <input type="radio" checked readOnly className="accent-[#5c4df3]" />
                        <label className="flex items-center gap-2"><i className="fas fa-credit-card text-[#5c4df3]"></i> Card</label>
                    </div>

                    <div className="py-6 space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#333]">Card number</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={cardData.number}
                                    onChange={(e) => handleCardNumber(e.target.value)}
                                    placeholder="1234 1234 1234 1234"
                                    className={`w-full p-3 bg-[#f9f9f9] border rounded-md outline-none transition-all ${errors.number ? 'border-red-500' : 'border-[#eee] focus:border-[#4A1A9C]'}`}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                    <img src="https://img.icons8.com/color/48/000000/visa.png" className="w-6" alt="Visa" />
                                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="w-6" alt="Mastercard" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#333]">Expiration</label>
                                <input 
                                    type="text" 
                                    value={cardData.expiry}
                                    onChange={(e) => handleExpiry(e.target.value)}
                                    placeholder="MM/YY"
                                    className={`w-full p-3 bg-[#f9f9f9] border rounded-md outline-none ${errors.expiry ? 'border-red-500' : 'border-[#eee]'}`}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#333]">CVC</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        maxLength="3"
                                        value={cardData.cvc}
                                        onChange={(e) => setCardData({...cardData, cvc: e.target.value.replace(/\D/g, '')})}
                                        placeholder="CVC"
                                        className={`w-full p-3 bg-[#f9f9f9] border rounded-md outline-none ${errors.cvc ? 'border-red-500' : 'border-[#eee]'}`}
                                    />
                                    <i className="fas fa-info-circle absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"></i>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-[#333]">Country</label>
                            <select 
                                value={cardData.country}
                                onChange={(e) => setCardData({...cardData, country: e.target.value})}
                                className={`w-full p-3 bg-[#f9f9f9] border rounded-md outline-none ${errors.country ? 'border-red-500' : 'border-[#eee]'}`}
                            >
                                <option value="">Sélectionnez votre pays...</option>
                                <option value="MA">Maroc</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button 
                        onClick={handleFinish}
                        className="bg-[#5c4df3] text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#4a3dc2] transition-all"
                    >
                        Suivant <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-[2000] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[20px] p-10 w-full max-w-[450px] text-center relative shadow-xl">
                        {!isSuccess ? (
                            <>
                                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-[#4A1A9C] hover:bg-gray-50">×</button>
                                <div className="w-16 h-16 border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl text-blue-500">
                                    <i className="fas fa-credit-card"></i>
                                </div>
                                <h2 className="text-[#121A4B] text-xl font-bold mb-2">Veuillez confirmer votre commande</h2>
                                <p className="text-[#666] text-lg mt-4">Total</p>
                                <div className="text-[#121A4B] text-[40px] font-bold mb-8">50.00 DH</div>
                                <button onClick={confirmPayment} className="bg-[#1e3a8a] text-white px-14 py-3 rounded-lg font-bold hover:bg-[#162a64] transition-all">
                                    Confirmer
                                </button>
                            </>
                        ) : (
                            <div className="py-4">
                                <div className="flex justify-center mb-6 animate-[bounce_1s_ease-in-out_infinite]">
                                    <img src="/data/checker.png" alt="Success" className="w-24 h-24" />
                                </div>
                                <h2 className="text-[#121A4B] text-2xl font-bold mb-2">Commande Confirmée</h2>
                                <p className="text-[#666]">Votre exercice a été soumis avec succès.</p>
                                <div className="mt-8 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 transition-all duration-[5000ms] linear w-full" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}