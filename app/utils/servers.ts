import { Server } from "./enums";

export const serverList = [
  {
    key: Server.VICE,
    label: "Vice Online",
  },
  {
    key: Server.RINA,
    label: "Rina:V, North:V",
  },
  {
    key: Server.MENYOO,
    label: "Menyoo (GTA:World)",
  },
  {
    key: Server.LSC_BASE,
    label: "LSC Temel (Beyond:V, LSC..)"
  },
  {
    key: Server.VINEWOOD,
    label: "Vinewood:V",
    isActive: false,
  },
];

export const disabledServerList = [Server.VINEWOOD.toString()];
