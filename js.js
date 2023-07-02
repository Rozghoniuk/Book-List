let listBook = document.querySelector('.listBook');
let readedBook = document.querySelector('.readedBook');
let droppedBook = document.querySelector('.droppedBook');
let input = document.querySelector('input');
let buttons = document.querySelectorAll('button');
let container = document.querySelectorAll('.container');

buttons[0].addEventListener('click', () => { 
  if (input.value !== "") {
    listBook.innerHTML += `<div class="item">
            <span class="active">${input.value}</span>
            <div class="btn_conteiner">
            <button class="save"></button>
            <button class="edit"></button>
            <button class="del"></button>
            </div>
          </div>`;
    saveData();
    input.value = "";
    input.placeholder = "write book's name";
  } else { 
    input.placeholder = "you must write something!!!"
  }
})

buttons[1].addEventListener('click', () => { 
  localStorage.removeItem('dataBook');
  location.reload();

})


container.forEach((el) => {
  el.addEventListener('click', (event) => { 
    let parent = event.target.parentElement.parentElement;
    let span = parent.querySelector('span');
    switch(event.target.className){ 
      case "del":
        parent.remove();
        saveData();
        break;
      case "edit":
        span.contentEditable = true;
        span.focus();
        break;
      case "save":
        span.contentEditable = false;
        saveData();
        break;
    }
  })
})
 


function saveData() {
  let dataBook = {
    listBook: listBook.innerHTML,
    readedBook: readedBook.innerHTML,
    droppedBook: droppedBook.innerHTML
  };
  localStorage.setItem('dataBook', JSON.stringify(dataBook));
 }

function getData() {
  let dataBook = JSON.parse(localStorage.getItem('dataBook'))
  if (dataBook) {
    listBook.innerHTML = dataBook.listBook;
    readedBook.innerHTML = dataBook.readedBook;
    droppedBook.innerHTML = dataBook.droppedBook;
  }
}


new Sortable(listBook, {
    animation: 150,
    ghostClass: 'blue-background-class',
  group: "shared",
    onSort: function () {
      saveData();
	}
});

new Sortable(readedBook, {
    animation: 150,
    ghostClass: 'blue-background-class',
    group: "shared",
    onSort: function () {
      saveData();
	}
});

new Sortable(droppedBook, {
    animation: 150,
    ghostClass: 'blue-background-class',
    group: "shared",
    onSort: function () {
      saveData();
	}
});

getData();

