import { M } from "./js/model.js";
import { V } from "./js/view.js";

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/


// loadind data (and wait for it !)
await M.init();



let select = document.querySelector("#group");

select.addEventListener("change", handler__select);

function handler__select() {
  let val = select.value;
  
  V.uicalendar.clear();
  
  if (val == "mmi2") {
    V.uicalendar.createEvents(M.getEvents('mmi2'));

  } else if (val == "mmi3") {
    V.uicalendar.createEvents(M.getEvents('mmi3'));

  } else if (val == "mmiAll") {
    V.uicalendar.createEvents(M.getEvents('mmi1'));
    V.uicalendar.createEvents(M.getEvents('mmi2'));
    V.uicalendar.createEvents(M.getEvents('mmi3'));

  } else {
    
    V.uicalendar.createEvents(M.getEvents('mmi1'));
  }

  /* ColorCalendar('mmi1', '#88AB8E');
  ColorCalendar('mmi2', '#EEC759');
  ColorCalendar('mmi3', '#8ACDD7'); */
  let change = {};
  
  for (const elt of M.getEvents('mmi1')) {
    
    if (elt.title.includes("CM")) {
      change.backgroundColor = '#88AB8E';
      change.borderColor = '#88AB8E';
    }
    else if (elt.title.includes("TD")) {
      change.backgroundColor = '#66826A';
      change.borderColor = '#66826A';
    }
    else if (elt.title.includes("TP")) {
      change.backgroundColor = '#38473A';
      change.borderColor = '#38473A';
    } else {
      change.backgroundColor = '#88AB8E';
      change.borderColor = '#88AB8E';
    }
  
    V.uicalendar.updateEvent(elt.id, elt.calendarId, change);
  }

  for (const elt of M.getEvents('mmi2')) {
    
    if (elt.title.includes("CM")) {
      change.backgroundColor = '#EEC759';
      change.borderColor = '#EEC759';
    }
    else if (elt.title.includes("TD")) {
      change.backgroundColor = '#A88C3F';
      change.borderColor = '#A88C3F';
    }
    else if (elt.title.includes("TP")) {
      change.backgroundColor = '#5A4B22';
      change.borderColor = '#5A4B22';
    } else {
      change.backgroundColor = '#EEC759';
      change.borderColor = '#EEC759';
    }
  
    V.uicalendar.updateEvent(elt.id, elt.calendarId, change);
  }

  for (const elt of M.getEvents('mmi3')) {
    
    if (elt.title.includes("CM")) {
      change.backgroundColor = '#8ACDD7';
      change.borderColor = '#8ACDD7';
    }
    else if (elt.title.includes("TD")) {
      change.backgroundColor = '#63939A';
      change.borderColor = '#63939A';
    }
    else if (elt.title.includes("TP")) {
      change.backgroundColor = '#3F5E63';
      change.borderColor = '#3F5E63';
    } else {
      change.backgroundColor = '#8ACDD7';
      change.borderColor = '#8ACDD7';
    }
  
    V.uicalendar.updateEvent(elt.id, elt.calendarId, change);
  }
}



handler__select();




let nav = document.querySelectorAll(".navigation");

nav.forEach(elt => {
  elt.addEventListener("click", handler__movePage);
});



function handler__movePage(ev) {

  let btnId = ev.target.id;

  if (btnId == "prev") {
    V.uicalendar.prev();
  } else if (btnId == "next") {
    V.uicalendar.next();
  } else if (btnId == "actual") {
    V.uicalendar.today();
  }
}