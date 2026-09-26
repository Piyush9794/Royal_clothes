import { Flame, Clock } from "lucide-react";

const DealsHeader = () => {
    return (
        <div className="mb-4  flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#ea4c89] sm:text-[11px] font-mono-tag">
                    <Flame className="h-3.5 w-3.5 shrink-0 text-[#ea4c89] sm:h-4 sm:w-4" />
                    <span>SPECIAL PROMOTIONS & DISCOUNTS</span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-[#0d0c22] sm:text-2xl font-serif-title">
                    Deals In Store
                </h2>

                <p className="text-xs text-gray-500 sm:text-sm">
                    Limited-time markdown prices on authentic Royal Collection Lucknow
                    styles.
                </p>
            </div>

            <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-500 shadow-sm sm:inline-flex font-mono-tag">
                <Clock className="h-3.5 w-3.5 text-[#ea4c89]" />
                Updated Daily
            </span>
        </div>
    );
};

export default DealsHeader;
