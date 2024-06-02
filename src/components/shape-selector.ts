import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { ShapeChangeEvent } from "../events";
import { AvatarMask, shapeNames } from "./avatar-preview";
import { consume } from "@lit/context";
import { AppState, appContext } from "./app-context";

@customElement("shape-selector")
export class ShapeSelector extends LitElement {
  #onShapeSelect = (e: Event) => {
    if (!(e.target instanceof HTMLSelectElement)) {
      return;
    }

    this.dispatchEvent(new ShapeChangeEvent(e.target.value as AvatarMask));
  };

  @consume({ context: appContext, subscribe: true })
  state!: AppState;

  protected render(): unknown {
    console.log("aa", this.state.avatarMask);
    return html`
      <select
        name="shape"
        id="shape"
        @change=${this.#onShapeSelect}
        style="color-scheme: ligh dark"
      >
        ${Object.entries(shapeNames).map(([key, value]) => {
          return html`<option
            value=${key}
            ?selected=${this.state.avatarMask === key}
          >
            ${value}
          </option>`;
        })}
      </select>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "shape-selector": ShapeSelector;
  }
}
