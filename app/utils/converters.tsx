import { HeadOverlay, Server } from "./enums";
import { ICharacterAppearance, IRina, IVice } from "./interfaces";

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

class ViceConverter {
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
}

class RinaConverter {
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
}

class MenyooConverter {
  public static async convertToBaseFormat(
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    // Convert Menyoo appearance code to base format
  }
}
