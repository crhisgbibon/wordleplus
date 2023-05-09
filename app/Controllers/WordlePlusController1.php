<?php

namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

use CodeIgniter\Files\File;

use App\Models\WordlePlusModel;
use App\Models\WordlePlusFragmentsModel;

class WordlePlusController1 extends BaseController
{

  function __construct()
  {
    $this->session = \Config\Services::session();
    $this->qwerty = [];
    $this->alphabet = [];
    $this->w = [];
    $this->file = '';
    $this->wordsRemaining = [];
    if(!$this->session->has('dictionary')) $this->session->set('dictionary', '3');
  }

  private function Boot(int $dictionary)
  {
    $this->wordsRemaining = [];

    $this->file = WRITEPATH . 'words/1000F.txt';

    if($dictionary === 2) $this->file = WRITEPATH . 'words/10000F.txt';
    if($dictionary === 3) $this->file = WRITEPATH . 'words/20000F.txt';

    if($dictionary === 4) $this->file = WRITEPATH . 'words/english1F.txt';
    if($dictionary === 5) $this->file = WRITEPATH . 'words/english2F.txt';
    if($dictionary === 6) $this->file = WRITEPATH . 'words/wordsF.txt';

    if($dictionary === 7) $this->file = WRITEPATH . 'words/allwordsF.txt';
    if($dictionary === 8) $this->file = WRITEPATH . 'words/wordleListF.txt';
    if($dictionary === 9) $this->file = WRITEPATH . 'words/wordleList2F.txt';

    $this->w = $this->ConvertRankedFileToArray(file_get_contents($this->file));
    $this->qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","A", "S", "D", "F", "G", "H", "J", "K", "L", "?","Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");
    $this->alphabet = array("Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M");

    $this->wordsRemaining = $this->w;
  }

  function ConvertRankedFileToArray($file)
  {
    $one = explode("\n", $file);
    $w = array();
    foreach ($one as $item) $w[] = explode(",", $item);
    return $w;
  }

  // PROCESS

  public function index()
  {
    return view('templates/header1')

          .view('new/controls')

          .view('new/play')
          .view('new/guess')
          .view('new/list')
          .view('new/solve')
          .view('new/dictionary')
          .view('new/info')

          .view('new/clue')
          .view('new/name')
          .view('new/chart')
          .view('new/leaderboard')

          .view('new/keyboard')

          .view('templates/footer1');
  }

  public function RandomSolve()
  {
    $this->Boot((int)$this->session->get('dictionary'));
    $gameLen = count($this->wordsRemaining);
    $pick = array_rand($this->wordsRemaining);
    $randomWord = $this->wordsRemaining[$pick][0];
    return $randomWord;
  }

  public function Solve()
  {
    $this->Boot((int)$this->session->get('dictionary'));

    $solveAttempt = (string)$this->request->getVar('solveAttempt');
    
    $arraySingle = call_user_func_array('array_merge', $this->wordsRemaining);

    $checkExists = in_array($solveAttempt, $arraySingle);
    
    if(!$checkExists)
    {
      return "-1";
    } 
    
    $guessList = array();
    $guessCount = 1;
    $this->wordsRemaining = $this->ScoreArray($this->wordsRemaining);
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    $wRLen = count($this->wordsRemaining);
    
    if($wRLen > 0)
    {
      while($guessCount <= 6)
      {
        $hasWon = 0;
        $wRLen = count($this->wordsRemaining);
        if($wRLen > 0)
        {
          $guess = $this->wordsRemaining[0][0];
          array_push($guessList, $guess);
          $result = $this->Evaluate($guess, $solveAttempt);
          
          $rCount = count($result);
          
          for($r = 0; $r < $rCount; $r++)
          {
            if($result[$r] == 2) $hasWon++;
          }
          
          if($hasWon >= 5)
          {
            break;
          }

          $output = $this->FilterList($this->wordsRemaining, $solveAttempt, $guessList);
          
          $this->wordsRemaining = $this->ScoreArray($output);
          usort($this->wordsRemaining, function($a, $b) {
            if ($a[1] == $b[1]) return 0;
            return $a[1] < $b[1] ? 1 : -1;
          });
        }
        $guessCount++;
        if($hasWon >= 5)
        {
          break;
        }
      }
    }
    $wRLen = count($this->wordsRemaining);
    $guessListCount = count($guessList);
    if($wRLen > 0 && $guessListCount > 0)
    {
      if($this->wordsRemaining[0][0] == $guessList[$guessListCount - 1])
      {
        $this->wordsRemaining[0] = null;
        $this->wordsRemaining = array_filter($this->wordsRemaining);
        $this->wordsRemaining = array_values($this->wordsRemaining);
      }
    }
    
    $this->wordsRemaining = $this->ScoreArray($this->wordsRemaining);
    usort($this->wordsRemaining, function($a, $b) {
      if ($a[1] == $b[1]) return 0;
      return $a[1] < $b[1] ? 1 : -1;
    });
    
    $guessResultArray = array();
    $gCount = count($guessList);
    for($g = 0; $g < $gCount; $g++)
    {
      $r = $this->Evaluate($guessList[$g], $solveAttempt);
      array_push($guessResultArray, $r);
    }
    
    $finalOutput = array();

    array_push($finalOutput, $guessList);
    array_push($finalOutput, $this->wordsRemaining);
    array_push($finalOutput, $guessResultArray);
    
    return json_encode($finalOutput, JSON_UNESCAPED_UNICODE);
  }
}