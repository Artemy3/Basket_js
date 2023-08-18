// -- создать масив из обектов это будет список товаров (1) изображение 2)имя 3) цена ) +
// -- отобразить масив(список товаров) в дисплей +
// -- добавить каждому обьекту кновку "добавления товара" +
// -- создать еще один пустой масив (корзина) + 
// -- отследить клик по кнопке "добавление товара" в списке товаров +
// -- по клику отслеживать id на который нажали и добавлять выбранный обьект в пустой масив (корзина) +
// -- сделать модальное окно +
// -- отследить клик по кновке "открыть корзину" +
// -- по клику на "открыть корзину" отобразить масив (корзина) в дисплей +
// -- добавить каждому обьекту в масиве (корзина) кнопку "удалить товар" +
// -- отследить клик по кнопке "удалить товар" +
// -- по клику на "удалить товар" отследить id на который нажали и удалять выбраный обьект из масива +
// -- добавить счетчик товаров в корзине +
// -- добавить различее товару (добавлен или нет) +



const modal = document.getElementById('myModal');
const btnBasket = document.getElementById("basket");
const span = document.getElementsByClassName("close")[0];
const btnClothes = document.getElementById('btnClothes');
const btnTechnic = document.getElementById('btnTechnic');




btnBasket.addEventListener('click', () => {
   modal.style.display = "block";
   renderBasketProduct(baskets);
});


span.addEventListener('click', () => {
   modal.style.display = "none";
});


window.addEventListener('click', () => {
   if (event.target == modal) {
      modal.style.display = "none";
   }
});

function myFunction() {
   document.getElementById("myDropdown").classList.toggle("show");
};



const productList = document.getElementById('productList');
const basketBody = document.getElementById('basketBody');

let products = [
   {
      id: '1',
      name: 'Футболка',
      price: 1600,
      category: 'clothes',
   },
   {
      id: '2',
      name: 'Джинсы',
      price: 3200,
      category: 'clothes',
   },
   {
      id: '3',
      name: 'Худи',
      price: 3500,
      category: 'clothes',
   },
   {
      id: '4',
      name: 'Рубашка',
      price: 2800,
      category: 'clothes',
   },
   {
      id: '5',
      name: 'Брюки',
      price: 4000,
      category: 'clothes',
   },
   {
      id: '6',
      name: 'Телевизор',
      price: 75000,
      category: 'technic',
   },
   {
      id: '7',
      name: 'Ноутбук',
      price: 68000,
      category: 'technic',
   },
   {
      id: '8',
      name: 'Утюг',
      price: 3000,
      category: 'technic',
   }
];

let baskets = [];


btnClothes.addEventListener('click', () => {
   renderClothes(products);
});

btnTechnic.addEventListener('click', () => {
   renderTechnic(products);
});


const addGoodToBasket = (id) => {
   let select = products.find((product) => {
      return product.id === id
   })
   const productForBasket = {
      ...select,
      count: 1,
   }
   baskets.push(productForBasket);

   renderProducts(products);
};


const deleteProductFromBasket = (id) => {
   let newBaskets = baskets.filter((basket) => {
      return basket.id !== id;
   });
   baskets = newBaskets;
   renderBasketProduct(newBaskets);
   renderProducts(products);
};


const finalPrice = () => {
   let cost = 0;

   for (let i = 0; i < baskets.length; i++) {
      const basket = baskets[i];
      cost = cost + basket.price * basket.count;
   }
   return cost;
};



const renderClothes = (category) => {
   let ClothesAray = products.filter((product) => {
      return product.category === 'clothes';
   });
   products = ClothesAray;
   renderProducts(products);
};


const renderTechnic = (category) => {
   let TechnicAray = products.filter((product) => {
      return product.category === 'technic';
   });
   products = TechnicAray;
   renderProducts(products);
};



const renderProducts = (products) => {

   productList.innerHTML = '';

   for (let i = 0; i < products.length; i++) {
      const product = products[i];

      const isProductExistsInBasket = baskets.find((productInBasket) => {
         return productInBasket.id === product.id
      });

      const $productName = document.createElement('span');
      $productName.innerText = product.name;
      const $productPrice = document.createElement('span');
      $productPrice.innerText = product.price;
      const $card = document.createElement('div');

      $card.classList.add('cardGoods');

      $card.appendChild($productName);
      $card.appendChild($productPrice);

      productList.appendChild($card);

      if (isProductExistsInBasket) {
         const $cardInput = document.createElement('span');
         $cardInput.innerText = 'Товар в корзине';
         $card.appendChild($cardInput);
      } else {
         const $addButton = document.createElement('button');
         $addButton.innerText = 'Добавить в корзину';
         $addButton.addEventListener('click', () => {
            addGoodToBasket(product.id);
         })
         $card.appendChild($addButton);
      }

   }


};

renderProducts(products);


const renderBasketProduct = (baskets) => {

   basketBody.innerHTML = '';

   for (let i = 0; i < baskets.length; i++) {
      const basket = baskets[i];

      const $productName = document.createElement('span');
      $productName.innerText = basket.name;
      const $productPrice = document.createElement('span');
      $productPrice.innerText = basket.price;
      const $card = document.createElement('div');

      const $deliteButton = document.createElement('button');
      $deliteButton.innerText = 'Удалить';
      $deliteButton.addEventListener('click', () => {
         deleteProductFromBasket(basket.id);
      })

      const $minusButton = document.createElement('button');
      $minusButton.innerText = '-';
      $minusButton.addEventListener('click', () => {
         if (parseInt($counter.innerText) > 1) {
            $counter.innerText = --$counter.innerText;

            basket.count--;

            $price.innerText = basket.count * basket.price;

            const result = finalPrice();
            const $finalPrice = document.getElementById('finalPrice');
            $finalPrice.innerText = result;
         }


      })

      const $counter = document.createElement('span');
      $counter.innerText = '1';

      const $priceName = document.createElement('span');
      $priceName.innerText = 'Цена:';

      const $price = document.createElement('span');


      const $plusButton = document.createElement('button');
      $plusButton.innerText = '+';
      $plusButton.addEventListener('click', () => {
         $counter.innerText = ++$counter.innerText;
         basket.count = basket.count + 1;

         $price.innerText = basket.count * basket.price;

         const result = finalPrice();
         const $finalPrice = document.getElementById('finalPrice');
         $finalPrice.innerText = result;

      })



      $card.classList.add('cardGoods');

      $card.appendChild($productName);
      $card.appendChild($productPrice);
      $card.appendChild($deliteButton);
      $card.appendChild($minusButton);
      $card.appendChild($counter);
      $card.appendChild($plusButton);
      $card.appendChild($priceName);
      $card.appendChild($price);

      basketBody.appendChild($card);

   }


   const $total = document.createElement('span');
   $total.innerText = 'Итого:';

   const $totalPrice = document.createElement('span');
   $totalPrice.innerText = finalPrice();
   $totalPrice.setAttribute('id', 'finalPrice');

   basketBody.appendChild($total);
   basketBody.appendChild($totalPrice);


};







// Спред оператор
// наполеон
// фьюзэйт