function Basket(idBasket) {
    this.id = idBasket;

    this.countGoods = 0; //Общее кол-во товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров
    this.getBasket(); //Получаем уже добавленные товары в корзину
}

/**
 * Метод добавляет контейнер для товаров на страницу.
 *
 * @param $root Коллекция jQuery - контейнер для товаров
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Basket.prototype.render = function ($root) {
  var $basketDiv = $('<div />', {
      id: this.id,
      text: 'Корзина'
  });

  var $basketItemsDiv = $('<div />', {
    id: this.id + '_items'
  });

  $basketItemsDiv.appendTo($basketDiv);
  $basketDiv.appendTo($root);

};

Basket.prototype.getBasket = function () {
    var appendId = '#' + this.id + '_items';

    $.ajax({
        type: 'GET',
        url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            var $basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            $basketData.append('Всего товаров: ' + this.countGoods + '</p>');
            $basketData.append('Общая стоимость: ' + this.amount + '</p>');

            $basketData.appendTo(appendId);

            for (var itemKey in data.basket)
            {
                this.basketItems.push(data.basket[itemKey]);
            }
        }
    });
};

Basket.prototype.add = function (idProduct, price) {
    var basketItem = {
      "id_product": idProduct,
      "price": price
    };

    this.amount +=price; //this.amount = this.amount + price
    this.countGoods++;
    this.basketItems.push(basketItem);
    this.refresh(); //Перерисовка корзины
};

Basket.prototype.refresh = function () {
    var $basketDataDiv = $('#basket_data');
    $basketDataDiv.empty();
    $basketDataDiv.append('Всего товаров: ' + this.countGoods + '</p>');
    $basketDataDiv.append('Общая стоимость: ' + this.amount + '</p>');
};

//ДЗ
Basket.prototype.remove = function (idProduct) {
  //TODO: Удаление товара из корзины
  let goodNumber = this.find(idProduct);

    if(goodNumber) {
      this.basketItems.splice(goodNumber, 1);
      let result = this.summa(idProduct);
      this.amount = result[1];
      this.countGoods = result[0];
    }

  this.refresh(); //Перерисовка корзины
};

Basket.prototype.find = function (id) {
  let number = false;

    this.basketItems.forEach(function(product, index) {
      if(product.id_product === id) {
        number = index;
      }
    });
  return number;
};

Basket.prototype.summa = function () {
  let goodCount = 0;
  let goodSumma = 0;

    this.basketItems.forEach(function(element) {
      ++goodCount;
      goodSumma += element.price;
    });
  return [goodCount, goodSumma];
};