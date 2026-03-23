<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['score'])) {
    echo json_encode(["message" => "Invalid data."]);
    exit;
}

$file = 'scores.json';

if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}

$scores = json_decode(file_get_contents($file), true);

$scores[] = [
    "name" => htmlspecialchars($data['name']),
    "score" => (int)$data['score'],
    "time" => date("Y-m-d H:i:s")
];

file_put_contents($file, json_encode($scores, JSON_PRETTY_PRINT));

echo json_encode(["message" => "Score saved successfully!"]);
?>