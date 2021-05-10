<?php

global $pdo;

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

// CREATE - POST
function post($email, $firstname, $lastname, $password, $phone){
    db_connect();
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO Users (email, firstname, lastname, password, phone,  reg_date) VALUES (:email, :firstname, :lastname, :password, :phone, NOW())");
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':firstname', $firstname);
    $stmt->bindParam(':lastname', $lastname);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':phone', $phone);
    $done = $stmt->execute();
    $pdo=null;
    return $done;
}

// READ ALL - GET ALL
function getAll($table='users'){
db_connect();
global $pdo;
$sql = sprintf("SELECT * FROM %s", $table);
$stmt = $pdo->prepare($sql);
$stmt->execute();
$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
$data = $stmt->fetchAll();
$dpo = null;
return json_encode($data);
}

// READ ONE - GET ONE
function get1($table, $id){
  db_connect();
  global $pdo;
  $stmt = $pdo->prepare("SELECT * FROM $table WHERE id=:id");
  $stmt->bindValue(':id', $id, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  $data = $stmt->fetch();
  $pdo = null;
  return json_encode($data);
}

//GET BY MAIL
function getByMail($table, $email){
  db_connect();
  global $pdo;
  $stmt = $pdo->prepare("SELECT * FROM users WHERE email=:email");
  $stmt->bindValue(':email', $email, PDO::PARAM_STR);
  $stmt->execute();
  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  $data = $stmt->fetch();
  $pdo = null;
  if (!$data)
  return $data;
}

//DELETE
function delete1($table, $id){
  db_connect();
  global $pdo;
  $stmt = $pdo->prepare("DELETE FROM $table WHERE id=:id");
  $stmt->bindValue(':id', $id, PDO::PARAM_INT);
  $stmt->execute();
  $pdo = null;
  return 'DELETED';
}


// GET BY FIRST NAME
function getName($table, $name){
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
function update($id, $email, $firstname, $lastname, $password, $phone){
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
    $stmt->bindParam(':id', $id,  PDO::PARAM_INT);
    $done = $stmt->execute();
    $pdo=null;
    return $done;
}

?>