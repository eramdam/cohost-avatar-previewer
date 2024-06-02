import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("avatar-preview")
export class AvatarPreview extends LitElement {
  @property({ type: String })
  avatarSrc!: string;

  static override styles = css`
    img {
      width: 144px;
      height: 144px;
    }
  `;

  protected render() {
    return html` <img src=${this.avatarSrc} /> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "avatar-preview": AvatarPreview;
  }
}
