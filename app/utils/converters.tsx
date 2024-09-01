import { Server } from "./enums";
import { ICharacterAppearance, IVice } from "./interfaces";

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
    // Convert Rina appearance code to base format
  }
}

class MenyooConverter {
  public static async convertToBaseFormat(
    appearanceCode: string
  ): Promise<ICharacterAppearance> {
    // Convert Menyoo appearance code to base format
  }
}
