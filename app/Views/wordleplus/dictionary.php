<style>
  #dictionaryCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
    z-index: 2;
    background-color:var(--background);
  }

  #dictionaryCenterMessageBox{
    width: 100%;
    height: calc(var(--vh) * 10);
  }

  #dictionaryCenterHeaderText{
    height: calc(var(--vh) * 10);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  #dictionaryCenterButtonDiv{
    width: 100%;
    height: calc(var(--vh) * 62.5); 
  }

  #dictionaryCenterButtonList{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: none;
    display: block;
  }

  .dictionaryButtonDiv{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    min-height: 50px;
    margin: 0;
    padding: 0;
  }

  .dictionaryButton{
    width: 50%;
    max-width: 300px;
    min-height: 50px;
    text-align: center;
    margin: 4px;
    padding: 0;
    font-size: 16px;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: var(--backgroundLight);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #guessText{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    overflow: hidden;
    margin: 8px;
    padding: 8px;
    width: 90%;
    max-width: 450px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--backgroundLight);
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: var(--active);
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: var(--green);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--active);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>

<div id="dictionaryCenter">  
  <div id="dictionaryCenterButtonDiv">
    <div id="dictionaryCenterButtonList">
      <div id="dictionaryCenterHeaderText">
        Select dictionary size:
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d1">1. Minor</button>
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d2">2. Small</button>
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d3">3. Typic</button>
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d4">4. Broad</button>
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d5">5. Large</button>
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d6">6. Giant</button>
      </div>
      <div class="dictionaryButtonDiv">
        <button class="dictionaryButton" id="d7">7. Total</button>
      </div>
      
      <div class="dictionaryButtonDiv">
        Select guess type:
      </div>
      <div class="dictionaryButtonDiv">
        <label class="switch">
          <input type="checkbox" id="guessFromAnswerCheck" checked>
          <span class="slider round"></span>
        </label>
      </div>
      <div class="dictionaryButtonDiv">
        <div id="guessText">
          If toggled green then your guesses must be taken from the selected dictionary, otherwise you can guess anything.
        </div>
      </div>
    </div>
  </div>
</div>