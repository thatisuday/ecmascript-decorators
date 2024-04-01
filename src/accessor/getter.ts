function obfuscate(target: Function, context: ClassGetterDecoratorContext) {
  console.log(`[obfuscate:${String(context.name)}] target =`, target);
  console.log(`[obfuscate:${String(context.name)}] context =`, context);

  context.addInitializer(function additionalInitializer() {
    console.log(`[additionalInitializer:${String(context.name)}] this =`, this);
  });

  function newGetter() {
    console.log(`[newGetter:${String(context.name)}] this =`, this);
    console.log(`[newGetter:${String(context.name)}] target =`, target);
    return target.call(this).replace("@", "(at)");
  }

  console.log(`[obfuscate:${String(context.name)}] exiting`);
  return newGetter;
}

class User {
  #email: string;

  constructor(email: string) {
    console.log("[constructor]");
    this.#email = email;
  }

  @obfuscate
  get email(): string {
    return this.#email;
  }
}

const john = new User("john@doe.com");
console.log("john.email =", john.email);
