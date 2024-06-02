import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { UploadValidFileEvent } from "./events";
import { AvatarMask } from "./components/avatar-preview";

@customElement("previewer-app")
export class App extends LitElement {
  constructor() {
    super();

    this.addEventListener(UploadValidFileEvent.eventName, this.#onValidFile);
  }

  @state()
  previewAvatarSrc =
    "https://staging.cohostcdn.org/avatar/291-71d40cfe-58e3-4a64-84d5-054fbc0e2edd-profile.jpg?dpr=2&width=80&height=80&fit=cover&auto=webp";

  @state()
  avatarMask: AvatarMask = "roundrect";

  #onValidFile(e: UploadValidFileEvent) {
    this.previewAvatarSrc = URL.createObjectURL(e.file);
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
    }
  `;

  render() {
    return html`
      <div class="container">
        <h1>Cohost Avatar Previewer</h1>
        <upload-input></upload-input>
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
