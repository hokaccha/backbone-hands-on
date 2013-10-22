window.App = {};

$(function() {
  var schedule = new App.Schedule();

  schedule.set({
    'title': '打ち合わせ',
    'datetime': moment('2013-10-26 15:00')
  });

  $('body').html(
    schedule.get('datetime').format('MM月DD日 HH時mm分') + '：' + schedule.get('title')
  );
});
