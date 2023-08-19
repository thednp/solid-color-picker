/// <reference types="cypress" />
// @ts-nocheck

// import SHORTY from '../../src/index';
import * as SHORTY from '../../src/index';

import CustomElem from '../fixtures/custom-elem';

describe('Shorty Library Tests', () => {
  before(() => {
    cy.visit('cypress/test.html');
  });

  it('Test is folder', () => {
    const {
      isArray,
      isCustomElement,
      isDocument,
      isElement,
      isElementInScrollRange,
      isElementInViewport,
      isElementsArray,
      isCanvas,
      isFunction,
      isHTMLCollection,
      isHTMLElement,
      isHTMLImageElement,
      isJSON,
      isMedia,
      isMap,
      isWeakMap,
      isObject,
      isNode,
      isNodeList,
      isRTL,
      isScaledElement,
      isShadowRoot,
      isString,
      isNumber,
      isSVGElement,
      isTableElement,
      isWindow,
      getWindow,
      querySelector,
      // getElementsByTagName,
    } = SHORTY;

    cy.get('div').then($element => {
      // const win = getWindow($element[0]);
      const CE = new CustomElem();
      CE.className = 'btn btn-outline-primary';
      CE.style.transform = 'scale(1.01)';
      getWindow($element[0]).document.body.append(CE);
    })
    .wait(100)
    .get('.alert').then($element => {
      const element = $element[0];
      const win = getWindow(element);
      const CE = querySelector('custom-elem', win.document);
      // CE.className = 'btn btn-outline-primary';
      // CE.style.transform = 'scale(1.01)';
      // win.document.body.append(CE);
      const img = querySelector('img', element);
      const svg = querySelector('svg', element);
      const path = querySelector('path', element);
      const table = querySelector('table', win.document);

      expect(isArray(new Float32Array(0, 'a')), 'isArray(Float32Array)').to.be.false;
      expect(isArray(), 'isArray()').to.be.false;
      expect(isArray(element), 'isArray(node)').to.be.false;
      expect(isArray([0, 'a']), 'isArray([0, 1]])').to.be.true;
      expect(isArray(new Array(0, 'a')), 'isArray(new Array(0, 1)])').to.be.true;

      expect(isDocument(), 'isDocument()').to.be.false;
      expect(isDocument(win), 'isDocument(document)').to.be.false;
      expect(isDocument(document), 'isDocument(document)').to.be.true;
      expect(isDocument(win.document), 'isDocument(document)').to.be.true;

      expect(isElement(), 'isElement()').to.be.false;
      expect(isElement(win.document), 'isElement(document)').to.be.false;
      expect(isElement(win), 'isElement(window)').to.be.false;
      expect(isElement(element), 'isElement(node)').to.be.true;
      expect(isElement(win.document.body), 'isElement(body)').to.be.true;

      expect(isElementsArray(), 'isElementsArray()').to.be.false;
      expect(isElementsArray(win), 'isElementsArray(window)').to.be.false;
      expect(isElementsArray([0, 1]), 'isElementsArray(window)').to.be.false;
      expect(isElementsArray([...element.children]), 'isElementsArray(expected)').to.be.true;

      expect(isFunction(), 'isFunction()').to.be.false;
      expect(isFunction(element), 'isFunction(node)').to.be.false;
      expect(isFunction(element.addEventListener), 'isFunction(function)').to.be.true;

      expect(isObject(), 'isObject()').to.be.false;
      expect(isObject(element), 'isObject(node)').to.be.true;
      expect(isObject({ a: 2 }), 'isObject(object)').to.be.true;
      expect(isObject(element.addEventListener), 'isObject(function)').to.be.false;

      expect(isHTMLCollection(), 'isHTMLCollection()').to.be.false;
      expect(isHTMLCollection([...element.children]), 'isHTMLCollection(array)').to.be.false;
      expect(isHTMLCollection(element.children), 'isHTMLCollection(expected)').to.be.true;

      expect(isHTMLElement(), 'isHTMLElement()').to.be.false;
      expect(isHTMLElement(element), 'isHTMLElement(element)').to.be.true;
      expect(isHTMLElement(win), 'isHTMLElement(window)').to.be.false;
      expect(isHTMLElement(win.document.body), 'isHTMLElement(body)').to.be.true;
      expect(isHTMLElement(win.document.head), 'isHTMLElement(head)').to.be.true;
      expect(isHTMLElement(CE), 'isHTMLElement(CustomElement)').to.be.true;
      expect(isHTMLElement(CE.shadowRoot), 'isHTMLElement(CustomElement)').to.be.false;
      expect(isHTMLElement([...element.children]), 'isHTMLElement(array)').to.be.false;
      expect(isHTMLElement(win.document), 'isHTMLElement(document)').to.be.false;

      expect(isHTMLImageElement(), 'isHTMLImageElement()').to.be.false;
      expect(isHTMLImageElement(win.document), 'isHTMLImageElement(document)').to.be.false;
      expect(isHTMLImageElement(win), 'isHTMLImageElement(window)').to.be.false;
      expect(isHTMLImageElement(img), 'isHTMLImageElement(image)').to.be.true;
      expect(isHTMLImageElement(svg), 'isHTMLImageElement(svg)').to.be.false;
      expect(isHTMLImageElement(path), 'isHTMLImageElement(path)').to.be.false;

      expect(isMedia(), 'isMedia()').to.be.false;
      expect(isMedia(win.document), 'isMedia(document)').to.be.false;
      expect(isMedia(win), 'isMedia(window)').to.be.false;
      expect(isMedia(CE), 'isMedia(CustomElement)').to.be.false;
      expect(isMedia(img), 'isMedia(image)').to.be.true;
      expect(isMedia(svg), 'isMedia(svg)').to.be.true;
      expect(isMedia(path), 'isMedia(path)').to.be.true;

      expect(isCanvas(), 'isCanvas()').to.be.false;
      expect(isCanvas(win.document), 'isCanvas(document)').to.be.false;
      expect(isCanvas(win), 'isCanvas(window)').to.be.false;
      expect(isCanvas(CE), 'isCanvas(CustomElement)').to.be.false;
      expect(isCanvas(img), 'isCanvas(image)').to.be.false;
      expect(isCanvas(svg), 'isCanvas(svg)').to.be.false;
      expect(isCanvas(win.document.createElement('canvas')), 'isCanvas(canvas)').to.be.true;

      expect(isJSON(), 'isJSON()').to.be.false;
      expect(isJSON(win.document), 'isJSON(document)').to.be.false;
      expect(isJSON(win), 'isJSON(window)').to.be.false;
      expect(isJSON('some string'), 'isJSON(JSON)').to.be.false;
      expect(isJSON('{"a":1,"b":2}'), 'isJSON(JSON)').to.be.true;
      expect(isJSON('["a",2]'), 'isJSON(JSON)').to.be.true;

      expect(isMap(), 'isMap()').to.be.false;
      expect(isMap(win.document), 'isMap(document)').to.be.false;
      expect(isMap(win), 'isMap(window)').to.be.false;
      expect(isMap(new Map()), 'isMap(Map)').to.be.true;

      expect(isWeakMap(), 'isWeakMap()').to.be.false;
      expect(isWeakMap(win.document), 'isWeakMap(document)').to.be.false;
      expect(isWeakMap(win), 'isWeakMap(window)').to.be.false;
      expect(isWeakMap(new WeakMap()), 'isWeakMap(WeakMap)').to.be.true;

      expect(isElementInScrollRange(), 'isElementInScrollRange()').to.be.false;
      expect(isElementInScrollRange(win), 'isElementInScrollRange(window)').to.be.false;
      expect(isElementInScrollRange(CE), 'isElementInScrollRange(CustomElement)').to.be.true;
      expect(isElementInScrollRange(element), 'isElementInScrollRange(node)').to.be.true;

      expect(isElementInViewport(), 'isElementInScrollRange()').to.be.false;
      expect(isElementInViewport(win), 'isElementInScrollRange(window)').to.be.false;
      expect(isElementInViewport(CE), 'isElementInScrollRange(CustomElement)').to.be.true;
      expect(isElementInViewport(element), 'isElementInScrollRange(node)').to.be.true;

      expect(isNode(), 'isNode()').to.be.false;
      expect(isNode(img), 'isNode(image)').to.be.true;
      expect(isNode(svg), 'isNode(svg)').to.be.true;
      expect(isNode(path), 'isNode(path)').to.be.true;
      expect(isNode(win.document), 'isNode(document)').to.be.true;
      expect(isNode(win), 'isNode(window)').to.be.false;
      expect(isNode(CE), 'isNode(CustomElement)').to.be.true;

      expect(isNodeList(), 'isNodeList()').to.be.false;
      expect(isNodeList(element), 'isNodeList(node)').to.be.false;
      expect(isNodeList(element.children), 'isNodeList(HTMLCollection)').to.be.false;
      expect(isNodeList(element.querySelectorAll('*')), 'isNodeList(expected)').to.be.true;

      expect(isRTL(), 'isRTL()').to.be.false;
      expect(isRTL(element), 'isRTL(node)').to.be.false;
      expect(isRTL(win.document), 'isRTL(document)').to.be.false;

      expect(isScaledElement(), 'isScaledElement()').to.be.false;
      expect(isScaledElement(element), 'isScaledElement(node)').to.be.false;
      expect(isScaledElement(win), 'isScaledElement(window)').to.be.false;
      expect(isScaledElement(win.document), 'isScaledElement(document)').to.be.false;
      expect(isScaledElement(CE), 'isScaledElement(expected)').to.be.true;

      expect(isSVGElement(), 'isSVGElement()').to.be.false;
      expect(isSVGElement(element), 'isSVGElement(node)').to.be.false;
      expect(isSVGElement(win), 'isSVGElement(window)').to.be.false;
      expect(isSVGElement(win.document), 'isSVGElement(document)').to.be.false;
      expect(isSVGElement(CE), 'isSVGElement(CustomElement)').to.be.false;
      expect(isSVGElement(svg), 'isSVGElement(svg)').to.be.true;
      expect(isSVGElement(path), 'isSVGElement(path)').to.be.true;

      expect(isString(), 'isString()').to.be.false;
      expect(isString(element), 'isString(node)').to.be.false;
      expect(isString(element.nodeName), 'isString(nodeName)').to.be.true;
      expect(isString(element.nodeType), 'isString(number)').to.be.false;

      expect(isNumber(), 'isNumber()').to.be.false;
      expect(isNumber(element), 'isNumber(node)').to.be.false;
      expect(isNumber(element.nodeName), 'isNumber(nodeName)').to.be.false;
      expect(isNumber(element.nodeType), 'isNumber(nodeType)').to.be.true;
      expect(isNumber(0.55), 'isNumber(number)').to.be.true;
      expect(isNumber(-Infinity), 'isNumber(Infinity)').to.be.true;

      expect(isTableElement(), 'isTableElement()').to.be.false;
      expect(isTableElement(element), 'isTableElement(node)').to.be.false;
      expect(isTableElement(win), 'isTableElement(window)').to.be.false;
      expect(isTableElement(win.document), 'isTableElement(document)').to.be.false;
      expect(isTableElement(CE), 'isTableElement(CustomElement)').to.be.false;
      expect(isTableElement(table), 'isTableElement(table)').to.be.true;
      expect(isTableElement(querySelector('td', table)), 'isTableElement(TD)').to.be.true;
      expect(isTableElement(querySelector('th', table)), 'isTableElement(TH)').to.be.true;

      expect(isWindow(), 'isWindow()').to.be.false;
      expect(isWindow(win.document), 'isWindow(document)').to.be.false;
      expect(isWindow(document), 'isWindow(document)').to.be.false;
      expect(isWindow(win), 'isDocument(window)').to.be.true;
      expect(isWindow(win.top), 'isDocument(window)').to.be.true;
      expect(isWindow(window), 'isDocument(window)').to.be.true;
      expect(isWindow(window.top), 'isDocument(window)').to.be.true;

      expect(isCustomElement(), 'isCustomElement()').to.be.false;
      expect(isCustomElement(element), 'isCustomElement(node)').to.be.false;
      expect(isCustomElement(CE), 'isCustomElement(CustomElement)').to.be.true;
  
      expect(isShadowRoot(), 'isShadowRoot()').to.be.false;
      expect(isShadowRoot(element), 'isShadowRoot(element)').to.be.false;
      expect(isShadowRoot(document), 'isShadowRoot(document)').to.be.false;
      expect(isShadowRoot(CE.shadowRoot), 'isShadowRoot(CustomElement.shadowRoot)').to.be.true;
    });
  });
});
