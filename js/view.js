App.CreateFormView = Backbone.View.extend({
  events: {
    'submit': 'onSubmit'
  },

  onSubmit: function(e) {
    e.preventDefault();

    var title = this.$('input[name="title"]').val();
    var datetime = this.$('input[name="datetime"]').val();

    this.collection.add({
      title: title,
      datetime: moment(datetime)
    }, { validate: true });
  }
});

App.CalendarView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    var $caption = this.$('caption');
    var $tbody = this.$('tbody');
    var current = moment();
    var currentDay = current.clone().startOf('month').startOf('week');
    var endDay = current.clone().endOf('month');

    $caption.text( current.format('YYYY年MM月') );

    while (currentDay <= endDay) {
      var $tr = $('<tr>').appendTo($tbody);
      for (var i = 0; i < 7; i++) {
        var $td = $('<td>').text( currentDay.format('MM/DD') ).appendTo($tr);
        currentDay.add(1, 'day');
      }
    }
  }
});
