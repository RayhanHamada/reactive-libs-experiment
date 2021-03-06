type InferValue<Prop extends PropertyKey, Desc> = Desc extends {
  get(): any;
  value: any;
}
  ? never
  : Desc extends { value: infer T }
  ? Record<Prop, T>
  : Desc extends { get(): infer T }
  ? Record<Prop, T>
  : never;

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor,
> = Desc extends { writable: any; set(val: any): any }
  ? never
  : Desc extends { writable: any; get(): any }
  ? never
  : Desc extends { writable: false }
  ? Readonly<InferValue<Prop, Desc>>
  : Desc extends { writable: true }
  ? InferValue<Prop, Desc>
  : Readonly<InferValue<Prop, Desc>>;

export function defineProperty<
  Obj extends Record<string, unknown>,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor
>(
  obj: Obj,
  p: Key,
  val: PDesc
): asserts obj is Obj & DefineProperty<Key, PDesc> {
  return Object.defineProperty(obj, p, val);
}

export function hasOwnProperty<
  Obj extends Record<string, unknown>,
  K extends keyof Obj
>(obj: Obj, key: K): boolean {
  return Boolean(obj[key]);
}
