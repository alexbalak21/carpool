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
        $data = getAll('trips');
        foreach ($data as $key => $trip){
           $driverID = $data[$key]['driver_id'];
           $names = get1('users', $driverID, 'firstname, lastname');
           $fisrt = $names['firstname'];
           $last = $names['lastname'];
           $fullname = "$fisrt $last";
           $data[$key]['fullname'] = $fullname;
        }
        echo json_encode($data);
    }

    //CREATE - USER
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

      //UPDATE
      if ($method == 'POST' && $request=='updateuser/') {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        if (json_last_error() == JSON_ERROR_NONE) {
            $updatedID = updateUser($data['id'], $data['email'], $data['firstname'], $data['lastname'], $data['password'], $data['phone']);
        } else {
            echo "request error";
        }
        echo $updatedID;
    }

    // CREATE TRIP
    if ($method == "POST" && $request == 'newtrip/') {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        if (json_last_error() == JSON_ERROR_NONE) {
            $done = regTrip($data['driver_id'], $data['departure_time'], $data['departure'], $data['arrival'], $data['avalable_places'], $data['price_per_passanger']);
        } else {
            echo "request error";
        }
    return $done;
    }

        // UPDATE TRIP
        if ($method == "POST" && $request == 'updatetrip/') {
            $body = file_get_contents('php://input');
            $data = json_decode($body, true);
            if (json_last_error() == JSON_ERROR_NONE) {
                $id = updateTrip($data['tripID'], $data['departure_time'], $data['departure'], $data['arrival'], $data['avalable_places'], $data['price_per_passanger']);
            } else {
                echo "request error";
            }
        return $id;
        }

        if($method == "POST" && $request == 'deletetrip/'){
            $body = file_get_contents('php://input');
            $data = json_decode($body, true);
            if (json_last_error() == JSON_ERROR_NONE) {
                $id = deleteCheck($data['tripID'], $data['userID']);
            } else {
                echo "request error";
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
            $user = get1('users', $id);
            echo json_encode($user);
        }

        //DELETE USER.
        if ($method == 'POST' && $request=='deleteuser/') {
            $result = delete1('users', $id);
        }

    }
}
