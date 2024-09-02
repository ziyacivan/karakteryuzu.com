import { XMLBuilder } from "fast-xml-parser";
import { ICharacterAppearance } from "./interfaces";
import { propProperties, variationProperties } from "./enums";

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: "@@",
  suppressBooleanAttributes: false,
  format: true,
});

export function buildMenyooXML(appearance: ICharacterAppearance) {
  const xml: any = {
    "?xml": {
      "@@version": "1.0",
      "@@encoding": "ISO-8859-1",
    },
    OutfitPedData: {
      ClearDecalOverlays: true,
      ModelHash: "0x705E61F2",
      HashName: "0x705E61F2",
      Type: 1,
      Dynamic: true,
      FrozenPos: false,
      InitialHandle: 237470,
      OpacityLevel: 255,
      IsVisible: true,
    },
  };

  const facialFeatures = {};
  for (let i = 0; i < appearance.faceFeatures.length; i++) {
    // @ts-ignore
    facialFeatures[`_${i}`] = appearance.faceFeatures[i] ?? 0;
  }

  const overlays = {};
  for (let i = 0; i < 13; i++) {
    // @ts-ignore
    overlays[`_${i}`] = {
      "@@index": appearance.headOverlays[i]?.index ?? 0,
      "@@opacity": appearance.headOverlays[i]?.opacity ?? 0,
      "@@colour": appearance.headOverlays[i]?.firstColor ?? 0,
      "@@colourSecondary": appearance.headOverlays[i]?.secondColor ?? 0,
    };
  }

  xml.OutfitPedData.PedProperties = {
    IsStill: false,
    CanRagdoll: true,
    HasShortHeight: false,
    HeadFeatures: {
      "@@WasInArray": true,
      HairColour: appearance.hairColors[0],
      HairHighlightColour: appearance.hairColors[1],
      EyeColour: appearance.eyeColor,
      ShapeAndSkinTone: {
        ShapeFatherId: appearance.shapeFirstID,
        ShapeMotherId: appearance.shapeSecondID,
        ShapeOverrideId: 0,
        ToneFatherId: appearance.skinFirstID,
        ToneMotherId: appearance.skinSecondID,
        ToneOverrideId: 0,
        ShapeVal: appearance.shapeMix,
        ToneVal: appearance.skinMix,
        OverrideVal: 0,
        IsP: false,
      },
      FacialFeatures: facialFeatures,
      Overlays: overlays,
    },
  };

  const components = {
    _0: "0,0",
    _2: `0,0`,
  };
  for (const [key, value] of Object.entries(variationProperties)) {
    // @ts-ignore
    components[`_${key}`] = "0,0";
  }
  xml.OutfitPedData.PedProperties.PedComps = components;

  const props = {
    _3: "-1,-1",
    _4: "-1,-1",
    _5: "-1,-1",
    _8: "-1,-1",
    _9: "-1,-1",
  };
  for (const [key, value] of Object.entries(propProperties)) {
    // @ts-ignore
    props[`_${key}`] = `0,0`;
  }
  xml.OutfitPedData.PedProperties.PedProps = props;

  const xmlString = builder.build(xml);
  return xmlString;
}
