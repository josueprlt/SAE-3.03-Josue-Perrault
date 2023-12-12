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

// sample events for testing
/* let edt = [
  {
    id: '1',
    calendarId: '1',
    title: 'my event',
    category: 'time',
    start: '2023-12-11T08:30:00',
    end: '2023-12-11T10:30:00',
  },
  {
    id: '2',
    calendarId: '1',
    title: 'second event',
    category: 'time',
    start: '2023-12-13T14:00:00',
    end: '2023-12-13T15:30:00',
  },
] */

// creating events in the calendar
V.uicalendar.createEvents(M.getEvents('mmi1'));

V.uicalendar.setCalendarColor('mmi1', {
  color: '#88AB8E',
  backgroundColor: '#88AB8E',
  borderColor: '#88AB8E',
  dragBackgroundColor: '#88AB8E',
});


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

  V.uicalendar.setCalendarColor('mmi1', {
    color: '#88AB8E',
    backgroundColor: '#88AB8E',
    borderColor: '#88AB8E',
    dragBackgroundColor: '#88AB8E',
  });
  V.uicalendar.setCalendarColor('mmi2', {
    color: '#EEC759',
    backgroundColor: '#EEC759',
    borderColor: '#EEC759',
    dragBackgroundColor: '#EEC759',
  });
  V.uicalendar.setCalendarColor('mmi3', {
    color: '#8ACDD7',
    backgroundColor: '#8ACDD7',
    borderColor: '#8ACDD7',
    dragBackgroundColor: '#8ACDD7',
  });
}





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