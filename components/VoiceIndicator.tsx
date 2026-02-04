
import React from 'react';
import { VoiceStatus } from '../types';
import { Mic, Radio } from 'lucide-react';

interface Props {
  voice: VoiceStatus;
}

const VoiceIndicator: React.FC<Props> = ({ voice }) => {
  return (
    <div className="flex items-center gap-2.5">
        {/* Proximity Indicator */}
        <div className="flex flex-col items-end gap-0.5">
            <div className="flex gap-1 items-end h-5 px-1">
                {[1, 2, 3].map((l) => (
                    <div 
                        key={l}
                        className={`w-1 rounded-t-sm transition-all duration-300 ${
                            voice.level >= l 
                                ? voice.isTalking ? 'bg-zinc-100 scale-y-110' : 'bg-zinc-500' 
                                : 'bg-zinc-800'
                        }`}
                        style={{ height: `${l * 33}%` }}
                    />
                ))}
            </div>
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest leading-none">
                {voice.level === 1 ? 'Whisper' : voice.level === 2 ? 'Normal' : 'Shout'}
            </span>
        </div>

        {/* Mic Status Orb */}
        <div className="relative">
            <div className={`w-10 h-10 rounded-full metallic-bg flex items-center justify-center border transition-all duration-300 ${
                voice.isTalking 
                    ? 'border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.15)]' 
                    : 'border-white/10'
            }`}>
                {voice.isRadio ? (
                    <Radio size={16} className={voice.isTalking ? 'text-white' : 'text-zinc-500'} />
                ) : (
                    <Mic size={16} className={voice.isTalking ? 'text-white' : 'text-zinc-500'} />
                )}
            </div>
            
            {/* Talking Ripple Effect */}
            {voice.isTalking && (
                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-50" />
            )}
        </div>
    </div>
  );
};

export default VoiceIndicator;
