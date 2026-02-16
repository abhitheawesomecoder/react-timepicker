import { DateTime } from 'luxon';

export interface ReactTimepickerProps {
    ngxTimepicker?: React.ReactNode; // The timepicker that this input is associated with.
    disabled?: boolean; // disable all (input and icon)
    value?: string; // Set a default value and time for a timepicker. The format of the time is in 12 hours notation 11:00 PM or in 24 hours notation 23:00. A Date string won't work.
    format?: number; // 12 or 24 hours format. Default is 12.
    min?: string | DateTime; // Minimum time that can be selected. The format of the time is in 12 hours notation 11:00 PM or in 24 hours notation 23:00. A Date string won't work.
    max?: string | DateTime; // Maximum time that can be selected. The format of the time is in 12 hours notation 11:00 PM or in 24 hours notation 23:00. A Date string won't work.
    disableClick?: boolean; // disable input 
    cancelBtnTmpl?: React.ReactNode; //Set if you want to change cancel button to your custom one.
    confirmBtnTmpl?: React.ReactNode; //Set if you want to change confirm button to your custom one.
    editableHintTmpl?: React.ReactNode; //Set if you want to change the default editable hint to your custom one.
    ESC?: boolean; // 	Disable or enable closing timepicker by ESC.
    enableKeyboardInput?: boolean; // Enable or disable keyboard input for time selection.
    minutesGap?: number; // Set the gap between minutes options in the timepicker. Default is 1, which means all minutes will be available for selection. Setting it to 5 will show only 00, 05, 10, 15, etc. as options.
    defaultTime?: string; // Set default time for a timepicker. 12:00 AM by default
    preventOverlayClick?: boolean; // Prevent closing timepicker when clicking outside of it.
    disableAnimation?: boolean; // Disable opening and closing animation of the timepicker.
    hoursOnly?: boolean; // Show only hours in the timepicker, hiding minutes selection.
    theme?: React.ReactNode; // Custom css properties which will override the defaults
    timepickerClass?: string; // To provide a custom css class for the timepicker
    timeSet?: (time: string) => void; // Callback function that will be called when the time is set/confirmed/ok. The time will be passed as a string in the format of 12 hours notation 11:00 PM or in 24 hours notation 23:00.
    opened?: () => void; // Callback function that will be called when the timepicker is opened.
    closed?: () => void; // Callback function that will be called when the timepicker is closed.
    hourSelected?: (hour: number) => void; // Callback function that will be called when an hour is selected. The selected hour will be passed as a number.
    timeChanged?: (time: string) => void; // Emits once time was changed in clock dial. The time will be passed as a string in the format of 12 hours notation 11:00 PM or in 24 hours notation 23:00.
    displayInput?: boolean; // Option to show or hide the input field associated with the timepicker. By default, the input field is displayed, allowing users to see and edit the selected time. Setting this prop to false will hide the input field, leaving only the timepicker interface visible.
}