<?php

if (isset($_GET['count'])) {

    $count = $_GET['count'];

    require('connect.php');

    $sql = ('SELECT * FROM tasks ORDER BY id ASC LIMIT :count');
    $stmt = $DBH->prepare($sql);
    $stmt->bindParam(':count', $count, PDO::PARAM_INT);
    $stmt->execute();

    $result = '{
                    "tasks": [';

    while ($row = $stmt->fetch(PDO::FETCH_LAZY)) {
        $task = '
                    {
                        "id": "'. $row['id'] .'",
                        "name": "'. $row['name'] .'",
                        "task": [' . $row['task'] . '],
                        "width": "' . $row['width'] . '",
                        "height": "' . $row['height'] . '",
                        "image_preview": "' . $row['image_preview'] . '",
                        "image_solved": "' . $row['image_solved'] . '"
                    },';

        $result .= $task;
    }

    $result = substr($result, 0, -1);
    $result .= '],';
    $result .= '"success": "true"';
    $result .= '}';

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');

    echo $result;

    require('disconnect.php');

} else {

    $json = '
                {   
                    "success": "false"
                }
            ';

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');
  
    echo $json;
}

exit();