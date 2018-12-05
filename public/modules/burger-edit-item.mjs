/**
 * BurgerEditItem Class - use it to display edit form for burger item
 * @author Lucas Frecia <frecialucas@gmail.com>
 */

import { BurgerCore, fileLitsener, validateImage } from './burger-core.mjs';
import { update } from './burger-module.mjs';

export class BurgerEditItem extends BurgerCore {
  /**
   * Pass an item with a burger from list
   * @param item
   */
  constructor(item) {
    super();

    this.canccelOrRevertPrior();

    let selectedItem = document.getElementById(item._id);
    selectedItem.classList.toggle('hidden');
    selectedItem.classList.toggle('hidden-card-item-placeholder');

    if (selectedItem.classList.contains('hidden')) {
      selectedItem.insertAdjacentHTML(
        'afterend',
        `
          <div class="card" id="editing" >
              <div id="editImage" class="image-container small-12 large-6">
                  <img id="edit-burger-image" class="card-image" src="${item.img}" alt="Burger pic" >
              </div>
              <div class="container card-text">
                  <textarea class="boxsize" id="edit-burger-text" maxlength="300" rows="6" > ${item.description} </textarea>
              </div>
              <div class="container card-text small-12 large-6" >
                  <input type="file" name="edit-file" id="edit-file" accept="image/*" >
              </div>
          </div>`
      );
      
      this.buttonContainer = this.createButtonContainer();

      this.cancelButton = this.createButton(
        ['button', 'delete'],
        { id: `cancelBtn${item._id}` },
        'Cancel'
      );

      this.saveButton = this.createButton(
        ['button', 'add'],
        { id: `addBtn${item._id}` },
        'Save'
      );

      this.buttonContainer.appendChild(this.saveButton);
      this.buttonContainer.appendChild(this.cancelButton);

      document.getElementById('editing').appendChild(this.buttonContainer);

      const updateBtn = document.getElementById(`addBtn${item._id}`);

      fileLitsener(document.getElementById('edit-file'), 'edit-burger-image', 'editImage');

      updateBtn.onclick = () => {
        console.log(item);
        let formData = new FormData();
        formData.append('_id', item._id);
        formData.append('position', item.position);
        formData.append('img', document.getElementById('edit-file').files[0]);
        formData.append('imgName', document.getElementById('edit-file').files[0].name);
        formData.append('description', document.getElementById('edit-burger-text').value);

        /** Validate img is valid, server will also check and throw error if invalid */
        if (!validateImage(document.getElementById('edit-file').files[0].name)) return;

        update(formData);
      };
        
      document.getElementById(`cancelBtn${item._id}`).onclick = () => {
        return this.canccelOrRevertPrior();
      };
    }
  }

  /**
   * canccelOrRevertPrior should revert card being edited to be shown and remove the edit form
   * @return {void}
   */
  canccelOrRevertPrior() {
    let priorEditItemNode = document.getElementById('editing');
    if (priorEditItemNode) {
      priorEditItemNode.remove();
      let priorHiddenItemNode = document.getElementsByClassName('hidden-card-item-placeholder')[0];
       if (priorHiddenItemNode) {
        priorHiddenItemNode.classList.toggle('hidden-card-item-placeholder');
         priorHiddenItemNode.classList.toggle('hidden');
       }
    }
  }
}
