const current_date = document.querySelector(".currentDate");
const current_day = document.querySelector(".currentDay");
const inputText = document.querySelector(".todo_input_text");
const addBtn = document.querySelector(".todo_add_btn");
let saveTodo; //input에 적힌 text를 저장하는 변수
const listSection = document.querySelector("#todo_list_section");
const listItem = document.querySelector(".list_item");
const checkbox = document.querySelector(".list_checkbox");
const todoText = document.querySelector(".list_item_title");
const deleteBtn = document.querySelector(".del_btn");

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

/* 할일 추가하기 */
inputText.addEventListener("input", function (e) {
  saveTodo = e.currentTarget.value;

  /* 텍스트가 작성되지 않으면 버튼 활성화 x*/
  if (saveTodo.length > 0) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "");
  }
});

addBtn.addEventListener("click", function (e) {
  //add후 초기 설정값으로 돌아감
  console.log("add버튼 클릭됨");
  console.log(saveTodo);

  /* todo item 동적 태그 생성 되는 부분 */

  //item div
  const create_itemDiv = document.createElement("div");
  listSection.appendChild(create_itemDiv);
  create_itemDiv.setAttribute("class", "list_item");

  //item checkbox
  const create_checkBox = document.createElement("input");
  create_itemDiv.appendChild(create_checkBox);
  create_checkBox.setAttribute("type", "checkbox");
  create_checkBox.setAttribute("class", "list_checkbox");

  //item text
  const create_item = document.createElement("span");
  create_itemDiv.appendChild(create_item);
  create_item.setAttribute("class", "list_item_title");

  //item delete btn
  const create_delBtn = document.createElement("button");
  create_itemDiv.appendChild(create_delBtn);
  create_delBtn.setAttribute("class", "del_btn");
  create_delBtn.textContent = "X";

  create_item.textContent = saveTodo; //input에 입력한 텍스트 할일목록으로 전달
  addBtn.setAttribute("disabled", "");
});
