window.App = {};

App.mediator = _.extend({}, Backbone.Events);

$(function() {
  var schedules = new App.Schedules();

  schedules.fetch();

  var calendarView = new App.CalendarView({
    el: '.calendar',
    collection: schedules
  });

  var formDialogView = new App.FormDialogView({
    el: '.dialog',
    collection: schedules
  });

  var calendarControlView = new App.CalendarControlView({
    el: '.calendar-control'
  });
});
