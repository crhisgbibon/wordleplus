<style>
  #leaderboardCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 3;
    background-color: var(--background);
  }

  #leaderboardCenterMessageBox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  #leaderboardCenterText{
    display: block;
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

  #leaderBoardTitleDiv{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #leaderBoardData{
    display: block;
    width: 100%;
    max-width: 450px;
    font-size: 16px;
    overflow-y: scroll;
    scrollbar-width: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .leaderboardContentDiv
  {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100px;
    box-sizing: border-box;
    padding: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .leaderboardTextLeft{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    padding-right: 6px;
    float: left;
  }

  .leaderboardTextRight{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    float: left;
  }

  #closeLeaderboardButton{
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

  #refreshLeaderboardButton{
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

  .chartCenterImg{
    height: 50%;
    width: 50%;
  }
</style>
<div id="leaderboardCenter">
  <div id="leaderboardCenterMessageBox">
    <div id="leaderboardCenterText">
      <div id="leaderBoardTitleDiv" class="leaderboardContentDiv">
          <button id="refreshLeaderboardButton">
            <img id="refreshLeaderboardIMG" class="chartCenterImg" src="images/undo.svg">
          </button>
          Leaderboard.
          <button id="closeLeaderboardButton">
            <img id="closeLeaderboardIMG" class="chartCenterImg" src="images/close.svg">
          </button>
      </div>
      <div id="leaderBoardData">
        <div class="leaderboardContentDiv">
          <div class="leaderboardTextLeft"></div>
          <div class="leaderboardTextRight"></div>
        </div>
      </div>
    </div>
  </div>
</div>