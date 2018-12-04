/**
 * BurgerItem Class - use it to create a burger item card by giving it a db burger item
 * @author Lucas Frecia <frecialucas@gmail.com>
 */

import { BurgerCore } from './burger-core.mjs';

export class BurgerItem extends BurgerCore {
  /**
   * Pass an item with a burger from database
   * @param item
   */
  constructor(item) {
    super();
    
    /** Create constant that will hold full burger item with image, text and buttons */
    const parentSection = document.getElementById('burger-list');

    this.cardDiv = this.createCardContainer(item._id);
    this.imgDiv = this.createImgContainer();
    this.img = this.createImage(item.img);
    this.textDiv = this.createTextDiv();
    this.text = this.textNode(item.description);

    this.buttonContainer = this.createButtonContainer();

    this.deleteButton = this.createButton(
      ['button', 'delete'],
      { id: `deleteBtn${item._id}` },
      'Delete'
    );

    this.editButton = this.createButton(
      ['button', 'add'],
      { id: `editBtn${item._id}` },
      'Edit'
    );

    this.buttonContainer.appendChild(this.editButton);
    this.buttonContainer.appendChild(this.deleteButton);

    this.imgDiv.appendChild(this.img);
    this.textDiv.appendChild(this.text);
    this.cardDiv.appendChild(this.imgDiv);
    this.cardDiv.appendChild(this.textDiv);
    this.cardDiv.appendChild(this.buttonContainer);
    parentSection.appendChild(this.cardDiv);

    /** Append a divider for drag and drop logic */
    this.divider = this.createDivider();
    parentSection.appendChild(this.divider);
  }

 
}
