/**
 * Burger Module
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
import { BurgerItem } from '/burger-item';
import { BurgerEditItem } from './burger-edit-item';
import { DragDrop } from './drag-and-drop';
import { API } from './app-config';

/**
 * clearList method will remove all burger card dom elements
 * it should be called allways before going back to get new item list
 */
function clearList() {
  const parentSection = document.getElementById('burger-list');
  while (parentSection.firstChild) {
    parentSection.removeChild(parentSection.firstChild);
  }
}

/**
 * Private method to set counter with the title
 */
function setCounter(totalItems) {
  document.getElementById('total-items').textContent = totalItems;
}

/**
 * listBurgers method will create burger items from BurgerItem class.
 * Should be executed after a db modification to list burgers
 * @param items
 */
export function listBurgers(items) {
  for (let item of items) {
    new BurgerItem(item);

    document.getElementById('deleteBtn' + item._id).onclick = () => {
      return remove(item._id);
    };

    document.getElementById('editBtn' + item._id).onclick = () => {
      new BurgerEditItem(item);
    };
  }

  setCounter(items.length);

  /** 
   *  Instantiate DtagDrop class so it can be used with burger items,
   *  it should also be called when burger items are added or removed
   */
  new DragDrop();
}

/**
 * Service method to list all burgers from db.
 * Will be executed on app init, and after a db modification to list burgers
 */
export function getlList() {
  const Url = API;

  const otherParam = {
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    },
    method: 'GET'
  };

  /** Use ES6 native interface to replace XMLHttpRequest */
  fetch(Url, otherParam)
    .then(data => {
      return data.json();
    })
    .then(res => listBurgers(res))
    .catch(error => console.log(error));
}

/**
 * Service method to add a burger
 * @param {object} burger - burger obj to be added
 */
export function addBurger(burger) {
  const Url = `${API}burger`;
  const otherParam = {
    method: 'POST',
    body: burger
  };

  fetch(Url, otherParam)
    .then(data => {
      return data.json();
    })
    .then(res => {
      clearList();
      listBurgers(res);
    })
    .catch(error => console.log(error));
}

/**
 * Service method to remove burgers from db
 * @param {string} id - if no id is given, all burgers will be deleted
 */
export function remove(id = null) {
  const Url = `${API}burgers`;
  const data = id ? { _id: id } : {};
  const otherParam = {
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    },
    method: 'DELETE',
    body: JSON.stringify(data)
  };

  fetch(Url, otherParam)
    .then(data => {
      return data.json();
    })
    .then(res => {
      clearList();
      listBurgers(res);
    })
    .catch(error => console.log(error));
}

/**
 * Service method to update burgers from db
 * @param {string} id - if no id is given, all burgers will be deleted
 */
export function update(data = null) {
  const Url = `${API}burger`;
  const otherParam = {
    method: 'PUT',
    body: data
  };

  fetch(Url, otherParam)
    .then(data => {
      return data.json();
    })
    .then(res => {
      clearList();
      listBurgers(res);
    })
    .catch(error => console.log(error));
}

/**
 * 
 */
export function counterInit() {
    const counter = (() => {
        const input = document.getElementById('new-burger-text'),
        display = document.getElementById('counter-display'),
        changeEvent = (evt) => {
            const charsLeft = 300 - evt.target.value.length;

            if (charsLeft < 1) {
                display.classList.replace('success', 'error');
            } else {
                display.classList.replace('error', 'success');
            }
            
            display.innerHTML = charsLeft;
        },
        getInput = () => input.value,
        countEvent = () => input.addEventListener('keyup', changeEvent),
        init = () => countEvent();

        display.innerHTML = 300;

        return {
            init: init
        }

    })();

    counter.init();
}

/**
 * This function inserts first given DOM node after second given DOM node
 *
 * @param node - DOM node to insert
 * @param refNode - DOM node, after which first node should be inserted
 */
export function insertAfter(node, refNode) {
  const { parentNode } = refNode;
  const nextNode = refNode.nextElementSibling;
  if (nextNode) {
    parentNode.insertBefore(node, nextNode);
  } else {
    parentNode.appendChild(node);
  }
}

/**
 * This function returns position of given DOM node
 *
 * @param node - DOM node
 *
 * @returns {Object} { top, left }
 */
export function getDOMNodePosition(node) {
  const { top, left } = node.getBoundingClientRect();
  return { top, left };
}

/**
 * This function swaps to given DOM nodes, THAT COME ONE AFTER ANOTHER!
 *
 * @param node1 - first DOM node
 * @param node2 - second DOM node
 */
export function swapTwoDOMNodes(node1, node2) {
  if (node1.nextElementSibling === node2) {
    node1.parentNode.insertBefore(node2, node1);
  } else if (node2.nextElementSibling === node1) {
    node1.parentNode.insertBefore(node1, node2);
  }
}

