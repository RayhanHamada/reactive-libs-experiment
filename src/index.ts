/* eslint-disable @typescript-eslint/ban-types */

import { defineProperty, hasOwnProperty } from './utils';

interface ISeer<D extends Record<string, unknown>> {
  data: D;
  observe<K extends keyof D>(
    property: K,
    signalHandler: (data: D) => void
  ): void;
  notify(signal: string): void;
  syncNode<H extends HTMLElement>(
    el: H,
    property: keyof D,
    fn: (data: D) => void
  ): void;
}

interface Seer {
  new <DataObj extends Record<string, unknown>>(data: DataObj): ISeer<DataObj>;
  <DataObj extends Record<string, unknown>>(data: DataObj): ISeer<DataObj>;
}

export const Seer: Seer = function <T extends Record<string, unknown>>(
  this: ISeer<T>,
  data: T
) {
  const signals: Record<string, ((data: T) => void)[]> = {};

  observeData(data);

  return {
    data: data,
    observe,
    notify,
    syncNode,
  };

  function observe(property: keyof T, signalHandler: (data: T) => void) {
    const _property = property as string;

    if (!signals[_property]) signals[_property] = [];
    signals[_property].push(signalHandler);
  }

  function notify(signal: keyof T) {
    const _sig = signal as string;
    if (!signals[_sig] || signals[_sig].length < 1) return;
    signals[_sig].forEach(signalhandler => signalhandler(data));
  }

  function makeReactive(obj: T, key: keyof T) {
    let val = obj[key];

    defineProperty(obj, key, {
      get() {
        return val;
      },
      set(nValue) {
        val = nValue;
        notify(key);
      },
    });
  }

  function observeData(obj: T) {
    for (const key in obj) {
      if (hasOwnProperty(obj, key)) {
        makeReactive(obj, key);
      }
    }
  }

  function syncNode<H extends HTMLElement>(
    node: H,
    property: keyof T,
    fn: (data: T) => void
  ) {
    node.textContent = data[property] as string;

    observe(property, fn);
  }
} as Seer;
