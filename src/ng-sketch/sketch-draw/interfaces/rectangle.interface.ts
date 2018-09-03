import { IBase, IFrame } from '@sketch-draw/interfaces';
import { ICurvePoint } from '@sketch-svg-parser/interfaces';

export interface IRectangle extends IBase {
  path: IPath;
  frame: IFrame;
  edited: boolean;
  booleanOperation: number;
  fixedRadius: number;
  hasConvertedToNewRoundCorners: boolean;
}

export interface IRectangleOptions {
  width: number;
  height: number;
  cornerRadius?: number | number[];
}

export interface IPoint {
  x: number; // 0 | 1
  y: number; // 0 | 1
}

export interface IPath {
  _class: string;
  isClosed: boolean;
  pointRadiusBehaviour: number;
  points: ICurvePoint[];
}