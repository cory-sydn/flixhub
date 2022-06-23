const modal = document.querySelector(".modal");
const mClose = modal.querySelector(".modal__btn-close");
const modalContainer = modal.querySelector('.modal-container')

mClose.addEventListener("click", (e) => {
  modal.close();  
  e.preventDefault()
})

const clearModal = () => {
  setTimeout(() => {
    modal.close();
  }, 8000)
}
