<?php
$file = $_POST['filename'] . '.json';
$data = $_POST['filedata'];
file_put_contents($file, $data);

header('Content-Type: application/json');
echo json_encode(['status' => 'ok']);
?>
