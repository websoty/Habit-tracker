// dark-light theme switcher

const themeSwitcher = document.querySelector('.theme__switcher');
const app = document.querySelector('.app');

themeSwitcher.addEventListener('click', () => { 
  themeSwitcher.classList.toggle('dark'); // перекл класс темы на кнопке
  document.body.classList.toggle('dark__body'); // перекл тема боди
  app.classList.toggle('dark__app'); // перекл темы приложения
})

// check days

// Массив для состояния дней недели (false - не активен, true - активен)
let daysState = [false, false, false, false, false, false, false];

const days = document.querySelectorAll(".progress__day");
const barLine = document.querySelector(".progress__bar-line");

days.forEach((day, index) => { 
  day.addEventListener("click", () => { 
    daysState[index] = true; // отметка дня как выполнен
      day.classList.add('active'); // + класс для отображения активности

    const completeDays = daysState.reduce((acc, day) => { // подсчет дней которые активны
      if (day === true) {
    return acc + 1;
    } else {
    return acc;
  }
}, 0);

    document.getElementById("completed-count").textContent = completeDays; // текст счетчика === количество кликнутных дней
    const procDays = completeDays / days.length * 100; // % выбраных дней
    barLine.style.width = procDays + "%"; // ширина полоски относительно % выбраных дней
    
    saveData();
  });
});


// cards

const cards = document.querySelectorAll('.goals__card');

cards.forEach(card => { // перебираю каждую карточку
    const checks = card.querySelectorAll(".goals__progress-check"); // все галочки в карточке
    const score = card.querySelector(".goals__tip-score"); // счетчик в карточке

    checks.forEach(check => { // перебираю каждую галочку карточки
      check.addEventListener('click', () => { 
        check.classList.add('active'); // вешаю на галочку кликнутую класс

    const filterChecks = Array.from(checks).filter(c => c.classList.contains('active')).length; // перевел nodeList в массив , фильтр ток активных галочек с классом active + количество активных галочек(Length).
        
    score.textContent = filterChecks; // обновил счетчик на числа активных галочек
          saveData();
      });

    });
});

//add new card 

  const newCards = document.querySelector('.goals__list');// род.блок задач
  
function createCard() {
  const newCards = document.querySelector('.goals__list'); // род.блок задач
  const newCard = document.createElement('div'); // создал внутри листа задач блок
  const habitName = document.querySelector('.modal__input').value; // имя задачи из input
  const habitImg = '/images/task.svg';

    newCard.classList.add('goals__card'); // добавил класс карточки как у всех

    //наполнение карточки

    newCard.innerHTML = `<div class="goals__head">
            <div class="goals__denotation">
            <img src="${habitImg}" alt="task">
            <h4 class="goals__title">${habitName}</h4>
            </div>
            <div class="goals__tip">
              <span class="goals__tip-score">0</span>
            </div>
          </div>
          <ul class="goals__progress">
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__progress-list">
              <span class="goals__progress-check"></span>
            </li>
            <li class="goals__delete"><img src='/images/garbage.svg' alt='delete'>
            </li>
          </ul>`


    newCards.prepend(newCard); // вывод сверху в -начало списка задач-
    
};


  newCards.addEventListener('click', (event) => { // клик на конкретный элеменент
        if (event.target.closest('.goals__delete')) {
      event.target.closest('.goals__card').remove(); // удаление карточки
        return;
      }

        if (event.target.classList.contains('goals__progress-check')) { // если клик включает галочку 
        event.target.classList.add('active'); // + класс актив - отметить галочку
        saveData();
      };

      // обнова счетчика
    const card = event.target.closest('.goals__card'); // ищу род. блок карточки
    const findCard = card.querySelectorAll('.goals__progress-check'); // галочки
    const score = card.querySelector(".goals__tip-score"); // счетчик в карточке
    const filterCard = Array.from(findCard).filter(cd => cd.classList.contains('active')).length;// перевел в массив, фильтр активных галочек всех
      saveData();
      if (filterCard === findCard.length) { // проверка всех кликов на карточке = длинне всех галочек
        event.target.closest('.goals__card').remove(); // при всех кликах карточка исчезает
        saveData();
      };
    
      score.textContent = filterCard; // счетчик = фильтр галочек отмеченых
    });

// add / remove new task --- modal

const newTask = document.querySelector('.btn__newtask');
const modal = document.querySelectorAll('.modal, .modal__overlay');
const modalClose = document.querySelectorAll('.modal__close, .modal__btn.close');

newTask.addEventListener('click', () => {
  modal.forEach((el) => { // каждый элемент в модалке
    el.classList.add('active'); // показать модал окно
  })
});

modalClose.forEach(close => {
  close.addEventListener('click', () => {
    modal.forEach((el) => {
      el.classList.remove('active'); // закрыть окно модалки
    })
  });
});


// save btn , save new card

const saveBtn = document.querySelector('.modal__btn.save');

saveBtn.addEventListener('click', () => {
  const habitName = document.querySelector('.modal__input').value;
  createCard(habitName); // создать карточку 
  modal.forEach((m) => {
    m.classList.remove('active'); // закрыть окно модалки
  });
  document.querySelector('.modal__input').value = ''; // очистка поля ввода input

});


  //reset btn
const resetBtn = document.querySelector('.reset__btn');
  resetBtn.addEventListener('click', () => {
        daysState = new Array(daysState.length).fill(false); // сбросить состояние дней 
          days.forEach((day) => {
            day.classList.remove('active'); // убрать активные классы с дней
          });
            barLine.style.width = `0%`; // сбрасываю прогресс бар
            document.getElementById("completed-count").textContent = 0; // сброс счетчика


    // сброс карточки
    const cards = document.querySelectorAll('.goals__card');
    cards.forEach((card) => {
        const checks = card.querySelectorAll(".goals__progress-check");
        const score = card.querySelector(".goals__tip-score");
        
      checks.forEach((check) => {
        check.classList.remove('active'); // убираю активные галочки
      });
      score.textContent = 0; // сброс счетчика
    });
    saveData();
  });



function saveData() {
  const state = {
    cards: newCards.innerHTML, // карточки
    daysState: daysState // дни недели
  };
  localStorage.setItem('data', JSON.stringify(state));
};


function showData() {
  const saved = localStorage.getItem('data');
    if (saved) {
      const state = JSON.parse(saved);
      newCards.innerHTML = state.cards; // восстановл карточки
      daysState = state.daysState; // восстановл дни недели
          days.forEach((day, index) => {
        if (daysState[index]) {
          day.classList.add('active');
        } else {
          day.classList.remove('active');
      }
    });
    // Обновляем прогресс-бар и счётчик
    const completeDays = daysState.filter(d => d).length;
    document.getElementById("completed-count").textContent = completeDays;
    barLine.style.width = `${(completeDays / days.length) * 100}%`;
  }
};

// localStorage.clear();
showData();

