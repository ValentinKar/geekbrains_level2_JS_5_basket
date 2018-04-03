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
    //splice
  this.refresh();
};