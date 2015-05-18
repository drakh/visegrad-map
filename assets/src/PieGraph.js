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
	mk_graph: function (data)
	{
		console.log(data);
		var c_d = DataUtil.group_by_c(data.graph_data);
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
		console.log('bind tips');
		console.log(this.data);
		var d = this.data.graph_descs;
		var map = this.g_data.d;

		var s = el.getElements('.ct-series');
		var l = s.length;
		var l1 = l - 1;
		for (var i = 0; i < l; i++)
		{
			console.log(i);
			var j = (l1 - i);
			s[i].store('tip:title', d[map[j]]);
			/*
			 s[i].store('tip:text', this.mk_text(j));
			 */
		}
		this.slices = s;
		var o = this.options;

		if (o.tips !== null)
		{
			o.tips.attach(s);
		}

	}
});