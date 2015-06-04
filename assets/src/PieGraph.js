var PieGraph = new Class({
	Implements: [Events, Options],
	initialize: function (el, data, options)
	{
		this.data = data;
		this.setOptions(options);
		var g_data = this.mk_graph(data);
		this.g_data = g_data;
		this.tips = new Tips();
		var g = new Chartist.Pie(el,
			{
				series: g_data.g
			},
			{
				donut: true,
				donutWidth: 50,
				showLabel: false
			});
		g.on('created', this.graph_bind_events.bind(this, el));
	},
	get_g_data: function ()
	{
		return this.g_data;
	},
	mk_graph: function (data)
	{
		var gr = data.graph_group;
		var unit = data.unit;
		this.gr = gr;
		var c_d;

		switch (gr)
		{
			case 'c':
				c_d = DataUtil.group_by_c(data.graph_data);
				break;
			case 'g':
				c_d = DataUtil.group_by_g(data.graph_data);
				break;
			case 'country':
				c_d = DataUtil.group_by_country(data.graph_data);
				break;
		}
		var gga = DataUtil.count_arr(c_d, unit);
		var s = gga.r;
		this.total = gga.total;

		s.sortOn("count", Array.DESC_NUMERIC);

		var c = [];
		var d = [];
		for (var i = 0; i < s.length; i++)
		{
			c.include({data: s[i].p, className: 'graph-' + (i % 17)});
			d.include(s[i].pid);
		}
		return {g: c, d: d, u: unit};
	},
	get_total: function ()
	{
		return this.total;
	},
	graph_bind_events: function (el)
	{
		var d = this.data.graph_descs;
		var gr = this.gr;
		var p = this.g_data.g;

		var t = this.total;
		var map = this.g_data.d;
		var u = this.g_data.u;
		var s = el.getElements('.ct-series');
		var l = s.length;
		var l1 = l - 1;
		var st = 'projects';
		if (this.options.dtype)
		{
			switch (this.options.dtype)
			{
				case 0:
					st = 'projects';
					break;
				case 1:
					st = 'semesters';
					break;
				case 2:
					st = 'artists';
					break;
			}
		}
		for (var i = 0; i < l; i++)
		{
			var j = (l1 - i);
			var ad = ': ' + (p[j].data * (t / 100)).round(0) + (u === 0 ? ' ' + st : 'eur') + ' (' + (p[j].data).round(2) + '%)';
			switch (gr)
			{
				case 'c':
					s[i].store('tip:title', d[map[j]].n + ad);
					s[i].store('tip:text', d[map[j]].d);
					break;
				case 'g':
					s[i].store('tip:title', d[map[j]] + ad);
					break;
				case 'country':
					s[i].store('tip:title', d[map[j]].s + ad);
					break;
			}
		}
		if (this.tips)
		{
			this.tips.attach(s);
		}
	},
	destroy: function ()
	{
		this.tips.destroy();
	}
});