export enum PopupState {
  idle = "idle",
  loading = "loading",
  fixing = "fixing",
  finished = "finished",
}

export interface WordCorrection {
  id: number;
  old: string;
  new: string;
  description?: string;
  found?: boolean;
  notFound?: boolean;
}
