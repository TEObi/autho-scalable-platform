<?php

    // echo '==zzform= ';die;
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit();
    }

    $ch = curl_init("http://localhost:3000/fetchbkgs");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;

    $user = $_POST["name"];
    echo ("Hello from server: $user");
?>

