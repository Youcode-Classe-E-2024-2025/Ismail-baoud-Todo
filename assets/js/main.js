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
      colorP = "text-red-500";
    } 
    
    else if (tach.catalog === "important moyenne") {
      colorP = "text-orange-500";
    } 
    
    else {
      colorP = "text-green-500";
    }


    const tachtext = `<div class="bg-white rounded-lg text-center m-3 mb-5" data-id="${
      tach.id
    }">
            <button class="delettach"><img class="inline h-4 w-4" src="assets/images/sup.png" alt=""></button>
            
           <select class="modifiertach">
                 <option value="todo" ${
                   tach.places === "todo" ? "selected" : ""
                 }>todo</option>
                 <option value="in progress" ${
                   tach.places === "in progress" ? "selected" : ""
                 }>in progress</option>
                 <option value="done" ${
                   tach.places === "done" ? "selected" : ""
                 }>done</option>
            </select>
            <p class="border-solid border-black border-2 font-bold font-mono"> ${
              tach.titre
            }</p>
            <p class="b font-normal font-mono"> ${tach.description}</p>
            <p> ${tach.deathline}</p>
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





  let statistic = document.getElementById("statistic");
  statistic.innerHTML = `<p>Total Tasks: ${contDONE + contTODO + contDOING}</p>
            <p>Tasks in Todo: ${contTODO}</p>
            <p>Tasks in in progress: ${contDOING}</p>
            <p>Tasks in done: ${contDONE}</p>`;
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
});
affichage(todoTasks);
