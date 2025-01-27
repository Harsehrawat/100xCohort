// Defining an interface 'Human' with properties and methods that any implementing class must follow
interface Human {
    name: string;
    age: number;
    greet(): void;
    isLegal(): boolean;
}

class HumanClass implements Human { 

    phone: number;

    constructor(public name: string, public age: number) {
        this.phone = 8222883; 
    }

    greet() {
        console.log(`Hey ${this.name}`);
    }

    isLegal() {
        return this.age > 17;
    }
}

let person = new HumanClass("Harsh", 22); // Using the capitalized class name
person.greet();  // Output: Hey Harsh
console.log(person.isLegal()); // Output: true
