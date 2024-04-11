// https://productforums.google.com/forum/#!topic/docs/_gWVent33eA;context-place=forum/docs
// Added a little bit of onEdit trigger to this so I don't have to manually edit the tile from the addMenu
// Manually create the Trigger if it doesn't go automagically.
function OnEdit() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var chart = sheet.getCharts()[0];
  var preTitle = 'LTD';
  chart = chart.modify().setOption('title', sheet.getRange('A1' ).getValue() || 'Empty')
  .build();
  sheet.updateChart(chart);
}

// This is supposed to be getTitle
// This got deleted somehow.
// 20190223 - Come back and hack this up later to make it work again.
function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var chart = sheet.getCharts()[0];
  chart = chart.modify()
  .setOption('title', sheet.getActiveCell().getValue() || 'Empty')
  .build();
  sheet.updateChart(chart);
}
