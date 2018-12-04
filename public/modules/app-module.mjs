/**
 * This is the app entry module.
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
import {
    getlList,
    remove,
    addBurger,
    counterInit
} from './burger-module.mjs';
import { DragDrop } from './drag-and-drop.mjs';
import { fileLitsener } from './burger-core.mjs';

/** Add litseners Start */
    let burgerForm = document.getElementById('new-buerger-form');
    let cancelBtn = document.getElementById('cancelBtn');
    let createBtn = document.getElementById('createBtn');
    let deleteBtn = document.getElementById('deleteBtn')
    let addBtn = document.getElementById('addBtn');
    let imageNode = document.getElementById('file');
/** Add litseners End*/

/** Add actions Start */
    fileLitsener(imageNode, 'new-burger-image', 'newImage');

    addBtn.onclick = () => {
        let formData = new FormData();
        formData.append('img', document.getElementById('file').files[0]);
        formData.append('imgName', document.getElementById('file').files[0].name);
        formData.append('description', document.getElementById('new-burger-text').value);

        addBurger(formData);
    };

    createBtn.onclick = () => {
        createBtn.classList.toggle('hidden');
        burgerForm.classList.toggle('hidden');
    };

    cancelBtn.onclick = () => {
        createBtn.classList.toggle('hidden');
        burgerForm.classList.toggle('hidden');
    };

    deleteBtn.onclick = event => {
        return remove();
    };
/** Add actions End */

/** Call init methods */
    getlList();
    counterInit();
