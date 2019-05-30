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
		var unit = in_d.unit;
		var l = [];
		var r = [];
		var r_p = [];

		var totals = [];

		for (var yr in y_d)
		{
			l.include(yr);
		}
		l.sort();

		// unit 0 = count
		// unit 1 = euro, but we also have semesters
		var y_d_c = DataUtil.count_arr_o(y_d, (in_d.dtype == 1) ? 1 : unit);

		for (var c = 0; c < ord.length; c++)
		{
			var grd = {data: [], className: 'graph-' + (c % 17)};
			var p_grd = [];
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
				p_grd[i] = 0;
				if (c_y_d[l[i]])
				{
					var c_year = l[i];
					var t = y_d_c[c_year];

					totals[i] = t.count;

					var al = c_y_d[l[i]].length;
					var am = 0;


					// unit 0 = count
					// unit 1 = euro, but we also have semesters
					var tmp_unit = (in_d.dtype == 1) ? 2 : unit;
					switch (tmp_unit)
					{
						case 0:
							am = al;
							p_grd[i] = am / (t.count / 100);
							break;
						case 1:
							am = 0;
							for (var ai = 0; ai < al; ai++)
							{
								am += c_y_d[l[i]][ai].amount;
							}
							p_grd[i] = am / (t.count / 100);
							am = Math.round(am / 1000);
							break;
						case 2:
							am = 0;
							for (var ai = 0; ai < al; ai++)
							{
								am += c_y_d[l[i]][ai].amount;
							}
							p_grd[i] = am / (t.count / 100);
							break;
					}

					grd.data[i] = am;
				}
			}
			r_p[c] = p_grd;
			r[c] = grd;
		}
		this.totals = totals;
		this.r_p = r_p;
		this.unit = unit;

		var g = new Chartist.Bar(el, {
			labels: l,
			series: r
		}, {axisY:{}, stackBars: true});
		g.on('created', this.graph_bind_events.bind(this, el));
	},
	graph_bind_events: function (el)
	{
		var d = this.data;
		var sw = d.g_g;

		var r = this.r_p;
		var unit = this.unit;
		var s = el.getElements('.ct-series');
		var lns = [];
		var strng = 'projects';
		if (this.data.dtype)
		{
			switch (this.data.dtype)
			{
				case 0:
					strng = 'projects';
					break;
				case 1:
					strng = 'semesters';
					break;
				case 2:
					strng = 'artists';
					break;
			}
		}
		for (var i = 0; i < s.length; i++)
		{
			var cid = d.ord[i];

			var l = s[i].getElements('.ct-bar');
			for (var j = 0; j < l.length; j++)
			{
                                var n = r[i][j] * (this.totals[j] / 100);
				var ad = ': ' + (unit === 0 ? n.format({decimals: 0}) + ' ' + strng : n.formatCurrency({decimals: 0})) + ' (' + ((r[i][j]).round(2)) + '%)';
				switch (sw)
				{
					case 'country':
						l[j].store('tip:title', d.g_d[cid].s + ad);
						break;
					case 'c':
						l[j].store('tip:title', d.g_d[cid].n + ad);
						l[j].store('tip:text', d.g_d[cid].d);
						break;
					case 'g':
						l[j].store('tip:title', d.g_d[cid] + ad);
						break;
				}
				lns.include(l[j]);
			}
		}
		if (this.tips)
		{
			this.tips.attach(lns);
		}
                // format numbers in chartist labels
                var s = el.getElementsByClassName('ct-label ct-vertical');
                for (var i = 0; i < s.length; i++) {
                    var n = 1 * s[i].get('text');
                    if (!isNaN(n)) s[i].set('text', n.format({decimals: 0}));
                }
	},
	destroy: function ()
	{
		this.tips.destroy();
	}
});
