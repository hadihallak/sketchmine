import { CurvePoint } from "./CurvePoint";
import { ICurvePoint } from "../interfaces/ICurvePoint";
import { CurvePointMode } from "../../sketchJSON/helpers/sketchConstants";

export class LineTo extends CurvePoint {

  generate(): ICurvePoint {
    let hasCurveFrom = false;

    // check if next is a curve
    if(this.next.x1 && this.next.y1 &&
      !super.pointEqalsPoint(
      {x: this.next.x1, y: this.next.y1}, // Tangent control Point
      {x: this.cur.x, y: this.cur.y}  // Actual Point on curve
    )) {
      hasCurveFrom = true;
    }

    return {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: (hasCurveFrom)? `{${this.next.x1}, ${this.next.y1}}` : `{${this.cur.x}, ${this.cur.y}}`,
      curveMode: CurvePointMode.Disconnected,
      curveTo: `{${this.cur.x}, ${this.cur.x}}`,
      hasCurveFrom,
      hasCurveTo: false, // cannot have curve to (linear line)
      point: `{${this.cur.x}, ${this.cur.y}}`,
    };
  }
}