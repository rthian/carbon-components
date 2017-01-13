import mixin from '../misc/mixin';
import createComponent from '../mixins/create-component';
import initComponent from '../mixins/init-component-by-search';
import '../polyfills/array-from';
import '../polyfills/custom-event';
import '../polyfills/element-matches';
import '../polyfills/object-assign';

class Pagination extends mixin(createComponent, initComponent) {
  /**
  * Pagination component.
  * @extends CreateComponent
  * @extends InitComponentBySearch
  * @param {HTMLElement} element The element working as a pagination component.
  * @param {Object} [options] The component options.
  * @property {string} [selectorInit] The CSS selector to find pagination components.
  * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
  * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
  * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
  * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
  * @property {string} [eventItemsPerPage]
  *   The name of the custom event fired when a user changes the number of items per page.
  *   event.detail.value contains the number of items a user wishes to see.
  * @property {string} [eventPageNumber]
  *   The name of the custom event fired when a user inputs a specific page number.
  *   event.detail.value contains the value that the user input.
  * @property {string} [eventPageChange]
  *   The name of the custom event fired when a user goes forward or backward a page.
  *   event.detail.direction contains the direction a user wishes to go.
  */
  constructor(element, options) {
    super(element, options);

    this.element.addEventListener('click', (evt) => {
      if (evt.target.matches(this.options.selectorPageBackward)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          direction: 'backward',
        };
        this.emitEvent(this.options.eventPageChange, detail);
      } else if (evt.target.matches(this.options.selectorPageForward)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          direction: 'forward',
        };
        this.emitEvent(this.options.eventPageChange, detail);
      }
    });

    this.element.addEventListener('input', (evt) => {
      if (evt.target.matches(this.options.selectorItemsPerPageInput)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          value: evt.target.value,
        };
        this.emitEvent(this.options.eventItemsPerPage, detail);
      } else if (evt.target.matches(this.options.selectorPageNumberInput)) {
        const detail = {
          initialEvt: evt,
          element: evt.target,
          value: evt.target.value,
        };
        this.emitEvent(this.options.eventPageNumber, detail);
      }
    });
  }

  /**
   * Dispatches a custom event
   * @param {String} evtName name of the event to be dispatched.
   * @param {Object} detail contains the original event and any other necessary details.
   */
  emitEvent = (evtName, detail) => {
    const event = new CustomEvent(`${evtName}`, {
      bubbles: true,
      cancelable: true,
      detail,
    });

    this.element.dispatchEvent(event);
  }
}

/**
 * The map associating DOM element and pagination instance.
 * @type {WeakMap}
 */
Pagination.components = new WeakMap();

/**
 * The component options.
 * If `options` is specified in the constructor, {@linkcode Pagination.create .create()}, or {@linkcode Pagination.init .init()},
 * properties in this object are overriden for the instance being create and how {@linkcode Pagination.init .init()} works.
 * @property {string} [selectorInit] The CSS selector to find pagination components.
 * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
 * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
 * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
 * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
 * @property {string} [eventItemsPerPage]
 *   The name of the custom event fired when a user changes the number of items per page.
 *   event.detail.value contains the number of items a user wishes to see.
 * @property {string} [eventPageNumber]
 *   The name of the custom event fired when a user inputs a specific page number.
 *   event.detail.value contains the value that the user input.
 * @property {string} [eventPageChange]
 *   The name of the custom event fired when a user goes forward or backward a page.
 *   event.detail.direction contains the direction a user wishes to go.
 */
Pagination.options = {
  selectorInit: '[data-pagination]',
  selectorItemsPerPageInput: '[data-items-per-page]',
  selectorPageNumberInput: '[data-page-number-input]',
  selectorPageBackward: '[data-page-backward]',
  selectorPageForward: '[data-page-forward]',
  eventItemsPerPage: 'itemsPerPage',
  eventPageNumber: 'pageNumber',
  eventPageChange: 'pageChange',
};

export default Pagination;
