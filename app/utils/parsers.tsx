import { XMLParser } from "fast-xml-parser";
import { z } from "zod";

const parser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
  parseAttributeValue: true,
  allowBooleanAttributes: true,
});

function numeric(target: z.ZodCatch<z.ZodDefault<z.ZodNumber>> | z.ZodNumber) {
  return z.preprocess((val) => Number(val), target);
}

const overlay = z
  .object({
    index: numeric(z.number().int().min(0).max(255).default(0).catch(0)),
    opacity: numeric(z.number().min(0).max(1).default(0).catch(0)),
    colour: numeric(z.number().int().min(0).max(255).default(0).catch(0)),
    colourSecondary: numeric(
      z.number().int().min(0).max(255).default(0).catch(0)
    ),
  })
  .catch({
    index: 0,
    opacity: 0,
    colour: 0,
    colourSecondary: 0,
  });

const component = z
  .string()
  .default("0,0")
  .transform((val) => {
    const arr = val.split(",");
    if (arr.length !== 2) return [0, 0];
    const [a, b] = arr;
    const aNum = Number(a);
    const bNum = Number(b);
    if (aNum < 0 || bNum < 0 || bNum > 255 || isNaN(aNum) || isNaN(bNum))
      return [0, 0];
    return [aNum, bNum];
  })
  .catch([0, 0]);

const prop = z
  .string()
  .default("-1,0")
  .transform((val) => {
    const arr = val.split(",");
    if (arr.length !== 2) return [0, 0];
    const [a, b] = arr;
    const aNum = Number(a);
    let bNum = Number(b);
    if (bNum === -1) bNum = 0;
    if (
      aNum < -1 ||
      aNum > 255 ||
      bNum < 0 ||
      bNum > 255 ||
      isNaN(aNum) ||
      isNaN(bNum)
    )
      return [0, 0];
    return [aNum, bNum];
  })
  .catch([-1, 0]);

const xmlSchema = z.object({
  OutfitPedData: z.object({
    ModelHash: z.number(),
    PedProperties: z.object({
      HeadFeatures: z.object({
        HairColour: numeric(
          z.number().int().min(0).max(255).default(0).catch(0)
        ),
        HairColourStreaks: numeric(
          z.number().int().min(0).max(255).default(0).catch(0)
        ),
        EyeColour: numeric(
          z.number().int().min(0).max(255).default(0).catch(0)
        ),
        ShapeAndSkinTone: z.object({
          ShapeFatherId: numeric(
            z.number().int().min(0).max(45).default(0).catch(0)
          ),
          ShapeMotherId: numeric(
            z.number().int().min(0).max(45).default(0).catch(0)
          ),
          ShapeVal: numeric(z.number().min(0).max(1).default(0).catch(0)),
          ToneFatherId: numeric(
            z.number().int().min(0).max(45).default(0).catch(0)
          ),
          ToneMotherId: numeric(
            z.number().int().min(0).max(45).default(0).catch(0)
          ),
          ToneVal: numeric(z.number().min(0).max(1).default(0).catch(0)),
          ShapeOverrideId: numeric(
            z.number().int().min(0).max(45).default(0).catch(0)
          ),
          ToneOverrideId: numeric(
            z.number().int().min(0).max(45).default(0).catch(0)
          ),
          OverrideVal: numeric(z.number().min(0).max(1).default(0).catch(0)),
        }),
        FacialFeatures: z.object({
          _0: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _1: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _2: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _3: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _4: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _5: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _6: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _7: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _8: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _9: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _10: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _11: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _12: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _13: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _14: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _15: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _16: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _17: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _18: numeric(z.number().min(-1).max(1).default(0).catch(0)),
          _19: numeric(z.number().min(-1).max(1).default(0).catch(0)),
        }),
        Overlays: z.object({
          _0: overlay,
          _1: overlay,
          _2: overlay,
          _3: overlay,
          _4: overlay,
          _5: overlay,
          _6: overlay,
          _7: overlay,
          _8: overlay,
          _9: overlay,
          _10: overlay,
          _11: overlay,
          _12: overlay,
        }),
      }),
      PedComps: z.object({
        _0: component,
        _1: component,
        _2: component,
        _3: component,
        _4: component,
        _5: component,
        _6: component,
        _7: component,
        _8: component,
        _9: component,
        _10: component,
        _11: component,
      }),
      PedProps: z.object({
        _0: prop,
        _1: prop,
        _2: prop,
        _6: prop,
        _7: prop,
      }),
      TattooLogoDecals: z
        .object({
          ":anonymous": z
            .array(
              z.object({
                collection: z.number().int(),
                value: z.number().int(),
              })
            )
            .catch([]),
        })
        .catch({
          ":anonymous": [],
        }),
    }),
  }),
});

export function parseCharacterXML(xml: string) {
  const parsed = parser.parse(xml);
  const validated = xmlSchema.parse(parsed);
  return validated;
}
