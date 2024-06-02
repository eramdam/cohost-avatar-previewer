import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import maskSquircle from "../assets/mask-squircle.svg";
import maskCapsuleBig from "../assets/mask-capsule-big.svg";
import maskCapsuleSmall from "../assets/mask-capsule-small.svg";
import maskStaff from "../assets/mask-staff.svg";

export type AvatarSize = "jumbo" | "large" | "medium" | "small";
export type AvatarMask =
  | "roundrect"
  | "circle"
  | "squircle"
  | "capsule-big"
  | "capsule-small"
  | "staff";

@customElement("avatar-preview")
export class AvatarPreview extends LitElement {
  @property()
  avatarMask!: AvatarMask;

  @property()
  avatarSize!: AvatarSize;

  @property({ type: String })
  avatarSrc!: string;

  static override styles = css`
    .mask-roundrect {
      border-radius: 12.5%;
    }
    .mask-circle {
      border-radius: 9999px;
    }
    .mask-squircle {
      mask-image: url(${unsafeCSS(maskSquircle)});
    }
    .mask-capsule-big {
      mask-image: url(${unsafeCSS(maskCapsuleBig)});
    }
    .mask-capsule-small {
      mask-image: url(${unsafeCSS(maskCapsuleSmall)});
    }
    .mask-staff {
      mask-image: url(${unsafeCSS(maskStaff)});
    }

    .wrapper {
      aspect-ratio: 1/1;
    }

    .wrapper img {
      mask-size: contain;
      object-fit: cover;
      display: block;
      mask-repeat: no-repeat;
      mask-position: center;
      max-width: 100%;
      width: 100%;
      height: 100%;
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

    .wrapper:not(.small) {
      filter: drop-shadow(0px 4px 5px rgba(25, 25, 25, 0.14))
        drop-shadow(0px 1px 10px rgba(25, 25, 25, 0.12))
        drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    }

    @media (prefers-color-scheme: dark) {
      .wrapper:not(.small) {
        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.14))
          drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.12))
          drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
      }
    }
  `;

  protected render() {
    return html`
      <div class=${`wrapper ${this.avatarSize}`}>
        <img class=${`mask-${this.avatarMask}`} src=${this.avatarSrc} />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "avatar-preview": AvatarPreview;
  }
}
