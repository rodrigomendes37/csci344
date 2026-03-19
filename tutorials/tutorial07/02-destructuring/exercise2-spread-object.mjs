const basicInfo = { name: "Diana", age: 22 };
const contactInfo = { email: "diana@example.com", phone: "555-1234" };

// Use spread operator to merge both objects into a new object
const merged = {...basicInfo, ...contactInfo};

// Print the result: console.log(merged);
console.log(merged);