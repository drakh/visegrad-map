var DTable = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {
			limit: 50,
			page: 0,
			count: 0
		};


		var t = new Element('table', {class: 'pure-table pure-table-bordered pure-table-striped'}).inject(el);
		this.build_head(t);
		this.pager = new DPager(el, {onPagechanged: this.change_page.bind(this)});
		this.el = new Element('tbody').inject(t);
	},
	build_head: function (t)
	{
		var h = new Element('thead').inject(t);
		var r = new Element('tr').inject(h);
		new Element('th', {text: mapconf.table_headers[0]}).inject(r);
		new Element('th', {text: mapconf.table_headers[1]}).inject(r);
		new Element('th', {text: mapconf.table_headers[3]}).inject(r);
		new Element('th', {text: mapconf.table_headers[3]}).inject(r);
	},
	set_data: function (data)
	{
		this.pagination.page = 0;
		var d = data.points;
		var a = [];
		for (var i = 0; i < d.length; i++)
		{
			var dt = d[i].data;
			for (var yr in dt)
			{
				var y_d = dt[yr];
				for (var k = 0; k < y_d.length; k++)
				{
					var ae = {
						city: d[i].s,
						yr: yr,
						org: y_d[k].a,
						nm: y_d[k].name
					};
					a.include(ae);
				}
			}
		}
		this.pagination.count = a.length;
		this.table_data = a;
		this.pager.set_data(this.pagination);
	},
	change_page: function (p)
	{
		this.pagination = p;
		this.fill_table();
	},
	fill_table: function ()
	{

		var w = this.el;
		w.empty();
		var pg = this.pagination;
		var d = this.table_data;
		var min = pg.page * pg.limit;
		var max = min + pg.limit;
		if (max > d.length)
		{
			max = d.length;
		}

		for (var i = min; i < max; i++)
		{
			var r = new Element('tr');
			new Element('td', {text: d[i].city}).inject(r);
			new Element('td', {text: d[i].yr}).inject(r);
			new Element('td', {text: d[i].org}).inject(r);
			new Element('td', {text: d[i].nm}).inject(r);
			r.inject(w);
		}
	}
});