import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import headerImage from "../assets/login-graphic.jpg";

@customElement("profile-preview")
export class ProfilePreview extends LitElement {
  @property()
  size!: "desktop" | "mobile";

  static styles = css`
    .jumbo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgb(var(--color-cherry));
      width: 500px;
      border-radius: 10px;
      overflow: hidden;
    }

    @media (max-width: 500px) {
      .jumbo-container {
        width: 100%;
      }
    }

    .header {
      height: calc(100px + 5rem);
      width: 100%;
      background-image: url(${unsafeCSS(headerImage)}),
        linear-gradient(
          to bottom,
          rgb(var(--color-mango)),
          rgb(var(--color-cherry))
        );
      background-size: cover, 100% 400px;
      background-position: center;
    }
    .mobile .header {
      height: calc(40px + 2rem);
    }

    ::slotted(avatar-preview) {
      margin-top: -5rem;
      margin-bottom: 5rem;
    }
    .mobile ::slotted(avatar-preview) {
      align-self: flex-start;
      margin-left: 1rem;
      margin-top: -2rem;
      margin-bottom: 2rem;
    }
  `;

  protected render(): unknown {
    return html`
      <div
        class="jumbo-container ${classMap({ mobile: this.size === "mobile" })}"
      >
        <div class="header"></div>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "profile-preview": ProfilePreview;
  }
}
