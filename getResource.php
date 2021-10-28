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

    try {
    
        $response = $client->request('GET', $resrcUrl);
        $message = ["status" => "success", "data" => json_decode($response->getBody())];
        echo json_encode($message);
    }
    catch (Exception $e) {
        $message = ["status" => "error", "data" => $e->getMessage()];
        echo json_encode($message);
    }
}
?>