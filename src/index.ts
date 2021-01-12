/* eslint-disable @typescript-eslint/ban-types */
const data = {
  firstName: 'Jon',
  lastName: 'Snow',
  age: 25,
};

interface ISeer<D extends Record<string, unknown>> {
  data: D;
  observe<K extends keyof D>(property: K, signalHandler: () => any): void;
  notify(signal: string): void;
}

interface Seer {
  new <DataObj extends Record<string, unknown>>(
    dataObj: DataObj
  ): ISeer<DataObj>;
  <DataObj extends Record<string, unknown>>(dataObj: DataObj): ISeer<DataObj>;
}

const Seer: Seer = function <T extends Record<string, unknown>>(
  this: ISeer<T> | void,
  dataObj: T
) {
  const signals: Record<string, (() => any)[]> = {};

  observeData(dataObj);

  return {
    data: dataObj,
    observe,
    notify,
  };

  function observe(property: string, signalHandler: () => any) {
    if (!signals[property]) signals[property] = [];
    signals[property].push(signalHandler);
  }

  function notify(signal: string) {
    if (!signals[signal] || signals[signal].length < 1) return;
    signals[signal].forEach(signalhandler => signalhandler());
  }

  function makeReactive(obj: Record<string, unknown>, key: string) {
    let val = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(nValue) {
        val = nValue;
        notify(key);
      },
    });
  }

  function observeData(obj: Record<string, unknown>) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        makeReactive(obj, key);
      }
    }
  }
} as Seer;

const App = new Seer(data);

App.observe('age', () => console.log(App.data.age));

App.data.age = 49;
