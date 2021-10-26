<?php
class HTMLRender {

    private $htmlFile;

    /**
     * param: $file_name
     * O contrutor ler o arquivo informado em $file_name em modo de texto
     * Se não for possível abrir o arquivo o serviço é abortado
     * Em seguida, armazena todo o conteúdo do arquivo na variável $html_file
     */
    function __construct($file_name) {
        $file = fopen($file_name, 'r') or die("Impossível abrir o recurso.");
        $len = filesize($file_name);

        $this->htmlFile = html_entity_decode(fread($file, $len));
        fclose($file);
    }

    /**
     * Renderiza o html informado no construtor
     */
    function render() {
        echo $this->htmlFile;
    }
}


$renderer = new HTMLRender('public/html/index.html');
$renderer->render();

?>