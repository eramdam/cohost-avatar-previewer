import { LitElement, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { UploadValidFileEvent } from "../events";

export enum FileWarnings {
  TOO_BIG = "TOO_BIG",
  NOT_IMAGE = "NOT_IMAGE",
}

@customElement("upload-input")
export class UploadInput extends LitElement {
  @query('input[type="file"]')
  input!: HTMLInputElement;

  #onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  };
  #onDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    const file = files?.[0];

    if (!file) {
      return;
    }

    this.dispatchEvent(new UploadValidFileEvent(file));
  };
  #onDragLeave = () => {};
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("dragover", this.#onDragOver);
    window.addEventListener("drop", this.#onDrop);
    window.addEventListener("dragleave", this.#onDragLeave);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("dragover", this.#onDragOver);
    window.removeEventListener("drop", this.#onDrop);
    window.removeEventListener("dragleave", this.#onDragLeave);
  }

  #onFile() {
    const file = this.input.files?.[0];
    if (!file) {
      return;
    }

    this.dispatchEvent(new UploadValidFileEvent(file));
  }

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
