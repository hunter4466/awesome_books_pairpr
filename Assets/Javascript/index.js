
let formObjTitle = document.getElementById('book_title')
let formObjAuthor = document.getElementById('book_author')
let formObjButton = document.getElementById('add_button')
let booksListUl = document.getElementById('books_list')

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


  function buildHtml() { 
    let constArray = [];
    let mainBookContainer = create('ul')
    constArray.push([booksListUl,mainBookContainer,'main_grid_book',null,'main_grid_book'])
    let count = 0
    if(booksObj.head){
        let liObj = create('li')
        let titleObj = create('span')
        let authorObj = create('span')
        let removeBtn = create('button')
        constArray.push([mainBookContainer,liObj,'grid_book',null,'book1'])
        constArray.push([liObj,titleObj,'grid_book_title',booksObj.head.title])
        constArray.push([liObj,authorObj,'grid_book_author',booksObj.head.author])
        constArray.push([liObj,removeBtn,'grid_remove_btn','Remove','remove_0'])
//e1
        
        let tempObj = booksObj.head
        while(tempObj.next_node){
        count++
        let liObj2 = create('li')
        let titleObj2 = create('span')
        let authorObj2 = create('span')
        let removeBtn2 = create('button')
        constArray.push([mainBookContainer,liObj2,'grid_book',null,`book${count+1}`])
        constArray.push([liObj2,titleObj2,'grid_book_title',tempObj.next_node.title])
        constArray.push([liObj2,authorObj2,'grid_book_author',tempObj.next_node.author])
        constArray.push([liObj2,removeBtn2,'grid_remove_btn','Remove',`remove_${count}`])
        const innerCount = count
          //e2
        tempObj = tempObj.next_node
        }
    }
    constructor(constArray)
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

class newNode {
    constructor(title,author, next_node = null){
        this.title = title;
        this.author = author;
        this.next_node = next_node;
    }
}

class booksList {
    add(title, author){
        if(this.head){
            let newObj = new newNode(title,author)
            let lastNode = this.head

            while(lastNode.next_node){
                lastNode = lastNode.next_node
            }
            lastNode.next_node = newObj
        }
        else{
            let setHead = new newNode(title,author)
            this.head = setHead
        }
    }
    
//c
}

let booksObj = new booksList();

if(localStorage.getItem('booksList')){
    let headLess = JSON.parse(localStorage.getItem('booksList'))
    booksObj.head = headLess.head
}

formObjButton.addEventListener('click',(event)=>{
    event.preventDefault();
    
    let nbTitle = formObjTitle.value;
    let nbAuthor = formObjAuthor.value;
    booksObj.add(nbTitle, nbAuthor);
    if(storageAvailable('localStorage')){
        localStorage.setItem('booksList', JSON.stringify(booksObj));
    }
    if(document.getElementById('main_grid_book')){
        let removerVar = document.getElementById('main_grid_book');
        removerVar.remove();
    }
   buildHtml();
})
buildHtml();

    

   