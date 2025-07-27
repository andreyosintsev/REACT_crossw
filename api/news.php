<?php

// $task = $_GET['task'];
// if ($task) {

//   require('connect.php');

//   $sql = $DBH->prepare('SELECT task FROM tasks where id = :task');
//   $sql->execute(['task' => $task]);
//   $row = $sql->fetch(PDO::FETCH_LAZY);

//   $json = $row['task'];

//   header('Access-Control-Allow-Origin: *');
//   header('Content-Type: application/json');
//   echo $json;

//   require('disconnect.php');

// }

$json = '
    {
        "news": [
            {
                "date": "21.03.2024",
                "text": "Продолжилась разработка главной страницы сайта"    
            },
            {
                "date": "12.02.2024",
                "text": "Началась разработка дизайна страницы сайта"    
            }
        ],
        "success": true
    }
';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo $json;


exit();