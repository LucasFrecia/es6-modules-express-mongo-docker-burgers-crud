/**
 * BurgerItem Class - use it to create a burger item card by giving it a db burger item
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
export class BurgerItem {
  /**
   * Pass an item with a burger from database
   * @param item
   */
  constructor(item) {
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

  /**
   * createDivider should be called to create a divider after each butger item
   * this is important for dragAndDrop class to work
   * @return {HtmlDomElement} - divider <div> tag
   */
  createDivider() {
    let cardDivider = document.createElement('div');
    cardDivider.classList.add('divider');

    return cardDivider;
  }

  /**
   * createCardContainer will create the burger item card div container
   * @param {string} id - id that will act as a tag anchor
   * @return {HtmlDomElement} - will return a <div> container tag
   */
  createCardContainer(id) {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('id', id);

    return cardDiv;
  }

  /**
   * createImgContainer will return a burger image container as a div tag
   * @return {HtmlDomElement} 
   */
  createImgContainer() {
    let imgDiv = document.createElement('div');
    imgDiv.classList.add('image-container');
    imgDiv.classList.add('small-12');
    imgDiv.classList.add('large-6');

    return imgDiv;
  }

  /**
   * createTextDiv method will place the given text in a paragraph tag
   * @param {string} imgSrc
   * @returns {HtmlDomElement} - returns a <img> tag
   */
  createImage(imgSrc) {
    let img = document.createElement('img');
    img.classList.add('card-image');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', 'Burger pic');

    return img;
  }

  /**
   * createTextDiv method will place the given text in a paragraph tag
   * @returns {HtmlDomElement} - returns a <div> tag that will act as a paragraph container
   */
  createTextDiv() {
    let textDiv = document.createElement('div');
    textDiv.classList.add('container');
    textDiv.classList.add('card-text');
    textDiv.classList.add('small-12');
    textDiv.classList.add('large-6');

    return textDiv;
  }

  /**
   * textNode method will place the given text in a paragraph tag
   * @param text
   * @returns {HtmlDomElement} - returns a <p> tag with the given text
   */
  textNode(text) {
    let paragraph = document.createElement('p');
    let textNode = document.createTextNode(text);

    paragraph.appendChild(textNode);

    return paragraph;
  }

  /**
   * createButtonContainer method will return a countainer in which burger item buttons mst be placed
   * @returns {HtmlDomElement} - returns a <div> container tag
   */
  createButtonContainer() {
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('container');
    buttonDiv.classList.add('card-text');
    buttonDiv.classList.add('small-12');
    buttonDiv.classList.add('large-6');

    return buttonDiv;
  }

  /**
   * Method to create a burrger item button
   * @param {array} classArray - Array with css class names to be added.
   * @param {object} attributesObj - Object with attributes to be added.
   * @param {string} btnText - Button inner text.
   * @returns {HtmlDomElement} - returns the <button> tag
   */
  createButton(classArray, attributesObj, btnText) {
    let deleteButton = document.createElement('button');

    /** Loop through attributes to set them  */
    for (const [key, value] of Object.entries(attributesObj)) {
      deleteButton.setAttribute(key, value);
    }

    for (const classItem of classArray) {
      deleteButton.classList.add(classItem);
    }

    let deleteButtonText = document.createTextNode(btnText);
    deleteButton.appendChild(deleteButtonText);

    return deleteButton;
  }
}
