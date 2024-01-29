import { elements } from './base';
import { limitTitle } from './searchView';

export const toggleLikeBtn = (isLiked) => {
  const iconString = isLiked ? 'bxs' : 'bx';
  // Can select a certain child element of a parent element like '.recipe__love use'
  document.querySelector('.recipe__love i').setAttribute('class', `bx ${iconString}-heart`);
};

export const toggleLikeMenu = (numLikes) => {
  elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
  const markup = `
        <li>
            <a class="likes__link glass" href="#${like.id}&like" >
                <figure class="likes__fig">
                    <img src="${like.img}" alt="Liked Recipe Image">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;

  elements.likeList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLikeItem = (id) => {
  const element = document.querySelector(`.likes__link[href='#${id}&like']`).parentElement;
  if (element) element.parentElement.removeChild(element);
};
