function myDecorator(target: any, context: DecoratorContext): any {
  console.log("myDecorator() context =", context);

  context.addInitializer(function additionalInitializer() {
    console.log("additionalInitializer() context =", context);
  });

  if (context.kind === "class") {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        console.log("constructor() context =", context);
      }
    };
  } else if (context.kind === "method") {
    return function (...args: any[]) {
      console.log("method() context =", context);
      return target.call(this, ...args);
    };
  } else if (context.kind === "getter") {
    return function (...args: any[]) {
      console.log("getter() context =", context);
      return target.call(this, ...args);
    };
  } else if (context.kind === "setter") {
    return function (...args: any[]) {
      console.log("setter() context =", context);
      return target.call(this, ...args);
    };
  } else if (context.kind === "field") {
    return function () {
      console.log("field() context =", context);
    };
  } else if (context.kind === "accessor") {
    return {
      get(...args: any[]) {
        console.log("accessor.get() context =", context);
        return target.get.call(this, ...args);
      },
      set(...args: any[]) {
        console.log("accessor.set() context =", context);
        return target.set.call(this, ...args);
      },
      init() {
        console.log("accessor.init() context =", context);
        return "default";
      },
    };
  }
}

@myDecorator
class MyClass {
  constructor() {
    console.log("MyClass constructor");
  }

  @myDecorator myMethod() {}
  @myDecorator static myMethodStatic() {}

  @myDecorator get myGetterField() {
    return "myGetterField";
  }
  @myDecorator static get myGetterFieldStatic() {
    return "myGetterFieldStatic";
  }

  @myDecorator set mySetterField(val: string) {}
  @myDecorator static set mySetterFieldStatic(val: string) {}

  @myDecorator myField: string = "myField";
  @myDecorator static myFieldStatic: string = "myField";

  @myDecorator accessor myAccessor: string = "myAccessor";
  @myDecorator static accessor myAccessorStatic: string = "myAccessorStatic";

  @myDecorator myField2: string = "myField2";
  @myDecorator static myFieldStatic2: string = "myField2";
}

console.log("(=============)");
const m = new MyClass();
