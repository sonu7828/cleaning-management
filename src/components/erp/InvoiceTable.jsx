import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const InvoiceTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Use page instead of rows for pagination
        prepareRow,
        state: { pageIndex, pageSize },
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setPageSize,
        pageCount,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="bg-[#111827]/85 backdrop-blur-md rounded-2xl border border-[#1E293B]/30 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full divide-y divide-[#1E293B]/30">
                    <thead className="bg-[#0c102b]/60">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider select-none cursor-pointer hover:bg-[#151c3f]/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-1.5">
                                            <span>{column.render('Header')}</span>
                                            <span className="text-slate-400">
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <FaSortDown className="text-blue-400" />
                                                    ) : (
                                                        <FaSortUp className="text-blue-400" />
                                                    )
                                                ) : (
                                                    <FaSort className="text-slate-500 text-[10px]" />
                                                )}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-[#1E293B]/20 bg-[#0B1120]/20">
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className="hover:bg-[#151c3f]/40 transition-colors duration-150"
                                >
                                    {row.cells.map(cell => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-6 py-4 text-sm font-medium text-slate-300 whitespace-nowrap"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {data.length > 0 && (
                <div className="px-6 py-4 border-t border-[#1E293B]/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0c102b]/40">
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <span>
                            Page <strong className="font-semibold text-slate-200">{pageIndex + 1}</strong> of{' '}
                            <strong className="font-semibold text-slate-200">{pageCount || 1}</strong>
                        </span>
                        <span className="text-slate-600">|</span>
                        <span>Showing {page.length} of {data.length} invoices</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                                className="p-2 rounded-lg border border-[#1E293B]/40 bg-[#0c102b] hover:bg-[#151c3f] text-slate-300 disabled:opacity-40 disabled:hover:bg-[#0c102b] transition text-xs font-semibold"
                            >
                                {'<<'}
                            </button>
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="px-3 py-1.5 rounded-lg border border-[#1E293B]/40 bg-[#0c102b] hover:bg-[#151c3f] text-slate-300 disabled:opacity-40 disabled:hover:bg-[#0c102b] transition text-xs font-semibold"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="px-3 py-1.5 rounded-lg border border-[#1E293B]/40 bg-[#0c102b] hover:bg-[#151c3f] text-slate-300 disabled:opacity-40 disabled:hover:bg-[#0c102b] transition text-xs font-semibold"
                            >
                                Next
                            </button>
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className="p-2 rounded-lg border border-[#1E293B]/40 bg-[#0c102b] hover:bg-[#151c3f] text-slate-300 disabled:opacity-40 disabled:hover:bg-[#0c102b] transition text-xs font-semibold"
                            >
                                {'>>'}
                            </button>
                        </div>

                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value));
                            }}
                            className="bg-[#0c102b] border border-[#1E293B]/40 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            {[5, 10, 20, 30, 40, 50].map(size => (
                                <option key={size} value={size} className="bg-[#0c102b] text-slate-200">
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceTable;
