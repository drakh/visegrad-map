var BarGraph = new Class({
	Implements: [Events, Options],
	initialize: function (el, in_d, options)
	{
		this.setOptions(options);

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
		this.g = new Chartist.Bar(el, {
			labels: l,
			series: r
		}, {stackBars: true});
	},
	destroy: function ()
	{

	}
});
