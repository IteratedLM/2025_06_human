<?php
$data = $_POST['filedata'];
$file = $_POST['filename'] . '.txt' ;
file_put_contents("./".$file, $data,FILE_APPEND);
?>
