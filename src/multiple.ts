function myDecorator1(target: Function, context: ClassMethodDecoratorContext) {
  console.log("myDecorator1()");
  context.addInitializer(function () {
    console.log("myDecorator1: addInitializer()");
  });

  return function () {
    return `myDecorator1(${target.call(this)})`;
  };
}

function myDecorator2(target: Function, context: ClassMethodDecoratorContext) {
  console.log("myDecorator2()");
  context.addInitializer(function () {
    console.log("myDecorator2: addInitializer()");
  });

  return function () {
    return `myDecorator2(${target.call(this)})`;
  };
}

class MyClass {
  @myDecorator1 @myDecorator2 myMethod(): string {
    return "myMethod";
  }
}

const m = new MyClass();
console.log("m.myMethod() =", m.myMethod());
