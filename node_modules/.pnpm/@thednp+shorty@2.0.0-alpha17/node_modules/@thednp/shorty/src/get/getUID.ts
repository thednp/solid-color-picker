import isMap from '../is/isMap';

let elementUID = 0;
let elementMapUID = 0;

type KeyIdMap = Map<string | number, number>;
type IDMap = Map<number | string | HTMLElement, number | KeyIdMap>;

const elementIDMap: IDMap = new Map();

/**
 * Returns a unique identifier for popover, tooltip, scrollspy.
 *
 * @param element target element
 * @param key optional identifier key
 * @returns an existing or new unique ID
 */
const getUID = (element: HTMLElement, key?: string): number => {
  let result = key ? elementUID : elementMapUID;

  if (key) {
    const elID = getUID(element);
    const elMap = elementIDMap.get(elID) || (new Map() as KeyIdMap);
    if (!elementIDMap.has(elID)) {
      elementIDMap.set(elID, elMap);
    }
    if (isMap(elMap as KeyIdMap) && !(elMap as KeyIdMap).has(key)) {
      (elMap as KeyIdMap).set(key, result);
      elementUID += 1;
    } else result = (elMap as KeyIdMap).get(key) as number;
  } else {
    const elkey = element.id || element;

    if (!elementIDMap.has(elkey)) {
      elementIDMap.set(elkey, result);
      elementMapUID += 1;
    } else result = elementIDMap.get(elkey) as number;
  }
  return result;
};

export default getUID;
