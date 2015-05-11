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
	set_data: function (data)
	{
		this.data = data;
		this.el.empty();
		this.build_graphs();
	},
	build_graphs: function ()
	{
		this.build_topic_graph();
		this.build_tag_graph();
		this.build_country_graph();
	},
	build_topic_graph: function ()
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[0] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		var data = this.data.points;

		var c_d = {};
		var y_d = {};

		for (var i = 0; i < data.length; i++)
		{
			var d = data[i].data;
			for (var yr in d)
			{
				var dd = d[yr];
				if (!y_d[yr])
				{
					y_d[yr] = {};
				}
				for (var k = 0; k < dd.length; k++)
				{
					var g_g = dd[k].g
					if (!c_d[g_g])
					{
						c_d[g_g] = 0;
					}
					if (!y_d[yr][g_g])
					{
						y_d[yr][g_g] = 0;
					}
					y_d[yr][g_g]++;
					c_d[g_g]++;
				}
			}
		}
		var i = 0;
		var r = [];
		var l = [];
		for (var pid in c_d)
		{
			l[i] = pid;
			r[i] = {
				data: c_d[pid],
				className: 'graph-' + (i % 17)
			};
			i++;
		}
		new Chartist.Pie(pie, {
			series: r,
			labels: l
		}, {showLabel: false});


		r = [];
		l = [];
		i = 0;
		for (var yr in y_d)
		{
			l[i] = yr;
			r[i] = [];
			for (var ct in y_d[yr])
			{
				r[i].include(y_d[yr][ct]);
			}
			i++;
		}
		new Chartist.Bar(bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	},
	build_tag_graph: function ()
	{

		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[1] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		var data = this.data.points;

		var c_d = {};
		var y_d = {};

		for (var i = 0; i < data.length; i++)
		{
			var d = data[i].data;
			for (var yr in d)
			{
				var dd = d[yr];
				if (!y_d[yr])
				{
					y_d[yr] = {};
				}
				for (var k = 0; k < dd.length; k++)
				{
					var qg_g = dd[k].c;
					for (var j = 0; j < qg_g.length; j++)
					{
						var g_g = qg_g[j];
						if (!c_d[g_g])
						{
							c_d[g_g] = 0;
						}
						if (!y_d[yr][g_g])
						{
							y_d[yr][g_g] = 0;
						}
						y_d[yr][g_g]++;
						c_d[g_g]++;
					}

				}
			}
		}
		var i = 0;
		var r = [];
		var l = [];
		for (var pid in c_d)
		{
			l[i] = pid;
			r[i] = {
				data: c_d[pid],
				className: 'graph-' + (i % 17)
			};
			i++;
		}
		new Chartist.Pie(pie, {
			series: r,
			labels: l
		}, {showLabel: false});


		r = [];
		l = [];
		i = 0;
		for (var yr in y_d)
		{
			l[i] = yr;
			r[i] = [];
			for (var ct in y_d[yr])
			{
				r[i].include(y_d[yr][ct]);
			}
			i++;
		}
		new Chartist.Bar(bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	},
	build_country_graph: function ()
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[2] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		var data = this.data.points;
		var c_d = {};
		var y_d = {};
		for (var i = 0; i < data.length; i++)
		{
			var c = data[i].c;
			var d = data[i].data;

			if (!c_d[c])
			{
				c_d[c] = 0;
			}
			c_d[c]++;
			for (var yr in d)
			{
				if (!y_d[yr])
				{
					y_d[yr] = {};
				}
				if (!y_d[yr][c])
				{
					y_d[yr][c] = 0;
				}
				var yr_d = d[yr];
				y_d[yr][c] = yr_d.length;
			}

		}
		var i = 0;
		var r = [];
		var l = [];
		for (var pid in c_d)
		{
			l[i] = pid;
			r[i] = {
				data: c_d[pid],
				className: 'graph-' + (i % 17)
			};
			i++;
		}
		new Chartist.Pie(pie, {
			series: r,
			labels: l
		}, {showLabel: false});

		r = [];
		l = [];
		i = 0;
		for (var yr in y_d)
		{
			l[i] = yr;
			r[i] = [];
			for (var ct in y_d[yr])
			{
				r[i].include(y_d[yr][ct]);
			}
			i++;
		}
		new Chartist.Bar(bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	}
});