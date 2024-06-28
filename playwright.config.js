const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [
    ["html"],
    ["allure-playwright"],
  ],
  // retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    actionTimeout: 5 * 1000,
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  }
})