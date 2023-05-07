<style>
  #nameCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 2;
    background-color: var(--background);
  }

  #nameCenterMessageBox{
    width: 100%;
    height: calc(var(--vh) * 15); 
  }

  #nameCenterHeaderText{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  #nameInputBox{
    width: 100%;
    height: calc(var(--vh) * 20);
  }

  #nameFlexBox{
    height: 100%;
    max-width: 350px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .nameInput{
    max-width: 60px;
    max-height: 60px;
    height: 90%;
    width: 18%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 12px;
    background-color: var(--backgroundLight);
    box-sizing: border-box;
  }

  #nameCenterOutputBox{
    width: 100%;
    height: calc(var(--vh) * 20);
  }

  #nameCenterOutput{
    width: 100%;
    height: calc(var(--vh) * 10);
  }

  #nameCenterOutputText{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #nameButtonDiv{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
    max-width: 200px;
    margin-right: auto;
    margin-left: auto;
  }

  #nameCenterOutputButtonHolder{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  #nameCenterOutputButtonHolder button{
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

<div id="nameCenter">
  <div id="nameCenterMessageBox">
    <div id="nameCenterHeaderText">
      Enter a name to save your score and end the game.
    </div>
  </div>
  
  <div id="nameInputBox">
    <div id="nameFlexBox">
      <input disabled class="nameInput" id="n0" maxlength="1" type="text">
      <input disabled class="nameInput" id="n1" maxlength="1" type="text">
      <input disabled class="nameInput" id="n2" maxlength="1" type="text">
      <input disabled class="nameInput" id="n3" maxlength="1" type="text">
      <input disabled class="nameInput" id="n4" maxlength="1" type="text">
    </div>
  </div>
  
  <div id="nameCenterOutputBox">
    <div id="nameCenterOutput">
      <p id="nameCenterOutputText"></p>
    </div>
    <div id="nameButtonDiv">
      <div id="nameCenterOutputButtonHolder">
        <button id="enterNameButton">></button>
      </div>
      <div id="nameCenterOutputButtonHolder">
        <button id="exitNameButton">X</button>
      </div>
    </div>
  </div>
</div>