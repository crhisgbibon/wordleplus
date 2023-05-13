<div id="SOLVE" style='min-height: calc(var(--vh) * 65); max-height: calc(var(--vh) * 65);' class='flex flex-col justify-center items-center overflow-y-auto'>
  <div class="flex flex-row justify-center items-center w-full max-w-sm px-4" style='height: calc(var(--vh) * 7.5);'>
    Enter a five letter word to solve.
  </div>
  
  <div class="flex flex-row justify-center items-center w-full max-w-sm px-4" style='height: calc(var(--vh) * 7.5);'>
    <button class="solveInput rounded-lg w-10 h-10 mx-2 uppercase" style='background-color: var(--backgroundLight);'></button>
    <button class="solveInput rounded-lg w-10 h-10 mx-2 uppercase" style='background-color: var(--backgroundLight);'></button>
    <button class="solveInput rounded-lg w-10 h-10 mx-2 uppercase" style='background-color: var(--backgroundLight);'></button>
    <button class="solveInput rounded-lg w-10 h-10 mx-2 uppercase" style='background-color: var(--backgroundLight);'></button>
    <button class="solveInput rounded-lg w-10 h-10 mx-2 uppercase" style='background-color: var(--backgroundLight);'></button>
  </div>
  
  <div class="flex flex-col justify-center items-center w-full max-w-sm px-4" style='height: calc(var(--vh) * 15);'>
    <div class="flex flex-row justify-center items-center w-full max-w-sm px-4" style='height: calc(var(--vh) * 7.5);'>
      <p id='SOLVE_TEXT'></p>
    </div>
    <div class="flex flex-row justify-center items-center w-full max-w-sm px-4" style='height: calc(var(--vh) * 7.5);'>
      <button id='SOLVE_RANDOM' class='active:scale-95 hover:scale-105 mx-4 rounded-lg w-10 h-10' style='background-color: var(--backgroundLight);'>?</button>
      <button id='SOLVE_SOLVE' class='active:scale-95 hover:scale-105 mx-4 rounded-lg w-10 h-10' style='background-color: var(--backgroundLight);'>></button>
    </div>
  </div>
</div>