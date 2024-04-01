let access: ClassMethodDecoratorContext["access"];

function myDecorator1(target: Function, context: ClassMethodDecoratorContext) {
  return function () {
    return `myDecorator1(${target.call(this)})`;
  };
}

function myDecorator2(target: Function, context: ClassMethodDecoratorContext) {
  access = context.access;

  return function () {
    return `myDecorator2(${target.call(this)})`;
  };
}

class MyClass {
  arg: string;

  constructor(arg: string) {
    this.arg = arg;
  }

  @myDecorator1
  @myDecorator2
  myMethod(): string {
    return `myMethod(${this.arg})`;
  }
}

const m = new MyClass("arg_value");
console.log("m.myMethod() =", m.myMethod());
console.log("access.myMethod() =", access.get(m).call(m));
