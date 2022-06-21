const paginationNav = document.getElementById("pagination-nav");
const pageNumbers = paginationNav.getElementsByClassName("grid-page__number");
const forward = paginationNav.querySelector("#pagination-forward");
const backward = paginationNav.querySelector("#pagination-backward");
const form = paginationNav.querySelector(".grid-page__nav-form");
const formBtn = paginationNav.querySelector(".grid-page__nav-button");

// Grid Pagination Numbers
Array.prototype.forEach.call(pageNumbers, (button) => {
  button.addEventListener("click", () => {
    const current = paginationNav.querySelector(".active-page-nav");
    current.className = current.className.replace(" active-page-nav", "");
    button.classList.add("active-page-nav");
    const pageNumber = button.innerHTML;
    fetchData(API_URL + `&page=${pageNumber}`);
  });

  backward.addEventListener("click", () => {
    if (Number(pageNumbers[0].innerHTML) < 9) {
      backward.style.setProperty("display", "none");
    }
    if (Number(pageNumbers[0].innerHTML) > 0) {
      handleNumbers(-9);
    }
  });

  forward.addEventListener("click", () => {
    if (Number(pageNumbers[0].innerHTML) > 9) {
      backward.style.setProperty("display", "flex");
    }

    if (Number(pageNumbers[0].innerHTML) < pageLimit - 4) {
      handleNumbers(9);
    }
  });

  function handleNumbers(diff) {
    button.innerHTML = Number(button.innerHTML) + diff;
    if (Number(pageNumbers[0].innerHTML) > pageLimit - 4) {
      forward.style.setProperty("display", "none");
    }
  }
});

const goToPageButton = document.getElementById("grid-page__nav-button");

goToPageButton.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("page-input").value;
  const inputNumber = Number(input);
  if (4 < inputNumber && inputNumber < pageLimit - 3) {
    fetchData(API_URL + `&page=${input}`);
    const current = paginationNav.querySelector(".active-page-nav");
    current.className = current.className.replace(" active-page-nav", "");

    let firstNumber = inputNumber - 4;
    Array.prototype.forEach.call(pageNumbers, (number) => {
      pageNumbers[4].classList.add("active-page-nav");
      if (Number(pageNumbers[0].innerHTML) > 9) {
        backward.style.setProperty("display", "flex");
      }
      number.innerHTML = firstNumber;
      firstNumber += 1;
    });
  }
  return;
});

let pageLimit = 0;
const setTotalPageNum = async (totalPageNum) => {
  if (totalPageNum > 500) {
    return (pageLimit = 500);
  } else {
    await (pageLimit = totalPageNum);
    console.log(pageLimit);
  }
};

