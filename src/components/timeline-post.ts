import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("timeline-post")
export class TimelinePost extends LitElement {
  static styles = css`
    .post {
      width: 500px;
      display: grid;
      grid-template-columns: 4rem 1fr;
      row-gap: 0.5rem;
      column-gap: 1.5rem;
    }

    @media (max-width: 500px) {
      .post {
        width: 100%;
      }
    }

    .post-block {
      box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14),
        0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2);
      background-color: white;
      border-radius: 0.5rem;
    }

    .thread-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      padding: 0.75rem;
      background-color: rgb(var(--color-notWhite));
    }
    .post-block header + hr {
      border: 0;
      border-bottom: 1px solid rgb(191 186 181);
      margin: 0;
    }

    .thread-header > div {
      display: flex;
      line-height: 1;
      gap: 0.5rem;
      flex-wrap: wrap;
      min-width: 0;
      flex: 1 1 0%;
      font-size: 16px;
      align-items: center;
    }

    .thread-header > div {
      color: rgb(25, 25, 25);
    }

    .post-header {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      background-color: rgb(var(--color-notWhite));
      color: rgb(25, 25, 25);
    }

    .post-header .avatar {
      display: inline-block;
      line-height: 0;
    }

    .rebug-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .fainted {
      color: rgb(74, 72, 71);
      font-weight: 400;
    }

    .post-content {
      background-color: white;
    }

    .post-prose {
      overflow: hidden;
      overflow-wrap: break-word;
      overflow: hidden;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    .post-prose p {
      margin: 0;
      color: #191919;
      line-height: 1.75;
    }
  `;

  protected render(): unknown {
    return html`
      <div class="post">
        <div class="avatar">
          <slot name="large"></slot>
        </div>
        <div class="post-block">
          <header class="thread-header">
            <div>
              <strong>Eggbug</strong>
              <span class="fainted">@eggbug</span> ${rebugIcon}
              <strong>Eggbug</strong> <span class="fainted">@eggbug</span>
            </div>
          </header>
          <hr />
          <div>
            <div class="post-header">
              <div class="avatar">
                <slot name="small"></slot>
              </div>
              <strong>Eggbug</strong> <span class="fainted">@eggbug</span>
            </div>
            <div class="post-content">
              <div class="post-prose">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Molestiae doloremque necessitatibus mollitia vero voluptates
                  cupiditate non alias totam rem architecto optio pariatur magni
                  laboriosam quidem quos soluta aperiam, eius nulla modi iusto,
                  nobis quae minus provident!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

const rebugIcon = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    class="rebug-icon"
  >
    <path
      fill-rule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
      clip-rule="evenodd"
    ></path>
  </svg>
`;

declare global {
  interface HTMLElementTagNameMap {
    "timeline-post": TimelinePost;
  }
}
