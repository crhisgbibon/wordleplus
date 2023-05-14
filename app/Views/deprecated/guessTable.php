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
              <input disabled class="wordInput" id="w'.$i . $r.'" maxlength="1" type="text">
              <button class="stateButton" id="s'.$i . $r.'" onclick="SwitchState(this)"></button>
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