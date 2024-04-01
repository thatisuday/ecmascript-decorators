function obfuscate<T, V extends string>(
  { get, set }: ClassAccessorDecoratorTarget<T, V>,
  context: ClassAccessorDecoratorContext<T, V>
): ClassAccessorDecoratorResult<T, V> {
  console.log(`[obfuscate:${String(context.name)}] context =`, context);

  context.addInitializer(function additionalInitializer() {
    console.log(`[additionalInitializer:${String(context.name)}] this =`, this);
  });

  return {
    get() {
      console.log(`[get():${String(context.name)}] this =`, this);
      return get.call(this).replace("@", "(at)") as V;
    },
    set(value) {
      console.log(`[set():${String(context.name)}] this =`, this);
      return set.call(this, value.replace("@", "(at)") as V);
    },
    init() {
      console.log(`[init():${String(context.name)}] this =`, this);
      return "user@domain.com" as V;
    },
  };
}

class User {
  @obfuscate
  accessor email: string;

  constructor(newValue: string) {
    const originalValue = this.email;
    console.log("[constructor] originalValue =", originalValue);
    this.email = newValue;
  }
}

const john = new User("john@doe.com");
console.log("john.email =", john.email);
