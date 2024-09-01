import { Server } from "./enums";
import { ICharacterAppearance } from "./interfaces";

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
    // Convert Vice appearance code to base format
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
