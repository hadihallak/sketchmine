import { ICurvePoint } from '../interfaces/ICurvePoint';
import { Base } from '../../sketchJSON/models/Base';
import { BooleanOperation, MaskMode } from '../../sketchJSON/helpers/sketchConstants';
import { IBase } from '../../sketchJSON/interfaces/Base';

export class ShapePath extends Base {

  private _points: ICurvePoint[] = [];
  private _closed: boolean = false;

  get points(): ICurvePoint[] { return this._points; }
  close() { this._closed = true; }

  constructor() {
    super();
    super.class = 'shapePath';
  }

  addPoint(point: ICurvePoint) {
    this._points.push(point);
  }

  generateObject(): any {
    const base: IBase = super.generateObject();

    return {
      ...base,
      frame: super.addFrame('rect'),
      // hasClickThrough: false,
      // clippingMaskMode: MaskMode.Outline,
      // hasClippingMask: false,
      // windingRule: 1,
      booleanOperation: BooleanOperation.None, // Union, Substract, Difference Layers
      edited: true,
      isClosed: this._closed,
      pointRadiusBehaviour: 1,
      points: this._points,
    }
  }
}
