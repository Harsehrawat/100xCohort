// make a teacher ,student and a subject interface , teacher w/ name and subject and student as name ,age, and 1 compulsory and may or may not contain 1 optional subject , subject containing compulsory and optional subject

interface Subject {
    compulsory_Subject: string;
    optional_Subject?: string;
}

interface Teacher {
    name: string;
    subject: Subject;
}

interface Student {
    name: string;
    age: number;
    subject: Subject;
}

let student: Student = {
    name: "Harsh",
    age: 22,
    subject: {
        compulsory_Subject: "Math"
    }
};

console.log("Student Name: ");
console.log(`${student.name}`);
console.log(`${student.subject.compulsory_Subject}`);
console.log(`${student.subject.optional_Subject}`);

let teacher : Teacher = {
    name : "Mr. Mahato",
    subject : {
        compulsory_Subject : "Math",
        optional_Subject : "Sciene",
    }
}

console.log("Teacher Details : ");
console.log(`${teacher.name}`);
console.log(`${teacher.subject}`);  // as it's not pointing to any exact var . but pointing to a obj. o/p would be {[object Object]} .
