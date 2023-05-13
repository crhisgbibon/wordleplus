'use strict';

// STARTUP LOGIC

function Main()
{
  // Assign CONTROLS buttons
  for(let i = 0; i < bLen; i++)
  {
    b[i].onclick = null;
    b[i].onclick = function() { ToggleScreen(i); };
  }
  RESET_BUTTON.onclick = null;
  RESET_BUTTON.onclick = function() { Reset(); };

  // Assign PLAY buttons
  PLAY_RANDOM.onclick = null;
  PLAY_RANDOM.onclick = function() { PlayRandom(); };

  // Assign GUESS buttons
  for(let i = 0; i < wLength; i++)
  {
    wArray[i].onclick = null;
    wArray[i].onclick = function() { SwitchState(wArray[i]); };
  }

  // Assign DICTIONARY buttons
  for(let i = 0; i < dLength; i++)
  {
    dArray[i].onclick = null;
    dArray[i].onclick = function() { ChangeDictionary(i); };
  }

  // Assign SOLVE buttons
  SOLVE_RANDOM.onclick = null;
  SOLVE_RANDOM.onclick = function() { SolveRandom(); };
  SOLVE_SOLVE.onclick = null;
  SOLVE_SOLVE.onclick = function() { Solve(); };

  // Assign KEYBOARD buttons
  for(let i = 0; i < kLength; i++)
  {
    kArray[i].onclick = null;
    kArray[i].onclick = function() { Toggle(kArray[i].innerHTML); };
  }
  
  // Reset all variables for blank slate
  Reset();
}

function Reset()
{
  for(let i = 0; i < bLen; i++)
  {
    b[i].dataset.state = "inactive";
  }
  for(let i = 0; i < wLength; i++)
  {
    wArray[i].innerHTML = '';
    wArray[i].dataset.state = "excluded";
  }
  for(let i = 0; i < dLength; i++)
  {
    if(i === 2) dArray[i].dataset.state = 'active';
    else dArray[i].dataset.state = 'inactive';
  }
  for(let i = 0; i < kLength; i++)
  {
    kArray[i].dataset.state = 'disabled';
  }

  playing = '';
  keyboardsearch = false;
  guessLevel = 0;

  solveString = '';
  filterString = '';
  inputString = '';
  keyboardString = '';

  CHART.style.display = 'none';
  PLAY_PANEL.style.display = 'none';
  LIST_BODY.innerHTML = '';
  ToggleScreen(1);
}

document.addEventListener('DOMContentLoaded', Main);








// CONTROLS LOGIC

const PLAY_BUTTON = document.getElementById('PLAY_BUTTON');
const GUESS_BUTTON = document.getElementById('GUESS_BUTTON');
const LIST_BUTTON = document.getElementById('LIST_BUTTON');
const SOLVE_BUTTON = document.getElementById('SOLVE_BUTTON');
const DICTIONARY_BUTTON = document.getElementById('DICTIONARY_BUTTON');
const INFO_BUTTON = document.getElementById('INFO_BUTTON');
const RESET_BUTTON = document.getElementById('RESET_BUTTON');

const b = [
  PLAY_BUTTON,
  GUESS_BUTTON,
  LIST_BUTTON,
  SOLVE_BUTTON,
  DICTIONARY_BUTTON,
  INFO_BUTTON
];
const bLen = b.length;

// Main Panels
const PLAY = document.getElementById('PLAY');
const GUESS = document.getElementById('GUESS');
const LIST = document.getElementById('LIST');
const SOLVE = document.getElementById('SOLVE');
const DICTIONARY = document.getElementById('DICTIONARY');
const INFO = document.getElementById('INFO');

// Sub Panels
const CHART = document.getElementById('CHART');

const v = [
  PLAY,
  GUESS,
  LIST,
  SOLVE,
  DICTIONARY,
  INFO
];

function ToggleScreen(index)
{
  for(let i = 0; i < bLen; i++)
  {
    if(index === i)
    {
      b[i].dataset.state = 'active';
      v[i].style.display = '';
    }
    else
    {
      b[i].dataset.state = 'inactive';
      v[i].style.display = 'none';
    }
  }
  if(playing !== '')
  {
    playing = '';
    PLAY_PANEL.style.display = 'none';
    BUTTON_PANEL.style.display = '';
  }
}






// PLAY LOGIC

const PLAY_RANDOM = document.getElementById('PLAY_RANDOM');
const PLAY_DAILY = document.getElementById('PLAY_DAILY');
const PLAY_ARCADE = document.getElementById('PLAY_ARCADE');

const BUTTON_PANEL = document.getElementById('BUTTON_PANEL');
const PLAY_PANEL = document.getElementById('PLAY_PANEL');

function PlayRandom()
{
  Reset();
  ToggleScreen(1);
  
  BUTTON_PANEL.style.display = "none";
  PLAY_PANEL.style.display = "";
  
  PLAY_PANEL.innerHTML = "";
  
  playing = 'R';
  guessLevel = 1;

  let data = JSON.stringify({  });
  Post('NewGame', data)
  .then(result => {
    console.log(result);
  })
  .catch((error) => console.error(error));
}

function PlayDaily()
{
  Reset();
  ToggleScreen(1);
  
  BUTTON_PANEL.style.display = "none";
  PLAY_PANEL.style.display = "";
  
  PLAY_PANEL.innerHTML = "";
  
  playing = 'D';
  guessLevel = 1;
}






// GUESS LOGIC

const wArray = document.getElementsByClassName('wordInput');
const wLength = wArray.length;

function SwitchState(button)
{
  if(playing !== '') return;

  if(button.dataset.state === undefined || button.dataset.state === "" || button.dataset.state === "excluded")
  {
    button.dataset.state = "wrongPosition";
  }
  else if(button.dataset.state === "wrongPosition")
  {
    button.dataset.state = "rightPosition";
  }
  else if(button.dataset.state === "rightPosition")
  {
    button.dataset.state = "excluded";
  }
}

function FilterByInput()
{
  if(playing !== '') return;

  class wrongPosLetter
  {
    wrongPosLetter(letter, positions)
    {
      this.letter = letter;
      this.positions = positions;
    }
  }

  let guessedWords = [];
  let knownLetters = ["-1", "-1", "-1", "-1", "-1"];
  let excludedLetters = [];
  let knownLettersByPosition = [];

  // identify the guessed words
  for(let i = 0; i < wLength; i+= 5)
  {
    let one = wArray[i].innerHTML;
    let two = wArray[i + 1].innerHTML;
    let three = wArray[i + 2].innerHTML;
    let four = wArray[i + 3].innerHTML;
    let five = wArray[i + 4].innerHTML;

    let word = one + two + three + four + five;
    if(word.length === 5) guessedWords.push(word);
  }

  for(let i = 0; i < wLength; i++)
  {
    if(wArray[i].innerHTML === "" || wArray[i].innerHTML === "-") continue;

    let state = wArray[i].dataset.state;

    // if known position store directly
    if(state === "rightPosition")
    {
      let letterPos = wArray[i].id[1];
      knownLetters[letterPos] = wArray[i].innerHTML.toUpperCase();
    }

    // if excluded letters then log if not already logged
    if(state === "excluded" || state === "" || state === undefined)
    {
      if(!excludedLetters.includes(wArray[i].innerHTML.toUpperCase()))
      {
        excludedLetters.push(wArray[i].innerHTML.toUpperCase());
      }
    }

    if(state === "wrongPosition")
    {
      const result = knownLettersByPosition.filter(obj => obj.letter === wArray[i].innerHTML.toUpperCase());

      if(result.length > 0)
      {
        result[0].positions.push(wArray[i].id[1]);
      }
      else
      {
        let newWord = new wrongPosLetter();
        newWord.letter = wArray[i].innerHTML.toUpperCase();
        newWord.positions = [ wArray[i].id[1] ];
        knownLettersByPosition.push(newWord);
      }
    }
  }

  // remove any wrong position letters from excluded letters
  if(knownLettersByPosition.length > 0 && excludedLetters.length > 0)
  {
    for(let i = 0; i < knownLettersByPosition.length; i++)
    {
      if(excludedLetters.includes(knownLettersByPosition[i].letter))
      {
        excludedLetters.splice(excludedLetters.indexOf(knownLettersByPosition[i].letter), 1);
      }
    }
  }

  let data = JSON.stringify({
    'guessedWords' : guessedWords,
    'excludedLetters' : excludedLetters,
    'knownLetters' : knownLetters,
    'knownLettersByPosition' : knownLettersByPosition,
  });
  Post('FilterByInput', data)
  .then(result => {
    FillOutput(JSON.parse(result));
    ToggleScreen(2);
  })
  .catch((error) => console.error(error));
}

function FilterByKeys()
{
  const diff = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => !keyboardString.includes(c)).join('');
  let data = JSON.stringify({
    'excludedLetters' : diff
  });
  Post('FilterByKeys', data)
  .then(result => {
    FillOutput(JSON.parse(result));
    ToggleScreen(2);
  })
  .catch((error) => console.error(error));
}

function SubmitGuess()
{
	let guess = '';
  let guessNum = ( guessLevel - 1 ) * 5;
  guess =  wArray[0 + guessNum].innerHTML + 
                  wArray[1 + guessNum].innerHTML + 
                  wArray[2 + guessNum].innerHTML + 
                  wArray[3 + guessNum].innerHTML + 
                  wArray[4 + guessNum].innerHTML;

  let data = JSON.stringify({
    'inputString' : inputString,
    'guess' : guess,
    'playing' : playing,
  });

  console.log(data);

  Post('SubmitGuess', data)
  .then(result => {
    console.log(result);
    ProcessGuess(result);
  })
  .catch((error) => console.error(error));
}

function ProcessGuess(json)
{
  let result = JSON.parse(json);
  if(result === "NotInArray" || result === "NoGood" || result === "LessThanFive" || result === "NoWord")
  {
    if(result === "NotInArray") PLAY_PANEL.innerHTML = "Invalid word.";
    else if(result === "NoGood") PLAY_PANEL.innerHTML = "Known letters not used.";
    else if(result === "LessThanFive") PLAY_PANEL.innerHTML = "Not five letters.";
    else if(result === "NoWord") PLAY_PANEL.innerHTML = "No answer set.";
    kArray[28].style.backgroundColor = "var(--yellow)";
    Pop(PLAY_PANEL);
  }
  else
  {
    UpdatePostGuess(result);
  }
}

async function UpdatePostGuess(guesses)
{
  // console.log(guesses);

  let winCount = 0;
  let keys = Array.from(kArray).map(key => key.innerHTML);
  // console.log(keys);

  for(let g = 0; g < guesses.length; g++)
  {
    for(let i = 0; i < guesses[g].length; i++)
    {
      let index = ( g * 5 ) + i;

      if(index >= (inputString.length - 5))
      {
        await Sleep(100);
        Pop(wArray[index]);
        // console.log('index is ' + index + ', guess result is ' + guesses[g][i]);

        if(guesses[g][i] === 1) wArray[index].dataset.state = "wrongPosition";
        else if(guesses[g][i] === 2)
        {
          wArray[index].dataset.state = "rightPosition";
          winCount++;
        }
        else wArray[index].dataset.state = "excluded";
      }

      // console.log(inputString[index]);

      let keyIndex = keys.indexOf(inputString[index].toUpperCase());
      // console.log(keyIndex);

      if(guesses[g][i] == -1) kArray[keyIndex].dataset.state = "disabled";
      else if([g][i] == 1) kArray[keyIndex].dataset.state = "yellow";
      else if(guesses[g][i] == 2) kArray[keyIndex].dataset.state = "green";
    }
  }
  
  // if daily game state then save date and latest guess list for reloading
  if(playing === "D")
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
  
  kArray[28].style.backgroundColor = "var(--backgroundLight)";
  if(winCount == 5 && guessLevel <= 6) EndGame("won");
  else if(winCount < 5 && guessLevel >= 6) EndGame("lose");
  else guessLevel++;
}

function EndGame(winState)
{
  let data = JSON.stringify({
    'playing' : playing,
  });

  console.log(data);

  Post('PostGame', data)
  .then(json => {
    console.log(json);
    ConfirmResult(json, winState);
  })
  .catch((error) => console.error(error));
}

function ConfirmResult(json, winState)
{
  let result = JSON.parse(json);

  let src1 = "images/search.svg";
 
  if(playing === "R" || playing === "D")
  {
    if(winState === "won")
    {
      let button = document.createElement('button');
      button.innerHTML = `<img class="playSolveImg" src=` + src1 + `></img>`;
      button.onclick = function() { SolveAfterGame(theAnswer); };
      button.id = "solveAfterGameButton";
      button.className = "playSolveButtons";
      PLAY_PANEL.innerHTML = `Well done.   `;
      PLAY_PANEL.appendChild(button);
      if(gameState == "Random")
      {
        let button = document.createElement('button');
        button.innerHTML = `+`;
        button.onclick = function() { NewGameAfterGame(); };
        button.id = "newGameAfterGameButton";
        button.className = "playSolveButtons";
        PLAY_PANEL.appendChild(button);
      }
    }
    else if(winState === "lose")
    { 
      let button = document.createElement('button');
      button.innerHTML = `<img class="playSolveImg" src=` + src1 + `></img></button>`;
      button.onclick = function() { SolveAfterGame(theAnswer); };
      button.id = "solveAfterGameButton";
      button.className = "playSolveButtons";
      PLAY_PANEL.innerHTML = `It was ` + theAnswer + `. `;
      PLAY_PANEL.appendChild(button);
      if(gameState == "Random")
      {
        let button = document.createElement('button');
        button.innerHTML = `+`;
        button.onclick = function() { NewGameAfterGame(); };
        button.id = "newGameAfterGameButton";
        button.className = "playSolveButtons";
        PLAY_PANEL.appendChild(button);
      }
    }
  }
  Pop(PLAY_PANEL);
}

function SaveResult(guessLevel, winState)
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






// LIST LOGIC

function FilterWords()
{
  let filterLetters = ["-1", "-1", "-1", "-1", "-1"];

  for(let i = 0; i < fLength; i++)
  {
    if(fArray[i].innerHTML != "" && fArray[i].innerHTML != "-")
    filterLetters[i] = fArray[i].innerHTML.toUpperCase();
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
    if(check) allDiv[i].style.display = "none";
    else allDiv[i].style.display = "";
  }
}





// SOLVE LOGIC

const SOLVE_RANDOM = document.getElementById('SOLVE_RANDOM');
const SOLVE_SOLVE = document.getElementById('SOLVE_SOLVE');
const SOLVE_TEXT = document.getElementById('SOLVE_TEXT');

const LIST_BODY = document.getElementById('LIST_BODY');

function SolveRandom()
{
  let data = JSON.stringify({ });
  Post('RandomSolve', data)
  .then(FillSolve)
  .catch((error) => console.error(error));
}

function Solve()
{
  let data = JSON.stringify({ 'solveString' : solveString });
  Post('Solve', data)
  .then(ResolveSolve)
  .catch((error) => console.error(error));
}

function FillSolve(result)
{
  solveString = '';
  for(let i = 0; i < sLength; i++)
  {
    sArray[i].innerHTML = result[i];
    solveString += result[i];
    Pop(sArray[i]);
  }
}

function ResolveSolve(result)
{
  let output = JSON.parse(result);
  if(output === "-1")
  {
    SOLVE_TEXT.innerHTML = "This word is not in the current dictionary.";
    Pop(SOLVE_TEXT);
  }
  else
  {
    FillOutput(output[1]);
    SolveResponse(output[2], output[0]);
    ToggleScreen(1);
    SOLVE_TEXT.innerHTML = "";
  }
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
    wArray[i].innerHTML = "";
    wArray[i].dataset.state = "excluded";
  }
  
  // add format to letters
  for(let i = 0; i < cLength; i++)
  {   
    await Sleep(100);
    
    wArray[i].innerHTML = guessArr[i];
    Pop(wArray[i]);
    
    if(colorArr[i] === -1)
    {
      continue;
    }
    else if(colorArr[i] === 1)
    {
      wArray[i].dataset.state = "wrongPosition";
    }
    else if(colorArr[i] === 2)
    {
      wArray[i].dataset.state = "rightPosition";
    }
  }
}

function FillOutput(wordArray)
{
  LIST_BODY.innerHTML = "";

  for(let i = 0; i < wordArray.length; i++)
  {
    let row = document.createElement('DIV');
    row.className = "wordListClass flex flex-row justify-center items-center w-full max-w-md";
    row.id = "r" + i;

    // rank id
    let cell0 = document.createElement('DIV');
    cell0.className = "rounded-lg w-10 h-10 mx-2 uppercase flex justify-center items-center";
    cell0.innerHTML = (i + 1);
    row.appendChild(cell0);

    for(let w = 0; w < wordArray[i][0].length; w++ )
    {
      // letters
      let cell1 = document.createElement('DIV');
      cell1.className = "rounded-lg w-10 h-10 mx-2 uppercase flex justify-center items-center";
      cell1.innerHTML = wordArray[i][0][w];
      row.appendChild(cell1);
    }

    // score
    let cell3 = document.createElement('DIV');
    cell3.className = "rounded-lg w-10 h-10 mx-2 uppercase flex justify-center items-center";
    if(wordArray[i][1] != null) cell3.innerHTML = wordArray[i][1];
    row.appendChild(cell3);

    LIST_BODY.appendChild(row);
  }
}








// DICTIONARY LOGIC

const dArray = document.getElementsByClassName('dictionaryButton');
const dLength = dArray.length;

function ChangeDictionary(newDictionary)
{
  let data = JSON.stringify({ 'newDictionary' : newDictionary });
  Post('ChangeDictionary', data)
  .then(UpdateDictionary)
  .catch((error) => console.error(error));
}

function UpdateDictionary(result)
{
  let output = parseInt(JSON.parse(result));
  for(let i = 0; i < dLength; i++)
  {
    if(i === output) dArray[i].dataset.state = 'active';
    else dArray[i].dataset.state = 'inactive';
  }
}






// KEYBOARD / INPUT LOGIC

const kArray = document.getElementsByClassName("keyboardButtons");
const kLength = kArray.length;

const fArray = document.getElementsByClassName("filterWords");
const fLength = fArray.length;

const sArray = document.getElementsByClassName("solveInput");
const sLength = sArray.length;

let playing = ''; // empty = not playing -, D, R = daily/random
let keyboardsearch = false;
let guessLevel = 0; // counts the available guesses

let solveString = ''; // to hold word to pass for ai to solve
let filterString = ''; // the word filter on the word output list
let inputString = ''; // the full string of letters in the guess screen, either guessing or playing
let keyboardString = ''; // holds letters for keyboard search

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

document.onkeyup = function(event)
{
  if(alphabet.includes(event.key.toUpperCase())) Toggle(event.key.toUpperCase());
  if(event.key === 'Enter')Toggle('>');
  if(event.key === 'Delete' || event.key === 'Backspace') Toggle('<');
  if(event.key === '-') Toggle('-');
  if(event.key === '?') Toggle('?');
}

function Toggle(key)
{
  // arcade or not - playing string
  // solve screen or not - display state of name screen
  // alphabet or control - key value
  // if playing - playing string
  // if inputstring allows - relevant string length
  // input or output - display state of list/guess screen
  // keyboardsearch or not

  // Toggles keyboardsearch
  if(key === '?')
  {
    // if not playing a game, and only if on the GUESS screen
    if(playing !== '' || GUESS.style.display !== '') return;
    keyboardsearch = !keyboardsearch;
    keyboardString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    KeyboardSearchKeys();
    return;
  }

  // Adds - to filterString
  if(key === '-')
  {
    // if only on the list screen
    if(LIST.style.display === '') AddLetter(key, 'LIST');
    return;
  }

  if(key === '>' || key === '&gt;')
  {
    if(GUESS.style.display !== '') return;
    if(playing !== '')
    {
      if(inputString.length !== ( guessLevel * 5 ) ) return;
      else SubmitGuess();
    }
    else
    {
      if(keyboardsearch) FilterByKeys();
      else FilterByInput();
    }
  }

  // Deletes last character from any string
  if(key === '<' || key === '&lt;')
  {
    if(playing !== '') if(inputString.length <= ( ( guessLevel - 1 ) * 5 ) ) return;
    if(LIST.style.display === '') RemoveLetter('LIST');
    if(GUESS.style.display === '') RemoveLetter('GUESS');
    if(SOLVE.style.display === '') RemoveLetter('SOLVE');
    return;
  }

  // For any non-command character, either add it to the relevant string or toggle its keyboardsearch state
  if(key === '?' ||key === '-' || key === '>' || key === '&gt;' || key === '<' || key === '&lt;') return;

  if(keyboardsearch)
  {
    if(GUESS.style.display === '')
    {
      if(keyboardString.includes(key))
      {
        let i = keyboardString.indexOf(key);
        keyboardString = keyboardString.slice(0, i) + keyboardString.slice(i + 1, keyboardString.length);
      }
      else
      {
        keyboardString += key.toUpperCase();
      }
      KeyboardSearchKeys();
    }
  }
  else
  {
    if(playing !== '')
    {
      if(inputString.length >= (guessLevel * 5)) return;
    }
    if(LIST.style.display === '') AddLetter(key, 'LIST');
    if(GUESS.style.display === '') AddLetter(key, 'GUESS');
    if(SOLVE.style.display === '') AddLetter(key, 'SOLVE');
  }
}

// INPUT TEXT

function AddLetter(key, type)
{
  if(type === 'LIST') if(filterString.length >= fLength) return;
  if(type === 'GUESS') if(inputString.length >= wLength) return;
  if(type === 'SOLVE') if(solveString.length >= wLength) return;

  if(type === 'LIST') filterString += key;
  if(type === 'GUESS') inputString += key;
  if(type === 'SOLVE') solveString += key;

  FillLetters(type);
}

function RemoveLetter(type)
{
  if(type === 'LIST') if(filterString.length === 0) return;
  if(type === 'GUESS') if(inputString.length === 0) return;
  if(type === 'SOLVE') if(solveString.length === 0) return;
  
  if(type === 'LIST') filterString = filterString.substring(0, (filterString.length - 1));
  if(type === 'GUESS') inputString = inputString.substring(0, (inputString.length - 1));
  if(type === 'SOLVE') solveString = solveString.substring(0, (solveString.length - 1));

  FillLetters(type);
}

function FillLetters(type)
{
  let string, array, length;

  if(type === 'LIST')
  {
    string = filterString;
    array = fArray;
    length = fLength;
  }

  if(type === 'GUESS')
  {
    string = inputString;
    array = wArray;
    length = wLength;
  }

  if(type === 'SOLVE')
  {
    string = solveString;
    array = sArray;
    length = sLength;
  }

  for(let i = 0; i < length; i++)
  {
    if(i < string.length)
    {
      if(array[i].innerHTML != string[i])
      {
        array[i].innerHTML = string[i];
        Pop(array[i]);
      }
    }
    else 
    {
      if(array[i].innerHTML != "")
      {
        Pop(array[i]);
      }
      array[i].innerHTML = "";
    }
  }
  
  if(type === "GUESS")
  {
    if(playing !== '')
    {
      if(string.length === ( guessLevel * 5 ) )
      {
        kArray[28].dataset.state = 'selected';
      }
      else
      {
        kArray[28].dataset.state = 'disabled';
      }
    }
  }

  if(type === "LIST")
  {
    FilterWords();
  }
}

function KeyboardSearchKeys()
{
  if(keyboardsearch)
  {
    for(let i = 0; i < kLength; i++)
    {
      if(keyboardString.includes(kArray[i].innerHTML.toUpperCase()) || kArray[i].innerHTML === '?') kArray[i].dataset.state = 'selected';
      else kArray[i].dataset.state = 'disabled';
    }
  }
  else for(let i = 0; i < kLength; i++) kArray[i].dataset.state = 'disabled';
}





// POST LOGIC

let thinking = false;

async function Post(trigger, data)
{
  thinking = true;
  let output = '';

  await $.ajax(
  {
    method: "POST",
    url: "/" + trigger,
    data:
    {
      data
    },
    success:function(result)
    {
      thinking = false;
      output = result;
    },
    error:function(result)
    {
      thinking = false;
      output = result;
    }
  });

  return output;
}


// ANIMATION LOGIC

function Pop(panel)
{
  panel.animate(
    [
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
    ],
    {
      duration: 100,
    }
  );
}

function Sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}