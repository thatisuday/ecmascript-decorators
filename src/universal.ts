function decorator(value: any, context: DecoratorContext) {
  if (context.kind === "class") {
    console.log(`Decorating a class named ${context.name}`);
  } else if (context.kind === "method") {
    console.log(`Decorating a method named ${String(context.name)}`);
  } else {
    console.log("Decorating something else...");
  }
}

export default
@decorator
class {
  @decorator
  myMethod() {}
}
