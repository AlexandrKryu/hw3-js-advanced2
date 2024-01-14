const inputProduct = document.querySelector(".input__product");
const inputReview = document.querySelector(".input__review");
const btnSubmit = document.querySelector(".btn__submit");


inputProduct.focus();

btnSubmit.addEventListener("click", () => {
  const product = inputProduct.value;
  const review = inputReview.value;
  if (product !== "" && review !== "") {
    let store = JSON.parse(localStorage.getItem(product));
    if (store === null) {
      store = [];
    }
    store.push(review);
    localStorage.setItem(product, JSON.stringify(store));
    location.reload();
    
  } else {
    alert("не все поля заполнены");
  }
});




