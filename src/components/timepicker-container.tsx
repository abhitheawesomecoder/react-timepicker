import { useEffect } from 'react';
import { ReactTimepickerProps } from './../types';

export function TimepickerContainer({
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
    timeChanged
}: ReactTimepickerProps) {

    useEffect(() => {
        console.log("TimepickerContainer props: ", {
            disabled,
            value,
            format,
            min,
            max,
            disableClick,
        })
    }, []);
    return (
        <div>
            Timepicker Container
        </div>
    );
}