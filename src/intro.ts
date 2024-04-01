// define a decorator for class method
function myDecorator(method, context) {
  // return a function to replace the original method
  return function newMethod() {
    console.log("running newMethod");
    method.call(this);
    console.log("exiting newMethod");
  };
}

// declare a class
class MyClass {
  // decorate method
  @myDecorator
  myMethod() {
    console.log("running myMethod");
  }
}

// create an instance and call the method
const m = new MyClass();
m.myMethod();
