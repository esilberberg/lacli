# LACLI
A webapp to display and search through LACLI resources.

[LACLI Homepage](https://salalm.org/lane-lacli)<br>
[LACLI Spreadsheet](https://docs.google.com/spreadsheets/d/17ngPVWCOFe4YpuDWhP37JJQIFIrrDL0qYbX28iLneWo/edit?usp=sharing)

Google Sheet data is first processed with a Google Apps Script.

## Search Functionality
- Not case sensitive
- Each search term separated by a space is treated as an independent search term
- Search covers all resource description fields
- Search only returns those resources that have all search terms in any of their description fields.
- Ignores diacritics

## getFacets
This function is under development to determine feasability of creating faceted searching