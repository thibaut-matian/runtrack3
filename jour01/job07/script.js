const maDateTest = new Date("2020/12/25");
const joursFeries2020 = [
'1-1',  // Nouvel An
'1-5',  // Fête du Travail
'8-5',  // Victoire 1945
'14-7', // Fête Nationale
'15-8', // Assomption
'1-11', // Toussaint
'11-11',// Armistice
'25-12' // Noël
];



function jourTravaille(dateAVerifier) {
  let jour = dateAVerifier.getDate();
  let mois = dateAVerifier.getMonth() + 1;
  let annee = dateAVerifier.getFullYear();
  let jourDeLaSemaine = dateAVerifier.getDay();

  let dateActuelle = jour + '-' + mois;

  if (joursFeries2020.includes(dateActuelle)){
    console.log("Le" + jour + "/" + mois + "/"+ annee + " est un jour férié");
  
  } else if (jourDeLaSemaine === 0 || jourDeLaSemaine === 6){
    console.log ("Le" + jour + "/" + mois + "/"+ annee + " était le weekend");
  } else {
    console.log ("Le " + jour + "/" + mois + "/" + annee + " est jour travaillé"); 
  }
 
}

jourTravaille(maDateTest);