import { ReactTimepickerProps } from './types';
import * as Dialog from "@radix-ui/react-dialog";
import { ClockIcon } from './icons/clock-icon';
import React, { useState, useEffect } from "react";
import { Input, InputAddon, InputGroup } from './components/input';
import { ReactTimepickerContextProvider } from "./context/react-timepicker-context-provider";
import { TimepickerDialControl } from './components/timepicker-dial-control';
import { TimepickerPeriod } from './components/timepicker-period';
import { TimepickerClock } from './components/timepicker-clock';
import { TimeAdapter } from './utils/time-adapter';

export function ReactTimepicker({
    disabled,
    value,
    format = 24,
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
    displayInput = true
}: ReactTimepickerProps) {

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"hour" | "minute">("hour");
    const [period, setPeriod] = useState<"AM" | "PM">("AM");
    const [time, setTime] = useState({
        hour: 10,
        minute: 30
    });

    useEffect(() => {
        if (value) {
            const parsedTime = TimeAdapter.parseTimeString(value);
            setTime({
                hour: parsedTime.hour,
                minute: parsedTime.minute
            });
        }
    }, [value]);

    const onTimeChange = (newTime: { hour: number, minute: number }) => {
        setTime(newTime);
        if (timeChanged) {
            const newTimeStr = format === 12 ? `${newTime.hour}:${newTime.minute} ${period}` : `${newTime.hour}:${newTime.minute}`;
            timeChanged(newTimeStr);
        }
    };

    const handleConfirm = () => {
        // Call the timeSet callback if provided
        if (timeSet) {
            timeSet(`${time.hour}:${time.minute} ${period}`);
        }
        setOpen(false);
    };

    // Handle custom button templates with injected event handlers
    const renderCancelButton = () => {
        if (cancelBtnTmpl) {
            // If a custom cancel button is provided, clone it and inject the onClick handler
            return React.isValidElement(cancelBtnTmpl)
                ? React.cloneElement(cancelBtnTmpl, { onClick: close } as any)
                : cancelBtnTmpl;
        }
        // Otherwise use the default button
        return <button className="text-primary" onClick={close}>CANCEL</button>;
    };

    const renderConfirmButton = () => {
        if (confirmBtnTmpl) {
            // If a custom confirm button is provided, clone it and inject the onClick handler
            return React.isValidElement(confirmBtnTmpl)
                ? React.cloneElement(confirmBtnTmpl, { onClick: handleConfirm } as any)
                : confirmBtnTmpl;
        }
        // Otherwise use the default button
        return <button className="text-primary" onClick={handleConfirm}>OK</button>;
    };

    return (
        <ReactTimepickerContextProvider
            disabled={disabled}
            value={value}
            format={format}
            min={min}
            max={max}
            disableClick={disableClick}
            cancelBtnTmpl={cancelBtnTmpl}
            confirmBtnTmpl={confirmBtnTmpl}
            editableHintTmpl={editableHintTmpl}
            ESC={ESC}
            enableKeyboardInput={enableKeyboardInput}
            minutesGap={minutesGap}
            defaultTime={defaultTime}
            preventOverlayClick={preventOverlayClick}
            disableAnimation={disableAnimation}
            hoursOnly={hoursOnly}
            theme={theme}
            timepickerClass={timepickerClass}
            timeSet={timeSet}
            opened={opened}
            closed={closed}
            hourSelected={hourSelected}
            timeChanged={timeChanged}
            displayInput={displayInput}
        >
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>

                    {displayInput ? (<InputGroup className={`w-full ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
                        <Input
                            value={`${time.hour.toString().padStart(2, "0")}:${time.minute.toString().padStart(2, "0")} ${period}`}
                            disabled={disableClick}
                        />
                        <InputAddon mode="icon">
                            <ClockIcon />
                        </InputAddon>
                    </InputGroup>) : (<div className={`${disabled ? 'pointer-events-none opacity-50' : ''}`}>
                        <ClockIcon />
                    </div>)}


                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

                    <Dialog.Content className="fixed top-1/2 left-1/2 w-96 p-6 bg-white rounded-2xl shadow-xl -translate-x-1/2 -translate-y-1/2">

                        {/* -------- HEADER TIME DISPLAY -------- */}

                        <div className="flex justify-between items-center mb-6">

                            {/* -------- TIME -------- */}

                            <TimepickerDialControl mode={mode} hour={time.hour} minute={time.minute} setMode={setMode} />

                            {/* -------- AM PM SEGMENT -------- */}

                            <TimepickerPeriod period={period} setPeriod={setPeriod} />

                        </div>

                        {/* -------- CLOCK -------- */}

                        <div className="flex justify-center">
                            <TimepickerClock
                                mode={mode}
                                format={format}
                                hour={time.hour}
                                minute={time.minute}
                                onChange={onTimeChange}
                            />
                        </div>


                        {/* -------- ACTION BUTTONS -------- */}
                        <Dialog.Close asChild>
                            <div className="timepicker-actions flex justify-end gap-4 mt-6">
                                {renderCancelButton()}
                                {renderConfirmButton()}
                            </div>
                        </Dialog.Close>

                    </Dialog.Content>

                </Dialog.Portal>
            </Dialog.Root>

        </ReactTimepickerContextProvider>
    );
}