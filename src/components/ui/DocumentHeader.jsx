import React from 'react';

const DocumentHeader = ({ documentType, documentId, date }) => {
    return (
        <div className="border-b-2 border-emerald-600/30 pb-6 mb-6">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <img 
                        src="/images/team-enviro-logo.png" 
                        alt="Team Enviro Logo" 
                        className="h-16 object-contain"
                    />
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Team Enviro Cleaning Services</h2>
                        <div className="text-xs font-semibold text-slate-500 mt-1">
                            <div>P.O. Box: 12345, Dubai, UAE</div>
                            <div>TRN: 100349827400003</div>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-emerald-600 uppercase tracking-widest">{documentType}</div>
                    <div className="text-sm font-bold text-slate-700 mt-2">Ref: <span className="font-mono">{documentId}</span></div>
                    <div className="text-sm font-semibold text-slate-500 mt-1">Date: {date}</div>
                </div>
            </div>
            
            {/* Contact Bar */}
            <div className="flex items-center gap-6 mt-6 bg-slate-50 px-4 py-2 rounded-lg text-xs font-bold text-slate-600 border border-slate-200">
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">📞</span> +971 4 123 4567</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">📧</span> info@teamenviro.ae</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">🌐</span> www.teamenviro.ae</div>
            </div>
        </div>
    );
};

export default DocumentHeader;
