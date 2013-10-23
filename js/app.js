window.App = {};

App.mediator = _.extend({}, Backbone.Events);

$(function() {
  var Router = Backbone.Router.extend({
    routes: {
      ':year/:month': 'calendar',
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

      this.listenTo(App.mediator, 'route:change', this.changeRoute);
    },
    changeRoute: function(route) {
      this.navigate(route);
    },
    calendar: function(year, month) {
      this.calendarView.moveTo(year, month);
    },
    today: function() {
      this.calendarView.toToday();
    }
  });

  new Router();
  Backbone.history.start();
});
