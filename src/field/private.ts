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

class MyClass {
  @myDecorator
  #field1: string;

  @myDecorator
  #field2: string = "field2_default";

  constructor(arg: string) {
    console.log("[constructor] arg =", arg);
    this.#field2 = arg;
  }

  describe() {
    console.log("[describe] field1=", this.#field1);
    console.log("[describe] field2=", this.#field2);
  }
}

const m = new MyClass("field_arg_val");
console.log("m =", m);
m.describe();
