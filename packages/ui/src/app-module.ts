/**
 * This is the app entry module.
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
import { getlList, remove, addBurger, counterInit } from "./burger-module";
import { fileLitsener, validateImage } from "./burger-core";

/** Add litseners Start */
let burgerForm = document.getElementById("new-buerger-form");
let cancelBtn = document.getElementById("cancelBtn");
let createBtn = document.getElementById("createBtn");
let deleteBtn = document.getElementById("deleteBtn");
let addBtn = document.getElementById("addBtn");
let imageNode: HTMLInputElement = document.getElementById("file");
/** Add litseners End*/

/** Add actions Start */
if (imageNode) {
  fileLitsener(imageNode, "new-burger-image", "newImage");
}

addBtn.onclick = () => {
  const file = document.getElementById("file").files[0];

  if (!file) {
    alert("Please choose an image...");
    return;
  }

  let formData = new FormData();
  formData.append("img", file);
  formData.append("imgName", file.name);
  formData.append(
    "description",
    document.getElementById("new-burger-text").value
  );

  /** Validate img is valid, server will also check and throw error if invalid */
  if (!validateImage(file.name)) return;

  createBtn.classList.toggle("hidden");
  burgerForm.classList.toggle("hidden");
  addBurger(formData);
};

createBtn.onclick = () => {
  createBtn.classList.toggle("hidden");
  burgerForm.classList.toggle("hidden");
};

cancelBtn.onclick = () => {
  createBtn.classList.toggle("hidden");
  burgerForm.classList.toggle("hidden");
};

deleteBtn.onclick = (event) => {
  return remove();
};
/** Add actions End */

/** Call init methods */
getlList();
counterInit();
