<style>
  #chartCenter{
  position: fixed;
  width: 100%;
  height: calc(var(--vh) * 62.5);
  padding: 0;
  margin: 0;
  z-index: 3;
  background-color: var(--background);
}

#chartCenterMessageBox{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

#chartCenterText{
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

.chartContentDiv
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

.chartTextLeft{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  padding-right: 6px;
  float: left;
}

.chartTextRight{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  float: left;
}

#closeChartButton{
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

#cleanChartButton{
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

<div id="chartCenter">
  <div id="chartCenterMessageBox">
    <div id="chartCenterText">
      <div class="chartContentDiv">
        <div class="chartTextLeft" id="chartType">Random.</div>
        <div class="chartTextRight">
          <button id="closeChartButton">
            <img id="chartClose" class="chartCenterImg" src="images/close.svg">
          </button>
        </div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">Clear:</div>
        <div class="chartTextRight">
          <button id="cleanChartButton">
            <img id="chartErase" class="chartCenterImg" src="images/erase.svg">
          </button>
        </div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">Played:</div>
        <div class="chartTextRight" id="chartPlayed">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">Win %:</div>
        <div class="chartTextRight" id="chartPercent">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">Streak:</div>
        <div class="chartTextRight" id="chartCurrent">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">Maximum:</div>
        <div class="chartTextRight" id="chartMax">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">1:</div>
        <div class="chartTextRight" id="chartOne">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">2:</div>
        <div class="chartTextRight" id="chartTwo">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">3:</div>
        <div class="chartTextRight" id="chartThree">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">4:</div>
        <div class="chartTextRight" id="chartFour">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">5:</div>
        <div class="chartTextRight" id="chartFive">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">6:</div>
        <div class="chartTextRight" id="chartSix">0</div>
      </div>
      <div class="chartContentDiv">
        <div class="chartTextLeft">X:</div>
        <div class="chartTextRight" id="chartFailed">0</div>
      </div>
    </div>
  </div>
</div>