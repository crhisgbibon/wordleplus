'use strict';

let playing = false;



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

const PLAY = document.getElementById('PLAY');
const GUESS = document.getElementById('GUESS');
const LIST = document.getElementById('LIST');
const SOLVE = document.getElementById('SOLVE');
const DICTIONARY = document.getElementById('DICTIONARY');
const INFO = document.getElementById('INFO');

const CHART = document.getElementById('CHART');
const CLUE = document.getElementById('CLUE');
const LEADERBOARD = document.getElementById('LEADERBOARD');
const NAME = document.getElementById('NAME');

const v = [
  PLAY,
  GUESS,
  LIST,
  SOLVE,
  DICTIONARY,
  INFO
];

function Main()
{
  CHART.style.display = 'none';
  CLUE.style.display = 'none';
  LEADERBOARD.style.display = 'none';
  NAME.style.display = 'none';

  for(let i = 0; i < bLen; i++)
  {
    b[i].onclick = null;
    b[i].onclick = function() { ToggleScreen(i); };
  }

  ToggleScreen(1);

  RESET_BUTTON.onclick = null;
  RESET_BUTTON.onclick = function() { Main(); };

  for(let i = 0; i < lLength; i++)
  {
    letterInput[i].onclick = null;
    letterInput[i].onclick = function() { SwitchState(letterInput[i]); };
  }

  for(let i = 0; i < kLength; i++)
  {
    kArray[i].onclick = null;
    kArray[i].onclick = function() { Toggle(kArray[i].innerHTML) };
  }
}

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

document.addEventListener('DOMContentLoaded', Main);



const letterInput = document.getElementsByClassName('letterInput');
const lLength = letterInput.length;

function SwitchState(button)
{
  if(playing) return;

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



const kArray = document.getElementsByClassName("keyboardButtons");
const kLength = kArray.length;

function Toggle(key)
{




  
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