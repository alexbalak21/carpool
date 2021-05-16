<?php

global $pdo;

// CONNECT TO MySQL and DATABASE
function db_connect()
{
    global $pdo;
    $pdo = null;
    $servername = "localhost";
    $username = "admin";
    $password = "root";
    $db_name = "carpool";
    try {
        $pdo = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
}

// CREATE USER
function regUser($email, $firstname, $lastname, $password, $phone)
{
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO Users (email, firstname, lastname, password, phone, reg_date)
  VALUES (:email, :firstname, :lastname, :password, :phone, NOW())");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':firstname', $firstname);
    $stmt->bindParam(':lastname', $lastname);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':phone', $phone);
    $done = $stmt->execute();
    $last_id = $pdo->lastInsertId();
    if ($done) {
        return $last_id;
    } else {
        return "ERROR";
    }
}

//CREATE TRIP
function regTrip($driverId, $departureTime, $departure, $arrival, $avalablePlaces, $pricePerPass)
{
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO Trips (driver_id, departure_time, departure, arrival, avalable_places, price_per_passanger, reg_date)
  VALUES (:driver_id, :departure_time, :departure, :arrival, :avalable_places, :price_per_passanger, NOW())");
    $stmt->bindParam(':driver_id', $driverId, PDO::PARAM_INT);
    $stmt->bindParam(':departure_time', $departureTime);
    $stmt->bindParam(':departure', $departure);
    $stmt->bindParam(':arrival', $arrival);
    $stmt->bindParam(':avalable_places', $avalablePlaces, PDO::PARAM_INT);
    $stmt->bindParam(':price_per_passanger', $pricePerPass, PDO::PARAM_INT);
    $done = $stmt->execute();
    $pdo = null;
    return $done;
}


// READ ALL - GET ALL
function getAll($table = 'users')
{
    db_connect();
    global $pdo;
    $sql = sprintf("SELECT * FROM %s", $table);
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetchAll();
    $dpo = null;
    return $data;
}

// GET BY ID
function get1($table, $id, $col= '*')
{
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("SELECT $col FROM $table WHERE id=:id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetch();
    $pdo = null;
    return $data;
}

//GET BY MAIL
function searchUser($table, $email)
{
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email=:email");
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetch();
    $pdo = null;
    return $data;
}

//DELETE
function delete1($table, $id)
{
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM $table WHERE id=:id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $pdo = null;
    return 'DELETED';
}

// GET BY FIRST NAME
function getName($table, $name)
{
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM $table WHERE firstname=:firstname");
    $stmt->bindValue(":firstname", $name);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetchAll();
    return json_encode($data);
    $dpo = null;
}

//PUT - UPDATE
function update($id, $email, $firstname, $lastname, $password, $phone)
{
    db_connect();
    global $pdo;
    $sql = "UPDATE users SET
  email = :email,
  firstname = :firstname,
  lastname = :lastname,
  password = :password,
  phone = :phone
  WHERE id=:id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':firstname', $firstname);
    $stmt->bindParam(':lastname', $lastname);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $done = $stmt->execute();
    $pdo = null;
    return $done;
}


//-----------------------------------------------GET ON A TRIP
function gtOnATrip($tripID, $passengerID)
{
    db_connect();
    global $pdo;
    $sql = "SELECT * FROM trips WHERE id=$tripID";
    $stmt = $pdo->query($sql);
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $trip = $stmt->fetch();
    if ($trip['driver_id'] == $passengerID)
    return NULL;
    $avalablePlaces = $trip['avalable_places'];
    if ($avalablePlaces > 0) {
        for ($i = 1; $i <= 5; $i++) {
            $passenger = "passanger_" . $i . "_id";
            if ($trip[$passenger] == $passengerID)
            return NULL;
            if ($trip[$passenger] == null){
            $avalablePlaces--;
            $stmt = $pdo->exec("UPDATE `trips` SET `$passenger` = $passengerID, `avalable_places` = $avalablePlaces  WHERE `trips`.`id` = $tripID");
            break;
        }
        }
    }
    $pdo = NULL;
    return get1('trips', $tripID);
}


//-----------------------------------------------------------GET OFF A TRIP
function getOffTrip($tripID, $passengerID)
{
    db_connect();
    global $pdo;
    $sql = "SELECT * FROM trips WHERE id=$tripID";
    $stmt = $pdo->query($sql);
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $trip = $stmt->fetch();
    if ($trip['driver_id'] == $passengerID)
    return NULL;
    $avalablePlaces = $trip['avalable_places'];
    for ($i = 1; $i <= 5; $i++) {
        $passenger = "passanger_" . $i . "_id";
        if ($trip[$passenger] == $passengerID){
        $avalablePlaces++;
        $stmt = $pdo->exec("UPDATE `trips` SET `$passenger` = NULL , `avalable_places` = $avalablePlaces  WHERE `trips`.`id` = $tripID");
        break;
    }
    }
    $pdo = NULL;
    return get1('trips', $tripID);
}
