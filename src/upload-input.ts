import { LitElement, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { UploadValidFileEvent } from "./events";

@customElement("upload-input")
export class UploadInput extends LitElement {
  @query('input[type="file"]')
  input!: HTMLInputElement;

  #onFile() {
    const file = this.input.files?.[0];
    if (!file) {
      return;
    }

    this.dispatchEvent(new UploadValidFileEvent(file));
  }

  protected render() {
    return html`
      <input accept="image/*,svg" type="file" @change=${this.#onFile} />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "upload-input": UploadInput;
  }
}
