import { Clock3 } from 'lucide-react';
import { Input, InputAddon, InputGroup } from './input';
import { DateInput, TimeField } from './datefield';
import { useState } from 'react';
import { Time } from '@internationalized/date';
import { TimeAdapter } from '../utils/time-adapter';
import { ReactTimepicker } from '../ReactTimepicker';

export function TimepickerField({ ariaLabel, disabled = false, format = 24 }: { ariaLabel: string, disabled?: boolean, format?: 12 | 24 }) {
    const [timepickerTime, setTimepickerTime] = useState<string>('12:00');
    const handleChange = (value: Time) => {
        setTimepickerTime(TimeAdapter.timeToString(value));
    }
    return (<InputGroup className="w-full">
        <InputAddon mode="icon">
            <ReactTimepicker value={timepickerTime} displayInput={false} timeChanged={setTimepickerTime} />
        </InputAddon>
        <TimeField
            hourCycle={format} 
            aria-label={ariaLabel}
            isDisabled={disabled}
            value={TimeAdapter.parseTimeString(timepickerTime)}
            onChange={(value) => {
                if (!value) return;
                handleChange(value);
                setTimepickerTime(TimeAdapter.timeToString(value));
            }}>
            <DateInput />
        </TimeField>
    </InputGroup>);
}