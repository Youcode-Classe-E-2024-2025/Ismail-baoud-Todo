const botton1 = document.getElementById("bottone");
const botton2 = document.querySelector(".add");
botton1.addEventListener("click", () => {
  botton2.classList.remove("hidden");
  
});

const cancelbotton = document.getElementById("cancelBotton");
cancelbotton.addEventListener("click", () => {
  botton2.classList.add("hidden");
});

const todoTasks = [
  {
    titre: "test 1",
    description: "description 111",
    deathline: "4/12/2024",
    catalog: "tres important",
    places: "todo",
    id: 1,
  },
  {
    titre: "test 2",
    description: "description 111",
    deathline: "23/4/2025",
    catalog: "important moyenne",
    places: "in progress",
    id: 2,
  },
  {
    titre: "test 3",
    description: "description 111",
    deathline: "20/10/2024",
    catalog: "ne important pas",
    places: "done",
    id: 3,
  },
];

const todo = document.getElementById("todo");
const inProgress = document.getElementById("Inprogress");
const done = document.getElementById("done");

let idCount = 4;

function affichage(taches) {


  todo.innerHTML = "";
  inProgress.innerHTML = "";
  done.innerHTML = "";
  let contTODO = 0;
  let contDOING = 0;
  let contDONE = 0;

  taches.forEach((tach) => {

    let colorP;

    if (tach.catalog === "tres important") {
      colorP = "bg-red-500";
    } 
    
    else if (tach.catalog === "important moyenne") {
      colorP = "bg-orange-500";
    } 
    
    else {
      colorP = "bg-green-500";
    }

    const tachtext = 
    `<div grid relative grid-cols-5 grid-rows-5 class="bg-gray-100 rounded-lg text-center m-3 mb-5" data-id="${tach.id}">
            <select class="modifiertach font-serif bg-gray-100">
             <option value="todo" ${
                tach.places === "todo" ? "selected" : ""}>à faire</option>
                 <option value="in progress" ${tach.places === "in progress" ? "selected" : ""}>en cours</option>
                 <option value="done" ${tach.places === "done" ? "selected" : ""
                 }>terminé</option>
            </select>
            <h3 class="h-2 block ${colorP}  rounded-r-lg rounded-l-lg"></h3>
            <p class="font-extrabold font-mono pb-4 pt-2"> ${tach.titre
            }</p>
            <p class="b font-normal font-mono text-left"> ${tach.description}</p>
            <p class="text-gray-600 block font-mono"> ${tach.deathline}</p>
            <button class="delettach"><img class="block h-4 w-4 " src="assets/images/sup.png" alt="image de supremer"></button>
        </div>`;
    if (tach.places === "todo") {
      todo.innerHTML += tachtext;
      contTODO++;
    } else if (tach.places === "in progress") {
      inProgress.innerHTML += tachtext;
      contDOING++;
    } else if (tach.places === "done") {
      done.innerHTML += tachtext;
      contDONE++;
    }
  });

    let todocont = document.getElementById('todocont');
    todocont.innerText = `${contTODO}`;
    let doingcont = document.getElementById('doingcont');
    doingcont.innerText = `${contDOING}`;
    let donecont = document.getElementById('donecont');
    donecont.innerText = `${contDONE}`;
    let totalTasks = document.getElementById('total');
    totalTasks.innerText = `${contDONE+contDOING+contTODO}`;

  document.querySelectorAll(".delettach").forEach((button) => {
    button.addEventListener("click", (event) => {
      const tachElem = event.target.closest("div");
      const idtach = parseInt(tachElem.getAttribute("data-id"));
      deletTask(idtach);
      affichage(todoTasks);
    });
  });



  document.querySelectorAll(".modifiertach").forEach((select) => {
    select.addEventListener("change", (event) => {
      const tachElem = event.target.closest("div");
      const idtach = parseInt(tachElem.getAttribute("data-id"));
      const newValue = event.target.value;
      changestatus(idtach, newValue);
      affichage(todoTasks);
    });
  });
}



function deletTask(id) {
  const index = todoTasks.findIndex((tach) => tach.id === id);
  if (index !== -1) {
    todoTasks.splice(index, 1);
  }
}




function changestatus(id, new_value) {
  const index = todoTasks.findIndex((tach) => tach.id === id);
  if (index !== -1) {
    todoTasks[index].places = new_value;
  }
}

function clearform() {

    document.getElementById("titre").value ="";
    document.getElementById("description").value = "";
    document.getElementById("death-line").value = "";
    document.getElementById("important").value ="";
    document.getElementById("places").value = "todo";

}


document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const titre = document.getElementById("titre").value;
  const description = document.getElementById("description").value;
  const deathline = document.getElementById("death-line").value;
  const catalog = document.getElementById("important").value;
  const places = document.getElementById("places").value;

  const formValues = {
    titre: titre,
    description: description,
    deathline: deathline,
    catalog: catalog,
    places: places,
    id: idCount++,
  };
  todoTasks.unshift(formValues);
  affichage(todoTasks);
  botton2.classList.add("hidden");
  clearform()
});
affichage(todoTasks);
