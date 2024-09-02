export enum Server {
  VICE = 1,
  RINA = 2,
  MENYOO = 3,
  VINEWOOD = 4,
  UNKNOWN = 5,
}

export const enum HeadOverlay {
  BLEMISHES = 0,
  FACIAL_HAIR = 1,
  EYEBROWS = 2,
  AGEING = 3,
  MAKEUP = 4,
  BLUSH = 5,
  COMPLEXION = 6,
  SUN_DAMAGE = 7,
  LIPSTICK = 8,
  FRECKLES = 9,
  CHEST_HAIR = 10,
  BODY_BLEMISHES = 11,
  ADD_BODY_BLEMISHES = 12,
}

export const variationProperties = {
  1: "mask",
  3: "torso",
  4: "legs",
  5: "bags",
  6: "shoes",
  7: "accessories",
  8: "undershirt",
  9: "armor",
  10: "decals",
  11: "shirts",
} as const;

export const propProperties = {
  0: "hats",
  1: "glasses",
  2: "ears",
  6: "watches",
  7: "bracelets",
} as const;
