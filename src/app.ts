import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UploadValidFileEvent } from "./events";
import { AvatarMask } from "./components/avatar-preview";

enum Warnings {
  TOO_BIG = "TOO_BIG",
  NOT_IMAGE = "NOT_IMAGE",
}

@customElement("previewer-app")
export class App extends LitElement {
  constructor() {
    super();

    this.addEventListener(UploadValidFileEvent.eventName, this.#onFile);
  }

  @state()
  previewAvatarSrc =
    "https://staging.cohostcdn.org/avatar/291-71d40cfe-58e3-4a64-84d5-054fbc0e2edd-profile.jpg?dpr=2&width=80&height=80&fit=cover&auto=webp";

  @state()
  avatarMask: AvatarMask = "roundrect";
  @state()
  warnings: Warnings[] = [];

  #onFile(e: UploadValidFileEvent) {
    this.previewAvatarSrc = URL.createObjectURL(e.file);

    const isNotImage =
      !e.file.type.startsWith("image/") && e.file.type !== "image/svg+xml";
    this.warnings = [
      e.file.size > 200_000 && Warnings.TOO_BIG,
      isNotImage && Warnings.NOT_IMAGE,
    ].filter(Boolean);
    console.log(this.warnings, e.file.size > 200_000);
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .previews {
      display: grid;
      grid-template-columns: repeat(2, auto);
      gap: 2rem;
      width: 80%;
    }

    .steps {
      width: 80%;
      display: grid;
      grid-template-columns: repeat(2, 50%);
      gap: 2rem;
    }

    p,
    ol,
    ul {
      line-height: 1.75;
    }

    .warnings {
      background-color: rgb(255 142 138);
      padding: 0.1rem 1.2rem;
      border-radius: 10px;
    }
  `;

  renderWarning(warning: Warnings) {
    switch (warning) {
      case Warnings.NOT_IMAGE: {
        return html`The file isn't of a type supported by cohost`;
      }
      case Warnings.TOO_BIG: {
        return html`The file is bigger than 200kb.`;
      }
    }
  }

  renderWarnings() {
    if (this.warnings.length < 1) {
      return "";
    }

    return html`
      <div class="warnings">
        <h3>${this.warnings.length > 1 ? "Warnings" : "Warning"}:</h3>
        <ul>
          ${this.warnings.map((w) => html`<li>${this.renderWarning(w)}</li>`)}
        </ul>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <h1>Cohost Avatar Previewer</h1>
        <div class="steps">
          <div>
            <h3>Select your file:</h3>
            <upload-input></upload-input>
          </div>
          <div>
            <h3>Instructions:</h3>
            <ol>
              <li>Select your file with the button on the left</li>
              <li>That's it!</li>
            </ol>
            ${this.renderWarnings()}
          </div>
        </div>
        <div class="previews">
          <div>
            <h2>Profile page (144px)</h2>
            <profile-preview size="desktop">
              <avatar-preview
                .avatarSrc=${this.previewAvatarSrc}
                .avatarSize=${"jumbo"}
                .avatarMask=${this.avatarMask}
              ></avatar-preview>
            </profile-preview>
          </div>
          <div>
            <h2>Timeline (64px) and in-post (32px)</h2>
            <timeline-post>
              <avatar-preview
                slot="large"
                .avatarSrc=${this.previewAvatarSrc}
                .avatarSize=${"medium"}
                .avatarMask=${this.avatarMask}
              ></avatar-preview>

              <avatar-preview
                slot="small"
                .avatarSrc=${this.previewAvatarSrc}
                .avatarSize=${"small"}
                .avatarMask=${this.avatarMask}
              ></avatar-preview>
            </timeline-post>
          </div>
          <div>
            <h2>Profile page mobile (80px)</h2>
            <profile-preview size="mobile">
              <avatar-preview
                .avatarSrc=${this.previewAvatarSrc}
                .avatarSize=${"large"}
                .avatarMask=${this.avatarMask}
              ></avatar-preview>
            </profile-preview>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "previewer-app": App;
  }
}
