import { IBase } from '@sketch-draw/interfaces';

export interface IGroup extends IBase {
  originalObjectID?: string;
  userInfo?: UserInfo;
}

interface UserInfo {
  'com.matt-curtis.sketch.constraints': Commattcurtissketchconstraints;
}

interface Commattcurtissketchconstraints {
  constraints: Constraints;
}

interface Constraints {
  useBottomPinning: number;
  centerRelativeTo: number;
  centerHorizontally: number;
  useFixedWidth: number;
  useTopPinning: number;
  sizeRelativeTo: number;
  useLeftPinning: number;
  disabled: number;
  rightPinning: string;
  centerVertically: number;
  useRightPinning: number;
  fixedHeight: string;
  useFixedHeight: number;
  topPinning: string;
  bottomPinning: string;
  leftPinning: string;
  pinRelativeTo: number;
}
