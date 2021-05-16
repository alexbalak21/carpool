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

function gtOnATrip($tripID, $passengerID)
{
    db_connect();
    global $pdo;
    $sql = "SELECT * FROM trips WHERE id=$tripID";
    $stmt->execute($sql);
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $trip = $stmt->fetch();
    var_dump($trip);
    $driver_id = $trip['driver_id'];
    return $driver_id;
}

echo gtOnATrip(26, 25);

//     $stmt = $pdo ->prepare("UPDATE `trips` SET `passanger_1_id` = '5' WHERE `trips`.`id` = 25");
//     $stmt = $pdo->prepare("INSERT INTO Users (email, firstname, lastname, password, phone, reg_date)
//   VALUES (:email, :firstname, :lastname, :password, :phone, NOW())");
//     $stmt->bindParam(':email', $email);
//     $stmt->bindParam(':firstname', $firstname);
//     $stmt->bindParam(':lastname', $lastname);
//     $stmt->bindParam(':password', $password);
//     $stmt->bindParam(':phone', $phone);
//     $done = $stmt->execute();
//     $last_id = $pdo->lastInsertId();
//     if ($done) {
//         return $last_id;
//     } else {
//         return "ERROR";
//     }
// }
