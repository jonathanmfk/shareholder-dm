import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../shareholder-dm.js';

suite('ShareholderDm', () => {
  let el;

  teardown(() => fixtureCleanup());

  suite('default', () => {
    setup(async () => {
      el = await fixture(html`
        <shareholder-dm></shareholder-dm>
      `);
      await el.updateComplete;
    });

    test('response-shareholder-list-success', function(done) {
      el.nameEventSuccess = 'shareholder-list';
      el.path = 'accionistas';
      el.addEventListener('response-shareholder-list-success', (event) => {
        assert.isObject(event.detail[0]);
        done();
      });
      el.getDataService();
    });

    test('response-shareholder-detail-success', function(done) {
      el.nameEventSuccess = 'shareholder-detail';
      el.path = 'accionistas?NIT=80808080&TipoDocumento=NIT';
      el.addEventListener('response-shareholder-detail-success', (event) => {
        assert.isObject(event.detail[0]);
        done();
      });
      el.getDataService();
    });

    test('response-error', function(done) {
      el.host = 'http://localhost:3002';
      el.path = 'fail';
      el.addEventListener('response-error', (event) => {
        assert.equal(event.detail.name, 'AjaxError');
        done();
      });
      el.getDataService();
    });

    test('_fireEvent method', () => el._fireEvent('eventName'));
  });
});
