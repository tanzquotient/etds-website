/* Security: see the LIVE_UPDATES.md */

const API_KEY = "AIzaSyD99rbWhgFbrn45CoPVbHiMZWLPEYCXqsE"; // prod

// https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/get
function getSheetUrl(spreadsheetId, sheetName, dimension = "ROWS") {
    return `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}?&key=${API_KEY}&majorDimension=${dimension}&valueRenderOption=FORMATTED_VALUE`
}

// https://docs.google.com/spreadsheets/d/1BR563xkLAwR5Tih_PwNMr_r0hNYpon6GeZ62xcbiF_w/edit
const announcementsUrl = getSheetUrl("1BR563xkLAwR5Tih_PwNMr_r0hNYpon6GeZ62xcbiF_w", "Announcements")
const faqUrl = getSheetUrl("1BR563xkLAwR5Tih_PwNMr_r0hNYpon6GeZ62xcbiF_w", "FAQ")

const timetableUrl = getSheetUrl("TODO", "Live Timetable");
