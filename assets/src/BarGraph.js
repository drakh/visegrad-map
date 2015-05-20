var BarGraph = new Class({
	Implements: [Events, Options],
	initialize: function (el, in_d, options)
	{
		this.setOptions(options);
		this.tips = new Tips();
		this.data = in_d;
		var ord = in_d.ord;
		var y_d = in_d.y_d;
		var c_d = in_d.c_d;

		var l = [];
		var r = [];
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
		this.s_d = r;
		var g = new Chartist.Bar(el, {
			labels: l,
			series: r
		}, {stackBars: true});
		g.on('created', this.graph_bind_events.bind(this, el));
	},
	graph_bind_events: function (el)
	{
		var d = this.data;
		var sw = d.g_g;

		var r = this.s_d;

		var s = el.getElements('.ct-series');
		var lns = [];
		for (var i = 0; i < s.length; i++)
		{
			var cid = d.ord[i];

			var l = s[i].getElements('.ct-bar');
			for (var j = 0; j < l.length; j++)
			{
				switch (sw)
				{
					case 'country':
						l[j].store('tip:title', d.g_d[cid].s);
						break;
					case 'c':
						l[j].store('tip:title', d.g_d[cid].n);
						l[j].store('tip:text', d.g_d[cid].d);
						break;
					case 'g':
						l[j].store('tip:title', d.g_d[cid]);
						break;
				}
				lns.include(l[j]);
			}
		}
		if (this.tips)
		{
			this.tips.attach(lns);
		}
	},
	destroy: function ()
	{
		this.tips.destroy();
	}
});
