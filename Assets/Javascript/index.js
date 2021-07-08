const formObjTitle = document.getElementById('book_title');
const formObjAuthor = document.getElementById('book_author');
const formObjButton = document.getElementById('add_button');
const booksListUl = document.getElementById('books_list')
const navigationArray = [[],[]];
navigationArray[0].push(document.getElementById('link1'))
navigationArray[0].push(document.getElementById('link2'))
navigationArray[0].push(document.getElementById('link3'))
navigationArray[1].push(document.getElementById('sec_1'))
navigationArray[1].push(document.getElementById('sec_2'))
navigationArray[1].push(document.getElementById('sec_3'))

function create(obj) { return document.createElement(obj); }
function constructor(obj) {
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].length === 2) {
      obj[i][0].appendChild(obj[i][1]);
    } else if (obj[i].length === 3) {
      const [a, b, c] = obj[i];
      a.appendChild(b);
      b.className = c;
    } else if (obj[i].length === 4) {
      const [a, b, c, d] = obj[i];
      if (c == null) {
        a.appendChild(b);
        b.innerHTML = d;
      } else {
        a.appendChild(b);
        b.className = c;
        b.innerHTML = d;
      }
    } else if (obj[i].length === 5) {
      const [a, b, c, d, e] = obj[i];
      if (c == null && d == null) {
        a.appendChild(b);
        b.id = e;
      } else if (c == null) {
        a.appendChild(b);
        b.innerHTML = d;
        b.id = e;
      } else if (d == null) {
        obj[i][0].appendChild(b);
        b.className = c;
        b.id = e;
      } else {
        obj[i][0].appendChild(b);
        b.innerHTML = d;
        b.className = c;
        b.id = e;
      }
    }
  }
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22
              || e.code === 1014
              || e.name === 'QuotaExceededError'
              || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
              && (storage && storage.length !== 0);
  }
}

function NewNode(title, author, nextNode = null) {
  this.title = title;
  this.author = author;
  this.nextNode = nextNode;
}

class BooksListCl {
  add(title, author) {
    if (this.head) {
      const newObj = new NewNode(title, author);
      let lastNode = this.head;

      while (lastNode.nextNode) {
        lastNode = lastNode.nextNode;
      }
      lastNode.nextNode = newObj;
    } else {
      const setHead = new NewNode(title, author);
      this.head = setHead;
    }
  }

  clear(index) {
    if (index === 0) {
      this.head = this.head.nextNode;
    } else {
      let recentNodeBack = this.head;
      let recentNode = this.head;
      for (let i = 0; i < index - 1; i += 1) {
        recentNodeBack = recentNodeBack.nextNode;
      }
      for (let i = 0; i < index + 1; i += 1) {
        recentNode = recentNode.nextNode;
      }
      recentNodeBack.nextNode = null;
      const onHold1 = recentNodeBack;
      const onHold2 = recentNode;
      onHold1.nextNode = onHold2;
    }
  }

  count() {
    if (this.head) {
      let objectsArr = this.head;
      let count = 0;
      while (objectsArr.nextNode) {
        count += 1;
        objectsArr = objectsArr.nextNode;
      }
      return count - 1;
    }
    return 0;
  }
}

const booksObj = new BooksListCl();

if (localStorage.getItem('booksList')) {
  const headLess = JSON.parse(localStorage.getItem('booksList'));
  booksObj.head = headLess.head;
}

function buildHtml(addActive) {
  const constArray = [];
  const mainBookContainer = create('ul');
  constArray.push([booksListUl, mainBookContainer, 'main_grid_book', null, 'main_grid_book']);
  let count = 0;
  if (booksObj.head) {
    const liObj = create('li');
    const titleObj = create('span');
    const authorObj = create('span');
    const removeBtn = create('button');
    constArray.push([mainBookContainer, liObj, 'grid_book', null, 'book1']);
    constArray.push([liObj, titleObj, 'grid_book_title', booksObj.head.title]);
    constArray.push([liObj, authorObj, 'grid_book_author', booksObj.head.author]);
    constArray.push([liObj, removeBtn, 'grid_remove_btn', 'Remove', 'remove_0']);

    removeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      liObj.remove();
      booksObj.clear(0);
      if (storageAvailable('localStorage')) {
        localStorage.setItem('booksList', JSON.stringify(booksObj));
      }
    });

    let tempObj = booksObj.head;
    while (tempObj.nextNode) {
      count += 1;
      const liObj2 = create('li');
      const titleObj2 = create('span');
      const authorObj2 = create('span');
      const removeBtn2 = create('button');

      const innerCount = count;
      if (addActive) {
        if (innerCount === booksObj.count() + 1) {
          constArray.push([mainBookContainer, liObj2, 'grid_book_last', null, `book${count + 1}`]);
          constArray.push([liObj2, titleObj2, 'grid_book_title_last', tempObj.nextNode.title]);
          constArray.push([liObj2, authorObj2, 'grid_book_author_last', tempObj.nextNode.author]);
          constArray.push([liObj2, removeBtn2, 'grid_remove_btn_last', 'Remove', `remove_${count}`]);
        } else {
          constArray.push([mainBookContainer, liObj2, 'grid_book', null, `book${count + 1}`]);
          constArray.push([liObj2, titleObj2, 'grid_book_title', tempObj.nextNode.title]);
          constArray.push([liObj2, authorObj2, 'grid_book_author', tempObj.nextNode.author]);
          constArray.push([liObj2, removeBtn2, 'grid_remove_btn', 'Remove', `remove_${count}`]);
        }
      } else {
        constArray.push([mainBookContainer, liObj2, 'grid_book', null, `book${count + 1}`]);
        constArray.push([liObj2, titleObj2, 'grid_book_title', tempObj.nextNode.title]);
        constArray.push([liObj2, authorObj2, 'grid_book_author', tempObj.nextNode.author]);
        constArray.push([liObj2, removeBtn2, 'grid_remove_btn', 'Remove', `remove_${count}`]);
      }

      removeBtn2.addEventListener('click', (event) => {
        event.preventDefault();
        liObj2.remove();

        booksObj.clear(innerCount);
        if (storageAvailable('localStorage')) {
          localStorage.setItem('booksList', JSON.stringify(booksObj));
        }
      });

      tempObj = tempObj.nextNode;
    }
  }
  constructor(constArray);
}

formObjButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (formObjTitle.value !== '' && formObjAuthor.value !== '') {
    const nbTitle = formObjTitle.value;
    const nbAuthor = formObjAuthor.value;
    booksObj.add(nbTitle, nbAuthor);
    if (storageAvailable('localStorage')) {
      localStorage.setItem('booksList', JSON.stringify(booksObj));
    }
    if (document.getElementById('main_grid_book')) {
      const removerVar = document.getElementById('main_grid_book');
      removerVar.remove();
    }
    buildHtml(true);
    formObjTitle.value = '';
    formObjAuthor.value = '';
  }
});

buildHtml(false);
onLoadMain = true
console.log(navigationArray)
for(let i = 0;i<navigationArray[0].length;i += 1){
  navigationArray[0][i].addEventListener('click',(event)=>{
    event.preventDefault();
    for(let x = 0;x <navigationArray[1].length; x += 1){
      if(i == x){
        navigationArray[1][x].style = "animation-name: section_show_anim; animation-duration: 0.7s; display: inline;"
      }else{
        navigationArray[1][x].style = "animation-name: section_close_anim; animation-duration: 0.7s; left: -100vw; display: inline;"
      }
    }

  })

}







