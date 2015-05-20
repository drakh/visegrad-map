var DGraph = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.g = [];
		this.el = el;
	},
	set_data: function (data, f)
	{
		this.f = f;
		this.data = data;
		this.destroy();
		this.build_graphs();
	},
	destroy: function ()
	{
		var g = this.g;
		for (var i = 0; i < g.length; i++)
		{
			g[i].destroy();
		}
		this.g = [];
		this.el.empty();
	},
	build_graph_head: function (n)
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: n}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		return {pie: pie, bar: bar};
	},
	build_graphs: function ()
	{
		this.build_topic_graph();
		this.build_tag_graph();
		this.build_country_graph();
	},
	build_topic_graph: function ()
	{
		if (this.f)
		{
			var re = this.build_graph_head(mapconf.graph_names[0] + ':');
			var data = this.data;
			var f = this.f;

			var g_d = {
				graph_data: data,
				graph_descs: f.g,
				graph_group: 'g'
			};


			var g = new PieGraph(re.pie, g_d, {
				tips: this.options.tips
			});
			this.g.include(g);

			var s_d = g.get_g_data();
			var b = new BarGraph(re.bar, {
				ord: s_d.d,
				c_d: DataUtil.group_by_g(data),
				y_d: DataUtil.group_by_year(data)
			});
			this.g.include(b);
		}
	},
	build_tag_graph: function ()
	{
		if (this.f)
		{
			var re = this.build_graph_head(mapconf.graph_names[1] + ':');
			var data = this.data;
			var f = this.f;

			var g_d = {
				graph_data: data,
				graph_descs: f.c,
				graph_group: 'c'
			};


			var g = new PieGraph(re.pie, g_d, {
				tips: this.options.tips
			});
			this.g.include(g);


			var s_d = g.get_g_data();
			var b = new BarGraph(re.bar, {
				ord: s_d.d,
				c_d: DataUtil.group_by_c(data),
				y_d: DataUtil.group_by_year(data)
			});
			this.g.include(b);
		}
	},
	build_country_graph: function ()
	{
		var re = this.build_graph_head(mapconf.graph_names[2] + ':');
		var data = this.data;

		var g_d = {
			graph_data: data,
			graph_descs: countries_geo,
			graph_group: 'country'
		};


		var g = new PieGraph(re.pie, g_d, {
			tips: this.options.tips
		});
		this.g.include(g);


		var s_d = g.get_g_data();
		var b = new BarGraph(re.bar, {
			ord: s_d.d,
			c_d: DataUtil.group_by_country(data),
			y_d: DataUtil.group_by_year(data)
		});
		this.g.include(b);
	}
});