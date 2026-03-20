// Google Apps Script - Like Counter Backend
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code into Code.gs
// 3. Set SHEET_ID to your Google Sheet's ID (from the URL)
// 4. Click Deploy > New Deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the deployment URL and paste it into index.html as LIKES_API
//
// This script stores like counts in a "Likes" tab of your Google Sheet.
// Each row: eventId | eventTitle | count | lastUpdated

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your sheet ID
const SHEET_NAME = 'Likes';

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['eventId', 'eventTitle', 'count', 'lastUpdated']);
  }
  return sheet;
}

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'getCounts') {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const counts = {};

    // Skip header row
    for (let i = 1; i < data.length; i++) {
      const eventId = data[i][0];
      const count = parseInt(data[i][2]) || 0;
      if (eventId && count > 0) {
        counts[eventId] = count;
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify(counts))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const { eventId, eventTitle, action } = body;

    if (!eventId || !action) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Missing eventId or action' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    let rowIndex = -1;

    // Find existing row for this event
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(eventId)) {
        rowIndex = i + 1; // 1-based for sheets
        break;
      }
    }

    const now = new Date().toISOString();

    if (rowIndex > 0) {
      // Update existing row
      const currentCount = parseInt(sheet.getRange(rowIndex, 3).getValue()) || 0;
      const newCount = action === 'like'
        ? currentCount + 1
        : Math.max(0, currentCount - 1);
      sheet.getRange(rowIndex, 3).setValue(newCount);
      sheet.getRange(rowIndex, 4).setValue(now);

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, count: newCount }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      // Create new row
      const newCount = action === 'like' ? 1 : 0;
      sheet.appendRow([eventId, eventTitle || '', newCount, now]);

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, count: newCount }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
