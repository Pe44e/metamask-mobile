// In appwright.config.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.e2e.env' });
import { defineConfig, Platform } from 'appwright';
export default defineConfig({
  testDir: './tests',
  workers: 1, // Use only one worker
  reporter: [
    // The default HTML reporter from Appwright
    [
      'html',
      { open: 'never', outputFolder: './test-reports/appwright-report' },
    ],
    ['./reporters/custom-reporter.js'],
    ['list'],
  ],
  projects: [
    {
      name: 'android',
      use: {
        platform: Platform.ANDROID,
        device: {
          provider: 'emulator', // or 'local-device' or 'browserstack'
          name: 'Samsung Galaxy S24 Ultra', // this can changed
          osVersion: '14', // this can changed
        },
        buildPath: './appwright/metamask-main-e2e-2203-4.apk', // Path to your .apk file
        expectTimeout: 10000,
      },
    },
    {
      name: 'ios',
      use: {
        platform: Platform.IOS,
        device: {
          provider: 'emulator', // or 'local-device' or 'browserstack'
        },
        buildPath: './appwright/metamask-simulator-main-e2e.app', // Path to your .app file
      },
    },
    {
      name: 'browserstack-android',
      use: {
        platform: Platform.ANDROID,
        device: {
          provider: 'browserstack', // or 'local-device' or 'browserstack'
          name: process.env.BROWSERSTACK_DEVICE || 'Samsung Galaxy S23 Ultra', // this can changed
          osVersion: process.env.BROWSERSTACK_OS_VERSION || '13.0', // this can changed
        },
        buildPath: process.env.BROWSERSTACK_ANDROID_APP_URL, // Path to Browserstack url bs:// link release-7.53.0-7.53.0-2223.apk
      },
    },
    {
      name: 'browserstack-ios',
      use: {
        platform: Platform.IOS,
        device: {
          provider: 'browserstack',
          name: process.env.BROWSERSTACK_DEVICE || 'iPhone 14 Pro Max',
          osVersion: process.env.BROWSERSTACK_OS_VERSION || '16.0',
        },
        buildPath: process.env.BROWSERSTACK_IOS_APP_URL, // Path to Browserstack url bs:// link //release-7.53.0-7.53.0-2223.ipa
      },
    },
  ],
});
