<style>
  #clueCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 2;
    background-color: var(--background);
  }

  #clueCenterMessageBox{
    width: 100%;
    height: calc(var(--vh) * 15); 
  }

  #clueCenterHeaderText{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  #clueInputBox{
    width: 100%;
    height: calc(var(--vh) * 20);
  }

  #clueFlexBox{
    height: 100%;
    max-width: 350px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .clueInput{
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

  #clueCenterOutputBox{
    width: 100%;
    height: calc(var(--vh) * 20);
  }

  #clueCenterOutput{
    width: 100%;
    height: calc(var(--vh) * 10);
  }

  #clueCenterOutputText{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  #clueCenterOutputButtonHolder{
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }

  #clueCenterOutputButtonHolder button{
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

<div id="clueCenter">
  <div id="clueCenterMessageBox">
    <div id="clueCenterHeaderText">
      Request a clue.
    </div>
  </div>
  
  <div id="clueInputBox">
    <div id="clueFlexBox">
      <input disabled class="clueInput" id="c0" maxlength="1" type="text">
      <input disabled class="clueInput" id="c1" maxlength="1" type="text">
      <input disabled class="clueInput" id="c2" maxlength="1" type="text">
      <input disabled class="clueInput" id="c3" maxlength="1" type="text">
      <input disabled class="clueInput" id="c4" maxlength="1" type="text">
    </div>
  </div>
  
  <div id="clueCenterOutputBox">
    <div id="clueCenterOutput">
      <p id="clueCenterOutputText"></p>
    </div>
    <div id="clueCenterOutputButtonHolder">
      <button id="getClueButton">?</button>
      <button id="closeClueButton">X</button>
    </div>
  </div>
</div>