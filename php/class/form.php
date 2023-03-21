<?php
class Formulaire
{
    // Propriétés
    protected $nb; // Numéro de l'exercice (number)
    protected $method; // Méthode du formulaire : GET ou POST (string)
    protected $variables; // Noms des variables attendues en théorie (array)

    // Constructeur
    function __construct($nb, $method, $variables)
    {
        $this->nb = $nb;
        $this->method = $method;
        $this->variables = $variables;
    }

    // Méthodes
    // Récupération du numéro de l'exo
    public function getNb()
    {
        return $this->nb;
    }

    // Récupération de la méthode du formulaire
    public function getMethod()
    {
        return $this->method;
    }

    // Récupéation des varaibles théoriquement récupérées (tableau)
    public function getVariables()
    {
        return $this->variables;
    }

    // Test des entrées avec les arguments suivants :
    // - numéro de l'exo
    // - méthode du formaulaire (GET, POST)
    // - noms et sens des variables vérifiées (tableau ou objet)
    public function test()
    {
        // Méthode
        if ($this->method === 'get') {
            $form = $_GET;
        } else if ($this->method === 'post') {
            $form = $_POST;
            // ATTENTION il faut prévoir le cas POST avec $_FILES !
            // - Vérifier la présence de MAX_FILE_SIZE en POST (OK)
            // - Vérifier la présence et la contenu de $_FILES

            // Cas d'un seul fichier uploadé et d'un seul champ pour déposer un fichier
            if (count($_FILES) !== 0) {
                // Si plusieurs fichiers, au lieu de contenir un string, les éléments de $_FILES contiennent un tableau

                // Ajout du champ produit en récupérant le nom de variable (ne fonctionne que pour 1 champ)
                $form[array_keys($_FILES)[0]] = $_FILES[array_keys($_FILES)[0]];
                // Ajout du contrôle MAX_FILE_SIZE à contrôler
                array_push($this->variables, "MAX_FILE_SIZE");
            } 
        }

        // Initialisation du calcul de la note et du texte affiché
        $t = 0;
        $n = 0;
        $champs = '';

        // Parcours des variables devant être présentes
        foreach ($this->variables as $variable) {

            // Variable de validation
            $bool = false;

            // Comparaison avec ce qui vient du formulaire
            foreach ($form as $input => $valeur) {
                if ($input === $variable) {
                    // Succès
                    $bool = true;
                    $n += 1;

                    $type = gettype($valeur);

                    switch ($type) {
                        case "string":
                            // Variable de type chaine
                            if (strlen($valeur) === 0) {
                                // Si la chaine est vide
                                $txtinput = '<p><span class="check">&check;</span> La valeur saisie dans le champ <strong>"' . $input . '"</strong> est <em>vide</em>.</p>';
                            } else {
                                // Si la chaine comporte au moins 1 caractère
                                $txtinput = '<p><span class="check">&check;</span> La valeur saisie dans le champ <strong>"' . $input . '"</strong> vaut <em>' . $valeur . '</em>.</p>';
                            }
                            break;
                        case "array":
                            // Variable de type tableau
                            
                            if (count($valeur) === 1) {
                                // Si il y a un élément
                                $txtinput = '<p><span class="check">&check;</span> La valeur saisie dans le champ <strong>"' . $input . '"</strong> vaut <em>' . $valeur[0] . '</em>.</p>';
                            } else if (array_keys($valeur) === array ("name", "full_path", "type", "tmp_name", "error", "size")) {
                                // C'est une image
                                $txtinput = '<p><span class="check">&check;</span> L\'image déposée dans le champ <strong>"' . $input . '"</strong> a les caratéristiques suivantes : <em>' . $valeur["name"] . ', type ' . $valeur["type"] . ', poids ' . $valeur["size"] . ' octets</em>.</p>';
                            } else {
                                // Si il y en a plusieurs
                                $txtinput = '<p><span class="check">&check;</span> Les valeurs saisies dans le champ <strong>"' . $input . '"</strong> valent <em>' . implode(", ", $valeur) . '</em>.</p>';
                            }
                            break;
                    }
                }
            }

            if ($bool === true) {
                $champs = $champs . $txtinput;
            } else if ($bool === false) {
                // Echec
                $champs = $champs . '<p><span class="cross">&#10007;</span> Impossible de récupérer la saisie du champ <strong>"' . $variable . '"</strong>.</p>';
            }

            $t += 1;
        }

        $val = 100 * $n / $t;
        $aff = round($val, 2);

        $progres = '<p>Réussite : <progress max="100" value="' . $aff . '"> ' . $aff . '% </progress> ' . $aff . '%</p>';

        // Création de la conclusion
        if ($val === 0) {
            $result = '<p class="error"><strong>Désolé, votre code ne fonctionne pas...</strong></p>';
        } else if ($val === 100) {
            $result = '<p class="success"><strong>Bravo, vous pouvez passez à l\'exercice suivant !</strong></p>';
        } else {
            $result = '<p class="part"><strong>Oups, votre code ne fonctionne pas entièrement...</strong></p>';
        }

        // Chaine
        $text = '<h2>Exercice ' . $this->nb . '</h2>' . $progres . $champs . $result;

        return $text;
    }
}
