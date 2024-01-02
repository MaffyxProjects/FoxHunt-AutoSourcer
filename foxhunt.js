
  if (document.readyState === 'complete') {
    //Checking to see what page we're on so we can properly direct where we need to go
   
    //Profile Page
    var profilePageType;
    if(window.location.href.indexOf("https://www.linkedin.com/talent/search/profile/") != -1){
      profilePageType='searchResult';
    }else if(window.location.href.indexOf("https://www.linkedin.com/talent/hire/") != -1){
      profilePageType='projectResult';
    }

    if (profilePageType==('searchResult')||('projectResult')) {
      console.clear()

    console.log('FoxHunt Loaded')

    humanizer()
    }
  }


//randomizes the amount of time before interacting with the profile.
var profile1
var profile2
function humanizer(){
  unfurled=false;
  chrome.storage.local.set({
    unfurled
  });
  var statsTest = document.getElementsByClassName('skyline-pagination__pagination-text')
  if(statsTest.length != 0||null||undefined){
    var htmlString = document.getElementsByClassName('skyline-pagination__pagination-text')[0].childNodes[2].innerText;
    var arrayStats = htmlString.split(' of ');
    var statsBlock1 = arrayStats[0]
    var statsBlock2 = arrayStats[1]
    statsBlock1=parseInt(arrayStats[0].replace(/,/g, ''))
    statsBlock2=parseInt(arrayStats[1].replace(/,/g, ''))
    var randomWait = getRandomInt(7000, 15000);
    console.log('Waiting '+(randomWait/1000)+' seconds until we check the profile!')
  }
  var unfurlRunTimer
  function unfurlRUnTimer(){
    unfurlRunTimer = setTimeout(function() {
        unfurl()
       clearTimeout(unfurlRunTimer);
  }, randomWait);
  }
    unfurlRUnTimer()
}

//clicks all the 'see more' related buttons
var unfurled
function unfurl(){
  //summary section
  try {
    var summaryBox = document.getElementsByClassName("component-card summary-card");
    if(summaryBox[0]!=undefined){
      var summarySeeMoreButton = summaryBox[0].getElementsByClassName('lt-line-clamp__more');
      if(summarySeeMoreButton.length>0){
          summarySeeMoreButton[0].click()
      }
      var summaryBox = document.getElementsByClassName("component-card summary-card");
      var openToWorkButton = summaryBox[0].getElementsByClassName('accordion-header__button ')
      if(openToWorkButton.length>0){
        if(openToWorkButton[0].getElementsByClassName('accordion-header__icon')[0].getAttribute('type').indexOf('chevron-down-icon')!=-1){
          openToWorkButton[0].click()
       }
      }
    }
  } catch (error) {
    //  console.log(error)
   
  }

  //skills
  try {
    var skillsOnPage = document.getElementsByClassName("expandable-list expandable-stepper expandable-list-profile-core component-card skills-card-expandable");
    if(skillsOnPage.length>0){
      var skillsbutton = skillsOnPage[0].getElementsByClassName('expandable-list__button');
      for(i=0;i<15;i++){
        if(skillsbutton.length!=0){
          if(skillsbutton[0]!=undefined){
            if(skillsbutton[0].innerText.indexOf('more')!=-1){
                skillsbutton[0].click()
            }
          }
        }
      }
    }

  } catch (error) {
    // console.log(error)
  }

  // accomplishments
  try{
    var accomplishmentsBoxTest = document.getElementsByClassName('accomplishments-expandable-list ember-view')
    var accomplishmentListCount = accomplishmentsBoxTest.length
    for(i=0;i<accomplishmentListCount;i++){
      var accompShowMoreButtons = accomplishmentsBoxTest[i].getElementsByClassName('expandable-list__button')
        for(j=0;j<15;j++){
          if(accompShowMoreButtons.length!=0){
            if(accompShowMoreButtons[0]!=undefined){
             if(accompShowMoreButtons[0].innerText.indexOf('Show more')!=-1){
                 if(accompShowMoreButtons[0]!=undefined){
                   accompShowMoreButtons[0].click()
                 }
             }
           }
          }
        }
    }

  } catch (error){
    // console.log(error)
  }

  //languages
  try {
    var languageBox = document.getElementsByClassName("expandable-list expandable-stepper accomplishments-expandable-list__list-container");
    if(languageBox.length>0){
      if(languageBox[1]!=undefined){
        var langbutton = languageBox[1].getElementsByClassName('expandable-list__button');
        for(i=0;i<3;i++){
          if(langbutton.length!=0){
            if(langbutton[0]!=undefined){
              if(langbutton[0].innerText.indexOf('Show more')!=-1){
                    langbutton[0].click()
              }
            }
          }
        }
      }
    }
  } catch (error) {
    // console.log(error)
  }

  //experience
  try{
    var experienceBoxTest = document.getElementsByClassName('background-section experience-card ember-view')
    var experienceShowMoreButtons = experienceBoxTest[0].getElementsByClassName('expandable-list__button')
    if(experienceShowMoreButtons.length>0){
      for(i=0;i<15;i++){
        if(experienceShowMoreButtons.length!=0){
          if(experienceShowMoreButtons[0]!=undefined){
            if(experienceShowMoreButtons[0].innerText.indexOf('Show more')!=-1){
                  experienceShowMoreButtons[0].click()
            }
          }
        }
      }
    }

  } catch (error){
    // console.log(error)
  }

  //education
  try{
    var eduBoxTest = document.getElementsByClassName('background-section education-card ember-view')
    if(eduBoxTest.length>0){
      var eduShowMoreButtons = eduBoxTest[0].getElementsByClassName('expandable-list__button')
      for(i=0;i<5;i++){
        if(eduShowMoreButtons.length!=0){
          if(eduShowMoreButtons[0]!=undefined){
            if(eduShowMoreButtons[0].innerText.indexOf('Show more')!=-1){
                  eduShowMoreButtons[0].click()
            }
          }
        }
      }
    }
  } catch (error){
    // console.log(error)
  }

  //recommendations
  try {
    var recoBox = document.getElementsByClassName("expandable-list expandable-stepper component-card component-card--with-list recommendations-card expandable-list-profile-core");
    if(recoBox[0]!=undefined){
      var recoShowMoreButton = recoBox[0].getElementsByClassName('expandable-list__button')

      for(k=0;k<5;k++){
        if(recoShowMoreButton.length!=0){
          if(recoShowMoreButton[0]!=undefined){
            if(recoShowMoreButton[0].innerText.indexOf('Show more')!=-1){
                   recoShowMoreButton[0].click()
            }
          }
        }
      }


   function subListClick(){
     var recommendationsBox = document.getElementsByClassName("expandable-list expandable-stepper component-card component-card--with-list recommendations-card expandable-list-profile-core");
     var recommendationsList = recommendationsBox[0].getElementsByClassName("component-card__list");
     var recommendationItems = recommendationsList[0].getElementsByClassName('recommendation recommendations-card__list-item ember-view')
     var recListCount = recommendationItems.length

     for(k=0;k<5;k++){
       if(recommendationItems.length!=0){
         if(recommendationItems[k]!=undefined){
           var recoLink = recommendationItems[k].getElementsByTagName('a')
           if(recoLink[0].innerText.indexOf('See more')!=-1){
                recoLink[0].click()
           }
         }
       }
     }
   }
     subListClick()
  }
} catch (error) {
 // console.log(error)
}

  //interests
  try {
    var interestBox = document.getElementsByClassName("following ember-view");
    if(interestBox.length>0){
      var interestButton = interestBox[0].getElementsByClassName('expandable-list__button');
          for(i=0;i<10;i++){
            if(interestButton.length!=0){
              if(interestButton[0]!=undefined){
                if(interestButton[0].innerText.indexOf('Show more')!=-1){
                  interestButton[0].click()
                }
              }
            }
          }
    }
  } catch (error) {
    // console.log(error)
  }

  unfurled=true;
  chrome.storage.local.set({
    unfurled
  });
  getStartStopStatus()
}

//Global Variables
var fullName;
var company;
var title;
var linkedIn;
var emails;
var school;
var fieldOfStudy=[];
var currentLocation;
var industry
var summary;
var experience;
var skills;
var volunteerExp=[];
var certifications=[];
var awards=[];
var listedProjects=[];
var recommendations=[];
var connectionNum;
var following=[];
var languages=[];
var recruiterViews;
var websites=[];
var foundWebsites;
var combinedSites=[];
var recruiterURL;
var connections;
var profileImageURL;
var yearsOfExp;
var connectionSimDegree;
var degreeArray=[];
var openToOpportunities;
var profileLength;
var doNotContact;
var contractorConsultant;
var highestDegree;
var onProfilePage;
var onResultsPage;
var onLoginPage;
var similarProfiles=[];
var alsoViewedProfiles=[];
var recLeads=[];
var extraProfileName;
var extraProfileCompany;
var extraProfileTitle;
var extraProfileLocation;
var extraProfileURL;
var extraProfileImageURL;
var extraProfileConnectionDegree;
var uniqueID;
var uniqueSimID;
var uniqueRecID;
var images=[];
var avgPerPosition;
var totalNumOfYears;
var shortStint;
var myImage;
var positions=[];
var courses=[];
var patents=[]
var publications=[]
var hidingViewsValue = [];
var hidingViewsStatus;
var checkStatus;
var ignoreStatusFromCache;
var arrayStatsGlobal = [];
var arrayStatsGlobal2 = [];

var highestDegreeDisplay;
var apiKeyHolder = [];
var baseID = [];
var currentPositionLength;
var currentCompanyLength

//Common functions//////////////////////////////////////////////////////////////////////////////
//Randomizing function for botlike antimeasure timer

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Convert to Title Case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//Word Count
function WordCount(str) {
  return str.split(" ").length;
}

function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

function removeDuplicates(array) {
  let x = {};
  array.forEach(function(i) {
    if(!x[i]) {
      x[i] = true
    }
  })
  return Object.keys(x)
};

function deDupeTwo(data){
  let incData = [...new Set(data)]
  return incData;
}


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


//Check text for URls
function findUrls( text ){
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    function escapeRegex(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // Regular expression to find FTP, HTTP(S) and email URLs.
    var regexToken = /(((ftps|ftp|http|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
    var secondRun =  /([^\S]|^)((www\.)(\S+))/gi
    var thirdRun   = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
    var fourthRun   = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi

    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }
    while( (matchArray = secondRun.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }
    while( (matchArray = thirdRun.exec( source )) !== null )
    {
        var token = matchArray[0];
        token = token.replace(/\r?\n|\r/g,'')
        if(urlArray.indexOf(token)==-1){
            urlArray.push(token);
        }
    }
    while( (matchArray = fourthRun.exec( source )) !== null )
    {
        var token = matchArray[0];
        token = token.replace(/\r?\n|\r/g,'')
        if(urlArray.indexOf(token)==-1){
            urlArray.push(token);
        }
    }

    removeItemAll(urlArray,'lynda.com')
    removeItemAll(urlArray,'Lynda.com')
    removeItemAll(urlArray,'LinkedIn.com')
    removeItemAll(urlArray,'Node.js')
    removeItemAll(urlArray,'Node.js ')
    removeItemAll(urlArray,'React.js')
    removeItemAll(urlArray,'React.js ')
    removeItemAll(urlArray,'Redux.js')
    removeItemAll(urlArray,'node.js')
    removeItemAll(urlArray,'react.js')
    removeItemAll(urlArray,'redux.js')
    removeItemAll(urlArray,'365.com')
    removeItemAll(urlArray,'years.She')
    removeItemAll(urlArray,'AnitaB.org')
    removeItemAll(urlArray,"Colloquy360.com-")
    removeItemAll(urlArray,"IvyExec.com")
    removeItemAll(urlArray,"Tiegether.com")
    removeItemAll(urlArray,"Vue.js")
    removeItemAll(urlArray,"Diamond.com")
    removeItemAll(urlArray,"Connect365.io")
    removeItemAll(urlArray,".js")
    removeItemAll(urlArray,"B.A")
    removeItemAll(urlArray,"Vue.js")
    removeItemAll(urlArray,"vue.js")
    removeItemAll(urlArray,"Express.js")
    removeItemAll(urlArray,"Socket.io")
    removeItemAll(urlArray,"ASP.NET")
    removeItemAll(urlArray,"ASP.net")
    removeDuplicates(urlArray)
    return urlArray;
}


//page refresh timer in case it hangs
  var resetTimer
function setResetTimer(){
    console.log("Setting Page Refresher to reload in 2 minutes!");

  function resetTimer(){
    resetTimer = setTimeout(function() {

    console.log("Looks like our page timed out, refreshing page!")
    clearTimeout(resetTimer);
    location.reload();
  }, 120000);
  }
    resetTimer()
}

//////////////////////////////////////////////////////////////////////////////////////////////
//Collecting Data
function scrapeData(){
  console.log("Collecting profile information!")
  //Recruiter URL
  try {
    var urlHolder = document.URL
    if(urlHolder.indexOf('search')!=-1){
      if(urlHolder.indexOf('?')!=-1){
        var splitHolder = urlHolder.split('?')
        recruiterURL=splitHolder[0]
      }else{
        recruiterURL = document.URL
      }
    }else if(urlHolder.indexOf('hire')!=-1){
      if(urlHolder.indexOf('?')!=-1){
        var splitHolder = urlHolder.split('?')
        recruiterURL=splitHolder[0]
      }else{
        recruiterURL = document.URL
      }
    }else{
      recruiterURL = document.URL
    }
  } catch (error) {
    recruiterURL = ''
  }

  //Full Name
  try {
    var nameBox=document.getElementsByClassName("topcard-condensed ember-view")
    fullName = nameBox[0].getElementsByClassName("artdeco-entity-lockup__title ember-view")[0].innerText
  } catch (error) {
    fullName = ''
  }

  //industry
  try {
    var industryHold = document.getElementsByClassName('topcard-condensed__content-left')[0]
    if(industryHold!=undefined){
      var lockupEmberView = industryHold.getElementsByClassName('artdeco-entity-lockup__metadata ember-view')[0]
      if(lockupEmberView!=undefined){
        if(lockupEmberView.childNodes[5]!=undefined){
          var tempString = lockupEmberView.childNodes[5].innerText
          if(tempString!=undefined){
            if(tempString.indexOf(/[·]/g)!=-1){
              tempString=tempString.replace(/[·]/g, '').trim();
            }
          }else{
            industry=''
          }
          industry=tempString;
        }
      }
    }else{
      industry=''
    }
  } catch (error) {
    industry = "";
  }

  //Public URL
  try {
    linkedIn = document.getElementsByClassName("personal-info__link")[0].href;
  } catch (error) {
    linkedIn = '';
  }

  //School
  try {
     var checkEducation = document.getElementsByClassName("background-section education-card ember-view");
     if(checkEducation[0]!=undefined){
       var educationBlock = checkEducation[0].getElementsByClassName('background-section__list');
       var educationPosition = educationBlock[0].getElementsByClassName('background-entity education-item recommendations-card__list-item ember-view');
       var educationPositionCount = educationPosition.length;

       for(i=0;i<educationPositionCount;i++){
          var positionBuilder;
          var positionDegreeHolder;
          var positionDegreeFieldHolder;
          var positionDateRangeHolder;
          var positionSummaryHolder;
          var positionActivitiesHolder;
          var positionHeader = educationPosition[i]
          if(positionHeader.getElementsByTagName("h3")[0]!=undefined){
            var positionTitle = positionHeader.getElementsByTagName("h3")[0].innerText
            if(positionHeader.getElementsByTagName("h3")[0].childNodes[2].href!=undefined){
              var positionURL = positionHeader.getElementsByTagName("h3")[0].childNodes[2].href;
            }else{
              var positionURL = ''
            }
          }else{
            positionTitle='No Title Found'
          }

          if(positionHeader.getElementsByClassName('background-entity__summary-definition--date-duration')!=undefined){
            var positionDateRange = positionHeader.getElementsByClassName('background-entity__summary-definition--date-duration');
          }else{
            positionDateRange=''
          }

          if(positionDateRange.length!=0){
            positionDateRangeHolder=positionDateRange[0].innerText;
          }else{
            positionDateRangeHolder=''
          }

          if(positionHeader.getElementsByClassName("degree-summary__description").length!=0){
            var positionDegree = positionHeader.getElementsByClassName("degree-summary__description")[0].childNodes[1]
          }else{
            positionDegree=''
          }

          if(positionHeader.getElementsByClassName("degree-summary__description")[1]!=undefined){
            var positionDegreeField = positionHeader.getElementsByClassName("degree-summary__description")[1]
          }else{
            positionDegreeField=''
          }

          if(positionDegree!=''){
            positionDegreeHolder=positionHeader.getElementsByClassName("degree-summary__description")[0].childNodes[1].innerText
          }else{
            positionDegreeHolder='No Degree Found'
          }

          if(positionDegreeField!=''){
            positionDegreeFieldHolder=positionHeader.getElementsByClassName("degree-summary__description")[1].innerText
            positionDegreeFieldHolder=positionDegreeFieldHolder.toString();
            if(positionDegreeFieldHolder!=undefined){
              if(fieldOfStudy.indexOf(positionDegreeFieldHolder)==-1){
                fieldOfStudy.push(positionDegreeFieldHolder)
              }

            }else{
              fieldOfStudy=''
            }
          }else{
            positionDegreeFieldHolder=''
          }

          if(positionHeader.getElementsByClassName("background-entity__summary-definition--description").length!=0){
            var summaryBlock = positionHeader.getElementsByClassName("background-entity__summary-definition--description");

          }else{
            summaryBlock=''
          }

          if(summaryBlock!=''){
            if(summaryBlock[0]!=undefined){
              positionSummaryHolder= summaryBlock[0].innerText+'\n'
            }else{
              positionSummaryHolder=''
            }
          }else{
            positionSummaryHolder=''
          }

          if(positionURL!=''){
            positionBuilder="### ["+positionTitle+"]"+"("+positionURL+")"+"\n"+positionDegreeHolder+' - '+positionDegreeFieldHolder+'\n'+positionDateRangeHolder+'\n'+positionSummaryHolder+'\n'
          }else{
            positionBuilder="### "+ positionTitle+"\n"+positionDegreeHolder+' - '+positionDegreeFieldHolder+'\n'+positionDateRangeHolder+'\n'+positionSummaryHolder+'\n'
          }
         if(positions.indexOf(positionBuilder)==-1){
           positions.push(positionBuilder)
         }
       }
       school = positions.join('').trim()

     }
     if(school.length>0){
     }else{
       fieldOfStudy=''
       school = '';
     }
  } catch (error) {
     school = '';
     fieldOfStudy=''
       // console.log(error)
  }

  //location
  try {
    var locationHold = document.getElementsByClassName('topcard-condensed__content-left')[0]
    if(locationHold!=undefined){
      var lockupEmberView = locationHold.getElementsByClassName('artdeco-entity-lockup__metadata ember-view')[0]
      var tempString = lockupEmberView.childNodes[2].innerText
      tempString=tempString.replace(/[·]/g, '').trim();
      currentLocation=tempString;
    }
  } catch (error) {
    currentLocation = '';
    // console.log(error)
  }

  //summary
  try {
    var summaryBox = document.getElementsByClassName("component-card summary-card");
    if(summaryBox.length>0){
      var summaryTextHolder = summaryBox[0].getElementsByClassName("summary-card__section");
      if(summaryTextHolder.length>0){
        if(summaryTextHolder[0].getElementsByClassName('lt-line-clamp__raw-line')[0]!=undefined){
          summary = summaryTextHolder[0].getElementsByClassName('lt-line-clamp__raw-line')[0].innerText
          if(summaryBox[0].innerText.indexOf('contract')!=-1){
            contractorConsultant=true;
          }else if(summaryBox[0].innerText.indexOf('consultant')!=-1){
            contractorConsultant=true;
          }else{
            contractorConsultant=false;
          }
        }
      }else{
        summary = '';
      }
    }else{
      summary = '';
    }
  } catch (error) {
    summary = ''
    // console.log(error)
  }
  //experience
  try {
    var experienceBox =  document.getElementsByClassName('background-section experience-card ember-view')
    if(experienceBox.length>0){
      if(experienceBox[0].innerText.indexOf('contract')!=-1){
        contractorConsultant=true;
      }else if(experienceBox[0].innerText.indexOf('consultant')!=-1){
        contractorConsultant=true;
      }else{
        contractorConsultant=false;
      }
    }
    if(document.getElementsByClassName('expandable-list-profile-core__list artdeco-list')!=undefined){
      var experienceListBox = document.getElementsByClassName('expandable-list-profile-core__list artdeco-list')
      var xpList = experienceListBox[0].getElementsByTagName('li')
      var xpListLength = xpList.length
    }

    var xpBuilder=[]
    var posTitle
    var posCompany
    var posDateRange
    var posDuration
    var posLocation
    var posDescription
    var posURL;
    var companyUrl;
    var normalBuilder

    totalNumOfYears=0;
    currentPositionLength=0
    currentCompanyLength=0
    shortStint=0;

    if(xpListLength>0){
      for(l=0;l<xpListLength;l++){
        var entryType
        var normalEntry = xpList[l].getElementsByClassName('background-entity position-item expandable-list-profile-core__list-item ember-view')
        var expandedEntry = xpList[l].getElementsByClassName('expandable-list-profile-core__list-item ember-view')

        if(expandedEntry.length>0){
          entryType='Expanded'
          if(l==0){

            if(xpList[0].getElementsByClassName("t-16 grouped-position-entity__company-name")[0]!=undefined){
              company = xpList[0].getElementsByClassName("t-16 grouped-position-entity__company-name")[0].innerText
              if(company.indexOf(',')!=-1){
                company=company.replace(/[,]/gi,'')
              }
                company=company.toString()
            }

            //first position is expandedEntry
            var subPositionsHolder=expandedEntry[0].getElementsByClassName('grouped-position-entity__metadata-container')
            if(subPositionsHolder.length>0){
              posTitle=subPositionsHolder[0].getElementsByClassName('t-16')[0].innerText
              title=posTitle
              var currrentPositionDuration = subPositionsHolder[0].getElementsByClassName('t-14 t-black--light')[0]
              if(currrentPositionDuration.childNodes[6]!=undefined){
                var currentPosTextHolder = currrentPositionDuration.childNodes[6].innerText
              }else{
                var currentPosTextHolder =''
              }

                if(xpList[0].getElementsByClassName('t-14 t-black--light')[0]!=undefined){
                  var currentCompanyXP = xpList[0].getElementsByClassName('t-14 t-black--light')[0].innerText
                  var currentSplitter = currentCompanyXP.split(' ')
                  var currentSplitterLength = currentCompanyXP.split(' ').length

                  var expandedCurrentPosSplitter = currentPosTextHolder.split(' ')
                  var expandedCPL = expandedCurrentPosSplitter.length

                  if(currentSplitterLength==2){
                    if(currentSplitter[1]===('yr')){
                      currentCompanyLength=currentCompanyLength+1
                    }
                    if(currentSplitter[1]===('mo')){
                      currentCompanyLength=currentCompanyLength+(1/12)
                    }
                    if(currentSplitter[1]===('mos')){
                      var monthsToDecimal = (parseInt(currentSplitter[0])/12)
                      currentCompanyLength=currentCompanyLength+monthsToDecimal
                    }
                  }else if(currentSplitterLength==4){
                    //we have at least a year and a month
                    if(currentSplitter[1]===('yr')){
                      currentCompanyLength=currentCompanyLength+1
                    }
                    if(currentSplitter[1]===('yrs')){
                        currentCompanyLength=currentCompanyLength+parseInt(currentSplitter[0])
                    }
                    if(currentSplitter[3]===('mo')){
                        currentCompanyLength=currentCompanyLength+(1/12)
                    }
                    if(currentSplitter[3]===('mos')){
                      var monthsToDecimal = (parseInt(currentSplitter[2])/12)
                        currentCompanyLength=currentCompanyLength+monthsToDecimal
                    }
                  }
                  if(expandedCPL==2){
                    //we have either 1 year or just a few months
                    //likely short stint
                    if(expandedCurrentPosSplitter[1]===('yr')){
                      currentPositionLength=currentPositionLength+1
                    }
                    if(expandedCurrentPosSplitter[1]===('mo')){
                      currentPositionLength=currentPositionLength+(1/12)
                    }
                    if(expandedCurrentPosSplitter[1]===('mos')){
                      var monthsToDecimal = (parseInt(expandedCurrentPosSplitter[0])/12)
                      currentPositionLength=currentPositionLength+monthsToDecimal
                    }
                  }else if(expandedCPL==4){
                    //we have at least a year and a month
                    if(expandedCurrentPosSplitter[1]===('yr')){
                      currentPositionLength=currentPositionLength+1
                    }
                    if(expandedCurrentPosSplitter[1]===('yrs')){
                        currentPositionLength=currentPositionLength+parseInt(expandedCurrentPosSplitter[0])
                    }
                    if(expandedCurrentPosSplitter[3]===('mo')){
                        currentPositionLength=currentPositionLength+(1/12)
                    }
                    if(expandedCurrentPosSplitter[3]===('mos')){
                      var monthsToDecimal = (parseInt(expandedCurrentPosSplitter[2])/12)
                        currentPositionLength=currentPositionLength+monthsToDecimal
                    }
                  }
                }
              }
            }
          }

        if(normalEntry.length>0){
          entryType='Normal'
          if(l==0){
            if(document.getElementsByClassName("position-item__company-link")[0]!=undefined){
                company = document.getElementsByClassName("position-item__company-link")[0].innerText
                if(company.indexOf(',')!=-1){
                  company=company.replace(/[,]/gi,'')
                }
                  company=company.toString()
            }
            if(xpList[0].getElementsByClassName('ember-view position-item__position-title-link')[0]!=undefined){
              posTitle=xpList[0].getElementsByClassName('ember-view position-item__position-title-link')[0].innerText
              title=posTitle
            }else{
              posTitle=''
            }
            if(xpList[0].getElementsByClassName('background-entity__duration')[0]!=undefined){
              var currentPosition = xpList[0].getElementsByClassName('background-entity__duration')[0].innerText
              if(currentPosition.length>0){
                var currentSplitter = currentPosition.split(' ')
                var currentSplitterLength = currentPosition.split(' ').length
                if(currentSplitterLength==2){
                  //we have either 1 year or just a few months
                  //likely short stint
                  if(currentSplitter[1]===('yr')){
                    currentPositionLength=currentPositionLength+1
                  }
                  if(currentSplitter[1]===('mo')){
                    currentPositionLength=currentPositionLength+(1/12)
                  }
                  if(currentSplitter[1]===('mos')){
                    var monthsToDecimal = (parseInt(currentSplitter[0])/12)
                    currentPositionLength=currentPositionLength+monthsToDecimal
                  }
                }else if(currentSplitterLength==4){
                  if(currentSplitter[1]===('yr')){
                    currentPositionLength=currentPositionLength+1
                  }
                  if(currentSplitter[1]===('yrs')){
                      currentPositionLength=currentPositionLength+parseInt(currentSplitter[0])
                  }
                  if(currentSplitter[3]===('mo')){
                      currentPositionLength=currentPositionLength+(1/12)
                  }
                  if(currentSplitter[3]===('mos')){
                    var monthsToDecimal = (parseInt(currentSplitter[2])/12)
                      currentPositionLength=currentPositionLength+monthsToDecimal
                  }
                }
              }

            }
          }
          currentCompanyLength=currentPositionLength
        }

        if(entryType=='Normal'){

          if(xpList[l].getElementsByClassName('background-entity__summary-definition--subtitle')[0]!=undefined){
            posCompany=xpList[l].getElementsByClassName('background-entity__summary-definition--subtitle')[0].innerText
          }else{
            posCompany=''
          }
          if(xpList[l].getElementsByClassName('background-entity__date-range')[0]!=undefined){
            posDateRange=xpList[l].getElementsByClassName('background-entity__date-range')[0].innerText
          }else{
            posDateRange=''
          }
          if(xpList[l].getElementsByClassName('ember-view position-item__position-title-link')[0]!=undefined){
            posTitle=xpList[l].getElementsByClassName('ember-view position-item__position-title-link')[0].innerText
          }else{
            posTitle=''
          }
          if(xpList[l].getElementsByClassName('background-entity__duration')[0]!=undefined){
            posDuration=xpList[l].getElementsByClassName('background-entity__duration')[0].innerText

            var splitHolder=posDuration.split(' ')
            var splitLength = posDuration.split(' ').length
            if(splitLength==2){
              //we have either 1 year or just a few months
              //likely short stint
              if(splitHolder[1]===('yr')){
                totalNumOfYears=totalNumOfYears+1
              }
              if(splitHolder[1]===('mo')){
                totalNumOfYears=totalNumOfYears+(1/12)
                shortStint=shortStint+1
              }
              if(splitHolder[1]===('mos')){
                var monthsToDecimal = (parseInt(splitHolder[0])/12)
                totalNumOfYears=totalNumOfYears+monthsToDecimal
                shortStint=shortStint+1;
              }
            }else if(splitLength==4){
              //we have at least a year and a month
              if(splitHolder[1]===('yr')){
                totalNumOfYears=totalNumOfYears+1
              }
              if(splitHolder[1]===('yrs')){
                totalNumOfYears=totalNumOfYears+parseInt(splitHolder[0])
              }
              if(splitHolder[3]===('mo')){
                totalNumOfYears=totalNumOfYears+(1/12)
              }
              if(splitHolder[3]===('mos')){
                var monthsToDecimal = (parseInt(splitHolder[2])/12)
                totalNumOfYears=totalNumOfYears+monthsToDecimal
              }
            }

          }else{
            posDuration=''
          }
          if(xpList[l].getElementsByClassName('background-entity__summary-definition--location')[0]!=undefined){
            posLocation=xpList[l].getElementsByClassName('background-entity__summary-definition--location')[0].innerText
          }else{
            posLocation=''
          }
          if(xpList[l].getElementsByClassName('background-entity__summary-definition--description')[0]!=undefined){
            posDescription=xpList[l].getElementsByClassName('background-entity__summary-definition--description')[0].innerText
          }else{
            posDescription=''
          }
          if(xpList[l].getElementsByClassName('position-item__company-link')[0]!=undefined){
            companyUrl=xpList[l].getElementsByClassName('position-item__company-link')[0].href
          }else{
            companyUrl=''
          }
          if(xpList[l].getElementsByClassName('ember-view position-item__position-title-link')[0]!=undefined){
            posURL=xpList[l].getElementsByClassName('ember-view position-item__position-title-link')[0].href
          }else{
            posURL=''
          }

          if(companyUrl!=''&&posURL!=''){
            normalBuilder='## ['+posTitle+']'+'('+posURL+')'+'\n'+'### ['+posCompany+']'+'('+companyUrl+')'+'\n'+'\n'+posDateRange+' - '+posDuration+'\n'+posLocation+'\n'+posDescription+'\n'
          }
          if(companyUrl==''&&posURL!=''){
            normalBuilder='## ['+posTitle+']'+'('+posURL+')'+'\n'+'### '+posCompany+'\n'+'\n'+posDateRange+' - '+posDuration+'\n'+posLocation+'\n'+posDescription+'\n'
          }
          if(companyUrl!=''&&posURL==''){
            normalBuilder='## ['+posTitle+']'+'\n'+'### ['+posCompany+']'+'('+companyUrl+')'+'\n'+'\n'+posDateRange+' - '+posDuration+'\n'+posLocation+'\n'+posDescription+'\n'
          }
          if(companyUrl==''&&posURL==''){
            normalBuilder='## ['+posTitle+']'+'\n'+'### ['+posCompany+']'+'\n'+'\n'+posDateRange+' - '+posDuration+'\n'+posLocation+'\n'+posDescription+'\n'
          }
          if(normalBuilder!=undefined){
            if(xpBuilder.indexOf(normalBuilder)==-1){
              xpBuilder.push(normalBuilder+'\n')
            }
          }
        }
        var expandedBuilder;
        if(entryType=='Expanded'){
          if(xpList[l].getElementsByClassName('t-16 grouped-position-entity__company-name')[0]!=undefined){
            posCompany=xpList[l].getElementsByClassName('t-16 grouped-position-entity__company-name')[0].innerText
          }
          if(xpList[l].getElementsByClassName('t-14 t-black--light')[0]!=undefined){
            posDuration=xpList[l].getElementsByClassName('t-14 t-black--light')[0].innerText+'\n'

            var splitHolder=posDuration.split(' ')
            var splitLength = posDuration.split(' ').length
            if(splitLength==2){
              //we have either 1 year or just a few months
              //likely short stint
              if(splitHolder[1]===('mo')){
                shortStint=shortStint+1
              }
              if(splitHolder[1]===('mos')){
                shortStint=shortStint+1;
              }
            }
          }else{
            posDuration=''
          }

          if(xpList[l].getElementsByClassName('t-16')[0]!=undefined){
            posTitle=xpList[l].getElementsByClassName('t-16')[0].innerText
          }


          if(xpList[l].getElementsByClassName('grouped-position-entity__company-data-container')[0]!=undefined){
            posURL=xpList[l].getElementsByTagName('a')[0].href
          }else{
            posURL=''
          }

          var subPositions=expandedEntry[0].getElementsByClassName('grouped-position-entity__metadata-container')
          var subPositionTitle
          var subPositionDateRange
          var subPositionDuration
          var subPositionLocation
          var subPositionDescription
          var subPositionBuilder
          var subPositionHolder=[]
          var subPositionUrl

          for(s=0;s<subPositions.length;s++){
            if(subPositions[s].getElementsByClassName('t-16')[0]!=undefined){
              subPositionTitle=subPositions[s].getElementsByClassName('t-16')[0].innerText

            }else{
              subPositionTitle=''
            }
            if(subPositions[s].getElementsByClassName('t-14 t-black--light')[0].childNodes[1]!=undefined){
              subPositionDateRange=subPositions[s].getElementsByClassName('t-14 t-black--light')[0].childNodes[1].innerText
            }else{
              subPositionDateRange=''
            }
            if(subPositions[s].getElementsByClassName('t-14 t-black--light')[0].childNodes[6]!=undefined){
              subPositionDuration=subPositions[s].getElementsByClassName('t-14 t-black--light')[0].childNodes[6].innerText

              var splitHolder=subPositionDuration.split(' ')
              var splitLength = subPositionDuration.split(' ').length

              if(splitLength==2){
                //we have either 1 year or just a few months
                //likely short stint
                if(splitHolder[1]===('yr')){
                  totalNumOfYears=totalNumOfYears+1
                }
                if(splitHolder[1]===('mo')){
                  totalNumOfYears=totalNumOfYears+(1/12)
                }
                if(splitHolder[1]===('mos')){
                  var monthsToDecimal = (parseInt(splitHolder[0])/12)
                  totalNumOfYears=totalNumOfYears+monthsToDecimal
                }
              }else if(splitLength==4){
                //we have at least a year and a month
                if(splitHolder[1]===('yr')){
                    totalNumOfYears=totalNumOfYears+1
                }
                if(splitHolder[1]===('yrs')){
                  totalNumOfYears=totalNumOfYears+parseInt(splitHolder[0])
                }
                if(splitHolder[3]===('mo')){
                  totalNumOfYears=totalNumOfYears+(1/12)
                }
                if(splitHolder[3]===('mos')){
                  var monthsToDecimal = (parseInt(splitHolder[2])/12)
                  totalNumOfYears=totalNumOfYears+monthsToDecimal
                }
              }
            }else{
              subPositionDuration=''
            }
            if(subPositions[s].getElementsByClassName('t-14 t-black--light')[1]!=undefined){
              subPositionLocation=subPositions[s].getElementsByClassName('t-14 t-black--light')[1].innerText
            }else{
              subPositionLocation=''
            }
            if(subPositions[s].getElementsByClassName('t-14 grouped-position-entity__description')[0]!=undefined){
              subPositionDescription=subPositions[s].getElementsByClassName('t-14 grouped-position-entity__description')[0].innerText
            }else{
              subPositionDescription=''
            }
            if(subPositions[s].getElementsByClassName('ember-view')[0]!=undefined){
              var subUrlHolder
              var subUrlBuilder
              subUrlHolder=subPositions[s].getElementsByClassName('ember-view')
              subPositionUrl=subUrlHolder[0].href
            }else{
              subPositionUrl=''
            }

            subPositionBuilder=''
            subPositionBuilder=subPositionBuilder+'### ['+subPositionTitle+']'+'('+subPositionUrl+')'+'\n'+subPositionDateRange+' - '+subPositionDuration+'\n'+subPositionLocation+'\n'+subPositionDescription

            if(subPositionBuilder!=undefined){
              if(subPositionHolder.indexOf(subPositionBuilder)==-1){
                subPositionHolder.push(subPositionBuilder)
              }
            }
          }

          if(subPositionHolder.length>1){
            subPositionHolder=subPositionHolder.join('\n')
          }
          expandedBuilder=''
          expandedBuilder='## ['+posCompany+']'+'('+posURL+')'+'\n'+posDuration+'\n'+subPositionHolder+'\n'
          if(expandedBuilder!=undefined){
            if(xpBuilder.indexOf(expandedBuilder)==-1){
              xpBuilder.push(expandedBuilder+'\n')
            }
          }
        }
      }

      totalNumOfYears=totalNumOfYears
      avgPerPosition=(totalNumOfYears/xpBuilder.length)

      if(shortStint>0){
        shortStint=parseInt(shortStint)
      }

    }else{
    }
    experience = xpBuilder.join('').trim()

  } catch (error) {
    // console.log(error)
  }

  //skills
  try {
    var skillsToDB=[];
    var skillsOnPage = document.getElementsByClassName("expandable-list expandable-stepper expandable-list-profile-core component-card skills-card-expandable");
    if(skillsOnPage.length>0){
      var skillsInBox=skillsOnPage[0].getElementsByClassName("expandable-list-profile-core__list-item skill ember-view");
      if(!!skillsInBox==true){
        var skillCount = skillsOnPage[0].getElementsByClassName("skill-entity__skill-name t-16 t-black t-bold").length;
        var skillsToGrab= skillsOnPage[0].getElementsByClassName("skill-entity__skill-name t-16 t-black t-bold")
        if(skillCount>0){
          skillsToDB=[];
          for(i=0;i<skillCount;i++){
            if(skillsToDB.indexOf(skillsToGrab[i])==-1){
            skillsToDB.push(skillsToGrab[i].innerText);
            }
          }
        }
      }
    }
    if(skillsToDB.length>0){
    skills = skillsToDB
  }else{
    skills = ''
  }
  } catch (error) {
    skills = '';
  }

  //volunteerExp
  try {
    var volPositions=[]
    var volunteerBox = document.getElementsByClassName("background-section volunteer-experience-card ember-view");

    if(volunteerBox[0]!=undefined){
      var volunteerList = volunteerBox[0].getElementsByTagName("ul");
      var volunteerNodes = volunteerList[0].getElementsByTagName('li')
      var volunteerNodesCount = volunteerNodes.length;

      for(i=0;i<volunteerNodesCount;i++){
          var positionBuilder;
          var positionBlock
          var posH4
          var posH5
          var dateRange
          var dateRangeBlock
          var duration
          var description
          var causes

        try {
          positionBlock = volunteerNodes[i]
        } catch (error) {
          positionBlock=''
        }
        try {
          posH4 = positionBlock.getElementsByClassName('background-entity__summary-definition--title')[0].innerText
        } catch (error) {
          posH4=''
        }
        try {
          posH5 = positionBlock.getElementsByClassName('background-entity__summary-definition')[0].innerText
        } catch (error) {
          posH5=''
        }
        try {
          description = positionBlock.getElementsByClassName('background-entity__summary-definition--description')[0].innerText
        } catch (error) {
          description=''
        }

        positionBuilder='## '+posH4+'\n'+'**'+posH5+'**'+'\n'+description

        if(volPositions.indexOf(positionBuilder)==-1){
        volPositions.push(positionBuilder);
        }
      }
      if(volPositions.length>1){
          volPositions=volPositions.join('').trim()+'\n'
      }

    }
    if(volPositions.length>0){
      if(volunteerExp.indexOf(volPositions)==-1){
          volunteerExp.push(volPositions)
      }
    }

    if(volunteerExp.length>1){
      volunteerExp=volunteerExp.join('').trim()
    }
    if(volunteerExp.length==0){
      volunteerExp=''
    }
    volunteerExp=volunteerExp.toString()

  } catch (error) {
    volunteerExp = '';
  }

  //Certifications
  try {
    var accomplishmentsBox = document.getElementsByClassName("accomplishments component-card ember-view");
    var accomplishmentsBoxList = accomplishmentsBox[0].getElementsByClassName('accomplishments-expandable-list__title t-16 t-bold')
    var accomplishmentsBoxListLength = accomplishmentsBoxList.length
    var certificationHolder
    var certListLength
    var certBuilder
    var certTitle
    var certDates
    var certCompany

    if(accomplishmentsBoxListLength>0){
      for(i=0;i<accomplishmentsBoxListLength;i++){
        if(accomplishmentsBoxList[i]!=undefined){
          if(accomplishmentsBoxList[i].innerText.indexOf('Certifications')!=-1){
            certificationHolder=accomplishmentsBox[0].getElementsByClassName('accomplishments-expandable-list ember-view')[i]
            certListLength=certificationHolder.getElementsByClassName('accomplishments-base-entity certification-entity ember-view').length

            for(u=0;u<certListLength;u++){
                if(certificationHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__title')[0]!=undefined){
                  certTitle =certificationHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__title')[0].innerText
                }else{
                  certTitle=''
                }
                if(certificationHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__date')[0]!=undefined){
                  certDates=certificationHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__date')[0].innerText
                }else{
                  certDates=''
                }
                if(certificationHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__entity-lockup--company')[0]!=undefined){
                  certCompany=certificationHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__entity-lockup--company')[0].innerText
                }else{
                  certCompany=''
                }

                if(certDates==''){
                  certBuilder=certTitle+certCompany+'\n'
                }else if(certCompany==''){
                  certBuilder=certTitle+'\n'
                }else{
                  certBuilder=certTitle+'\n'+certDates+certCompany+'\n'
                }

                if(certifications.indexOf(certBuilder)==-1){
                  certifications.push(certBuilder+'\n')
                }
            }
          }
        }
      }
    }

    if(certifications.length>1){
      certifications = certifications.join('').trim()
    }

    if(certifications.length==0){
      certifications = ''
    }

  } catch (error) {
    certifications =  ''
    // console.log(error)
  }

  //Honors and Awards
  try {
    var accomplishmentsBox = document.getElementsByClassName("accomplishments component-card ember-view");
    var accomplishmentsBoxList = accomplishmentsBox[0].getElementsByClassName('accomplishments-expandable-list__title t-16 t-bold')
    var accomplishmentsBoxListLength = accomplishmentsBoxList.length
    var awardHolder
    var awardListLength
    var awardBuilder
    var awardTitle
    var awardDates
    var awardDescription

    if(accomplishmentsBoxListLength>0){
      for(i=0;i<accomplishmentsBoxListLength;i++){
        if(accomplishmentsBoxList[i]!=undefined){
          if(accomplishmentsBoxList[i].innerText.indexOf('Honors & Awards')!=-1){
            awardHolder=accomplishmentsBox[0].getElementsByClassName('accomplishments-expandable-list__list ')[i]
            awardListLength=awardHolder.getElementsByTagName('li').length

            for(u=0;u<awardListLength;u++){
                if(awardHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__title')[0]!=undefined){
                  awardTitle =awardHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__title')[0].innerText
                }else{
                  awardTitle=''
                }
                if(awardHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__date')[0]!=undefined){
                  awardDates=awardHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__date')[0].innerText
                }else{
                  awardDates=''
                }
                if(awardHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__description')[0]!=undefined){
                  awardDescription=awardHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__description')[0].innerText
                }else{
                  awardDescription=''
                }

                if(awardDates==''){
                  awardBuilder='**'+awardTitle+'**'+'\n'+awardDescription+'\n'
                }else{
                  awardBuilder='**'+awardTitle+'**'+'\n'+awardDates+'\n'+awardDescription+'\n'
                }

                if(awards.indexOf(awardBuilder)==-1){
                  awards.push(awardBuilder+'\n')
                }
            }
          }
        }
      }
    }


    if(awards.length>1){
      awards = awards.join('').trim()
    }
    if(awards.length==0){
      awards=''
    }
  } catch (error) {
    awards = ''
    // console.log(error)
  }

  //courses
  try {
    var coursesBox = document.getElementsByClassName("accomplishments component-card ember-view");
    var coursesBoxList = coursesBox[0].getElementsByClassName('accomplishments-expandable-list__title t-16 t-bold')
    var coursesBoxListListLength = coursesBoxList.length
    var courseHolder
    var courseListLength
    var courseBuilder
    var courseTitle
    var courseDates
    var courseDescription

    if(coursesBoxListListLength>0){
      for(i=0;i<coursesBoxListListLength;i++){
        if(coursesBoxList[i]!=undefined){
          if(coursesBoxList[i].innerText.indexOf('Courses')!=-1){
            courseHolder=coursesBox[0].getElementsByClassName('accomplishments-expandable-list__list ')[i]
            courseListLength=courseHolder.getElementsByTagName('li').length
            for(u=0;u<courseListLength;u++){
                if(courseHolder.getElementsByTagName('li')[u].getElementsByClassName('course-entity__name')[0]!=undefined){
                  courseTitle =courseHolder.getElementsByTagName('li')[u].getElementsByClassName('course-entity__name')[0].innerText
                }else{
                  courseTitle=''
                }
                courseTitle=courseTitle.toString()
                if(courseTitle!=''){
                  if(courses.indexOf(courseTitle)==-1){
                    courses.push(courseTitle)
                  }
                }
            }
          }
        }
      }
    }
    if(courses.length==0){
      courses=''
    }
  } catch (error) {
    courses = ''
    // console.log(error)
  }

  //patents
  try {
    var patentsBox = document.getElementsByClassName("accomplishments component-card ember-view");
    var patentsBoxList = patentsBox[0].getElementsByClassName('accomplishments-expandable-list__title t-16 t-bold')
    var patentsBoxListLength = patentsBoxList.length
    var patentsHolder
    var patentsListLength
    var patentsBuilder
    var patentsTitle
    var patentsDescription
    var patentUrl

    if(patentsBoxListLength>0){
      for(i=0;i<patentsBoxListLength;i++){
        if(patentsBoxList[i]!=undefined){
          if(patentsBoxList[i].innerText.indexOf('Patents')!=-1){
            patentsHolder=patentsBox[0].getElementsByClassName('accomplishments-expandable-list__list ')[i]
            patentsListLength=patentsHolder.getElementsByTagName('li').length
            for(u=0;u<patentsListLength;u++){
                if(patentsHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__title')[0]!=undefined){
                  patentsTitle = patentsHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__title')[0].innerText
                }else{
                  patentsTitle=''
                }

                if(patentsHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__metadata')[0]!=undefined){
                  patentsDescription=patentsHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__metadata')[0].innerText
                }else{
                  patentsDescription=''
                }
                if(patentsHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__url')[0]!=undefined){
                  patentUrl=patentsHolder.getElementsByTagName('li')[u].getElementsByClassName('accomplishments-base-entity__url')[0].href
                }else{
                  patentUrl=''
                }

                if(patentUrl==''){

                  if(patentsDescription!=''){
                    patentsBuilder=patentsTitle+'\n'+patentsDescription
                  }else{
                    patentsBuilder=patentsTitle
                  }
                }else{
                  if(patentsDescription!=''){
                    patentsBuilder=patentsTitle+'\n'+patentsDescription+'\n'+patentUrl
                  }else{
                    patentsBuilder=patentsTitle+'\n'+patentUrl
                  }
                }
                if(patents.indexOf(patentsBuilder)==-1){
                  patents.push(patentsBuilder+'\n')
                }
            }
          }
        }
      }
    }

    for( var o = 0; o < patents.length; o++){
      if ( patents[o] === '\n') {
          patents.splice(o, 1);
      }
    }
    if(patents.length>1){
      patents = patents.join('').trim()
    }
    if(patents.length==0){
      patents=''
    }
    if(patents!=''){
    }
  } catch (error) {
    patents = ''
  }
  //publications
  try {
    var publicationsBox = document.getElementsByClassName("accomplishments component-card ember-view");
    var publicationsBoxList = publicationsBox[0].getElementsByClassName('accomplishments-expandable-list__title t-16 t-bold')
    var publicationsBoxListLength = publicationsBoxList.length
    var publicationsHolder
    var publicationsListLength
    var publicationsBuilder
    var publicationsTitle
    var publicationsDescription
    var publicationMetaData
    var publicationsDate
    var publicationsUrl

    if(publicationsBoxListLength>0){
      for(i=0;i<publicationsBoxListLength;i++){
        if(publicationsBoxList[i]!=undefined){
          var publicationIndex
          var publicationChecker
          if(publicationsBoxList[i].innerText.indexOf('Publications')!=-1){
            publicationChecker=true
            publicationIndex=i
          }else if(publicationsBoxList[i].innerText.indexOf('Publication')!=-1){
            publicationChecker=true
            publicationIndex=i
          }
          if(publicationIndex!=undefined){
            publicationsHolder=publicationsBox[0].getElementsByClassName('accomplishments-expandable-list__list ')
            var publicationsList=publicationsHolder[publicationIndex].getElementsByClassName('accomplishments-base-entity publication-entity ember-view')
            publicationsListLength=publicationsList.length
            for(u=0;u<publicationsListLength;u++){
                if(publicationsList[u].getElementsByClassName('accomplishments-base-entity__title')[0]!=undefined){
                  publicationsTitle = publicationsList[u].getElementsByClassName('accomplishments-base-entity__title')[0].innerText
                }else{
                  publicationsTitle=''
                }
                if(publicationsList[u].getElementsByClassName('accomplishments-base-entity__description')[0]!=undefined){
                  publicationsDescription=publicationsList[u].getElementsByClassName('accomplishments-base-entity__description')[0].innerText
                  if(publicationsList[u].getElementsByClassName('accomplishments-base-entity__metadata')[0]!=undefined){
                    publicationsMetaData=publicationsList[u].getElementsByClassName('accomplishments-base-entity__metadata')[0].innerText
                  }else{
                    publicationsMetaData=''
                  }
                  if(publicationsMetaData!=''){
                    publicationsDescription=publicationsDescription+'\n'+publicationsMetaData
                  }
                }else{
                  publicationsDescription=''
                }
                if(publicationsList[u].getElementsByClassName('accomplishments-base-entity__date')[0]!=undefined){
                  publicationsDate=publicationsList[u].getElementsByClassName('accomplishments-base-entity__date')[0].innerText
                }else{
                  publicationsDate=''
                }
                if(publicationsList[u].getElementsByClassName('accomplishments-base-entity__url')[0]!=undefined){
                  publicationsUrl=publicationsList[u].getElementsByClassName('accomplishments-base-entity__url')[0].href
                }else{
                  publicationsUrl=''
                }
                if(publicationsDate==''){
                  if(publicationsDescription!=''){
                    if(publicationsUrl!=''){
                      publicationsBuilder='**'+'['+publicationsTitle+']('+publicationsUrl+')'+'**'+'\n'+publicationsDescription+'\n'
                    }else{
                      publicationsBuilder='**'+publicationsTitle+'**'+'\n'+publicationsDescription+'\n'
                    }
                  }else{
                    if(publicationsTitle!=''){
                        publicationsBuilder='**'+publicationsTitle+'**'
                    }
                  }
                }else{
                  if(publicationsDescription!=''){

                    if(publicationsUrl!=''){
                      publicationsBuilder='**'+'['+publicationsTitle+']('+publicationsUrl+')'+'**'+'\n'+publicationsDescription+'\n'+publicationsDate+'\n'
                    }else{
                      publicationsBuilder='**'+publicationsTitle+'**'+'\n'+publicationsDescription+'\n'+publicationsDate+'\n'
                    }
                  }else{
                    if(publicationsTitle!=''){
                          publicationsBuilder=publicationsTitle+'\n'+publicationsDate+'\n'
                    }
                  }
                }
                  if(publicationsBuilder!=''){
                    if(publications.indexOf(publicationsBuilder)==-1){
                      publications.push(publicationsBuilder+'\n')
                    }
                  }
            }
          }
        }
      }
    }
    if(publications.length>1){
      publications = publications.join('').trim()
    }
    if(publications.length==0){
      publications=''
    }else{
      publications=publications.toString()
    }
  } catch (error) {
    publications = ''
    // console.log(error)
  }
//projects
  try {
    var projectsBox = document.getElementsByClassName("accomplishments component-card ember-view");
    var projectsBoxList = projectsBox[0].getElementsByClassName('accomplishments-expandable-list__title t-16 t-bold')
    var projectsBoxListLength = patentsBoxList.length
    var projectsHolder
    var projectsListLength
    var projectsBuilder
    var projectsTitle
    var projectsDescription
    var projectsDate
    var projectsUrl

    if(projectsBoxListLength>0){
      for(i=0;i<projectsBoxListLength;i++){
        if(projectsBoxList[i]!=undefined){
          var projectIndex
          if(projectsBoxList[i].innerText.indexOf('Projects')!=-1){
             projectIndex=i
          }else if(projectsBoxList[i].innerText.indexOf('Project')!=-1){
            projectIndex=i
          }

          if(projectIndex!=undefined){
            projectsHolder=projectsBox[0].getElementsByClassName('accomplishments-expandable-list__list ')
            var projectsList=projectsHolder[projectIndex].getElementsByClassName('accomplishments-base-entity project-entity ember-view')
            projectsListLength=projectsList.length

            for(u=0;u<projectsListLength;u++){
                if(projectsList[u].getElementsByClassName('accomplishments-base-entity__title')[0]!=undefined){
                  projectsTitle = projectsList[u].getElementsByClassName('accomplishments-base-entity__title')[0].innerText
                }else{
                  projectsTitle=''
                }

                if(projectsList[u].getElementsByClassName('accomplishments-base-entity__description')[0]!=undefined){
                  projectsDescription=projectsList[u].getElementsByClassName('accomplishments-base-entity__description')[0].innerText
                }else{
                  projectsDescription=''
                }
                if(projectsList[u].getElementsByClassName('accomplishments-base-entity__date')[0]!=undefined){
                  projectsDate=projectsList[u].getElementsByClassName('accomplishments-base-entity__date')[0].innerText
                }else{
                  projectsDate=''
                }
                if(projectsList[u].getElementsByClassName('accomplishments-base-entity__url')[0]!=undefined){
                  projectsUrl=projectsList[u].getElementsByClassName('accomplishments-base-entity__url')[0].href
                }else{
                  projectsUrl=''
                }
                if(projectsDate==''){
                  if(projectsDescription!=''){
                    if(projectsUrl!=''){
                        projectsBuilder='** ['+projectsTitle+']('+projectsUrl+') **'+'\n'+projectsDescription+'\n'
                    }else{
                        projectsBuilder='**'+projectsTitle+'**'+'\n'+projectsDescription+'\n'
                    }
                  }else{
                    projectsBuilder=projectsTitle+'\n'
                  }
                }else{
                  if(projectsDescription!=''){
                      if(projectsUrl!=''){
                        projectsBuilder='** ['+projectsTitle+']('+projectsUrl+') **'+'\n'+projectsDescription+'\n'+projectsDate+'\n'
                      }else{
                        projectsBuilder='**'+projectsTitle+'**'+'\n'+projectsDescription+'\n'+projectsDate+'\n'
                      }
                  }else{
                    if(projectsUrl!=''){
                      projectsBuilder='** ['+projectsTitle+']('+projectsUrl+') **'+'\n'+projectsDate+'\n'
                    }else{
                        projectsBuilder='**'+projectsTitle+'**'+'\n'+projectsDate+'\n'
                    }
                  }
                }
                projectsBuilder=projectsBuilder+'\n'
                if(projectsBuilder!=''){
                  if(listedProjects.indexOf(projectsBuilder)==-1){
                    listedProjects.push(projectsBuilder)
                  }
                }
            }
          }
        }
      }
    }
    if(listedProjects.length>1){
      listedProjects = listedProjects.join('').trim()
    }
    if(listedProjects.length==0){
      listedProjects=''
    }
    listedProjects=listedProjects.toString()

  } catch (error) {
    listedProjects = ''
    // console.log(error)
  }

  //languages
  try {
    var languageBox = document.getElementsByClassName("accomplishments-expandable-list__list language-list");
    if(languageBox.length>0){
      var languageList = languageBox[0].getElementsByClassName("accomplishments-base-entity language-entity ember-view")
      var subNodesCount = languageList.length
      for(i=0;i<subNodesCount;i++){
        var subNodeHTML = languageList[i].childNodes
        var subNodeTitle = subNodeHTML[1].innerText;
        if(subNodeHTML[4]!=undefined){
          var subNodeProficiency = subNodeHTML[4].innerText;
        }

        var langBuilder;

        if(languages.indexOf(subNodeTitle)==-1){
          languages.push(subNodeTitle)
        }
      }
    }else{
      languages = ''
    }

  } catch (error) {
    languages = ''
    // console.log(error)
  }

  //Interests
  try {
    var followingBox = document.getElementsByClassName("following ember-view");
    if(followingBox.length>0){
      var unorderedListNodes = followingBox[0].getElementsByTagName('li')
      var nodeCount = unorderedListNodes.length

      for(i=0;i<nodeCount;i++){
        var textHolder;
        var subNodeHTML = unorderedListNodes[i]
        var subNodeText = subNodeHTML.getElementsByClassName('background-entity__summary')
        if(subNodeText[0].getElementsByClassName('background-entity__summary-definition--title')!=-1){
          if(subNodeText[0].childNodes[1]!=undefined){
            textHolder=subNodeText[0].childNodes[1].innerText
            if(textHolder!=(undefined||'')){
              if(following.indexOf(textHolder)==-1){
                following.push(textHolder)
              }
            }
          }
        }else{
          if(subNodeText[0].getElementsByClassName('background-entity__summary-definition--subtitle')!=-1){
            if(subNodeText[0].childNodes[4]!=undefined){
              textHolder=subNodeText[0].childNodes[4].innerText
              if(textHolder!=(undefined||'')){
                if(following.indexOf(textHolder)==-1){
                  following.push(textHolder)
                }
              }
            }
          }
        }

      }
    }
    if(following.length==0){
      following=''
    }
  } catch (error) {
    following = ''
      // console.log(error)
  }

  //recommendations
  try {
    var recommendationsBox = document.getElementsByClassName("expandable-list expandable-stepper component-card component-card--with-list recommendations-card expandable-list-profile-core");
    if(recommendationsBox[0]!=undefined){
      var recommendationsList = recommendationsBox[0].getElementsByClassName("component-card__list");
      var recommendationItems = recommendationsList[0].getElementsByClassName('recommendation recommendations-card__list-item ember-view')

      var recListCount = recommendationItems.length

      var recName;
      var recRecruiterLink;
      var recTitle;
      var recRelationship;
      var recDescription;
      var recBuilder;

      for(i=0;i<recListCount;i++){
        var subNodeHTML = recommendationItems[i]
        //Name
        try{
        recName = subNodeHTML.getElementsByClassName('t-bold t-16')[0].innerText
        }catch (error) {
          recName=''
        }

        //Title
        try{
          recTitle = subNodeHTML.getElementsByClassName('recommendation__recommender-headline t-black--light t-16')[0].innerText;
        }catch (error) {
          recTitle=''
        }

        //relationship
        try{
          recRelationship = subNodeHTML.getElementsByClassName('t-black--light t-12')[0].innerText;
        }catch (error) {
          recRelationship=''
        }

        //Description
        try{
          recDescription = subNodeHTML.getElementsByClassName('lt-line-clamp__raw-line')[0].innerText;
        }catch (error) {
          recDescription=''
        }

        if(recName!=''){
          recBuilder='## '+recName+'\n'+'**'+recTitle+'**'+'\n'+recRelationship+'\n'+'\n'+recDescription+'\n'
        }else{
          recBuilder='**'+recTitle+'**'+'\n'+recRelationship+'\n'+'\n'+recDescription+'\n'
        }

        if(recommendations.indexOf(recBuilder+'\n')==-1){
          recommendations.push(recBuilder+'\n')
        }
      }
      if(recommendations.length>1){
        recommendations=recommendations.join('').trim()
      }
      if(recommendations.length==0){
        recommendations=''
      }else{
        recommendations=recommendations.toString()
      }
    }
  } catch (error) {
    // console.log(error)
    recommendations = ''
  }

// Similar Profiles and People also Viewed
function collectSimilarProfiles(){
  var profilesBox = document.getElementsByClassName("similar-profiles__container")

  if(profilesBox.length>0){
    var profilesList = profilesBox[0].getElementsByClassName("lockup ember-view similar-profiles__row")
    var profileCount = profilesList.length;

    for (i=0;i<profileCount;i++) {
      if(profilesList[i].getElementsByClassName("artdeco-entity-lockup__title ember-view")[0]!=undefined){
        var profileLink = profilesList[i].getElementsByClassName("artdeco-entity-lockup__title ember-view")[0].getElementsByTagName('a')[0].href
      }

      if(profilesList[i].getElementsByTagName("img")[0]!=undefined){
        var profileImageLink = profilesList[i].getElementsByTagName("img")[0].src
      }

      if(profilesList[i].getElementsByClassName("artdeco-entity-lockup__title ember-view")[0]!=undefined){
        var profileName = profilesList[i].getElementsByClassName("artdeco-entity-lockup__title ember-view")[0].innerText
      }

      if(profilesList[i].getElementsByClassName("artdeco-entity-lockup__subtitle ember-view")[0]!=undefined){
        var profileHeadline = profilesList[i].getElementsByClassName("artdeco-entity-lockup__subtitle ember-view")[0].innerText

              if(profileHeadline!=undefined){

                  var atQuote = /at/g
                  var atSymbol = '@'
                  var enQuote = /en/g
                  var pipeCheck = '|'

                  var headlineAtSymbolCheck;
                  var headlineAtWordCheck;
                  var headlineEnWordCheck;
                  var headlinePipeCheck;

                  if(profileHeadline!=undefined){
                    if(profileHeadline.match(atSymbol)!=null){
                      headlineAtSymbolCheck=true;
                    }else{
                      headlineAtSymbolCheck=false;
                    }
                    if(profileHeadline.match(atQuote)!=null){
                      headlineAtWordCheck=true;
                    }else{
                      headlineAtWordCheck=false;
                    }
                    if(profileHeadline.match(enQuote)!=null){
                      headlineEnWordCheck=true;
                    }else{
                      headlineEnWordCheck=false;
                    }
                    if(profileHeadline.match(pipeCheck)!=null){
                      headlinePipeCheck=true;
                    }else{
                      headlinePipeCheck=false;
                    }
                  }else{
                    headlineAtSymbolCheck=false
                    headlineAtWordCheck=false
                    headlineEnWordCheck=false
                    headlinePipeCheck=false
                  }


                if(headlineAtSymbolCheck==true){
                    var companyBuilder = profileHeadline.split("@")
                    if(companyBuilder.length>1){
                      extraProfileTitle = companyBuilder[0]
                      extraProfileCompany = companyBuilder[1]
                    }else{
                      extraProfileTitle = companyBuilder[0]
                      extraProfileCompany= companyBuilder[0]
                    }
                }else if(headlineAtWordCheck==true){
                      var companyBuilder = profileHeadline.split(" at ")
                      if(companyBuilder.length>1){
                        extraProfileTitle = companyBuilder[0]
                        extraProfileCompany = companyBuilder[1]
                      }else{
                        extraProfileTitle = companyBuilder[0]
                        extraProfileCompany= companyBuilder[0]
                      }
                  }else if(headlineEnWordCheck==true){
                    var companyBuilder = profileHeadline.split(" en ")
                    if(companyBuilder.length>1){
                      extraProfileTitle = companyBuilder[0]
                      extraProfileCompany = companyBuilder[1]
                    }else{
                      extraProfileTitle = companyBuilder[0]
                      extraProfileCompany= companyBuilder[0]
                    }
                  }else if(headlinePipeCheck==true){
                    var companyBuilder = profileHeadline.split("|")
                    if(companyBuilder.length>1){
                      extraProfileTitle = companyBuilder[0]
                      extraProfileCompany = companyBuilder[1]
                    }else{
                      extraProfileTitle = companyBuilder[0]
                      extraProfileCompany= companyBuilder[0]
                    }
                 }else{
                    if(profileHeadline!=undefined){
                      extraProfileTitle = profileHeadline
                      extraProfileCompany= profileHeadline
                    }else{
                      extraProfileCompany='Company undefined'
                      extraProfileTitle='Title undefined'
                    }

                  }
                }else{
                  extraProfileCompany='Company undefined'
                  extraProfileTitle='Title undefined'
                }

      }

      if(profilesList[i].getElementsByClassName("artdeco-entity-lockup__metadata ember-view")[0]!=undefined){
        var profileLocation = profilesList[i].getElementsByClassName("artdeco-entity-lockup__metadata ember-view")[0].innerText
        if(profileLocation!=undefined){
          if(profileLocation!=undefined){
            extraProfileLocation = profileLocation
          }else{
            extraProfileLocation = 'Location undefined'
          }

        }else{
          extraProfileLocation = 'Location undefined'
        }
      }
      if(profilesList[i].getElementsByClassName("artdeco-entity-lockup__degree")[0]!=undefined){
        var connectionSimDegree = profilesList[i].getElementsByClassName("artdeco-entity-lockup__degree")[0].innerText

        if(connectionSimDegree.match(/[·]/g)!=null){
          connectionSimDegree=connectionSimDegree.replace(/[·]/g, '').trim();
        }
      }

      if(profileLink!=undefined){
        uniqueSimID = profileLink.replace('https://www.linkedin.com/talent/profile/','')
        if(uniqueSimID.indexOf('#')!=-1){
          uniqueSimID = uniqueSimID.replace('#','')
        }
      }

      similarProfiles.push([profileName,extraProfileTitle,extraProfileCompany,extraProfileLocation,profileLink,profileImageLink,connectionSimDegree,uniqueSimID])

  }
}

        chrome.storage.local.set({
          similarProfiles
        });

        sendSimLeadsToBackground()
}


chrome.storage.local.get({
  collectSimProfiles: []
}, function(data) {
  collectSimProfiles = data.collectSimProfiles;
  if(collectSimProfiles==true){
      collectSimilarProfiles()
  }else{
  }
});


try {
  var summaryBox = document.getElementsByClassName("component-card summary-card");

  var summaryLength
  var jobTitle=[]
  var jobType=[]
  var locations=[]
  var workplaceType=[]
  var openToWorkBuilder

  var senderTitleHolder=[]
  var senderjobTypeHolder=[]
  var senderlocationsHolder=[]
  var senderworkplaceTypeHolder=[]

   var openToOpportunities=''

  if(summaryBox[0]!=undefined){
    var openToWorkButton = summaryBox[0].getElementsByClassName('accordion-item')
    if(openToWorkButton.length>0){
      var accordianBox = openToWorkButton[0].getElementsByClassName('accordion-body summary-card__accordion-body')
      if(accordianBox.length>0){
        var workOptions = accordianBox[0].getElementsByClassName('open-candidate artdeco-list ember-view')
        if(workOptions.length>0){
          var checkerHolder = workOptions[0].getElementsByClassName('open-candidate__item artdeco-list__item')
          //locations
          var locationChecker = workOptions[0].getElementsByClassName('open-candidate__location-item artdeco-list__item')
            if(locationChecker.length>0){
              var locationItems = locationChecker[0].getElementsByClassName('open-candidate__list-item open-candidate__list-item-location')
              if(locationItems.length>0){
                for(t=0;t<locationItems.length;t++){
                  if(locations.indexOf(locationItems[t].innerText)==-1){
                    locations.push(locationItems[t].innerText+'\n')
                    if(senderlocationsHolder.indexOf(locationItems[t].innerText)==-1){
                      senderlocationsHolder.push(locationItems[t].innerText)
                    }
                  }
                }
              }
            }

          for(k=0;k<checkerHolder.length;k++){
            var spanChecker = checkerHolder[k].getElementsByClassName('open-candidate__item-header')

            //Job title
            if(checkerHolder[k].innerText.indexOf('Job title')!=-1){
               var listHolder = checkerHolder[k].getElementsByClassName('open-candidate__item-detail open-candidate__list')
               if(listHolder.length>0){
                 var listItems = listHolder[0].getElementsByClassName('open-candidate__list-item')
                 if(listItems.length>0){
                   for(o=0;o<listItems.length;o++){
                     if(jobTitle.indexOf(listItems[o].innerText)==-1){
                       jobTitle.push(listItems[o].innerText+'\n')
                       if(senderTitleHolder.indexOf(listItems[o].innerText)==-1){
                         senderTitleHolder.push(listItems[o].innerText)
                       }
                     }
                   }
                 }
               }
            }
            //Job type
            if(checkerHolder[k].innerText.indexOf('Job type')!=-1){
               var listHolder = checkerHolder[k].getElementsByClassName('open-candidate__item-detail open-candidate__list')
               if(listHolder.length>0){
                 var listItems = listHolder[0].getElementsByClassName('open-candidate__list-item')
                 if(listItems.length>0){
                   for(o=0;o<listItems.length;o++){
                     if(jobType.indexOf(listItems[o].innerText)==-1){
                       jobType.push(listItems[o].innerText+'\n')
                       if(senderjobTypeHolder.indexOf(listItems[o].innerText)==-1){
                         senderjobTypeHolder.push(listItems[o].innerText)
                       }
                     }
                   }
                 }
               }
            }
            //workplace types
            if(checkerHolder[k].innerText.indexOf('Workplace type')!=-1){
               var listHolder = checkerHolder[k].getElementsByClassName('open-candidate__item-detail open-candidate__list')
               if(listHolder.length>0){
                 var listItems = listHolder[0].getElementsByClassName('open-candidate__list-item')
                 if(listItems.length>0){
                   for(o=0;o<listItems.length;o++){
                     if(workplaceType.indexOf(listItems[o].innerText)==-1){
                       workplaceType.push(listItems[o].innerText+'\n')
                       if(senderworkplaceTypeHolder.indexOf(listItems[o].innerText)==-1){
                         senderworkplaceTypeHolder.push(listItems[o].innerText)
                       }
                     }
                   }
                 }
               }
            }
          }
        }

        if(jobTitle.length>0){
          jobTitle=jobTitle.join('')
        }else{
          jobTitle=''
        }
        if(jobType.length>0){
          jobType=jobType.join('')
        }else{
          jobType=''
        }
        if(locations.length>0){
          locations=locations.join('')
        }else{
          locations=''
        }
        if(jobTitle.length>0){
          workplaceType=workplaceType.join('')
        }else{
          workplaceType=''
        }

          openToWorkBuilder='**Job Titles**'+'\n'+jobTitle+'\n'+'**Job Types**'+'\n'+jobType+'\n'+'**Locations**'+'\n'+locations+'\n'+'**Workplace Types**'+'\n'+workplaceType+'\n'

          openToWorkBuilderArray=[fullName,jobTitle,jobType,senderlocationsHolder,workplaceType,recruiterURL,skills,title,company,currentPositionLength,totalNumOfYears,linkedIn,industry]
          chrome.storage.local.set({
            openToWorkBuilderArray
          });

          var collectOpenToWorkProfiles
          chrome.storage.local.get({
            collectOpenToWorkProfiles: []
          }, function(data) {
            collectOpenToWorkProfiles = data.collectOpenToWorkProfiles;
            if(collectOpenToWorkProfiles==true){
                sendOpentToWorkLeadsToBackground()
            }else{
            }
          });




      }else{
        if(openToWorkButton[0].getElementsByClassName('open-to-work-insights__item').length>0){
          openToWorkBuilder=openToWorkButton[0].getElementsByClassName('open-to-work-insights__item')[0].innerText
        }
      }

          if(openToWorkBuilder!=undefined){
            openToOpportunities=openToWorkBuilder.toString()

          }else{
            openToOpportunities=''
          }
    }
  }
} catch (error) {
  // console.log(error)
}

//Number of connections
try {
  var connectionHold = document.getElementsByClassName('topcard-condensed__content-left')[0]
  if(connectionHold!=undefined){
    var lockupEmberView = connectionHold.getElementsByClassName('artdeco-entity-lockup__metadata ember-view')[0]
    var tempString = lockupEmberView.getElementsByClassName('lockup__connections')[0].innerText;
    if(tempString.indexOf(/[+]/g)!=-1){
        tempString=tempString.replace(/[+]/g, '').trim();
    }
    tempString=parseInt(tempString).toString().trim()
    connectionNum=tempString
  }
} catch (error) {
  // console.log(error)
  connectionNum = '';
}

//Check length of profile:
try {

  // summary and experience boxes
  var summaryBox = document.getElementsByClassName("component-card summary-card");
  var summaryLength
  if(summaryBox[0]!=undefined){
    var summaryTextHolder = summaryBox[0].getElementsByClassName("summary-card__section");
    if(summaryTextHolder.length>0){
      if(summaryTextHolder[0].getElementsByClassName('lt-line-clamp__raw-line')[0]!=undefined){
        summaryLength = summaryTextHolder[0].getElementsByClassName('lt-line-clamp__raw-line')[0].innerText.split(' ').length;
      }else{
          summaryLength = 0;
      }

    }else{
      summaryLength = 0;
    }
  }else{
    summaryLength = 0;
  }

  var experienceList = document.getElementsByClassName('expandable-list-profile-core__list-item ember-view');

  if(experienceList.length>0){
    for(i=0;i<experienceList.length;i++){
      var bodyBuilder;
      if(bodyBuilder==undefined){
        bodyBuilder="";
      }
      bodyBuilder = bodyBuilder + experienceList[i].innerText + '\n';
    }
  }
  var bodyLength = WordCount(bodyBuilder);
  profileLength=bodyLength+summaryLength;
} catch (error) {
  // console.log(error)
}

//Check page for websites//emails

try {
  var listedSite;
  var scrapedSite;
  var personalInfoBox = document.getElementsByClassName("personal-info component-card ember-view");
  if(personalInfoBox[0]!=undefined){
    var websiteSection = personalInfoBox[0].getElementsByClassName('personal-info__subsection')
    var websiteSectionLength = websiteSection.length;
    if(websiteSectionLength>0){
      for(l=0;l<websiteSectionLength;l++){
        if(websiteSection[l+1]!=undefined){
            var foundWebsite = websiteSection[l+1].getElementsByTagName('a')
            if (foundWebsite != undefined) {
              if(foundWebsite.length>=1){
                for(y=0;y<foundWebsite.length;y++){
                  var websiteUrl=websiteSection[l+1].getElementsByTagName('a')[y].href
                  if (websites.indexOf(websiteUrl) == -1) {
                    if(websiteUrl.indexOf('_')!=-1){
                      websiteUrl=websiteUrl.replace('_',"%5f")
                    }
                    websites.push('['+websiteUrl+']('+websiteUrl+')');
                  }
                }
              }
            }
          }
        }
      }
    }
    try {
      var summaryBox = document.getElementsByClassName("component-card summary-card");
      var summaryTextHolder = summaryBox[0].getElementsByClassName("summary-card__section");
      if(summaryTextHolder.length>0){
        summary = summaryTextHolder[0].getElementsByClassName('lt-line-clamp__raw-line')[0].innerText
         var summarySites = findUrls(summary);
         for(p=0;p<summarySites.length;p++){
           if (websites.indexOf(summarySites[p].trim()) == -1) {
             websites.push(summarySites[p].trim());
           }
         }
      }

    } catch (error) {

    }
    if(websites.length==0){
       websites = ''
    }else{
      if(websites!=undefined){
        if(websites.length>1){
          websites=websites.join('\n').trim()
        }
        websites=websites.toString()
      }
    }
} catch (error) {
  // console.log(error)
 websites = ''
}

//Check for highest degree
try {
  degreeArray=[]
  var checkEducation = document.getElementsByClassName("background-section education-card ember-view");
  if(checkEducation[0]!=undefined){
    var educationBlock = checkEducation[0].getElementsByClassName('background-section__list');
    var educationPosition = educationBlock[0].getElementsByClassName('background-entity education-item recommendations-card__list-item ember-view');
    var educationPositionCount = educationPosition.length;

    for(i=0;i<educationPositionCount;i++){
      var degreeHolder = educationPosition[i].getElementsByClassName('degree-summary__description')
      if(degreeHolder.length>0){
        var highestDegree;
        for(k=0;k<degreeHolder.length;k++){

          try {
            var doctorCheck = degreeHolder[k].innerText.match(/(phd|doctor|ph\.d)/ig);
            if(doctorCheck!=null){
              if(degreeArray.indexOf("Doctorate")==-1){
                degreeArray.push("Doctorate");
              }
            }
          } catch(e){
              highestDegree = undefined;
         }

          try {
            var masterCheck = degreeHolder[k].innerText.match(/(Master|ms|MA|MBA|MPH|MSc|m\.s|m\.a|m\.|M\.A|M\.S)/g);
            if(masterCheck!=null){
              if(degreeArray.indexOf("Masters")==-1){
                degreeArray.push("Masters");
              }
            }
          } catch(e){
              highestDegree = undefined;
         }

          try {
            var bachelorsCheck = degreeHolder[k].innerText.match(/(Bach|bs|BA|BS|b\.s|b\.a|b\.|B\.A|B\.S)/g);
            if(bachelorsCheck!=null){
              if(degreeArray.indexOf("Bachelors")==-1){
                degreeArray.push("Bachelors");
              }
            }
          } catch(e){
              highestDegree = undefined;
         }
          try {
            var bachelorsCheck = degreeHolder[k].innerText.match(/(Assoc|Associate|AD|AS|AA|a\.s|a\.a|a\.|A\.A|A.B)/g);
            if(bachelorsCheck!=null){
              if(degreeArray.indexOf("Associate")==-1){
                degreeArray.push("Associate");
              }
            }
          } catch(e){
              highestDegree = undefined;
         }
        }

          var indexDoc = degreeArray.indexOf("Doctorate");
          var indexMaster = degreeArray.indexOf("Masters");
          var indexBach = degreeArray.indexOf("Bachelors");
          var indexAssoc = degreeArray.indexOf("Associate");

          if(indexDoc != -1){
            highestDegreeDisplay="Doctorate";
          }else if(indexMaster != -1){
            highestDegreeDisplay="Masters";
          }else if(indexBach != -1){
            highestDegreeDisplay="Bachelors";
          }else if(indexAssoc != -1){
            highestDegreeDisplay="Associate's";
          }else{
            highestDegreeDisplay="Could Not Identify";
          }

      }
    }
 }
} catch (error) {
   highestDegreeDisplay="Could Not Identify Highest Degree";
}

//check for profile image
try {
  var infoBox = document.getElementsByClassName('topcard-condensed__content')

  if(infoBox!=undefined){
    var imageBox = infoBox[0].getElementsByClassName('lockup__image-container')
    var noImage = imageBox[0].getElementsByClassName('lazy-image ghost-person ember-view lockup__image')

    if(noImage.length>0){
      profileImageURL='https://static-exp1.licdn.com/sc/h/euf48or6d74p938p90d6pjwkj'
    }else{
      var image = imageBox[0].getElementsByTagName('img')
      profileImageURL=image[0].getAttribute('src')
    }
  }else{
    profileImageURL='https://static-exp1.licdn.com/sc/h/euf48or6d74p938p90d6pjwkj'
  }

} catch (error) {
  profileImageURL='https://static-exp1.licdn.com/sc/h/euf48or6d74p938p90d6pjwkj'
}

dataBuilder()
}

function getRecruitingActivity(){
  var recruiterBox = document.getElementsByClassName("component-card recent-recruiting-activities");
  if(recruiterBox.length>0){
    var activityEntry = document.getElementsByClassName('ember-view recruiting-activities-entry-item__activity-entry')
    recruiterViews=0;
    for(a=0;a<activityEntry.length;a++){
      if(activityEntry[a] != undefined){
        if(activityEntry[a].innerText != undefined){
          if(activityEntry[a].innerText.indexOf('Viewed')!=-1){
            recruiterViews=recruiterViews+1;
          }
        }
      }
    }
  }
}

function sendToBackground(){
  console.log("Sending profile to Airtable!")

  chrome.runtime.sendMessage({
    directive: "sendToBackground"
  }, function(response) {});

    pageSwitcher()

}
function sendSimLeadsToBackground(){
  chrome.runtime.sendMessage({
    directive: "sendToSimilarLeads"
  }, function(response) {});
}
function sendOpentToWorkLeadsToBackground(){
  chrome.runtime.sendMessage({
    directive: "sendToOpenToWorkLeads"
  }, function(response) {});
}

//put all the data together to send to airtable
function dataBuilder(){
  if(recommendations.length==0){
    recommendations=''
  }
  if(fieldOfStudy.length==0){
    fieldOfStudy=''
  }
  if(contractorConsultant!=undefined){
    if(contractorConsultant.length==0){
      contractorConsultant=''
    }else{
      contractorConsultant=contractorConsultant.toString()
    }
  }


  let leadData = {
                "records": [{
                  "fields": {
                    "Full Name": fullName,
                    "Company": company,
                    "Industry": industry,
                    "LinkedIn": linkedIn,
                    "School": school,
                    "Location": currentLocation,
                    "Summary": summary,
                    "Experience": experience,
                    "Skills": skills,
                    "Patents": patents,
                    "Publications": publications,
                    "Title": title,
                    "Listed Projects": listedProjects,
                    "Courses": courses,
                    "Volunteer Experience": volunteerExp,
                    "Certifications": certifications,
                    "Honors and Awards": awards,
                    "Recommendations": recommendations,
                    "Following": following,
                    "Languages": languages,
                    "Views": recruiterViews,
                    "Websites": websites,
                    "Recruiter URL": recruiterURL,
                    "Connections": connectionNum,
                    "Profile Image": profileImageURL,
                    "Years of Experience": totalNumOfYears,
                    "Current Position Length": currentPositionLength,
                    "Profile Length": profileLength,
                    "Contractor Or Consultant": contractorConsultant,
                    "Open to Opportunities": openToOpportunities,
                    "Highest Degree": highestDegreeDisplay,
                    "Current Company Length": currentCompanyLength,
                    "Average Years Per Position": avgPerPosition,
                    "Sub Year Positions": shortStint,
                    "Field of Study":fieldOfStudy
                  }
                }],
                 "typecast":true
              };

      chrome.storage.local.set({
        leadData
      });

sendToBackground()

}
//Check if we can run
  function getStartStopStatus(){
      getRecruitingActivity()
    chrome.storage.local.get({
      buttonStatus: []
    }, function(data) {
      buttonStatus = data.buttonStatus;
      if (buttonStatus == 'Stop') {
        setStartVar('true')
      } else {
        setStartVar('false')
      }
    });
    }
  function setStartVar(incoming){
    checkStatus=incoming;
    pageRunner();
  }

  function pageRunner(){
    checkAPIKeyBaseIDStatus()
    var profilePageType;
    if(window.location.href.indexOf("https://www.linkedin.com/talent/search/profile/") != -1){
      profilePageType='searchResult';
    }else if(window.location.href.indexOf("https://www.linkedin.com/talent/hire/") != -1){
      profilePageType='projectResult';
    }

    if (profilePageType==('searchResult')||('projectResult')) {
      var statsTest = document.getElementsByClassName('skyline-pagination__pagination-text')
      if(statsTest.length != 0||null||undefined){
        var htmlString = document.getElementsByClassName('skyline-pagination__pagination-text')[0].childNodes[2].innerText;
        var arrayStats = htmlString.split(' of ');
        arrayStatsGlobal=arrayStats[0]
        arrayStatsGlobal2=arrayStats[1]
        chrome.storage.local.set({
          arrayStatsGlobal,
          arrayStatsGlobal2
        }, function() {});
      }else{

        if(document.getElementsByClassName('artdeco-empty-state ember-view').length>0){
       console.log("Looks like we hit an error page. Trying to refresh after 20s.")
           setTimeout(function() {
               location.reload();
           }, 20000);

       }else{
         console.log('This is a solo page, or something is broken, stopping here.')
         var buttonStatus = 'Start';
         checkStatus='false'
         chrome.storage.local.set({
           buttonStatus,
           checkStatus
         }, function() {});
         chrome.runtime.sendMessage({
           directive: "runContentScriptStop"
         }, function(response) {});
       }

      }

    if(checkStatus=='true'){
      if (document.readyState === 'complete') {

        var infoContainer = document.getElementsByClassName('lockup__content-title')[0];
        var profileInfo = infoContainer.getElementsByClassName('artdeco-entity-lockup__title ember-view')
        if(profileInfo.length==0){
          //we have a broken page and need to move on
          console.log('Page seems broken, attempting the next profile.')
          setTimeout(function() {
            document.getElementsByClassName("skyline-pagination-link__content skyline-pagination-link__content--active")[0].click()
          }, 2500); //Next Page >
        }else{

            getHVStatusFromCache()

        }
      }
    }else{
      console.log("AutoSourcer has been stopped!");
      var buttonStatus = 'Start';
      checkStatus='false'
      chrome.storage.local.set({
        buttonStatus,
        checkStatus
      }, function() {});
      chrome.runtime.sendMessage({
        directive: "runContentScriptStop"
      }, function(response) {});
    }
    }
}//end page runner

function getHVStatusFromCache() {
chrome.storage.local.get({
  arrayStatsGlobal: [],
  arrayStatsGlobal2: [],
  skipViewedProfile: []
}, function(data) {
  arrayStatsGlobal = data.arrayStatsGlobal;
  arrayStatsGlobal2 = data.arrayStatsGlobal2;
  skipViewedProfile = data.skipViewedProfile;
  var moveForward
  var lastPage
  if(parseInt(arrayStatsGlobal.replace(/,/g, ''))<parseInt(arrayStatsGlobal2.replace(/,/g, ''))){
    moveForward=true;
    lastPage=false;
  }else if(parseInt(arrayStatsGlobal.replace(/,/g, ''))==parseInt(arrayStatsGlobal2.replace(/,/g, ''))){
    //last page stop here
    moveForward=false;
    lastPage=true;
  }else{
    //something broke stop where
    moveForward=false;
  }
  if(lastPage==undefined){
    lastPage=false;
  }


 if(skipViewedProfile==true){
    var timeToWait = getRandomInt(5000, 7000);
    var arrNext = document.getElementsByClassName('skyline-pagination-link__content skyline-pagination-link__content--active');
    if(recruiterViews>0){
    //Logic for what button we need to press

    if ((moveForward==true) && (lastPage==false)){
      console.log("This profile has been viewed, waiting " + (timeToWait / 1000).toFixed(0) + " seconds to switch the profile");

      var endAndStartTimer = (function () {
        var timer; // variable persisted here
        return function () {
          window.clearTimeout(timer);
          timer = window.setTimeout(function(){

        if(arrNext[1]==undefined){

          arrNext[0].click()
          chrome.runtime.sendMessage({
           directive: "runContentScriptStart"
         }, function(response) {});
        }else{

          arrNext[1].click()
          chrome.runtime.sendMessage({
           directive: "runContentScriptStart"
         }, function(response) {});
        }

        },timeToWait);
        };
      })();
    } else if (lastPage==true) {
        console.log("This should be the last profile so we're going to stop.");
        stopAutoSourcer()
    } else {
        console.log("looks like something went wrong, stopping here!");
        stopAutoSourcer()
        reportError(['Skip Viewed Page Error',error.toString(),'Content Script','1',recruiterURL])
    }
  }else{
    scrapeData()
  }
 }else{
   skipViewedProfile = false;
   scrapeData()
 }
});
}//end getHVStatusFromCache

//pageSwitcher
  var nextPageTimer
function pageSwitcher() {

chrome.storage.local.get({
  arrayStatsGlobal: [],
  arrayStatsGlobal2: [],
  skipViewedProfile: []
}, function(data) {
  arrayStatsGlobal = data.arrayStatsGlobal;
  arrayStatsGlobal2 = data.arrayStatsGlobal2;
  skipViewedProfile = data.skipViewedProfile;

var moveForward
var lastPage
if(parseInt(arrayStatsGlobal.replace(/,/g, ''))<parseInt(arrayStatsGlobal2.replace(/,/g, ''))){
  moveForward=true;
  lastPage=false;
}else if(parseInt(arrayStatsGlobal.replace(/,/g, ''))==parseInt(arrayStatsGlobal2.replace(/,/g, ''))){
  //last page stop here
  moveForward=false;
  lastPage=true;
}else{
  //something broke stop where
  moveForward=false;
}
if(lastPage==undefined){
  lastPage=false;
}

  var timeToWait = getRandomInt(10000, 15000);
  var arrNext = document.getElementsByClassName('skyline-pagination-link__content skyline-pagination-link__content--active')

    if ((moveForward==true) && (lastPage==false)){
      console.log("Waiting " + (timeToWait / 1000) + " seconds to switch the profile");

      function clickNext(){
        if(arrNext[1]==undefined){
          arrNext[0].click()
        }else{
          arrNext[1].click()
        }
      }
      function runNextPageTimer(){
        nextPageTimer = setTimeout(function() {
          clearTimeout(resetTimer);
           clearTimeout(nextPageTimer);
          clickNext()
      }, timeToWait);
      }
        runNextPageTimer()

    } else if (lastPage==true) {
        console.log("This should be the last profile so we're going to stop.");
        stopAutoSourcer()
    } else {
        console.log("Looks like something went wrong, stopping here!");
        stopAutoSourcer()
        reportError(['Normal Page Switch Error',error.toString(),'Content Script','1',recruiterURL])
    }
});

} //end pageSwitcher

function reportError(error){
var errorData
errorData=error;
chrome.storage.local.set({
  errorData
}, function() {});

  chrome.runtime.sendMessage({
    directive: "reportError"
  }, function(response) {});
}

function stopAutoSourcer(){
  console.log('Stop requested!')
  var buttonStatus= 'Start';
  checkStatus='false'
  chrome.storage.local.set({
    buttonStatus,
    checkStatus
  }, function() {});
  chrome.runtime.sendMessage({
    directive: "runContentScriptStop"
  }, function(response) {});
}

function checkAPIKeyBaseIDStatus(){
  chrome.storage.local.get({
    apiKeyHolder: []
  }, function(data) {
    apiKeyHolder = data.apiKeyHolder;
    var apiKey = apiKeyHolder[apiKeyHolder.length - 1];
  
      if(apiKey!=undefined){
      }else{
        stopAutoSourcer()
      }
  });

  chrome.storage.local.get({
    selectedAirtable: []
  }, function(data) {
    baseID = data.selectedAirtable;
    if(baseID!=undefined){

    }else{
      stopAutoSourcer()
    }
      });
}
