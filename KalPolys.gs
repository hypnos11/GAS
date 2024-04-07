function onEdit(e) {
var oldValue;
var newValue;
var ss=SpreadsheetApp.getActiveSpreadsheet();
var activeCell = ss.getActiveCell();
  
  // column where dropdowns are (where 4 is column D) and sheet name they are on
  
  if(activeCell.getColumn() == 14 && activeCell.getLastRow && ss.getActiveSheet().getName()=="Songs") {
  newValue=e.value;
  oldValue=e.oldValue;
  if(!e.value) {
  activeCell.setValue("");
  }
  else {
    if (!e.oldValue) {
    activeCell.setValue(newValue);
    }
      else {
      activeCell.setValue(oldValue+', '+newValue);
      }
    }
  }
}
