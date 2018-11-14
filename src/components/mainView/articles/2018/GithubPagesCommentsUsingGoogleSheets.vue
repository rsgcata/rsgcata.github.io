<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2 class="articleTitle">
                    How to add comments to your Github pages blog using Google Sheets & Apps Script
                </h2>
                <p class="articleDateTime" data-dateNumber="20181111">
                    Published: Sunday, 11 November 2018
                </p>
                <br/><br/>
                <p class="articleSubTitle">
                    I know, you may ask yourself, "Why Google Sheets?"
                </p>
                <p>
                    I wanted something that was free to use, without any credit card, or hosting service involved. I will layout below some options that you may have heard of, and why I decided not to use any of them. <br/>
                </p>
                <p>
                    <b>Staticman</b> - This is a fairly easy to integrate comments system. It works by allowing the "staticman" github user to create pull requests for your Github pages repository. Your client code will send the comments to staticman which, in turn, it will create the pull request. It's really nice that this flow acts also like an approval system, not every comment will be available for everybody to see on the front end. The downside about this method is that, because staticman acts like a middle man, there is a high chance that your requests to staticman will fail. Why? Because Github API has limits of course. Github will complain when too many invitations are sent to a user, or when a user creates too many pull requests. <a href='https://github.com/eduardoboucas/staticman/issues/222'>Here</a> is a sample source for people who encountered this type problem with staticman. In my case, I could not even pass the "accept invitation" step (the response was always invalid), so I decided to look for other options. 
                </p>
                <p>
                    <b>Disqus</b> - This is probably one of the most popular blog comment hosting service. It's very flexible, robust and easy to integrate. The downside is that they will display ads along with the comments. I don't want any ads to show on my blog and probably Github may also complain about certain content that is shown on your Github pages blog. So this one was also off my list of acceptable solutions.
                </p>
                <p>
                    <b>Facebook comments</b> - This is another, very popular, blog comment hosting service. Very easy to work with, similar to Disqus. The downside for this option is that the person who wants to comment on your articles, needs to be logged in with Facebook.
                </p><br/>
                <p class="articleSubTitle">
                    The solution I preferred : Google Sheets & Apps Script
                </p>
                <p>
                    I chose this solution because: it's free, has no ads, does not require the commenter to login with a third party service, it's fairly secure compared to directly integrating with a public data store and the API limits imposed by Google are fairly decent for a small blog.
                </p><br/>
                <div>
                    <p><b style="font-size: 120%;">Implementation :</b></p>
                    <ul>
                        <li>
                            Create a new document in Google sheets. Create one <a href='https://docs.google.com/spreadsheets'>here</a>
                        </li>
                        <li>
                            Go to <a href="https://console.cloud.google.com/home/dashboard">Google cloud console</a> and create a project.
                        </li>
                        <li>
                            If it's not auto selected, select the newly created project in the dashboard. Go to <a href="https://console.cloud.google.com/apis/credentials">credentials</a> page for you project and create a new service account. Create it in json format and save the json file somewhere safe as it includes all the authorisation information needed to access Google APIs.
                        </li>
                        <li>
                            Go to <a href="https://console.cloud.google.com/apis/dashboard">APIs dashboard</a> in your could console, go ahead and enable Google Sheets API for your project.
                        </li>
                        <li>
                            Open up your json key file and copy the value from "client_email". Go back to your newly created Google sheet and share it with the email you just copied to clipboard. Don't forget to give this email edit privileges as this will be needed when sending the comments from Apps Script. Do not make the sheet public! Only you and this service account need to have access to the sheet.
                        </li>
                        <li>
                            Go to <a href="https://script.google.com/home"> Google Apps script dashboard</a> and create a new script. Add the OAuth2 library to your script by following the steps from <a href="https://github.com/gsuitedevs/apps-script-oauth2">the project's Github repository</a>. The script will act like a web app that will handle JSONP requests. Sample code below (read the code comments for detailed info):
<pre>
<code class="javascript">
// Initialise the service account credentials object. Client email and user email are the same
// because the service account will be editing the sheet where you granted access earlier to 
// service account's email
var serviceAccountKey = {
  privateKey: "your private key",
  clientEmail: "name@account-123456.iam.gserviceaccount.com",
  clientId: "1234567890",
  userEmail: "name@account-123456.iam.gserviceaccount.com"
};

// Creates the OAuth2 service object
function getOAuthService() {
  return OAuth2.createService("Service Account")
  .setTokenUrl('https://accounts.google.com/o/oauth2/token')
  
  // Sets the private key of your service account
  .setPrivateKey(serviceAccountKey.privateKey)
  
  // The issuer should be the client email from your service account
  .setIssuer(serviceAccountKey.clientEmail)
  
  // In our case, the user email is the same as the client email
  .setSubject(serviceAccountKey.userEmail)
  
  // Where to cache the data/token? In script properties
  .setPropertyStore(PropertiesService.getScriptProperties())
  
  // We need offline access
  .setParam('access_type', 'offline')
  
  // The scope must be one that allows modifications to be made to Google sheets
  .setScope('https://www.googleapis.com/auth/spreadsheets');
}

/**
 * Adds a comment to the specified sheet
 */
function addNewCommentToSheets(sheetId, comment, commenterName, articlePath, timestamp) {
  // The Google sheets API request payload object. Starting point will be column A. The position
  // is row 1 because we will append the row. In my case, row 1 is the table's header
  var valueRange = {
    range: 'A1',
    values: [
      [comment, commenterName, articlePath, timestamp]
    ]
  };
  
  // Initialise the OAuth2 service object
  var service = getOAuthService();
  
  // Only uncomment the below line for testing. It will clear the token from cache
  // service.reset();
  
  // Check if service has access and try to regenerate the token
  if (service.hasAccess()) {
    // Make a request to Google Sheets API to append a new row with comment data to the sheet
    var url = 'https://sheets.googleapis.com/v4/spreadsheets/' 
        + sheetId + '/values/A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS';
    var response = UrlFetchApp.fetch(url, {
      method: 'post',
      payload: JSON.stringify(valueRange),
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
    
    return true;
  }
  else {
    Logger.log('no oauth access');
    return false;
  }
}

// This method is required by Google Apps Script so your script can run as a web app
// This method will handle a JSONP request. So the content type will be javascript
// JSONP is required because Google Apps Script will complain regarding CORS
function doGet(event) {
  // Parse the comment data query param
  var data = JSON.parse(event.parameter.data);
  
  if(false /* Check if the request is valid. Do some input validation here if you want */) {
    var success = false;
  }
  else {
    var date = new Date();
    var timestamp = Math.floor((date.getTime()/1000));
    
    var success = addNewCommentToSheets(
      'sheet-ID-goes-here-can-be-found-in-your-sheet-url', data.comment, data.commenterName, data.articlePath, timestamp);
  }
  
  // Inform the client if the comment append request was a success or not
  // Since the response is javascript, it will be calling the method with the name that was set by the
  // client in the "callback" query parameter
  return ContentService
  .createTextOutput(event.parameter.callback + '(' + JSON.stringify({
    success: success
  }) + ')')
  .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
</code>
</pre>
                        </li>
                        <li>
                            Save the changes made to the script. Go Publish > Deploy as web app. Copy the 
                    app's url. At project version select new. Execute app as me (authorise it if required).
                    And allow anyone, even anonymous, to access your app. Click update and this is all
                    for for your Google Apps script web app. You can access it at the url that you just
                    copied to clipboard.
                        </li>
                        <li>
                            Now we need to setup the code on the client side to make calls to the newly created web app. Sample js code using JQuery ajax:
<pre>
<code class="javascript">
// JSONP request to the web app's url to store a new comment in Google Sheets
$.ajax('https://script.google.com/macros/s/appScriptID/exec', {
    method: 'GET',
    data: {
        data: JSON.stringify(commentDataObject)
    },
    dataType: 'jsonp',
    jsonp: "callback"
}).then(responseData => {
    if(responseData.success == null || responseData.success != true) {
        // Inform user that something went wrong
        console.log('Request failed');
    }
    else {
        // Inform the user that the comment was added and it's pending approval
        console.log('Comment submitted');
    }
},
() => {
    // Inform user that something went wrong
    console.log('Request failed');
});                       
</code>
</pre>
                        </li>
                        <li>
                            That's it! All done. If you followed the above steps, you are now the proud owner of a free, ads free, secure comments system. Why I say it's secure? Because nobody can access the data store where your comments reside.
                        </li>
                        <li>
                            What you have to do next is check the comments periodically in your Google Sheet,
                    save the approved comments somewhere in your Github repository and allow your app to 
                    fetch and display them. What I do is save the approved comments in a json file, for
                    every article, and load them async based on the article that the user loaded. 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import hljs from 'highlight.js';
    
    export default {
        mounted: function(){
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        },
        methods: {
            
        },
        
    };
</script>

<style>
    @import "../../../../../node_modules/highlight.js/styles/github.css";
</style>

<style scoped>
    
    .articleDateTime {
        font-style: italic;
        color: rgb(119, 119, 119);
    }
    
    .articleTitle {
        padding-left: 20px;
    }
    
    p {
        text-indent: 20px;
    }
    
    .articleSubTitle {
        font-weight: bold;
        font-style: italic;
        font-size: 110%;
    }
</style>