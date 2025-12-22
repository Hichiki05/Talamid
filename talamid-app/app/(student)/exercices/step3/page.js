"use client";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const isFromDashboard = searchParams.get('from') === 'dashboard_action';
    
    const [cardData, setCardData] = useState({
        number: '',
        expiry: '',
        cvc: '',
        country: '',
        paymentMethod: 'card'
    });
    
    const [amount, setAmount] = useState(40); 
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    const handleCardNumber = (val) => {
        const cleaned = val.replace(/\D/g, '').substring(0, 16);
        setCardData({ ...cardData, number: cleaned });
    };

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
        setIsProcessing(true);
        
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            
            setTimeout(() => {
                router.push(isFromDashboard ? '/dashboard' : '/exercices');
            }, 4000);
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20 px-4 md:px-0 font-sans">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            
            <header className="mb-8">
                <h2 className="text-[28px] font-bold text-[#121A4B]">
                    {isFromDashboard ? "Recharger mon compte" : "Paiement"}
                </h2>
                <p className="text-[#888]">
                    {isFromDashboard 
                        ? "Saisissez le montant que vous souhaitez ajouter à votre solde." 
                        : "Effectuez votre paiement pour valider votre demande d'exercice."}
                </p>
            </header>

            {!isFromDashboard && (
                <div className="flex justify-between relative mb-12 mt-10 px-4 items-center">
                    <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-[#ddd] -translate-y-1/2 z-0"></div>
                    <div className="z-10 bg-[#f4f6f9] px-2"><span className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white"><i className="fas fa-check"></i></span></div>
                    <div className="z-10 bg-[#f4f6f9] px-2"><span className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white"><i className="fas fa-check"></i></span></div>
                    <div className="z-10 bg-[#f4f6f9] px-2"><span className="w-8 h-8 bg-[#5c4df3] rounded-md flex items-center justify-center text-white font-bold">3</span></div>
                </div>
            )}

            <div className="bg-white border border-[#eeeeee] rounded-xl p-6 md:p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    
                    <div className="border border-[#ddd] rounded-xl p-6 flex flex-col justify-center min-h-[160px]">
                        <div className="flex justify-between items-center text-[#888] text-xs font-bold uppercase tracking-wider mb-2">
                            <span>{isFromDashboard ? "Montant à recharger" : "Solde actuel"}</span>
                            <i className="fas fa-wallet text-green-500 text-lg"></i>
                        </div>
                        
                        {isFromDashboard ? (
                            <div className="flex items-center gap-2 border-b-2 border-green-200 focus-within:border-[#5c4df3] transition-all py-2 my-2">
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="text-[32px] font-bold text-[#4338ca] w-full outline-none bg-transparent"
                                />
                                <span className="text-xl font-bold text-[#4338ca]">DH</span>
                            </div>
                        ) : (
                            <div className="text-[32px] font-bold text-[#4338ca] my-2">40.00 DH</div>
                        )}
                        <p className="text-[11px] text-gray-400">
                            {isFromDashboard ? "Modifiez le montant ci-dessus" : "Votre solde disponible"}
                        </p>
                    </div>

                    {!isFromDashboard && (
                        <div className="bg-[#7c69ef] text-white rounded-xl p-6 relative flex flex-col justify-center">
                            <div className="flex items-baseline gap-4">
                                <span className="text-xl opacity-90">Total</span>
                                <span className="text-4xl font-bold">50.00 DH</span>
                            </div>
                            <div className="mt-4 text-sm opacity-90">
                                <p>Frais de correction inclus</p>
                            </div>
                            <i className="fas fa-shield-alt absolute right-6 top-6 bg-white/20 p-2 rounded-full text-white text-xs"></i>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <h4 className="font-bold text-[#121A4B] text-sm flex items-center gap-2">
                        <i className="fas fa-credit-card"></i> Détails de la carte
                    </h4>

                    <div className="space-y-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={cardData.number}
                                onChange={(e) => handleCardNumber(e.target.value)}
                                placeholder="Numéro de carte"
                                className={`w-full p-4 bg-[#f9f9f9] border rounded-xl outline-none transition-all ${errors.number ? 'border-red-500' : 'border-[#eee] focus:border-[#4A1A9C]'}`}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                <img src="https://img.icons8.com/color/48/000000/visa.png" className="w-8" alt="Visa" />
                                <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="w-8" alt="Mastercard" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                value={cardData.expiry}
                                onChange={(e) => handleExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className={`p-4 bg-[#f9f9f9] border rounded-xl outline-none ${errors.expiry ? 'border-red-500' : 'border-[#eee]'}`}
                            />
                            <input 
                                type="text" 
                                maxLength="3"
                                value={cardData.cvc}
                                onChange={(e) => setCardData({...cardData, cvc: e.target.value.replace(/\D/g, '')})}
                                placeholder="CVC"
                                className={`p-4 bg-[#f9f9f9] border rounded-xl outline-none ${errors.cvc ? 'border-red-500' : 'border-[#eee]'}`}
                            />
                        </div>

                        <select 
                            value={cardData.country}
                            onChange={(e) => setCardData({...cardData, country: e.target.value})}
                            className={`w-full p-4 bg-[#f9f9f9] border rounded-xl outline-none ${errors.country ? 'border-red-500' : 'border-[#eee]'}`}
                        >
                            <option value="">Sélectionnez un pays</option>
                            <option value="MA">Maroc</option>
                            <option value="FR">France</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <button 
                        onClick={handleFinish}
                        className="bg-[#5c4df3] text-white px-12 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#4a3dc2] transition-all shadow-lg shadow-indigo-200"
                    >
                        Suivant <i className="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-[#121A4B]/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[24px] p-10 w-full max-w-[420px] text-center relative shadow-2xl animate-in fade-in zoom-in duration-300">
                        {!isSuccess ? (
                            <>
                                {!isProcessing && (
                                    <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors text-xl">
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                                
                                <div className="w-20 h-20 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-blue-600 bg-blue-50">
                                    <i className={`fas ${isProcessing ? 'fa-spinner fa-spin' : 'fa-shield-alt'}`}></i>
                                </div>
                                
                                <h2 className="text-[#121A4B] text-2xl font-bold mb-2">
                                    {isProcessing ? "Traitement..." : "Confirmation"}
                                </h2>
                                
                                <p className="text-[#888] mt-4">{isFromDashboard ? "Montant de votre recharge" : "Total à payer"}</p>
                                <div className="text-[#121A4B] text-[48px] font-black mb-10 tracking-tight">
                                    {isFromDashboard ? amount : "50.00"} <span className="text-xl">DH</span>
                                </div>
                                
                                <button 
                                    disabled={isProcessing}
                                    onClick={confirmPayment} 
                                    className={`w-full py-4 rounded-2xl font-bold transition-all text-white ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1e3a8a] hover:bg-[#121A4B] shadow-xl'}`}
                                >
                                    {isProcessing ? "Vérification en cours..." : "Confirmer le paiement"}
                                </button>
                            </>
                        ) : (
                            <div className="py-6">
                                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl animate-bounce border-4 border-green-100">
                                    <i className="fas fa-check"></i>
                                </div>
                                <h2 className="text-[#121A4B] text-3xl font-bold mb-4">Bravo !</h2>
                                <p className="text-[#666] leading-relaxed">
                                    {isFromDashboard 
                                        ? `Votre portefeuille a été crédité de ${amount} DH avec succès.` 
                                        : "Votre paiement a été accepté. Un professeur va bientôt corriger votre exercice."}
                                </p>
                                <div className="mt-10 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 transition-all duration-[4000ms] ease-linear" style={{ width: '100%' }}></div>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-6 font-medium">Redirection automatique...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ExercicesPage3() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-[#121A4B] font-bold">Chargement du module de paiement...</div>}>
            <PaymentContent />
        </Suspense>
    );
}