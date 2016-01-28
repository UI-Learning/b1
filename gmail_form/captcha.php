<?php
session_start();
include("captcha.php");
$_SESSION['captcha'] = captcha();
echo '<img src="' . $_SESSION['captcha']['image_src'] . '" alt="CAPTCHA" />';
?>