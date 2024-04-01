type Constructor = new (...any: any) => any;

function myDecorator1(target: Constructor, context: ClassDecoratorContext) {
  console.log("myDecorator1()");
  context.addInitializer(function () {
    console.log("myDecorator1: addInitializer()");
  });

  return class extends target {
    myMethod(): string {
      return `myDecorator1(${super.myMethod()})`;
    }
  };
}

const decorators = {
  myDecorator2: function (target: Constructor, context: ClassDecoratorContext) {
    console.log("myDecorator2()");
    context.addInitializer(function () {
      console.log("myDecorator2: addInitializer()");
    });

    return class extends target {
      myMethod(): string {
        return `myDecorator2(${super.myMethod()})`;
      }
    };
  },
};

@myDecorator1
@decorators.myDecorator2
@(function (target: Constructor, context: ClassDecoratorContext) {
  console.log("myDecorator3()");
  context.addInitializer(function () {
    console.log("myDecorator3: addInitializer()");
  });

  return class extends target {
    myMethod(): string {
      return `myDecorator3(${super.myMethod()})`;
    }
  };
})
export default class MyClass {
  myMethod(): string {
    return "myMethod";
  }
}

const m = new MyClass();
console.log("m.myMethod() =", m.myMethod());
