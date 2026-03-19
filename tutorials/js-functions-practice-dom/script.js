// Exercise 1: Create a function declaration called createTodoItemHTML
// It should take a text parameter and return an HTML string for a <li> element
// Use template literals (backticks)
/*
function createTodoItemHTML(text) {
  return `<li>${text}</li>`;
}
*/

// Exercise 2: Rewrite createTodoItemHTML as an arrow function
// You can use the shorter implicit return syntax: (text) => `<li>${text}</li>`
//const createTodoItemHTML = (text) => `<li>${text}</li>`;

// Exercise 3: Create a function cleanTodoText that validates and cleans input
// Use .trim() to remove whitespace and return empty string if invalid
/*function cleanTodoText(text) {
   if (typeof text !== "string") return "";

    const cleaned = text.trim();
    if (cleaned === "") return "";

    return cleaned;
}
*/

// Exercise 4: Create a function addTodo that uses cleanTodoText and createTodoItemHTML
// Use insertAdjacentHTML('beforeend', htmlString) to add items to the list
/*
function addTodo(text) {
    const cleanedText = cleanTodoText(text);
    if (cleanedText === "") return false;

    const htmlString = createTodoItemHTML(cleanedText);
    todoList.insertAdjacentHTML("beforeend", htmlString);

    return true;
}*/

// Exercise 5: Modify createTodoItemHTML to accept a default className parameter
// Include the class in the template literal: `<li class="${className}">${text}</li>`
const createTodoItemHTML = (text, className = "todo-item") =>
  `<li class="${className}">${text}</li>`;

// Exercise 6: Create a function addTodoWithCount that tracks todo count
// Use your addTodo() function, then increment todoCount and update the display
/*let todoCount = 0;

function addTodoWithCount(text) {
    const added = addTodo(text);
    if (!added) return;

    todoCount++;

    const counterElement = document.querySelector('#todoCount');
    counterElement.textContent = `Todos: ${todoCount}`;
}
*/

// Exercise 7: Create a function handleAddClick for the button event
// Get the input value, use addTodoWithCount(), and clear the input field
function handleAddClick() {
  const todoInput = document.querySelector("#todoInput");
  const text = todoInput.value;

  addTodoWithCount(text);

  todoInput.value = "";
}

// Test your functions here (you can uncomment these as you complete each exercise):

// Exercise 1 & 2 tests:
/*
    const todoList = document.querySelector('#todoList');
    const html1 = createTodoItemHTML("Buy groceries");
    todoList.insertAdjacentHTML('beforeend', html1);
    const html2 = createTodoItemHTML("Finish homework");
    todoList.insertAdjacentHTML('beforeend', html2);
    const html3 = createTodoItemHTML("Call mom");
    todoList.insertAdjacentHTML('beforeend', html3);
*/

// Exercise 3 tests:
// console.log(cleanTodoText("  Buy groceries  "));  // Should return "Buy groceries"
// console.log(cleanTodoText(""));                   // Should return ""
// console.log(cleanTodoText("Finish homework"));    // Should return "Finish homework"

// Exercise 4 tests:
// addTodo("  Buy groceries  ");  // Should add "Buy groceries"
// addTodo("");                    // Should not add anything
// addTodo("Finish homework");     // Should add "Finish homework"

// Exercise 5 tests:
// const todoList = document.querySelector('#todoList');
// const html1 = createTodoItemHTML("Buy groceries");                    // Uses default 'todo-item'
// const html2 = createTodoItemHTML("Important task", "todo-item-urgent"); // Uses custom class
// todoList.insertAdjacentHTML('beforeend', html1);
// todoList.insertAdjacentHTML('beforeend', html2);

// Exercise 6 tests:
// addTodoWithCount("Buy groceries");
// addTodoWithCount("Finish homework");
// addTodoWithCount("Call mom");
// console.log("Total todos:", todoCount);  // Should print 3

// Exercise 7: Attach event handler (uncomment when ready):
const addButton = document.querySelector("#addBtn");
addButton.addEventListener("click", handleAddClick);
