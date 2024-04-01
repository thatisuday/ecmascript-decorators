type Constructor = new (...any: any) => any;

function logger(level: "INFO" | "ERROR") {
  console.log("logger()");

  return function decorator(
    target: Constructor,
    context: ClassDecoratorContext
  ) {
    console.log("decorator()");

    return class extends target {
      constructor(...args: any[]) {
        console.log("constructor()");

        super(...args);
        console.log(`[${level}]: An instance is being created.`);
      }
    };
  };
}

@logger("INFO")
class MyClass {
  constructor() {
    console.log("MyClass: constructor()");
  }
}
const m = new MyClass();
