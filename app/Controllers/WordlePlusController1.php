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
    $this->qwerty = array();
    $this->alphabet = array();
    
    $this->w1 = array();
    $this->w2 = array();
    $this->w3 = array();
    $this->w4 = array();
    $this->w5 = array();
    $this->w6 = array();
    $this->w7 = array();
    $this->w8 = array();
    $this->w9 = array();
    
    $this->wordsRemaining = array();

    $this->Start();
  }

  private function Boot(int $dictionary)
  {
    $this->wordsRemaining = array();
    if($dictionary === 1) {
      $this->wordsRemaining = $this->w1;
    }
    if($dictionary === 2) {
      $this->wordsRemaining = $this->w2;
    }
    if($dictionary === 3) {
      $this->wordsRemaining = $this->w3;
    }
    if($dictionary === 4) {
      $this->wordsRemaining = $this->w4;
    }
    if($dictionary === 5) {
      $this->wordsRemaining = $this->w5;
    }
    if($dictionary === 6) {
      $this->wordsRemaining = $this->w6;
    }
    if($dictionary === 7) {
      $this->wordsRemaining = $this->w7;
    }
    if($dictionary === 8) {
      $this->wordsRemaining = $this->w8;
    }
    if($dictionary === 9) {
      $this->wordsRemaining = $this->w9;
    }
  }

  private function Start()
  {
    $file1 = WRITEPATH . 'words/1000F.txt';
    $file2 = WRITEPATH . 'words/10000F.txt';
    $file3 = WRITEPATH . 'words/20000F.txt';

    $file4 = WRITEPATH . 'words/english1F.txt';
    $file5 = WRITEPATH . 'words/english2F.txt';
    $file6 = WRITEPATH . 'words/wordsF.txt';

    $file7 = WRITEPATH . 'words/allwordsF.txt';
    $file8 = WRITEPATH . 'words/wordleListF.txt';
    $file9 = WRITEPATH . 'words/wordleList2F.txt';

    $this->w1 = $this->ConvertRankedFileToArray(file_get_contents($file1));
    $this->w2 = $this->ConvertRankedFileToArray(file_get_contents($file2));
    $this->w3 = $this->ConvertRankedFileToArray(file_get_contents($file3));

    $this->w4 = $this->ConvertRankedFileToArray(file_get_contents($file4));
    $this->w5 = $this->ConvertRankedFileToArray(file_get_contents($file5));
    $this->w6 = $this->ConvertRankedFileToArray(file_get_contents($file6));

    $this->w7 = $this->ConvertRankedFileToArray(file_get_contents($file7));
    $this->w8 = $this->ConvertRankedFileToArray(file_get_contents($file8));
    $this->w9 = $this->ConvertRankedFileToArray(file_get_contents($file9));
    
    $this->qwerty = array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                          "A", "S", "D", "F", "G", "H", "J", "K", "L", "?",
                          "Z", "X", "C", "V", "B", "N", "M", "-", ">", "<");
        
    $this->alphabet = array("Q","W","E","R","T","Y","U","I","O","P",
                            "A","S","D","F","G","H","J","K","L",
                            "Z","X","C","V","B","N","M");
  
    // $this->wordsRemaining = $this->w3;
  }

  function ConvertRankedFileToArray($file)
  {
    $one = explode("\n",$file);
    $w1 = array();
    foreach ($one as $item){
        $w1[] = explode(",",$item);
    }
    return $w1;
  }

  // PROCESS

  public function index()
  {
    return view('templates/header1')
            . view('new/controls')


            . view('new/play')
            . view('new/clue')
            . view('new/name')
            . view('new/chart')
            . view('new/leaderboard')
            . view('new/solve')
            . view('new/dictionary')
            . view('new/info')
            . view('new/guess')
            . view('new/list')



            . view('new/keyboard')

            . view('templates/footer1');
  }
}