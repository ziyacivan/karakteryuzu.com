import { HeadOverlay, Server } from "./enums";
import { ICharacterAppearance, IRina, IVice } from "./interfaces";
import { parseCharacterXML } from "./parsers";

export class Converter {
  public static async detectServer(appearanceCode: string): Promise<Server> {
    if (
      typeof appearanceCode === "string" &&
      appearanceCode.startsWith("<?xml")
    )
      return Server.MENYOO;

    try {
      appearanceCode = JSON.parse(appearanceCode);
    } catch (error) {
      return Server.UNKNOWN;
    }

    if (typeof appearanceCode === "object") {
      if ("beard" in appearanceCode && "headOverlaysColor" in appearanceCode) {
        return Server.VICE;
      }

      if (
        "beardModel" in appearanceCode &&
        "firstHeadShape" in appearanceCode
      ) {
        return Server.RINA;
      }
    }

    return Server.VINEWOOD;
  }

  public static async convertToBaseFormat(
    from: Server,
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    switch (from) {
      case Server.VICE:
        return await ViceConverter.convertToBaseFormat(appearanceCode);
      case Server.RINA:
        return await RinaConverter.convertToBaseFormat(appearanceCode);
      case Server.MENYOO:
        return await MenyooConverter.convertToBaseFormat(appearanceCode);
      // TODO: Add conversion for Vinewood:V in the future
      default:
        throw new Error("Sunucu formatı hatalı!");
    }
  }
}

export class ViceConverter {
  public static async convertToBaseFormat(
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    const code: IVice = JSON.parse(appearanceCode);

    const headOverlays = code.headOverlays.map((overlay, index) => {
      return {
        overlayID: index,
        index: overlay,
        opacity: code.headOverlaysOpacity[index],
        firstColor: code.headOverlaysColor[index],
        secondColor: 0,
      };
    });

    return {
      shapeFirstID: code.blendData[0],
      shapeSecondID: code.blendData[1],
      shapeThirdID: 0,
      skinFirstID: code.blendData[2],
      skinSecondID: code.blendData[3],
      skinThirdID: 0,
      shapeMix: code.blendData[4],
      skinMix: code.blendData[5],
      thirdMix: 0,
      isParent: false,
      eyeColor: code.eyeColor,
      hair: code.hair[0],
      hairColors: [code.hair[1], code.hair[2]],
      headOverlays: headOverlays,
      faceFeatures: code.faceFeatures,
    } as ICharacterAppearance;
  }

  public static async convertSelf(
    appearanceCode: ICharacterAppearance
  ): Promise<IVice> {
    return {
      hair: [
        appearanceCode.hair,
        appearanceCode.hairColors[0],
        appearanceCode.hairColors[1],
      ],
      beard: [0, 0],
      blendData: [
        appearanceCode.shapeFirstID,
        appearanceCode.shapeSecondID,
        appearanceCode.skinFirstID,
        appearanceCode.skinSecondID,
        appearanceCode.shapeMix,
        appearanceCode.skinMix,
      ],
      eyeColor: appearanceCode.eyeColor,
      faceFeatures: appearanceCode.faceFeatures,
      headOverlays: appearanceCode.headOverlays.map((overlay) => overlay.index),
      headOverlaysColor: appearanceCode.headOverlays.map(
        (overlay) => overlay.firstColor
      ),
      headOverlaysOpacity: appearanceCode.headOverlays.map(
        (overlay) => overlay.opacity
      ),
    } as IVice;
  }
}

export class RinaConverter {
  public static async convertToBaseFormat(
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    const code: IRina = JSON.parse(appearanceCode);
    return {
      shapeFirstID: code.firstHeadShape,
      shapeSecondID: code.secondHeadShape,
      shapeThirdID: 0,
      skinFirstID: code.firstSkinShape,
      skinSecondID: code.secondSkinShape,
      skinThirdID: 0,
      shapeMix: code.headMix,
      skinMix: code.skinMix,
      thirdMix: 0,
      isParent: false,
      eyeColor: code.eyesColor,
      hair: code.hairModel,
      hairColors: [code.firstHairColor, code.secondHairColor],
      headOverlays: [
        {
          overlayID: HeadOverlay.BLEMISHES,
          index: code.blemishesModel,
          opacity: code.blemishesOpacity,
          firstColor: 0,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.FACIAL_HAIR,
          index: code.beardModel,
          opacity: code.beardOpacity,
          firstColor: code.beardColor,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.EYEBROWS,
          index: code.eyebrowsModel,
          opacity: code.eyebrowsOpacity,
          firstColor: code.eyebrowsColor,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.AGEING,
          index: code.ageingModel,
          opacity: code.ageingOpacity,
          firstColor: 0,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.MAKEUP,
          index: code.makeupModel,
          opacity: code.makeupOpacity,
          firstColor: code.makeupColor1,
          secondColor: code.makeupColor2,
        },
        {
          overlayID: HeadOverlay.BLUSH,
          index: code.blushModel,
          opacity: code.blushOpacity,
          firstColor: code.blushColor,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.COMPLEXION,
          index: code.complexionModel,
          opacity: code.complexionOpacity,
          firstColor: 0,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.SUN_DAMAGE,
          index: code.sundamageModel,
          opacity: code.sundamageOpacity,
          firstColor: 0,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.LIPSTICK,
          index: code.lipstickModel,
          opacity: code.lipstickOpacity,
          firstColor: code.lipstickColor,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.FRECKLES,
          index: code.frecklesModel,
          opacity: code.frecklesOpacity,
          firstColor: 0,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.CHEST_HAIR,
          index: code.chestModel,
          opacity: code.chestOpacity,
          firstColor: code.chestColor,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.BODY_BLEMISHES,
          index: 0,
          opacity: 0,
          firstColor: 0,
          secondColor: 0,
        },
        {
          overlayID: HeadOverlay.ADD_BODY_BLEMISHES,
          index: 0,
          opacity: 0,
          firstColor: 0,
          secondColor: 0,
        },
      ],
      faceFeatures: [
        code.noseWidth,
        code.noseHeight,
        code.noseLength,
        code.noseBridge,
        code.noseTip,
        code.noseShift,
        code.browHeight,
        code.browWidth,
        code.cheekboneHeight,
        code.cheekboneWidth,
        code.cheeksWidth,
        code.eyes,
        code.lips,
        code.jawWidth,
        code.jawHeight,
        code.chinLength,
        code.chinPosition,
        code.chinWidth,
        code.chinShape,
        code.neckWidth,
      ],
    } as ICharacterAppearance;
  }

  public static async convertSelf(
    appearanceCode: ICharacterAppearance
  ): Promise<IRina> {}
}

export class MenyooConverter {
  public static async convertToBaseFormat(
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    const code = parseCharacterXML(appearanceCode);

    const pedProperties = code.OutfitPedData.PedProperties;
    const pedComps = pedProperties.PedComps;
    const pedProps = pedProperties.PedProps;
    const overlays = pedProperties.HeadFeatures.Overlays;
    const facialFeatures = pedProperties.HeadFeatures.FacialFeatures;

    const appearance: ICharacterAppearance = {
      shapeFirstID: pedProperties.HeadFeatures.ShapeAndSkinTone.ShapeFatherId,
      shapeSecondID: pedProperties.HeadFeatures.ShapeAndSkinTone.ShapeMotherId,
      shapeThirdID: pedProperties.HeadFeatures.ShapeAndSkinTone.ShapeOverrideId,
      skinFirstID: pedProperties.HeadFeatures.ShapeAndSkinTone.ToneFatherId,
      skinSecondID: pedProperties.HeadFeatures.ShapeAndSkinTone.ToneMotherId,
      skinThirdID: pedProperties.HeadFeatures.ShapeAndSkinTone.ToneOverrideId,
      shapeMix: pedProperties.HeadFeatures.ShapeAndSkinTone.ShapeVal,
      skinMix: pedProperties.HeadFeatures.ShapeAndSkinTone.ToneVal,
      thirdMix: pedProperties.HeadFeatures.ShapeAndSkinTone.OverrideVal,
      hairColors: [
        pedProperties.HeadFeatures.HairColour,
        pedProperties.HeadFeatures.HairColourStreaks,
      ],
      eyeColor: pedProperties.HeadFeatures.EyeColour,
      faceFeatures: [
        facialFeatures._0,
        facialFeatures._1,
        facialFeatures._2,
        facialFeatures._3,
        facialFeatures._4,
        facialFeatures._5,
        facialFeatures._6,
        facialFeatures._7,
        facialFeatures._8,
        facialFeatures._9,
        facialFeatures._10,
        facialFeatures._11,
        facialFeatures._12,
        facialFeatures._13,
        facialFeatures._14,
        facialFeatures._15,
        facialFeatures._16,
        facialFeatures._17,
        facialFeatures._18,
        facialFeatures._19,
      ],
      hair: 0,
      headOverlays: [
        {
          overlayID: HeadOverlay.BLEMISHES,
          index: overlays._0.index === 255 ? 0 : overlays._0.index,
          opacity: overlays._0.index === 255 ? 0 : overlays._0.opacity,
          firstColor: overlays._0.colour,
          secondColor: overlays._0.colourSecondary,
        },
        {
          overlayID: HeadOverlay.FACIAL_HAIR,
          index: overlays._1.index === 255 ? 0 : overlays._1.index,
          opacity: overlays._1.index === 255 ? 0 : overlays._1.opacity,
          firstColor: overlays._1.colour,
          secondColor: overlays._1.colourSecondary,
        },
        {
          overlayID: HeadOverlay.EYEBROWS,
          index: overlays._2.index === 255 ? 0 : overlays._2.index,
          opacity: overlays._2.index === 255 ? 0 : overlays._2.opacity,
          firstColor: overlays._2.colour,
          secondColor: overlays._2.colourSecondary,
        },
        {
          overlayID: HeadOverlay.AGEING,
          index: overlays._3.index === 255 ? 0 : overlays._3.index,
          opacity: overlays._3.index === 255 ? 0 : overlays._3.opacity,
          firstColor: overlays._3.colour,
          secondColor: overlays._3.colourSecondary,
        },
        {
          overlayID: HeadOverlay.MAKEUP,
          index: overlays._4.index === 255 ? 0 : overlays._4.index,
          opacity: overlays._4.index === 255 ? 0 : overlays._4.opacity,
          firstColor: overlays._4.colour,
          secondColor: overlays._4.colourSecondary,
        },
        {
          overlayID: HeadOverlay.BLUSH,
          index: overlays._5.index === 255 ? 0 : overlays._5.index,
          opacity: overlays._5.index === 255 ? 0 : overlays._5.opacity,
          firstColor: overlays._5.colour,
          secondColor: overlays._5.colourSecondary,
        },
        {
          overlayID: HeadOverlay.COMPLEXION,
          index: overlays._6.index === 255 ? 0 : overlays._6.index,
          opacity: overlays._6.index === 255 ? 0 : overlays._6.opacity,
          firstColor: overlays._6.colour,
          secondColor: overlays._6.colourSecondary,
        },
        {
          overlayID: HeadOverlay.SUN_DAMAGE,
          index: overlays._7.index === 255 ? 0 : overlays._7.index,
          opacity: overlays._7.index === 255 ? 0 : overlays._7.opacity,
          firstColor: overlays._7.colour,
          secondColor: overlays._7.colourSecondary,
        },
        {
          overlayID: HeadOverlay.LIPSTICK,
          index: overlays._8.index === 255 ? 0 : overlays._8.index,
          opacity: overlays._8.index === 255 ? 0 : overlays._8.opacity,
          firstColor: overlays._8.colour,
          secondColor: overlays._8.colourSecondary,
        },
        {
          overlayID: HeadOverlay.FRECKLES,
          index: overlays._9.index === 255 ? 0 : overlays._9.index,
          opacity: overlays._9.index === 255 ? 0 : overlays._9.opacity,
          firstColor: overlays._9.colour,
          secondColor: overlays._9.colourSecondary,
        },
        {
          overlayID: HeadOverlay.CHEST_HAIR,
          index: overlays._10.index === 255 ? 0 : overlays._10.index,
          opacity: overlays._10.index === 255 ? 0 : overlays._10.opacity,
          firstColor: overlays._10.colour,
          secondColor: overlays._10.colourSecondary,
        },
        {
          overlayID: HeadOverlay.BODY_BLEMISHES,
          index: overlays._11.index === 255 ? 0 : overlays._11.index,
          opacity: overlays._11.index === 255 ? 0 : overlays._11.opacity,
          firstColor: overlays._11.colour,
          secondColor: overlays._11.colourSecondary,
        },
        {
          overlayID: HeadOverlay.ADD_BODY_BLEMISHES,
          index: overlays._12.index === 255 ? 0 : overlays._12.index,
          opacity: overlays._12.index === 255 ? 0 : overlays._12.opacity,
          firstColor: overlays._12.colour,
          secondColor: overlays._12.colourSecondary,
        },
      ],
      isParent: false,
    };
    return appearance;
  }

  public static async convertSelf(appearanceCode: ICharacterAppearance) {}
}
