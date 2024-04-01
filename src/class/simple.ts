type Constructor = new (...any: any) => any;

function logger<T extends Constructor>(
  target: T,
  context: ClassDecoratorContext<T>
) {
  return class Logger extends target {
    constructor(...args: any) {
      super(...args);
      console.log(`Creating an instance of the ${context.name}.`);
    }
  };
}

@logger
class Student {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  describe() {
    return `Student has ID: ${this.id}`;
  }
}

const student_1 = new Student(1);
console.log(student_1.describe());
