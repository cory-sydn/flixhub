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

const warningMessage = () => {
  const searchButton = document.querySelector('.search__button')
  const messageDiv = document.createElement('div')
  if (document.querySelector('.warning-message') === null) {
    messageDiv.setAttribute("class", "warning-message")
    messageDiv.innerHTML =`
      <p>You need more than</p>
      <p>two letters</p>
    `
    searchButton.insertAdjacentElement('beforebegin', messageDiv)
    setTimeout(() => {
      const message = document.querySelector('.warning-message')
      searchButton.parentNode.removeChild(message)
    }, 2000)
  }
}