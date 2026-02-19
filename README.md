# React Time Picker

A lightweight, accessible React time picker component for JavaScript and TypeScript. Pick times in 12- or 24-hour format with a clock-style dial, built on Radix UI and React Aria for accessibility and keyboard support.

---

## Features

- **12- and 24-hour formats** — Support for both time formats out of the box
- **Accessible** — Built with [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) and [React Aria Components](https://react-aria.adobe.com/react-aria-components/) for focus management, keyboard navigation, and screen readers
- **Lightweight** — Minimal dependencies; no heavy UI framework required
- **TypeScript** — Full type definitions included
- **Customizable** — Custom buttons, themes, min/max time, and minute step (e.g. 5-minute intervals)
- **Controlled or uncontrolled** — Use `value` / `timeSet` for controlled usage or leave unset for local state

---

## Requirements

- **React** ≥ 17
- **React DOM** ≥ 17

---

## Installation

Install the package from npm:

```bash
npm install react-timepicker
```

Or with Yarn:

```bash
yarn add react-timepicker
```

Or with pnpm:

```bash
pnpm add react-timepicker
```

---

## Quick Start

1. **Import the styles** (required for the dialog and layout to display correctly):

```tsx
import 'react-timepicker/styles.css';
```

2. **Import and render the component:**

```tsx
import { ReactTimepicker } from 'react-timepicker';

function App() {
  return (
    <ReactTimepicker
      value="14:30"
      format={24}
      timeSet={(time) => console.log('Selected:', time)}
    />
  );
}
```

---

## Usage Examples

### Basic (24-hour format)

```tsx
import 'react-timepicker/styles.css';
import { ReactTimepicker } from 'react-timepicker';

<ReactTimepicker format={24} />
```

### 12-hour format with AM/PM

```tsx
<ReactTimepicker format={12} defaultTime="09:00 AM" />
```

### Controlled component

```tsx
const [time, setTime] = useState('10:30');

<ReactTimepicker
  value={time}
  format={24}
  timeSet={setTime}
  timeChanged={setTime}
/>
```

### 5-minute step and min/max time

```tsx
<ReactTimepicker
  format={24}
  minutesGap={5}
  min="09:00"
  max="18:00"
  timeSet={(t) => console.log(t)}
/>
```

### Callbacks: open, close, and time change

```tsx
<ReactTimepicker
  opened={() => console.log('Opened')}
  closed={() => console.log('Closed')}
  timeSet={(time) => console.log('Confirmed:', time)}
  timeChanged={(time) => console.log('Changed:', time)}
/>
```

### Custom cancel and confirm buttons

```tsx
<ReactTimepicker
  cancelBtnTmpl={<button>Cancel</button>}
  confirmBtnTmpl={<button>Done</button>}
  timeSet={(time) => console.log(time)}
/>
```

### TimepickerField (with React Aria TimeField)

For an alternative UX that combines the clock picker with a keyboard-friendly time field:

```tsx
import 'react-timepicker/styles.css';
import { TimepickerField } from 'react-timepicker';

<TimepickerField ariaLabel="Select time" format={24} disabled={false} />
```

---

## API Reference

### ReactTimepicker props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Current time (e.g. `"14:30"` or `"02:30 PM"`). Use with `timeSet` / `timeChanged` for controlled mode. |
| `format` | `12 \| 24` | `24` | 12- or 24-hour format. |
| `defaultTime` | `string` | `"12:00 AM"` | Default time when uncontrolled. |
| `disabled` | `boolean` | `false` | Disable the timepicker (input and trigger). |
| `disableClick` | `boolean` | `false` | Disable only the input click (e.g. keep icon clickable). |
| `displayInput` | `boolean` | `true` | Show or hide the time input; `false` shows only the trigger/icon. |
| `min` | `string \| DateTime` | — | Minimum selectable time. |
| `max` | `string \| DateTime` | — | Maximum selectable time. |
| `minutesGap` | `number` | `1` | Minute step (e.g. `5` for 00, 05, 10…). |
| `hoursOnly` | `boolean` | `false` | Show only hours, hide minutes. |
| `ESC` | `boolean` | `true` | Allow closing with Escape key. |
| `preventOverlayClick` | `boolean` | `false` | Prevent closing when clicking the overlay. |
| `enableKeyboardInput` | `boolean` | `true` | Enable keyboard input for time. |
| `disableAnimation` | `boolean` | `false` | Disable open/close animation. |
| `timeSet` | `(time: string) => void` | — | Called when the user confirms the time (e.g. OK). |
| `timeChanged` | `(time: string) => void` | — | Called when the time changes on the clock dial. |
| `opened` | `() => void` | — | Called when the dialog opens. |
| `closed` | `() => void` | — | Called when the dialog closes. |
| `hourSelected` | `(hour: number) => void` | — | Called when an hour is selected. |
| `cancelBtnTmpl` | `ReactNode` | — | Custom cancel button. |
| `confirmBtnTmpl` | `ReactNode` | — | Custom confirm button. |
| `editableHintTmpl` | `ReactNode` | — | Custom hint for editable input. |
| `theme` | `ReactNode` | — | Custom theme/overrides. |
| `timepickerClass` | `string` | — | Extra CSS class for the timepicker container. |

### TimepickerField props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | — | Accessible label for the time field (required). |
| `format` | `12 \| 24` | `24` | 12- or 24-hour format. |
| `disabled` | `boolean` | `false` | Disable the field. |

---

## Styling

The component ships with a self-contained stylesheet. Always import it once in your app:

```tsx
import 'react-timepicker/styles.css';
```

You can override styles with your own CSS or pass `timepickerClass` for a wrapper class. The dialog uses Radix UI primitives, so you can also target `[data-radix-dialog-overlay]` and `[data-radix-dialog-content]` if needed.

---

## License

MIT © Abhishek Kumar
