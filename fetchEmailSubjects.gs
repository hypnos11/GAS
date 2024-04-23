// Start of the GAS script
 
/*
--------------------------------------------------
Last Updated:  05/01/2019
E-mail:        hypnos11@gmail.com
--------------------------------------------------
*/
 
function onOpen() 
{
  /*
    ------------------------------------------
    Creates a custom menu at the spreadsheet.
    ------------------------------------------
  */
  
  SpreadsheetApp.getUi()
      .createMenu('Get Emails')
      .addItem('Get YouTube', 'getEmailsUsingPattern')
      .addItem('Get Mixcloud', 'getEmailsUsingPattern2')
      .addItem('Get Mixcloud Favs', 'getEmailsUsingPattern3')
      .addToUi();
}
 
function getEmailsUsingPattern()
{
  /*
    ----------------------------------------------------
    Retrieves email information using a search pattern.
    ----------------------------------------------------
  */
  
  // Set the search pattern. 
  // Subject/title example (one word search):
  const pattern = 'subject: "has subscribed to you on YouTube"';
  
  // Note, when you searching for the exact phrase (e.g. two words) the pattern should be like this:
  // Subject/title example (exact phrase):
  // const pattern = 'subject: "VBA help"';
  
  // Specific email or name of the sender:
  // const pattern = 'from: noreply@mixcloudmail.com';
  // const pattern = 'from: Disqus';
  
  // Specific email or name of the recipient:
  // const pattern = 'to: [email protected]';
  // const pattern = 'to: "Christos Samaras"';
  
  // Label example:
  // const pattern = 'label: My Engineering World';
  
  // File type example:
  // const pattern = 'has:spreadsheet';  
  
  // All emails (not recommended - it will take a lot of time):
  // const pattern = 'in: anywhere';  
  
  // For more options, check the next link:
  // https://support.google.com/mail/answer/7190
  
  // Finally, call the main function using the preferred pattern and the sheet name.
  getEmailInfo(pattern, 'YT');
  
}
 
function getEmailInfo(searchPattern, sheetName) 
{
  /*
    ---------------------------------------------------------------------------
    Retrieves email information from the associated Gmail account based on the
    input search pattern. The results are written to the preferred sheet.
    ---------------------------------------------------------------------------
  */
  
  // Check if the search pattern parameter is empty.
  if(searchPattern === '') 
  {
    Browser.msgBox('Please provide a search pattern!');
    return;
  }
  
  // Check if the sheet name parameter is empty.
  if(sheetName === '') 
  {
    Browser.msgBox('Please provide a sheet name!');
    return;
  }
  
  // Get the sheet that will contain the data.
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);  
 
  // Check that the sheet object is not null (i.e. the sheet name is correct).
  if(sheet == null)
  {
    Browser.msgBox('Invalid sheet name!');
    return;
  }
  
  // Write the headers.
  sheet.getRange('A1:D1').setValues([['Date', 'Name', 'Email', 'Subject']]);
  
  // Make the headers bold.
  sheet.getRange('A1:D1').setFontWeight('bold');
  
  // Set the first row that will contain the data (after headings).
  var startRow = 2;
  
  // Get the last row containing data (in column A).
  var lastRow = sheet.getRange("A1:A").getValues().filter(String).length;
  
  // Clear any existing data bellow the headers.
  if(lastRow > startRow)
    sheet.getRange(startRow, 1, lastRow, 4).clearContent();
    
  // Get all the threads for the specified search pattern.
  var threads =  GmailApp.search (searchPattern);
  
  // Check if there are threads for the particular search pattern.
  if(threads.length == 0)
  {
    Browser.msgBox('There are no threads for the specified pattern!');
    return;
  }
  
  // An empty array that will hold the email data.
  var emailInfo = [];
  
  // Loop through all the threads.
  for (var i = 0; i < threads.length; i++) 
  { 
    // Get all the email messages from the thread.
    var messages = threads[i].getMessages();
    
    // Loop through all the email messages.
    for (var k = 0; k < messages.length; k++) 
    {      
      // Try to get the name from the email (if possible).
      var matchesPattern = messages[k].getFrom().match(/s*"?([^"]*)"?s+<(.+)>/);
      
      // Temporary variables.
      var name;
      var email;
      
      if(matchesPattern) 
      {
        // Success, get the name and the email address.
        name = matchesPattern[1]; 
        email = matchesPattern[2]; 
      }
      else 
      {
        // Fail, get the name/email as one.
        name = 'N/A'; 
        email = messages[k].getFrom(); 
      }
 
      // Push the necessary information into the array (date, name, email, title).
      emailInfo.push([messages[k].getDate(), name, email, messages[k].getSubject()]);
    }
  }
  
  // Write the array data into the sheet.
  if(emailInfo.length > 0) 
    sheet.getRange(startRow, 1, emailInfo.length, 4).setValues(emailInfo);
  
  // Fit the width of the columns.
  sheet.autoResizeColumns(1, 4);
  
  // Inform the user about the process.
  // Browser.msgBox('Information from ' + (emailInfo.length == 1 ? '1 email' : emailInfo.length + ' emails') + ' was successfully retrieved!');
  
}
 
// End of the GAS code.
