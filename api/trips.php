<?php 

global $pdo;

// CONNECT TO MySQL and DATABASE
function db_conn(){
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

function create_trips(){
  db_conn();
  global $pdo;
  $sql = "CREATE TABLE trips (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  driver_id INT NOT NULL ,
  departure_time TIMESTAMP NOT NULL,
  departure VARCHAR(50) NOT NULL,
  arrival VARCHAR(50) NOT NULL,
  avalable_places INT NOT NULL,
  price_per_passanger INT,
  passanger_1_id INT DEFAULT NULL,
  passanger_2_id INT DEFAULT NULL,
  passanger_3_id INT DEFAULT NULL,
  passanger_4_id INT DEFAULT NULL,
  passanger_5_id INT DEFAULT NULL,
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )";
  $pdo->exec($sql);
  echo "Table trips created successfully";
}


?>