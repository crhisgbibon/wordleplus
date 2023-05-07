"use strict";

const inputOutputButton = document.getElementById("inputOutputButton");
inputOutputButton.onclick = function() { SwitchSwitch() };
const ioImg = document.getElementById("ioImg");
inputOutputButton.style.backgroundColor = "var(--backgroundLight)";

const solveButton = document.getElementById("solveButton");
solveButton.onclick = function() { ToggleScreen(1) };
const ioSolve = document.getElementById("ioSolve");

const playButton = document.getElementById("playButton");
playButton.onclick = function() { NewGameOrPlayScreen() };
const ioPlay = document.getElementById("ioPlay");

const sortButton = document.getElementById("sortButton");
sortButton.onclick = function() { SwitchSort() };
const ioSort = document.getElementById("ioSort");

const resetButton = document.getElementById("resetButton");
resetButton.onclick = function() { Reset() };
const ioUndo = document.getElementById("ioUndo");

const changeDictionaryButton = document.getElementById("changeDictionaryButton");
changeDictionaryButton.onclick = function() { ToggleScreen(2) };
const ioList = document.getElementById("ioList");

const helpButton = document.getElementById("helpButton");
helpButton.onclick = function() { ToggleScreen(3) };
const ioInfo = document.getElementById("ioInfo");

let toggleScreenNumber = 0;

const otherControls = document.getElementById("otherControls");
const playTextPanel = document.getElementById("playTextPanel");
playTextPanel.style.display = "none";

// solve input screen
let solveString = "";

const solveCenter = document.getElementById("solveCenter");

const solveCenterMessageBox = document.getElementById("solveCenterMessageBox");

const solveArray = document.getElementsByClassName("solveInput");
const solveLength = solveArray.length;

const solveCenterOutputBox = document.getElementById("solveCenterOutputBox");

const solveCenterOutputText = document.getElementById("solveCenterOutputText");

const goSolveItButton = document.getElementById("goSolveItButton");
goSolveItButton.onclick = function() { ValidateSolve() };

const randomSolveButton = document.getElementById("randomSolveButton");
randomSolveButton.onclick = function() { RandomSolve() };

// dictionary screen
const dictionaryCenter = document.getElementById("dictionaryCenter");

const d1 = document.getElementById("d1");
d1.onclick = function() { ChangeDictionary(1) };

const d2 = document.getElementById("d2");
d2.onclick = function() { ChangeDictionary(2) };

const d3 = document.getElementById("d3");
d3.onclick = function() { ChangeDictionary(3) };

const d4 = document.getElementById("d4");
d4.onclick = function() { ChangeDictionary(4) };

const d5 = document.getElementById("d5");
d5.onclick = function() { ChangeDictionary(5) };

const d6 = document.getElementById("d6");
d6.onclick = function() { ChangeDictionary(6) };

const d7 = document.getElementById("d7");
d7.onclick = function() { ChangeDictionary(7) };

const guessFromAnswerCheck = document.getElementById("guessFromAnswerCheck");
// false means check against w7, rather than against answer list
let guessFromAnswers = true;
guessFromAnswerCheck.onclick = function() { ChangeGuessFrom() };

/*
// wordle lists
const d8 = document.getElementById("d8");
d8.setAttribute("onclick", "ChangeDictionary(8)");

const d9 = document.getElementById("d9");
d9.setAttribute("onclick", "ChangeDictionary(9)");

const dArray = [d1, d2, d3, d4, d5, d6, d7, d8, d9];
*/

const dArray = [d1, d2, d3, d4, d5, d6, d7];
const dLength = dArray.length;
dArray[2].style.backgroundColor = "var(--green)";

// info screen

const infoPlay = document.getElementById("infoPlay");
const infoSwitch = document.getElementById("infoSwitch");
const infoSort = document.getElementById("infoSort");
const infoSolve = document.getElementById("infoSolve");
const infoList = document.getElementById("infoList");
const infoTheme = document.getElementById("infoTheme");
const infoInfo = document.getElementById("infoInfo");
const infoReset = document.getElementById("infoReset");

// play screen

const playCenter = document.getElementById("playCenter");

const playCenterRandomButton = document.getElementById("playCenterRandomButton");
playCenterRandomButton.onclick = function() { PlayRandomNewGame() };

const playCenterDailyButton = document.getElementById("playCenterDailyButton");
playCenterDailyButton.onclick = function() { StartDaily() };

const playPlay = document.getElementById("playPlay");
const playGlobe = document.getElementById("playGlobe");
const playSand = document.getElementById("playSand");
const playChart1 = document.getElementById("playChart1");
playChart1.onclick = function() { ShowChart(1) };
const playChart2 = document.getElementById("playChart2");
playChart2.onclick = function() { ShowChart(2) };
const playLeaderboard = document.getElementById("playLeaderboard");

const playCenterArcadeButton = document.getElementById("playCenterArcadeButton");
playCenterArcadeButton.onclick = function() { PlayArcadeNewGame() };

const playCenterLeaderboardButton = document.getElementById("playCenterLeaderboardButton");
playCenterLeaderboardButton.onclick = function() { ShowLeaderboard(1) };

// clue screen
const clueCenter = document.getElementById("clueCenter");
const clueCenterOutputText = document.getElementById("clueCenterOutputText");
const getClueButton = document.getElementById("getClueButton");
getClueButton.onclick = function() { RequestClue() };
const closeClueButton = document.getElementById("closeClueButton");
closeClueButton.onclick = function() { ShowClueScreen() };

// stop user requesting clue when still processing last request
let working = false;

// clue array
const clueInputArray = document.getElementsByClassName("clueInput");
const clueLength = clueInputArray.length;

let clueArray = [];
let showClue = false;

// name input screen
let nameString = "";

const nameCenter = document.getElementById("nameCenter");
const nameArray = document.getElementsByClassName("nameInput");
const nameLength = nameArray.length;

const nameCenterOutputText = document.getElementById("nameCenterOutputText");

let nameScreenBool = false;

const enterNameButton = document.getElementById("enterNameButton");
enterNameButton.onclick = function() { SubmitToLeaderboard() };

const exitNameButton = document.getElementById("exitNameButton");
exitNameButton.onclick = function() { CloseNameEnter() };

// chart Screen
const chartCenter = document.getElementById("chartCenter");
const closeChartButton = document.getElementById("closeChartButton");
closeChartButton.onclick = function() { ShowChart(3) };

let chartType = document.getElementById("chartType");

let chartPlayed = document.getElementById("chartPlayed");
let chartPercent = document.getElementById("chartPercent");
let chartCurrent = document.getElementById("chartCurrent");
let chartMax = document.getElementById("chartMax");
let chartOne = document.getElementById("chartOne");
let chartTwo = document.getElementById("chartTwo");
let chartThree = document.getElementById("chartThree");
let chartFour = document.getElementById("chartFour");
let chartFive = document.getElementById("chartFive");
let chartSix = document.getElementById("chartSix");
let chartFailed = document.getElementById("chartFailed");

let cleanChartButton = document.getElementById("cleanChartButton");
cleanChartButton.onclick = function() { ClearData() };

const chartClose = document.getElementById("chartClose");
const chartErase = document.getElementById("chartErase");

// leaderboard screen

const leaderboardCenter = document.getElementById("leaderboardCenter");
const leaderBoardData = document.getElementById("leaderBoardData");

const closeLeaderboardButton = document.getElementById("closeLeaderboardButton");
closeLeaderboardButton.onclick = function() { ShowLeaderboard(2) };

let refreshLeaderboardButton = document.getElementById("refreshLeaderboardButton");
refreshLeaderboardButton.onclick = function() { FillLeaderboard() };

const refreshLeaderboardIMG = document.getElementById("refreshLeaderboardIMG");
const closeLeaderboardIMG = document.getElementById("closeLeaderboardIMG");

// text inputs
const wArray = document.getElementsByClassName("wordInput");
const wLength = wArray.length;

// toggle state buttons
const sArray = document.getElementsByClassName("stateButton");
const sLength = sArray.length;

for(let i = 0; i < sLength; i++)
{
  sArray[i].onclick = function() { SwitchState() };
}

// keyboard
const kArray = document.getElementsByClassName("keyboardButtons");
const kLength = kArray.length;

// filter words
const fArray = document.getElementsByClassName("wordFilter");
const fLength = fArray.length;

for(let i = 0; i < kLength; i++)
{
  kArray[i].onclick = function() { Toggle(i) };
}

// tabs
const guessTableCenter = document.getElementById("guessTableCenter");
const listTableCenter = document.getElementById("listTableCenter");

const keyboardTableCenter = document.getElementById("keyboardTableCenter");

listTableCenter.style.display = "none";
guessTableCenter.style.display = "";

keyboardTableCenter.style.display = "";

// table body
const wordTableListBody = document.getElementById("wordTableListBody");

// variables

let wordStore = [];

const qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "?",
  "Z", "X", "C", "V", "B", "N", "M", "-", ">", "<"];
  
const alphabet = ["Q","W","E","R","T","Y","U","I","O","P",
  "A","S","D","F","G","H","J","K","L",
  "Z","X","C","V","B","N","M"];
  
let currentTab = "input";

let keyBoardSearch = false;

const toggleLetters = [];
for(var i = 0; i < 26; i++)
{
  toggleLetters.push(true);
}

let inputString = "";
let searchString = "";

let dictionary = 3;

// true = input, false = output
let currentPage = true;

// true = sort by AZ, false = sort by score - first list loaded is by score
let sortAZ = false;

let playing = false;
let guessLevel = 0;
let winCount = 0;

// retrieve JSON from local storage of random results
let savedResultsRandom = [];
let savedCurrentStreakRandom = 0;
let savedMaxStreakRandom = 0;
if(localStorage.savedResultsRandom)
{
  savedResultsRandom = JSON.parse(localStorage.savedResultsRandom);
}
else
{
  savedResultsRandom = [];
}
if(localStorage.savedResultsRandom)
{
  savedCurrentStreakRandom = localStorage.savedCurrentStreakRandom;
}
else
{
  savedCurrentStreakRandom = 0;
}
if(localStorage.savedMaxStreakRandom)
{
  savedMaxStreakRandom = localStorage.savedMaxStreakRandom;
}
else
{
  savedMaxStreakRandom = 0;
}

// retrieve JSON from local storage of daily results
let savedResultsDaily = [];
let savedCurrentStreakDaily = 0;
let savedMaxStreakDaily = 0;
// additionally need to save the last daily completed and the guesses used
// this loads in if user has only partially or wholly completed wordle
// date saved as string YYYY-MM-DD
let savedDailyLastDatePlayed = "";
// guesses saved as JSON list, parsed into JS array
// boolean to determine when loading saves so not to save reload as new victory
let loadingSaves = false;
let savedDailyLastGuessSet = [];
if(localStorage.savedResultsDaily)
{
  savedResultsDaily = JSON.parse(localStorage.savedResultsDaily);
}
else
{
  savedResultsDaily = [];
}
if(localStorage.savedCurrentStreakDaily)
{
  savedCurrentStreakDaily = localStorage.savedCurrentStreakDaily;
}
else
{
  savedCurrentStreakDaily = 0;
}
if(localStorage.savedMaxStreakDaily)
{
  savedMaxStreakDaily = localStorage.savedMaxStreakDaily;
}
else
{
  savedMaxStreakDaily = 0;
}
// saved data on current day's game
if(localStorage.savedDailyLastDatePlayed)
{
  savedDailyLastDatePlayed = localStorage.savedDailyLastDatePlayed;
}
else
{
  savedDailyLastDatePlayed = "";
}
if(localStorage.savedDailyLastGuessSet)
{
  savedDailyLastGuessSet = JSON.parse(localStorage.savedDailyLastGuessSet);
}
else
{
  savedDailyLastGuessSet = [];
}

// Random, Daily, Arcade
let gameState = "Random";

let arcadeCount = 0;
let arcadeTimer = 0;
let arcadeClues = 0;
let arcadeInterval = undefined;
let arcadeActive = false;
let arcadeReset = false;
let arcadePaused = true;

FillChart();

let chartShow = false;
let leaderShow = false;

// while true shows the think screen
let thinking = false;

chartCenter.style.display = "none";
clueCenter.style.display = "none";
dictionaryCenter.style.display = "none";
leaderboardCenter.style.display = "none";
listTableCenter.style.display = "none";
nameCenter.style.display = "none";
playCenter.style.display = "none";
solveCenter.style.display = "none";

// functions

function Reset()
{
  if(playing) return;
  
  if(chartShow)
  {
    ShowChart(3);
  }
  
  if(leaderShow)
  {
    ShowLeaderboard(2);
  }
  
  if(showClue)
  {
    ShowClueScreen();
  }

  // clear the input grid
  for(let i = 0; i < wLength; i++)
  {
    wArray[i].value = "";
    wArray[i].dataset.state = "excluded";
    wArray[i].style.backgroundColor = "var(--backgroundLight)";
    let el = document.getElementById("s" + wArray[i].id[1] + wArray[i].id[2]);
    el.dataset.state = "excluded";
  }
  
  // reset the keyboard
  inputString = "";
  searchString = "";
  keyBoardSearch = false;
  for(var i = 0; i < 26; i++)
  {
    toggleLetters[i] = true;
  }
  for(var i = 0; i < kLength; i++)
  {
    kArray[i].style.backgroundColor = "var(--backgroundLight)";
  }
  
  // reset the filter grid and repopulate with the saved current dictionary sorted by score
  for(var i = 0; i < fLength; i++)
  {
    fArray[i].value = "";
  }
  FillOutput(wordStore);
  sortAZ = false;
  Sort();
  
  // reset the solve center
  solveString = "";
  solveCenterOutputText.innerHTML = "";
  for(let i = 0; i < solveLength; i++)
  {
    solveArray[i].value = "";
  }
  
  // turn off overlay screens
  ToggleScreen(0);
  inputOutputButton.style.backgroundColor = "var(--backgroundLight)";
}

function SwitchSwitch()
{
  if(playing) return;
  
  if(chartShow)
  {
    ShowChart(3);
  }
  
  if(leaderShow)
  {
    ShowLeaderboard(2);
  }
  
  if(showClue)
  {
    ShowClueScreen();
  }
  
  if(inputOutputButton.style.backgroundColor === "var(--backgroundLight)")
  {
    currentPage = !currentPage;
  }
  Switch();
}

function Switch()
{ 
  ToggleScreen(0);
  
  if(currentPage)
  {    
    let src1 = "images/keyboard.svg";
    
    ioImg.src = src1;
    
    guessTableCenter.style.display = "";
    listTableCenter.style.display = "none";
    
    currentTab = "input";
  }
  else
  {
    let src1 = "images/list.svg";
    
    ioImg.src = src1;
    
    guessTableCenter.style.display = "none";
    listTableCenter.style.display = "";
    
    currentTab = "output";
  }

  inputOutputButton.style.backgroundColor = "var(--backgroundLight)";
}

function Solve(word)
{
  if(playing) return;
  
  thinking = true;

  $.ajax(
  {
    method: "POST",
    url: "/Solve",
    data:
    {
      action:'Solve',
      dictionary:dictionary,
      solveAttempt:word
    },
    success:function(result)
    {
      if(result === "-1")
      {
        solveCenterOutputText.innerHTML = "This word is not in the current dictionary.";
        AnimatePop(solveCenterOutputText);
      }
      else
      {
        let tempArray = JSON.parse(result);
        SolveResponse(tempArray[2], tempArray[0]);
        FillOutput(tempArray[1]);
        
        if(toggleScreenNumber == 1)
        {
          ToggleScreen(0);
        }
        solveCenterOutputText.innerHTML = "";
        currentPage = true;
        Switch();
      }
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

async function SolveResponse(outputList, guessList)
{
  let guessArr = [];
  let guessCount = guessList.length;
  
  for(let i = 0; i < guessCount; i++)
  {
    let iLength = guessList[i].length;
    
    if(iLength > 0)
    {
      for(var g = 0; g < iLength; g++)
      {
        guessArr.push(guessList[i][g]);
      }
    }
  }
  
  let newInput = guessArr.toString();
  let trimResult = newInput.replace(/\s*,\s*|\s+,/g, '');
  inputString = trimResult;
  
  let colorArr = [];
  for(let i = 0; i < outputList.length; i++)
  {
    for(let n = 0; n < outputList[i].length; n++)
    {
      colorArr.push(outputList[i][n]);
    }
  }
  
  let cLength = colorArr.length;
  
  // clear array
  for(let i = 0; i < wLength; i++)
  {
    let el = document.getElementById("s" + wArray[i].id[1] + wArray[i].id[2]);
    wArray[i].value = "";
    wArray[i].style.backgroundColor = "var(--backgroundLight)";
    wArray[i].dataset.state = "excluded";
    el.dataset.state = "excluded";
    wArray[i].style.backgroundColor = "var(--backgroundLight)";
  }
  
  // add format to letters
  for(let i = 0; i < cLength; i++)
  {
    let el = document.getElementById("s" + wArray[i].id[1] + wArray[i].id[2]);
    
    await Sleep(100);
    
    wArray[i].value = guessArr[i];
    AnimateOnColour(wArray[i]);
    
    if(colorArr[i] == -1)
    {
      continue;
    }
    else if(colorArr[i] == 1)
    {
      wArray[i].dataset.state = "wrongPosition";
      el.dataset.state = "wrongPosition";
      wArray[i].style.backgroundColor = "var(--yellow)";
    }
    else if(colorArr[i] == 2)
    {
      wArray[i].dataset.state = "rightPosition";
      el.dataset.state = "rightPosition";
      wArray[i].style.backgroundColor = "var(--green)";
    }
  }
}

function SwitchState()
{
  if(playing) return;
  
	let el = document.getElementById(event.target.id);
	let el2 = document.getElementById("w" + event.target.id[1] + event.target.id[2]);
	
	if(el.dataset.state === undefined || el.dataset.state === "" ||el.dataset.state === "excluded")
	{
		el.dataset.state = "wrongPosition";
		el2.dataset.state = "wrongPosition";
		el2.style.backgroundColor = "var(--yellow)";
	}
	else if(el.dataset.state === "wrongPosition")
	{
		el.dataset.state = "rightPosition";
		el2.dataset.state = "rightPosition";
		el2.style.backgroundColor = "var(--green)";
	}
	else if(el.dataset.state === "rightPosition")
	{
		el.dataset.state = "excluded";
		el2.dataset.state = "excluded";
		el2.style.backgroundColor = "var(--backgroundLight)";
	}
}

function SwitchSort()
{
  if(playing) return;
  
  sortAZ = !sortAZ;
  Sort();
}

function Sort()
{
  if(playing) return;
  
  let allDiv = document.getElementsByClassName('wordListClass');
  if(allDiv.length == 0) return;
  allDiv = Array.prototype.slice.call(allDiv, 0);
  
  let sortBy = 0;
  
  if(sortAZ)
  {
    let src1 = "images/sortAZ.svg";
  
    ioSort.src = src1;
    
    sortBy = 0;
  }
  else
  {
    let src1 = "images/crown.svg";
  
    ioSort.src = src1;

    sortBy = 1;
  }

  allDiv.sort(function(a, b)
  {
    let f1 = undefined;
    let f2 = undefined;

    if(sortBy == 0) // alphabetical
    {
      f1 = a.children[1].innerHTML.toUpperCase() + a.children[2].innerHTML.toUpperCase() + a.children[3].innerHTML.toUpperCase() + a.children[4].innerHTML.toUpperCase() + a.children[5].innerHTML.toUpperCase();
      f2 = b.children[1].innerHTML.toUpperCase() + b.children[2].innerHTML.toUpperCase() + b.children[3].innerHTML.toUpperCase() + b.children[4].innerHTML.toUpperCase() + b.children[5].innerHTML.toUpperCase();
    }
    if(sortBy == 1) // word score
    {
      f2 = parseInt(a.children[6].innerHTML);
      f1 = parseInt(b.children[6].innerHTML);	
    }

    if(f1 < f2) return 1, -1;
      else return -1, 1;
  });

  wordTableListBody.innerHTML = "";
	
	document.getElementById("totalWordCount").value = allDiv.length;

  for(let i = 0; i < allDiv.length; i++)
  {
		allDiv[i].children[0].innerHTML = i + 1;
    wordTableListBody.appendChild(allDiv[i]);
  }
}

function ChangeDictionary(dictionary1)
{
  thinking = true;
  
  wordTableListBody.innerHTML = "";
  
  for(let i = 0; i < dLength; i++)
  {
    if(i == (dictionary1 - 1))
    {
      dArray[i].style.backgroundColor = "var(--green)";
    }
    else
    {
       dArray[i].style.backgroundColor = "var(--backgroundLight)";
    }
  }

  $.ajax(
  {
    method: "POST",
    url: "/ChangeDictionary",
    data:
    {
      action:'ChangeDictionary',
      request:dictionary1
    },
    success:function(result)
    {
      let tempArray = JSON.parse(result);
      wordStore.length = 0;
      wordStore = tempArray;
      dictionary = dictionary1;
      FillOutput(tempArray);
      
      if(toggleScreenNumber != 0)
      {
        ToggleScreen(0);
      }
      if(searchString.length != "")
      {
        FilterWords();
      }
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

function ChangeGuessFrom()
{
  guessFromAnswers = !guessFromAnswers;
}

function FillOutput(wordArray)
{
  wordTableListBody.innerHTML = "";
  
  //document.getElementById("dictionaryName").value = dictionary;
  document.getElementById("totalWordCount").value = wordArray.length;
	
	for(let i = 0; i < wordArray.length; i++)
	{
		let row = wordTableListBody.insertRow(-1);
		row.className = "wordListClass";
		row.id = "r" + i;

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		
		// rank
		let cell0 = row.insertCell(0);
		cell0.className = "listEnd";
		// letter 1
		let cell1 = row.insertCell(1);
		cell1.className = "listCol";
		// letter 2
		let cell2 = row.insertCell(2);
		cell2.className = "listCol";
		// letter 3
		let cell3 = row.insertCell(3);
		cell3.className = "listCol";
		// letter 4
		let cell4 = row.insertCell(4);
		cell4.className = "listCol";
		// letter 5
		let cell5 = row.insertCell(5);
		cell5.className = "listCol";
		// score
		let cell6 = row.insertCell(6);
		cell6.className = "listEnd";

		// Add some text to the new cells:
    cell0.innerHTML = (i + 1);
    
		cell1.innerHTML = wordArray[i][0][0];
		cell2.innerHTML = wordArray[i][0][1];
		cell3.innerHTML = wordArray[i][0][2];
		cell4.innerHTML = wordArray[i][0][3];
		cell5.innerHTML = wordArray[i][0][4];
    
    if(wordArray[i][1] != null)
    {
      cell6.innerHTML = wordArray[i][1];
    }
	}
  
  // output from php is always ordered by rank
  sortAZ = false;
  
  let src1 = "images/crown.svg";
  
  ioSort.src = src1;
}

function Toggle(index)
{
  let key = qwerty[index];
  if(key === "<" && gameState == "Arcade" && nameScreenBool)
  {
    RemoveName();
    return;
  }
  if(key != "?" && key != "-" && key != "<" && key != ">")
  {
    if(gameState == "Arcade" && nameScreenBool)
    {
      FillArcadeButtons(true);
      AddName(key);
      return;
    }
  }
  if(key === ">" && gameState == "Arcade" && nameScreenBool)
  {
    return;
  }
  if(playing)
  {
    if(winCount == 5) return;
    if(key != "?" && key != "-" && key != "<" && key != ">")
    {
      if(inputString.length < (guessLevel * 5)) AddLetter(key);
      if(gameState != "Arcade")
      {
        if(playTextPanel.innerHTML != null) playTextPanel.innerHTML = "";
      }
      else
      {playTextPanel
        FillArcadeButtons(true);
      }
    }
    else if(key === "<")
    {
      if(inputString.length > ((guessLevel * 5) - 5)) RemoveLetter();
      if(gameState != "Arcade")
      {
        if(playTextPanel.innerHTML != null) playTextPanel.innerHTML = "";
      }
      else
      {
        FillArcadeButtons(true);
      }
    }
    else if(key === ">")
    {
      SubmitGuess();
      if(gameState != "Arcade")
      {
        if(playTextPanel.innerHTML != null) playTextPanel.innerHTML = "";
      }
      else
      {
        FillArcadeButtons(true);
      }
    }
    return;
  }
  if(key != "?" && key != "-" && key != "<" && key != ">")
  {
    if(toggleScreenNumber == 1)
    {
      AddSolve(key);
      return;
    }
    if(currentTab === "input")
    {
      if(keyBoardSearch)
      {
        let storeId = event.target.id;
        if(storeId[0] === "b")
        {
          let num = parseInt(storeId.substr(1));
          toggleLetters[num] = !toggleLetters[num];
          if(toggleLetters[num])
          {
            document.getElementById(storeId).style.backgroundColor = "var(--green)";
          }
          else
          {
            document.getElementById(storeId).style.backgroundColor = "var(--backgroundLight)";
          }
        }
      }
      else
      {
        AddLetter(key);
      }
    }
    else if(currentTab === "output")
    {
      if(keyBoardSearch)
      {
        let storeId = event.target.id;
        if(storeId[0] === "b")
        {
          let num = parseInt(storeId.substr(1));
          toggleLetters[num] = !toggleLetters[num];
          if(toggleLetters[num])
          {
            document.getElementById(storeId).style.backgroundColor = "var(--green)";
          }
          else
          {
            document.getElementById(storeId).style.backgroundColor = "var(--backgroundLight)";
          }
        }
      }
      else
      {
        AddFilter(key)
      }
    }
  }
  else if(key === "<")
  {
    if(toggleScreenNumber == 1)
    {
      RemoveSolve();
      return;
    }
    if(currentTab === "input")
    {
      RemoveLetter();
    }
    else if(currentTab === "output")
    {
      RemoveFilter();
    }
  }
  else if(key === "?")
  {
    if(toggleScreenNumber != 0)
    {
      return;
    }
    keyBoardSearch = !keyBoardSearch;
    if(keyBoardSearch)
    {
      event.target.style.backgroundColor = "var(--green)";
      
      let tLen = toggleLetters.length;
      for(let i = 0; i < tLen; i++)
      {
        if(toggleLetters[i] === true)
        {
          document.getElementById("b" + i).style.backgroundColor = "var(--green)";
        }
        else
        {
          document.getElementById("b" + i).style.backgroundColor = "var(--backgroundLight)";
        }
      }
    }
    else
    {
      event.target.style.backgroundColor = "var(--backgroundLight)";
      
      let tLen = toggleLetters.length;
      for(let i = 0; i < tLen; i++)
      {
        document.getElementById("b" + i).style.backgroundColor = "var(--backgroundLight)";
      }
    }
  }
  else if(key === "-")
  {
    if(currentTab === "output") AddFilter(key);
  }
  else if(key === ">")
  {
    if(currentTab === "input")
    {
      if(!playing)
      {
        if(keyBoardSearch)
        {
          FilterByKeys();
        }
        else
        {
          FilterByInput();
        }
      }
    }
    else if(currentTab === "output")
    {
      if(keyBoardSearch)
      {
        FilterByKeys();
      }
    }
  }
}

function FilterByInput()
{
  if(playing) return;
  
  thinking = true;
  
	let guessedWords = [];
	
  // identify the guessed words
	for(let i = 0; i < wLength; i+= 5)
	{
		let one = wArray[i].value;
		let two = wArray[i + 1].value;
		let three = wArray[i + 2].value;
		let four = wArray[i + 3].value;
		let five = wArray[i + 4].value;
		
		let word = one + two + three + four + five;
		if(word.length === 5) guessedWords.push(word);
	}
	
  let knownLetters = ["-1", "-1", "-1", "-1", "-1"];
	let excludedLetters = [];
	let knownLettersByPosition = [];
	
	class wrongPosLetter{
		wrongPosLetter(letter, count, positions)
		{
			this.letter = letter;
			this.positions = positions;
		}
	}
	
  // identify known letters + position first
	for(let i = 0; i < wLength; i++)
  {
    if(wArray[i].value === "" || wArray[i].value === "-") continue;
    
    let dataState = wArray[i].dataset.state;
    
    // if known position store directly
    if(dataState === "rightPosition")
    {
      let letterPos = wArray[i].id[2];
      knownLetters[letterPos] = wArray[i].value.toUpperCase();
      continue;
    }
  }
  
  // then log excluded letters
	for(let i = 0; i < wLength; i++)
  {
    if(wArray[i].value === "" || wArray[i].value === "-") continue;
    
    let dataState = wArray[i].dataset.state;
    
    // if excluded letters then log if not already logged
    if(dataState === "excluded" || dataState === "" || dataState === undefined)
    {
      let check = true;
      for(let e = 0; e < excludedLetters.length; e++)
      {
        if(wArray[i].value.toUpperCase() === excludedLetters[e].toUpperCase())
        {
          check = false;
        }
      }
      if(check)
      {
        excludedLetters.push(wArray[i].value.toUpperCase());
      }
    }
  }
  
  // then log wrong position letters
	for(let i = 0; i < wLength; i++)
  {
    if(wArray[i].value === "" || wArray[i].value === "-") continue;
    
    let dataState = wArray[i].dataset.state;
    
    // if excluded letters then log if not already logged
    if(dataState === "wrongPosition")
    {
      let check = true;
      
      for(let k = 0; k < knownLettersByPosition.length; k++)
      {
        if(wArray[i].value.toUpperCase() == knownLettersByPosition[k].letter.toUpperCase())
        {
          knownLettersByPosition[k].positions.push(wArray[i].id[2]);
          check = false;
        }
      }
      
      if(check)
      {
        let newWord = new wrongPosLetter();
        newWord.letter = wArray[i].value.toUpperCase();
        newWord.positions = [];
        newWord.positions.push(wArray[i].id[2]);
        knownLettersByPosition.push(newWord);
      }
    }
  }
  
  // remove any wrong position letters from excluded letters
  if(knownLettersByPosition.length > 0 && excludedLetters.length > 0)
  {
    for(let i = 0; i < knownLettersByPosition.length; i++)
    {
      for(let e = 0; e < excludedLetters.length; e++)
      {
        if(knownLettersByPosition[i].letter == excludedLetters[e])
        {
          excludedLetters.splice(e,1);
        }
      }
    }
  }

  $.ajax(
  {
    method: "POST",
    url: "/FilterByInput",
    data:
    {
      action:'FilterByInput',
      dictionary:dictionary,
      guessedWords:guessedWords,
      excludedLetters:excludedLetters,
      knownLetters:knownLetters,
      knownLettersByPosition:knownLettersByPosition
    },
    success:function(result)
    {
      let tempArray = JSON.parse(result);
      FillOutput(tempArray)
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });

	currentPage = false;
	Switch();
}

function FilterByKeys()
{
  thinking = true;
  
	let excludedLetters = [];
	
	for(let i = 0; i < toggleLetters.length; i++)
	{
		if(toggleLetters[i] === false)
		{
			excludedLetters.push(alphabet[i]);
		}
	}

  $.ajax(
  {
    method: "POST",
    url: "/FilterByKeys",
    data:
    {
      action:'FilterByKeys',
      dictionary:dictionary,
      excludedLetters:excludedLetters
    },
    success:function(result)
    {
      let tempArray = JSON.parse(result);
      if(tempArray.length > 0)
      {
        FillOutput(tempArray); 
      }
      else
      {
        wordTableListBody.innerHTML = "";
      }
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
	
  currentPage = false;
	Switch();
}

function FilterWords()
{	
	let filterLetters = ["-1", "-1", "-1", "-1", "-1"];
	
	for(let i = 0; i < fLength; i++)
	{
		if(fArray[i].value != "" && fArray[i].value != "-")
      filterLetters[i] = fArray[i].value.toUpperCase();
	}
	
	let allDiv = document.getElementsByClassName('wordListClass');
  allDiv = Array.prototype.slice.call(allDiv, 0);
	
	for(let i = 0; i < allDiv.length; i++)
	{
		let check = false;
		for(let a = 0; a < 5; a++)
		{
			if(filterLetters[a] != "-1")
			{
        let filterL = filterLetters[a].replace(/\s/g, "");
        let divL = allDiv[i].children[a + 1].innerHTML.replace(/\s/g, "");
				if(filterL != divL)
				{
					check = true;
				}
			}
		}
		if(check)
		{
			allDiv[i].style.display = "none";
		}
		else
		{
			allDiv[i].style.display = "";
		}
	}
}

document.onkeyup = function()
{
  if(event.key == "a" || event.key == "A" ||
    event.key == "b" || event.key == "B" ||
    event.key == "c" || event.key == "C" ||
    event.key == "d" || event.key == "D" ||
    event.key == "e" || event.key == "E" ||
    event.key == "f" || event.key == "F" ||
    event.key == "g" || event.key == "G" ||
    event.key == "h" || event.key == "H" ||
    event.key == "i" || event.key == "I" ||
    event.key == "j" || event.key == "J" ||
    event.key == "k" || event.key == "K" ||
    event.key == "l" || event.key == "L" ||
    event.key == "m" || event.key == "M" ||
    event.key == "n" || event.key == "N" ||
    event.key == "o" || event.key == "O" ||
    event.key == "p" || event.key == "P" ||
    event.key == "q" || event.key == "Q" ||
    event.key == "r" || event.key == "R" ||
    event.key == "s" || event.key == "S" ||
    event.key == "t" || event.key == "T" ||
    event.key == "u" || event.key == "U" ||
    event.key == "v" || event.key == "V" ||
    event.key == "w" || event.key == "W" ||
    event.key == "x" || event.key == "X" ||
    event.key == "y" || event.key == "Y" ||
    event.key == "z" || event.key == "Z")
  {
    if(gameState == "Arcade" && nameScreenBool)
    {
      FillArcadeButtons(true);
      AddName(event.key);
      return;
    }
    if(playing)
    {
      if(winCount == 5) return;
      if(inputString.length < (guessLevel * 5)) AddLetter(event.key);
      if(gameState != "Arcade")
      {
        if(playTextPanel.innerHTML != null) playTextPanel.innerHTML = "";
      }
      else
      {
        FillArcadeButtons(true);
      }
      return;
    }
    if(toggleScreenNumber == 1)
    {
      AddSolve(event.key);
      return;
    }
    if(currentTab === "input")
    {
      if(keyBoardSearch)
      {
        
      }
      else
      {
        AddLetter(event.key);
      }
    }
    else if(currentTab === "output")
    {
      AddFilter(event.key)
    }
  }
  
  if(event.key === "Backspace" || event.key === "Delete")
  {
    if(gameState == "Arcade" && nameScreenBool)
    {
      RemoveName();
      return;
    }
    if(playing)
    {
      if(winCount == 5) return;
      if(inputString.length > ((guessLevel * 5) - 5)) RemoveLetter();
      if(gameState != "Arcade")
      {
        if(playTextPanel.innerHTML != null) playTextPanel.innerHTML = "";
      }
      else
      {
        FillArcadeButtons(true);
      }
      return;
    }
    if(toggleScreenNumber == 1)
    {
      RemoveSolve();
      return;
    }
    if(currentTab === "input")
    {
      if(playing)
      {
        RemoveLetter();
      }
      else
      {
        if(keyBoardSearch)
        {
          
        }
        else
        {
          RemoveLetter();
        }
      }
    }
    else if(currentTab === "output")
    {
      RemoveFilter();
    }
  }
}

// INPUT TEXT

function AddLetter(key)
{
  if(inputString.length >= wLength) return;
  inputString += key;
  FillInput();
}

function RemoveLetter()
{
  if(inputString.length === 0) return;
  inputString = inputString.substring(0, (inputString.length - 1));
  FillInput();
}

function FillInput()
{
  for(let i = 0; i < wLength; i++)
  {
    if(i < inputString.length)
    {
      if(wArray[i].value != inputString[i])
      {
        wArray[i].value = inputString[i];
        AnimateOnInput(wArray[i]);
      }
    }
    else 
    {
      if(wArray[i].value != "")
      {
        AnimateOnInput(wArray[i]);
      }
      wArray[i].value = "";
    }
  }
  
  if(playing && inputString.length > ((guessLevel * 5) - 5))
  {
    if(inputString.length % 5 == 0)
    {
      document.getElementById("c28").style.backgroundColor = "var(--green)";
    }
    else
    {
      document.getElementById("c28").style.backgroundColor = "var(--backgroundLight)";
    }
  }
}

// FILTER SEARCH

function AddFilter(key)
{
  if(searchString.length >= 5) return;
  searchString += key;
  FillFilter();
}

function RemoveFilter()
{
  if(searchString.length === 0) return;
  searchString = searchString.substring(0, (searchString.length - 1));
  FillFilter();
}

function FillFilter()
{
  for(let i = 0; i < fLength; i++)
  {
    if(i < searchString.length)
    {
      if(fArray[i].value != searchString[i])
      {
        fArray[i].value = searchString[i];
        AnimateOnInput(fArray[i]);
      }
    }
    else
    {
      if(fArray[i].value != "")
      {
        AnimateOnInput(fArray[i]);
      }
      fArray[i].value = "";
    }
  }
  FilterWords();
}

// SOLVE INPUT

function AddSolve(key)
{
  if(solveString.length >= 5) return;
  solveString += key;
  FillSolve();
}

function RemoveSolve()
{
  if(solveString.length === 0) return;
  solveString = solveString.substring(0, (solveString.length - 1));
  FillSolve();
}

function FillSolve()
{
  for(let i = 0; i < solveLength; i++)
  {
    if(i < solveString.length)
    {
      if(solveArray[i].value != solveString[i])
      {
        solveArray[i].value = solveString[i];
        AnimateOnInput(solveArray[i]);
      }
    }
    else
    {
      if(solveArray[i].value != "")
      {
        AnimateOnInput(solveArray[i]);
      }
      solveArray[i].value = "";
    }
  }
}

// NAME INPUT

function AddName(key)
{
  if(nameString.length >= 5) return;
  nameString += key;
  FillName();
}

function RemoveName()
{
  if(nameString.length === 0) return;
  nameString = nameString.substring(0, (nameString.length - 1));
  FillName();
}

function FillName()
{
  for(let i = 0; i < nameLength; i++)
  {
    if(i < nameString.length)
    {
      if(nameArray[i].value != nameString[i])
      {
        nameArray[i].value = nameString[i];
        AnimateOnInput(nameArray[i]);
      }
    }
    else
    {
      if(nameArray[i].value != "")
      {
        AnimateOnInput(nameArray[i]);
      }
      nameArray[i].value = "";
    }
  }
}

// Toggle Overlay screens

function ToggleScreen(screenNumber)
{
  if(playing) return;
  
  if(chartShow)
  {
    ShowChart(3);
  }
  
  if(leaderShow)
  {
    ShowLeaderboard(2);
  }
  
  if(showClue)
  {
    ShowClueScreen();
  }
  
  if(screenNumber == 0) // all off
  {  
    solveCenter.style.display = "none";
    solveButton.style.backgroundColor = "var(--active)";
    
    dictionaryCenter.style.display = "none";
    changeDictionaryButton.style.backgroundColor = "var(--active)";
    
    infoCenter.style.display = "none";
    helpButton.style.backgroundColor = "var(--active)";
    
    playCenter.style.display = "none";
    playButton.style.backgroundColor = "var(--active)";
    
    toggleScreenNumber = 0;
  }
  else if(screenNumber == 1) // solve screen
  {
    if(toggleScreenNumber == 1)
    {
      solveCenter.style.display = "none";
      solveButton.style.backgroundColor = "var(--active)";
      inputOutputButton.style.backgroundColor = "var(--backgroundLight)";
      toggleScreenNumber = 0;
      
      if(keyBoardSearch)
      {
        for(var i = 0; i < 26; i++)
        {
          if(toggleLetters[i] == true)
          {
            kArray[i].style.backgroundColor = "var(--green)";
          }
          else
          {
            kArray[i].style.backgroundColor = "var(--backgroundLight)";
          }
        }
      }
    
      return;
    }
    
    if(keyBoardSearch)
    {
      for(var i = 0; i < kLength; i++)
      {
        kArray[i].style.backgroundColor = "var(--backgroundLight)";
      }
    }

    inputOutputButton.style.backgroundColor = "var(--active)";
    
    solveCenter.style.display = "";
    solveButton.style.backgroundColor = "var(--backgroundLight)";
    
    dictionaryCenter.style.display = "none";
    changeDictionaryButton.style.backgroundColor = "var(--active)";
    
    infoCenter.style.display = "none";
    helpButton.style.backgroundColor = "var(--active)";
    
    playCenter.style.display = "none";
    playButton.style.backgroundColor = "var(--active)";
    
    toggleScreenNumber = 1;
  }
  else if(screenNumber == 2) // dictionary screen
  {
    if(toggleScreenNumber == 2)
    {
      dictionaryCenter.style.display = "none";
      changeDictionaryButton.style.backgroundColor = "var(--active)";
      inputOutputButton.style.backgroundColor = "var(--backgroundLight)";
      toggleScreenNumber = 0;
      return;
    }

    inputOutputButton.style.backgroundColor = "var(--active)";
    
    solveCenter.style.display = "none";
    solveButton.style.backgroundColor = "var(--active)";
    
    dictionaryCenter.style.display = "";
    changeDictionaryButton.style.backgroundColor = "var(--backgroundLight)";
    
    infoCenter.style.display = "none";
    helpButton.style.backgroundColor = "var(--active)";
    
    playCenter.style.display = "none";
    playButton.style.backgroundColor = "var(--active)";
    
    toggleScreenNumber = 2;
  }
  else if(screenNumber == 3) // help screen
  {
    if(toggleScreenNumber == 3)
    {
      infoCenter.style.display = "none";
      helpButton.style.backgroundColor = "var(--active)";
      inputOutputButton.style.backgroundColor = "var(--backgroundLight)";
      toggleScreenNumber = 0;
      return;
    }

    inputOutputButton.style.backgroundColor = "var(--active)";
    
    solveCenter.style.display = "none";
    solveButton.style.backgroundColor = "var(--active)";
    
    dictionaryCenter.style.display = "none";
    changeDictionaryButton.style.backgroundColor = "var(--active)";
    
    infoCenter.style.display = "";
    helpButton.style.backgroundColor = "var(--backgroundLight)";
    
    playCenter.style.display = "none";
    playButton.style.backgroundColor = "var(--active)";
    
    toggleScreenNumber = 3;
  }
  else if(screenNumber == 4) // play screen
  {
    if(toggleScreenNumber == 4)
    {
      playCenter.style.display = "none";
      playButton.style.backgroundColor = "var(--active)";
      inputOutputButton.style.backgroundColor = "var(--backgroundLight)";
      nameCenter.style.display = "none";
      toggleScreenNumber = 0;
      return;
    }

    inputOutputButton.style.backgroundColor = "var(--active)";
    
    solveCenter.style.display = "none";
    solveButton.style.backgroundColor = "var(--active)";
    
    dictionaryCenter.style.display = "none";
    changeDictionaryButton.style.backgroundColor = "var(--active)";
    
    infoCenter.style.display = "none";
    helpButton.style.backgroundColor = "var(--active)";
    
    playCenter.style.display = "";
    playButton.style.backgroundColor = "var(--backgroundLight)";

    nameCenter.style.display = "none";
    
    toggleScreenNumber = 4;
  }
}

// Solve message center functions

function ValidateSolve()
{
  let wordToSolve = "";
  
  for(let i = 0; i < solveLength; i++)
  {
    let storeLetter1 = solveArray[i].value.toUpperCase();
    wordToSolve += storeLetter1;
  }
  
  if(wordToSolve == null || wordToSolve.length != 5)
	{
    if(wordToSolve != null && wordToSolve.length > 0)
    {
      solveCenterOutputText.innerHTML = "I need a 5 letter word to solve.";
      AnimatePop(solveCenterOutputText);
    }
	}
  else
  {
    Solve(wordToSolve);
    
    if(keyBoardSearch)
    {
      for(var i = 0; i < 26; i++)
      {
        if(toggleLetters[i] == true)
        {
          kArray[i].style.backgroundColor = "var(--green)";
        }
        else
        {
          kArray[i].style.backgroundColor = "var(--backgroundLight)";
        }
      }
    }
      
    solveCenterOutputText.innerHTML = "";
  }
}

function RandomSolve()
{
  if(playing) return;
  
  thinking = true;

  $.ajax(
  {
    method: "POST",
    url: "/RandomSolve",
    data:
    {
      action:'RandomSolve',
      dictionary:dictionary
    },
    success:function(result)
    {
      solveString = result;
      FillSolve();
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

// Help functions

// Play game

function NewGameOrPlayScreen()
{
  if(gameState == "Arcade")
  {
    if(arcadeActive)
    {
      TerminateArcade();
      return;
    }
    if(showClue)
    {
      ShowClueScreen();
    }
  }
  if(playing)
  {
    gameState = "Random";
    NewGame();
    if(gameState == "Arcade")
    {
      
    }
  }
  else
  {
    ToggleScreen(4);
  }
}

function PlayRandomNewGame()
{
  gameState = "Random";
  NewGame();
}

function PlayArcadeNewGame()
{
  gameState = "Arcade";
  arcadeActive = true;
  NewGame();
}

function NewGame()
{
  loadingSaves = false;
  thinking = true;
  
  if(playing == true && gameState !== "Arcade")
  {
    ResetAfterGame();
    thinking = false;
    return;
  }
  
  Reset();
  ToggleScreen(0);
  currentPage = true;
  Switch();
  
  otherControls.style.display = "none";
  playTextPanel.style.display = "";
  
  playTextPanel.innerHTML = "";
  
  playing = true;
  guessLevel = 1;
  winCount = 0;
  
  playButton.style.backgroundColor = "var(--green)";
  
  document.getElementById("c28").style.backgroundColor = "var(--backgroundLight)";
  
  if(gameState == "Random")
  {
    $.ajax(
    {
      method: "POST",
      url: "/NewGame",
      data:
      {
        action:'NewGame',
        dictionary:dictionary
      },
      success:function(result)
      {
        thinking = false;
      },
      error:function(result)
      {
        thinking = false;
      }
    });
  }
  else if(gameState == "Daily")
  {
    // session daily answer has already been set, but load any existing answers
    
    // check if the last game played was today otherwise ignore
    if(localStorage.savedDailyLastDatePlayed)
    {
      const date = new Date();
      
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      
      const todayToCheck = year + "-" + (month + 1) + "-" + day;
      
      if(localStorage.savedDailyLastDatePlayed === todayToCheck)
      {
        
        // check if there are any guesses already made today
        if(localStorage.savedDailyLastGuessSet)
        {
          let guessesMade = JSON.parse(localStorage.savedDailyLastGuessSet);
          // set to true, if the player already solved then won't save new win
          loadingSaves = true;
          demo2(guessesMade);
        }
      }
    }
    thinking = false;
  }
  else if(gameState == "Arcade")
  {
    ClearArcadeInterval();

    $.ajax(
    {
      method: "POST",
      url: "/NewArcade",
      data:
      {
        action:'NewArcade',
        dictionary:dictionary
      },
      success:function(result)
      {
        thinking = false;
      },
      error:function(result)
      {
        thinking = false;
      }
    });
    
    clueArray = [];
    
    arcadeCount = 0;
    arcadeTimer = 300;
    arcadeClues = 3;
    
    arcadePaused = false;
    
    FillArcadeButtons(true);
    
    arcadeInterval = setInterval(DegradeArcadeTimer, 1000);
    
    let updateDiv = document.getElementById("arcadeTimerDiv");
    let formatM = Math.floor(arcadeTimer / 60);
    let formatS = arcadeTimer % 60;
    if(formatS < 10) formatS = "0" + formatS;
    let formattedTime = formatM + ":" + formatS;
    if(updateDiv != null) updateDiv.innerHTML = formattedTime + " / " + arcadeCount;
  }
}

function NextArcadeGame()
{
  if(arcadeReset)
  {
    gameState = "Arcade";
    NewGame();
  }
  
  thinking = true;

  // clear the input grid
  for(let i = 0; i < wLength; i++)
  {
    wArray[i].value = "";
    wArray[i].dataset.state = "excluded";
    wArray[i].style.backgroundColor = "var(--backgroundLight)";
    let el = document.getElementById("s" + wArray[i].id[1] + wArray[i].id[2]);
    el.dataset.state = "excluded";
  }
  
  // reset the keyboard
  inputString = "";
  searchString = "";
  for(let i = 0; i < kLength; i++)
  {
    kArray[i].style.backgroundColor = "var(--backgroundLight)";
  }
  
  clueArray = [];
  for(let i = 0; i < clueInputArray.count; i++)
  {
    clueInputArray[i].style.backgroundColor = "var(--active)";
  }
  
  otherControls.style.display = "none";
  playTextPanel.style.display = "";
  guessLevel = 1;
  winCount = 0;
  
  playing = true;
  gameState = "Arcade";
  
  document.getElementById("c28").style.backgroundColor = "var(--backgroundLight)";
  
  if(gameState == "Arcade")
  {
    ClearArcadeInterval();

    $.ajax(
    {
      method: "POST",
      url: "/NewArcade",
      data:
      {
        action:'NewArcade',
        dictionary:dictionary
      },
      success:function(result)
      {
        if(arcadeReset)
        {
          arcadeCount = 0;
          arcadeTimer = 300;
          arcadeClues = 3;
          arcadeReset = false;
        }
        else
        {
          arcadeTimer = arcadeTimer + 300;
          arcadeClues = arcadeClues + 1;
        }
        
        arcadePaused = false;
        
        FillArcadeButtons(true);

        arcadeInterval = setInterval(DegradeArcadeTimer, 1000);
        
        let updateDiv = document.getElementById("arcadeTimerDiv");
        if(updateDiv != null) updateDiv.innerHTML = GetFormattedTimeAndCount();
        
        thinking = false;
      },
      error:function(result)
      {
        thinking = false;
      }
    });
  }
}

function ShowClueScreen()
{
  showClue = !showClue;
  if(showClue)
  {
    clueCenter.style.display = "";
    
    for(let i = 0; i < clueInputArray.length; i++)
    {
      clueInputArray[i].value = "";
      clueInputArray[i].backgroundColor = "var(--active)";
    }
    
    for(let i = 0; i < wArray.length; i+=5)
    {
      for(let p = 0; p < 5; p++)
      {
        if(wArray[i + p].dataset.state == "rightPosition")
        {
          clueInputArray[p].value = wArray[i+p].value;
          AnimateOnInput(clueInputArray[p]);
        }
      }
    }
    
    for(let i = 0; i < clueArray.length; i++)
    {
      let clueIndex = clueArray[i][1];
      let letter = clueArray[i][0];
      clueInputArray[clueIndex].value = letter;
    }
    
    clueCenterOutputText.innerHTML = arcadeClues + " clues remaining.";
  }
  else
  {
    clueCenter.style.display = "none";
  }
}

function RequestClue()
{
  if(working || arcadeClues == 0)
  {
    return;
  }
  working = true;
  if(arcadeClues > 0)
  {
    let clueString = "";
    
    for(let i = 0; i < 5; i++)
    {
      if(clueInputArray[i].value != "")
      {
        clueString += clueInputArray[i].value;
      }
      else
      {
        clueString += "-";
      }
    }

    $.ajax(
    {
      method: "POST",
      url: "/GetArcadeClue",
      data:
      {
        action:'GetArcadeClue',
        dictionary:dictionary,
        clue:clueString.toUpperCase()
      },
      success:function(result)
      {
        if(result === "5ERROR") return;
        let tempArray = JSON.parse(result);
        FillClue(tempArray);
        arcadeClues--;
        clueCenterOutputText.innerHTML = arcadeClues + " clues remaining.";
        let clueButton = document.getElementById("useClueArcadeButton");
        if(clueButton != null) clueButton.innerHTML = arcadeClues;
      },
      error:function(result)
      {

      }
    });
    working = false;
  }
}

function FillClue(array)
{
  clueArray.push(array);
  clueInputArray[array[1]].value = array[0];
}

function ClearArcadeInterval()
{
  clearInterval(arcadeInterval);
}

function DegradeArcadeTimer()
{
  arcadeTimer--;
  
  let updateDiv = document.getElementById("arcadeTimerDiv");
  if(updateDiv != null) updateDiv.innerHTML = GetFormattedTimeAndCount();
  
  if(arcadeTimer <= 0)
  {
    arcadePaused = true;
    FillArcadeButtons(true);
    EndArcade(true);
  }
}

function EndArcade(endGame)
{  
  let clueButton = document.getElementById("useClueArcadeButton");
  if(clueButton != null) clueButton.style.backgroundColor = "var(--backgroundLight)";
          
  let updateDiv = document.getElementById("arcadeTimerDiv");
  if(updateDiv != null) updateDiv.innerHTML = GetFormattedTimeAndCount();
  if(updateDiv != null) updateDiv.style.backgroundColor = "var(--backgroundLight)";
  
  ClearArcadeInterval();
  
  if(endGame)
  {
    arcadePaused = true;
    FillArcadeButtons(true);
    document.getElementById("endArcadeRunButton").onclick = null;
    arcadeReset = true;
    let button = document.createElement('button');
    button.innerHTML = `+`;
    button.onclick = function() { NextArcadeGame(); };
    button.id = "nextArcadeButton";
    button.className = "playSolveButtons";
    playTextPanel.appendChild(button);
    let buttonToAdd = document.getElementById("nextArcadeButton");
    AnimatePop(buttonToAdd);
    
    if(arcadeCount == 0) return;
    
    nameCenter.style.display = "";
    
    nameScreenBool = true;
  }
}

function SubmitToLeaderboard()
{
  if(nameString.length < 5)
  {
    nameCenterOutputText.innerHTML = "Please enter a five letter name.";
    AnimatePop(nameCenterOutputText);
    return;
  }
  
  let usernameToSubmit = nameString.toUpperCase();
  
  $.ajax(
  {
    method: "POST",
    url: "/SaveArcade",
    data:
    {
      action:'SaveArcade',
      dictionary:dictionary,
      gameState: gameState,
      arcadeCount: arcadeCount,
      username: usernameToSubmit
    },
    success:function(result)
    {

    },
    error:function(result)
    {

    }
  });
  TerminateArcade();
}

function ShowNameEnter()
{
  nameScreenBool = true;
  nameCenter.style.display = "";
}

function CloseNameEnter()
{
  nameScreenBool = false;
  nameCenter.style.display = "none";
}

function GetFormattedTimeAndCount()
{
  let formatM = Math.floor(arcadeTimer / 60);
  let formatS = arcadeTimer % 60;
  if(formatS < 10) formatS = "0" + formatS;
  let formattedTime = formatM + ":" + formatS + " / " + arcadeCount;
  
  return formattedTime;
}

//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep

function Sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 5; i++) {
        await Sleep(i * 1000);
    }
}

async function demo2(array)
{
  inputString = "";
  for (let i = 0; i < array.length; i++)
  {
    let newInputString = array[i].toString();
    newInputString = newInputString.replace(/,/g, '');
    
    inputString += newInputString.toUpperCase();
    let newInputStringLength = newInputString.length;
    
    let counter = 0;
    for(let m = ( i * 5 ); m < ( ( i * 5 ) + newInputStringLength ); m++)
    {
      wArray[m].value = newInputString[counter];
      AnimateOnInput(wArray[m]);
      counter++;
    }
    await ProcessGuess(array[i]).then(resolve =>{
      UpdateBoard(resolve, array[i]);
    });
    await Sleep(500);
  }
}

// processing function
function ProcessGuess(item)
{
  let answerToPass = "TRUE";
  if(guessFromAnswers)
  {
    answerToPass = "TRUE";
  }
  else
  {
    answerToPass = "FALSE";
  }
  return new Promise(function(resolve, reject) {
    $.ajax(
    {
      method: "POST",
      url: "/SubmitGuess",
      data:
      {
        action:'SubmitGuess',
        flag:"process",
        dictionary:dictionary,
        allGuesses: inputString,
        guess:item,
        gameState: gameState,
        guessFromAnswers: guessFromAnswers
      },
      success:function(result)
      {
        resolve(result);
      },
      error:function(result)
      {
        reject(result);
      }
    });
  });
}

function UpdateBoard(result, item)
{
  playTextPanel.innerHTML = "";

  let resultArray = JSON.parse(result);
  
  let keyArray = [];
  for(let i = 0; i < resultArray[1].length; i++)
  {
    for(let n = 0; n < resultArray[1][i].length; n++)
    {
      keyArray.push(resultArray[1][i][n]);
    }
  }
  UpdatePostGuess(resultArray[0], guessLevel, item, keyArray, inputString);
  guessLevel++;
}

function SubmitGuess()
{
  if(gameState === "Arcade" && arcadePaused === true)
  {
    return;
  }

  let answerToPass = "TRUE";
  
  if(guessFromAnswers)
  {
    answerToPass = "TRUE";
  }
  else
  {
    answerToPass = "FALSE";
  }
  
  if(loadingSaves)
  {
    loadingSaves = false;
  }
    
	let guessToCheck = "";
  
  thinking = true;
	
	if(guessLevel == 1)
	{
		guessToCheck = wArray[0].value + 
				wArray[1].value + 
				wArray[2].value + 
				wArray[3].value + 
				wArray[4].value;
	}
	
	if(guessLevel == 2)
	{
		guessToCheck = wArray[5].value + 
				wArray[6].value + 
				wArray[7].value + 
				wArray[8].value + 
				wArray[9].value;
	}
	
	if(guessLevel == 3)
	{
		guessToCheck = wArray[10].value + 
				wArray[11].value + 
				wArray[12].value + 
				wArray[13].value + 
				wArray[14].value;
	}
	
	if(guessLevel == 4)
	{
		guessToCheck = wArray[15].value + 
				wArray[16].value + 
				wArray[17].value + 
				wArray[18].value + 
				wArray[19].value;
	}
	
	if(guessLevel == 5)
	{
		guessToCheck = wArray[20].value + 
				wArray[21].value + 
				wArray[22].value + 
				wArray[23].value + 
				wArray[24].value;
	}
	
	if(guessLevel == 6)
	{
		guessToCheck = wArray[25].value + 
				wArray[26].value + 
				wArray[27].value + 
				wArray[28].value + 
				wArray[29].value;
	}

  $.ajax(
  {
    method: "POST",
    url: "/SubmitGuess",
    data:
    {
      action:'SubmitGuess',
      dictionary:dictionary,
      allGuesses: inputString,
      guess:guessToCheck,
      gameState: gameState,
      guessFromAnswers: answerToPass 
    },
    success:function(result)
    {
      if(result === "NotInArray")
      {
        document.getElementById("c28").style.backgroundColor = "var(--yellow)";
        playTextPanel.innerHTML = "Invalid word.";
        AnimatePop(playTextPanel);
      }
      else if(result === "NoGood")
      {
        document.getElementById("c28").style.backgroundColor = "var(--yellow)";
        playTextPanel.innerHTML = "Known letters not used.";
        AnimatePop(playTextPanel);
      }
      else if(result === "LessThanFive")
      {
        document.getElementById("c28").style.backgroundColor = "var(--yellow)";
        playTextPanel.innerHTML = "Not five letters.";
        AnimatePop(playTextPanel);
      }
      else
      {
        let resultArray = JSON.parse(result);
        
        let keyArray = [];
        for(let i = 0; i < resultArray[1].length; i++)
        {
          for(let n = 0; n < resultArray[1][i].length; n++)
          {
            keyArray.push(resultArray[1][i][n]);
          }
        }
        UpdatePostGuess(resultArray[0], guessLevel, guessToCheck, keyArray, inputString);
        guessLevel++;
      }
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

async function UpdatePostGuess(result, guessLevel, guess, keys, input)
{
  let num1 = (guessLevel * 5) - 5;
  let num2 = ((guessLevel * 5) - 5) + 1;
  let num3 = ((guessLevel * 5) - 5) + 2;
  let num4 = ((guessLevel * 5) - 5) + 3;
  let num5 = ((guessLevel * 5) - 5) + 4;
  
  let arr1 = [num1, num2, num3, num4, num5];
  
  winCount = 0;
  
  for(let i = 0; i < 5; i++)
  {
    let letter = guess[i].toUpperCase();
    let iAlpha = alphabet.indexOf(letter);
    
    let el1 = document.getElementById("w" + (guessLevel - 1) + i);
    let el2 = document.getElementById("s" + (guessLevel - 1) + i);
    
    await Sleep(100);
    AnimateOnColour(el1);

    if(result[i] == 1)
    {
      wArray[arr1[i]].style.backgroundColor = "var(--yellow)";
      el1.dataset.state = "wrongPosition";
      el2.dataset.state = "wrongPosition";
    }
    else if(result[i] == 2)
    {
      wArray[arr1[i]].style.backgroundColor = "var(--green)";
      el1.dataset.state = "rightPosition";
      el2.dataset.state = "rightPosition";
      winCount++;
    }
    else
    {
      el1.dataset.state = "excluded";
      el2.dataset.state = "excluded";
    }
  }
  
  // update keys
  // first clean the keys
  for(let i = 0; i < input.length; i++)
  {
    let iAlpha = alphabet.indexOf(input[i].toUpperCase());
    let keyEl = document.getElementById("b" + iAlpha);
    
    keyEl.style.backgroundColor = "var(--backgroundLight)";
  }
  // then update with greens, yellows or disabled
  for(let i = 0; i < input.length; i++)
  {
    let iAlpha = alphabet.indexOf(input[i].toUpperCase());
    let keyEl = document.getElementById("b" + iAlpha);

    if(keys[i] == -1)
    {
      keyEl.style.backgroundColor = "var(--disabled)";
    }
  }
  for(let i = 0; i < input.length; i++)
  {
    let iAlpha = alphabet.indexOf(input[i].toUpperCase());
    let keyEl = document.getElementById("b" + iAlpha);

    if(keys[i] == 1)
    {
      keyEl.style.backgroundColor = "var(--yellow)";
    }
    else if(keys[i] == 2)
    {
      keyEl.style.backgroundColor = "var(--green)";
    }
  }
  
  // if daily game state then save date and latest guess list for reloading
  if(gameState == "Daily")
  {
    const date = new Date();
      
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    const saveDate = year + "-" + (month + 1) + "-" + day;
    
    localStorage.setItem("savedDailyLastDatePlayed", saveDate);
    
    // save inputString as guess array
    let output2 = [];
    let inputLength = inputString.length;
    
    for(let i = 0; i < inputLength; i+=5)
    {
      let newWord = inputString[i + 0] + 
      inputString[i + 1] + 
      inputString[i + 2] + 
      inputString[i + 3] + 
      inputString[i + 4];
      output2.push(newWord.toUpperCase());
    }
    
    let dailyGuesses = JSON.stringify(output2);
    savedDailyLastGuessSet = output2;
    
    localStorage.setItem("savedDailyLastGuessSet", dailyGuesses);
  }
  
  document.getElementById("c28").style.backgroundColor = "var(--backgroundLight)";
  if(winCount == 5 && guessLevel <= 6)
  {
    if(gameState == "Arcade")
    {
      arcadePaused = true;
      FillArcadeButtons(false);
      arcadeCount++;
      FillResult("won");
      EndArcade(false);
    }
    else
    {
      EndGame("won");
    }
  }
  if(winCount < 5 && guessLevel >= 6)
  {
    if(gameState == "Arcade")
    {
      arcadePaused = true;
      FillArcadeButtons(false);
      FillResult("lose");
      EndArcade(true);
    }
    else
    {
      EndGame("lose");
    }
  }
}

function EndGame(winState)
{
  thinking = true;
  
  let theAnswer = "";
  $.ajax(
  {
    method: "POST",
    url: "/PostGame",
    data:
    {
      action:'PostGame',
      request:dictionary,
      gameState: gameState
    },
    success:function(result)
    {
      theAnswer = result;
      FillResult(winState, theAnswer);
      FillSavedResult(guessLevel, winState);
      thinking = false;
    },
    error:function(result)
    {
      theAnswer = "ERROR";
      FillResult(winState, theAnswer);
      thinking = false;
    }
  });
}

function FillResult(winState, theAnswer)
{
  let src1 = "images/search.svg";
 
  if(gameState == "Random" || gameState == "Daily")
  {
    if(winState == "won")
    {
      let button = document.createElement('button');
      button.innerHTML = `<img class="playSolveImg" src=` + src1 + `></img>`;
      button.onclick = function() { SolveAfterGame(theAnswer); };
      button.id = "solveAfterGameButton";
      button.className = "playSolveButtons";
      playTextPanel.innerHTML = `Well done.   `;
      playTextPanel.appendChild(button);
      if(gameState == "Random")
      {
        let button = document.createElement('button');
        button.innerHTML = `+`;
        button.onclick = function() { NewGameAfterGame(); };
        button.id = "newGameAfterGameButton";
        button.className = "playSolveButtons";
        playTextPanel.appendChild(button);
      }
    }
    else if(winState == "lose")
    { 
      let button = document.createElement('button');
      button.innerHTML = `<img class="playSolveImg" src=` + src1 + `></img></button>`;
      button.onclick = function() { SolveAfterGame(theAnswer); };
      button.id = "solveAfterGameButton";
      button.className = "playSolveButtons";
      playTextPanel.innerHTML = `It was ` + theAnswer + `. `;
      playTextPanel.appendChild(button);
      if(gameState == "Random")
      {
        let button = document.createElement('button');
        button.innerHTML = `+`;
        button.onclick = function() { NewGameAfterGame(); };
        button.id = "newGameAfterGameButton";
        button.className = "playSolveButtons";
        playTextPanel.appendChild(button);
      }
    }
  }
  AnimatePop(playTextPanel);
  if(gameState == "Arcade")
  {
    if(winState == "lose")
    {
      // if lost, void the buttons
      document.getElementById("useClueArcadeButton").onclick = null;
    }
    else if(winState == "won")
    {
      let button = document.createElement('button');
      button.innerHTML = `+`;
      button.onclick = function() { NextArcadeGame(); };
      button.id = "nextArcadeButton";
      button.className = "playSolveButtons";
      playTextPanel.appendChild(button);
      let buttonToAdd = document.getElementById("nextArcadeButton");
      AnimatePop(buttonToAdd);
    }
  }
}

function FillSavedResult(guessLevel, winState)
{
  // if lost the game increment guessLevel to distinguish from games where got it in 6
  if(winState == "lose") guessLevel++;

  /*
    guesslevel is 1 more than number of guesses so 7 = 6, and 8 = didn't get it
    savedResultsRandom saves list of guesses
    if guessLevel 7 or less, increment current streak
    if currentstreak bigger than max streak, update, else reset
  */
  
  if(gameState === "Random")
  {
    savedResultsRandom.push(guessLevel);
  
    if(guessLevel < 7)
    {
      savedCurrentStreakRandom++;
    }
    else
    {
      savedCurrentStreakRandom = 0;
    }
    
    if(savedCurrentStreakRandom > savedMaxStreakRandom)
    {
      savedMaxStreakRandom = savedCurrentStreakRandom;
    }
    
    let output = JSON.stringify(savedResultsRandom);
    
    if (typeof(Storage) !== "undefined")
    {
      localStorage.setItem("savedResultsRandom", output);
      localStorage.setItem("savedCurrentStreakRandom", savedCurrentStreakRandom);
      localStorage.setItem("savedMaxStreakRandom", savedMaxStreakRandom);
    }
  }
  else if(gameState === "Daily")
  {
    // don't do anything if loading saves
    if(loadingSaves)
    {
      loadingSaves = false;
      return;
    }
    // check if the guesslist matches the existing guesses, in which case return
    // on basis game is completed
    
    // save inputString as guess array
    let output2 = [];
    let inputLength = inputString.length;
    
    for(let i = 0; i < inputLength; i+=5)
    {
      let newWord = inputString[i + 0] + 
      inputString[i + 1] + 
      inputString[i + 2] + 
      inputString[i + 3] + 
      inputString[i + 4];
      output2.push(newWord.toUpperCase());
    }
    
    savedResultsDaily.push(guessLevel);
  
    if(guessLevel < 7)
    {
      savedCurrentStreakDaily++;
    }
    else
    {
      savedCurrentStreakDaily = 0;
    }
    
    if(savedCurrentStreakDaily > savedMaxStreakDaily)
    {
      savedMaxStreakDaily = savedCurrentStreakDaily;
    }
    
    let output = JSON.stringify(savedResultsDaily);
    
    if (typeof(Storage) !== "undefined")
    {
      localStorage.setItem("savedResultsDaily", output);
      localStorage.setItem("savedCurrentStreakDaily", savedCurrentStreakDaily);
      localStorage.setItem("savedMaxStreakDaily", savedMaxStreakDaily);
    }
    
    const date = new Date();
    
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    const saveDate = year + "-" + (month + 1) + "-" + day;
    
    let dailyGuesses = JSON.stringify(output2);
    if (typeof(Storage) !== "undefined")
    {
      localStorage.setItem("savedDailyLastDatePlayed", saveDate);
      localStorage.setItem("savedDailyLastGuessSet", dailyGuesses);
    }
  }
}

function FillArcadeButtons(saved)
{
  let src1 = "images/close.svg";
  
  playTextPanel.innerHTML = '';

  if(arcadePaused)
  {
    if(saved)
    {
      playTextPanel.innerHTML += `
      <button class="playSolveButtons" id="endArcadeRunButton">
        <img class="playArcadeImg" src=` + src1 + `></img>
      </button>`;
    }
    else
    {
      let button = document.createElement('button');
      button.innerHTML = `<img class="playArcadeImg" src=` + src1 + `></img>`;
      button.onclick = function() { ShowNameEnter(); };
      button.id = "endArcadeRunButton";
      button.className = "playSolveButtons";
      playTextPanel.appendChild(button);
    }
  }
  
  playTextPanel.innerHTML += `
  <div class="playSolveButtons" id="arcadeTimerDiv"> ` + GetFormattedTimeAndCount(); + ` </div>`;
  
  if(arcadePaused)
  {
    playTextPanel.innerHTML += `<div class="playSolveButtons">` + arcadeClues + `</div>`;
  }
  else
  {
    let button = document.createElement('button');
    button.innerHTML = arcadeClues;
    button.onclick = function() { ShowClueScreen(); };
    button.id = "useClueArcadeButton";
    button.className = "playSolveButtons";
    playTextPanel.appendChild(button);
  }
}

function NewGameAfterGame()
{
  playing = false;
  gameState = "Random";
  NewGame();
}

function ShowChart(dataSet)
{
  if(dataSet == 1)
  {
    // random data
    chartShow = true;
    chartType.innerHTML = "Random.";
    gameState = "Random";
    FillChart();
    chartCenter.style.display = "";
  }
  else if(dataSet == 2)
  {
    // global data
    chartShow = true;
    chartType.innerHTML = "Daily.";
    gameState = "Daily";
    FillChart();
    chartCenter.style.display = "";
  }
  else if(dataSet == 3)
  {
    chartShow = false;
    chartCenter.style.display = "none";
  }
}

function ShowLeaderboard(show)
{
  if(show == 1)
  {
    leaderShow = true;
    FillLeaderboard();
    leaderboardCenter.style.display = "";
  }
  else if(show == 2)
  {
    leaderShow = false;
    leaderboardCenter.style.display = "none";
  }
}

function FillLeaderboard()
{
  thinking = true;
  $.ajax(
  {
    method: "POST",
    url: "/FillLeaderboard",
    data:
    {
      action:'FillLeaderboard',
      dictionary:dictionary,
      gameState: gameState
    },
    success:function(result)
    {
      let tempArray = JSON.parse(result);
      OutputLeaderboard(tempArray);
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

function OutputLeaderboard(data)
{ 
  leaderBoardData.innerHTML = '';
  
  for(let i = 0; i < data.length; i++)
  {
    leaderBoardData.innerHTML += `
      <div class="leaderboardContentDiv">
        <div class="leaderboardTextLeft">
        ` + ( i + 1 ) + `
        </div>
        <div class="leaderboardTextLeft">
        ` + data[i]["username"] + `
        </div>
        <div class="leaderboardTextRight">
        ` + data[i]["count"] + `
        </div>
      </div>
    `;
  }
}

function FillChart()
{
  let won = 0;
  let perCent = 0;
  
  let currentStreak = 0;
  let maxStreak = 0;
  
  let count1 = 0;
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let count5 = 0;
  let count6 = 0;
  let countX = 0;
  
  let dataLength = 0;
  
  if(gameState == "Random")
  {
    if(savedResultsRandom.length > 0) dataLength = savedResultsRandom.length;
    currentStreak = savedCurrentStreakRandom;
    maxStreak = savedMaxStreakRandom;
    if(dataLength > 0)
    {
      for(let i = 0; i < dataLength; i++)
      {
        if(savedResultsRandom[i] <= 7)
        {
          won++;
          if(savedResultsRandom[i] == 2) count1++;
          if(savedResultsRandom[i] == 3) count2++;
          if(savedResultsRandom[i] == 4) count3++;
          if(savedResultsRandom[i] == 5) count4++;
          if(savedResultsRandom[i] == 6) count5++;
          if(savedResultsRandom[i] == 7) count6++;
        }
        else
        {
          countX++;
        }
      }
      perCent = (100 / dataLength) * won;
      perCent = Math.round((perCent + Number.EPSILON) * 100) / 100;
    }
  }
  else if(gameState == "Daily")
  {
    if(savedResultsDaily.length > 0) dataLength = savedResultsDaily.length;
    currentStreak = savedCurrentStreakDaily;
    maxStreak = savedMaxStreakDaily;
    if(dataLength > 0)
    {
      for(let i = 0; i < dataLength; i++)
      {
        if(savedResultsDaily[i] <= 7)
        {
          won++;
          if(savedResultsDaily[i] == 2) count1++;
          if(savedResultsDaily[i] == 3) count2++;
          if(savedResultsDaily[i] == 4) count3++;
          if(savedResultsDaily[i] == 5) count4++;
          if(savedResultsDaily[i] == 6) count5++;
          if(savedResultsDaily[i] == 7) count6++;
        }
        else
        {
          countX++;
        }
      }
      perCent = (100 / dataLength) * won;
      perCent = Math.round((perCent + Number.EPSILON) * 100) / 100;
    }
  }
  
  chartPlayed.innerHTML = dataLength;
  chartPercent.innerHTML = perCent;
  chartCurrent.innerHTML = currentStreak;
  chartMax.innerHTML = maxStreak;
  chartOne.innerHTML = count1;
  chartTwo.innerHTML = count2;
  chartThree.innerHTML = count3;
  chartFour.innerHTML = count4;
  chartFive.innerHTML = count5;
  chartSix.innerHTML = count6;
  chartFailed.innerHTML = countX;
}

function ClearData()
{
  let check = confirm("This will clear data for " + gameState + " game mode. Proceed?");
  if(!check) return;
  
  if(gameState == "Random")
  {
    savedResultsRandom = [];
    savedCurrentStreakRandom = 0;
    savedMaxStreakRandom = 0;
    
    localStorage.setItem("savedResultsRandom", savedResultsRandom);
    localStorage.setItem("savedCurrentStreakRandom", savedCurrentStreakRandom);
    localStorage.setItem("savedMaxStreakRandom", savedMaxStreakRandom);
  }
  else if(gameState == "Daily")
  {
    savedResultsDaily = [];
    savedCurrentStreakDaily = 0;
    savedMaxStreakDaily = 0;
    savedDailyLastDatePlayed = 0;
    savedDailyLastGuessSet = [];
    
    localStorage.setItem("savedResultsDaily", savedResultsDaily);
    localStorage.setItem("savedCurrentStreakDaily", savedCurrentStreakDaily);
    localStorage.setItem("savedMaxStreakDaily", savedMaxStreakDaily);
    localStorage.setItem("savedDailyLastDatePlayed", savedDailyLastDatePlayed);
    localStorage.setItem("savedDailyLastGuessSet", savedDailyLastGuessSet);
  }
  
  FillChart();
}

function SolveAfterGame(wordTo)
{
  ResetAfterGame();
  Solve(wordTo);
}

function ResetAfterGame()
{
  playing = false;
    
  playButton.style.backgroundColor = "var(--active)";
  inputOutputButton.style.backgroundColor = "var(--active)";
  solveButton.style.backgroundColor = "var(--active)";
  sortButton.style.backgroundColor = "var(--active)";
  resetButton.style.backgroundColor = "var(--active)";
  changeDictionaryButton.style.backgroundColor = "var(--active)";
  helpButton.style.backgroundColor = "var(--active)";
  
  otherControls.style.display = "";
  playTextPanel.style.display = "none";
  
  for(let i = 0; i < kLength; i++)
  {
    kArray[i].style.backgroundColor = "var(--backgroundLight)";
  }
}

function AnimatePop(panel)
{
  panel.animate([
    { transform: 'scale(110%, 110%)'},
    { transform: 'scale(109%, 109%)'},
    { transform: 'scale(108%, 108%)'},
    { transform: 'scale(107%, 107%)'},
    { transform: 'scale(106%, 106%)'},
    { transform: 'scale(105%, 105%)'},
    { transform: 'scale(104%, 104%)'},
    { transform: 'scale(103%, 103%)'},
    { transform: 'scale(102%, 102%)'},
    { transform: 'scale(101%, 101%)'},
    { transform: 'scale(100%, 100%)'}],
    {
      duration: 100,
    }
  );
}

function AnimateOnInput(panel)
{
  panel.animate([
    { transform: 'scale(110%, 110%)'},
    { transform: 'scale(109%, 109%)'},
    { transform: 'scale(108%, 108%)'},
    { transform: 'scale(107%, 107%)'},
    { transform: 'scale(106%, 106%)'},
    { transform: 'scale(105%, 105%)'},
    { transform: 'scale(104%, 104%)'},
    { transform: 'scale(103%, 103%)'},
    { transform: 'scale(102%, 102%)'},
    { transform: 'scale(101%, 101%)'},
    { transform: 'scale(100%, 100%)'}           
      ], { 
    duration: 100,            
 });
}

function AnimateOnColour(panel)
{
  panel.animate([
    { transform: 'scale(110%, 110%)'},
    { transform: 'scale(109%, 109%)'},
    { transform: 'scale(108%, 108%)'},
    { transform: 'scale(107%, 107%)'},
    { transform: 'scale(106%, 106%)'},
    { transform: 'scale(105%, 105%)'},
    { transform: 'scale(104%, 104%)'},
    { transform: 'scale(103%, 103%)'},
    { transform: 'scale(102%, 102%)'},
    { transform: 'scale(101%, 101%)'},
    { transform: 'scale(100%, 100%)'}           
      ], { 
    duration: 10,            
 });
}

function TESTTEST()
{
  return;
  thinking = true;
  $.ajax(
  {
    method: "POST",
    url: "/TEST",
    data:
    {
      action:'TEST',
      dictionary:dictionary,
    },
    success:function(result)
    {
      thinking = false;
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

function StartDaily()
{
  thinking = true;
  $.ajax(
  {
    method: "POST",
    url: "/startDaily",
    data:
    {
      action:'startDaily',
      dictionary:dictionary,
    },
    success:function(result)
    {
      DailyReady();
    },
    error:function(result)
    {
      thinking = false;
    }
  });
}

function DailyReady()
{
  gameState = "Daily";
  NewGame();
}

function TerminateArcade()
{
  playing = false;
  arcadeActive = false;
  nameCenter.style.display = "none";
  nameScreenBool = false;
  arcadePaused = false;
  ClearArcadeInterval();
  playTextPanel.style.display = "none";
  otherControls.style.display = "";
  playCenter.style.display = "none";
  clueCenter.style.display = "none";
  playButton.style.backgroundColor = "var(--active)";
}

window.addEventListener("DOMContentLoaded", ToggleScreen(0));