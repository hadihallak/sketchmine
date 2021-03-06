import { ValidationError } from '../error/validation-error';
import { SketchStyle, SketchFrame, SketchObjectTypes, SketchColor } from '@sketchmine/sketch-file-format';

export type ValidationFunction = (homework: IValidationContext[], currentTask: number) => (ValidationError | boolean)[];

export interface IValidationRule {
  description?: string;
  env?: string[];
  ignoreArtboards?: string[];
  includePages?: string[];
  name: string;
  options?: { [key: string]: any };
  selector: SketchObjectTypes[];
  validation: ValidationFunction;
  warning?: boolean;
}

export interface IValidationContext {
  _class: SketchObjectTypes;
  do_objectID: string;
  frame?: SketchFrame;
  name: string;
  parents: IValidationContextParents;
  ruleOptions: { [key: string]: any };
  style?: SketchStyle;
  backgroundColor?: SketchColor;
  ruleNames: string[];
}

export interface IValidationContextParents {
  artboard: string;
  page: string;
  symbolMaster: string;
}

export interface IValidationContextChildren {
  class: string;
  do_objectID: string;
  name: string;
}

export enum ValidationRequirements {
  AttributedString = 'attributedString',
  DocumentReference = 'document.json',
  Frame = 'frame',
  LayerSize = 'layersize',
  Style = 'style',
  Children = 'children',
  BackgroundColor = 'backgroundColor',
}
