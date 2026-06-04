import React from 'react';

const DocumentFooter = () => {
    return (
        <div className="mt-12 pt-6 border-t-2 border-emerald-600/30 flex justify-between items-end">
            <div className="space-y-1 text-xs text-slate-500 font-semibold">
                <div>Team Enviro Cleaning Services LLC</div>
                <div>Authorized Signature</div>
                <div className="mt-4 pt-4 border-t border-slate-300 w-48 text-center text-[10px] text-slate-400">
                    Sign Here
                </div>
            </div>
            
            <div className="flex flex-col items-center">
                <img 
                    src="/images/team-enviro-stamp.png" 
                    alt="Official Stamp" 
                    className="h-20 object-contain opacity-80 mix-blend-multiply"
                />
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Official Seal</div>
            </div>
        </div>
    );
};

export default DocumentFooter;
