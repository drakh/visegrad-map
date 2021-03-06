var DGraph = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, options)
	{
		this.dtype = 0;
		this.setOptions(options);
		this.g = [];
		this.btns = ['<i class="el el-tasks"></i>', '<i class="el el-eur"></i>'];
		this.switches = [];
		this.unit = 0;
		this.build_switch(el);

		var w = new Element('div').inject(el);
		this.el = w;
	},
	set_dtype: function (i)
	{
		this.dtype = i;
		this.switch_units(0);
		if (i == 0)
		{
			this.switch_el.setStyles({display: 'block'});
		}
		else
		{
			this.switch_el.setStyles({display: 'none'});
		}
	},
	build_switch: function (el)
	{
		var w = new Element('div', {
			class: 'pure-menu pure-menu-horizontal'
		}).inject(el);

		var ul = new Element('ul', {class: 'pure-menu-list'}).inject(w);

		var btns = this.btns;
		for (var i = 0; i < btns.length; i++)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(ul);
			var a = new Element('a', {
				class: 'pure-button',
				html: btns[i],
				events: {click: this.switch_units.bind(this, i)}
			}).inject(li);
			this.switches.include(a);
		}
		this.switch_units(0);
		this.switch_el = w;
	},
	switch_units: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		var b = this.switches;
		for (var j = 0; j < b.length; j++)
		{
			if (j == i)
			{
				b[j].removeClass('dark-bg');
				b[j].addClass('light-bg');
			}
			else
			{
				b[j].removeClass('light-bg');
				b[j].addClass('dark-bg');
			}
		}
		if (this.unit != i)
		{
			this.unit = i;
			this.build_graphs();
		}
	},
	set_data: function (data, f)
	{
		this.f = f;
		this.data = data;
		this.build_graphs();
	},
	destroy: function ()
	{
		var g = this.g;
		for (var i = 0; i < g.length; i++)
		{
			if (g[i])
			{
				g[i].destroy();
			}

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
		var pie = new Element('div', {class: 'pure-u-1-2 pure-u-md-1-6 ct-chart'}).inject(grid);
		var labels = new Element('div', {class: 'pure-u-1-2 pure-u-md-1-6 gp-labels'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		return {pie: pie, bar: bar, labels: labels};
	},
	build_graphs: function ()
	{
		this.destroy();
		var dt = this.dtype;
		switch (dt)
		{
			case 0:
				//this.build_topic_graph();
				this.build_tag_graph();
				this.build_country_graph();
				break;
			case 1:
				this.build_topic_graph();
				break;
			case 2:
				this.build_country_graph();
				this.build_topic_graph();
				this.build_tag_graph();
				break;
		}
	},
	build_topic_graph: function ()
	{
		var dt = this.dtype;
		if (this.f)
		{
			var re = this.build_graph_head(mapconf.graph_names[dt][0]);
			var data = this.data;
			var f = this.f;

			var g_d = {
				graph_data: data,
				graph_descs: f.g,
				graph_group: 'g',
				unit: this.unit
			};

			var g = new PieGraph(re.pie, g_d, {dtype: this.dtype});
			this.g.include(g);

			var s_d = g.get_g_data();

			this.build_labels(s_d, f.g, g.get_total(), re.labels);
			var b = new BarGraph(re.bar, {
				ord: s_d.d,
				c_d: DataUtil.group_by_g(data),
				y_d: DataUtil.group_by_year(data),
				g_d: f.g,
				g_g: 'g',
				unit: this.unit,
				dtype: this.dtype
			});
			this.g.include(b);
		}
	},
	build_labels: function (data, descs, total, el)
	{
		var w = new Element('div', {class: 'pure-menu'}).inject(el);
		var ul = new Element('ul', {
			class: 'pure-menu-list'
		}).inject(w);

		var gd = data.g;
		var dd = data.d;
		var unit = this.unit;
		for (var i = 0; i < gd.length; i++)
		{
			var n = gd[i];
			var d = dd[i];
			var nx = descs[d];
			var nm = descs[d];
			var title = null;
			if (nm['s'])
			{
				nx = nm['s'];
			}
			else if (nm['q'])
			{
				// if q is defined, also n must be defined
				nx = nm['q'];
				title = nm['n'];
			}
			else if (nm['n'])
			{
				nx = nm['n'];
			}
			else
			{
				nx = nm;
			}
			var li = new Element('li', {
				class: 'pure-menu-item',
				title: title,
				html: '<table><tr><td><span class="' + n.className + '"' + (false ? 'title="' + title + '"' : '') + '>&nbsp;</span></td><td>' + (nx) + ': ' + (unit === 0 ? '' : '€') + (n.data * (total / 100)).format({decimals:0}) + ' (' + n.data.round(2) + '%)</td></tr></table>'
			}).inject(ul);

		}
		//console.log(data);
	},
	build_tag_graph: function ()
	{
		var dt = this.dtype;
		if (this.f)
		{
			var re = this.build_graph_head(mapconf.graph_names[dt][1]);
			var data = this.data;
			var f = this.f;

			var g_d = {
				graph_data: data,
				graph_descs: f.c,
				graph_group: 'c',
				unit: this.unit
			};


			var g = new PieGraph(re.pie, g_d, {dtype: this.dtype});
			this.g.include(g);


			var s_d = g.get_g_data();
			this.build_labels(s_d, f.c, g.get_total(), re.labels);
			var b = new BarGraph(re.bar, {
				ord: s_d.d,
				c_d: DataUtil.group_by_c(data),
				y_d: DataUtil.group_by_year(data),
				g_d: f.c,
				g_g: 'c',
				unit: this.unit,
				dtype: this.dtype
			});
			this.g.include(b);
		}
	},
	build_country_graph: function ()
	{
		var dt = this.dtype;
		var re = this.build_graph_head(mapconf.graph_names[dt][2]);
		var data = this.data;

		var g_d = {
			graph_data: data,
			graph_descs: countries_geo,
			graph_group: 'country',
			unit: this.unit
		};


		var g = new PieGraph(re.pie, g_d, {dtype: this.dtype});
		this.g.include(g);


		var s_d = g.get_g_data();
		this.build_labels(s_d, countries_geo, g.get_total(), re.labels);
		var b = new BarGraph(re.bar, {
			ord: s_d.d,
			c_d: DataUtil.group_by_country(data),
			y_d: DataUtil.group_by_year(data),
			g_d: countries_geo,
			g_g: 'country',
			unit: this.unit,
			dtype: this.dtype
		});
		this.g.include(b);
	}
});
