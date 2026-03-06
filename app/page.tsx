'use client';
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import React, { useState, useRef } from 'react';
import { Heart, Gift, Star, ChevronRight, PartyPopper, Sparkles, Trophy, Volume2, VolumeX } from 'lucide-react';

// --- Tipos ---
interface Question {
  question: string;
  options: string[];
  correct: string;
  hint: string;
  compliment: string;
}

// --- Componentes de Animación ---
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-rose-200/40 animate-float"
          size={Math.random() * 20 + 10}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            backgroundColor: ['#fb7185', '#fda4af', '#f43f5e', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 5)],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

// --- Componente Principal ---
export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start'); 
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initialQuestions: Question[] = [
    {
      question: "¿Cuál fue el primer lugar al que salimos?",
      options: ["Caño Negro", "Los Chiles", "Pavón", "San José"],
      correct: "Los Chiles",
      hint: "Está bien cerquita de la frontera...",
      compliment: "¡Ese día supe que eras especial! ❤️"
    },
    {
      question: "¿Qué es lo que más me gusta de vos?",
      options: ["Tu sonrisa", "Tu forma de ser", "Tu mirada", "Todo de vos"],
      correct: "Todo de vos",
      hint: "¡Es imposible elegir solo una cosa!",
      compliment: "Sos perfecta tal cual sos. 😍"
    },
    {
      question: "¿Cuál es el lugar más aleatorio donde hemos echado pasión?",
      options: ["En un potrero", "En el cuarto", "En la calle a media noche", "En el río"],
      correct: "En la calle a media noche",
      hint: "Había mucha oscuridad y nada de gente...",
      compliment: "¡Nuestras locuras son mis favoritas! 🔥"
    },
    {
      question: "¿Cuál es el lugar más largo al que hemos ido?",
      options: ["Limón", "San Carlos", "Guanacaste", "Puntarenas"],
      correct: "Guanacaste",
      hint: "Mucha arena y sol del pacífico...",
      compliment: "¡A cualquier lado iría con vos! 🚗"
    },
    {
      question: "¿Cuál es la última tragedia que nos pasó?",
      options: ["Se nos quemó la comida", "Nos quedamos botados", "Perdimos las llaves", "Nos agarró la lluvia"],
      correct: "Nos quedamos botados",
      hint: "El carro dijo 'hasta aquí llegué'...",
      compliment: "Ni quedarnos botados es malo si estoy con vos. 😂"
    },
    {
      question: "Si tuviéramos un hijo, ¿cómo le llamaríamos?",
      options: ["Kevin", "Jonaikel", "Bryan", "Justin"],
      correct: "Jonaikel",
      hint: "Un nombre con mucho estilo urbano...",
      compliment: "¡El Jonaikel va a ser todo un galán! 👶"
    },
    {
      question: "La primera vez, ¿cuántas veces lo hicimos?",
      options: ["1 vez", "2 veces", "3 veces", "+4"],
      correct: "+4",
      hint: "¡Estábamos inspirados!",
      compliment: "La química entre nosotros es de otro planeta. 🌌"
    },
    {
      question: "Tengo algo guardado muy importante en la casa, ¿qué es?",
      options: ["Un peluche azul", "Un **** rojo", "Una carta vieja", "Un anillo"],
      correct: "Un **** rojo",
      hint: "Es de color pasión y está bien escondido...",
      compliment: "¡Ese secreto está bien guardado! 😉"
    },
    {
      question: "¿Cuál es nuestro próximo gran plan?",
      options: ["Un viaje", "Un picnic", "Una boda", "Todas las anteriores"],
      correct: "Todas las anteriores",
      hint: "¡Quiero hacerlo todo con vos!",
      compliment: "Toda una vida por delante juntos. ✨"
    }
  ];

  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleStart = () => {
    const shuffled = shuffleArray(initialQuestions).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffled);
    setGameState('playing');
    setAttempts(0);
    setCurrentLevel(0);
    
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const resetGame = () => {
    setShowResetMessage(true);
    setTimeout(() => {
      setGameState('start');
      setShowResetMessage(false);
      setIsCorrect(null);
      setSelectedOption(null);
    }, 2500);
  };

  const handleOptionSelect = (optionText: string, index: number) => {
    if (isCorrect !== null) return;
    setSelectedOption(index);
    
    if (optionText === questions[currentLevel].correct) {
      setIsCorrect(true);
      setAttempts(0); 
      setTimeout(() => setShowReward(true), 400);
      
      setTimeout(() => {
        if (currentLevel < questions.length - 1) {
          setCurrentLevel(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          setShowReward(false);
        } else {
          setGameState('finished');
        }
      }, 3500); 
    } else {
      setIsCorrect(false);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 2) {
        setTimeout(() => resetGame(), 1000);
      } else {
        setTimeout(() => {
          setIsCorrect(null);
          setSelectedOption(null);
        }, 1500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa] flex items-center justify-center p-4 font-sans text-slate-800 relative overflow-hidden">
      <FloatingHearts />
      
      {/* INSTRUCCIONES:
        1. Crea 'public/music/romantica.mp3' para la música.
        2. Crea 'public/memes/celebracion.png' para la imagen.
      */}
      <audio 
        ref={audioRef}
        loop 
        preload="auto"
        src="/music/romantica.mp3" 
      />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(251,113,133,0.3)] border-8 border-white relative h-[680px] flex flex-col z-10 transition-all duration-500">
        
        <button 
          onClick={toggleMute}
          className="absolute top-6 right-6 z-30 p-2 bg-rose-50 rounded-full text-rose-400 border border-rose-100"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {showResetMessage && (
          <div className="absolute inset-0 z-50 bg-rose-500 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
            <h2 className="text-white text-4xl font-black italic uppercase leading-tight mb-4">
              ¡Diay mi vida!<br/>Casi casi...<br/>¡Va de nuevo!
            </h2>
            <div className="text-white text-7xl animate-bounce">🤭</div>
          </div>
        )}

        {gameState === 'playing' && !showResetMessage && (
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-50 overflow-hidden z-20">
            <div 
              className="h-full bg-rose-500 transition-all duration-1000 ease-out"
              style={{ width: `${(currentLevel / questions.length) * 100}%` }}
            />
          </div>
        )}

        <div className="p-8 flex-grow flex flex-col justify-center relative">
          {gameState === 'start' && (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="relative inline-block">
                <div className="bg-rose-100 p-8 rounded-full border-4 border-rose-50">
                  <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-bounce" />
              </div>
              <div className="space-y-3">
                <h1 className="text-5xl font-black text-rose-600 italic tracking-tighter uppercase leading-[0.8]">¡Feliz Cumple!</h1>
                <p className="text-slate-500 font-medium">
                  Superá todos los niveles para ganar tu regalo especial. ¡Si fallás dos veces, empezamos de cero!
                </p>
              </div>
              <button 
                onClick={handleStart}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-6 rounded-[2rem] shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 text-2xl italic group"
              >
                ¡VAMOS BEBE! <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}

          {gameState === 'playing' && !showResetMessage && (
            <div className="h-full flex flex-col">
              <div className={`transition-all duration-500 flex flex-col h-full ${showReward ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-rose-400 bg-rose-50 px-4 py-1 rounded-full border border-rose-100">
                    <Star size={14} className="fill-rose-400" />
                    <span className="uppercase tracking-widest text-[10px] font-black italic">NIVEL {currentLevel + 1} / {questions.length}</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 1].map(i => (
                      <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${i < (2 - attempts) ? 'bg-rose-500 border-rose-600' : 'bg-slate-100 border-slate-200'}`} />
                    ))}
                  </div>
                </div>
                
                <h2 className="text-2xl font-black leading-tight mb-8 text-slate-800 tracking-tight italic">
                  {questions[currentLevel]?.question}
                </h2>

                <div className="grid gap-3">
                  {questions[currentLevel]?.options.map((option, index) => (
                    <button
                      key={index}
                      disabled={isCorrect !== null}
                      onClick={() => handleOptionSelect(option, index)}
                      className={`w-full p-5 text-left rounded-[1.5rem] border-4 transition-all duration-300 flex justify-between items-center group ${
                        selectedOption === index 
                          ? (isCorrect ? 'bg-green-500 border-green-600 text-white shadow-lg' : 'bg-rose-500 border-rose-600 text-white animate-shake')
                          : 'border-slate-50 bg-slate-50 hover:border-rose-200 hover:bg-rose-50'
                      }`}
                    >
                      <span className="font-black text-lg uppercase italic">{option}</span>
                      {selectedOption === index && isCorrect && <Trophy size={20} />}
                    </button>
                  ))}
                </div>

                {isCorrect === false && attempts < 2 && (
                  <div className="mt-8 text-center animate-bounce">
                    <p className="text-rose-600 font-black bg-rose-50 py-3 rounded-2xl border-2 border-rose-200 px-6 text-sm uppercase italic">
                      ❌ {questions[currentLevel]?.hint}
                    </p>
                  </div>
                )}
              </div>

              {showReward && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 animate-in zoom-in duration-500 z-10 bg-white/95">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-black text-green-500 uppercase italic tracking-tighter mb-2">¡EXACTO!</h3>
                    <p className="text-slate-600 font-bold italic text-lg leading-tight">"{questions[currentLevel]?.compliment}"</p>
                  </div>
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white transform rotate-3 bg-black">
                    <img 
                      src="/memes/celebracion.png" 
                      alt="Celebración"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=Sube+tu+imagen+celebracion.png";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {gameState === 'finished' && (
            <div className="text-center space-y-6 animate-in fade-in zoom-in duration-1000 py-4 overflow-y-auto no-scrollbar">
              <Confetti />
              <div className="relative inline-block mb-2">
                <div className="bg-gradient-to-br from-rose-100 to-orange-100 p-8 rounded-full shadow-inner border-4 border-white">
                  <Gift className="w-16 h-16 text-rose-500 drop-shadow-lg animate-bounce" />
                </div>
                <PartyPopper className="absolute -top-2 -right-2 w-10 h-10 text-yellow-500" />
              </div>
              <h2 className="text-4xl font-black text-rose-600 tracking-tighter uppercase italic leading-[0.8] mb-4">¡FELICIDADES MI VIDA! ❤️</h2>
              <div className="bg-rose-50/80 p-6 rounded-[2.5rem] border-4 border-white italic text-base leading-snug text-slate-700 shadow-xl text-left relative overflow-hidden">
                <p className="font-bold relative z-10">
                  "¡Feliz cumple, mi vida! Espero que la pases muy bien hoy y siempre. Agradezco demasiado todas las experiencias vividas a tu lado, bebe, y me emociona mucho todo lo que nos falta por compartir. Gracias por ser parte de mi camino. ¡Besitosss 😊!"
                </p>
                <Sparkles className="absolute bottom-2 right-2 text-rose-300/30 w-20 h-20" />
              </div>
              <div className="bg-white rounded-[2rem] border-[6px] border-dashed border-rose-300 p-6 transform -rotate-2 shadow-xl">
                <p className="text-rose-400 text-[10px] font-black uppercase mb-1 tracking-widest text-center">Cupón de Cumpleaños:</p>
                <p className="text-slate-800 font-black text-xl uppercase tracking-tighter text-center">UN VIAJE A LA PLAYITA,<br/>PRÓXIMAMENTE 🌴🌊</p>
              </div>
              <button 
                onClick={handleStart}
                className="text-rose-300 hover:text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
              >
                ¿Revivir la aventura? Dele viaje
              </button>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); opacity: 0.4; }
          50% { transform: translateY(-100px) rotate(45deg); opacity: 0.8; }
        }
        @keyframes fall {
          to { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-float { animation: float infinite ease-in-out; }
        .animate-fall { animation: fall linear infinite; }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}} />
    </div>
  );
}