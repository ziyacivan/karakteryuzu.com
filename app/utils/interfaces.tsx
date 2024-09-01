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

export interface IMenyoo {
  OutfitPedData: OutfitPedData;
}

export interface OutfitPedData {
  ClearDecalOverlays: string;
  ModelHash: string;
  type: string;
  Dynamic: string;
  FrozenPos: string;
  HashName: string;
  InitialHandle: string;
  PedProperties: PedProperties;
  TattooLogoDecals: string;
  OpacityLevel: string;
  LodDistance: string;
  IsVisible: string;
  MaxHealth: string;
  Health: string;
  HasGravity: string;
  IsOnFire: string;
  IsInvincible: string;
  IsBulletProof: string;
  IsCollisionProof: string;
  IsExplosionProof: string;
  IsFireProof: string;
  IsMeleeProof: string;
  IsOnlyDamagedByPlayer: string;
  PositionRotation: PositionRotation;
  Attachment: Attachment;
  SpoonerAttachments: SpoonerAttachments;
}

export interface PedProperties {
  isStill: string;
  CanRagdoll: string;
  HasShortHeight: string;
  Armour: string;
  CurrentWeapon: string;
  PedProps: Record<string, string>;
  PedComps: Record<string, string>;
  HeadFeatures: HeadFeatures;
  RelationshipGroupAltered: string;
  RelationshipGroup: string;
  ScenarioActive: string;
  AnimActive: string;
}

export interface HeadFeatures {
  $: WasInArray;
  ShapeAndSkinTone: ShapeAndSkinTone;
  HairColour: string;
  HairColourStreaks: string;
  EyeColour: string;
  FacialFeatures: Record<string, string>;
  Overlays: Record<string, Overlay>;
}

export interface WasInArray {
  WasInArray: string;
}

export interface ShapeAndSkinTone {
  ShapeFatherId: string;
  ShapeMotherId: string;
  ShapeOverrideId: string;
  ToneFatherId: string;
  ToneMotherId: string;
  ToneOverrideId: string;
  ShapeVal: string;
  ToneVal: string;
  OverrideVal: string;
  IsP: string;
}

export interface Overlay {
  $: OverlayDetails;
}

export interface OverlayDetails {
  index: string;
  colour: string;
  colourSecondary: string;
  opacity: string;
}

export interface PositionRotation {
  X: string;
  Y: string;
  Z: string;
  Pitch: string;
  Roll: string;
  Yaw: string;
}

export interface Attachment {
  $: IsAttached;
}

export interface IsAttached {
  isAttached: string;
}

export interface SpoonerAttachments {
  $: SpoonerDetails;
}

export interface SpoonerDetails {
  SetAttachmentsPersistentAndAddToSpoonerDatabase: string;
  StartTaskSequencesOnLoad: string;
}
