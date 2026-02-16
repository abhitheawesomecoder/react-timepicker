interface TimepickerDialControlProps {
    mode: "hour" | "minute";
    hour: number;
    minute: number;
    setMode: (mode: "hour" | "minute") => void;
}

export function TimepickerDialControl({ mode, hour, minute, setMode }: TimepickerDialControlProps) {

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    return (<div className="text-4xl font-semibold flex items-center gap-2">

        {/* Hour */}
        <button
            onClick={() => setMode("hour")}
            className={`px-2 rounded ${mode === "hour"
                ? "bg-[#85c54f] text-white"
                : "text-gray-800"
                }`}
        >
            {formattedHour}
        </button>

        <span>:</span>

        {/* Minute */}
        <button
            onClick={() => setMode("minute")}
            className={`px-2 rounded ${mode === "minute"
                ? "bg-[#85c54f] text-white"
                : "text-gray-800"
                }`}
        >
            {formattedMinute}
        </button>
    </div>);

}