/* eslint-disable @typescript-eslint/ban-types */
import { Seer } from './index';

const App = new Seer({
  count: 1,
});
const eel = document.querySelector('h1') as HTMLHeadingElement
App.syncNode(eel, 'count', ({count}) => eel.textContent = `${count}`)

document.querySelector('button')?.addEventListener('click', function () {
  App.data.count += 1;
});

/**
 * CreateApp returns AddRootParam | explain method
 */

class ApaAja {
  /**
   * @type {any}
   */
  [k: string]: any;

  addPlugin<NamaPlugin extends string, Plugin>(
    nama: NamaPlugin,
    pluginObj: Plugin
  ): this & Record<NamaPlugin, Plugin> {
    this[nama as string] = pluginObj;

    return this;
  }
}

type HTMLElementTagNameMap = globalThis.HTMLElementTagNameMap;

type CreateElement = <Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag
) => HTMLElementTagNameMap[Tag];

const createElement: CreateElement = function (tag) {
  const el = document.createElement(tag);
  // make it reactive here
  App.syncNode(el, 'count', ({count}) => {
    el.textContent = `${count}`;
  });
  return el;
};