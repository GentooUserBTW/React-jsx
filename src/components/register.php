<?php

header("Access-Control-Allow-origin *");
header("Content-type: application/json; charset=UTF-8");

if($_server["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;

    $response = [
        "status => success",
        "message" => "Hello" . $name . "from PHP"
    ];
    echo json_encode($response);
}
    
    else
    {
        echo json_encode(["status" => "false", "message" => "error occurred"]);
    }

?>