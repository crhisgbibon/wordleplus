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
  RESET_BUTTON.onclick = function() { Main(); };

  // Assign GUESS buttons
  for(let i = 0; i < wLength; i++)
  {
    wArray[i].dataset.state = "excluded";
    wArray[i].onclick = null;
    wArray[i].onclick = function() { SwitchState(wArray[i]); };
  }

  // Assign DICTIONARY buttons
  for(let i = 0; i < dLength; i++)
  {
    dArray[i].onclick = null;
    dArray[i].onclick = function() { ChangeDictionary(i); };
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
  }

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
      b[i].style.backgroundColor = 'var(--backgroundLight)';
      v[i].style.display = '';
    }
    else
    {
      b[i].style.backgroundColor = 'var(--active)';
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
    button.style.backgroundColor = "var(--yellow)";
  }
  else if(button.dataset.state === "wrongPosition")
  {
    button.dataset.state = "rightPosition";
    button.style.backgroundColor = "var(--green)";
  }
  else if(button.dataset.state === "rightPosition")
  {
    button.dataset.state = "excluded";
    button.style.backgroundColor = "var(--backgroundLight)";
  }
}



// SOLVE LOGIC

const SOLVE_RANDOM = document.getElementById('SOLVE_RANDOM');
const SOLVE_SOLVE = document.getElementById('SOLVE_SOLVE');

async function SolveRandom()
{
  let data = { };
  Post('RandomSolve', data)
  .then(FillSolve)
  .catch((error) => console.error(error));
}

function Solve()
{
  let data = { solveString };
  console.log(data);
  Post('Solve', data)
  .then(FillSolve)
  .catch((error) => console.error(error));
}

function FillSolve(result)
{
  console.log('result is ' + result);
  for(let i = 0; i < sLength; i++) sArray[i].innerHTML = result[i];
}








// DICTIONARY LOGIC

const dArray = document.getElementsByClassName('dictionaryButton');
const dLength = dArray.length;

function ChangeDictionary()
{

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

const toggleLetters = [];
let tLen = 0;

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
        AnimateOnInput(array[i]);
      }
    }
    else 
    {
      if(array[i].innerHTML != "")
      {
        AnimateOnInput(array[i]);
      }
      array[i].innerHTML = "";
    }
  }
  
  if(type === "GUESS")
  {
    if(playing && string.length > ((guessLevel * 5) - 5))
    {
      if(string.length % 5 == 0)
      {
        kArray[29].style.backgroundColor = "var(--green)";
      }
      else
      {
        kArray[29].style.backgroundColor = "var(--backgroundLight)";
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
      if(keyboardString.includes(kArray[i].innerHTML.toUpperCase()) || kArray[i].innerHTML === '?') kArray[i].style.backgroundColor = 'var(--green)';
      else kArray[i].style.backgroundColor = 'var(--backgroundLight)';
    }
  }
  else for(let i = 0; i < kLength; i++) kArray[i].style.backgroundColor = 'var(--backgroundLight)';
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

function AnimateOnInput(panel)
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