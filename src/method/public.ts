function myDecorator(target: Function, context: ClassMethodDecoratorContext) {
  console.log(`[myDecorator:${String(context.name)}] target =`, target);
  console.log(`[myDecorator:${String(context.name)}] context =`, context);

  context.addInitializer(function additionalInitializer() {
    console.log(`[additionalInitializer:${String(context.name)}] this =`, this);
    this[context.name] = this[context.name].bind(this);
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
  myMethod(): string {
    return `The message is: ${this.message}`;
  }
}

const m = new MyClass("Hello World");
console.log("m.myMethod() =", m.myMethod());
