<?php
$host = "speffs.one.mysql";
$dbname = "speffs_one";
$username = "speffs_one";
$password = "soapopera";

// make a connection
$result = null;
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password); 
   
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//	$conn->(PDO::ATTR_EMULATE_PREPARES, false);
		
 $sql = 'SELECT * FROM Posts WHERE itemId=1';

 $stmt = $conn->query($sql);

 $bool = $stmt->setFetchMode(PDO::FETCH_ASSOC);
 
 $result = $stmt->fetchAll(); 

} catch (PDOException $pe) {
    die("Could not connect to the database $dbname :" . $pe->getMessage());
	
}

$json =  json_encode($result);
echo $json; 

//var_dump($result);

/*$jsontest = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
$test = json_encode($jsontest);

echo $test; */
 
?>