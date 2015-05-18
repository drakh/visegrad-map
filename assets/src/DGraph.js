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
		this.el.empty();
		this.build_graphs();
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
			var s_d = g.get_g_data();

			var ord = s_d.d;
			var l = [];
			var r = [];
			var c_d = DataUtil.group_by_g(data);
			var y_d = DataUtil.group_by_year(data);
			for (var yr in y_d)
			{
				l.include(yr);
			}

			for (var c = 0; c < ord.length; c++)
			{
				var grd = {data: [], className: 'graph-' + (c % 17)};
				var cid = ord[c];
				var c_y_d = {};

				if (c_d[cid])
				{
					var crd = c_d[cid];
					c_y_d = DataUtil.group_by_year(crd);
				}
				for (var i = 0; i < l.length; i++)
				{
					grd.data[i] = 0;
					if (c_y_d[l[i]])
					{
						grd.data[i] = c_y_d[l[i]].length;
					}
				}
				r[c] = grd;
			}
			new Chartist.Bar(re.bar, {
				labels: l,
				series: r
			}, {stackBars: true});
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
			var s_d = g.get_g_data();

			var ord = s_d.d;
			var l = [];
			var r = [];
			var c_d = DataUtil.group_by_c(data);
			var y_d = DataUtil.group_by_year(data);
			for (var yr in y_d)
			{
				l.include(yr);
			}

			for (var c = 0; c < ord.length; c++)
			{
				var grd = {data: [], className: 'graph-' + (c % 17)};
				var cid = ord[c];
				var c_y_d = {};

				if (c_d[cid])
				{
					var crd = c_d[cid];
					c_y_d = DataUtil.group_by_year(crd);
				}
				for (var i = 0; i < l.length; i++)
				{
					grd.data[i] = 0;
					if (c_y_d[l[i]])
					{
						grd.data[i] = c_y_d[l[i]].length;
					}
				}
				r[c] = grd;
			}
			new Chartist.Bar(re.bar, {
				labels: l,
				series: r
			}, {stackBars: true});
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
		var s_d = g.get_g_data();

		var ord = s_d.d;
		var l = [];
		var r = [];
		var c_d = DataUtil.group_by_country(data);
		var y_d = DataUtil.group_by_year(data);
		for (var yr in y_d)
		{
			l.include(yr);
		}

		for (var c = 0; c < ord.length; c++)
		{
			var grd = {data: [], className: 'graph-' + (c % 17)};
			var cid = ord[c];
			var c_y_d = {};

			if (c_d[cid])
			{
				var crd = c_d[cid];
				c_y_d = DataUtil.group_by_year(crd);
			}
			for (var i = 0; i < l.length; i++)
			{
				grd.data[i] = 0;
				if (c_y_d[l[i]])
				{
					grd.data[i] = c_y_d[l[i]].length;
				}
			}
			r[c] = grd;
		}
		new Chartist.Bar(re.bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	}
});