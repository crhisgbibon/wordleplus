<?php

namespace App\Models;

use CodeIgniter\Model;

class WordlePlusFragmentsModel extends Model
{
  public $fragment;
  public $total;
  
  function __construct($fragment, $total) {
    $this->fragment = $fragment;
    $this->total = $total;
  }
  public function get_fragment() {
    return $this->fragment;
  }
  public function get_total() {
    return $this->total;
  }
  public function increment_total() {
    return $this->total++;
  }
}