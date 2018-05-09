import { UUID } from "../helpers/UUID";
import { IBase, IExportOptions, IStyle, IBounding, IFrame } from "../interfaces/Base";
import { IRulerData } from "../interfaces/Page";

export class Base {

  private static _objectID = UUID.generate();
  private _class = null;
  private _layers = [];
  private _style = null;
  private _bounding: IBounding;
  private _breakMaskChain = false;
  private _name = '';

  get objectID(): string { return Base._objectID; }
  set name(name: string) { this._name = name; }
  set class(name: string) { this._class = name; }  
  set breakMaskChain(br: boolean) { this._breakMaskChain = br; }
  set style(style: IStyle) { this._style = style; }
  set bounding(bounding: IBounding) { this._bounding = bounding }

  protected addLayer(layer) {
    this._layers.push(layer);
  }
  
  protected addFrame(name: string): IFrame {
    return {
      _class: name,
      constrainProportions: false,
      ...this._bounding
    };
  }

  protected addStyle(
    start: number = 0, 
    mitter: number = 10,
    end: number = 0): IStyle {
    return {
      _class: 'style',
      endDecorationType: end,
      miterLimit: mitter,
      startDecorationType: start
    }
  }


  protected addRuler(base: number = 0): IRulerData {
    return {
      _class: 'rulerData',
      base: base,
      guides: []
    }
  }

  private addExportOptions(): IExportOptions {
    return {
      _class: 'exportOptions',
      exportFormats: [],
      includedLayerIds: [],
      layerOptions: 0,
      shouldTrim: false
    }
  }

  generateObject(): IBase {
    if (!this._class) {
      throw new Error('Class not set!');
    }

    return {
      _class: this._class,
      do_objectID: Base._objectID,
      exportOptions: this.addExportOptions(),
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: this._name || this._class,
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: this._breakMaskChain,
      style: this._style ? this._style: undefined,
      layers: this._layers
    };
  }
}
