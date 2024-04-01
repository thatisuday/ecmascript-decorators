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
  field_public: string = "field_public_default";

  @myDecorator
  #field_private: string = "field_private_default";

  @myDecorator
  static field_static: string = "field_static_default";

  constructor(arg: string) {
    console.log("[constructor] arg =", arg);
    this.#field_private = arg;
  }

  describe() {
    console.log({
      field_public: this.field_public,
      field_private: this.#field_private,
      field_static: MyClass.field_static,
    });
  }
}

const m = new MyClass("field_arg_val");
// m.describe();
