const current_date = document.querySelector(".currentDate");
const current_day = document.querySelector(".currentDay");
const inputText = document.querySelector(".todo_input_text");
const addBtn = document.querySelector(".todo_add_btn");
const list_Div = document.querySelector(".list_Div");
let current_value;
const TODOS_LS = "todos"; //로컬스토리지
let todos = [];

/* 현재 날짜 요일 설정 */
const today_date = new Date();
const year = today_date.getFullYear(); //연도
const month = today_date.getMonth() + 1; //월
const date = today_date.getDate(); //일
const day = today_date.getDay(); //요일

var weekday = [];
weekday[0] = "일요일 (Sunday)";
weekday[1] = "월요일 (Monday)";
weekday[2] = "화요일 (Tuesday)";
weekday[3] = "수요일 (Wednesday)";
weekday[4] = "목요일 (Thursday)";
weekday[5] = "금요일 (Friday)";
weekday[6] = "토요일 (Saturday)";

var today_day = weekday[today_date.getDay()];
current_date.textContent = year + "년 " + month + "월 " + date + "일";
current_day.textContent = today_day;

function init() {
  loadTodos();
  addBtn.addEventListener("click", handleSubmit);
  // input todo
  inputText.addEventListener("input", inputTextfunction);
}

/* 로컬스토리지 */
function loadTodos() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(function (todo) {
      paintTodo(todo.text); //로컬 스토리지에 저장된 string만을 가지고 todo item을 만듬
    });
  }
}

/* todo를 로컬스토리지에 저장*/
function saveTodo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos));
  //SON.stringify --> 자바스크립트 object를 string으로 바꿔줌
}

/* todo 삭제 */
function deleteTodo(e) {
  console.log(e.target);
  const btn = e.target;
  const li = btn.parentNode;
  list_Div.removeChild(li);

  const cleanTodos = todos.filter(function (todo) {
    console.log(todo.id, li.id);
    return todo.id !== parseInt(li.id);
  });
  console.log(cleanTodos);
  todos = cleanTodos; //배열 덮어씌우기
  saveTodo(); //현재 상태 로컬스토리지에 저장. (로컬스토리지에서도 삭제가 되게)
}

/* todo 선택 */
function checkTodo(e) {
  // document.querySelector(".del_btn").classList.add("check");
  const chk = e.target; //체크박스
  const li = chk.parentNode;
  //   const del = li.childNodes[2].className; //삭제버튼

  //   del.addEventListener("click", deleteTodo);
  //   console.log(li.childNodes[2]);
  //   list_Div.removeChild(li);
}

/* input text */
function inputTextfunction() {
  current_value = inputText.value;
  console.log(current_value);

  /* 텍스트가 작성되지 않으면 버튼 활성화 x*/
  if (current_value.length > 0) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "");
  }
}

/* add btn click */
function handleSubmit(e) {
  e.preventDefault();
  console.log(current_value);
  paintTodo(current_value);
  inputText.value = "";
  addBtn.setAttribute("disabled", "");
  //   addBtn.addEventListener("click", paintTodo(current_value));
}

/* todo item 추가 (태그 동적 생성)*/
function paintTodo(text) {
  // li
  const newId = todos.length + 1;
  const create_li = document.createElement("li");
  list_Div.appendChild(create_li);
  create_li.setAttribute("class", "list_item");
  create_li.id = newId;

  // checkbox
  // const create_checkBox = document.createElement("input");
  // create_li.appendChild(create_checkBox);
  // create_checkBox.setAttribute("type", "checkbox");
  // create_checkBox.setAttribute("class", "list_checkbox");
  // create_checkBox.setAttribute("name", "chkBox");
  // create_checkBox.addEventListener("click", checkTodo);

  //delete btn
  const create_delBtn = document.createElement("button");
  create_li.appendChild(create_delBtn);
  create_delBtn.setAttribute("class", "del_btn");
  create_delBtn.textContent = "❌";
  create_delBtn.addEventListener("click", deleteTodo);

  // text
  const create_span = document.createElement("span");
  create_li.appendChild(create_span);
  create_span.setAttribute("class", "list_item_title");
  create_span.innerText = text;

  // text(date)
  const create_span_date = document.createElement("span");
  create_li.appendChild(create_span_date);
  create_span_date.setAttribute("class", "list_item_date");
  create_span_date.innerText = current_date.textContent;

  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj); //배열에 오브젝트(todo item) 추가
  saveTodo();
}

init();
