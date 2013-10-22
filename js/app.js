window.App = {};

$(function() {
  var schedules = new App.Schedules();

  $('.createForm').submit(function(e) {
    e.preventDefault();

    var title = $('input[name="title"]').val();
    var datetime = $('input[name="datetime"]').val();

    schedules.add({
      title: title,
      datetime: moment(datetime)
    }, { validate: true });
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
