// global variable
var bookName = document.getElementById("bookName");
var siteUrl = document.getElementById("siteUrl");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var submit = document.getElementById("submit");
var save = document.getElementById("save");
var cancel = document.getElementById("cancel");
var term;
booksContainer = [];
// display from localStorage
if (localStorage.getItem("fullBooks") != null) {
  booksContainer = JSON.parse(localStorage.getItem("fullBooks"));
  displayBook(booksContainer);
}
// add Item 
function addBook() {
  if (validationName() == true && validationSite() == true) {
    var books = {
      nameItem: bookName.value,
      siteUrl: siteUrl.value,
    };
    booksContainer.push(books);
    localStorage.setItem("fullBooks", JSON.stringify(booksContainer));
    displayBook(booksContainer);
    clearInput();
    matchItem()
  } else {
    if(bookName.value !=""){
      alertName.classList.replace("d-block" , "d-none")
    }
else{
  alertName.classList.replace("d-none" , "d-block")
  alertName.innerHTML="Name is required"
}
    alertUrl.classList.replace("d-none" , "d-block")
    alertUrl.innerHTML="Url Field is required"
    siteUrl.classList.add("is-invalid");
  }
}
// display items 
function displayBook(arr) {
  var allBooks = ``;
  for (var i = 0; i < arr.length; i++) {
    allBooks += `<div class="content mb-2 d-flex justify-content-between flex-flex-nowrap">
  <div class='w-50' >${arr[i].nameItem}</div>
  <div class="w-50 text-end d-flex justify-content-end"><a href="https://${arr[i].siteUrl}" target="_blank"class="me-1"><button class="btn btn-outline-warning btn-sm py-2 px-4 text-capitalize ">visit</button></a>
  <button class="btn btn-outline-danger btn-sm py-2 px-3 text-capitalize me-1" onclick="deleteBook(${i})"">delete</button>
  <button class="btn btn-outline-primary btn-sm py-2 px-3 text-capitalize" onclick="updateData(${i})"">update</button></div></div>
  `;
  }
  document.getElementById("contentInput").innerHTML = allBooks;
}
// clear input 
function clearInput() {
  bookName.value = "";
  siteUrl.value = "";
}
// delete item 
function deleteBook(index) {
  booksContainer.splice(index, 1);
  localStorage.setItem("fullBooks", JSON.stringify(booksContainer));
  displayBook(booksContainer);
}
// valitation Name
function validationName() {
  var regexName = /[\w+]/;
  if (regexName.test(bookName.value) == true) {
    bookName.classList.remove("is-invalid");
    alertName.classList.replace("d-block", "d-none");
    return true;
  } else {
    bookName.classList.add("is-invalid");
    alertName.classList.replace("d-none" , "d-block");
    return false;
  }
}
// validation Site 
function validationSite() {
  var regexSite = /^(w){3}\.\w+\.(com)$/ig;
  if (regexSite.test(siteUrl.value) == true) {
    console.log(regexSite.test(siteUrl.value));
    siteUrl.classList.remove("is-invalid");
    alertUrl.classList.replace("d-block", "d-none");

    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    alertUrl.classList.replace("d-none" , "d-block");
    alertUrl.innerHTML="Please Enter True Url"
    return false;
  }
}
function updateData(i){
  bookName.value=booksContainer[i].nameItem
  siteUrl.value=booksContainer[i].siteUrl
  siteUrl.classList.remove("is-invalid");
submit.classList.replace("d-block" , "d-none")
save.classList.replace("d-none" , "d-inlineblock")
cancel.classList.replace("d-none" , "d-inlineblock")
alertUrl.classList.replace("d-block" , "d-none");
alertName.classList.replace("d-block" , "d-none")
term = i
}
function saveUpdate(){
  booksContainer[term].nameItem=bookName.value
  booksContainer[term].siteUrl=siteUrl.value
  save.classList.replace("d-inlineblock" , "d-none")
cancel.classList.replace("d-inlineblock" , "d-none")
localStorage.setItem("fullBooks", JSON.stringify(booksContainer));
clearInput()
displayBook(booksContainer)
}
function cancelUpdate(){
  submit.classList.replace("d-none" , "d-block")
  save.classList.replace("d-inlineblock" , "d-none")
  cancel.classList.replace("d-inlineblock" , "d-none")
  clearInput()
}