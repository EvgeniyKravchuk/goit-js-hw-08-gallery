import galleryItems from "./gallery-items.js";
const galleryRef = document.querySelector(".js-gallery");

const modalWindowRef = document.querySelector(".js-lightbox");
const modalWindowImageRef = document.querySelector(".lightbox__image");
const arrayForCreateItems = [];

createGelleryItems();

galleryRef.addEventListener("click", onGalleryImageClick);
modalWindowRef.addEventListener("click", closeModalWindow);

function createGelleryItems() {
  galleryItems.forEach((item, index) => {
    const itemForCreate = `
    <li class="gallery__item">
        <a class="gallery__link"
        href= #
        >
        <img class="gallery__image"
        src=${item.preview}
        data-source=${item.original}
        data-index=${index} 
        alt=${item.description}
        />
        </a>
    </li>`;
    arrayForCreateItems.push(itemForCreate);
  });

  galleryRef.insertAdjacentHTML("beforeend", arrayForCreateItems.join(""));
}
function onGalleryImageClick(evt) {
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  openModalWindow();

  window.addEventListener("keydown", onModalWindowKeyboardPress);

  modalWindowImageRef.src = evt.target.dataset.source;
  modalWindowImageRef.alt = evt.target.alt;
  modalWindowImageRef.dataset.index = evt.target.dataset.index;
}
function openModalWindow() {
  modalWindowRef.classList.add("is-open");
}
function closeModalWindow(evt) {
  if (evt.target.nodeName === "BUTTON" || evt.target.nodeName !== "IMG") {
    modalWindowRef.classList.remove("is-open");
    modalWindowImageRef.src = "";
    modalWindowImageRef.alt = "";
    window.removeEventListener("keydown", onModalWindowKeyboardPress);
  }
}
function onModalWindowKeyboardPress(evt) {
  const galleryImageRef = document.querySelectorAll(
    ".gallery__item .gallery__image"
  );
  const indexOfCurrentElement = Number(modalWindowImageRef.dataset.index);
  const nextElement = galleryImageRef[indexOfCurrentElement + 1];
  const previousElement = galleryImageRef[indexOfCurrentElement - 1];
  if (evt.code === "Escape") {
    closeModalWindow(evt);
  }

  if (evt.code === "ArrowRight") {
    if (modalWindowImageRef.dataset.index < 9) {
      modalWindowImageRef.src = nextElement.dataset.source;
      modalWindowImageRef.alt = nextElement.alt;
      modalWindowImageRef.dataset.index =
        Number(modalWindowImageRef.dataset.index) + 1;
    }
    if (modalWindowImageRef.dataset.index === 9) {
    }
  }
  if (evt.code === "ArrowLeft") {
    if (modalWindowImageRef.dataset.index < galleryImageRef.length) {
      modalWindowImageRef.src = previousElement.dataset.source;
      modalWindowImageRef.alt = previousElement.alt;
      modalWindowImageRef.dataset.index =
        Number(modalWindowImageRef.dataset.index) - 1;
    }
    if (modalWindowImageRef.dataset.index === 0) {
    }
  }
}
