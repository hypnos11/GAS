function authenticate() {
  var oauth2Service = getOAuth2Service();
  if (!oauth2Service.hasAccess()) {
    Logger.log('Authorize:');
    var authorizationUrl = oauth2Service.getAuthorizationUrl();
    Logger.log(authorizationUrl);
  } else {
    Logger.log('Already authenticated');
    fetchData();
  }
}

function getOAuth2Service() {
  return OAuth2.createService('YouTubeAPI')
    .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')
    .setClientId('YOUR_CLIENT_ID')
    .setClientSecret('YOUR_CLIENT_SECRET')
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties())
    .setScope('https://www.googleapis.com/auth/youtube.readonly')
    .setParam('access_type', 'offline')
    .setParam('approval_prompt', 'force');
}

function authCallback(request) {
  var oauth2Service = getOAuth2Service();
  var isAuthorized = oauth2Service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function fetchData() {
  var oauth2Service = getOAuth2Service();
  var token = oauth2Service.getAccessToken();
  var apiKey = 'YOUR_API_KEY';
  var channel = 'CHANNEL_ID'; // Replace CHANNEL_ID with the ID of the channel you want to query
  var query = 'QUERY_PATTERN'; // Replace QUERY_PATTERN with the specific pattern you want to search for

  var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey +
            '&channelId=' + channel +
            '&q=' + encodeURIComponent(query) +
            '&part=snippet&type=video';

  var response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  
  var result = JSON.parse(response.getContentText());
  var items = result.items;

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();
  sheet.appendRow(['Title', 'Description', 'Video ID']);

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var title = item.snippet.title;
    var description = item.snippet.description;
    var videoId = item.id.videoId;
    sheet.appendRow([title, description, videoId]);
  }
}
