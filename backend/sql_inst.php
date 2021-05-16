<?php

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

//CREATE TABLE
function create_table(){
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
  echo "Table users created successfully";
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