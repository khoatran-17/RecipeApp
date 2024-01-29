class e{constructor(e){this.query=e}async getResults(){try{const e=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${this.query}&key=d04f1c6a-1870-457f-9c61-1b90a53e236a`),i=await e.json();this.results=i.data.recipes}catch(e){alert(e)}}}const i={searchForm:document.querySelector(".search"),searchInput:document.querySelector(".search__field"),searchResultList:document.querySelector(".results__list"),searchResult:document.querySelector(".results"),searchResultPages:document.querySelector(".results__pages"),recipe:document.querySelector(".recipe"),likeIcon:document.querySelector(".recipe__love"),likeMenu:document.querySelector(".likes__field"),likeList:document.querySelector(".likes__list"),addRecipeBtn:document.querySelector(".nav__btn--add-recipe"),recipeWindow:document.querySelector(".add-recipe-window"),recipeOverlay:document.querySelector(".overlay"),closeUserRecipe:document.querySelector(".btn--close"),userRecipeForm:document.querySelector(".upload"),userList:document.querySelector(".user__list"),allInputs:document.querySelectorAll(".upload__column input")},s="loader",n="btn-inline",t="results__link",r="results__link--active",c=e=>{const i=`\n    <div class="${s}">\n      <i class='bx bx-loader-circle' ></i>\n    </div>\n    `;e.insertAdjacentHTML("afterbegin",i)},a=()=>{const e=document.querySelector(`.${s}`);e&&e.parentElement.removeChild(e)},l=()=>{i.searchResultList.innerHTML="",i.searchResultPages.innerHTML=""},o=(e,i=25)=>{const s=[];return e.length>i?(e.split(" ").reduce(((e,n)=>(e+n.length<=i&&s.push(n),e+n.length)),0),`${s.join(" ")} ...`):e},p=(e,i)=>{let s;return s="hidden"===i?`<button class="${n} results__btn--hidden">\n                      <span>HiddenBtn</span>\n                    </button>`:`<button class="${n} results__btn--${i}" data-goto=${"prev"===i?e-1:e+1}>\n              <span>Page ${"prev"===i?e-1:e+1}</span>\n\n              <i class='bx bxs-skip-${"prev"===i?"previous":"next"}-circle search__icon' ></i>\n          </button>\n`,s},d=(e,s=1,n=8)=>{const t=(s-1)*n,r=s*n;e.slice(t,r).forEach((e=>(e=>{const s=`\n          <li class="glass">\n            <a class="results__link" href="#${e.id}">\n              <figure class="results__fig">\n                <img src="${e.image_url}" alt="${e.title}">\n              </figure>\n              <div class="results__data">\n                <h4 class="results__name">${o(e.title)}</h4>\n                <p class="results__author">${e.publisher}</p>\n              </div>\n            </a>\n          </li>\n          `;i.searchResultList.insertAdjacentHTML("beforeend",s)})(e))),((e,s,n)=>{const t=Math.ceil(s/n);let r;1===e&&t>1?r=`\n    ${p(e,"hidden")}\n    ${p(e,"next")}\n    `:e<t?r=`\n    ${p(e,"prev")}\n    ${p(e,"next")}\n    `:e===t&&t>1&&(r=p(e,"prev")),i.searchResultPages.insertAdjacentHTML("afterbegin",r)})(s,e.length,n)};class u{constructor(e){this.id=e}async getRecipe(){try{const e=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${this.id}?key=d04f1c6a-1870-457f-9c61-1b90a53e236a`),i=await e.json();this.title=i.data.recipe.title,this.author=i.data.recipe.publisher,this.img=i.data.recipe.image_url,this.url=i.data.recipe.source_url,this.ingredients=i.data.recipe.ingredients,this.time=i.data.recipe.cooking_time,this.servings=i.data.recipe.servings}catch(e){alert(e)}}parseIngredients(){const e=this.ingredients.map((e=>{let i,s=e.description.toLowerCase();return s=s.replace(/ *\([^)]*\) */g," "),i=null!=e.quantity?{count:e.quantity,unit:e.unit,ingredient:s}:{count:1,unit:e.unit,ingredient:s},i}));this.ingredients=e}}const _=()=>i.recipe.innerHTML="";class g{constructor(){this.likes=[]}addLike(e,i,s,n){const t={id:e,title:i,author:s,img:n};return this.likes.push(t),this.persistData(),t}deleteLike(e){const i=this.likes.findIndex((i=>i.id===e));this.likes.splice(i,1),this.persistData()}isLiked(e){return-1!==this.likes.findIndex((i=>i.id===e))}getNumLikes(){return this.likes.length}persistData(){localStorage.setItem("like",JSON.stringify(this.likes))}readStorage(){const e=JSON.parse(localStorage.getItem("like"));e&&(this.likes=e)}}const h=e=>{const i=e?"bxs":"bx";document.querySelector(".recipe__love i").setAttribute("class",`bx ${i}-heart`)},m=e=>{i.likeMenu.style.visibility=e>0?"visible":"hidden"},k=e=>{const s=`\n        <li>\n            <a class="likes__link glass" href="#${e.id}&like" >\n                <figure class="likes__fig">\n                    <img src="${e.img}" alt="Liked Recipe Image">\n                </figure>\n                <div class="likes__data">\n                    <h4 class="likes__name">${o(e.title)}</h4>\n                    <p class="likes__author">${e.author}</p>\n                </div>\n            </a>\n        </li>\n    `;i.likeList.insertAdjacentHTML("beforeend",s)};class v{constructor(){this.userRecipes=[],this.count=0,this.readStorage()}toggleUserRecipe(){i.recipeOverlay.classList.toggle("hidden"),i.recipeWindow.classList.toggle("hidden")}readStorage(){const e=JSON.parse(localStorage.getItem("userRecipe"));e&&(this.userRecipes=e)}}function f(e){try{e.preventDefault();const s=[...new FormData(this)],n=s.filter((e=>e[0].startsWith("ingredient")&&""!==e[1])).map((e=>{const i=e[1].split(",");if(3!==i.length)throw new Error("Ingredient input invalid!");return i})),t=Object.fromEntries(s),r={title:t.title,publisher:t.publisher,cooking_time:+t.cookingTime,servings:+t.servings,ingredients:n,id:(Date.now()+"").slice(-10)},c=`\n        <li>\n            <a class="likes__link glass" href="#recipe${r.id}" >\n                <figure class="likes__fig">\n                    <img src="cookUserImg.bc82236c.png" alt="User Recipe Image">\n                </figure>\n                <div class="likes__data">\n                    <h4 class="likes__name">${o(r.title)}</h4>\n                    <p class="likes__author">${r.publisher}</p>\n                </div>\n            </a>\n        </li>\n    `;i.userList.insertAdjacentHTML("beforeend",c);let a=JSON.parse(localStorage.getItem("userRecipe"));a?a.push(r):a=[r],localStorage.setItem("userRecipe",JSON.stringify(a)),i.recipeOverlay.classList.toggle("hidden"),i.recipeWindow.classList.toggle("hidden"),i.allInputs.forEach((e=>e.value=""))}catch(e){window.alert(e)}}const b=e=>{const s=`\n              <figure class="recipe__fig">\n                  <img src="cookUserImg.png" class="recipe__img user__recipe__img">\n                  <h1 class="recipe__title">\n                      <span>${e.title}</span>\n                  </h1>\n              </figure>\n\n              <div class="recipe__details">\n                  <div class="recipe__info">\n                      <i class='bx bxs-time-five' ></i>\n                      <span class="recipe__info-data recipe__info-data--minutes">${e.cooking_time}</span>\n                      <span class="recipe__info-text"> minutes</span>\n                  </div>\n                  <div class="recipe__info">\n                      <i class='bx bxs-user'></i>\n                      <span class="recipe__info-data recipe__info-data--people">${e.servings}</span>\n                      <span class="recipe__info-text"> servings</span>\n\n                  </div>\n\n                  <div class="user__publisher">\n                      <p>By <span class="user__publisher__name">${e.publisher}</span></p>\n                  </div>\n              </div>\n\n              <div class="recipe__ingredients user__ingredients">\n                  <ul class="recipe__ingredient-list user__ingredients__list">\n                      ${e.ingredients.map((e=>{return`\n            <li class="recipe__item">\n                <i class='bx bxs-check-square recipe__icon' ></i>\n                <div class="recipe__count">${(i=e)[0]}</div>\n                <div class="recipe__ingredient">\n                     <span class="recipe__unit">${i[1]}</span>\n                    ${i[2]}\n                </div>\n            </li>\n`;var i})).join("")}\n                  </ul>\n              </div>\n      `;i.recipe.classList.add("glass"),i.recipe.insertAdjacentHTML("afterbegin",s),a()},$={};i.searchForm.addEventListener("submit",(e=>{e.preventDefault(),y()})),i.searchResultPages.addEventListener("click",(e=>{const i=e.target.closest(`.${n}`);if(i){const e=parseInt(i.dataset.goto);l(),d($.search.results,e)}}));const y=async()=>{const s=i.searchInput.value;if(s){$.search=new e(s),i.searchInput.value="",l(),c(i.searchResult);try{await $.search.getResults(),a(),d($.search.results)}catch(e){a(),alert(e)}}},L=()=>{$.like||($.like=new g);const e=$.recipe.id;if($.like.isLiked(e))$.like.deleteLike(e),h(!1),(e=>{const i=document.querySelector(`.likes__link[href='#${e}&like']`).parentElement;i&&i.parentElement.removeChild(i)})(e);else{const i=$.like.addLike(e,$.recipe.title,$.recipe.author,$.recipe.img);h(!0),k(i)}m($.like.getNumLikes())};i.recipe.addEventListener("click",(e=>{e.target.matches(".recipe__love, .recipe__love *")&&L()}));i.addRecipeBtn.addEventListener("click",(()=>{$.userRecipe=new v,$.userRecipe.toggleUserRecipe(),[i.closeUserRecipe,i.recipeOverlay].forEach((e=>e.addEventListener("click",$.userRecipe.toggleUserRecipe))),i.userRecipeForm.addEventListener("submit",f)})),window.addEventListener("load",(()=>{$.like=new g,$.userRecipe=new v,$.like.readStorage(),m($.like.getNumLikes()),$.like.likes.forEach((e=>k(e))),$.userRecipe.userRecipes.forEach((e=>(e=>{const s=`\n        <li>\n            <a class="likes__link glass" href="#recipe${e.id}" >\n                <figure class="likes__fig">\n                    <img src="cookUserImg.png" alt="User Recipe Image">\n                </figure>\n                <div class="likes__data">\n                    <h4 class="likes__name">${o(e.title)}</h4>\n                    <p class="likes__author">${e.publisher}</p>\n                </div>\n            </a>\n        </li>\n    `;i.userList.insertAdjacentHTML("beforeend",s)})(e)))}));const R=async e=>{const s=window.location.hash;if(s.includes("#recipe")){(e=>{const s=JSON.parse(localStorage.getItem("userRecipe")).find((i=>i.id===e));_(),c(i.recipe),b(s)})(s.split("#recipe")[1])}else if(s.includes("#")){const e=s.split("#")[1].split("&"),n=e[0],l=e[1];if(n){_(),c(i.recipe),$.search&&!l&&(e=>{Array.from(document.querySelectorAll(`.${t}`)).forEach((e=>e.classList.remove(r))),document.querySelector(`.results__link[href="#${e}"]`).classList.add(r)})(n),$.recipe=new u(n);try{await $.recipe.getRecipe(),$.recipe.parseIngredients(),a(),((e,s)=>{const n=`\n            <figure class="recipe__fig">\n                <img src="${e.img}" alt="${e.title}" class="recipe__img">\n                <h1 class="recipe__title">\n                    <span>${e.title}</span>\n                </h1>\n            </figure>\n\n            <div class="recipe__details">\n                <div class="recipe__info">\n                    <i class='bx bxs-time-five' ></i>\n                    <span class="recipe__info-data recipe__info-data--minutes">${e.time}</span>\n                    <span class="recipe__info-text"> minutes</span>\n                </div>\n                <div class="recipe__info">\n                    <i class='bx bxs-user'></i>\n                    <span class="recipe__info-data recipe__info-data--people">${e.servings}</span>\n                    <span class="recipe__info-text"> servings</span>\n\n                </div>\n                <button class="recipe__love">\n                    <i class="bx ${s?"bxs":"bx"}-heart" ></i>\n                </button>\n            </div>\n\n            <div class="recipe__ingredients">\n                <ul class="recipe__ingredient-list">\n                    ${e.ingredients.map((e=>{return`\n            <li class="recipe__item">\n                <i class='bx bxs-check-square recipe__icon' ></i>\n                <div class="recipe__count">${(i=e).count}</div>\n                <div class="recipe__ingredient">\n                     <span class="recipe__unit">${i.unit}</span>\n                    ${i.ingredient}\n                </div>\n            </li>\n`;var i})).join("")}\n                </ul>\n            </div>\n\n            <div class="recipe__directions">\n                <h2 class="heading-2">How to cook it</h2>\n                <p class="recipe__directions-text">\n                    This recipe was created by\n                    <span class="recipe__by">${e.author}</span>. Find out more details about the recipe below.\n                </p>\n                <a class="btn-small recipe__btn" href="${e.url}" target="_blank">\n                    <span>Directions</span>\n                    <i class='bx bxs-book-content'></i>\n                </a>\n            </div>\n    `;i.recipe.classList.add("glass"),i.recipe.insertAdjacentHTML("afterbegin",n)})($.recipe,$.like.isLiked(n))}catch(e){alert(e)}}}};["hashchange","load"].forEach((e=>window.addEventListener(e,R)));
//# sourceMappingURL=index.996e4238.js.map
