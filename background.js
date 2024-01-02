

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function openFlagTab() {
  chrome.tabs.create({
    url: 'chrome://flags/#calculate-native-win-occlusion',
    active: false
  }, tab => {});
}


//Global Variables
var buttonStatus = [];
var profileViewCounter = [];
var profileSaveCounter = [];
var profileViewCounterFromStorage;
var profileSaveCounterFromStorage;
var ignoreLimitValue = [];
var hidingViewsValue = [];
var selectedAirtable
var ignorelimit
var skipViewedProfile
var collectSimProfiles
var collectOpenToWorkProfiles
var openToWorkBuilderArray
var currentTabID

var oldURL
var newURL
var unfurled
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
      if (currentTabID == tab.id) {
        var oldtabUrlReplace = oldURL.replace('#', '')
        var newtabUrlReplace = (tab.url).replace('#', '')
        if (oldtabUrlReplace != newtabUrlReplace) {
          chrome.storage.local.get({
            unfurled: []
          }, function(data) {
            unfurled = data.unfurled
            if (unfurled == true) {
              runnewContentScript()
            }
          });
        }
      }
    // }
  }
});
//Run our scraping script
var arrayStatsGlobal
function runnewContentScript() {
  oldURL = ''
  currentTabID = ''
  chrome.storage.local.get({
    buttonStatus: [],
    arrayStatsGlobal: []
  }, function(data) {
    buttonStatus = data.buttonStatus;
    arrayStatsGlobal = data.arrayStatsGlobal;
    if (buttonStatus == 'Stop') {
      getTab()
    } else {
      console.log('Looks like we shouldn\'t be running!')
    }
    async function getTab() {
      var getting = chrome.windows.getCurrent({
        populate: true
      });
      getting.then(logTabs);

      function logTabs(windowInfo) {
        if (windowInfo.tabs[0].active == true) {
          currentTabID = windowInfo.tabs[0].id
          oldURL = windowInfo.tabs[0].url
          console.log("Running FoxHunt Script")
          chrome.scripting.executeScript({
            target: {
              tabId: currentTabID
            },
            files: ['foxhunt.js']
          });

          unfurled = false;
          chrome.storage.local.set({
            unfurled
          });
        }
      }
    }

  });
}



//send main lead to airtable
function sendToAirtable(incomingData) {
  var myHeaders = new Headers();
  apiKeyHolder = [];
  baseID = [];
  chrome.storage.local.get({
    apiKeyHolder: []
  }, function(data) {
    apiKeyHolder = data.apiKeyHolder;
    var apiKey = apiKeyHolder[apiKeyHolder.length - 1];
    if (apiKeyHolder != undefined) {
      myHeaders.append("Authorization", 'Bearer ' + apiKey);
    } else {
    }
  });
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(incomingData);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  chrome.storage.local.get({
    selectedAirtable: []
  }, function(data) {
    baseID = data.selectedAirtable;
    if (baseID != undefined) {
      fetch('https://api.airtable.com/v0/' + baseID + '/Leads', requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
    } else {
      console.log("Please enter a valid Base ID")
    }
  });
}

//Send similar profiles to airtable
function sendSimLeadsToAirtable(incomingData) {
  var myHeaders = new Headers();
  apiKeyHolder = [];
  baseID = [];
  chrome.storage.local.get({
    apiKeyHolder: []
  }, function(data) {
    apiKeyHolder = data.apiKeyHolder;
    var apiKey = apiKeyHolder[apiKeyHolder.length - 1];
    if (apiKeyHolder != undefined) {
      myHeaders.append("Authorization", 'Bearer ' + apiKey);
    } else {
    }
  });

  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(incomingData);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  chrome.storage.local.get({
    selectedAirtable: []
  }, function(data) {
    baseID = data.selectedAirtable;
    if (baseID != undefined) {
      fetch('https://api.airtable.com/v0/' + baseID + '/SimilarProfiles', requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
    } else {
      console.log("Please enter a valid Base ID")
    }
  });
}

//Send OpenToWork profiles to airtable
function sendOpenToWorkToAirtable(incomingData) {
  var myHeaders = new Headers();
  apiKeyHolder = [];
  baseID = [];
  chrome.storage.local.get({
    apiKeyHolder: []
  }, function(data) {
    apiKeyHolder = data.apiKeyHolder;
    var apiKey = apiKeyHolder[apiKeyHolder.length - 1];
    if (apiKeyHolder != undefined) {
      myHeaders.append("Authorization", 'Bearer ' + apiKey);
    } else {
    }
  });

  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(incomingData);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  chrome.storage.local.get({
    selectedAirtable: []
  }, function(data) {
    baseID = data.selectedAirtable;
    if (baseID != undefined) {
      fetch('https://api.airtable.com/v0/' + baseID + '/OpenToWork', requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));

    } else {
      console.log("Please enter a valid Base ID")
    }
  });
}

//Grab the lead we need to send from storage then send it
function getDataFromStorage() {
  chrome.storage.local.get({
    leadData: []
  }, function(leadData) {
    leadData = leadData.leadData;
    if (leadData != undefined) {
      sendToAirtable(leadData)
    }
  });
}

function getIndexFromStorage() {
  selectedAirtable = ''
  chrome.storage.local.get({
    selectedAirtable: []
  }, function(leadData) {
    selectedAirtable = leadData.selectedAirtable;
  });
}
//Function chain to check if we should be running
function getFormSettings() {
  chrome.storage.local.get({
    buttonStatus: [],
    skipViewedProfile: [],
    collectSimProfiles: [],
    collectOpenToWorkProfiles: []

  }, function(data) {
    buttonStatus = data.buttonStatus;
    skipViewedProfile = data.skipViewedProfile;
    collectSimProfiles = data.collectSimProfiles;
    collectOpenToWorkProfiles = data.collectOpenToWorkProfiles;
  });
}

function getSimilarLeadsFromStorage() {
  var fullName;
  var title;
  var company;
  var currentLocation;
  var connectionDegree;
  var profileImage;
  var recruiterURL;
  var uniqueSimID;
  var connectionSimDegree;

  similarProfile = []
  chrome.storage.local.get({
    similarProfiles: []
  }, function(similarProfiles) {
    similarProfiles = similarProfiles.similarProfiles;
    if (similarProfiles.length > 0) {
      for (var i = 0; i < similarProfiles.length; i++) {
        fullName = similarProfiles[i][0];
        title = similarProfiles[i][1];
        company = similarProfiles[i][2];
        currentLocation = similarProfiles[i][3];
        recruiterURL = similarProfiles[i][4];
        profileImage = similarProfiles[i][5];
        connectionSimDegree = similarProfiles[i][6]
        uniqueSimID = similarProfiles[i][7]

        let leadData = {
          "records": [{
            "fields": {
              "Full Name": fullName,
              "Title": title,
              "Company": company,
              "Location": currentLocation,
              "Connection Degree": connectionSimDegree,
              "Profile Image": profileImage,
              "Recruiter URL": recruiterURL,
              "uniqueSimID": uniqueSimID
            }
          }]
        };

        if (leadData != undefined) {
          sendSimLeadsToAirtable(leadData)
        }
      }
    }
  });
}

function getOpenToWorkLeadsFromStorage() {
  var fullName;
  var titles;
  var jobTypes;
  var locations;
  var workplaceType;
  var recruiterURL;
  var skills;
  var title;
  openToWorkBuilderArray = []

  chrome.storage.local.get({
    openToWorkBuilderArray: []
  }, function(openToWorkBuilderArray) {
    openToWorkBuilderArray = openToWorkBuilderArray.openToWorkBuilderArray;
    if (openToWorkBuilderArray.length > 0) {

      fullName = openToWorkBuilderArray[0];
      titles = openToWorkBuilderArray[1];
      jobTypes = openToWorkBuilderArray[2];
      locations = openToWorkBuilderArray[3];
      workplaceType = openToWorkBuilderArray[4];
      recruiterURL = openToWorkBuilderArray[5];
      skills = openToWorkBuilderArray[6];
      title = openToWorkBuilderArray[7];
      company = openToWorkBuilderArray[8];
      currentPositionLength = openToWorkBuilderArray[9];
      totalNumOfYears = openToWorkBuilderArray[10];
      linkedIn = openToWorkBuilderArray[11];
      industry = openToWorkBuilderArray[12];
      let leadData = {
        "records": [{
          "fields": {
            "Full Name": fullName,
            "Title": title,
            "Wanted Titles": titles,
            "Job Types": jobTypes,
            "Locations": locations,
            "Workplace Types": workplaceType,
            "Recruiter Link": recruiterURL,
            "Skills": skills,
            "Company": company,
            "Current Position Length": currentPositionLength,
            "Years of Experience": totalNumOfYears,
            "Public Link": linkedIn,
            "Industry": industry,
          }
        }],
        "typecast": true
      };
      if (leadData != undefined) {
        sendOpenToWorkToAirtable(leadData)
      }
    }
  });
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.directive) {

      case "runContentScriptStart":
        getIndexFromStorage()
        getFormSettings()
        runnewContentScript()

        sendResponse({}); // sending back empty response to sender
        break;

      case "runContentScriptStop":
        
        getFormSettings()

        sendResponse({}); // sending back empty response to sender
        break;

      case "sendToBackground":
        getDataFromStorage()

        sendResponse({}); // sending back empty response to sender
        break;


      case "sendToSimilarLeads":
        getSimilarLeadsFromStorage()

        sendResponse({}); // sending back empty response to sender
        break;

      case "sendToOpenToWorkLeads":
        getOpenToWorkLeadsFromStorage()

        sendResponse({}); // sending back empty response to sender
        break;


      case "sendIndexToBackground":
        getIndexFromStorage()

        sendResponse({}); // sending back empty response to sender
        break;

      case "openFlags":
        openFlagTab()

        sendResponse({}); // sending back empty response to sender
        break;

      default:
        //console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
    }
  }
);
