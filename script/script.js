function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}


// Sélectionner le bouton pour activer/désactiver les champs de saisie
const btnActiver = document.querySelector('button[type=button]');

// Sélectionner tous les champs de saisie
const fieldset = document.querySelectorAll('fieldset');

// Désactiver les champs de saisie au chargement de la page
fieldset.forEach((fs) => {
    fs.setAttribute('disabled', 'disabled');
});

// Fonction pour activer/désactiver les champs de saisie
function activerDesactiver() {
    if (fieldset[0].hasAttribute('disabled')) {
        // Activer les champs de saisie s'ils sont désactivés
        fieldset.forEach((fs) => {
            fs.removeAttribute('disabled');
        });
    } else {
        // Désactiver les champs de saisie s'ils sont activés
        fieldset.forEach((fs) => {
            fs.setAttribute('disabled', 'disabled');
        });
    }
}

// Ajouter un gestionnaire d'événements pour le bouton d'activation/désactivation
btnActiver.addEventListener('click', activerDesactiver);

// Sélectionner le bouton pour montrer/cacher le mot de passe
const btnMontrerCacher = document.querySelector('fieldset > button[type=button]');

// Sélectionner le champ de saisie du mot de passe
const mdp = document.querySelector('input[name=mdp]');

// Fonction pour montrer/cacher le mot de passe
function montrerCacher() {
    if (mdp.getAttribute('type') === 'password') {
        // Rendre le texte du champ de saisie du mot de passe lisible
        mdp.setAttribute('type', 'text');
    } else {
        // Cacher le texte du champ de saisie du mot de passe
        mdp.setAttribute('type', 'password');
    }
}

// Ajouter un gestionnaire d'événements pour le bouton de montrer/cacher le mot de passe
btnMontrerCacher.addEventListener('click', montrerCacher);



//color picker//

// activer/desactiver

const inputColor = document.querySelector('input[name=couleur]');
const btnCroix = document.querySelector('.colorpicker>button');
const colorPicker = document.querySelector('.colorpicker');
const champs = document.querySelectorAll('input,form>button');

function open(e){
    e.preventDefault();
    console.log('click open');
    colorPicker.style.right='0';
    champs.forEach((el) => {
        el.setAttribute('disabled', 'disabled');
    })
}

inputColor.addEventListener('click', open);

function close(){
    console.log('click close');
    colorPicker.style.right='100vw';
    champs.forEach((el) => {
        el.removeAttribute('disabled', 'disabled');
    })
}

btnCroix.addEventListener('click', close);

//couleurs


const value = document.querySelector('input[name = couleur]').value;
let hsl = hexToHSL(value);
const couleur = document.querySelector('.couleur');
console.log(value);
console.log(hsl);

couleur.style.background = `linear-gradient(to left, hsla(${hsl[0]}, ${hsl[1]}, ${hsl[2]},1), hsla(${hsl[0]}, ${hsl[1]}, ${hsl[2]},0))`;
function init() { };
