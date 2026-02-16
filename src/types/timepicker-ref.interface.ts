// import { Subject } from "rxjs";

export interface TimepickerRef {
  // timeSet: Subject<string>;
  // hourSelected: Subject<number>;
  // timeUpdated: Subject<string>;
  // timeChanged: Subject<string>;
  open: () => void;
  close: () => void;
}