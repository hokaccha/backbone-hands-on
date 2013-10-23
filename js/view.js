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
    this.current = moment();
    this.render();

    this.listenTo(this.collection, 'add change', this.render);
  },
  render: function() {
    var $caption = this.$('caption');
    var $tbody = this.$('tbody');
    var currentDay = this.current.clone().startOf('month').startOf('week');
    var endDay = this.current.clone().endOf('month');

    $tbody.empty();
    $caption.text( this.current.format('YYYY年MM月') );

    while (currentDay <= endDay) {
      var $tr = $('<tr>').appendTo($tbody);
      for (var i = 0; i < 7; i++) {
        var cell = new App.CalendarCellView({
          date: currentDay.clone(),
          collection: this.collection,
        });
        $tr.append(cell.el);
        currentDay.add(1, 'day');
      }
    }
  },
  toPrev: function() {
    this.current.subtract(1, 'month');
    this.render();
  },
  toNext: function() {
    this.current.add(1, 'month');
    this.render();
  },
  toToday: function() {
    this.current = moment();
    this.render();
  }
});

App.CalendarCellView = Backbone.View.extend({
  tagName: 'td',

  template:
    '<div class="calendar-date"><%= date.format("MM/DD") %></div>' +
    '<ul class="calendar-list"></ul>',

  initialize: function(options) {
    this.date = options.date;
    this.render();
  },
  render: function() {
    var html = _.template(this.template, { date: this.date });
    this.$el.html(html);

    var schedules = this.collection.findByDate(this.date);

    var $list = this.$('ul').empty();

    _.each(schedules, function(model) {
      var item = new App.CalendarItemView({ model: model });
      $list.append(item.el);
    }, this);
  }
});

App.CalendarItemView = Backbone.View.extend({
  tagName: 'li',

  template:
    '<time><%= date %></time>' +
    '<span><%= title %></span>',

  events: {
    'click': 'onClick'
  },

  initialize: function() {
    this.render();
  },
  render: function() {
    var html = _.template(this.template, {
      date: this.model.dateFormat('HH:mm'),
      title: this.model.get('title')
    });

    this.$el.html(html);
  },
  onClick: function() {
    App.formDialogView.open(this.model);
  }
});

App.FormDialogView = Backbone.View.extend({
  events: {
    'submit form': 'onSubmit',
    'click .dialog-close': 'close'
  },

  initialize: function() {
    this.listenTo(this.collection, 'change', this.close);
    this.listenTo(this.collection, 'invalid', this.onError);
  },
  render: function() {
    this.$('input[name="title"]').val(this.model.get('title'));
    this.$('input[name="datetime"]').val(this.model.dateFormat('YYYY-MM-DDTHH:mm'));
    this.$el.show();
  },
  open: function(model) {
    this.model = model;
    this.render();
  },
  close: function() {
    this.$el.hide();
  },
  onSubmit: function(e) {
    e.preventDefault();

    var title = this.$('input[name="title"]').val();
    var datetime = this.$('input[name="datetime"]').val();

    this.model.set({
      title: title,
      datetime: moment(datetime)
    }, { validate: true });
  },
  onError: function(model, message) {
    alert(message);
  }
});
