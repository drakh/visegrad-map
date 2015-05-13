var VisegradApp = {
	initiated: false,
	init: function ()
	{
		if (this.initiated == false)
		{
			this.initiated = true;

			this.msg_win = new MessageWin($('filter-message'));

			new PageScroller($$('section.page-section'));
			var tips = new Tips();
			this.map = new AppMap($(mapid), $('map-controls'), mapconf, {tips: tips});
			this.graph = new DGraph($('e-graphs'));
			this.table = new DTable($('e-table'));
			this.filter = new PlaceFilter(mapdata, filters, filter_countries, {
				onFilterchanged: this.draw.bind(this)
			});
		}
	},
	draw: function (d)
	{
		var data = d.data;
		var message = d.message;
		var sel = d.sel;
		this.msg_win.set_message(message);
		this.map.draw_points(data, filters[sel]);
		this.graph.set_data(data);
		this.table.set_data(data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));