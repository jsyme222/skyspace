import { atom } from "jotai";

// Application State
export const activeComponent = atom("dashboard");
export const skyidAtom = atom(null);
export const configAtom = atom(null);
export const authenticated = atom(false);
export const secret = atom("");
export const drawerOpen = atom(false);

export const editorState = atom({
  modalOpen: false,
  docTitle: null,
  content: null,
  setDataFunc: null,
  notEncryptable: false,
  notPublishable: false,
});

// Alerts
export const toastMessage = atom({});
