function Good(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
}

Good.prototype.render = function ($containerGood) {
    var $goodContainer = $('<div />', {
        class: 'good'
    });

    var $goodTitle = $('<p />', {
        text: this.title
    });

    var $goodPrice = $('<p>Цена: <span class="product-price">' + this.price + '</span> руб.</p>');

    var $goodBtnAdd = $('<button />', {
        class: 'good-buy',
        text: 'Купить',
        'data-id': this.id
    });

    //TODO: Создать кнопку для удаления товара

    //Создаем структуру
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtnAdd.appendTo($goodContainer);

    $containerGood.append($goodContainer);
};