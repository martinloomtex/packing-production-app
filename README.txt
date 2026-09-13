PACKING PRODUCTION MOBILE APP
==============================

What this version does
- Mobile-friendly supervisor entry screen
- Supervisor, date, line/section and shift
- Operation selection
- 8 hourly quantity entries
- Automatic total and average
- Remarks
- Works offline by saving the last entry on the phone
- Can send every submission to ONE shared Google Sheet using Google Apps Script

SETUP FOR A SHARED COMPANY APP
1. Create a Google Sheet, e.g. "Packing Production".
2. In the sheet choose Extensions -> Apps Script.
3. Delete the default code and paste the contents of Code.gs.
4. Save.
5. Deploy -> New deployment -> Web app.
6. Execute as: Me.
7. Who has access: Anyone with the link (or your company's permitted option).
8. Copy the Web App URL.
9. Open app.js and replace:
   PASTE_GOOGLE_APPS_SCRIPT_URL_HERE
   with the Web App URL.
10. Host this folder on any HTTPS web host (or your company's internal web server).
11. Supervisors open the link on their phones and choose "Add to Home screen".

IMPORTANT
- The current app is a working front-end prototype.
- The Google Sheet is the shared database.
- For company use, add supervisor login/PIN and user permissions before public deployment.
- If you want a native Android APK, this same app can be packaged as an Android app after the workflow is finalized.
