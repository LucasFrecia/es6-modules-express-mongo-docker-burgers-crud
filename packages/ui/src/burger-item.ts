/**
 * BurgerItem Class - use it to create a burger item card by giving it a db burger item
 * @author Lucas Frecia <frecialucas@gmail.com>
 */

import { BurgerCore } from './burger-core';

export class BurgerItem extends BurgerCore {
  /**
   * Pass an item with a burger from database
   * @param item
   */
  constructor(item) {
    super();
    
    /** Create constant that will hold full burger item with image, text and buttons */
    const parentSection = document.getElementById('burger-list');

    const cardDiv = this.createCardContainer(item._id);
    const imgDiv = this.createImgContainer();
    const img = this.createImage(item.img);
    const textDiv = this.createTextDiv();
    const text = this.textNode(item.description);

    const buttonContainer = this.createButtonContainer();

    const deleteButton = this.createButton(
      ['button', 'delete'],
      { id: `deleteBtn${item._id}` },
      'Delete'
    );

    const editButton = this.createButton(
      ['button', 'add'],
      { id: `editBtn${item._id}` },
      'Edit'
    );

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    imgDiv.appendChild(img);
    textDiv.appendChild(text);
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(textDiv);
    cardDiv.appendChild(buttonContainer);
    parentSection.appendChild(cardDiv);

    /** Append a divider for drag and drop logic */
    const divider = this.createDivider();
    parentSection.appendChild(divider);
  }
}
