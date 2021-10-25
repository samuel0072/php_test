<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();



$q = (empty($_GET['q'])) ? '' : $_GET['q'];
$url = "https://api.github.com/search/users?q=" . $q;


$response = $client->request('GET', $url);
echo $response->getBody();

?>