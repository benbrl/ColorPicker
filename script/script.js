//convertion HEX Vers HSL

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0; let g = 0; let
        b = 0;
    if (H.length == 4) {
        r = `0x${H[1]}${H[1]}`;
        g = `0x${H[2]}${H[2]}`;
        b = `0x${H[3]}${H[3]}`;
    } else if (H.length == 7) {
        r = `0x${H[1]}${H[2]}`;
        g = `0x${H[3]}${H[4]}`;
        b = `0x${H[5]}${H[6]}`;
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    if (delta == 0) { h = 0; } else if (cmax == r) { h = ((g - b) / delta) % 6; } else if (cmax == g) { h = (b - r) / delta + 2; } else { h = (r - g) / delta + 4; }

    h = Math.round(h * 60);

    if (h < 0) { h += 360; }

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}

//convertion HSL Vers Hex

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
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

// color picker//

// activer/desactiver

const inputColor = document.querySelector('input[name=couleur]');
const btnCroix = document.querySelector('.colorpicker>button');
const colorPicker = document.querySelector('.colorpicker');
const champs = document.querySelectorAll('input,form>button');

function open(e) {
    e.preventDefault();
    console.log('click open');
    colorPicker.style.right = '0';
    champs.forEach((el) => {
        el.setAttribute('disabled', 'disabled');
    });
}

inputColor.addEventListener('click', open);

function close() {
    console.log('click close');
    colorPicker.style.right = '100vw';
    champs.forEach((el) => {
        el.removeAttribute('disabled', 'disabled');
    });
}

btnCroix.addEventListener('click', close);

// couleurs

const value = document.querySelector('input[name = couleur]');
const hsl = hexToHSL(value);
const couleur = document.querySelector('.couleur');
console.log(value);
console.log(hsl);

const toph = ((360 - hsl[0]) / 3.6);
console.log(toph);
const taquet = document.querySelector('.taquet');
taquet.style.top = `${toph}%`;

const loupe = document.querySelector('.loupe');
const topl = (100 - hsl[2]);
const lefts = hsl[1];

loupe.style.top = `${topl}%`;
loupe.style.left = `${lefts}%`;

const apercu = document.querySelector('.apercu');
apercu.style.backgroundColor = value;

const nuance2 = document.querySelector('.nuance2');
console.log(`linear-gradient(to left, hsla( ${hsl[0]}deg , 100%, 50%, 1), hsla(${hsl[0]}deg, 100%, 50%, 0));`);
nuance2.style.background = `linear-gradient(to left, hsla( ${hsl[0]}deg , 100%, 50%, 1), hsla(${hsl[0]}deg, 100%, 50%, 0))`;

// Taquet

const arc = document.querySelector('.arc-en-ciel');

let statutTaquet = false;
let positionSouris = 0;

arc.addEventListener('mouseup', e => {
    statutTaquet = false;
});

arc.addEventListener('mousedown', e => {
    statutTaquet = true;
    positionSouris = e.clientY - arc.getBoundingClientRect().top;
});

arc.addEventListener('mousemove', e => {
    if (statutTaquet) {
        // console.log(e);
        const Ysouris = e.clientY;
        // console.log(Ysouris);
        const dimensionsArc = arc.getBoundingClientRect();
        // console.log(dimensionsArc);
        const arcTop = dimensionsArc.top;
        const arcH = dimensionsArc.height;
        // console.log(arcTop);
        // console.log(arcH);
        const positionSouris = (((Ysouris - arcTop) / arcH) * 100);
        // console.log(positionSouris);
        taquet.style.top = `${positionSouris}%`;
        hsl[0] = ((100 - positionSouris) * 3.6);
        apercu.style.backgroundColor = HSLToHex(hsl[0], hsl[1], hsl[2]);
        nuance2.style.background = `linear-gradient(to left, hsla( ${hsl[0]}deg , 100%, 50%, 1), hsla(${hsl[0]}deg, 100%, 50%, 0))`;
        value.value = HSLToHex(hsl[0], hsl[1], hsl[2]);
    }
});


function action2(e) {
    // console.log(e);
    const Ysouris = e.clientY;
    // console.log(Ysouris);
    const dimensionsArc = arc.getBoundingClientRect();
    // console.log(dimensionsArc);
    const arcTop = dimensionsArc.top;
    const arcH = dimensionsArc.height;
    // console.log(arcTop);
    // console.log(arcH);
    const positionSouris = (((Ysouris - arcTop) / arcH) * 100);
    // console.log(positionSouris);
    taquet.style.top = `${positionSouris}%`;
    hsl[0] = ((100 - positionSouris) * 3.6);
    apercu.style.backgroundColor = HSLToHex(hsl[0], hsl[1], hsl[2]);
    nuance2.style.background = `linear-gradient(to left, hsla( ${hsl[0]}deg , 100%, 50%, 1), hsla(${hsl[0]}deg, 100%, 50%, 0))`;
    value.value = HSLToHex(hsl[0], hsl[1], hsl[2]);
}


arc.addEventListener('click', action2);







// Loupe



const nuance = document.querySelector('.nuance');


let statutLoupe = false;
let positionSourisLoupe = 0;

nuance.addEventListener('mouseup', e => {
    statutTaquet = false;
});

nuance.addEventListener('mousedown', e => {
    statutTaquet = true;
    positionSourisLoupe = e.clientY - arc.getBoundingClientRect().top;
});

nuance.addEventListener('mousemove', e => {
    if (statutTaquet) {
        const YsourisNuance = e.clientY;
        const XsourisNuance = e.clientX;
        // console.log(YsourisNuance);
        // console.log(XsourisNuance);
        const dimensionsNuance = nuance.getBoundingClientRect();
        // console.log(dimensionsNuance);
        const nuanceTop = dimensionsNuance.top;
        const nuanceLeft = dimensionsNuance.left;
        const nuanceH = dimensionsNuance.height;
        const nuanceW = dimensionsNuance.width;
        // console.log(nuanceTop);
        // console.log(nuanceH);
        // console.log(nuanceW);
        const positionSourisNuanceTop = (((YsourisNuance - nuanceTop) / nuanceH) * 100);
        loupe.style.top = `${positionSourisNuanceTop}%`;
        //  console.log(positionSourisNuanceTop);
        const positionSourisNuanceLeft = (((XsourisNuance - nuanceLeft) / nuanceW) * 100);
        // console.log(positionSourisNuanceLeft);
        loupe.style.left = `${positionSourisNuanceLeft}%`;
        hsl[1] = positionSourisNuanceLeft;
        console.log(hsl[1]);
        hsl[2] = (100 - positionSourisNuanceTop);
        console.log(hsl[2]);
        apercu.style.backgroundColor = HSLToHex(hsl[0], hsl[1], hsl[2]);
        value.value = HSLToHex(hsl[0], hsl[1], hsl[2]);
    }
});


function action3(e) {
    const YsourisNuance = e.clientY;
    const XsourisNuance = e.clientX;
    // console.log(YsourisNuance);
    // console.log(XsourisNuance);
    const dimensionsNuance = nuance.getBoundingClientRect();
    // console.log(dimensionsNuance);
    const nuanceTop = dimensionsNuance.top;
    const nuanceLeft = dimensionsNuance.left;
    const nuanceH = dimensionsNuance.height;
    const nuanceW = dimensionsNuance.width;
    // console.log(nuanceTop);
    // console.log(nuanceH);
    // console.log(nuanceW);
    const positionSourisNuanceTop = (((YsourisNuance - nuanceTop) / nuanceH) * 100);
    loupe.style.top = `${positionSourisNuanceTop}%`;
    //  console.log(positionSourisNuanceTop);
    const positionSourisNuanceLeft = (((XsourisNuance - nuanceLeft) / nuanceW) * 100);
    // console.log(positionSourisNuanceLeft);
    loupe.style.left = `${positionSourisNuanceLeft}%`;
    hsl[1] = positionSourisNuanceLeft;
    console.log(hsl[1]);
    hsl[2] = (100 - positionSourisNuanceTop);
    console.log(hsl[2]);
    apercu.style.backgroundColor = HSLToHex(hsl[0], hsl[1], hsl[2]);
    value.value = HSLToHex(hsl[0], hsl[1], hsl[2]);
}
nuance.addEventListener('click', action3);

function init() { }
