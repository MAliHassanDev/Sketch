interface BaseObject{
  [key:number|string|symbol]: string,
}

export function createMapFromArray<T extends BaseObject>(key: keyof T, array: T[]) {
  const map = new Map<keyof T,T>();
  array.forEach(value => {
    map.set(value[key], value);
  });
}