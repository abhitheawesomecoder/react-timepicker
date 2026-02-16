
import { DateTime } from 'luxon';
import { ReactNode } from "react";
import { TimepickerRef } from './timepicker-ref.interface';
import { ReactMaterialTimepickerTheme } from './react-material-timepicker-theme.interface';


export interface TimepickerConfig {
    cancelBtnTmpl: ReactNode;
    editableHintTmpl: ReactNode;
    confirmBtnTmpl: ReactNode;
    inputElement: any;
    enableKeyboardInput: boolean;
    preventOverlayClick: boolean;
    disableAnimation: boolean;
    disabled: boolean;
    appendToInput: boolean;
    hoursOnly: boolean;
    format: number;
    minutesGap: number;
    minTime: DateTime;
    maxTime: DateTime;
    defaultTime: string;
    time: string;
    timepickerClass: string;
    theme: ReactMaterialTimepickerTheme;
    timepickerBaseRef: TimepickerRef;
}
