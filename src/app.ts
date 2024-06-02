import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UploadValidFileEvent } from "./events";

@customElement("previewer-app")
export class App extends LitElement {
  constructor() {
    super();

    this.addEventListener(UploadValidFileEvent.eventName, this.#onValidFile);
  }

  @state()
  previewAvatarSrc =
    "https://staging.cohostcdn.org/avatar/291-71d40cfe-58e3-4a64-84d5-054fbc0e2edd-profile.jpg?dpr=2&width=80&height=80&fit=cover&auto=webp";

  #onValidFile(e: UploadValidFileEvent) {
    this.previewAvatarSrc = URL.createObjectURL(e.file);
  }

  render() {
    return html`
      <upload-input></upload-input>
      <avatar-preview .avatarSrc=${this.previewAvatarSrc}></avatar-preview>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "previewer-app": App;
  }
}
