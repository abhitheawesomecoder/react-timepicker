import { DateTime, LocaleOptions, NumberingSystem } from 'luxon';

import { TimeFormat } from '../types/time-format.enum';
import { TimePeriod } from '../types/time-period.enum';
import { isBetween, isSameOrAfter, isSameOrBefore } from './timepicker.utils';
import { TimeOptions } from '../types/time-options.interface';
import { Time } from '@internationalized/date';

// @dynamic
export class TimeAdapter {
    static DEFAULT_FORMAT = 12;
    static DEFAULT_LOCALE = 'en-US';
    static DEFAULT_NUMBERING_SYSTEM: NumberingSystem = 'latn';

    // format string "14:30:00" to Time object
    static parseTimeString(timeString: string) { // for React Aria
        const [hourStr, minuteStr] = timeString.split(':');
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        return new Time(hour, minute);
    }
    
    static timeToString(time: Time) { // for React Aria
        const hour = time.hour.toString().padStart(2, '0');
        const minute = time.minute.toString().padStart(2, '0');
        return `${hour}:${minute}:00`;
    }

    static parseTime(time: string, opts: TimeOptions): DateTime {
        const { numberingSystem, locale } = TimeAdapter.getLocaleOptionsByTime(time, opts);
        const isPeriodExist = time.split(' ').length === 2;
        const timeMask = isPeriodExist ? TimeFormat.TWELVE_SHORT : TimeFormat.TWENTY_FOUR_SHORT;

        return DateTime.fromFormat(time, timeMask, { numberingSystem, locale });
    }

    static formatTime(time: string, opts: TimeOptions): string {
        if (!time) {
            return 'Invalid Time';
        }
        const { format } = opts;
        const parsedTime = TimeAdapter.parseTime(time, opts).setLocale(TimeAdapter.DEFAULT_LOCALE);

        if (format !== 24) {
            return parsedTime.toLocaleString(
                { ...DateTime.TIME_SIMPLE, hour12: format !== 24 },
                { numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM }
            ).replace(/\u200E/g, '').replace(/\u202F/g, ' ');
        }

        const isoTime = parsedTime.toISOTime({ includeOffset: false, suppressMilliseconds: true, suppressSeconds: true });

        if (!isoTime) {
            return 'Invalid Time';
        }

        return isoTime.replace(/\u200E/g, '').replace(/\u202F/g, ' ');
    }

    static toLocaleTimeString(time: string, opts: TimeOptions = {}): string {
        const { format = TimeAdapter.DEFAULT_FORMAT, locale = TimeAdapter.DEFAULT_LOCALE } = opts;
        const hourCycle: 'h23' | 'h12' = format === 24 ? 'h23' : 'h12';
        const timeFormat = { ...DateTime.TIME_SIMPLE, hourCycle };
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        const localOpts = { locale: opts.locale, numberingSystem: opts.numberingSystem, ...timeFormat };
        return DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(localOpts).replace(/\u202F/g, ' ');
    }

    static isTimeAvailable(
        time: string,
        min?: DateTime,
        max?: DateTime,
        granularity?: 'hour' | 'minute',
        minutesGap?: number | null,
        format?: number
    ): boolean {
        if (!time) {
            return false;
        }

        const convertedTime = this.parseTime(time, { format });
        const minutes = convertedTime.minute;

        if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
            throw new Error(`Your minutes - ${minutes} doesn\'t match your minutesGap - ${minutesGap}`);
        }
        const isAfter = (min && !max)
            && isSameOrAfter(convertedTime, min, granularity || 'hour');
        const isBefore = (max && !min)
            && isSameOrBefore(convertedTime, max, granularity || 'hour');
        const between = (min && max)
            && isBetween(convertedTime, min, max, granularity);
        const isAvailable = !min && !max;

        return isAfter || isBefore || between || isAvailable;
    }

    /***
     *  Format hour according to time format (12 or 24)
     */
    static formatHour(currentHour: number, format: number, period: TimePeriod): number {
        if (format === 24) {
            return currentHour;
        }
        const hour = period === TimePeriod.AM ? currentHour : currentHour + 12;

        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        } else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    }

    static fromDateTimeToString(time: DateTime, format: number): string {
        const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;

        return time.reconfigure({
            numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
            locale: TimeAdapter.DEFAULT_LOCALE
        }).toFormat(timeFormat).replace(/\u202F/g, ' ');
    }

    private static getLocaleOptionsByTime(time: string, opts: TimeOptions): LocaleOptions {
        const localeConfig: LocaleOptions = { numberingSystem: opts.numberingSystem as NumberingSystem | undefined, locale: opts.locale };
        const defaultConfig: LocaleOptions = { numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM, locale: TimeAdapter.DEFAULT_LOCALE };

        return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
    }
}
