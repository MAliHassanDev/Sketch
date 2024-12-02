interface BaseObject {
  [key: number | string | symbol]: string;
}

type BaseEvent = MouseEvent | TouchEvent | React.TouchEvent | React.MouseEvent;

export function createMapFromArray<T extends BaseObject>(
  key: keyof T,
  array: T[]
) {
  const map = new Map<keyof T, T>();
  array.forEach((value) => {
    map.set(value[key], value);
  });
}

export function removeLastArrayElement<T>(array: Array<T>) {
  return array.filter((_, index) => index !== array.length - 1);
}

export const isMouseEvent = (e: BaseEvent) => !("touches" in e);

export function getEventCords(e: BaseEvent) {
  const cords =
    "touches" in e
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
  return cords;
}
