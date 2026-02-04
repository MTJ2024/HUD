
import React from 'react';
import { LocationInfo } from '../types';
import { Navigation } from 'lucide-react';

interface Props {
  location: LocationInfo;
}

const StreetDisplay: React.FC<Props> = ({ location }) => {
  return (
    <div className="flex flex-col gap-1 items-start">
      <div className="flex items-center gap-2">
         <div className="metallic-bg px-2 py-1 rounded border-l-2 border-zinc-100 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xs tracking-tighter w-4 text-center">{location.direction}</span>
         </div>
         <div className="metallic-bg px-3 py-1.5 rounded-md flex flex-col min-w-[180px] shadow-2xl border-b border-white/5">
            <span className="text-white font-bold text-sm uppercase tracking-tight truncate leading-none">
                {location.street}
            </span>
            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest leading-none mt-1">
                {location.zone}
            </span>
         </div>
      </div>
    </div>
  );
};

export default StreetDisplay;
