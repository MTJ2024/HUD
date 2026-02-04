
import React from 'react';
import { PlayerStatus } from '../types';
import { Heart, Shield, Apple, Droplets, Zap } from 'lucide-react';

interface Props {
  status: PlayerStatus;
}

const RadialProgress: React.FC<{ 
  value: number; 
  icon: React.ReactNode; 
  color: string; 
  glow: string;
  size?: number;
}> = ({ value, icon, color, glow, size = 36 }) => {
  const radius = (size / 2) - 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center group">
      <div className="relative metallic-bg rounded-full p-0.5 border border-white/10 shadow-lg" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="2"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className={`${color} transition-all duration-1000 ease-out`}
            strokeWidth="2.1"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ filter: value > 0 ? `drop-shadow(0 0 3px ${glow})` : 'none' }}
          />
        </svg>
        
        {/* Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`${color} drop-shadow-[0_0_1px_rgba(0,0,0,0.5)] scale-[0.7]`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusCircles: React.FC<Props> = ({ status }) => {
  return (
    <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-xl backdrop-blur-md border border-white/5 shadow-2xl">
      <RadialProgress 
        value={status.health} 
        icon={<Heart size={14} fill="currentColor" />} 
        color="text-rose-500" 
        glow="rgba(244, 63, 94, 0.6)"
        size={36}
      />
      <RadialProgress 
        value={status.armor} 
        icon={<Shield size={14} fill="currentColor" />} 
        color="text-blue-500" 
        glow="rgba(59, 130, 246, 0.6)"
        size={36}
      />
      <div className="w-[1px] h-5 bg-white/10 mx-0.5" />
      <RadialProgress 
        value={status.hunger} 
        icon={<Apple size={14} />} 
        color="text-amber-500" 
        glow="rgba(245, 158, 11, 0.4)"
        size={32}
      />
      <RadialProgress 
        value={status.thirst} 
        icon={<Droplets size={14} />} 
        color="text-sky-400" 
        glow="rgba(56, 189, 248, 0.4)"
        size={32}
      />
      <RadialProgress 
        value={status.stamina} 
        icon={<Zap size={14} fill="currentColor" />} 
        color="text-yellow-400" 
        glow="rgba(250, 204, 21, 0.4)"
        size={32}
      />
    </div>
  );
};

export default StatusCircles;
