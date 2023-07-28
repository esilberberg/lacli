# LACLI
A webapp to display and search through LACLI resources.

[LACLI Homepage](https://salalm.org/lane-lacli)<br>
[LACLI Spreadsheet](https://docs.google.com/spreadsheets/d/17ngPVWCOFe4YpuDWhP37JJQIFIrrDL0qYbX28iLneWo/edit?usp=sharing)

Google Sheet data is first processed with a Google Apps Script:
```
function doGet(request) {
  var spreadsheetId = '1234567890abcefg'; // Replace with Google Sheet ID
  var sheetName = 'Sheet1'; // Replace with the sheet you want to retrieve data from
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  var dataValues = dataRange.getValues();
  var headers = dataValues[0];
  var rows = [];
  for (var i = 1; i < dataValues.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = dataValues[i][j];
    }
    rows.push(row);
  }
  var output = JSON.stringify(rows);
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}
```

## Search Functionality
- Not case sensitive
- Each search term separated by a space is treated as an independent search term
- Search covers all resource description fields
- Search only returns those resources that have all search terms in any of their description fields.
- Ignores diacritics

## facets.js
This script is under development to at some point include faceted searching.
