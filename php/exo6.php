<?php
require './class/form.php';

$varexo = array("login", "mdp", "nom", "prenom", "dateNaissance", "sexe", "numero", "typeVoie", "nomVoie", "codePostal", "ville", "pays", "email", "tel", "url", "loisirs", "avatar", "message", "couleur", "taillePolice");

$exo = new Formulaire(6, 'post', $varexo);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire</title>
    <link rel="stylesheet" href="../style/exo.css">
    <script src="../script/script.js" defer></script>
</head>

<body>
    <h1>Formulaire</h1>

    <section>
        <?= $exo->test() ?>
    </section>
</body>

</html>