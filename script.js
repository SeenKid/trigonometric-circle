/*

- Yann Berlemont
- MI IN CG 2 
- Projet alternatif mathématiques

Ce fichier javascript contient le code permettant les animations.

*/

// Récupération de la référence au canvas et du contexte 2D
var canvas = document.getElementById("canvas");
var contexte = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();

// Initialisation des variables de base pour le cercle
var x = 200;
var y = 200;
var rayon = 150;

/**
 * @description angle est une variable qui permet d'obtenir l'angle du cercle.
 * Le calcul est simple. 180 * 2 = 360°, donc le cercle complet.
 */
var angle = Math.PI * 2; // 180 * 2 = 360° (0)
var delai = 500;
var timerId = null;
var dataHistory = [];

// définition de pi
const pi = Math.PI;

/**
 * @description Fonction qui dessine le graphique du cercle
 */
function dessinerCercle() {
    contexte.beginPath();
    contexte.arc(x, y, rayon, 0, 2 * pi);
    contexte.stroke();
}


/**
 * @description Fonction qui dessine le point sur le cercle
 */
function dessinerPoint() {
    contexte.beginPath();
    contexte.arc(x + rayon * Math.cos(-angle), y + rayon * Math.sin(-angle), 5, 0, 2 * pi);
    contexte.fill();
    contexte.moveTo(x, y);
    contexte.lineTo(x + rayon * Math.cos(-angle), y + rayon * Math.sin(-angle));
    contexte.stroke();
    contexte.closePath();

    // Ajout du texte pour l'angle courant sur le point mobile
    var angleDegres = Math.round(angle * 180 / pi);
    contexte.font = "bold 10px Verdana"; // Police & taille du texte
    contexte.fillText(angleDegres + "°", x + rayon * Math.cos(-angle) + 10, y + rayon * Math.sin(-angle) - 10);

    // Dessiner la ligne reliant le point mobile sur le cercle à l'axe des x
    contexte.beginPath();
    contexte.moveTo(x, y);
    contexte.lineTo(x + rayon * Math.cos(-angle), y);
    contexte.stroke();
    contexte.closePath();

    // Dessiner la ligne reliant le point mobile sur le cercle à l'axe des y
    contexte.beginPath();
    contexte.moveTo(x + rayon * Math.cos(-angle), y);
    contexte.lineTo(x + rayon * Math.cos(-angle), y + rayon * Math.sin(-angle));
    contexte.stroke();
    contexte.closePath();

    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    graphique.data.labels.push(Math.round(angle * 180 / pi)); // Ajouter l'angle en degrés à l'axe des x

    graphique.data.datasets[0].data.push(sin); // Ajouter la valeur de sin à la série de données
    graphique.data.datasets[1].data.push(cos);
    graphique.update(); // Mettre à jour le graphique

}

/**
 * @description Fonction qui dessine les axes X et Y
 */
function dessinerAxes() {
    contexte.beginPath();
    contexte.moveTo(x - rayon, y);
    contexte.lineTo(x + rayon, y);
    contexte.moveTo(x, y - rayon);
    contexte.lineTo(x, y + rayon);
    contexte.stroke();

    // Ajout du texte pour les axes
    contexte.font = "bold 10px Verdana";
    contexte.fillText("0°", x + rayon + 15, y + 5);
    contexte.fillText("90°", x - 7, y - rayon - 10);
    contexte.fillText("180°", x - rayon - 35, y + 5);
    contexte.fillText("270°", x - 10, y + rayon + 15);
}


/**
 * @description Fonction qui dessine le cercle, le point mobile et les axes
 */
function dessiner() {

    angle += pi / 36;
    if (angle >= (2 * pi)) {
        angle = 0;
    }

    // Affichage de l'angle en degrés et en radians
    if (Math.round(angle * 180 / pi) === 360) {
        document.getElementById("affichageAngle").innerHTML = "Angle[°]: 0°";
        document.getElementById("affichageAngleRadian").innerHTML = "Angle[rad]: 0.00";
    } else {
        document.getElementById("affichageAngle").innerHTML = "Angle[°]: " + Math.round(angle * 180 / pi) + "°";
        document.getElementById("affichageAngleRadian").innerHTML = "Angle[rad]: " + angle.toFixed(2);
        document.getElementById("affichagesin").innerHTML = "Sin[α]: " + Math.sin(angle).toFixed(3);
        document.getElementById("affichagecos").innerHTML = "Cos[α]: " + Math.cos(angle).toFixed(3);
        document.getElementById("affichagetan").innerHTML = "Tan[α]: " + Math.tan(angle).toFixed(3);

        if (Math.tan(angle).toFixed(3) > 600) {
            document.getElementById("affichagetan").innerHTML = "Tan[α]: ∞";
        }
    }

    contexte.clearRect(0, 0, canvas.width, canvas.height);
    dessinerAxes()
    dessinerCercle();
    dessinerPoint();

    // Affichage de sin/cos/tan
    var sinVal = Math.sin(angle).toFixed(3);
    var cosVal = Math.cos(angle).toFixed(3);
    var tanVal = Math.tan(angle).toFixed(3);

    // Positionnement du bloc d'affichage à droite du cercle trigonométrique
    var affichageX = canvas.width - 260;
    var affichageY = (canvas.height - 180) / 2; // ajuster la position du canvas

    // Affichage des lignes verticales
    contexte.beginPath();
    contexte.moveTo(affichageX + 10, affichageY);
    contexte.lineTo(affichageX + 10, affichageY + 200);
    contexte.font = "10px Verdana"; // Police & taille du texte
    contexte.fillStyle = "black";
    contexte.fillText("1", affichageX - 5, affichageY + 0);
    contexte.fillText("0", affichageX - 5, affichageY + 100);
    contexte.fillText("-1", affichageX - 5, affichageY + 200);
    contexte.stroke();

    contexte.beginPath();
    contexte.moveTo(affichageX + 70, affichageY);
    contexte.lineTo(affichageX + 70, affichageY + 200);
    contexte.font = "10px Verdana"; // Police & taille du texte
    contexte.fillStyle = "black";
    contexte.fillText("1", affichageX + 55, affichageY + 0);
    contexte.fillText("0", affichageX + 55, affichageY + 100);
    contexte.fillText("-1", affichageX + 55, affichageY + 200);
    contexte.stroke();

    contexte.beginPath();
    contexte.moveTo(affichageX + 130, affichageY);
    contexte.lineTo(affichageX + 130, affichageY + 200);
    contexte.font = "10px Verdana"; // Police & taille du texte
    contexte.fillStyle = "black";
    contexte.fillText("1", affichageX + 115, affichageY + 0);
    contexte.fillText("0", affichageX + 115, affichageY + 100);
    contexte.fillText("-1", affichageX + 115, affichageY + 200);
    contexte.stroke();


    // Graphique Sinus vertical 
    contexte.fillStyle = "blue";
    var sinHeight = sinVal * 100;
    sinHeight = Math.max(-100, Math.min(sinHeight, 100)); // Limitation de la taille de la barre
    contexte.fillRect(affichageX + 5, affichageY + 100 - sinHeight, 10, sinHeight);

    // Graphique Cosinus vertical 
    contexte.fillStyle = "red";
    var cosHeight = cosVal * 100;
    cosHeight = Math.max(-100, Math.min(cosHeight, 100)); // Limitation de la taille de la barre
    contexte.fillRect(affichageX + 65, affichageY + 100 - cosHeight, 10, cosHeight);

    // Graphique tangeante vertical
    contexte.fillStyle = "green";
    var tanHeight = tanVal * 100;
    tanHeight = Math.max(-100, Math.min(tanHeight, 100)); // Limitation de la taille de la barre
    contexte.fillRect(affichageX + 125, affichageY + 100 - tanHeight, 10, tanHeight);

    // Valeurs graphique vertical
    contexte.font = "10px Verdana"; // Police & taille du texte
    contexte.fillStyle = "black";
    contexte.fillText("sin: " + sinVal, affichageX, affichageY - 15);
    contexte.fillText("cos: " + cosVal, affichageX + 60, affichageY - 15);
    contexte.fillText("tan: " + tanVal, affichageX + 120, affichageY - 15);
}

/**
 * @description démarre l'animation des graphiques
 */
function demarrerAnimation() {
    arreterAnimation();
    timerId = setInterval(dessiner, delai);
    document.getElementById("affichageDelai").innerHTML = "Délai: " + delai + "ms";
}

/**
 * @description arrête l'animation des graphiques
 */
function arreterAnimation() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}

// Function pour diminuer le délai de l'animation
function diminuerDelai() {
    if (delai > 50) {
        delai -= 50;
        document.getElementById("affichageDelai").innerHTML = "Délai: " + delai + "ms";
        if (timerId !== null) {
            arreterAnimation();
            demarrerAnimation();
        }
    }
}

/**
 * @description Fonction pour augmenter le délai de l'animation
 */
function augmenterDelai() {
    delai += 50;
    document.getElementById("affichageDelai").innerHTML = "Délai: " + delai + "ms";
    if (timerId !== null) {
        arreterAnimation();
        demarrerAnimation();
    }
}

/**
 * @description reset de la page
 */
function redemarrerAnimation() {
    arreterAnimation();
    angle = Math.PI * 2;
    document.getElementById("affichageAngle").innerHTML = "Angle[°]: " + Math.round(angle * 180 / pi) + "°";
    document.getElementById("affichageAngleRadian").innerHTML = "Angle[rad]: " + angle.toFixed(3);
    document.getElementById("affichagesin").innerHTML = "Sin[α]: " + Math.sin(angle).toFixed(3);
    document.getElementById("affichagecos").innerHTML = "Cos[α]: " + Math.cos(angle).toFixed(3);
    document.getElementById("affichagetan").innerHTML = "Tan[α]: " + Math.tan(angle).toFixed(3);

    // mise à zero du graphique oscilloscope
    graphique.data.labels = [];
    graphique.data.datasets[0].data = [];
    graphique.data.datasets[1].data = [];
    graphique.update();

    dessiner();
}

/**
 * @description ajoute les valeurs dans une arraylist
 */
function enregistrer() {
    // Récupération des valeurs actuelles
    var angleDeg = Math.round(angle * 180 / pi);
    var angleRad = angle.toFixed(3);
    var sinVal = Math.sin(angle).toFixed(3);
    var cosVal = Math.cos(angle).toFixed(3);
    var tanVal = Math.tan(angle).toFixed(3);

    // Stockage des valeurs dans un tableau
    var data = [angleDeg, angleRad, sinVal, cosVal, tanVal];

    // Ajout des valeurs à l'historique
    dataHistory.push(data);
}

/**
 * @description fonction qui permet de télécharger le fichier CSV
 */
function downloadcsv() {
    // Conversion de l'historique en une chaîne de caractères CSV
    var csvString = "Degres;Radians;Sinus;Cosinus;Tangente\n";
    dataHistory.forEach(function (data) {
        csvString += data.join(";") + "\n";
    });

    var downloadLink = document.createElement("a");
    downloadLink.href = "data:text/csv; charset=utf-8," + encodeURIComponent(csvString);
    downloadLink.download = "cercle_trigonometrique.csv";

    // Ajout du lien à la page
    document.body.appendChild(downloadLink);

    // Ouverture d'une nouvelle fenêtre pour télécharger le fichier CSV
    window.open(downloadLink.href);

    // Suppression du lien de la page
    setTimeout(function () {
        document.body.removeChild(downloadLink);
    }, 100);

    // Ajout de l'événement "click" pour le bouton "Recommencer"
    document.getElementById("brecommencer").addEventListener("click", function () {
        redemarrer();
    });
}

document.getElementById("affichageDelai").innerHTML = "Délai: " + delai + "ms";
document.getElementById("affichageAngle").innerHTML = "Angle[°]: 0°";
document.getElementById("affichageAngleRadian").innerHTML = "Angle[rad]: 0.00";
document.getElementById("affichagesin").innerHTML = "Sin[α]: 0.00";
document.getElementById("affichagecos").innerHTML = "Cos[α]: 0.00";
document.getElementById("affichagetan").innerHTML = "Tan[α]: 0.00";

// graphique oscilloscope
var graphique = new Chart(document.getElementById('graphique'), {
    type: 'line',
    data: {
        labels: [], // Les étiquettes pour l'axe des x (ici, les angles)
        datasets: [{
                label: 'Sinus', // Le nom de la série de données
                data: [], // Les valeurs de la série de données
                borderColor: 'blue', // La couleur de la ligne du graphique
                fill: false // Ne pas remplir la zone sous la ligne
            },
            {
                label: 'Cosinus', // Le nom de la série de données
                data: [], // Les valeurs de la série de données
                borderColor: 'red', // La couleur de la ligne du graphique
                fill: false // Ne pas remplir la zone sous la ligne
            }
        ]
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Angle[°]'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'SIN / COS'
                },
                suggestedMin: -1, // La valeur minimale de l'axe des y
                suggestedMax: 1 // La valeur maximale de l'axe des y
            }
        }
    }
});



//dessiner les graphiques
dessiner();