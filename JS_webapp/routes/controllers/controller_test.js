import { main, showForm, showLoginForm, register, authenticate, reportPage, report, logout, summaries, specificTime } from './controller.js';

Deno.test("getHello", async () => {
  showForm();
});

// deno test --allow-env --coverage --unstable controller_test.js
