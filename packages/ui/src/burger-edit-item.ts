import { Item, html } from "common";
/**
 * BurgerEditItem Class - use it to display edit form for burger item
 * @author Lucas Frecia <frecialucas@gmail.com>
 */

import { BurgerCore, fileLitsener, validateImage } from "./burger-core";
import { update } from "./burger-module";

export class BurgerEditItem extends BurgerCore {
  /**
   * Pass an item with a burger from list
   * @param item
   */
  constructor(item: Item) {
    super();

    this.canccelOrRevertPrior();

    const selectedItem: HTMLElement | null = document.getElementById(
      item._id + ""
    ); // TODO check how could item._id be blog or not
    if (selectedItem != null) {
      selectedItem.classList.toggle("hidden");
      selectedItem.classList.toggle("hidden-card-item-placeholder");

      if (selectedItem.classList.contains("hidden")) {
        selectedItem.insertAdjacentHTML(
          "afterend",
          html`<div class="card" id="editing">
            <div id="editImage" class="image-container small-12 large-6">
              <img
                id="edit-burger-image"
                class="card-image"
                src="${item.img}"
                alt="Burger pic"
              />
            </div>
            <div class="container card-text">
              <textarea
                class="boxsize"
                id="edit-burger-text"
                maxlength="300"
                rows="6"
              >
 ${item.description} </textarea
              >
            </div>
            <div class="container card-text small-12 large-6">
              <input
                type="file"
                name="edit-file"
                id="edit-file"
                accept="image/*"
              />
            </div>
          </div>`
        );

        const buttonContainer: HTMLElement = this.createButtonContainer();
        const cancelButton = this.createButton(
          ["button", "delete"],
          { id: `cancelBtn${item._id}` },
          "Cancel"
        );

        const saveButton = this.createButton(
          ["button", "add"],
          { id: `addBtn${item._id}` },
          "Save"
        );

        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(cancelButton);

        document.getElementById("editing")?.appendChild(buttonContainer); // TODO remove ?

        const updateBtn = document.getElementById(`addBtn${item._id}`);
        // @ts-ignore
        fileLitsener(
          document.getElementById("edit-file"),
          "edit-burger-image",
          "editImage"
        );

        // @ts-ignore
        updateBtn.onclick = () => {
          console.log(item);
          const formData = new FormData();
          formData.append("_id", item._id);
          formData.append("position", item.position);
          // @ts-ignore
          formData.append("img", document.getElementById("edit-file").files[0]);
          // @ts-ignore
          formData.append(
            "imgName",
            document.getElementById("edit-file").files[0].name
          );
          // @ts-ignore
          formData.append(
            "description",
            document.getElementById("edit-burger-text").value
          );

          /** Validate img is valid, server will also check and throw error if invalid */
          // @ts-ignore
          if (
            !validateImage(document.getElementById("edit-file").files[0].name)
          )
            return;

          // @ts-ignore
          update(formData);
        };
      }
      // @ts-ignore
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
    let priorEditItemNode = document.getElementById("editing");
    if (priorEditItemNode) {
      priorEditItemNode.remove();
      let priorHiddenItemNode = document.getElementsByClassName(
        "hidden-card-item-placeholder"
      )[0];
      if (priorHiddenItemNode) {
        priorHiddenItemNode.classList.toggle("hidden-card-item-placeholder");
        priorHiddenItemNode.classList.toggle("hidden");
      }
    }
  }
}
