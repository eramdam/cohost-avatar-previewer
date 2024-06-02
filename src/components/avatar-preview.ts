import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type AvatarSize = "jumbo" | "large" | "medium" | "small";
export type AvatarMask = "roundrect";

@customElement("avatar-preview")
export class AvatarPreview extends LitElement {
  @property()
  avatarMask!: AvatarMask;

  @property()
  avatarSize!: AvatarSize;

  @property({ type: String })
  avatarSrc!: string;

  static override styles = css`
    .roundrect {
      border-radius: 12.5%;
    }

    .jumbo {
      width: 144px;
      height: 144px;
    }
    .large {
      width: 80px;
      height: 80px;
    }
    .medium {
      width: 64px;
      height: 64px;
    }
    .small {
      width: 32px;
      height: 32px;
    }

    img:not(.small) {
      filter: drop-shadow(0px 4px 5px rgba(25, 25, 25, 0.14))
        drop-shadow(0px 1px 10px rgba(25, 25, 25, 0.12))
        drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    }

    @media (prefers-color-scheme: dark) {
      img:not(.small) {
        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.14))
          drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.12))
          drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
      }
    }
  `;

  protected render() {
    return html`
      <img
        class=${`${this.avatarSize} ${this.avatarMask}`}
        src=${this.avatarSrc}
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "avatar-preview": AvatarPreview;
  }
}
