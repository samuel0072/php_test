<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();



$q = (empty($_GET['q'])) ? '' : $_GET['q'];
$page = (empty($_GET['page'])) ? 1 : $_GET['page'];
$url = "https://api.github.com/search/users?q=" . $q . "&page=" . $page;


$response = $client->request('GET', $url);
echo $response->getBody();

?>