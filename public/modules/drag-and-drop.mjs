import {
  insertAfter,
  removeDOMNode,
  getDOMNodePosition,
  swapTwoDOMNodes
} from './burger-module.mjs';

/**
 * DragDrop class
 * @author Lucas Frecia <frecialucas@gmail.com>
 */
export class DragDrop {
  constructor() {
    this.DIVIDER_HEIGHT = 10;

    /**
     * Duration of animation, in which dragging item is returning to it's place
     * after dragging has stopped
     */
    this.DURATION_OF_DRAGGING_ITEM_ANIMATION = 200;

    const listNode = document.getElementById('burger-list');

    const items = Array.from(listNode.getElementsByClassName('card'));

    this.isMouseDown = false;
    this.isDragging = false;
    this.draggingItem = null;
    this.draggingHasStarted = false;
    this.mouseOffsetX = null;
    this.mouseOffsetY = null;
    this.hasLastAnimationCompleted = true;

    /**
     * When starting dragging item, we remove it's bottom divider,
     * And when we stop dragging, we put that divider after item
     */
    this.savedDivider = null;

    items.forEach(item => {
      item.addEventListener('mousedown', () => {
        if (this.hasLastAnimationCompleted) {
          this.draggingItem = item;
          this.isMouseDown = true;
        }
      });

      item.ondragstart = () => false;
    });

    document.addEventListener('mouseup', () => {
      if (this.draggingItem && this.isDragging) {
        this.stopDraggingHandler();
      }
      this.isMouseDown = false;
      this.isDragging = false;
      this.draggingHasStarted = false;
      this.mouseOffsetX = null;
      this.mouseOffsetY = null;
    });

    document.addEventListener('mousemove', event => {
      this.isDragging = this.isMouseDown;
      if (this.isDragging) {
        this.handleDragging(event);
      }
    });
  }

  /**
   * This function handles starting of dragging item
   * What we need to do, when dragging has started?
   *
   * 1. Save offsetX and offsetY of mouse and dragging item
   * 2. Add 'draggable' class to dragging item class list
   * 3. Add 'not-animated' class to divider above the dragging item,
   *    Expand divider to the size of dragging item plus two divider's heights
   *    Remove 'not-animated' class from divider
   * 4. Save divider under dragging item and remove it from DOM
   */
  startDraggingHandler(event) {
    const dividerAbove = this.draggingItem.previousElementSibling;

    this.mouseOffsetX = event.pageX - getDOMNodePosition(this.draggingItem).left;
    this.mouseOffsetY = event.pageY - getDOMNodePosition(this.draggingItem).top;

    this.draggingItem.classList.add('draggable');

    dividerAbove.classList.add('not-animated');
    dividerAbove.style.height = `${10 * this.DIVIDER_HEIGHT + this.draggingItem.offsetHeight}px`;

    /**
     * The browser doesn't update transition property, changed by adding and then removing class,
     * because both changes are happening in a single javascript round, so browser takes its chance
     * to optimize the process and doesn't update transition property
     *
     * The solution is to try to access property value, it triggers browser to update
     * property we're trying to access
     *
     * See stackoverflow answer: https://stackoverflow.com/a/24195559
     */
    window.getComputedStyle(dividerAbove).getPropertyValue('transition');

    dividerAbove.classList.remove('not-animated');

    this.savedDivider = this.draggingItem.nextElementSibling;
    removeDOMNode(this.savedDivider);
  }

  /**
   * This function handles ending for dragging
   * What we need to do, when dragging has ended?
   *
   * 1. Add 'animated-draggable-item' class to dragging item
   * 2. Set top and left position to dragging item
   * 3. Wait, while animation will complete
   * 4. Remove 'draggable' class from dragging item class list
   * 5. Add 'not-animated' class to divider above the dragging item,
   *    Collapse divider to the size of usual divider height
   *    Remove 'not-animated' class from divider
   * 6. Restore saved divider and insert it after dragging item
   */
  stopDraggingHandler() {
    const dividerAbove = this.draggingItem.previousElementSibling;
    const dividerAbovePosition = getDOMNodePosition(dividerAbove);

    this.draggingItem.classList.add('animated-draggable-item');

    this.draggingItem.style.top = `${dividerAbovePosition.top + this.DIVIDER_HEIGHT}px`;
    this.draggingItem.style.left = `${dividerAbovePosition.left}px`;

    this.hasLastAnimationCompleted = false;

    setTimeout(() => {
      this.draggingItem.classList.remove('draggable');
      this.draggingItem.classList.remove('animated-draggable-item');

      dividerAbove.classList.add('not-animated');
      dividerAbove.style.height = `${this.DIVIDER_HEIGHT}px`;

      // see startDraggingHandler function for comment
      window.getComputedStyle(dividerAbove).getPropertyValue('transition');

      dividerAbove.classList.remove('not-animated');

      insertAfter(this.savedDivider, this.draggingItem);

      this.hasLastAnimationCompleted = true;
      this.draggingItem = null;
    }, this.DURATION_OF_DRAGGING_ITEM_ANIMATION);
  }

  handleDragging(event) {
    if (!this.draggingHasStarted) {
      this.startDraggingHandler(event);
      this.draggingHasStarted = true;
    }

    // Update dragging item position
    this.draggingItem.style.top = `${event.pageY - this.mouseOffsetY}px`;
    this.draggingItem.style.left = `${event.pageX - this.mouseOffsetX}px`;

    const draggingItemCoordinates = getDOMNodePosition(this.draggingItem);

    /**
     * <div class="divider"></div>             | Divider above previous card
     * <div class="card"> ... </div>           | Previous card before dragging card
     * <div class="divider"></div>             | Divider between previous and dragging items
     * <div class="card draggable"> ... </div> | ** Dragging card **
     * <div class="card"> ... </div>           | Next card after dragging card
     * <div class="divider"></div>             | Divider under next card
     */
    const prevItem = this.draggingItem.previousElementSibling.previousElementSibling;
    const nextItem = this.draggingItem.nextElementSibling;

    /**
     * We should swap dragging item with previous item when:
     *
     * 1. Previous item exists
     * 2. Y center coordinate of dragging item is less than Y center coordinate of previous item
     */
    if (prevItem) {
      const prevItemCoordinates = getDOMNodePosition(prevItem);
      const shouldSwapItems = draggingItemCoordinates.top + this.draggingItem.offsetHeight / 2 < prevItemCoordinates.top + prevItem.offsetHeight / 2;

      if (shouldSwapItems) {
        const dividerAboveDraggingItem = this.draggingItem.previousElementSibling;
        const dividerAbovePrevItem = prevItem.previousElementSibling;

        dividerAboveDraggingItem.style.height = `${this.DIVIDER_HEIGHT}px`;

        swapTwoDOMNodes(this.draggingItem, dividerAboveDraggingItem);
        swapTwoDOMNodes(this.draggingItem, prevItem);

        dividerAbovePrevItem.style.height = `${this.draggingItem.offsetHeight + 2 * this.DIVIDER_HEIGHT}px`;

        return;
      }
    }

    /**
     * We should swap dragging item with next item when:
     *
     * 1. Previous item exists
     * 2. Y center coordinate of dragging item is more than Y center coordinate of next item
     */
    if (nextItem) {
      const nextItemCoodridanes = getDOMNodePosition(nextItem);
      const shouldSwapItems = draggingItemCoordinates.top + this.draggingItem.offsetHeight / 2 > nextItemCoodridanes.top + nextItem.offsetHeight / 2;

      if (shouldSwapItems) {
        const dividerAboveDraggingItem = this.draggingItem.previousElementSibling;
        const dividerUnderNextItem = nextItem.nextElementSibling;

        dividerAboveDraggingItem.style.height = `${this.DIVIDER_HEIGHT}px`;

        swapTwoDOMNodes(this.draggingItem, nextItem);
        swapTwoDOMNodes(this.draggingItem, dividerUnderNextItem);

        dividerUnderNextItem.style.height = `${this.draggingItem.offsetHeight + 2 * this.DIVIDER_HEIGHT}px`;
      }
    }
  }
}
