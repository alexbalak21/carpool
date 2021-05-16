<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
require_once 'model.php';
require_once 'controller.php';
require_once 'trips.php';
global $curentFolder;
$curentFolder = '/carpool/backend/';

router();

function urlFormat($folder)
{
    $request = $_SERVER["REQUEST_URI"];
    $request = str_replace($folder, '', $request);
    return $request;
}

function router()
{
    global $curentFolder;
    //GET - HOMEPAGE
    $method = $_SERVER["REQUEST_METHOD"];
    $request = urlFormat($curentFolder);
    if ($method == 'GET' && $request == '') {
        echo 'HOME<br><br>';
    }

    if ($method == 'GET' && $request == "users/") {
        echo getAll("users");
    }

    if ($method == 'GET' && $request == 'trips/') {
        echo getAll('trips');
    }

    //POST - USER
    if ($method == "POST" && $request == 'newuser/') {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        if (json_last_error() == JSON_ERROR_NONE) {
            $id = regUser($data['email'], $data['firstname'], $data['lastname'], $data['password'], $data['phone']);
        } else {
            echo "request error";
        }
        echo $id;
    }

    // POST - TRIP
    if ($method == "POST" && $request == 'newtrip/') {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        if (json_last_error() == JSON_ERROR_NONE) {
            $done = regTrip($data['driver_id'], $data['departure_time'], $data['departure'], $data['arrival'], $data['avalable_places'], $data['price_per_passanger']);
        } else {
            echo "request error";
        }

        if ($done) {
            echo $body;
        } else {
            echo "ERROR";
        }

    }

    //LOGIN
    if ($request == 'login/' && $method == 'POST') {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        echo login($data['email'], $data['password']);
    }

    //GET ON A TRIP
    if ($request == 'getontrip/' && $method == 'POST'){
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        if (json_last_error() == JSON_ERROR_NONE) {
            $tripID = $data['tripID'];
            $userID = $data['userID'];
            $result = gtOnATrip($tripID, $userID);
        } else {
            echo "request error";
        }
        echo $result;
    }

        //GET OFF A TRIP
        if ($request == 'getofftrip/' && $method == 'POST'){
            $body = file_get_contents('php://input');
            $data = json_decode($body, true);
            if (json_last_error() == JSON_ERROR_NONE) {
                $tripID = $data['tripID'];
                $userID = $data['userID'];
                $result = getOffTrip($tripID, $userID);
            } else {
                echo "request error";
            }
            echo $result;
        }



    //GET1 / PUT / DELETE - user:nbr
    $nbr = str_replace('users/', '', $request);
    if ((int)$nbr > 0) {
        $id = (int)$nbr;
        //GET 1
        if ($method == 'GET') {
            echo get1('users', $id);
        }

        //UPDATE
        if ($method == 'PUT') {
            $body = file_get_contents('php://input');
            $data = json_decode($body, true);
            if (json_last_error() == JSON_ERROR_NONE) {
                $done = update($id, $data['email'], $data['firstname'], $data['lastname'], $data['password'], $data['phone']);
            } else {
                echo "request error";
            }

            if ($done) {
                echo "UPDATED";
            }

        }
        if ($method == 'DELETE') {
            $result = delete1('users', $id);
        }

    }
}
