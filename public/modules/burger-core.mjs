/**
 * BurgerCore class with helper methods
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
export class BurgerCore {
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

/**
 * fileLitsener should be called when a file input must render the image to show the user before posting
 * @param {HtmlDomObject} imageNode 
 * @param {string} idName 
 * @param {string} containerId 
 * @returns {void}
 */
export function fileLitsener(imageNode, idName, containerId) {
 imageNode.onchange = () => {
   let el = document.getElementById(idName);
   /** Remove prior image if it exists */
   if (el) {
     el.remove();
   }

   let file = imageNode.files[0];
   let reader = new FileReader();
   reader.onload = e => {
     let image = document.createElement('img');
     image.setAttribute('id', idName);
     image.classList.add('card-image');
     image.src = e.target.result;

     const imgDiv = document.getElementById(containerId);
     imgDiv.appendChild(image);
   };
   reader.readAsDataURL(file);
 };
}
