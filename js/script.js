/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/**
 * Shows 9 students based on their index in the included list array
 *
 * @param {array} list The data to populate the page with
 * @param {number} page Which group of nine students will be chosen
 */

const showPage = (list, page) => {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = ``;
   for (let i = 0; i < list.length; i++) {
      let pageHtml = ``;
      if (i >= startIndex && i < endIndex) {
         pageHtml += `
             <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="${list[i].name.first} ${list[i].name.last}'s Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
      }
      studentList.insertAdjacentHTML("beforeend", pageHtml)
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/**
 * Creates buttons to show all the data in groups of 9
 *
 * @param {array} list The data to populate the page with
 */
const addPagination = (list) => {
   const totalPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('.link-list')
   linkList.innerHTML = ``;
   let paginationHTML = ``;
   for (let i = 0; i < totalPages; i++) {
      paginationHTML += `
         <li>
            <button type=button">${i+1}</button>
         </li>
      `
   }
   linkList.insertAdjacentHTML("beforeend", paginationHTML)
   if (list.length !== 0) {
      linkList.firstElementChild.firstElementChild.className = 'active';
   }



   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         for (let i = 0; i < linkList.children.length; i++) {
            (linkList.children[i].firstElementChild.classList.remove('active'))
         }
         e.target.classList.add('active')
         const pageIndex = e.target.textContent;
         showPage(data, pageIndex)
      }
   })
}


let zeroResultsDisplay = false;
const searchStudents = (value) => {
   const searchedArr = [];
   for (let i = 0; i < data.length; i++) {
      const name = `${data[i].name.first.toLowerCase()} ${data[i].name.last.toLowerCase()}`
      if (name.includes(value)) {
         searchedArr.push(data[i])
      }
   }
   showPage(searchedArr, 1);
   addPagination(searchedArr);
   if (searchedArr.length === 0 && zeroResultsDisplay === false) {
      zeroResultsDisplay = true;
      const message = `<h2 class='zero-results'>Your search resulted in 0 matches. Please try again.</h2>`
      document.querySelector('.student-list').insertAdjacentHTML("beforebegin", message)
   }
   else if (searchedArr.length > 0 && zeroResultsDisplay === true) {
      document.querySelector('header').nextElementSibling.remove()
      zeroResultsDisplay = false;
   }
}

/**
 * Creates a search bar
 *
 * @param {array} list The data to populate the page with
 * @param {number} page Which group of nine students will be chosen
 */

const createSearchBar = () => {
   const searchBarHtml = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `
   document.querySelector('header').insertAdjacentHTML("beforeend", searchBarHtml)
   const searchBar = document.querySelector('.student-search input');
   searchBar.addEventListener("keyup", () => {
      const searchTerm = searchBar.value.toLowerCase();
      searchStudents(searchTerm);
   })
   searchBar.parentElement.addEventListener("click", (e) => {
      if (e.target.tagName === 'BUTTON') {
         const searchTerm = searchBar.value.toLowerCase();
         searchStudents(searchTerm);
      }
   })
   
}

// Call functions
showPage(data, 1);
addPagination(data);
createSearchBar();