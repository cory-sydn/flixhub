const modal = document.querySelector(".modal");
const mClose = modal.querySelector(".modal__btn-close");

mClose.addEventListener("click", (e) => {
  modal.close();
  e.preventDefault()
})
