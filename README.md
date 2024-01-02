# FoxHunt-AutoSourcer

## Introduction

The AutoSourcer Chrome extension automates the scraping of profile information from LinkedIn Recruiter. The results are sent to Airtable for further filtering.

## Installation Instructions

1. Create an Airtable account by visiting [Airtable](https://airtable.com/account).
2. For best results, run this extension in its own Chrome container/window.
3. Follow these steps to create a dummy Google Chrome account:

   - Click the accounts button near the Maximize/Minimize/Close buttons in the top right.
   - Click on the Add button at the bottom under Other Profiles.
   - A new popup should appear; click Continue without an account.
   - Enter any name and color scheme, then click Done.
   - Open the new Chrome account window and install the AutoSourcer extension.
   - Disable the flag [chrome://flags/#calculate-native-win-occlusion](chrome://flags/#calculate-native-win-occlusion).

## Notes

- For best results, run this extension in its own Chrome container/window.
- This extension can be run behind other windows but not minimized, or Chrome will freeze the tab.
- It will close out any other open tabs in the browser window, so save your work beforehand.
- If running overnight, consider setting up a screensaver to prevent screen burn-in.

## Features

- **Skipping Viewed Profiles:**
  - The extension avoids collecting profiles that have been previously viewed.
  - Timers are implemented to randomize the time spent on a profile page, making usage more natural.

- **Collecting Similar Profiles:**
  - Collects profiles listed on the right side of a profile as similar.

- **Collecting Open to Work Profiles:**
  - Available only on full Recruiter licenses.
  - Adds profiles open to work in a separate tab with more information.

- **Randomized Humanlike Behavior:**
  - Mimics realistic browsing behaviors to prevent detection from LinkedIn's anti-scraping measures.


## Bug Reporting

If you encounter a bug or think something isn't working correctly, try clearing the cache by hitting the "Clear Cache" button at the top of the page.

## Known Bugs

1. Duplicates may occur around page transitions or every 25 profiles. This should be solved in a later update with duplicate checking before saving.
