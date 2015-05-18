var PieGraph = new Class({
	options: {
		tips: null
	},
	Implements: [Events, Options],
	initialize: function (el, data, options)
	{
		this.data = data;
		this.setOptions(options);
		var g_data = this.mk_graph(data);
		this.g_data = g_data;

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
		var s = DataUtil.count_arr(c_d);
		s.sortOn("count", Array.DESC_NUMERIC);

		var c = [];
		var d = [];
		for (var i = 0; i < s.length; i++)
		{
			c.include({data: s[i].count, className: 'graph-' + (i % 17)});
			d.include(s[i].pid);
		}
		return {g: c, d: d};
	},
	graph_bind_events: function (el)
	{
		var d = this.data.graph_descs;
		var gr = this.gr;
		var map = this.g_data.d;
		var s = el.getElements('.ct-series');
		var l = s.length;
		var l1 = l - 1;
		for (var i = 0; i < l; i++)
		{
			var j = (l1 - i);
			switch (gr)
			{
				case 'c':
					s[i].store('tip:title', d[map[j]].n);
					s[i].store('tip:text', d[map[j]].d);
					break;
				case 'g':
					s[i].store('tip:title', d[map[j]]);
					break;
				case 'country':
					s[i].store('tip:title', d[map[j]].s);
					break;
			}
		}
		this.slices = s;
		var o = this.options;
		if (o.tips !== null)
		{
			o.tips.attach(s);
		}
	}
});