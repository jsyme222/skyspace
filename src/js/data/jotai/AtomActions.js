import { useAtom, atom } from "jotai";
import { app_version } from "./Atoms";

export const APP_VERISON = atom(() => useAtom(app_version));

// RANDOM REG ENTRY
export const REG_ENTRY = atom(() => {
    const r = () => Math.random().toString(36).substring(2, 30) + Math.random().toString(36).substring(2, 15);
    return r()    
}
);