"use strict";

// MAIN CONTROLS

// holds the non play buttons to remove during playing
const otherControls = document.getElementById("otherControls");
// replaces the othercontrols to display game information
const playTextPanel = document.getElementById("playTextPanel");
playTextPanel.style.display = "none";

// Play button - toggle play screen
const playButton = document.getElementById("playButton");
playButton.onclick = function() { NewGameOrPlayScreen() };

// Switch view between input and output
const inputOutputButton = document.getElementById("inputOutputButton");
inputOutputButton.onclick = function() { SwitchSwitch() };
inputOutputButton.style.backgroundColor = "var(--backgroundLight)";

// Reorder on the output screen
const sortButton = document.getElementById("sortButton");
sortButton.onclick = function() { SwitchSort() };

// Enter solves
const solveButton = document.getElementById("solveButton");
solveButton.onclick = function() { ToggleScreen(1) };

// Toggle the change dictionary screen
const changeDictionaryButton = document.getElementById("changeDictionaryButton");
changeDictionaryButton.onclick = function() { ToggleScreen(2) };

// Toggles the help screen
const helpButton = document.getElementById("helpButton");
helpButton.onclick = function() { ToggleScreen(3) };

// Resets the whole app
const resetButton = document.getElementById("resetButton");
resetButton.onclick = function() { Reset() };

// which screen to display
let toggleScreenNumber = 0;



// SOLVE INPUT SCREEN

// the word to be solved
let solveString = "";

// the main div
const solveCenter = document.getElementById("solveCenter");
// where the top level messages are
const solveCenterMessageBox = document.getElementById("solveCenterMessageBox");
// the letter inputs
const solveArray = document.getElementsByClassName("solveInput");
const solveLength = solveArray.length;
// output messages
const solveCenterOutputBox = document.getElementById("solveCenterOutputBox");
const solveCenterOutputText = document.getElementById("solveCenterOutputText");
// pick a random word to solve
const randomSolveButton = document.getElementById("randomSolveButton");
randomSolveButton.onclick = function() { RandomSolve() };
// request a word solve
const goSolveItButton = document.getElementById("goSolveItButton");
goSolveItButton.onclick = function() { ValidateSolve() };



// DICTIONARY SCREEN

// the main div
const dictionaryCenter = document.getElementById("dictionaryCenter");

// each change dictionary button
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

// Toggle guess mode between guesses from dictionary only or use any word
const guessFromAnswerCheck = document.getElementById("guessFromAnswerCheck");
guessFromAnswerCheck.onclick = function() { ChangeGuessFrom() };
// toggle
let guessFromAnswers = true;

// array to hold dictionary buttons
const dArray = [d1, d2, d3, d4, d5, d6, d7];
const dLength = dArray.length;
// toggle the default dictionary as green
dArray[2].style.backgroundColor = "var(--green)";
// which dictionary is default
let dictionary = 3;



// INPUT CENTER
const infoCenter = document.getElementById("infoCenter");



// PLAY SCREEN - CHOOSE GAME MODE

// the main div
const playCenter = document.getElementById("playCenter");

// Trigger random new game
const playCenterRandomButton = document.getElementById("playCenterRandomButton");
playCenterRandomButton.onclick = function() { PlayRandomNewGame() };
// Trigger global daily game
const playCenterDailyButton = document.getElementById("playCenterDailyButton");
playCenterDailyButton.onclick = function() { StartDaily() };
// Trigger arcade game
const playCenterArcadeButton = document.getElementById("playCenterArcadeButton");
playCenterArcadeButton.onclick = function() { PlayArcadeNewGame() };

// stats buttons
// random game stats
const playChart1 = document.getElementById("playChart1");
playChart1.onclick = function() { ShowChart(1) };
// daily game stats
const playChart2 = document.getElementById("playChart2");
playChart2.onclick = function() { ShowChart(2) };
// show leaderboard button
const playCenterLeaderboardButton = document.getElementById("playCenterLeaderboardButton");
playCenterLeaderboardButton.onclick = function() { ShowLeaderboard(1) };
// global arcade leaderboard div
const playLeaderboard = document.getElementById("playLeaderboard");



// CLUE SCREEN

// Main Div
const clueCenter = document.getElementById("clueCenter");
// Output message text
const clueCenterOutputText = document.getElementById("clueCenterOutputText");
// POST get a clue
const getClueButton = document.getElementById("getClueButton");
getClueButton.onclick = function() { RequestClue() };
// close screen
const closeClueButton = document.getElementById("closeClueButton");
closeClueButton.onclick = function() { ShowClueScreen() };

// stop user requesting clue when still processing last request
let working = false;

// clue array of letters
const clueInputArray = document.getElementsByClassName("clueInput");
const clueLength = clueInputArray.length;
// the actual clue letters
let clueArray = [];
// toggle
let showClue = false;



// NAME INPUT SCREEN - triggers at end of arcade session
// main div
const nameCenter = document.getElementById("nameCenter");
// input letters to hold name
const nameArray = document.getElementsByClassName("nameInput");
const nameLength = nameArray.length;
// debug output
const nameCenterOutputText = document.getElementById("nameCenterOutputText");
// the actual name
let nameString = "";
// to toggle screen
let nameScreenBool = false;
// once completed to add name and score to leaderboard
const enterNameButton = document.getElementById("enterNameButton");
enterNameButton.onclick = function() { SubmitToLeaderboard() };
// closes screen
const exitNameButton = document.getElementById("exitNameButton");
exitNameButton.onclick = function() { CloseNameEnter() };



// CHART SCREEN

// main div
const chartCenter = document.getElementById("chartCenter");
// closes screen
const closeChartButton = document.getElementById("closeChartButton");
closeChartButton.onclick = function() { ShowChart(3) };
// either 'Random' or 'Daily'
let chartType = document.getElementById("chartType");
// the various stats shown
const chartPlayed = document.getElementById("chartPlayed");
const chartPercent = document.getElementById("chartPercent");
const chartCurrent = document.getElementById("chartCurrent");
const chartMax = document.getElementById("chartMax");
const chartOne = document.getElementById("chartOne");
const chartTwo = document.getElementById("chartTwo");
const chartThree = document.getElementById("chartThree");
const chartFour = document.getElementById("chartFour");
const chartFive = document.getElementById("chartFive");
const chartSix = document.getElementById("chartSix");
const chartFailed = document.getElementById("chartFailed");
// reset history
const cleanChartButton = document.getElementById("cleanChartButton");
cleanChartButton.onclick = function() { ClearData() };



// LEADERBOARD SCREEN

// maind iv
const leaderboardCenter = document.getElementById("leaderboardCenter");
// where scores are stored
const leaderBoardData = document.getElementById("leaderBoardData");
// toggles off
const closeLeaderboardButton = document.getElementById("closeLeaderboardButton");
closeLeaderboardButton.onclick = function() { ShowLeaderboard(2) };
// update the leaderboard
const refreshLeaderboardButton = document.getElementById("refreshLeaderboardButton");
refreshLeaderboardButton.onclick = function() { FillLeaderboard() };



// GUESS TABLE

// primary word inputs
const wArray = [];
const rowCount = 6;
const buttonCount = 5;
let wLength = 0;
// toggle state buttons
const sArray = [];
let sLength = 0;



// KEYBOARD
// the button elements
const kArray = document.getElementsByClassName("keyboardButtons");
const kLength = kArray.length;
for(let i = 0; i < kLength; i++)
{
  kArray[i].onclick = function() { Toggle(i) };
}
// holds POST output of words to display following searchs
let wordStore = [];
// structure of the keyboard including command buttons
const qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "?",
  "Z", "X", "C", "V", "B", "N", "M", "-", ">", "<"];
// letters only
const alphabet = ["Q","W","E","R","T","Y","U","I","O","P",
  "A","S","D","F","G","H","J","K","L",
  "Z","X","C","V","B","N","M"];
// whether searching using keyboard letters (true) or manully entering (false)
let keyBoardSearch = false;
// Holds state as to whether letter is on/off for purposes of keyboard search
const toggleLetters = [];
for(var i = 0; i < 26; i++)
{
  toggleLetters.push(true);
}
// the current letters selected
let inputString = "";
// search terms
let searchString = "";



// INPUT / OUTPUT SCREEN
// tabs
const guessTableCenter = document.getElementById("guessTableCenter");
const listTableCenter = document.getElementById("listTableCenter");
// initial state
listTableCenter.style.display = "none";
guessTableCenter.style.display = "";

// OUTPUT SCREEN
// filter words to search output
const fArray = document.getElementsByClassName("wordFilter");
const fLength = fArray.length;
// output table body
const wordTableListBody = document.getElementById("wordTableListBody");

// default input/output tab
let currentTab = "input";
// true = input, false = output
let currentPage = true;
// true = sort by AZ, false = sort by score - first list loaded is by score
let sortAZ = false;



// GAME VARIABLES
// whether in a game mode or not
let playing = false;
// counts up from first to last guess to gate letter input at each level
let guessLevel = 0;
// for arcade mode, counts how many wins
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

// Arcade specific variables
let arcadeCount = 0;
let arcadeTimer = 0;
let arcadeClues = 0;
let arcadeInterval = undefined;
let arcadeActive = false;
let arcadeReset = false;
let arcadePaused = true;

let chartShow = false;
let leaderShow = false;

// while true shows the think screen
let thinking = false;



// VIEW ARRAY
const v = [
  solveCenter,
  dictionaryCenter,
  infoCenter,
  playCenter,
];
// BUTTON ARRAY
const b = [
  solveButton,
  changeDictionaryButton,
  helpButton,
  playButton,
];

// DEFAULT VIEW / STARTUP
chartCenter.style.display = "none";
clueCenter.style.display = "none";
dictionaryCenter.style.display = "none";
leaderboardCenter.style.display = "none";
listTableCenter.style.display = "none";
nameCenter.style.display = "none";
playCenter.style.display = "none";
solveCenter.style.display = "none";

// gets the word input and state buttons arrays
function Assign()
{
  for(let i = 0; i < rowCount; i++)
  {
    for(let r = 0; r < buttonCount; r++)
    {
      wArray.push(document.getElementById("w" + i + r));
      sArray.push(document.getElementById("s" + i + r));
    }
  }

  wLength = wArray.length;
  sLength = sArray.length;
}

// Updates the users stats page with data retrieved from localstorage
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

// Toggles between the various main screens based on index
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

  for(let i = 0; i < v.length; i++)
  {
    if(screenNumber === -1)
    {
      v[i].style.display = "none";
      v[i].style.backgroundColor = "var(--active)";
      continue;
    }
    if(screenNumber === i)
    {
      v[i].style.display = "";
      v[i].style.backgroundColor = "var(--backgroundLight)";
    }
    else
    {
      v[i].style.display = "none";
      v[i].style.backgroundColor = "var(--active)";
    }
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

// STARTUP
window.addEventListener("DOMContentLoaded", ToggleScreen(0));
window.addEventListener("DOMContentLoaded", FillChart());
window.addEventListener("DOMContentLoaded", Assign());