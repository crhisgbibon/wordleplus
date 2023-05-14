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