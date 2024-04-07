// GLOBALS 
var ss = SpreadsheetApp.getActive();

// FUNCTIONS

// [START SIDEBAR]
// https://spreadsheet.dev/custom-sidebar-in-google-sheets
function onOpen() {
 SpreadsheetApp
   .getUi()
   .createMenu("HH-Tools")
   .addItem("Slideout", "showSidebar")
   .addItem("Clear Cue", "clearColumnS")
   .addToUi();
}

function showSidebar() {
 var widget = HtmlService.createHtmlOutputFromFile("HHTools.html");
 widget.setTitle("Hall-Hyoo Tools");
 SpreadsheetApp.getUi().showSidebar(widget);
}

function displayToast() {
  SpreadsheetApp.getActive().toast("Toast!");
}
//[END SIDEBAR]

function resetCheckboxes() {
  var ss = SpreadsheetApp.getActive();
  var dataRange = ss.getRange('A3:A');
var values = dataRange.getValues();
for (var i = 0; i < values.length; i++) {
  for (var j = 0; j < values[i].length; j++) {
    if (values[i][j] == true) {
      values[i][j] = false; // Modified
    }
  }
}
dataRange.setValues(values); // Added
}

// [START CLEAR CUE]
function clearColumnS(){
  var sheet = SpreadsheetApp.getActive().getSheetByName('CueSheet');
  var range = sheet.getRange("X1:AW");
  var background = '#99FF99';
  range.clear();
  // https://stackoverflow.com/questions/17560263/change-cell-background-color-onedit-based-on-value
  range.setBackground(background);
}
// [END CLEAR CUE]

/* [STARTS NEW ROW EXPERIMENTS]
*
* links
* https://itecnotes.com/webapp/electronic-google-sheets-how-to-automatically-insert-a-new-row-and-retain-functions-formulas-from-last-row/
* https://webapps.stackexchange.com/questions/95441/script-to-insert-new-row-and-copy-down-formulas-that-auto-increase-according-to
* https://stackoverflow.com/questions/26365953/google-script-for-inserting-a-row-and-copying-formulas-down
* https://support.google.com/docs/thread/59217378/copy-paste-the-last-row-with-data-formulas-and-formatting?hl=en
* 
*/

function addLastRow() { // This works
  var sh = ss.getActiveSheet(), lRow = sh.getLastRow(); 
  var lCol = sh.getLastColumn(), range = sh.getRange(lRow,1,1,lCol);
  sh.insertRowsAfter(lRow, 1);
  range.copyTo(sh.getRange(lRow+1, 1, 1, lCol), {contentsOnly:false});
}

/**
* Inserts a row below current row and sets its fill color.
*
*/
function nnRow() {
  var sh = ss.getActiveSheet();
    var target_sheet = sh.getActiveSheet(); 
    var last_row = target_sheet.getLastRow();
    var activeRow = sheet.getRange(row ,1, 1 ,16)
    target_sheet.insertRowAfter(last_row);    
    activeRow.copyTo(target_sheet.getRange('A'+(last_row+1)+':R'+(last_row+1)));
}

function addCurrentRow() { // Edited for Current/Active row
  var sh = ss.getActiveSheet(), cRow = sh.getActiveCell().getRow();
  var lCol = sh.getLastColumn(), range = sh.getRange(cRow,1,1,lCol);
  sh.insertRowsAfter(cRow, 1);
  range.copyTo(sh.getRange(cRow+1, 1, 1, lCol), {contentsOnly:false});
}

function newRow() {
  var sh = ss.getActiveSheet();
  var activeRow = sh.getActiveCell().getRow();
  var lCol = sh.getLastColumn(), range = sh.getRange(activeRow,1,1,lCol);
  sh.insertRowsAfter(activeRow, 2);
  range.copyTo(sh.getRange(activeRow+1, 1, 1, lCol), {contentsOnly:false});
}
function insertRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const activeRow = sheet.getActiveCell().getRow();
  sheet.insertRowAfter(activeRow);
  const newRow = activeRow + 1;
  const newRange = sheet.getRange('A' + newRow + ':R' + newRow);
  // newRange.setBackground('#ead1dc');
  var formulas = range.getFormulasR1C1();
  newRange = sh.getRange(lRow+1,1,1,lCol);
  newRange.activate();
}

function insertNewRow() {
  var sh = ss.getActiveSheet();
  const activeRow = sh.getActiveCell().getRow();
  const newRow = activeRow + 1;
  var lCol = sh.getLastColumn()
  // var newRange = sh.getRange(activeRow,1,1,lCol);
  const newRange = sh.getRange('A' + newRow + ':R' + newRow);
  sh.insertRowAfter(activeRow);
  newRange.copyTo(sh.getRange(activeRow+1, 1, 1, lCol), {contentsOnly:false});
}

// [END NEW ROW EXPERIMENTS]
