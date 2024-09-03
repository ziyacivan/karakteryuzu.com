import { HeadOverlay, Server } from "./enums";
import { buildMenyooXML } from "./exporters";
import { ICharacterAppearance, ILSCBase, IRina, IVice } from "./interfaces";
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

      if ("structure" in appearanceCode) {
        return Server.LSC_BASE;
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
      case Server.LSC_BASE:
        return await LSCBaseConverter.convertToBaseFormat(appearanceCode);
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
    const getOverlayValue = (overlayID: HeadOverlay, property: 'index' | 'firstColor' | 'opacity') => {
      return appearanceCode.headOverlays.find(overlay => overlay.overlayID === overlayID)?.[property] || 0;
    };

    const faceFeatureNames = [
      'noseWidth', 'noseHeight', 'noseLength', 'noseBridge', 'noseTip',
      'noseShift', 'browHeight', 'browWidth', 'cheekboneHeight', 'cheekboneWidth',
      'cheeksWidth', 'eyes', 'lips', 'jawWidth', 'jawHeight',
      'chinLength', 'chinPosition', 'chinWidth', 'chinShape', 'neckWidth'
    ];

    const faceFeatures = Object.fromEntries(
      faceFeatureNames.map((name, index) => [name, appearanceCode.faceFeatures[index]])
    );

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
      beardModel: getOverlayValue(HeadOverlay.FACIAL_HAIR, 'index'),
      beardColor: getOverlayValue(HeadOverlay.FACIAL_HAIR, 'firstColor'),
      beardOpacity: getOverlayValue(HeadOverlay.FACIAL_HAIR, 'opacity'),
      chestModel: getOverlayValue(HeadOverlay.CHEST_HAIR, 'index'),
      chestColor: getOverlayValue(HeadOverlay.CHEST_HAIR, 'firstColor'),
      chestOpacity: getOverlayValue(HeadOverlay.CHEST_HAIR, 'opacity'),
      blemishesModel: getOverlayValue(HeadOverlay.BLEMISHES, 'index'),
      blemishesOpacity: getOverlayValue(HeadOverlay.BLEMISHES, 'opacity'),
      ageingModel: getOverlayValue(HeadOverlay.AGEING, 'index'),
      ageingOpacity: getOverlayValue(HeadOverlay.AGEING, 'opacity'),
      complexionModel: getOverlayValue(HeadOverlay.COMPLEXION, 'index'),
      complexionOpacity: getOverlayValue(HeadOverlay.COMPLEXION, 'opacity'),
      sundamageModel: getOverlayValue(HeadOverlay.SUN_DAMAGE, 'index'),
      sundamageOpacity: getOverlayValue(HeadOverlay.SUN_DAMAGE, 'opacity'),
      frecklesModel: getOverlayValue(HeadOverlay.FRECKLES, 'index'),
      frecklesOpacity: getOverlayValue(HeadOverlay.FRECKLES, 'opacity'),
      eyesColor: appearanceCode.eyeColor,
      eyebrowsModel: getOverlayValue(HeadOverlay.EYEBROWS, 'index'),
      eyebrowsOpacity: getOverlayValue(HeadOverlay.EYEBROWS, 'opacity'),
      eyebrowsColor: getOverlayValue(HeadOverlay.EYEBROWS, 'firstColor'),
      makeupModel: getOverlayValue(HeadOverlay.MAKEUP, 'index'),
      makeupOpacity: getOverlayValue(HeadOverlay.MAKEUP, 'opacity'),
      makeupColor1: getOverlayValue(HeadOverlay.MAKEUP, 'firstColor'),
      makeupColor2: appearanceCode.headOverlays.find(overlay => overlay.overlayID === HeadOverlay.MAKEUP)?.secondColor || 0,
      blushModel: getOverlayValue(HeadOverlay.BLUSH, 'index'),
      blushOpacity: getOverlayValue(HeadOverlay.BLUSH, 'opacity'),
      blushColor: getOverlayValue(HeadOverlay.BLUSH, 'firstColor'),
      lipstickModel: getOverlayValue(HeadOverlay.LIPSTICK, 'index'),
      lipstickOpacity: getOverlayValue(HeadOverlay.LIPSTICK, 'opacity'),
      lipstickColor: getOverlayValue(HeadOverlay.LIPSTICK, 'firstColor'),
      ...faceFeatures,
    } as IRina;
  }
}

export class MenyooConverter {
  public static async convertToBaseFormat(
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    const xmlOutput = parseCharacterXML(appearanceCode);

    const pedProperties = xmlOutput.OutfitPedData.PedProperties;
    const pedComps = pedProperties.PedComps;
    const overlays = pedProperties.HeadFeatures.Overlays;
    const facialFeatures = pedProperties.HeadFeatures.FacialFeatures;

    let headOverlays: any[] = [];
    let overlayIndex = 0;
    Object.keys(overlays).forEach((key) => {
      // @ts-ignore
      const overlay = overlays[key];
      headOverlays.push({
        overlayID: overlayIndex,
        index: overlay.index === 255 ? 0 : overlay.index,
        opacity: overlay.opacity === 255 ? 0 : overlay.opacity,
        firstColor: overlay.colour,
        secondColor: overlay.colourSecondary,
      });
      overlayIndex++;
    });

    const appearance = {
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
      hair: Number(pedComps._2.toString().split(",")[0]),
      // @ts-ignore
      headOverlays: headOverlays,
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

export class LSCBaseConverter {
  public static async convertToBaseFormat(appearanceCode: string): Promise<ICharacterAppearance> {
    const code: ILSCBase = JSON.parse(appearanceCode);

    const overlays = [
      ...code.opacityOverlays,
      ...code.colorOverlays,
    ];

    const headOverlays = overlays.map((overlay) => {
      return {
        overlayID: overlay.id,
        index: overlay.value,
        opacity: overlay.opacity,
        // @ts-ignore
        firstColor: overlay?.color1 || 0,
        // @ts-ignore
        secondColor: overlay?.color2 || 0,
      };
    });

    headOverlays.push({
      overlayID: HeadOverlay.FACIAL_HAIR,
      index: code.facialHair,
      opacity: code.facialHairOpacity,
      firstColor: code.facialHairColor1,
      secondColor: 0,
    }, {
      overlayID: HeadOverlay.EYEBROWS,
      index: code.eyebrows,
      opacity: code.eyebrowsOpacity,
      firstColor: code.eyebrowsColor1,
      secondColor: 0,
    });

    const appearance: ICharacterAppearance = {
      shapeFirstID: code.faceFather,
      shapeSecondID: code.faceMother,
      shapeThirdID: 0,
      skinFirstID: code.skinFather,
      skinSecondID: code.skinMother,
      skinThirdID: 0,
      shapeMix: code.faceMix,
      skinMix: code.skinMix,
      thirdMix: 0,
      isParent: false,
      headOverlays: headOverlays,
      faceFeatures: code.structure,
      eyeColor: code.eyes,
      hair: code.hair,
      hairColors: [code.hairColor1, code.hairColor2],
    };

    return appearance;
  }

  public static async convertSelf(appearanceCode: ICharacterAppearance): Promise<ILSCBase> {
    let colorOverlays = appearanceCode.headOverlays.map((overlay) => {
      if (overlay.overlayID == HeadOverlay.MAKEUP || overlay.overlayID == HeadOverlay.LIPSTICK || overlay.overlayID == HeadOverlay.BLUSH) {
        return {
          color1: overlay.firstColor,
          opacity: overlay.opacity,
          color2: overlay.secondColor,
          id: overlay.overlayID,
          value: overlay.index,
        }
      }
    });
    colorOverlays = colorOverlays.filter((overlay) => overlay != undefined);

    let opacityOverlays = appearanceCode.headOverlays.map((overlay) => {
      if (
        overlay.overlayID !== HeadOverlay.MAKEUP &&
        overlay.overlayID !== HeadOverlay.BLUSH &&
        overlay.overlayID !== HeadOverlay.LIPSTICK &&
        overlay.overlayID !== HeadOverlay.EYEBROWS &&
        overlay.overlayID !== HeadOverlay.FACIAL_HAIR
      ) {
        return {
          id: overlay.overlayID,
          opacity: overlay.opacity,
          value: overlay.index,
        };
      }
    });
    opacityOverlays = opacityOverlays.filter((overlay) => overlay !== undefined);

    const appearance: ILSCBase = {
      // @ts-ignore
      colorOverlays: colorOverlays,
      eyebrows: appearanceCode.headOverlays.find((overlay) => overlay.overlayID === HeadOverlay.EYEBROWS)?.index || 0,
      eyes: appearanceCode.eyeColor,
      eyebrowsColor1: appearanceCode.headOverlays.find((overlay) => overlay.overlayID === HeadOverlay.EYEBROWS)?.firstColor || 0,
      eyebrowsOpacity: appearanceCode.headOverlays.find((overlay) => overlay.overlayID === HeadOverlay.EYEBROWS)?.opacity || 0,
      faceMix: appearanceCode.shapeMix,
      facialHairOpacity: appearanceCode.headOverlays.find((overlay) => overlay.overlayID === HeadOverlay.FACIAL_HAIR)?.opacity || 0,
      faceFather: appearanceCode.shapeFirstID,
      faceMother: appearanceCode.shapeSecondID,
      facialHair: appearanceCode.headOverlays.find((overlay) => overlay.overlayID === HeadOverlay.FACIAL_HAIR)?.index || 0,
      facialHairColor1: appearanceCode.headOverlays.find((overlay) => overlay.overlayID === HeadOverlay.FACIAL_HAIR)?.firstColor || 0,
      hair: appearanceCode.hair,
      hairColor1: appearanceCode.hairColors[0],
      hairColor2: appearanceCode.hairColors[1],
      hairOverlay: {
        collection: "",
        overlay: "",
      },
      // @ts-ignore
      opacityOverlays: opacityOverlays,
      sex: 0,
      skinFather: appearanceCode.skinFirstID,
      skinMix: appearanceCode.skinMix,
      skinMother: appearanceCode.skinSecondID,
      structure: appearanceCode.faceFeatures,
    };

    return appearance;
  }
}