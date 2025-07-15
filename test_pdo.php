<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=idv", "weslley", "kuo8jli79");
    echo "✅ Conexão PDO funcionando!";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}