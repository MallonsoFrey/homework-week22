import { useEffect } from "react";

function Card({
  name,
  universe,
  alterego,
  occupation,
  friends,
  superpowers,
  url,
}) {
  useEffect(() => {
    let stars = document.querySelectorAll(".ratings span"); // выбираем все звезды
    const ratings = JSON.parse(localStorage.getItem("ratings")) || []; // массив из localStorage или новый

    for (let star of stars) {
      star.addEventListener("click", function () {
        if (this.getAttribute("data-clicked")) {
          return; // Останавливаем выполнение функции, если звезда уже выбрана
        }
        this.setAttribute("data-clicked", true); // атрибут у выбранной звезды

        let rating = this.dataset.rating; // значение атрибута data-rating
        let hero = this.closest(".hero"); // Находим ближайший элемент с классом 'hero'
        let name = hero.querySelector("h2").textContent; // Извлекаем имя героя

        const existingRatingIndex = ratings.findIndex((r) => r.hero === name);
        //r.hero — это имя героя, которое уже сохранено в localStorage вместе с его рейтингом

        if (existingRatingIndex !== -1) {
          // Если рейтинг для этого героя уже существует, обновляем его
          ratings[existingRatingIndex].rating = rating;
        } else {
          // Если рейтинга нет, добавляем новый
          let ratingHero = {
            hero: name,
            rating: rating,
          };
          ratings.push(ratingHero);
        }

        localStorage.setItem("ratings", JSON.stringify(ratings));
      });
    }
  }, []);

  return (
    <div className="hero">
      <h2>{name}</h2>
      <p>
        <b>Вселенная:</b> {universe}
      </p>
      <p>
        <b>Альтер-эго:</b> {alterego}
      </p>
      <p>
        <b>Род деятельности:</b> {occupation}
      </p>
      <p>
        <b>Друзья:</b> {friends}
      </p>
      <p>
        <b>Суперсилы:</b> {superpowers}
      </p>
      <img src={url} alt={name} />
      <div className="ratings">
        <span data-rating="5">&#9733;</span>
        <span data-rating="4">&#9733;</span>
        <span data-rating="3">&#9733;</span>
        <span data-rating="2">&#9733;</span>
        <span data-rating="1">&#9733;</span>
      </div>
    </div>
  );
}
export default Card;
