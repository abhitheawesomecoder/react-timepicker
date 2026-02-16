/* tslint:disable */
import { DateTime, DateTimeUnit } from 'luxon';
import { Time } from '@internationalized/date';

// Luxon -> Time
function luxonToTime(dt: DateTime): Time {
  return new Time(dt.hour, dt.minute, dt.second);
}

// Time -> Luxon
function timeToLuxon(time: Time): DateTime {
  return DateTime.fromObject({
    hour: time.hour,
    minute: time.minute,
    second: time.second,
  });
}

export function isSameOrAfter(time: DateTime, compareWith: DateTime, unit: DateTimeUnit): boolean {
    if (unit === "hour") {
        return time.hour >= compareWith.hour;
    }
    if (unit === "minute") {
        return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
    }

    return false;
}

export function isSameOrBefore(time: DateTime, compareWith: DateTime, unit: DateTimeUnit): boolean {
    if (unit === "hour") {
        return time.hour <= compareWith.hour;
    }
    if (unit === "minute") {
        return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
    }

    return false;
}

export function isBetween(time: DateTime, before: DateTime, after: DateTime, unit: DateTimeUnit = "minute"): boolean {
    if (unit === "hour") {
        return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
    }
    if (unit === "minute") {
        return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
    }

    return false;
}

export function isDigit(e: KeyboardEvent) {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].some(n => n === e.keyCode) ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40)) {

        return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}
