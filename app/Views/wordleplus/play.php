<style>
  #playCenter{
    position: fixed;
    background-color:var(--background);
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 2;
  }

  #playCenterMessageBox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #playCenterText{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 450px;
    font-size: 16px;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  #playCenterText div{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playContentDiv
  {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100px;
    box-sizing: border-box;
    padding: 5%;
  }

  .playCenterButton{
    position: relative;
    height: 100%;
    width: 100%;
    max-width: 56.25px;
    max-height: 56.25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 16px;
    border-radius: 12px;
    box-sizing: border-box;
    text-align: center;
  }

  .playCenterImg{
    width: 50%;
    height: 50%;
  }

  .rightPlayDiv{
    width: 75%;
    height: 100%;
    text-align: center;
  }

  .playDivAcross{
    width: 100%;
    height: 100%;
    text-align: center;
  }

</style>

<div id="playCenter">
  <div id="playCenterMessageBox">
    <div id="playCenterText">
      <div class="playContentDiv">
        <button id="playCenterRandomButton" class="playCenterButton">
          <img id="playPlay" class="playCenterImg" src="images/play.svg">
        </button>
        <div class="rightPlayDiv">Random.</div>
        <button class="playCenterButton">
          <img id="playChart1" class="playCenterImg" src="images/chart.svg">
        </button>
      </div>
      <div class="playContentDiv">
        <button id="playCenterDailyButton" class="playCenterButton">
          <img id="playGlobe" class="playCenterImg" src="images/play.svg">
        </button>
        <div class="rightPlayDiv">Daily.</div>
        <button class="playCenterButton">
          <img id="playChart2" class="playCenterImg" src="images/chart.svg">
        </button>
      </div>
      <div class="playContentDiv">
        <button id="playCenterArcadeButton" class="playCenterButton">
          <img id="playSand" class="playCenterImg" src="images/play.svg">
        </button>
        <div class="rightPlayDiv">Arcade.</div>
        <button id="playCenterLeaderboardButton" class="playCenterButton">
          <img id="playLeaderboard" class="playCenterImg" src="images/leaderboard.svg">
        </button>
      </div>
    </div>
  </div>
</div>