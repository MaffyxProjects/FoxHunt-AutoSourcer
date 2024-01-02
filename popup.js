//Runs on popup load
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buttonStartStop').addEventListener('click', clickHandler );
  document.getElementById('buttonDiversityCheck').addEventListener('click', runDiversityChecker );
loadSettings()
})//End loaded listener

//Save our current forms, helps with field preservation when changing settings
var skipViewedProfile
var collectSimProfiles
var collectOpenToWorkProfiles
var buttonStatus


function saveSettings(){
   skipViewedProfile = document.getElementById('skipViewedProfile').checked
   collectSimProfiles = document.getElementById('collectSimProfiles').checked
   collectOpenToWorkProfiles = document.getElementById('collectOpenToWorkProfiles').checked

   if (document.getElementById('buttonStartStop').innerText == "Start")
   {
      buttonStatus='Start'
   }
   else if (document.getElementById('buttonStartStop').innerText == "Stop")
   {
      buttonStatus='Stop'
   }else{
     buttonStatus='Start'
   }

   chrome.storage.local.set({
     buttonStatus,
     skipViewedProfile,
     collectSimProfiles,
     collectOpenToWorkProfiles
   });
}

function loadSettings(){
  chrome.storage.local.get({
    skipViewedProfile: [],
    collectSimProfiles: [],
    collectOpenToWorkProfiles: [],
    buttonStatus: []
  }, function(data) {
    skipViewedProfile = data.skipViewedProfile;
      if(skipViewedProfile==true){
        document.getElementById('skipViewedProfile').setAttribute('checked', 'checked');
      }else{
        document.getElementById('skipViewedProfile').removeAttribute('checked');
      }
    collectSimProfiles = data.collectSimProfiles;
    if(collectSimProfiles==true){
      document.getElementById('collectSimProfiles').setAttribute('checked', 'checked');
    }else{
      document.getElementById('collectSimProfiles').removeAttribute('checked');
    }
    collectOpenToWorkProfiles = data.collectOpenToWorkProfiles;
    if(collectOpenToWorkProfiles==true){
      document.getElementById('collectOpenToWorkProfiles').setAttribute('checked', 'checked');
    }else{
      document.getElementById('collectOpenToWorkProfiles').removeAttribute('checked');
    }
    buttonStatus = data.buttonStatus;
    if(buttonStatus=='Start'){
      document.getElementById('buttonStartStop').innerText = "Start";
    }else if(buttonStatus=='Stop'){
      document.getElementById('buttonStartStop').innerText = "Stop";
    }
  });
}

//Called on Start/Stop button click, sends messages to background.js that we need to do something
function clickHandler() {
    if (document.getElementById('buttonStartStop').innerText == "Start")
    {
      chrome.runtime.sendMessage({directive: "runContentScriptStart"}, function(response) {});
    }
    else if (document.getElementById('buttonStartStop').innerText == "Stop")
    {
      chrome.runtime.sendMessage({directive: "runContentScriptStop"}, function(response) {});
    }
    //Change button text
    toggleText();

    //save everything
    saveSettings();
}

//Changes text on the button for us
function toggleText(){
   if (document.getElementById('buttonStartStop').innerText == "Start")
   {
      document.getElementById('buttonStartStop').innerText = "Stop";
   }
   else if (document.getElementById('buttonStartStop').innerText == "Stop")
   {
      document.getElementById('buttonStartStop').innerText = "Start";
   }
   else {
       document.getElementById('buttonStartStop').innerText = "Start";
   }
}

//Clears our local cache for testing reasons
function clearCache(){
  chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
  });
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
  });
}
