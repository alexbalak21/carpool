<?php
require_once "model.php";

function login($email, $password)
{
    $match = searchUser('users', $email);
    if (!$match) {
        return 'USER NOT FOUND';
    }

    //CHECK PASSWORD
    if ($match['password'] == $password) {
        unset($match['password']);
        return json_encode($match);
    } else {
        return "WRONG PASSWORD";
    }

}
