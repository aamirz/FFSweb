<?php
	
class GoogleAuth {
	protected $client;
	
	public function _construct(Google_Client $googleClient = null) {
		
		$this->client = $googleClient;

		if($this->client) {
			$this->client->setClientId('721551132056-ovgvr2aavb52qqsqiqsud6jo6082nltq.apps.googleusercontent.com');
			$this->client->setClientSecret('F35m3YgqMTghS1XnaQHh__T7');
			$this->client->setRedirectUri('https://localhost:8888/Done/index.php');
			$this->client->setScopes('email');	
		
		}
		
	}
	
	public function isLoggedIn() {
		return isset($_SESSION['access_token']);
	}
	
	public function getAuthUrl() {
		//return "felix";
		return $this->client->createAuthUrl();
	}
		
}
?>