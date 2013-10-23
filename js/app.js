window.App = {};

$(function() {
  var schedules = new App.Schedules();

  var createFormView = new App.CreateFormView({
    el: '.createForm',
    collection: schedules
  });

  $('.filterForm').submit(function(e) {
    e.preventDefault();

    var date = $('input[name="filterDate"]').val();
    var results = schedules.findByDate(date);

    $('.count').html(results.length + '件の予定があります');
    $('.list').empty();

    _.each(results, function(model) {
      var $li = $('<li>').html(
        model.dateFormat('MM月DD日 HH時mm分') + '：' + model.get('title')
      );
      $('.list').append($li);
    });
  });

  schedules.on('add', function(model) {
    $('.count').html(schedules.length + '件の予定があります');

    var $li = $('<li>').html(
      model.dateFormat('MM月DD日 HH時mm分') + '：' + model.get('title')
    );

    $('.list').append($li);
  });

  schedules.on('invalid', function(model, message) {
    alert(message);
  });
});
