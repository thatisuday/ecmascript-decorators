function obfuscate(target: Function, context: ClassSetterDecoratorContext) {
  console.log(`[obfuscate:${String(context.name)}] target =`, target);
  console.log(`[obfuscate:${String(context.name)}] context =`, context);

  context.addInitializer(function additionalInitializer() {
    console.log(`[additionalInitializer:${String(context.name)}] this =`, this);
  });

  function newSetter(val: string) {
    console.log(`[newSetter:${String(context.name)}] this =`, this);
    console.log(`[newSetter:${String(context.name)}] target =`, target);
    return target.call(this, val.replace("@", "(at)"));
  }

  console.log(`[obfuscate:${String(context.name)}] exiting`);
  return newSetter;
}

class User {
  #email: string;

  constructor(email: string) {
    console.log("[constructor]");
    this.#email = email;
  }

  get email(): string {
    return this.#email;
  }

  @obfuscate
  set email(val: string) {
    this.#email = val;
  }
}

const john = new User("john@doe.com");
console.log("john.email [before] =", john.email);
john.email = "john@doe.com";
console.log("john.email [after] =", john.email);
