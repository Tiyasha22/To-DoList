///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////Selectors//////////////////////////////////////////////////////////////////////////////
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoContainer = document.querySelector('.todo-container');
const filterOption = document.querySelector('.filter-todo');

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////Functions/////////////////////////////////////////////////////////////////////////////////////

///////////Add an item///////////
const addTodoItem = function (event) {
   //prevents form from submitting
   event.preventDefault();
   //create a todo div
   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');
   //create Li
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');
   todoDiv.appendChild(newTodo);
   //add todo to local storage
   saveLocalTodos(todoInput.value);
   //CHECK BUTTON
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class="fal fa-check-circle"></i>';
   completedButton.classList.add('complete-btn');
   todoDiv.appendChild(completedButton);
   //delete button
   const trashButton = document.createElement('button');
   trashButton.innerHTML = '<i class="fas fa-trash"></i>';
   trashButton.classList.add('trash-btn');
   todoDiv.appendChild(trashButton);
   //append to todo-list
   todoList.appendChild(todoDiv);
   //clear todo input field
   todoInput.value = '';
};

////////delete an item//////////

const deleteTodoItem = function (event) {
   const item = event.target;
   if (item.classList[0] === 'trash-btn') {
      const todo = item.parentElement;
      //add trasnition
      todo.classList.add('fall');
      removeLocalTodos(todo);
      //removes item after the end of transition
      todo.addEventListener('transitionend', function () {
         todo.remove();
      });
   }
   if (item.classList[0] === 'complete-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('completed');
   }
};
/////////////filter todo items/////////////

function filterItems(event) {
   //todoList.children returns a HTML Collection
   //to loop over,we use spread Operator to convert it to a normal array
   const todos = [...todoList.children];
   todos.forEach(function (todo) {
      switch (event.target.value) {
         case 'all':
            todo.style.display = 'flex';
            break;
         case 'completed':
            if (todo.classList.contains('completed')) {
               todo.style.display = 'flex';
            } else {
               todo.style.display = 'none';
            }
            break;
         case 'incomplete':
            if (!todo.classList.contains('completed')) {
               todo.style.display = 'flex';
            } else {
               todo.style.display = 'none';
            }
            break;
      }
   });
}

////////////saving the task in local storage////////////////

function saveLocalTodos(todo) {
   //check if a todo item already exists
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach(function (todo) {
      //create a todo div
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      //create Li
      const newTodo = document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      todoDiv.appendChild(newTodo);
      //CHECK BUTTON
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fal fa-check-circle"></i>';
      completedButton.classList.add('complete-btn');
      todoDiv.appendChild(completedButton);
      //delete button
      const trashButton = document.createElement('button');
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add('trash-btn');
      todoDiv.appendChild(trashButton);
      //append to todo-list
      todoList.appendChild(todoDiv);
   });
}

//remove items from localstorage
function removeLocalTodos(todo) {
   //todo->div which is selected on clicking on delete option
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   //navigating all the way through the div to its text content to be able to access it's index
   const todoIndex = todo.children[0].innerText;
   //deleting 1 element from the selected pos
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(todos));
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////Event Listeners/////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodoItem);
todoList.addEventListener('click', deleteTodoItem);
filterOption.addEventListener('click', filterItems);
