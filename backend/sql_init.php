<?php

global $pdo ;
$pdo = NULL;

// CONNECT TO MySQL and DATABASE
function db_connect(){
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
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
}

create_table_trips();
create_table_users();

//CREATE TABLE TRIPS
function create_table_trips(){
  db_connect();
  global $pdo;
  $sql = "CREATE TABLE `trips` (
    `id` int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `driver_id` int(11) NOT NULL,
    `departure` varchar(50) NOT NULL,
    `arrival` varchar(50) NOT NULL,
    `price_per_passanger` int(11) DEFAULT NULL,
    `avalable_places` int(11) NOT NULL,
    `passanger_1_id` int(11) DEFAULT NULL,
    `passanger_2_id` int(11) DEFAULT NULL,
    `passanger_3_id` int(11) DEFAULT NULL,
    `passanger_4_id` int(11) DEFAULT NULL,
    `passanger_5_id` int(11) DEFAULT NULL,
    `departure_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `reg_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
      $pdo->exec($sql);
      echo "TABLE TRIPS CREATED SUCCESSFULLY";
      $pdo = NULL;
}


//CREATE TABLE USERS
function create_table_users(){
  db_connect();
  global $pdo;
  $sql = "CREATE TABLE users (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL UNIQUE,
  img VARCHAR(255) NOT NULL DEFAULT 'profile.png',
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )";
  $pdo->exec($sql);
  echo "TABLE USERS CREATED SUCCESSFULLY";
  $pdo = NULL;
}

//MySQL CONNECT
function sql_connect(){
    global $conn;
    $servername = "localhost";
    $username = "admin";
    $password = "root";

try {
  $conn = new PDO("mysql:host=$servername", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "MySQL connection SUCCESFUL<br>";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
}
//CREATE DB
function db_create($dbname = 'testdb'){
    sql_connect();
    global $conn;
    $stmt = $conn->prepare("CREATE DATABASE $dbname");
    $stmt->execute();
    $conn=null;
    echo "DATABASE CREATED";
}




?>