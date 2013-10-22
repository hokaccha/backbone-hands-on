window.App = {};

$(function() {
  var schedule = new App.Schedule();

  schedule.on('change', function() {
    $('body').html(
      schedule.dateFormat('MM月DD日 HH時mm分') + '：' + schedule.get('title')
    );
  });

  schedule.on('invalid', function(model, message) {
    alert('Error: ' + message);
  });

  schedule.set({
    'title': '打ち合わせ',
    'datetime': moment('2013-10-26 15:00')
  }, { validate: true });
});
