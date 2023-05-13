<?php

namespace App\Models;

use CodeIgniter\Model;

class WordlePlusModel extends Model
{
  protected $table = 'log';

  public function GetWord($slug = false)
  {
    $db = \Config\Database::connect();

    date_default_timezone_set('UTC');
    $today = date("Y-m-d");

    $query = $db->table('log');
    $query->select('word');
    $query->where('date =', $today);
    $query->orderBy('word', 'asc');
    return $query->get()->getResult();
  }

  public function DeleteWord($slug = false)
  {
    $db = \Config\Database::connect();
    $db->table('log')->where('word', $result[$i])->delete();
  }

  public function InsertWord($word, $slug = false)
  {
    $db = \Config\Database::connect();

    date_default_timezone_set('UTC');
    $today = date("Y-m-d");

    $data = [
      'date' => $today,
      'word' => $word,
    ];
    
    $db->table('log')->insert($data);
  }
}