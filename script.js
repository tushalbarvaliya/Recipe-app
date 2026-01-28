let content = "";

let recipes_list = JSON.parse(localStorage.getItem("recipes_list")) || [];


recipes_list.map((val) => {
  content =
    content +
    `
    <div class="bg-white h-48 pt-4 rounded-lg px-4">
        <h1 class="text-black ">Id: <span class="font-bold">${val.id}</span></h1>
        <h1 class="text-black ">Name : <span class="font-bold capitalize">${val.name}</span></h1>
        <h1 class="text-black ">Type : <span class="font-bold capitalize">${val.type}</span></h1>
        <h1 class="text-black ">description : <span class="font-bold capitalize">${val.description}</span></h1>
        <div class="w-full">
          <div class="flex gap-8 justify-around my-8 ">
                    <button class="bg-amber-400 px-8 rounded-2xl" onclick="EditRecipe('${val.id}','${val.name}','${val.type}','${val.description}')">Edit</button> 
                    <button class="bg-red-600 px-8 rounded-2xl" onclick="DeleteRecipe('${val.id}')">Delete</button></td>
                </div>
        </div>
      </div>
            `;
});

const table_body = document.getElementById("box");
if (table_body) {
  table_body.innerHTML = content;
}
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", submit);
}

function submit(event) {
  event.preventDefault();

  const id_input = document.getElementById("r_id").value;
  const name_input = document.getElementById("r_name").value;
  const type_input = document.getElementById("r_type").value;
  const desc_input = document.getElementById("r_description").value;

  const recipe = {
    id: Date.now(),
    name: name_input,
    type: type_input,
    description: desc_input,
  };

  recipes_list.push(recipe);
  // console.log(recipes_list);
  localStorage.setItem("recipes_list", JSON.stringify(recipes_list));
}

function DeleteRecipe(id) {
  let recipes_list = JSON.parse(localStorage.getItem("recipes_list"));
  let newRecipe_list = recipes_list.filter((val) => {
    return val.id != id;
  });
  localStorage.setItem("recipes_list", JSON.stringify(newRecipe_list));
  window.location.reload();
}

function EditRecipe(id, name, type, description) {
  let edit = {
    id,
    name,
    type,
    description,
  };
  localStorage.setItem("edit", JSON.stringify(edit));
  // doEdit();
  window.location.href = "http://127.0.0.1:5500/editRecipes.html";
}

doEdit();
function doEdit() {
  const editRecipe = JSON.parse(localStorage.getItem("edit"));
  if (!editRecipe) {
    return;
  } else {
    document.getElementById("e_id").value = editRecipe.id;
    document.getElementById("e_name").value = editRecipe.name;
    document.getElementById("e_type").value = editRecipe.type;
    document.getElementById("e_description").value = editRecipe.description;
  }
}

function EditSubmit() {
  let recipes_list = JSON.parse(localStorage.getItem("recipes_list"));
  let edir_list = JSON.parse(localStorage.getItem("edit"));
  const id_input = document.getElementById("e_id").value;
  const name_input = document.getElementById("e_name").value;
  const type_input = document.getElementById("e_type").value;
  const desc_input = document.getElementById("e_description").value;

  const recipe = {
    id: id_input,
    name: name_input,
    type: type_input,
    description: desc_input,
  };
  let newRecipe_list = recipes_list.map((val) => {
    if (val.id == edir_list.id) {
      return recipe;
    } else {
      return val;
    }
  });
  localStorage.setItem("recipes_list", JSON.stringify(newRecipe_list));
  localStorage.removeItem("edit");

  // console.log(newRecipe_list);
  window.location.href = "http://127.0.0.1:5500/index.html";
}

// window.addEventListener('DOMContentLoaded',doEdit);

function changes() {
  const search = document.getElementById("search");
  if (search.value == "") {
    // search is blank
    let recipes_list = JSON.parse(localStorage.getItem("recipes_list")) || [];
    content = "";
    // console.log("EMPTY");
    recipes_list.map((val) => {
      content =
        content +
        `<div class="bg-white h-48 pt-4 rounded-lg px-4">
        <h1 class="text-black ">Id: <span class="font-bold">${val.id}</span></h1>
        <h1 class="text-black ">Name : <span class="font-bold capitalize">${val.name}</span></h1>
        <h1 class="text-black ">Type : <span class="font-bold capitalize">${val.type}</span></h1>
        <h1 class="text-black ">description : <span class="font-bold capitalize">${val.description}</span></h1>
        <div class="w-full">
          <div class="flex gap-8 justify-around my-8 ">
                    <button class="bg-amber-400 px-8 rounded-2xl" onclick="EditRecipe('${val.id}','${val.name}','${val.type}','${val.description}')">Edit</button> 
                    <button class="bg-red-600 px-8 rounded-2xl" onclick="DeleteRecipe('${val.id}')">Delete</button></td>
                </div>
        </div>
      </div>`;
    });

    const table_body = document.getElementById("box");
    if (table_body) {
      table_body.innerHTML = content;
    }
  } else {
    // search is not black
    let recipes_list = JSON.parse(localStorage.getItem("recipes_list")) || [];
    content = "";
    recipes_list.map((val) => {
      if (
        val.name.includes(search.value) ||
        val.type.includes(search.value) ||
        val.description.includes(search.value)
      ) {
        content =
          content +
          `<div class="bg-white h-48 pt-4 rounded-lg px-4">
        <h1 class="text-black ">Id: <span class="font-bold">${val.id}</span></h1>
        <h1 class="text-black ">Name : <span class="font-bold capitalize">${val.name}</span></h1>
        <h1 class="text-black ">Type : <span class="font-bold capitalize">${val.type}</span></h1>
        <h1 class="text-black ">description : <span class="font-bold capitalize">${val.description}</span></h1>
        <div class="w-full">
          <div class="flex gap-8 justify-around my-8 ">
                    <button class="bg-amber-400 px-8 rounded-2xl" onclick="EditRecipe('${val.id}','${val.name}','${val.type}','${val.description}')">Edit</button> 
                    <button class="bg-red-600 px-8 rounded-2xl" onclick="DeleteRecipe('${val.id}')">Delete</button></td>
                </div>
        </div>
      </div>`;
      }
    });

    const table_body = document.getElementById("box");
    if (table_body) {
      table_body.innerHTML = content;
    }
  }
}
