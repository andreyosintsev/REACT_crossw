<?php

require_once('config.php');

try {  
  # MySQL через PDO_MYSQL  
  $DBH = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4", DB_USER, DB_PASS);
}
catch(PDOException $e) {  
    echo $e->getMessage();  
}

$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );