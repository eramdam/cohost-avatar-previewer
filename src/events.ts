import { AvatarMask } from "./components/avatar-preview";

export class UploadValidFileEvent extends Event {
  static readonly eventName = "upload-valid-file" as const;
  readonly file: File;
  constructor(file: File) {
    super(UploadValidFileEvent.eventName, { bubbles: true, composed: true });
    this.file = file;
  }
}

export class ShapeChangeEvent extends Event {
  static readonly eventName = "shape-change" as const;
  readonly shape: AvatarMask;
  constructor(shape: AvatarMask) {
    super(ShapeChangeEvent.eventName, { bubbles: true, composed: true });
    this.shape = shape;
  }
}

export class AvatarChangeEvent extends Event {
  static readonly eventName = "avatar-change" as const;
  readonly avatarUrl: string;
  constructor(url: string) {
    super(AvatarChangeEvent.eventName, { bubbles: true, composed: true });
    this.avatarUrl = url;
  }
}

declare global {
  interface HTMLElementEventMap {
    "upload-valid-file": UploadValidFileEvent;
    "shape-change": ShapeChangeEvent;
    "avatar-change": AvatarChangeEvent;
  }
}
