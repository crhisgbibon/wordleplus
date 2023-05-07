<style>
  #guessTableCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 62.5);
    max-height: calc(var(--vh) * 62.5);
    padding: 0;
    margin: 0;
  }

  #wordTableGuess{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 95%;
    width: 95%;
    max-width: 400px;
    max-height: 400px;
    margin: auto;
    padding: 0;
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;
  }

  #wordTableGuessBody{
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }

  #wordTableGuessBody tr{
    position: relative;
    height: 16.66%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }

  #wordTableGuessBody td{
    position: relative;
    margin: 0;
    padding: 0;
  }

  /* #wordTableGuessBody td input{
    position: absolute;
    top: 0;
    left: 0;
    height: 90%;
    width: 90%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 12px;
    background-color: var(--backgroundLight);
    color: black;
    box-sizing: border-box;
  } */

  .wordInput{
    position: absolute;
    top: 0;
    left: 0;
    height: 90%;
    width: 90%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    text-transform: uppercase;
    border-radius: 12px;
    background-color: var(--backgroundLight);
    box-sizing: border-box;
  }

  #wordTableGuessBody td button{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    z-index: 1;
  }
</style>

<div id="guessTableCenter">
  <?php
    echo '
    <table id="wordTableGuess">
      <thead id="wordTableGuessHead">
    </thead>
      <tbody id="wordTableGuessBody">
    ';
  
    $rowCount = 6;
    $buttonCount = 5;
    
    for($i = 0; $i < $rowCount; $i++)
    {
      echo'
        <tr>
      ';
        
        for($r = 0; $r < $buttonCount; $r++)
        {
          echo '
            <td class="guessTD">
              <div class="wordInput" id="w'.$i . $r.'" maxlength="1" type="text"></div>
              <button class="stateButton" id="s'.$i . $r.'"></button>
            </td>
          ';
        }
        
        echo'
          </tr>
        ';
    }
    
    echo '
      </tbody>
    </table>
    ';
  ?>
</div>