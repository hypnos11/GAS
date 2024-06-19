// This will convert raw text to numbers
function numberFormat() {
  SpreadsheetApp.getActive().getActiveRange().setNumberFormat("####.00");
};

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Number')
    .addItem('Change to Number Format', 'numberFormat')
    .addToUi();
}
