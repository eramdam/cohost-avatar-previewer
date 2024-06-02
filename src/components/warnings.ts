import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AppState, appContext } from "./app-context";
import { consume } from "@lit/context";
import { FileWarnings } from "./upload-input";

@customElement("app-warnings")
export class AppWarnings extends LitElement {
  @consume({ context: appContext, subscribe: true })
  state!: AppState;

  static styles = css`
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
  `;

  renderWarning(warning: FileWarnings) {
    switch (warning) {
      case FileWarnings.NOT_IMAGE: {
        return html`The file isn't of a type supported by cohost`;
      }
      case FileWarnings.TOO_BIG: {
        return html`The file is bigger than 200kb. Try compressing it with a
          tool like <a href="https://squoosh.app/">Squoosh</a> or
          <a href="https://jakearchibald.github.io/svgomg/">SVGOMG</a>`;
      }
    }
  }

  renderWarnings() {
    if (this.state.warnings.length < 1) {
      return "";
    }

    return html`
      <div class="warnings">
        <h3>${this.state.warnings.length > 1 ? "Warnings" : "Warning"}:</h3>
        <ul>
          ${this.state.warnings.map(
            (w) => html`<li>${this.renderWarning(w)}</li>`
          )}
        </ul>
      </div>
    `;
  }

  protected render(): unknown {
    return this.renderWarnings();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-warnings": AppWarnings;
  }
}
