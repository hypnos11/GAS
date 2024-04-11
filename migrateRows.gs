// This will migrate the current Active row to a different specified tab
function sold(event) {
{
  var ss=SpreadsheetApp.getActive();
  var sh0=ss.getSheetByName('Summary');
  var rg0=sh0.getDataRange();
  var sh1=ss.getSheetByName('Sold');
  var vals=rg0.getValues();
  // The i>2 is an array of what row you want to start with
  for(var i=vals.length-1;i>1;i--)
  {
    if(vals[i][24]=='Sold')
    {
      sh1.appendRow(vals[i]);
      sh0.deleteRow(i+1)
    }
  }
}
}
