"use strict";
// -------------------- Variables --------------------
let content = "";
let recipes_list = JSON.parse(localStorage.getItem("recipes_list") || "[]");
// -------------------- Render Recipes --------------------
function renderRecipes(list) {
    content = "";
    list.forEach((val) => {
        content += `
      <div class="bg-white h-48 pt-4 rounded-lg px-4">
        <h1 class="text-black">Id: <span class="font-bold">${val.id}</span></h1>
        <h1 class="text-black">Name: <span class="font-bold capitalize">${val.name}</span></h1>
        <h1 class="text-black">Type: <span class="font-bold capitalize">${val.type}</span></h1>
        <h1 class="text-black">Description: <span class="font-bold capitalize">${val.description}</span></h1>
        <div class="w-full">
          <div class="flex gap-8 justify-around my-8">
            <button class="bg-amber-400 px-8 rounded-2xl"
              onclick="EditRecipe(${val.id},'${val.name}','${val.type}','${val.description}')">Edit</button>
            <button class="bg-red-600 px-8 rounded-2xl"
              onclick="DeleteRecipe(${val.id})">Delete</button>
          </div>
        </div>
      </div>
    `;
    });
    const table_body = document.getElementById("box");
    if (table_body) {
        table_body.innerHTML = content;
    }
}
renderRecipes(recipes_list);
// -------------------- Form Submit --------------------
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", submit);
}
function submit(event) {
    event.preventDefault();
    const name_input = document.getElementById("r_name")
        .value;
    const type_input = document.getElementById("r_type")
        .value;
    const desc_input = document.getElementById("r_description").value;
    const recipe = {
        id: Date.now(),
        name: name_input,
        type: type_input,
        description: desc_input,
    };
    recipes_list.push(recipe);
    localStorage.setItem("recipes_list", JSON.stringify(recipes_list));
    renderRecipes(recipes_list);
}
// -------------------- Delete Recipe --------------------
function DeleteRecipe(id) {
    let recipes_list = JSON.parse(localStorage.getItem("recipes_list") || "[]");
    const newRecipe_list = recipes_list.filter((val) => val.id !== id);
    localStorage.setItem("recipes_list", JSON.stringify(newRecipe_list));
    window.location.reload();
}
// -------------------- Edit Recipe --------------------
function EditRecipe(id, name, type, description) {
    const edit = { id, name, type, description };
    localStorage.setItem("edit", JSON.stringify(edit));
    window.location.href = "http://127.0.0.1:5500/editRecipes.html";
}
// -------------------- Load Edit Recipe --------------------
function doEdit() {
    const editRecipe = JSON.parse(localStorage.getItem("edit") || "{}");
    if (!editRecipe)
        return;
    document.getElementById("e_id").value =
        editRecipe.id.toString();
    document.getElementById("e_name").value =
        editRecipe.name;
    document.getElementById("e_type").value =
        editRecipe.type;
    document.getElementById("e_description").value =
        editRecipe.description;
}
doEdit();
// -------------------- Edit Submit --------------------
function EditSubmit() {
    let recipes_list = JSON.parse(localStorage.getItem("recipes_list") || "[]");
    const editRecipe = JSON.parse(localStorage.getItem("edit") || "{}");
    const id_input = Number(document.getElementById("e_id").value);
    const name_input = document.getElementById("e_name")
        .value;
    const type_input = document.getElementById("e_type")
        .value;
    const desc_input = document.getElementById("e_description").value;
    const updatedRecipe = {
        id: id_input,
        name: name_input,
        type: type_input,
        description: desc_input,
    };
    const newRecipe_list = recipes_list.map((val) => val.id === editRecipe.id ? updatedRecipe : val);
    localStorage.setItem("recipes_list", JSON.stringify(newRecipe_list));
    localStorage.removeItem("edit");
    window.location.href = "http://127.0.0.1:5500/index.html";
}
// -------------------- Search / Filter --------------------
function changes() {
    const search = document.getElementById("search").value;
    let recipes_list = JSON.parse(localStorage.getItem("recipes_list") || "[]");
    if (search !== "") {
        recipes_list = recipes_list.filter((val) => val.name.includes(search) ||
            val.type.includes(search) ||
            val.description.includes(search));
    }
    renderRecipes(recipes_list);
}
