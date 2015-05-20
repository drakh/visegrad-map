var VisegradApp = {
	initiated: false,
	first_time: true,
	init: function ()
	{
		if (this.initiated == false)
		{

			new PageScroller($$('section.page-section'));

			this.initiated = true;
			var dt = [];
			var cities = [];
			for (var i = 0; i < mapdata.length; i++)
			{
				dt[i] = DataUtil.flatten_data(mapdata[i]);
				cities[i] = dt[i].points;
			}
			/*
			 var idx_arr = DataUtil.prepare_index({
			 countries: countries_geo,
			 cities: cities
			 });
			 */
			this.msg_win = new MessageWin($('filter-message'));
			this.map = new AppMap($(mapid), $('map-controls'), mapconf, {
				onGraphcreated: this.draw_graph.bind(this),
				onGraphdestroyed: this.graph_closed.bind(this)
			});
			this.graph = new DGraph($('e-graphs'));
			this.table = new DTable($('e-table'));

			this.filter = new PlaceFilter(dt, filters, filter_countries, {
				onFilterchanged: this.draw.bind(this)
			});
		}
	},
	create_index: function ()
	{

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
		this.refill(d);
	},
	refill: function (d)
	{
		var data = d.data;
		var sel = d.sel;
		this.graph.set_data(data, filters[sel]);
		this.table.set_data(data);
	},
	draw_graph: function (d_in)
	{
		var d = this.all_data;
		var di = {data: d_in.data, sel: d.sel};
		this.refill(di);
	},
	graph_closed: function ()
	{
		this.refill(this.all_data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));