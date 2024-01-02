
//show record count in drop down to show which ones are open to use and need maintenance

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('selectPosition').addEventListener('change', saveSelection);
  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('accountIDInput').addEventListener('click', clearOnClick);
  document.getElementById('btnClearSettings').addEventListener('click', clearCache);
  document.getElementById('flaglink').addEventListener('click', openFlags);
  document.addEventListener("unload", windowClose);

  //automatically pull up list of options if the key is saved
  restore_options()
  getOpenPositions()
})//End loaded listener

var accountID = [];
var baseID = [];
var tempKey;
var tempbaseID;
var airtableAccountID
var airtableBases=[]
var airtableTitle
var airtableIndex
var selectedAirtable

function saveSelection(){
  var sel = document.getElementById('newSelector')
  var text = sel.options[sel.selectedIndex].text;
  var index = sel.options[sel.selectedIndex].index;
  airtableIndex=''
  airtableIndex=index
  console.log(airtableIndex)
  chrome.storage.local.set({
    airtableIndex
  }, function() {});

  if(airtableIndex != undefined){
    selectedAirtable=''
    selectedAirtable=airtableBases[airtableIndex][0]
    chrome.storage.local.set({
      selectedAirtable
    }, function() {});

    chrome.runtime.sendMessage({
      directive: "sendIndexToBackground"
    }, function(response) {});

    document.getElementById('baseLink').innerHTML = 'Table Link: </br></br> <a target="_blank" href="https://airtable.com/'+airtableBases[airtableIndex][0]+'">'+airtableBases[airtableIndex][1]+' - '+airtableBases[airtableIndex][2]+'</a>';
      location.reload()
  }else{
    document.getElementById('baseLink').innerText = "";
  }

}

function loadSelection(){
  chrome.storage.local.get({
    airtableIndex: [],
    selectedAirtable:[]
  }, function(data) {
    airtableIndex = data.airtableIndex;
    selectedAirtable = data.selectedAirtable;

    if(airtableIndex.length!=0){
      saveAirtable(selectedAirtable)
      addSelectionToForm(airtableIndex);
    }

  });

  function saveAirtable(selectedAirtable){
    chrome.storage.local.set({
      selectedAirtable
    }, function() {});

  }

}
function addSelectionToForm(selection) {
  if(selection.length != 0){
    if(document.getElementById('newSelector')!=null){
        document.getElementById('newSelector').selectedIndex=selection

       document.getElementById('baseLink').innerHTML = 'Table Link: </br></br> <a target="_blank" href="https://airtable.com/'+airtableBases[selection][0]+'">'+airtableBases[selection][1]+' - '+airtableBases[selection][2]+'</a>';
    }
  }
}

//Clears our local cache for testing reasons
function clearCache() {
  console.log("Clearing the local and sync cache!");

  localStorage.removeItem("justOnce");

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

  location.reload()
}

//Start Function Chain to grab and set apiKey text to our form
function getAPIKey() {
    tempKey = document.getElementById('accountIDInput').value;
    if(tempKey!=''||undefined||'Please enter your Account ID'){
      if (accountID.indexOf(tempKey) == -1) {
        addKeyToList(tempKey);
      }
    }
}

function addKeyToList(tempKey) {
  if (accountID.indexOf(tempKey) === -1) {
    accountID.push(tempKey);
    saveApiKey();
  }
}
function saveApiKey(callback) {
  chrome.storage.local.set({
    accountID
  }, function() {});

  reload()
}

function setApiKey() {
  chrome.storage.local.get({
    accountID: []
  }, function(data) {
    accountID = data.accountID;
    var key = accountID[accountID.length - 1];
    addKeyToForm(key);
  });
}

function addKeyToForm(key) {
  if(key != undefined){
    document.getElementById('accountIDInput').value = key;

  }else{
    document.getElementById('accountIDInput').value = "Please enter your Account ID";
  }
}

function reload() {
  if (! localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        window.location.reload();
  }
}

// Saves options to chrome.storage
function save_options() {
  getAPIKey();
  loadSelection()
}

// Restores select box and checkbox state using the preferences
function restore_options() {
  setApiKey();
}

function clearOnClick(){
  if(document.getElementById('accountIDInput').value == "Please enter your Account ID"){
    document.getElementById('accountIDInput').value = "";
  }
}

function loadOnClick(){
    var selectTag = document.createElement("select");
    selectTag.setAttribute("id", "newSelector");
    var baseCount = airtableBases.length;

    var optEle = document.createElement("option");
    var div = document.getElementById("selectPosition");

    for (let optObj of airtableBases) {
        let optEle = document.createElement("option");
        optEle.text = optObj[1]+' - '+optObj[2];
        selectTag.add(optEle);
    }

    if(div.getElementsByTagName('select').length==0){
      if(selectTag.length>0){
          div.appendChild(selectTag);
          document.getElementById('baseLink').innerHTML = 'Table Link: </br></br> <a target="_blank" href="https://airtable.com/'+airtableBases[0][0]+'">'+airtableBases[0][1]+' - '+airtableBases[0][2]+'</a>';
          reload()
      }
    }
}

function openFlags(){
  chrome.runtime.sendMessage({
    directive: "openFlags"
  }, function(response) {});
}

function getOpenPositions(){
  var tableBase = 'Insert Airtable Base ID here'
  var bearerKey = 'Insert Airtable API key here'
  fetch(
    "https://api.airtable.com/v0/"+tableBase+"/Bases",
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+bearerKey
      },
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Something went wrong');
    }
  })
  .then(rawResponse => {
    var recordLength=rawResponse.records.length
    if(recordLength>0){
      //our base isn't empty
      for(i=0;i<recordLength;i++){
        airtableAccountID=rawResponse.records[i].fields.accountID
        if(accountID==airtableAccountID){
          if(airtableBases.indexOf(rawResponse.records[i].fields.baseID)==-1){
            airtableBases.push([rawResponse.records[i].fields.baseID,rawResponse.records[i].fields.Company,rawResponse.records[i].fields['Job Title']])
          }
        }
      }
      loadOnClick()
      loadSelection()
    }else{
      //our base is empty
    }
  })
  .catch(error => {
    console.log('Error', error);
  });
}

function windowClose(){
  localStorage.removeItem("justOnce");
}
