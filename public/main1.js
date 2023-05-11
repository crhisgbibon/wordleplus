'use strict';

// STARTUP LOGIC

function Main()
{
  // Assign CONTROLS buttons
  for(let i = 0; i < bLen; i++)
  {
    b[i].onclick = null;
    b[i].onclick = function() { ToggleScreen(i); };
    b[i].dataset.state = "inactive";
  }
  RESET_BUTTON.onclick = null;
  RESET_BUTTON.onclick = function() { Main(); };

  // Assign GUESS buttons
  for(let i = 0; i < wLength; i++)
  {
    wArray[i].innerHTML = '';
    wArray[i].dataset.state = "excluded";
    wArray[i].onclick = null;
    wArray[i].onclick = function() { SwitchState(wArray[i]); };
  }

  // Assign DICTIONARY buttons
  for(let i = 0; i < dLength; i++)
  {
    dArray[i].onclick = null;
    dArray[i].onclick = function() { ChangeDictionary(i); };
    if(i === 2) dArray[i].dataset.state = 'active';
    else dArray[i].dataset.state = 'inactive';
  }
  GUESS_FROM.onclick = function() { GuessFrom(); };

  // Assign SOLVE buttons
  SOLVE_RANDOM.onclick = function() { SolveRandom(); };
  SOLVE_SOLVE.onclick = function() { Solve(); };

  // Assign KEYBOARD buttons
  for(let i = 0; i < kLength; i++)
  {
    kArray[i].onclick = null;
    kArray[i].onclick = function() { Toggle(kArray[i].innerHTML); };
    kArray[i].dataset.state = 'disabled';
  }
  
  // Clear variables

  playing = '';
  keyboardsearch = false;
  guessLevel = 0;
  winCount = 0;

  nameString = '';
  solveString = '';
  filterString = '';
  inputString = '';
  keyboardString = '';

  // Startup
  CHART.style.display = 'none';
  CLUE.style.display = 'none';
  LEADERBOARD.style.display = 'none';
  NAME.style.display = 'none';
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
const CLUE = document.getElementById('CLUE');
const LEADERBOARD = document.getElementById('LEADERBOARD');
const NAME = document.getElementById('NAME');
const playTextPanel = document.getElementById('playTextPanel');

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
}





// GUESS BUTTON LOGIC

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
  console.log(data);
  Post('FilterByKeys', data)
  .then(result => {
    FillOutput(JSON.parse(result));
    ToggleScreen(2);
  })
  .catch((error) => console.error(error));
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
    row.className = "flex flex-row justify-center items-center w-full max-w-md";
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

  // output from php is always ordered by rank
  // sortAZ = false;

  // let src1 = "images/crown.svg";

  // ioSort.src = src1;
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

const GUESS_FROM = document.getElementById("GUESS_FROM");
// false means check against w7 (all words), rather than against answer list
let guessFrom = true;

function GuessFrom()
{
  guessFrom = !guessFrom;
}






// KEYBOARD / INPUT LOGIC

const kArray = document.getElementsByClassName("keyboardButtons");
const kLength = kArray.length;

const fArray = document.getElementsByClassName("filterWords");
const fLength = fArray.length;

const sArray = document.getElementsByClassName("solveInput");
const sLength = sArray.length;

const nameArray = document.getElementsByClassName("nameInput");
const nameLength = nameArray.length;

let playing = ''; // empty = not playing - arcade, daily, random = that game mode
let keyboardsearch = false;
let guessLevel = 0; // counts the available guesses in a standard game
let winCount = 0; // counts the number of wins in arcade mode

let nameString = ''; // to hold player name to submit to leaderboard
let solveString = ''; // to hold word to pass for ai to solve
let filterString = ''; // the word filter on the word output list
let inputString = ''; // the full string of letters in the guess screen, either guessing or playing
let keyboardString = ''; // holds letters for keyboard search

function Toggle(key)
{
  // arcade or not - playing string
  // namescreen or not - display state of name screen
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
    if(playing !== '')
    {
      SubmitGuess();
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
    if(playing !== '') if(inputString.length > ((guessLevel * 5) - 5)) return;
    if(LIST.style.display === '') RemoveLetter('LIST');
    if(GUESS.style.display === '') RemoveLetter('GUESS');
    if(SOLVE.style.display === '') RemoveLetter('SOLVE');
    if(NAME.style.display === '') RemoveLetter('NAME');
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
      if(winCount === 5) return;
      if(inputString.length >= (guessLevel * 5)) return;
    }
    if(LIST.style.display === '') AddLetter(key, 'LIST');
    if(GUESS.style.display === '') AddLetter(key, 'GUESS');
    if(SOLVE.style.display === '') AddLetter(key, 'SOLVE');
    if(NAME.style.display === '') AddLetter(key, 'NAME');
  }
}

// INPUT TEXT

function AddLetter(key, type)
{
  if(type === 'LIST') if(filterString.length >= fLength) return;
  if(type === 'GUESS') if(inputString.length >= wLength) return;
  if(type === 'SOLVE') if(solveString.length >= wLength) return;
  if(type === 'NAME') if(nameString.length >= wLength) return;

  if(type === 'LIST') filterString += key;
  if(type === 'GUESS') inputString += key;
  if(type === 'SOLVE') solveString += key;
  if(type === 'NAME') nameString += key;

  FillLetters(type);
}

function RemoveLetter(type)
{
  if(type === 'LIST') if(filterString.length === 0) return;
  if(type === 'GUESS') if(inputString.length === 0) return;
  if(type === 'SOLVE') if(solveString.length === 0) return;
  if(type === 'NAME') if(nameString.length === 0) return;
  
  if(type === 'LIST') filterString = filterString.substring(0, (filterString.length - 1));
  if(type === 'GUESS') inputString = inputString.substring(0, (inputString.length - 1));
  if(type === 'SOLVE') solveString = solveString.substring(0, (solveString.length - 1));
  if(type === 'NAME') nameString = nameString.substring(0, (nameString.length - 1));

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

  if(type === 'NAME')
  {
    string = nameString;
    array = nameArray;
    length = nameLength;
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
    if(playing && string.length > ((guessLevel * 5) - 5))
    {
      if(string.length % 5 === 0)
      {
        kArray[29].dataset.state = 'selected';
      }
      else
      {
        kArray[29].dataset.state = 'disabled';
      }
    }
  }

  if(type === "LIST")
  {
    FilterWords();
  }
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
    if(check) allDiv[i].style.display = "none";
    else allDiv[i].style.display = "";
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