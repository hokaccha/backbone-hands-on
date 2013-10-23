window.App = {};

$(function() {
  var schedules = new App.Schedules();

  var createFormView = new App.CreateFormView({
    el: '.createForm',
    collection: schedules
  });

  var calendarView = new App.CalendarView({
    el: '.calendar',
    collection: schedules
  });

  $('.calendar-prevBtn').click(function() {
    calendarView.toPrev();
  });

  $('.calendar-nextBtn').click(function() {
    calendarView.toNext();
  });

  $('.calendar-todayBtn').click(function() {
    calendarView.toToday();
  });
});
