
import React, { useState, useEffect } from 'react';
import { HudState } from './types';
import StatusCircles from './components/StatusCircles';
import VoiceIndicator from './components/VoiceIndicator';
import StreetDisplay from './components/StreetDisplay';
import { ShieldCheck, Users, Landmark, Wallet, Briefcase } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<HudState>({
    visible: true,
    serverName: "METALLIC LEGACY",
    status: {
      health: 100,
      armor: 50,
      hunger: 80,
      thirst: 75,
      stamina: 100,
    },
    info: {
      id: 1,
      name: "John Doe",
      job: "Unemployed",
      jobGrade: "Citizen",
      cash: 5000,
      bank: 25000,
      blackMoney: 120,
      onlinePlayers: 12,
    },
    voice: {
      level: 2,
      isTalking: false,
      isRadio: false,
    },
    location: {
      street: "Grove Street",
      zone: "Davis",
      direction: "NW"
    }
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type, data } = event.data;
      switch (type) {
        case 'UPDATE_HUD':
          setState(prev => ({ ...prev, ...data }));
          break;
        case 'UPDATE_STATUS':
          setState(prev => ({ ...prev, status: { ...prev.status, ...data } }));
          break;
        case 'UPDATE_VOICE':
          setState(prev => ({ ...prev, voice: { ...prev.voice, ...data } }));
          break;
        case 'UPDATE_LOCATION':
          setState(prev => ({ ...prev, location: { ...prev.location, ...data } }));
          break;
        case 'SET_VISIBLE':
          setState(prev => ({ ...prev, visible: data }));
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!state.visible) return null;

  return (
    <div className="relative w-screen h-screen p-6 pointer-events-none select-none overflow-hidden font-['Inter']">
      
      {/* TOP LEFT: Server Branding */}
      <div className="absolute top-6 left-8 flex items-center gap-4">
        <div className="w-12 h-12 metallic-bg rounded-xl flex items-center justify-center border-t border-white/20 shadow-2xl shine-effect">
          <ShieldCheck className="text-zinc-200 w-7 h-7" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-bold tracking-[0.15em] text-2xl drop-shadow-lg leading-none" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {state.serverName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-zinc-400 text-[10px] uppercase font-black tracking-widest">
              <Users size={12} className="text-zinc-500" /> {state.info.onlinePlayers}
            </div>
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            <div className="text-zinc-400 text-[10px] uppercase font-black tracking-widest">
              ID: {state.info.id}
            </div>
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Money & Job */}
      <div className="absolute top-6 right-8 flex flex-col gap-3 items-end">
        <div className="metallic-bg px-4 py-2 rounded-lg flex items-center gap-3 border-l-4 border-blue-500/50 min-w-[180px] shadow-lg">
          <Briefcase size={18} className="text-blue-400" />
          <div className="flex flex-col">
            <span className="text-[9px] text-zinc-500 uppercase font-black leading-none mb-0.5">Job</span>
            <span className="text-sm text-zinc-100 font-bold uppercase tracking-tight">{state.info.job}</span>
          </div>
        </div>

        <div className="metallic-bg p-4 rounded-xl flex flex-col gap-2 min-w-[220px] shadow-2xl border-t border-white/5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <Wallet size={16} className="text-emerald-400" />
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Cash</span>
            </div>
            <span className="text-lg font-bold text-white tabular-nums">${state.info.cash.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Landmark size={16} className="text-sky-400" />
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Bank</span>
            </div>
            <span className="text-md font-bold text-zinc-300 tabular-nums">${state.info.bank.toLocaleString()}</span>
          </div>
          {state.info.blackMoney > 0 && (
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-red-900/30">
              <div className="flex items-center gap-2">
                <Wallet size={16} className="text-red-500" />
                <span className="text-[10px] text-red-500/70 uppercase font-black tracking-widest">Dirty</span>
              </div>
              <span className="text-md font-bold text-red-400 tabular-nums">${state.info.blackMoney.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM LEFT: Street Display (EXAKT ÜBER MINIMAP) */}
      <div className="absolute bottom-[245px] left-8">
        <StreetDisplay location={state.location} />
      </div>

      {/* BOTTOM LEFT: Status Circles (UNTER MINIMAP) */}
      {/* Positioniert ganz unten links, wo sie unter der Minimap-Box erscheinen */}
      <div className="absolute bottom-6 left-8">
        <StatusCircles status={state.status} />
      </div>

      {/* BOTTOM RIGHT: Voice */}
      <div className="absolute bottom-6 right-8">
        <VoiceIndicator voice={state.voice} />
      </div>
    </div>
  );
};

export default App;
