var VisegradApp = {
	initiated: false,
	init: function ()
	{
		if (this.initiated == false)
		{
			var tips = new Tips();
			new PageScroller($$('section.page-section'));

			this.initiated = true;
			var dt = [];
			for (var i = 0; i < mapdata.length; i++)
			{
				dt[i] = DataUtil.flatten_data(mapdata[i]);
			}
			this.msg_win = new MessageWin($('filter-message'));
			this.map = new AppMap($(mapid), $('map-controls'), mapconf, {tips: tips});
			this.graph = new DGraph($('e-graphs'), {tips: tips});
			this.table = new DTable($('e-table'));

			this.filter = new PlaceFilter(dt, filters, filter_countries, {
				onFilterchanged: this.draw.bind(this)
			});
		}
	},
	draw: function (d)
	{
		this.all_data = d;
		var data = d.data;
		var message = d.message;
		var pts = d.points;
		var sel = d.sel;
		this.msg_win.set_message(message);
		this.map.draw_points(data, pts, filters[sel]);
		this.graph.set_data(data,filters[sel]);
		this.table.set_data(data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));