function myDecorator(target, context: ClassFieldDecoratorContext) {
  console.log(`[myDecorator:${String(context.name)}] target =`, target);
  console.log(`[myDecorator:${String(context.name)}] context =`, context);

  context.addInitializer(function additionalInitializer() {
    console.log(`[additionalInitializer:${String(context.name)}] this =`, this);
  });

  function initializer(value: string) {
    console.log(`[initializer:${String(context.name)}] value =`, value);
    console.log(`[initializer:${String(context.name)}] this =`, this);
    return value?.toUpperCase() || "default";
  }

  console.log(`[myDecorator:${String(context.name)}] exiting`);

  return initializer;
}

const field3 = Symbol("field3");

class MyClass {
  @myDecorator
  field1: string;

  @myDecorator
  field2: string = "field2_default";

  @myDecorator
  [field3]: string = "field3_default";

  constructor(arg: string) {
    console.log("[constructor] arg =", arg);
    this[field3] = arg;
  }
}

const m = new MyClass("field_arg_val");
console.log("m =", m);
