import { useRef } from "react";

/* ---------------- CLOCK DIAL ---------------- */

interface TimepickerClockProps {
  mode: "hour" | "minute";
  format?: number;
  hour: number;
  minute: number;
  onChange: (time: { hour: number; minute: number }) => void;
}

const OUTER_RADIUS_PCT = 42;
const INNER_RADIUS_PCT = 25;
/** Normalized distance threshold: above = outer ring (1-12), below = inner ring (12-24) */
const RING_THRESHOLD = 0.55;

export function TimepickerClock({ mode, format = 12, hour, minute, onChange }: TimepickerClockProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const isHour = mode === "hour";

  const is24 = format === 24 && isHour;
  const hour12 = hour % 12;
  const degree = isHour ? hour12 * 30 : minute * 6;
  const useInnerRing = is24 && hour > 12 || hour === 0;
  const handHeight = is24 ? (useInnerRing ? "55px" : "90px") : "90px";

  function getAngle(clientX: number, clientY: number) {
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return 0;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = clientX - cx;
    const dy = clientY - cy;

    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle += 90;
    if (angle < 0) angle += 360;

    return angle;
  }

  /** Returns normalized distance from center (0 = center, 1 = edge). */
  function getNormalizedDistance(clientX: number, clientY: number) {
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return 0;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const r = Math.min(rect.width, rect.height) / 2;

    const dx = clientX - cx;
    const dy = clientY - cy;
    const d = Math.sqrt(dx * dx + dy * dy);

    return Math.min(1, d / r);
  }

  function update(angle: number, normalizedDistance?: number) {
    if (isHour) {
      if (is24 && normalizedDistance !== undefined) {
        const useOuter = normalizedDistance > RING_THRESHOLD;
        if (useOuter) {
          const index = Math.round(angle / 30) % 12;
          const newHour = index === 0 ? 12 : index;
          console.log("Outer ring selected, time", { hour: newHour, minute });
          onChange({ hour: newHour, minute });
        } else {
          const index = Math.round(angle / 30) % 12;
          const newHour = index === 0 ? 0 : 12 + index;
          console.log("Inner ring selected, time", { hour: newHour, minute });
          onChange({ hour: newHour, minute });
        }
      } else {
        const newHour = Math.round(angle / 30) || 12;
        onChange({ hour: newHour, minute });
      }
    } else {
      const newMinute = Math.round(angle / 6) % 60;
      onChange({ hour, minute: newMinute });
    }
  }

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    if ("buttons" in e && e.buttons !== 1 && e.type === "mousemove") return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const angle = getAngle(clientX, clientY);
    if (is24) {
      const dist = getNormalizedDistance(clientX, clientY);
      update(angle, dist);
    } else {
      update(angle);
    }
  }

  return (
    <div
      ref={dialRef}
      onMouseDown={handleMove}
      onMouseMove={handleMove}
      onTouchStart={handleMove}
      onTouchMove={handleMove}
      className="relative w-64 h-64 rounded-full bg-[#f0f0f0] select-none flex items-center justify-center"
    >
      {is24 ? (
        <>
          {/* Outer ring: 12, 1, 2, ..., 11 (24h: 0–11) */}
          {[...Array(12)].map((_, index) => {
            const angle = index * 30;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = `calc(50% + ${OUTER_RADIUS_PCT * Math.cos(rad)}%)`;
            const y = `calc(50% + ${OUTER_RADIUS_PCT * Math.sin(rad)}%)`;
            const label = index === 0 ? 12 : index;
            return (
              <span
                key={`outer-${index}`}
                className="absolute text-sm font-semibold -translate-x-1/2 -translate-y-1/2 text-gray-600"
                style={{ left: x, top: y }}
              >
                {label.toString().padStart(2, "0")}
              </span>
            );
          })}
          {/* Inner ring: 24 at top, then 13 under 01, 14 under 02, ... 23 under 11 */}
          {[...Array(12)].map((_, index) => {
            const angle = index * 30;
            const rad = (angle - 90) * (Math.PI / 180);
            const innerX = `calc(50% + ${INNER_RADIUS_PCT * Math.cos(rad)}%)`;
            const innerY = `calc(50% + ${INNER_RADIUS_PCT * Math.sin(rad)}%)`;
            const label = index === 0 ? 0 : 12 + index;
            return (
              <span
                key={`inner-${index}`}
                className="absolute text-xs font-semibold -translate-x-1/2 -translate-y-1/2 text-gray-500"
                style={{ left: innerX, top: innerY }}
              >
                {label.toString().padStart(2, "0")}
              </span>
            );
          })}
        </>
      ) : (
        [...Array(12)].map((_, index) => {
          const num = isHour ? index : index * 5;
          const angle = index * 30;
          const rad = (angle - 90) * (Math.PI / 180);
          const x = `calc(50% + ${OUTER_RADIUS_PCT * Math.cos(rad)}%)`;
          const y = `calc(50% + ${OUTER_RADIUS_PCT * Math.sin(rad)}%)`;
          const time = num.toString().padStart(2, "0");
          return (
            <span
              key={index}
              className="absolute text-sm font-semibold -translate-x-1/2 -translate-y-1/2 text-gray-500"
              style={{ left: x, top: y }}
            >
              {time}
            </span>
          );
        })
      )}

      {/* Hand */}
      <div
        className="absolute w-0.5 bg-[#85c54f] origin-bottom rounded bottom-1/2 left-1/2 transition-transform duration-200 ease-out"
        style={{
          height: handHeight,
          transform: `translateX(-50%) rotate(${degree}deg)`
        }}
      />

      {/* Center Dot */}
      <div className="absolute w-2 h-2 bg-[#85c54f] rounded-full z-10" />
    </div>
  );
}
