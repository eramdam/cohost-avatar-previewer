import { LitElement, css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { UploadValidFileEvent } from "../events";

@customElement("upload-input")
export class UploadInput extends LitElement {
  @query('input[type="file"]')
  input!: HTMLInputElement;

  #onFile() {
    const file = this.input.files?.[0];
    if (!file) {
      return;
    }

    this.file = file;
    this.dispatchEvent(new UploadValidFileEvent(file));
  }

  @state()
  file?: File;

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    input {
      display: none;
    }

    label {
      display: inline-block;
      padding: 0.5rem 1rem;
      color: rgb(var(--color-cherry));
      border: 2px solid currentColor;
      border-radius: 9999px;
      font-weight: 700;
      text-align: center;
    }

    label:hover {
      color: rgb(var(--color-notWhite));
      background-color: rgb(var(--color-cherry));
    }
  `;

  protected render() {
    return html`
      <div class="container">
        <div class="label-wrapper">
          <label for="file-upload"> Browse... </label>
        </div>
        <input
          id="file-upload"
          accept="image/*,svg"
          type="file"
          @change=${this.#onFile}
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "upload-input": UploadInput;
  }
}
