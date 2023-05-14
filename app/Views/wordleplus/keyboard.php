<div style='min-height: calc(var(--vh) * 27.5); max-height: calc(var(--vh) * 27.5);' class='flex flex-col justify-start items-center w-full max-w-lg mx-auto'>
  <?php
    $qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "?",
        "Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");

    $rowCount = 3;
    $buttonCount = 10;
    $counter = 0;
    
    for($i = 0; $i < $rowCount; $i++)
    {
      echo '<div class="flex flex-row justify-center items-center pt-px" style="height: calc( (var(--vh) * 25) / ' . $rowCount . ' ); min-width:100%;">';
        for($r = 0; $r < $buttonCount; $r++)
        {
          echo '
          <div class="h-full" style="width: calc( 95% / ' . $buttonCount . ')">
            <button class="keyboardButtons active:scale-95 hover:scale-105 rounded-lg" style="height: 90%; width: 90%;" id="'. $i . $r.'">'.$qwerty[$counter].'</button>
          </div>
          ';
          $counter++;
        }
      echo '</div>';
    }
  ?>
</div>