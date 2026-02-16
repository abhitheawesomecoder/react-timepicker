interface TimepickerDialControlProps {
    period: "AM" | "PM";
    setPeriod: (period: "AM" | "PM") => void;
}
export function TimepickerPeriod({ period, setPeriod }: TimepickerDialControlProps) {
    return (<div className="flex flex-col border rounded overflow-hidden">
        <button
            onClick={() => setPeriod("AM")}
            className={`px-4 py-1 ${period === "AM"
                ? "bg-[#85c54f] text-white"
                : "bg-gray-100"
                }`}
        >
            AM
        </button>

        <button
            onClick={() => setPeriod("PM")}
            className={`px-4 py-1 ${period === "PM"
                ? "bg-[#85c54f] text-white"
                : "bg-gray-100"
                }`}
        >
            PM
        </button>
    </div>);
}