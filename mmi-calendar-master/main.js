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


// ~~~~IT 1~~~~

let MmiAll = [...M.getEvents('mmi1'), ...M.getEvents('mmi2'), ...M.getEvents('mmi3')];



// ~~~~IT 3~~~~

for (const elt of MmiAll) {
  elt.backgroundColor = V.colorMap[elt.calendarId][elt.type];
}


let Mmi1 = [];
let Mmi2 = [];
let Mmi3 = [];


MmiAll.forEach(el => {
  if (el.calendarId == "mmi1") {
    Mmi1.push(el);
  }
  else if (el.calendarId == "mmi2") {
    Mmi2.push(el);
  }
  else if (el.calendarId == "mmi3") {
    Mmi3.push(el);
  }
});

V.uicalendar.createEvents(Mmi1);
V.uicalendar.createEvents(Mmi2);
V.uicalendar.createEvents(Mmi3);



// ~~~~IT 2~~~~

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


// ~~~~IT 4~~~~

let group1 = document.querySelectorAll('.but1');
let group2 = document.querySelectorAll('.but2');
let group3 = document.querySelectorAll('.but3');

group1.forEach(elt => {
  elt.style.display = "";
});
group2.forEach(elt => {
  elt.style.display = "none";
});
group3.forEach(elt => {
  elt.style.display = "none";
});



let select = document.querySelector(".section_groupe");

select.addEventListener("click", handler__check);

function handler__check() {

  let mmi1Check = document.querySelector('#mmi1').checked;
  let mmi2Check = document.querySelector('#mmi2').checked;
  let mmi3Check = document.querySelector('#mmi3').checked;


  if (mmi1Check == true) {
    V.uicalendar.setCalendarVisibility(Mmi1[0].calendarId, true);
    group1.forEach(elt => {
      elt.style.display = "";
    });

  } else {
    V.uicalendar.setCalendarVisibility(Mmi1[0].calendarId, false);
    group1.forEach(elt => {
      elt.style.display = "none";
    });
  }

  if (mmi2Check == true) {
    V.uicalendar.setCalendarVisibility(Mmi2[0].calendarId, true);
    group2.forEach(elt => {
      elt.style.display = "";
    });

  } else {
    V.uicalendar.setCalendarVisibility(Mmi2[0].calendarId, false);
    group2.forEach(elt => {
      elt.style.display = "none";
    });
  }

  if (mmi3Check == true) {
    V.uicalendar.setCalendarVisibility(Mmi3[0].calendarId, true);
    group3.forEach(elt => {
      elt.style.display = "";
    });

  } else {
    V.uicalendar.setCalendarVisibility(Mmi3[0].calendarId, false);
    group3.forEach(elt => {
      elt.style.display = "none";
    });
  }

  setLocalStorage();
}



// ~~~~IT 5~~~~

let selectGroup = document.querySelector("#group");

selectGroup.addEventListener("change", handler_Group);

function handler_Group() {
  let val = selectGroup.value;
  console.log(val);

  V.uicalendar.clear();

  if (val != "none") {
    let filter = MmiAll.filter((elt) => elt.groups.includes(val));
    V.uicalendar.createEvents(filter);

  } else {
    V.uicalendar.createEvents(MmiAll);
  }

}



// ~~~~IT 6~~~~
// ~~~~IT 7~~~~

let search_bar = document.querySelector("#search");
let btn_search = document.querySelector("#btn__search");

btn_search.addEventListener("click", handler__research);

function handler__research() {
  V.uicalendar.clear();

  let val = search_bar.value;
  let tableau = val.match(/(\d+|\D+)/g);
  let filterSearch;

  if (val != "") {
    filterSearch = MmiAll.filter(elt =>
      tableau.every(tab => elt.location.includes(tab) || elt.title.includes(tab))
    );
  } else {
    V.uicalendar.createEvents(MmiAll);
  }


  V.uicalendar.createEvents(filterSearch);
}


// ~~~~IT 8~~~~

let Btns = document.querySelectorAll(".section__btns");

Btns.forEach(element => {
  element.addEventListener("click", handler__visual);
});


function handler__visual(ev) {
  let visualisation = ev.target.dataset.id;

  if (visualisation == "jour") {
    V.uicalendar.changeView('day');
  }
  else if (visualisation == "semaine") {
    V.uicalendar.changeView('week');
  }
  else if (visualisation == "mois") {
    V.uicalendar.changeView('month');
  }
}



// ~~~~IT 9~~~~

let MobileFormat = window.matchMedia("(max-width: 800px)");

function ResponsiveCalendar(x) {
  if (x.matches) {
    V.uicalendar.changeView('day');
  } else {
    V.uicalendar.changeView('week');
  }
}

ResponsiveCalendar(MobileFormat);

MobileFormat.addEventListener("change", function () {
  ResponsiveCalendar(MobileFormat);
});




// ~~~~IT 10~~~~

function setLocalStorage() {
  let cb1 = document.querySelector('#mmi1').checked;
  let cb2 = document.querySelector('#mmi2').checked;
  let cb3 = document.querySelector('#mmi3').checked;
  let valeur = selectGroup.value;

  localStorage.setItem("cb1", cb1);
  localStorage.setItem("cb2", cb2);
  localStorage.setItem("cb3", cb3);

  localStorage.setItem("group", valeur);
}



let checkbox1 = localStorage.getItem("cb1");
let checkbox2 = localStorage.getItem("cb2");
let checkbox3 = localStorage.getItem("cb3");
let group = localStorage.getItem("group");

function getLocalStorage() {
  let cb1 = document.querySelector('#mmi1');
  let cb2 = document.querySelector('#mmi2');
  let cb3 = document.querySelector('#mmi3');

  document.querySelector('#group [value="' + group + '"]').selected = true;
  
  console.log(group);
  
  if (group != "none") {
    V.uicalendar.clear();
    let filter = MmiAll.filter((elt) => elt.groups.includes(group));
    V.uicalendar.createEvents(filter);
  }
  
  if (checkbox1 == "true") {
    V.uicalendar.setCalendarVisibility(Mmi1[0].calendarId, true);
    cb1.click();
  }

  if (checkbox2 == "true") {
    V.uicalendar.setCalendarVisibility(Mmi2[0].calendarId, true);
    cb2.click();
  }

  if (checkbox3 == "true") {
    V.uicalendar.setCalendarVisibility(Mmi3[0].calendarId, true);
    cb3.click();
  }

}

getLocalStorage();