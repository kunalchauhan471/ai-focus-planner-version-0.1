let slide = 0;
const slides = document.querySelectorAll(".slide");
const bar = document.getElementById("bar");

let goals = [];
let allTasks = [];

function updateUI(){
  slides.forEach((s,i)=>s.classList.toggle("active", i===slide));
  bar.style.width = (slide/(slides.length-1))*100 + "%";
}

function next(){ if(slide < slides.length-1){ slide++; updateUI(); } }
function back(){ if(slide > 0){ slide--; updateUI(); } }

function addGoal(){
  const input = document.getElementById("goalInput");
  if(!input.value.trim()) return;
  goals.push(input.value.trim());
  input.value = "";
  renderGoals();
}

function deleteGoal(i){
  goals.splice(i,1);
  renderGoals();
}

function renderGoals(){
  document.getElementById("goals").innerHTML =
    goals.map((g,i)=>`
      <div class="goal-box">
        ${g}
        <span class="delete" onclick="deleteGoal(${i})">✕</span>
      </div>
    `).join("");

  document.getElementById("tasksArea").innerHTML =
    goals.map((g,i)=>`
      <div class="goal-box">
        <strong>${g}</strong>
        <span class="delete" onclick="deleteGoal(${i})">✕</span>
        <textarea id="tasks${i}" placeholder="Example : Study 1 hr if goal is related to study"></textarea>
      </div>
    `).join("");
}

function prepareBatch(){
  allTasks = [];
  const batch = document.getElementById("batchArea");
  batch.innerHTML = "";

  goals.forEach((goal,i)=>{
    const lines = document.getElementById("tasks"+i).value
      .split("\n").filter(x=>x.trim());

    lines.forEach(task=>{
      const id = allTasks.length;
      allTasks.push({ task, goal, color:"#38bdf8", deleted:false });

      batch.innerHTML += `
        <div class="task-box" id="task${id}">
          <strong>${task}</strong>
          <span class="delete" onclick="deleteTask(${id})">✕</span>

          <div class="color-bar" id="bar${id}"></div>
          <input type="color" id="color${id}" value="#38bdf8"
                 onchange="updateColor(${id})">

          <div class="days">
            ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>`
              <label class="day">
                <input type="checkbox" id="${id}${d}"> ${d}
              </label>
            `).join("")}
          </div>
        </div>`;
    });
  });

  next();
}

function updateColor(id){
  const color = document.getElementById("color"+id).value;
  document.getElementById("bar"+id).style.background = color;
}

function deleteTask(id){
  allTasks[id].deleted = true;
  document.getElementById("task"+id).remove();
}

function generate(){
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const table = {};
  const legendMap = {};

  days.forEach(d=>table[d]=[]);

  allTasks.forEach((t,i)=>{
    if(t.deleted) return;

    const color = document.getElementById("color"+i).value;
    t.color = color;

    if(!legendMap[t.goal]) legendMap[t.goal] = color;

    days.forEach(d=>{
      if(document.getElementById(i+d).checked){
        table[d].push(t);
      }
    });
  });

  const grid = document.getElementById("table");
  grid.innerHTML = "";

  days.forEach(d=>{
    grid.innerHTML += `
      <div class="day-column">
        <strong>${d}</strong>
        ${table[d].map(t=>`
          <div class="task"
               style="
                 background:${t.color}33;
                 box-shadow: inset 6px 0 0 ${t.color};
                 padding-left:14px;
               ">
            ${t.task}
          </div>
        `).join("")}
      </div>`;
  });

  const legend = document.getElementById("legend");
  legend.innerHTML = Object.entries(legendMap).map(
    ([goal,color])=>`
      <div class="legend-item"
           style="box-shadow: inset 8px 0 0 ${color}; padding-left:12px;">
        ${goal}
      </div>
    `
  ).join("");

  next();
}

updateUI();
