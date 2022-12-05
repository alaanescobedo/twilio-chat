export async function tryToCatch<T>(fn: Function, ...args: any): Promise<[null, T] | [any, null]> {
  try {
    return [null, await fn(...args)];
  }
  catch (err) {
    return [err, null];
  }
};

export const tryToCatchSync = <T>(fn: Function, ...args: any): [null, T] | [any] => {
  try {
    return [null, fn(...args)];
  }
  catch (err) {
    return [err];
  }
}
