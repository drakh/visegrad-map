var VisegradApp = {
	initiated: false,
	first_time: true,
	init: function ()
	{
		if (this.initiated == false)
		{

			$$('body').addEvent('keydown', function (event)
			{
				// the passed event parameter is already an instance of the Event type.
				//console.log(event.key);   // returns the lowercase letter pressed.
				//alert(event.shift); // returns true if the key pressed is shift.
				if (event.key == 'l' && event.control)
				{
					$$('header').hide();
					$$('footer').hide();
					$$('.page-scroller').hide();
					$$('#map-controls').hide();
					$$('#mapsearch').hide();
					$$('#city-country').hide();
					$$('#e-graphs').hide();
					$$('#e-table').hide();
					$$('main.main-content').setStyle('top', 0);
				}
			});

			new PageScroller($$('section.page-section'));

			this.initiated = true;
			var dt         = [];
			var cities     = [];
			var u_cities   = [];
			for (var i = 0; i < mapdata.length; i++)
			{
				dt[i]      = DataUtil.flatten_data(mapdata[i], filters[i], i, u_cities);
				cities[i]  = dt[i].points;
				filters[i] = dt[i].filters;
			}

			this.msg_win = new MessageWin($('filter-message'));
			this.map     = new AppMap($(mapid), $('map-controls'), mapconf, {
				onGraphcreated: this.draw_graph.bind(this),
				onGraphdestroyed: this.graph_closed.bind(this)
			});
			this.graph   = new DGraph($('e-graphs'));
			this.table   = new DTable($('e-table'));

			this.filter = new PlaceFilter(dt, filters, {
				onFilterchanged: this.draw.bind(this),
				onDatachanged: this.data_changed.bind(this)
			});

			new SearchBox(u_cities, {
				onFound: this.move_map.bind(this)
			});
		}
	},
	move_map: function (p)
	{
		this.map.move_map(p, true);
	},
	data_changed: function (i)
	{
		this.graph.set_dtype(i);
		this.table.set_dtype(i);
		this.map.set_dtype(i);
	},
	draw: function (d)
	{
		this.all_data = d;
		var data      = d.data;
		var message   = d.message;
		var pts       = d.points;
		var sel       = d.sel;
		this.msg_win.set_message(message);
		this.map.draw_points(data, pts, filters[sel]);
		this.refill(d);
	},
	refill: function (d)
	{
		var data = d.data;
		var sel  = d.sel;
		this.graph.set_data(data, filters[sel]);
		this.table.set_data(data);
	},
	draw_graph: function (d_in)
	{
		var d  = this.all_data;
		var di = {data: d_in.data, sel: d.sel};
		this.refill(di);
	},
	graph_closed: function ()
	{
		this.refill(this.all_data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));

function color(c)
{
	$$('.marker-circle').setStyle('fill', c);
	$$('.marker-circle').setStyle('background-color', c);
	return 'At your service';
}
