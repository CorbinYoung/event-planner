<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    if(!session_start()){
        echo "session";
        exit;
    }

    require_once "pdo.php";

    $username = empty($_POST['username']) ? '' : $_POST['username'];
    $fname = empty($_POST['fname']) ? '' : $_POST['fname'];
    $lname = empty($_POST['lname']) ? '' : $_POST['lname'];
    $password = empty($_POST['password']) ? '' : $_POST['password'];
    $password = hash('sha256', $password);
    $email = empty($_POST['email']) ? '' : $_POST['email'];

    $stmt = $pdo->prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
    $value = $stmt->execute([$fname, $lname, $username, $password, $email]);
    if ($value){
        $_SESSION['loggedin'] = $username;
        echo("success");
    } else {
        echo("failure");
        // print_r($stmt->errorInfo(), true);
    }
    $stmt = null;
    $pdo = null;
?>