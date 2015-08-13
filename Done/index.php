<?php

require_once 'vendor/autoload.php';

//require_once 'init.php';	
session_start();

//$googleClient = new Google_Client();
//$auth = new GoogleAuth($googleClient);

$google_redirect_url = 'https://localhost/~felixmadutsa/Done/index.php';

$username = "speffs_one"; //Database Username
$password = "soapopera"; //Database Password
$host = "speffs.one.mysql"; //Mysql Hostname
$dbname = "speffs_one"; //Database Name

$gClient = new Google_Client();
$gClient->setClientId('721551132056-ovgvr2aavb52qqsqiqsud6jo6082nltq.apps.googleusercontent.com');
$gClient->setClientSecret('F35m3YgqMTghS1XnaQHh__T7');
$gClient->setRedirectUri('https://localhost/~felixmadutsa/Done/index.php');
$gClient->setScopes('email');	

//echo $gclient->createAuthUrl();

if (isset($_GET['code'])) { 
	$gClient->authenticate($_GET['code']);
	$_SESSION['token'] = $gClient->getAccessToken();
	header('Location: ' . filter_var($google_redirect_url, FILTER_SANITIZE_URL));
	return;
}

if (isset($_SESSION['token'])) { 
	$gClient->setAccessToken($_SESSION['token']);
}

if ($gClient->getAccessToken()) 
{
	  //For logged in user, get details from google using access token
	  $user 				= $google_oauthV2->userinfo->get();
	  $user_id 				= $user['id'];
	  $user_name 			= filter_var($user['name'], FILTER_SANITIZE_SPECIAL_CHARS);
	  $email 				= filter_var($user['email'], FILTER_SANITIZE_EMAIL);
	  $profile_url 			= filter_var($user['link'], FILTER_VALIDATE_URL);
	  $profile_image_url 	= filter_var($user['picture'], FILTER_VALIDATE_URL);
	  $personMarkup 		= "$email<div><img src='$profile_image_url?sz=50'></div>";
	  $_SESSION['token'] 	= $gClient->getAccessToken();
}
else 
{
	//For Guest user, get google login url
	$authUrl = $gClient->createAuthUrl();
}

//echo $gClient->createAuthUrl();

?>

<!doctype html>
<html> 
<head> 
	<meta charset = 'utf-8'>
	<link rel="stylesheet" href="style.css" />
	<title>Login</title>
</head>
	<div class="lg-container">
		<h1>Welcome To Princeton's Free And For Sale</h1>
		<form id="lg-form" name="lg-form">
			
			<div>
				<center><img src="login2.png" style="width:50px;height:50px;"></center>
			</div>
			<div>		
				<center>
					<h6>Signin With Gmail:</h6>
					<?php //user is not logged in, show login button
					if(isset($authUrl)) {
						echo '<a class="login" href="'.$authUrl.'"><img src="signinbutton.png"  style="width:100px;height:100px;"/></a>';
					} 
					
					// user logged in
					else {
						$mysqli = new mysqli($host, $username, $password, $dbname);
						
						if ($mysqli->connect_error) {
							die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
						}
						//compare user id in our database
						$user_exist = $mysqli->query("SELECT COUNT(googleId) as usercount FROM Users
							WHERE googleId=$user_id")->fetch_object()->usercount; 
								
								if($user_exist) {
									echo 'Welcome back '.$user_name.'!';
								} 
								else { //user is new
									
									echo 'Hi '.$user_name.', Thanks for Registering!';
									
									$location = 'Princeton';
									
									$mysqli->query("INSERT INTO Users (googleId, googleName,googleEmail,location) 
									VALUES ($user_id,'$user_name','$email','$location')");
									}

	
	echo '<br /><a href="'.$profile_url.'" target="_blank"><img src="'.$profile_image_url.'?sz=100" /></a>';
	echo '<br /><a class="logout" href="?reset=1">Logout</a>';
	
	//list all user details
	echo '<pre>'; 
	print_r($user);
	echo '</pre>';	
}

					?>	
				</center>
			</div>
			
		</form>
		<div id="message"></div>
	</div>
	
	<center>Princeton's Free and For Sale is here to make it easy for Tigers to trade</center>
	
</body>
</html>