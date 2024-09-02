import { HeadOverlay, Server } from "./enums";
import { buildMenyooXML } from "./exporters";
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
  ): Promise<IRina> {
    return {
      firstHeadShape: appearanceCode.shapeFirstID,
      secondHeadShape: appearanceCode.shapeSecondID,
      firstSkinShape: appearanceCode.skinFirstID,
      secondSkinShape: appearanceCode.skinSecondID,
      headMix: appearanceCode.shapeMix,
      skinMix: appearanceCode.skinMix,
      hairModel: appearanceCode.hair,
      firstHairColor: appearanceCode.hairColors[0],
      secondHairColor: appearanceCode.hairColors[1],
      beardModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.FACIAL_HAIR
        )?.index || 0,
      beardColor:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.FACIAL_HAIR
        )?.firstColor || 0,
      beardOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.FACIAL_HAIR
        )?.opacity || 0,
      chestModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.CHEST_HAIR
        )?.index || 0,
      chestColor:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.CHEST_HAIR
        )?.firstColor || 0,
      chestOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.CHEST_HAIR
        )?.opacity || 0,
      blemishesModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.BLEMISHES
        )?.index || 0,
      blemishesOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.BLEMISHES
        )?.opacity || 0,
      ageingModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.AGEING
        )?.index || 0,
      ageingOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.AGEING
        )?.opacity || 0,
      complexionModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.COMPLEXION
        )?.index || 0,
      complexionOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.COMPLEXION
        )?.opacity || 0,
      sundamageModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.SUN_DAMAGE
        )?.index || 0,
      sundamageOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.SUN_DAMAGE
        )?.opacity || 0,
      frecklesModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.FRECKLES
        )?.index || 0,
      frecklesOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.FRECKLES
        )?.opacity || 0,
      eyesColor: appearanceCode.eyeColor,
      eyebrowsModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.EYEBROWS
        )?.index || 0,
      eyebrowsOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.EYEBROWS
        )?.opacity || 0,
      eyebrowsColor:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.EYEBROWS
        )?.firstColor || 0,
      makeupModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.MAKEUP
        )?.index || 0,
      makeupOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.MAKEUP
        )?.opacity || 0,
      makeupColor1:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.MAKEUP
        )?.firstColor || 0,
      makeupColor2:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.MAKEUP
        )?.secondColor || 0,
      blushModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.BLUSH
        )?.index || 0,
      blushOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.BLUSH
        )?.opacity || 0,
      blushColor:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.BLUSH
        )?.firstColor || 0,
      lipstickModel:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.LIPSTICK
        )?.index || 0,
      lipstickOpacity:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.LIPSTICK
        )?.opacity || 0,
      lipstickColor:
        appearanceCode.headOverlays.find(
          (overlay) => overlay.overlayID === HeadOverlay.LIPSTICK
        )?.firstColor || 0,
      noseWidth: appearanceCode.faceFeatures[0],
      noseHeight: appearanceCode.faceFeatures[1],
      noseLength: appearanceCode.faceFeatures[2],
      noseBridge: appearanceCode.faceFeatures[3],
      noseTip: appearanceCode.faceFeatures[4],
      noseShift: appearanceCode.faceFeatures[5],
      browHeight: appearanceCode.faceFeatures[6],
      browWidth: appearanceCode.faceFeatures[7],
      cheekboneHeight: appearanceCode.faceFeatures[8],
      cheekboneWidth: appearanceCode.faceFeatures[9],
      cheeksWidth: appearanceCode.faceFeatures[10],
      eyes: appearanceCode.faceFeatures[11],
      lips: appearanceCode.faceFeatures[12],
      jawWidth: appearanceCode.faceFeatures[13],
      jawHeight: appearanceCode.faceFeatures[14],
      chinLength: appearanceCode.faceFeatures[15],
      chinPosition: appearanceCode.faceFeatures[16],
      chinWidth: appearanceCode.faceFeatures[17],
      chinShape: appearanceCode.faceFeatures[18],
      neckWidth: appearanceCode.faceFeatures[19],
    } as IRina;
  }
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

  public static async convertSelf(
    appearanceCode: ICharacterAppearance
  ): Promise<string> {
    try {
      const code = buildMenyooXML(appearanceCode);
      return code;
    } catch (error) {
      throw error;
    }
  }
}
