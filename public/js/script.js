const selectBox = document.getElementById('select-box');
const url = "https://fakestoreapi.com/products" 

const cards = document.getElementById('cards-container')
selectBox.addEventListener('change', () => {
cards.innerHTML = ""
  const selectBoxValue = selectBox.value;
  fetch(url)
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        if (selectBoxValue === 'all' || product.category === selectBoxValue) {
          showProduct(product)
        }
      });
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
});
selectBox.dispatchEvent(new Event('change'));
// create the elements and add to cards container
function showProduct(product){
  let card = document.createElement('div')
  card.className = "px-5 pt-5 pb-3 border border-solid border-border relative flex flex-col  justify-between"
  let backArrowIcon = document.createElement('i')
  backArrowIcon.className = "las la-arrow-circle-right text-lg text-text absolute right-3.5 top-0 cursor-pointer p-1 invisible select-none"
  card.appendChild(backArrowIcon)
  let imgDiv = document.createElement('div')
  imgDiv.className = "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none bg-background h-52 transition hover:scale-105"
  let productImg = document.createElement('img')
  productImg.className = "h-full w-full object-center object-contain"
  productImg.src = product.image
  productImg.alt = `${product.title}`
  imgDiv.appendChild(productImg)
  card.appendChild(imgDiv)
  let productInfo = document.createElement('div')
  productInfo.className = "mt-2 flex-1"
  card.appendChild(productInfo)
  let heading = document.createElement('h2')
  heading.className = "text-text text-sm font-black lg:text-base"
  heading.innerHTML = product.title
  productInfo.appendChild(heading)
  let Pdescription = document.createElement('p')
  Pdescription.className = "text-text text-sm lg:text-base text-ellipsis overflow-hidden whitespace-nowrap"
  Pdescription.innerHTML = product.description
  productInfo.appendChild(Pdescription)
  let ratingDiv = document.createElement('div')
  card.appendChild(ratingDiv)
  for(let i = 0 ; i < 5; i++){
    let straIcon = document.createElement('i')
    straIcon.className = "las la-star text-yellow-300"
    ratingDiv.appendChild(straIcon)
  }
  let rate = document.createElement('span')
  rate.className = "text-text p-0 m-1 text-start bg-red"
  rate.innerHTML = `(${product.rating.count})`
  ratingDiv.appendChild(rate)
  let priceDiv = document.createElement('div')
  card.appendChild(priceDiv)
  let priceNum = document.createElement('span')
  priceNum.className = 'text-text font-bold'
  priceNum.innerHTML = `$${product.price}`
  priceDiv.appendChild(priceNum)
  let addToCart = document.createElement('a')
  addToCart.innerHTML = "Add To Cart"
  addToCart.className ="py-1 px-3 mt-1 cursor-pointer border-border border-solid border text-text font-bold text-center block hover:bg-accent"
  card.appendChild(addToCart)
  cards.appendChild(card)
  showAndHideDescription(imgDiv,backArrowIcon,Pdescription)
}

function showAndHideDescription(img,backArrow,paragraph){
     img.addEventListener('click', () => {
      img.classList.add('hidden')
      backArrow.classList.remove("invisible")
      paragraph.classList.add('show')
     })
     backArrow.addEventListener('click', () => {
      img.classList.remove('hidden')
      backArrow.classList.add("invisible")
      paragraph.classList.remove('show')
     })
}
// switch theme & icon
const themeIcon = document.getElementById('theme-icon')
themeIcon.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark')
  document.documentElement.classList.contains('dark') ? themeIcon.classList.replace('la-moon','la-sun') : themeIcon.classList.replace('la-sun','la-moon')
 addThemeToStorage()

})

function addThemeToStorage() {
  const chosenTheme = document.documentElement.classList.value;
  localStorage.setItem("theme", `${chosenTheme}`);
}

function setTheChosenTheme() {
  if (localStorage.getItem("theme")) {
    document.documentElement.className = localStorage.getItem("theme");
    themeIcon.classList.replace('la-moon','la-sun')
  }
}
setTheChosenTheme();

// scroll up 
const scrollToUp = document.getElementById('scroll-to-top')
window.onscroll = function(){
  this.scrollY >= 1000 ? scrollToUp.classList.replace('-right-10','right-4') : scrollToUp.classList.replace('right-4','-right-10')
}
scrollToUp.onclick = () =>  {
  window.scrollTo({
    top: 0
  })
}