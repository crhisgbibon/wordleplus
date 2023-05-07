<style>

  #solveCenter{
    position: fixed;
    background-color:var(--background);
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 2;
    overflow-y: auto;
  }

  #solveCenterMessageBox{
    width: 100%;
    height: calc(var(--vh) * 15); 
  }

  #solveCenterHeaderText{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  #solveInputBox{
    width: 100%;
    height: calc(var(--vh) * 25);
  }

  #solveFlexBox{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .solveInput{
    background-color: var(--backgroundLight);
    width: 20%;
    height: calc(var(--vh) * 20);
    max-width: 60px;
    max-height: 60px;
    margin: 2px;
    padding: 0;
    text-transform: uppercase;
    font-size: 16px;
    text-align: center;
    border-radius: 12px;
    box-sizing: border-box;
  }

  #solveCenterOutputBox{
    width: 100%;
    height: calc(var(--vh) * 20);
  }

  #solveCenterOutput{
    width: 100%;
    height: calc(var(--vh) * 10);
  }

  #solveCenterOutputText{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #solveCenterOutputButtonHolder{
    height: calc(var(--vh) * 10);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  #solveCenterOutputButtonHolder button{
    height: 90%;
    width: 90%;
    max-width: 60px;
    max-height: 60px;
    margin: 0;
    margin-right: 6px;
    margin-left: 6px;
    padding: 0;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: var(--backgroundLight);
  }

</style>

<div id="solveCenter">
  <div id="solveCenterMessageBox">
    <div id="solveCenterHeaderText">
      Enter a five letter word to solve.
    </div>
  </div>
  
  <div id="solveInputBox">
    <div id="solveFlexBox">
      <input disabled class="solveInput" id="s0" maxlength="1" type="text">
      <input disabled class="solveInput" id="s1" maxlength="1" type="text">
      <input disabled class="solveInput" id="s2" maxlength="1" type="text">
      <input disabled class="solveInput" id="s3" maxlength="1" type="text">
      <input disabled class="solveInput" id="s4" maxlength="1" type="text">
    </div>
  </div>
  
  <div id="solveCenterOutputBox">
    <div id="solveCenterOutput">
      <p id="solveCenterOutputText"></p>
    </div>
    <div id="solveCenterOutputButtonHolder">
      <button id="randomSolveButton">?</button>
      <button id="goSolveItButton">></button>
    </div>
  </div>
</div>