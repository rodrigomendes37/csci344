const original = {
    name: "Eve",
    age: 20,
    courses: ['CSCI 182', 'CSCI 344']
};

// Use spread operator to create a shallow copy
const copy = {...original};

// Modify the copy's name property
copy.name = "Eve Modified";

// Modify the copy's courses array (add a new course)
copy.courses.push('CSCI 370');

// Print both original and copy to see the difference
console.log("Original");
console.log(original);
console.log("Copy: ");
console.log(copy);