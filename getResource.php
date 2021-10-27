<?php
header('Content-Type', 'application/json');

require_once 'vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client();

if (empty($_GET['resrc_url'])) {
    echo "[]";
}
else {
    $resrcUrl = (empty($_GET['resrc_url'])) ? '' : $_GET['resrc_url'];

    $response = $client->request('GET', $resrcUrl);
    echo $response->getBody();
}
?>