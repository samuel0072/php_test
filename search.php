<?php
require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();



$q = (empty($_GET['q'])) ? '' : $_GET['q'];
$page = (empty($_GET['page'])) ? 1 : $_GET['page'];
$url = "https://api.github.com/search/users?q=" . $q . "&page=" . $page;


try {
    
    $response = $client->request('GET', $url);
    $message = ["status" => "success", "data" => json_decode($response->getBody())];
    echo json_encode($message);
}
catch (Exception $e) {
    $message = ["status" => "error", "data" => $e->getMessage()];
    echo json_encode($message);
}

?>