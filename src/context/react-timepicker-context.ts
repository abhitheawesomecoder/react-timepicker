import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClockFaceTime, TimePeriod, TimeUnit } from './../types';

// Define context state interface
interface TimepickerContextState {
  hour: ClockFaceTime;
  minute: ClockFaceTime;
}

// Define context actions interface
interface TimepickerContextActions {
  setHour: (hour: ClockFaceTime) => void;
  setMinute: (minute: ClockFaceTime) => void;
}

// Combine state and actions
export interface TimepickerContextValue extends TimepickerContextState, TimepickerContextActions {}

export const TimepickerContext = createContext<TimepickerContextValue | undefined>(undefined);

