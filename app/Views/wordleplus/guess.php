<div id="GUESS" style='min-height: calc(var(--vh) * 65); max-height: calc(var(--vh) * 65);' class='flex flex-col justify-center items-center overflow-y-auto w-full max-w-xl mx-auto'>
  <?php
    $rowCount = 6;
    $buttonCount = 5;
    
    for($i = 0; $i < $rowCount; $i++)
    {
      echo '<div class="flex flex-row justify-center items-center" style="height: calc( (var(--vh) * 62.5) / ' . $rowCount . ' ); max-height: 100px; min-width:100%;">';
        for($r = 0; $r < $buttonCount; $r++)
        {
          echo '
          <div class="h-full" style="width: calc( 95% / ' . $buttonCount . ')">
            <button class="wordInput active:scale-95 hover:scale-105 rounded-lg" style="height: 90%; width: 90%;" id="'. $i . $r.'"></button>
          </div>
          ';
        }
      echo '</div>';
    }
  ?>
</div>