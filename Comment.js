function Comment(idReviews) {
    this.id = idReviews;  // Первая часть идентификатора тегов
    this.idDivForReviews = 'reviews'; // Идентификатор дива в который вставляются комментарии
    this.commentsArray = []; //Массив для хранения комментариев
    this.getReviews(); //Получаем уже добавленные на сайт комментарии
}

/**
 * Метод добавляет контейнер для ... на страницу.
 *
 * @param $root Кол......
 * @return Значение типа String (не нужен, так как его нет в методе)
 */
Comment.prototype.render = function ($root) {

  let $commentDiv = $('<div />', {
      id: this.id,
      text: 'Добавить отзыв от пользователя с id = '
  });

  let $idUserInput = $('<input />', {
    id: this.id + '_user',
    value: '12'
  });

  let $newReviewTextarea = $('<div />');
  $('<textarea />', {
    id: this.id + '_review',
    cols: 40,
    rows: 10
  }).appendTo($newReviewTextarea);


  let $reviewButtonAdd = $('<button />', {
      class: 'add-comment',
      text: 'добавить',
      'data-id': this.id + '_add'
  });

      let $deleteCommentButton = $('<div />');
      $('<input />', {
        id: this.id + '_delete',
        value: '124'
      }).appendTo($deleteCommentButton);
      $('<button />', {
          class: 'del-comment',
          text: 'удалить отзыв по id'
      }).appendTo($deleteCommentButton);

  let $approveCommentButton = $('<div />');
  $('<input />', {
    id: this.id + '_approve',
    value: '124'
  }).appendTo($approveCommentButton);
  $('<button />', {
      class: 'appr-comment',
      text: 'одобрить отзыв по id'
  }).appendTo($approveCommentButton);

      let $reviewsDiv = $('<div />', {
          id: this.idDivForReviews
      });

  $idUserInput.appendTo($commentDiv);
  $newReviewTextarea.appendTo($commentDiv);
  $reviewButtonAdd.appendTo($commentDiv);
  $deleteCommentButton.appendTo($commentDiv);
  $approveCommentButton.appendTo($commentDiv);
  $commentDiv.appendTo($root);
  $root.append('<hr />');
  $root.append('Отзывы: </p>');
  $reviewsDiv.appendTo($root);
};

Comment.prototype.getReviews = function () {
    $.ajax({
        type: 'GET',
        url: './reviews.json',
        dataType: 'json',
        context: this,
        success: function (data) {
          if (data.result === 1) {
            this.reviewsArray(data.comments);
            this.showReviews();
          }
        }
    });
};

Comment.prototype.reviewsArray = function (reviews) {
    for (let itemKey in reviews)
    {
        this.commentsArray.push(reviews[itemKey]);
    }
}

Comment.prototype.showReviews = function () {
    let appendId = `#${this.idDivForReviews}`;
    let $dataDiv = $('<div />', {
    });

    this.commentsArray.forEach(function(comment, index) {
      let $comentDiv = $('<div />', {
          class: 'review-div'
      });

        let $goodBtnDelete = $('<button />', {
            class: 'comment-delete',
            text: 'Удалить комментарий'
        });
          let $reviewApprove = $('<button />', {
              class: 'comment-approve',
              text: 'Одобрить комментарий'
          });

      $comentDiv.append('id comment: ' + comment.id_comment + '</p>');
      $comentDiv.append('result: ' + comment.result + '</p>');
      $comentDiv.append('id пользователя: ' + comment.id_user + '</p>');
      $comentDiv.append('текст комментария: ' + comment.text + '</p>');
      $comentDiv.append('состояние отзыва: ' + comment.error_message + '</p>');
      $comentDiv.append($goodBtnDelete);
      $comentDiv.append($reviewApprove);
      $dataDiv.append($comentDiv);

    });
    $dataDiv.appendTo(appendId);

      $('.comment-delete').on('click', function () {
          alert('Как определить обработчик событий для ' 
            + 'этой кнопки(удаление) в файле index.html?');
          // this.remove(124);
      });
    $('.comment-approve').on('click', function () {
        alert('Как определить обработчик событий для ' 
          + 'этой кнопки(одобрение) в файле index.html?');
    });
};

Comment.prototype.findIndComment = function () {
  let number = this.commentsArray[this.commentsArray.length - 1].id_comment;
  return ++number;
};

Comment.prototype.add = function (idUser, text) {
      let review = {
        "id_comment": this.findIndComment(),
        "result": 1,
        "id_user": idUser,
        "text": text,
        "error_message": "Ваш отзыв был отправлен на модерацию"
      };
    this.commentsArray.push(review);
    this.refresh();
};

Comment.prototype.refresh = function () {
    let $revDataDiv = $(`#${this.idDivForReviews}`);
    $revDataDiv.empty();
    this.showReviews();
};

Comment.prototype.remove = function (id) {
  let commentIdForDelete = this.find(id);

    if(commentIdForDelete) {
      this.commentsArray.splice(commentIdForDelete, 1);
    }
  this.refresh();
};

Comment.prototype.find = function (id) {
  let number = false;

    this.commentsArray.forEach(function(review, index) {
      if(review.id_comment === id) {
        number = index;
      }
    });
  return number;
};

Comment.prototype.approve = function (id) {
  let commentIdForApprove = this.find(id);

    if(commentIdForApprove) {
      this.commentsArray[commentIdForApprove].result = 2;
      this.commentsArray[commentIdForApprove].error_message = 'Ваш отзыв одобрен';
    }
  this.refresh();
};