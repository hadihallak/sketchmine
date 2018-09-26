import { IBase } from './base.interface';
import { IRulerData } from './page.interface';
import { IColor } from './style.interface';

export interface ISymbolMaster extends IBase {
  backgroundColor: IColor;
  hasBackgroundColor: boolean;
  horizontalRulerData: IRulerData;
  includeBackgroundColorInExport: boolean;
  includeInCloudUpload: boolean;
  isFlowHome: boolean;
  resizesContent: boolean;
  verticalRulerData: IRulerData;
  includeBackgroundColorInInstance: boolean;
  symbolID: string;
  changeIdentifier: number;
}
