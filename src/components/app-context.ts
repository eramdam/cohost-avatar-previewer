import { createContext, provide } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { ShapeChangeEvent, UploadValidFileEvent } from "../events";
import defaultAvatar from "../assets/default-avatar.jpg";
import { AvatarMask } from "./avatar-preview";
import { FileWarnings } from "./upload-input";

export interface AppState {
  previewAvatarSrc: string;
  avatarMask: AvatarMask;
  warnings: FileWarnings[];
}
export const appContext = createContext<AppState>("appState");

@customElement("app-context")
export class AppContext extends LitElement {
  static styles = css``;

  constructor() {
    super();

    this.addEventListener(UploadValidFileEvent.eventName, this.#onFile);
    this.addEventListener(ShapeChangeEvent.eventName, this.#onShape);
  }

  #onShape = (e: ShapeChangeEvent) => {
    console.log("on shape", e.shape);
    this.appState = {
      ...this.appState,
      avatarMask: e.shape,
    };
  };

  #onFile = (e: UploadValidFileEvent) => {
    this.appState.previewAvatarSrc = URL.createObjectURL(e.file);

    const isNotImage =
      !e.file.type.startsWith("image/") && e.file.type !== "image/svg+xml";

    this.appState = {
      ...this.appState,
      warnings: [
        e.file.size > 200_000 && FileWarnings.TOO_BIG,
        isNotImage && FileWarnings.NOT_IMAGE,
      ].filter(Boolean),
      previewAvatarSrc: URL.createObjectURL(e.file),
    };
  };

  @provide({ context: appContext })
  @state()
  appState: AppState = {
    previewAvatarSrc: defaultAvatar,
    avatarMask: "circle",
    warnings: [],
  };

  protected render(): unknown {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-context": AppContext;
  }
}
