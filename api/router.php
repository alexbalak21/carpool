<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once('model.php');
require_once('controller.php');
require_once('trips.php');
global $curentFolder;
$curentFolder = '/api/';

router();

function urlFormat($folder){
    $request = $_SERVER["REQUEST_URI"];
    $request = str_replace($folder, '', $request);
    return $request;
}

function router(){
    //GET - HOMEPAGE
    $method = $_SERVER["REQUEST_METHOD"];
    $request = urlFormat('/api/');
    $method = $_SERVER["REQUEST_METHOD"];
    if ($method == 'GET' && $request =='')
    echo 'HOME';
    //GET
    if($method == 'GET' && $request == 'users/')
    echo getAll("users");


    if($method == 'GET' && $request == 'trips/')
    create_trips();


    //POST
    if($method == "POST" && $request == 'newuser/'){
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);
    if (json_last_error() == JSON_ERROR_NONE){
    $done = post($data['email'], $data['firstname'], $data['lastname'], $data['password'], $data['phone']);
    }
    else
    echo "request error";
    if ($done)
    echo json_encode($body);
    else
    echo "ERROR";
    }

    //LOGIN
    if($request =='login/' && $method == 'POST'){
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);
    echo login($data['email'], $data['password']);
    }

    //GET1 / PUT / DELETE - user:nbr
    $nbr = str_replace('users/','', $request);
    if ((int)$nbr > 0){
    $id = (int)$nbr;
    //GET 1
    if($method == 'GET')
    echo get1('users', $id);

    //UPDATE
    if($method == 'PUT'){
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        if (json_last_error() == JSON_ERROR_NONE){
        $done = update($id, $data['email'], $data['firstname'], $data['lastname'], $data['password'], $data['phone']);
        }
        else
        echo "request error";
        if ($done)
        echo "UPDATED";
        }
        if($method == 'DELETE')
        $result = delete1('users', $id);
}
}


?>