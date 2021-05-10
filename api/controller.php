<?php 
require_once("model.php");

function login($email, $password){
    $match = getByMail('users', $email);
    if (!$match)
    return 'USERNOTFOUND';  
    //CHECK PASSWORD
    if($match['password'] == $password)
    return json_encode($match);
    else
    return "WRONGPASSWORD ";
}

?>