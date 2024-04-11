// You can add this to the toolbar or a button on the sheet.
// https://webapps.stackexchange.com/questions/53552/how-to-extend-formulas-and-validation-to-newly-added-row-using-add-more-rows
function insertRow() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getActiveSheet(), lRow = sh.getLastRow(); 
  var lCol = sh.getLastColumn(), range = sh.getRange(lRow,1,1,lCol);
  sh.insertRowsAfter(lRow, 1);
  range.copyTo(sh.getRange(lRow+1, 1, 1, lCol), {contentsOnly:false});
}
