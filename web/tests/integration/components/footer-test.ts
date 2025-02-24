import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";
import MockDate from "mockdate";
import { HERMES_GITHUB_REPO_URL } from "hermes/utils/hermes-urls";
import ConfigService from "hermes/services/config";

const SUPPORT_URL = "https://footer-component-support.com";

module("Integration | Component | footer", function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test("it renders as expected (default setup)", async function (assert) {
    MockDate.set("2000-01-01T06:00:00.000-07:00");

    await render(hbs`<Footer />`);

    assert
      .dom("[data-test-footer-copyright]")
      .containsText("2000", "The current year is shown");

    assert
      .dom("[data-test-footer-github-link]")
      .hasAttribute("href", HERMES_GITHUB_REPO_URL);

    MockDate.reset();
  });

  test("it renders as expected (with optional links)", async function (assert) {
    // In assertion tests, Mirage automatically loads our mock config.
    // Rendering tests skip this step, so we need to do it manually.

    let mockConfigSvc = this.owner.lookup("service:config") as ConfigService;
    mockConfigSvc.config.support_link_url = SUPPORT_URL;

    await render(hbs`<Footer />`);

    assert
      .dom("[data-test-footer-support-link]")
      .hasAttribute("href", SUPPORT_URL);
  });
});
