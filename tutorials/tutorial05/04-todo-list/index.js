function addTodo() {
  // 1) Get the input element
  const input = document.querySelector("#todoInput");
  // 2) Get the value from the input (use .value property)
  const todoText = input.value;
  // 3) Get the ul element (the todo list)
  const list = document.querySelector("#todoList");
  // 4) Use insertAdjacentHTML('beforeend', '<li>...</li>') to add the item
  //    Make sure to include the todo text in the <li>
  list.insertAdjacentHTML("beforeend", "<li>" + todoText + "</li>");
  // 5) Clear the input field (set .value to empty string)
  input.value = "";
}