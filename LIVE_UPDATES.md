# Live Updates

The following items can be updated live during the event from a Google Sheet,
by the tournament desk staff and the presenters:

- Announcements (newsticker-style)
- Weekend FAQ
- Timetable

We access this Sheet in the web app via the
[Google Sheets API](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get).

## Setup

1. Create a throw-away Google account G.
1. Share the Google Sheet *read-only* with G (as "Viewer").
1. In G, go to the [Google Cloud console](https://console.cloud.google.com/apis/dashboard).
1. Create a new project "My ETDS 2025".
1. Enable the Sheets API.
1. Create API keys: one for prod, one for dev.
    a. Restrict the prod key to HTTP referrers of your website, e.g. `https://etds.ch/*`.
       You may also need to allow-list `https://sheets.googleapis.com/*`.
    a. Restrict BOTH keys to the Sheets API.
1. Set the Share link of the Spreadsheet to "Anyone" and "Viewer" (read-only).

The prod key can be committed to git to be used by clients.
Use the unrestricted dev key for development, but **NEVER COMMIT IT**.

## Security

Overall, this limits exposure as far as is possible with a client-side application.

Even if the API key is abused, it only grants access to all Sheets in a throw-away Google account.

And this account only has read access to public data.
After all, the data in the live Sheet should be publicly readable anyway (it's a feature!).

G should NOT have access to your full event planning Drive, only to this single sheet.
