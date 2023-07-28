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

## Search Functionality (app.js)
- Searches are not case sensitive and ignore diacritics.
- Truncation, wildcards, quotation marks, and lemmatization are not supported. It is preferable to search with singular rather than plural nouns.
- Search terms separated by a space are treated as independent search terms and are linked with the AND operator.
- All search terms must appear somewhere in the resource description fields for a resource to be returned in the results.
- To save a search, copy the url from the results page or use the export button to download the results as a JSON file.

## facets.js
This script is under development to at some point include faceted searching.
