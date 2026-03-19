const students = [
    { name: "Alice", age: 20, grade: 85, major: "Computer Science" },
    { name: "Bob", age: 21, grade: 92, major: "Mathematics" },
    { name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
    { name: "Diana", age: 22, grade: 95, major: "Physics" },
    { name: "Eve", age: 20, grade: 88, major: "Computer Science" }
];

// Your code here (hint: use template literals)
const csMajors = students.filter((student) => student.major === "Computer Science");
const htmlStrings = csMajors.toSorted((a, b) => a.grade - b.grade).map((student) => {
    return `<p><strong>${student.name}:</strong> ${student.grade} (${student.major})</p>`;
});

console.log(htmlStrings);