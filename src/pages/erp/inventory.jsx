import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { 
    FaWarehouse, FaExclamationTriangle, FaPlus, FaCheckCircle, 
    FaTimes, FaTimesCircle, FaTruckLoading, FaSearch, FaClipboardList 
} from 'react-icons/fa';

const InventoryPage = () => {
    const { 
        inventory, partsRequests, allocatePartsToJob, rejectPartsRequest, 
        userRole 
    } = useContext(AppContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Filter parts
    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate low stock items count
    const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
    const lowStockCount = lowStockItems.length;

    const isWarehouseAdmin = userRole === 'admin' || userRole === 'dispatch';

    return (
        <div className="space-y-6 text-slate-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                        <FaWarehouse className="text-blue-600" />
                        Warehouse Inventory & Parts Desk
                    </h1>
                    <p className="text-slate-500 text-xs mt-0.5">Track AC filters, chemicals, compressors and oversee field crew allocation dispatches.</p>
                </div>
            </div>

            {/* Low stock alerts banner */}
            {lowStockCount > 0 && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3 text-rose-800 text-xs">
                    <FaExclamationTriangle className="text-rose-500 shrink-0 text-base mt-0.5 animate-pulse" />
                    <div>
                        <div className="font-extrabold">Warning: Low Stock Alerts Detected ({lowStockCount} Items)</div>
                        <p className="text-rose-650 mt-1 font-semibold">
                            The following warehouse components have fallen below safe thresholds: {' '}
                            <strong className="text-rose-800">{lowStockItems.map(item => `${item.name} (${item.quantity} ${item.unit} left)`).join(', ')}</strong>. 
                            Please arrange procurement replenishments immediately.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Inventory Stock Directory */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-2 pb-2 border-b border-slate-100">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Warehouse Stock Ledger</h3>
                        <div className="relative text-xs">
                            <FaSearch className="absolute left-3 top-2.5 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search inventory..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 bg-white"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-450 font-extrabold uppercase text-[10px]">
                                    <th className="py-2.5 px-2">Part Name</th>
                                    <th className="py-2.5 px-2">Category</th>
                                    <th className="py-2.5 px-2 text-right">In Stock</th>
                                    <th className="py-2.5 px-2 text-right">Safety Threshold</th>
                                    <th className="py-2.5 px-2 text-center">Stock Level</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                {filteredInventory.map((item) => {
                                    const isLow = item.quantity <= item.minStock;
                                    return (
                                        <tr key={item.id} className={`hover:bg-slate-50 transition ${isLow ? 'bg-rose-50/20' : ''}`}>
                                            <td className="py-3 px-2 font-bold text-slate-800">{item.name}</td>
                                            <td className="py-3 px-2 text-slate-500">{item.category}</td>
                                            <td className="py-3 px-2 text-right font-black">{item.quantity} {item.unit}</td>
                                            <td className="py-3 px-2 text-right text-slate-400">{item.minStock} {item.unit}</td>
                                            <td className="py-3 px-2 text-center">
                                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold border ${
                                                    isLow 
                                                        ? 'bg-rose-50 text-rose-700 border-rose-100' 
                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                }`}>
                                                    {isLow ? 'Low Stock' : 'Good'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Technician Parts Dispatch Requests */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                    <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <FaTruckLoading className="text-blue-600 text-sm" />
                        Technician Parts Requests
                    </h3>

                    <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
                        {partsRequests.length === 0 ? (
                            <p className="text-center text-slate-400 italic text-xs py-10 font-semibold">No warehouse requests logged from field agents.</p>
                        ) : (
                            partsRequests.map((req) => (
                                <div key={req.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-extrabold text-slate-800">Job: {req.workOrderId}</div>
                                            <span className="text-[10px] text-slate-500 block font-semibold mt-0.5">{req.customerName}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold border uppercase ${
                                            req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                            'bg-amber-50 text-amber-700 border-amber-100 animate-pulse'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </div>

                                    {/* Items list */}
                                    <div className="bg-white border border-slate-150 rounded-lg p-2 space-y-1">
                                        {req.partsRequested.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-[11px] font-semibold text-slate-650">
                                                <span>{item.name}</span>
                                                <span className="text-slate-850 font-bold">{item.qty} pcs</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-[9px] text-slate-400 font-bold">Requested: {req.date}</div>

                                    {req.status === 'Pending' && isWarehouseAdmin && (
                                        <div className="flex gap-2 pt-1 border-t border-slate-200/50">
                                            <button 
                                                onClick={() => allocatePartsToJob(req.id)}
                                                className="flex-1 px-3 py-1.5 bg-success hover:bg-[#059669] text-white rounded-lg font-bold text-[10px] transition shadow-sm"
                                            >
                                                Approve & Deduct
                                            </button>
                                            <button 
                                                onClick={() => rejectPartsRequest(req.id)}
                                                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-bold text-[10px] transition"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
