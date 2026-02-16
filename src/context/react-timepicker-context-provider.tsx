import React, { useState } from 'react';
import { TimepickerContext, TimepickerContextValue } from './react-timepicker-context';
import { ClockFaceTime, TimePeriod, TimeUnit } from './../types';
import { ReactTimepickerProps } from './../types';

// Default values (similar to what you had in your BehaviorSubjects)
const DEFAULT_HOUR: ClockFaceTime = { time: 12, angle: 360 };
const DEFAULT_MINUTE: ClockFaceTime = { time: 0, angle: 360 };

export function ReactTimepickerContextProvider({
    disabled,
    value,
    format = 12,
    min,
    max,
    disableClick,
    cancelBtnTmpl,
    confirmBtnTmpl,
    editableHintTmpl,
    ESC = true,
    enableKeyboardInput = true,
    minutesGap = 1,
    defaultTime = "12:00 AM",
    preventOverlayClick = false,
    disableAnimation = false,
    hoursOnly = false,
    theme,
    timepickerClass,
    timeSet,
    opened,
    closed,
    hourSelected,
    timeChanged,
    displayInput,
    children,
}: ReactTimepickerProps & { children: React.ReactNode }) {

    // State management (replacing BehaviorSubjects)
    const [hour, setHour] = useState<ClockFaceTime>(DEFAULT_HOUR);
    const [minute, setMinute] = useState<ClockFaceTime>(DEFAULT_MINUTE);

    return (
        <TimepickerContext.Provider value={{ hour, setHour, minute, setMinute } as TimepickerContextValue}>
            {children}
        </TimepickerContext.Provider>
    );
}