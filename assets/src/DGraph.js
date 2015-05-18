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
		//this.build_topic_graph();
		//this.build_tag_graph();
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

		var data = this.data;
		console.log(data);
		/*
		 var g_d = {
		 graph_data: pt.data,
		 graph_descs: graph_f.c,
		 graph_group: 'c'
		 };

		 this.g = new PieGraph(g_el, g_d, {
		 tips: this.options.tips
		 });
		 */

		/*
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
		 */
	},
	build_tag_graph: function ()
	{
		var re = this.build_graph_head(mapconf.graph_names[1] + ':');
		var data = this.data;
		/*
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
		 */
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
		console.log(r);

		new Chartist.Bar(re.bar, {
			labels: l,
			series: r
		}, {stackBars: true});
	}
});