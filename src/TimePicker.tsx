import React, { useState } from "react";

export interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
}

export function TimePicker({ value = "", onChange }: TimePickerProps) {
  const [time, setTime] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <input
      type="time"
      value={time}
      onChange={handleChange}
      style={{
        padding: "8px",
        fontSize: "16px",
      }}
    />
  );
};
