const outputRewiew = document.querySelector(".output__reviews");
const btnClear = document.querySelector(".clearLocalStorage");

for (let index = 0; index < localStorage.length; index++) {
  let product = localStorage.key(index);
  let reviewList = JSON.parse(localStorage.getItem(product));

  const wrapProduct = document.createElement("div");
  outputRewiew.insertAdjacentElement("beforeend", wrapProduct);

  wrapProduct.insertAdjacentHTML(
    "beforeend",
    `
      <h2>${product} <button onclick="showReview(this)">показать отзывы</button> </h2>`
  );

  const wrapReviews = document.createElement("div");
  wrapReviews.hidden = true;
  wrapProduct.insertAdjacentElement("beforeend", wrapReviews);

  reviewList.forEach((element) => {
    const reviewItem = document.createElement("div");
    wrapReviews.insertAdjacentElement("beforeend", reviewItem);

    const reviewText = document.createElement("span");
    reviewText.textContent = element;
    reviewItem.insertAdjacentElement("beforeend", reviewText);

    reviewItem.insertAdjacentHTML("beforeend", " ");

    reviewItem.insertAdjacentElement(
      "beforeend",
      createdBtnDelete(reviewText, reviewList, product)
    );

    reviewItem.insertAdjacentHTML("beforeend", "<br><br>");
  });
}

function createdBtnDelete(delRewiewText, delRewiewList, delProduct) {
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Удалить";

  btnDelete.addEventListener("click", () => {
    if (delRewiewList.length > 1) {
      let indexItem = delRewiewList.findIndex(
        (element) => element === delRewiewText.textContent
      );
      delRewiewList.splice(indexItem, 1);
      localStorage.setItem(delProduct, JSON.stringify(delRewiewList));
    } else {
      localStorage.removeItem(delProduct);
      btnDelete.parentElement.parentElement.parentElement.remove();
    }
    delRewiewText.parentElement.remove();
    btnDelete.remove();
  });

  return btnDelete;
}

function showReview(elem) {
  let hiddenElement = elem.parentElement.parentElement.lastChild;
  if (hiddenElement.hidden) {
    hiddenElement.hidden = false;
    elem.textContent = "скрыть отзывы";
  } else {
    hiddenElement.hidden = true;
    elem.textContent = "показать отзывы";
  }
}

btnClear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
})