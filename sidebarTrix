// You usually need something to click on to trigger the function. I've put it in the toolbar
function onOpen() {
 SpreadsheetApp
   .getUi()
   .createMenu("Fishing Tools")
   .addItem("Butterfly knife", "startForm")
   .addToUi();
}

// Reference https://developers.google.com/apps-script/reference/html/html-service
// The startForm is your doGet function
function startForm() {
  // Need to create a HTML file called dropdownList.html
  var form = HtmlService.createHtmlOutputFromFile('dropdownList');
  form.setTitle("Butterfly Knife");
  SpreadsheetApp.getUi().showSidebar(form);
}
