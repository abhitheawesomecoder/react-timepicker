import {ReactMaterialTimepickerDialTheme} from './react-material-timepicker-dial-theme.interface';
import { ReactMaterialTimepickerFaceTheme } from './react-material-timepicker-face-theme.interface';
import { ReactMaterialTimepickerContainerTheme } from './react-material-timepicker-container-theme';

export interface ReactMaterialTimepickerTheme {
    container?: ReactMaterialTimepickerContainerTheme;
    dial?: ReactMaterialTimepickerDialTheme;
    clockFace?: ReactMaterialTimepickerFaceTheme;
}
