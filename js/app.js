window.App = {};

$(function() {
  var schedules = new App.Schedules();

  schedules.on('add', function(model) {
    var $p = $('<p>').html(
      model.dateFormat('MM月DD日 HH時mm分') + '：' + model.get('title')
    );

    $('body').append($p);
  });

  schedules.on('invalid', function(model, message) {
    alert(message);
  });

  schedules.add({
    title: '打ち合わせ',
    datetime: moment('2013-10-26 15:00')
  }, { validate: true });

  schedules.add({
    title: '勉強会',
    datetime: moment('2013-10-27 20:00')
  }, { validat: true });
});
