
const tasks = [
  {
    company: "ShopEase",
    title: "Fix Mobile Button Issue",
    description: "Debug using Chrome DevTools, check for overlapping...",
    deadline: "21 March 2025",
    completed: false,
  },
  {
    company: "CloudSync",
    title: "Add Dark Mode",
    description:
      "Store the user's preference in localStorage, update CSS...",
    deadline: "21 March 2025",
    completed: false,
  },
  {
    company: "SwiftPay",
    title: "Optimize Home Page",
    description: "Debug using Chrome DevTools, check for overlapping...",
    deadline: "21 March 2025",
    completed: false,
  },
  {
    company: "Meta",
    title: "Add new emoji 🤲",
    description: "Debug using Chrome DevTools, check for overlapping...",
    deadline: "21 March 2025",
    completed: false,
  },
  {
    company: "Google LLC",
    title: "Integrate OpenAI API",
    description: "Debug using Chrome DevTools, check for overlapping...",
    deadline: "21 March 2025",
    completed: false,
  },
  {
    company: "Glassdoor",
    title: "Improve Job searching",
    description: "Debug using Chrome DevTools, check for overlapping...",
    deadline: "21 March 2025",
    completed: false,
  },
];

let assignedCount = tasks.length;
let completedCount = 0;

// DOM Elements
const taskContainer = document.getElementById("taskContainer");
const assignedCountElement = document.getElementById("assignedCount");
const taskCountElement = document.getElementById("taskCount");
const activityLog = document.getElementById("activityLog");
const colorToggle = document.getElementById("colorToggle");
const clearHistoryBtn = document.getElementById("clearHistory");
const toastContainer = document.getElementById("toastContainer");
const currentDateElement = document.getElementById("currentDate");
const discoveryCard = document.getElementById("discoveryCard");


function setCurrentDate() {
  const today = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  currentDateElement.textContent = today.toLocaleDateString(
    "en-US",
    options
  );
}


function renderTasks() {
  taskContainer.innerHTML = "";
  tasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "bg-[#F4F7FF] rounded-xl p-5";

    card.innerHTML = `
      <div class="flex  items-center justify-between mb-3">
        <div class="text-xs bg-white px-2 py-1 p rounded-[100px] text-gray-500  font-medium">${
          task.company
        }</div>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">${
        task.title
      }</h3>
      <div class="bg-white px-2 py-1 rounded-lg ">
<p class="text-sm text-gray-600 mb-4">${task.description}</p>
          </div>
      <div class="flex items-center pt-4 justify-between">
        <div>
          <div class="text-xs text-gray-500">Deadline</div>
          <div class="text-sm font-medium text-gray-800">${
            task.deadline
          }</div>
        </div>
        <button 
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            task.completed
              ? "bg-gray-200 text-black cursor-not-allowed"
              : "bg-[#3752FD] text-white hover:bg-indigo-700"
          }" 
          data-index="${index}"
          ${task.completed ? "disabled" : ""}
        >
          ${task.completed ? "Completed" : "Completed"}
        </button>
      </div>
    `;
    taskContainer.appendChild(card);
  });
}


function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "alert alert-success shadow-lg mb-2 animate-pulse";
  toast.innerHTML = `
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    </div>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}


taskContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && !e.target.disabled) {
    const index = parseInt(e.target.getAttribute("data-index"));
    const task = tasks[index];

    if (!task.completed) {
  
      task.completed = true;
      assignedCount--;
      completedCount++;

  
      assignedCountElement.textContent = assignedCount;
      taskCountElement.textContent = completedCount;


      const logItem = document.createElement("li");
      logItem.className =
        "bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-400";
      logItem.innerHTML = `
        <div class="text-sm font-medium text-indigo-800">Task Completed</div>
        <div class="text-sm text-black">${task.title}</div>
        <div class="text-xs text-gray-500">${new Date().toLocaleTimeString()}</div>
      `;
      activityLog.prepend(logItem);

   
      showToast(`You have completed the task: ${task.title}`);

      
      renderTasks();
    }
  }
});


colorToggle.addEventListener("click", () => {
  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-purple-50",
    "bg-pink-50",
    "bg-yellow-50",
    "bg-indigo-50",
    "bg-red-50",
    "bg-orange-50",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];


  document.body.className = document.body.className.replace(
    /bg-\w+-\d+/g,
    ""
  );
  document.body.classList.add(
    randomColor,
    "min-h-screen",
    "pt-10",
    "text-gray-800",
    "transition-colors",
    "duration-500"
  );
});


discoveryCard.addEventListener("click", () => {
  window.location.href = "blog.html";
});


clearHistoryBtn.addEventListener("click", () => {
  activityLog.innerHTML = "";
  showToast("Activity log cleared!");
});


function init() {
  setCurrentDate();
  renderTasks();

 
  assignedCountElement.textContent = assignedCount;
  taskCountElement.textContent = completedCount;
}


init();