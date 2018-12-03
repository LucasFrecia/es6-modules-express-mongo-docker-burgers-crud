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

/** Add litseners Start */
    let burgerForm = document.getElementById('new-buerger-form');
    let cancelBtn = document.getElementById('cancelBtn');
    let createBtn = document.getElementById('createBtn');
    let deleteBtn = document.getElementById('deleteBtn')
    let addBtn = document.getElementById('addBtn');
    let imageNode = document.getElementById('file');
/** Add litseners End*/

/** Add actions Start */
    imageNode.onchange = () => {
        let el = document.getElementById('new-burger-image');
        /** Remove prior image if it exists */
        if (el) { el.remove(); }

        let file = imageNode.files[0];
        let reader = new FileReader();
        reader.onload = e => {
            let image = document.createElement('img');
            image.setAttribute('id', 'new-burger-image');
            image.classList.add('card-image');
            image.src = e.target.result;

            const imgDiv = document.getElementById('newImage');
            imgDiv.appendChild(image);
        };
        reader.readAsDataURL(file);
    };

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
