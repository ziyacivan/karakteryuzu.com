export interface IHeadOverlay {
  overlayID: number;
  index: number;
  opacity: number;
  firstColor: number;
  secondColor: number;
}

export interface ICharacterAppearance {
  shapeFirstID: number;
  shapeSecondID: number;
  shapeThirdID: number;
  skinFirstID: number;
  skinSecondID: number;
  skinThirdID: number;
  shapeMix: number;
  skinMix: number;
  thirdMix: number;
  isParent: boolean;
  headOverlays: IHeadOverlay[];
  faceFeatures: number[];
  eyeColor: number;
  hair: number;
  hairColors: number[];
}

export interface IVice {
  birth?: string;
  origin?: string;
  hair: number[];
  beard: number[];
  blendData: number[];
  faceFeatures: number[];
  clothing?: number[];
  clothingColor?: number[];
  headOverlays: number[];
  headOverlaysOpacity: number[];
  headOverlaysColor: number[];
  eyeColor: number;
}

export interface IRina {
  Sex?: number;
  firstHeadShape: number;
  secondHeadShape: number;
  firstSkinShape: number;
  secondSkinShape: number;
  headMix: number;
  skinMix: number;
  hairModel: number;
  firstHairColor: number;
  secondHairColor: number;
  beardModel: number;
  beardColor: number;
  beardOpacity: number;
  chestModel: number;
  chestColor: number;
  chestOpacity: number;
  blemishesModel: number;
  blemishesOpacity: number;
  ageingModel: number;
  ageingOpacity: number;
  complexionModel: number;
  complexionOpacity: number;
  sundamageModel: number;
  sundamageOpacity: number;
  frecklesModel: number;
  frecklesOpacity: number;
  eyesColor: number;
  eyebrowsModel: number;
  eyebrowsOpacity: number;
  eyebrowsColor: number;
  makeupModel: number;
  makeupOpacity: number;
  makeupColor1: number;
  makeupColor2: number;
  blushModel: number;
  blushOpacity: number;
  blushColor: number;
  lipstickModel: number;
  lipstickOpacity: number;
  lipstickColor: number;
  noseWidth: number;
  noseHeight: number;
  noseLength: number;
  noseBridge: number;
  noseTip: number;
  noseShift: number;
  browHeight: number;
  browWidth: number;
  cheekboneHeight: number;
  cheekboneWidth: number;
  cheeksWidth: number;
  eyes: number;
  lips: number;
  jawWidth: number;
  jawHeight: number;
  chinLength: number;
  chinPosition: number;
  chinWidth: number;
  chinShape: number;
  neckWidth: number;
}

export interface ILSCBase {
  colorOverlays: {
    color1: number;
    opacity: number;
    color2: number;
    id: number;
    value: number;
  }[];
  eyebrows: number;
  eyes: number;
  eyebrowsColor1: number;
  eyebrowsOpacity: number;
  faceMix: number;
  facialHairOpacity: number;
  faceFather: number;
  faceMother: number;
  facialHair: number;
  facialHairColor1: number;
  hair: number;
  hairColor1: number;
  hairColor2: number;
  hairOverlay: {
    collection: string;
    overlay: string;
  };
  opacityOverlays: {
    id: number;
    opacity: number;
    value: number;
  }[];
  sex: number;
  skinFather: number;
  skinMix: number;
  skinMother: number;
  structure: number[];
}