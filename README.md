# LACLI
A webapp to display and search through LACLI resources.

[LACLI Homepage](https://salalm.org/lane-lacli)<br>
[LACLI Spreadsheet](https://docs.google.com/spreadsheets/d/17ngPVWCOFe4YpuDWhP37JJQIFIrrDL0qYbX28iLneWo/edit?usp=sharing)

## Search Functionality
- Not case sensitive
- Each search term separated by a space is treated as an independent search term
- Search covers all resource description fields
- Search only returns those resources that have all search terms in any of their description fields.
- Ignores diacritics

Google Sheet data is first processed with a [Google Apps Script function](https://script.google.com/d/1IfJia_KTeY1J8tTD2zDooZzlW3I0jH6Z1C8NVkOFZ372yygkngGKn37w/edit?usp=drivesdk).