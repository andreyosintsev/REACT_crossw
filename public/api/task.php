<?php

if (isset($_GET['task'])) {
    $task = $_GET['task'];
 
    require('connect.php');

    $sql = $DBH->prepare('SELECT * FROM tasks WHERE id = :task');
    $sql->execute(['task' => $task]);
    $row = $sql->fetch(PDO::FETCH_LAZY);

    $json =   '
                {
                    "id": "'. $row['id'] .'",
                    "name": "'. $row['name'] .'",
                    "task": [' . $row['task'] . '],
                    "width": "' . $row['width'] . '",
                    "height": "' . $row['height'] . '",
                    "image_preview": "' . $row['image_preview'] . '",
                    "image_solved": "' . $row['image_solved'] . '",
                    "success": "true"
                }
            ';

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');
  
    echo $json;

    require('disconnect.php');

} else {
    
    $json =   '
                {   
                    "success": "false"
                }
            ';

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');;
  
    echo $json;
}

exit();