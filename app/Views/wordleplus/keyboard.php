<style>
  #keyboardTableCenter{
    position: fixed;
    width: 100%;
    height: calc(var(--vh) * 30);
    min-height: calc(var(--vh) * 30);
    top: calc(var(--vh) * 70);
    padding: 0;
    margin: 0;
  }

  #keyboardSelect{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 95%;
    width: 95%;
    max-width: 500px;
    max-height: 225px;
    margin: auto;
    padding: 0;
    border: 0;
  }

  #keyboardSelectBody{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }

  #keyboardSelectBody tr{
    height: 33%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }

  #keyboardSelectBody td{
    margin: 0;
    padding: 0;
  }

  #keyboardSelectBody button{
    height: 90%;
    width: 90%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: var(--backgroundLight);
  }

  .keyboardButtons{
    height: 100%;
    width: 100%;
  }
</style>

<div id="keyboardTableCenter">
  <?php
    $qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "?",
        "Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");
        
    $alphabet = array("Q","W","E","R","T","Y","U","I","O","P",
    "A","S","D","F","G","H","J","K","L",
    "Z","X","C","V","B","N","M");

    echo '
    <table id="keyboardSelect">
      <tbody id="keyboardSelectBody">
    ';
  
    $rowCount = 3;
    $buttonCount = 10;
    $counter = 0;
    $alphaCounter = 0;
    
    for($i = 0; $i < $rowCount; $i++)
    {
      echo'
        <tr>
      ';
        
      for($r = 0; $r < $buttonCount; $r++)
      {
        if($qwerty[$counter] === "?" || $qwerty[$counter] === "-"
        || $qwerty[$counter] === ">" || $qwerty[$counter] === "<")
        {
          echo '
          <td class="keyBoardDiv">
            <button class="keyboardButtons" id="c'.$counter.'">'.$qwerty[$counter].'</button>
          </td>
          ';
        }
        else
        {
          echo '
          <td class="keyBoardDiv">
            <button class="keyboardButtons" id="b'.$alphaCounter.'">'.$alphabet[$alphaCounter].'</button>
          </td>
          ';
          $alphaCounter++;
        }
        $counter++;
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