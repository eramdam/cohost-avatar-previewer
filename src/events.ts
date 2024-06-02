export class UploadValidFileEvent extends Event {
  static readonly eventName = "upload-valid-file" as const;
  readonly file: File;
  constructor(file: File) {
    super(UploadValidFileEvent.eventName, { bubbles: true, composed: true });
    this.file = file;
  }
}

declare global {
  interface HTMLElementEventMap {
    "upload-valid-file": UploadValidFileEvent;
  }
}
