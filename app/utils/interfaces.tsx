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
