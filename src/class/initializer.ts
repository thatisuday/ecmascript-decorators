type Constructor = {
  new (...any: any): any;
  logtag: string;
};

function logtag<T extends Constructor>(
  target: T,
  context: ClassDecoratorContext<T>
) {
  context.addInitializer(function () {
    this.logtag = `[${context.name}]`;
    console.log(`Initializer ran for the ${context.name} class.`);
  });
}

@logtag
class Student {
  static logtag: string;
  id: number;

  constructor(id: number) {
    this.id = id;
    console.log("Student constructor called.");
  }

  describe() {
    return `${Student.logtag}: Student has ID: ${this.id}`;
  }
}

const student_1 = new Student(1);
console.log(student_1.describe());
