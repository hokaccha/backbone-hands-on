window.App = {};

App.mediator = _.extend({}, Backbone.Events);

$(function() {
  var Router = Backbone.Router.extend({
    routes: {
      '*default': 'today'
    },
    initialize: function() {
      this.schedules = new App.Schedules();
      this.schedules.fetch();

      this.calendarView = new App.CalendarView({
        el: '.calendar',
        collection: this.schedules
      });

      this.formDialogView = new App.FormDialogView({
        el: '.dialog',
        collection: this.schedules
      });

      this.calendarControlView = new App.CalendarControlView({
        el: '.calendar-control'
      });
    },
    today: function() {
      this.calendarView.toToday();
    }
  });

  App.router = new Router();
  Backbone.history.start();
});
