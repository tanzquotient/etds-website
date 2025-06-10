/* Security: see the LIVE_UPDATES.md */

const API_KEY = "AIzaSyD99rbWhgFbrn45CoPVbHiMZWLPEYCXqsE"; // prod

// https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get
function getSheetUrl(spreadsheetId, sheetName, dimension = "ROWS") {
    return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}&majorDimension=${dimension}&valueRenderOption=FORMATTED_VALUE`
}

// https://docs.google.com/spreadsheets/d/1TFRuM1ogI1VSM5WxhSZokm_d4r6kokoTXV9AHjA9H2I/edit
const announcementsUrl = getSheetUrl("1TFRuM1ogI1VSM5WxhSZokm_d4r6kokoTXV9AHjA9H2I", "Announcements")
const faqUrl = getSheetUrl("1TFRuM1ogI1VSM5WxhSZokm_d4r6kokoTXV9AHjA9H2I", "FAQ")
const timetableUrl = getSheetUrl("1TFRuM1ogI1VSM5WxhSZokm_d4r6kokoTXV9AHjA9H2I", "Presenter Worksheet", "COLUMNS");
