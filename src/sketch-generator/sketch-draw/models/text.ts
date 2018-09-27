import { Base } from '@sketch-draw/models/base';
import {
  IBounding,
  IBase,
  IText,
  IAttributedString,
  IMSAttributedStringFontAttribute,
  IParagraphStyle,
  IEncodedAttributes,
} from '@sketch-draw/interfaces';
import { Style } from '@sketch-draw/models/style';
import { IStyle } from '@sketch-draw/interfaces/style.interface';
import { fixWhiteSpace, fontMapping, fontStyle } from '@sketch-draw/helpers/font';
import { StyleDeclaration } from '../../../dom-traverser/dom-visitor';
import { TextBehaviour } from '@sketch-draw/helpers/sketch-constants';

// TODO: multiline text attribute
export class Text extends Base {
  private _text = '';
  private _multiline = false;
  private _styles: StyleDeclaration;
  private _styleClass: Style;

  set text(text: string) { this._text = fixWhiteSpace(text, this._styles.whiteSpace); }

  constructor(bounding: IBounding, styles) {
    super();
    this.bounding = bounding;
    this.className = 'text';
    this._styles = styles;
    this._styleClass = new Style();
    // call setter
    this.style = this.generateStyle();
  }

  private generateAttributedString(): IAttributedString {
    return {
      _class: 'attributedString',
      string: `${this._text}`,
      attributes: [
        {
          _class: 'stringAttribute',
          location: 0,
          length: this._text.length,
          attributes: this.attributes(),
        },
      ],
    };
  }

  private attributes(): IEncodedAttributes {
    // NOT USED in the moment
    // const sp = this._styles.letterSpacing;
    // const spacing = (sp !== 'normal') ? parseFloat(sp) : undefined;
    return {
      MSAttributedStringFontAttribute: this.fontAttributes(),
      MSAttributedStringColorAttribute: this._styleClass.convertColor(this._styles.color),
      paragraphStyle: this.paragraphStyle(),
      kerning: 0,
    };
  }

  private paragraphStyle(): IParagraphStyle {
    const lh = this._styles.lineHeight;
    // Disable lineheight (only needed for multi line text – otherwise conflicts with padding)
    const lineHeight = (lh !== 'normal') ? parseInt(lh, 10) : parseInt(this._styles.fontSize, 10);
    return {
      _class: 'paragraphStyle',
      alignment: 0,
      maximumLineHeight: lineHeight,
      minimumLineHeight: lineHeight,
      paragraphSpacing: 0,
      allowsDefaultTighteningForTruncation: 0,
    };
  }

  private fontAttributes(): IMSAttributedStringFontAttribute {
    const fontFamily = this._styles.fontFamily.split(',')[0];
    const fontWeight = this._styles.fontWeight;
    const fontVariant = this._styles.fontStyle as fontStyle;

    return {
      _class: 'fontDescriptor',
      attributes: {
        name: fontMapping(fontFamily, fontWeight, fontVariant),
        size: parseInt(this._styles.fontSize, 10),
      },
    };
  }

  private generateStyle(): IStyle {
    return  {
      ...this._styleClass.generateObject(),
      textStyle: {
        _class: 'textStyle',
        encodedAttributes: this.attributes(),
        verticalAlignment: 0,
      },
    };
  }

  generateObject(): IText {
    const base: IBase = super.generateObject();
    const frame = super.addFrame('rect');

    if (frame.height > Math.round(parseInt(this._styles.lineHeight, 10))) {
      this._multiline = true;
    }

    return {
      ...base,
      nameIsFixed: true,
      attributedString: this.generateAttributedString(),
      frame,
      automaticallyDrawOnUnderlyingPath: false,
      dontSynchroniseWithSymbol: false,
      glyphBounds: `{{${frame.x}, ${frame.y}}, {${frame.width}, ${frame.height}}}`,
      lineSpacingBehaviour: 2,
      textBehaviour: this._multiline ? TextBehaviour.Fixed : TextBehaviour.Auto,
    } as IText;
  }
}
