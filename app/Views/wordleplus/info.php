<style>
  #infoCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 2;
    background-color:var(--background);
  }

  #infoCenterMessageBox{
    width: 100%;
    height: calc(var(--vh) * 62.5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #infoCenterText{
    display: block;
    height: 100%;
    max-width: 600px;
    font-size: 16px;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #infoCenterText div{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
  }

  #infoCenterText div img{
    margin-right: 6px;
  }.helpContentDiv
  {
    width: 100%;
    max-width: 450px;
    min-height: calc(var(--vh) * 10);
    max-height: 150px;
    box-sizing: border-box;
    padding: 5%;
    text-align: center;
  }

  .leftInfoImg{
    width: 25%;
    height: 100%;
    max-width: 40px;
    max-height: 40px;
  }

  .rightInfoDiv{
    width: 75%;
    height: 100%;
    padding: 5%;
    text-align: center;
  }

  .infoDivAcross{
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>

<div id="infoCenter">
  <div id="infoCenterMessageBox">
    <div id="infoCenterText">
      <div class="helpContentDiv">
        <div class="infoDivAcross">Menu options:</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoPlay" class="leftInfoImg" src="images/play.svg"><div class="rightInfoDiv">Pick game mode.</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoSwitch" class="leftInfoImg" src="images/keyboard.svg"><div class="rightInfoDiv">Toggle between the input and output screens.</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoSolve" class="leftInfoImg" src="images/search.svg"><div class="rightInfoDiv">Solve Wordles.</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoList" class="leftInfoImg" src="images/database.svg"><div class="rightInfoDiv">Dictionary options.</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoInfo" class="leftInfoImg" src="images/info.svg"><div class="rightInfoDiv">Info screen.</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoReset" class="leftInfoImg" src="images/undo.svg"><div class="rightInfoDiv">Resets everything.</div>
      </div>
      <div class="helpContentDiv">
        <div class="infoDivAcross">Keyboard commands:</div>
      </div>
      <div class="helpContentDiv">
        <div class="leftInfoImg" >></div><div class="rightInfoDiv">Submit guess.</div>
      </div>
      <div class="helpContentDiv">
        <div class="leftInfoImg" ><</div><div class="rightInfoDiv">Delete last letter.</div>
      </div>
      <div class="helpContentDiv">
        <div class="leftInfoImg" >?</div><div class="rightInfoDiv">Toggle letter search. On submit will produce a ranked list of words using only the letters in green.</div>
      </div>
      <div class="helpContentDiv">
        <div class="leftInfoImg" >-</div><div class="rightInfoDiv">Acts as 'any' letter in the output word filter. E.G. -OUSE returns both HOUSE and MOUSE.</div>
      </div>
      <div class="helpContentDiv">
        <div class="infoDivAcross">Output screen commands:</div>
      </div>
      <div class="helpContentDiv">
        <img id="infoSort" class="leftInfoImg" src="images/crown.svg"><div class="rightInfoDiv">Switch sorting of the output word list between A-Z and word score.</div>
      </div>
    </div>
  </div>
</div>