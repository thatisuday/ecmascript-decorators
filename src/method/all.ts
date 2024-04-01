function myDecorator(target: Function, context: ClassMethodDecoratorContext) {
  console.log(`[myDecorator:${String(context.name)}] target =`, target);
  console.log(`[myDecorator:${String(context.name)}] context =`, context);

  context.addInitializer(function additionalInitializer() {
    console.log(`[additionalInitializer:${String(context.name)}] this =`, this);
  });

  function newMethod(...args: any[]) {
    console.log(`[newMethod:${String(context.name)}] this =`, this);
    const targetValue = target.call(this, ...args);
    return `[newMethod] ${targetValue}`;
  }

  console.log(`[myDecorator:${String(context.name)}] exiting`);
  return newMethod;
}

class MyClass {
  message: string;

  constructor(message: string) {
    console.log("[constructor]");
    this.message = message;
  }

  @myDecorator
  myMethod_instance_public(): string {
    return `The message is: ${this.message}`;
  }

  @myDecorator
  #myMethod_instance_private(): string {
    return `The message is: ${this.message}`;
  }

  @myDecorator
  static #myMethod_static_private(): string {
    return `The message is: ${this.name}`;
  }

  @myDecorator
  static myMethod_static_public(): string {
    return `The message is: ${this.name}`;
  }
}

const m = new MyClass("Hello World");
