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
  avatarMask: AvatarMask = "circle";
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

  #onShapeSelect(e: Event) {
    if (!(e.target instanceof HTMLSelectElement)) {
      return;
    }

    this.avatarMask = e.target.value as AvatarMask;
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

    @media (max-width: 1150px) {
      .previews,
      .steps {
        grid-template-columns: repeat(1, auto);
        width: 95%;
        margin: 0 auto;
        align-items: center;
        justify-content: center;
      }

      .profile-preview {
        order: 1;
      }
      .profile-mobile-preview {
        order: 2;
      }
      .post-preview {
        order: 3;
      }
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

    @media (prefers-color-scheme: dark) {
      .warnings {
        color: rgb(var(--color-notBlack));
      }
    }

    :any-link {
      color: inherit;
    }

    select {
      color-scheme: light dark;
    }
  `;

  renderWarning(warning: Warnings) {
    switch (warning) {
      case Warnings.NOT_IMAGE: {
        return html`The file isn't of a type supported by cohost`;
      }
      case Warnings.TOO_BIG: {
        return html`The file is bigger than 200kb. Try compressing it with a
          tool like <a href="https://squoosh.app/">Squoosh</a> or
          <a href="https://jakearchibald.github.io/svgomg/">SVGOMG</a>`;
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
            <h3>Upload your file:</h3>
            <upload-input></upload-input>
            <h3>Shape:</h3>
            <select name="shape" id="shape" @change=${this.#onShapeSelect}>
              ${Object.entries(shapeNames).map(([key, value]) => {
                return html`<option
                  value=${key}
                  ?selected=${this.avatarMask === key}
                >
                  ${value}
                </option>`;
              })}
            </select>
          </div>
          <div>
            <h3>Instructions:</h3>
            <ol>
              <li>
                Select your file with the button on the left (or drop it on the
                page)
              </li>
              <li>Choose your avatar shape</li>
              <li>That's it!</li>
            </ol>
            ${this.renderWarnings()}
          </div>
        </div>
        <div class="previews">
          <div class="profile-preview">
            <h2>Profile page (144px)</h2>
            <profile-preview size="desktop">
              <avatar-preview
                .avatarSrc=${this.previewAvatarSrc}
                .avatarSize=${"jumbo"}
                .avatarMask=${this.avatarMask}
              ></avatar-preview>
            </profile-preview>
          </div>
          <div class="post-preview">
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
          <div class="profile-mobile-preview">
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

const shapeNames: Record<AvatarMask, string> = {
  circle: "circle",
  roundrect: "round square",
  squircle: "squircle",
  "capsule-big": "capsule (big)",
  "capsule-small": "capsule (small)",
  staff: "eggbug (are you staff?)",
};
