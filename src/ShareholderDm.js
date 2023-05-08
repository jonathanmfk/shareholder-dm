import { LitElement, html } from 'lit-element';
import '@bbva-web-components/bbva-core-generic-dp/bbva-core-generic-dp';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <shareholder-dm></shareholder-dm>
 * ```
 */
export class ShareholderDm extends LitElement {
  static get properties() {
    return {
      host: {
        type: String,
        attribute: 'host-api'
      },
      method: {
        type: String,
        attribute: 'method-api'
      },
      path: {
        type: String,
        attribute: 'path-api'
      },
      nameEventSuccess: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();
    this.host = 'http://localhost:3002';
    this.path = '';
    this.nameEventSuccess = 'shareholder';
    this.method = 'GET';
  }

  getDataService() {
    const dm = this.shadowRoot.querySelector('#bgadpGeneric');
    dm.host = this.host;
    dm.path = this.path;
    dm.method = this.method;
    dm.generateRequest();
  }

  responseSuccess(e) {
    this._fireEvent(`response-${this.nameEventSuccess}-success`, e.detail);
  }

  responseError(e) {
    this._fireEvent('response-error', e.detail);
  }

  /**
   * Fires event
   * @param {String} nameEvent
   * @param {Object} detail
   */
  _fireEvent(nameEvent, detail = {}) {
    this.dispatchEvent(new CustomEvent(nameEvent, { bubbles: true, composed: true, detail }));
  }

  render() {
    return html`
    <bbva-core-generic-dp id="bgadpGeneric"
      @request-success="${this.responseSuccess}"
      @request-error="${this.responseError}"
    ></bbva-core-generic-dp>
    `;
  }
}
