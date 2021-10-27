<?php
header('Content-Type', 'text/html');

require_once 'utils/html_render.php';

$renderer = new HTMLRender('public/html/index.html');
$renderer->render();

?>