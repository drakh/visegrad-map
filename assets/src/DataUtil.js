Number.prototype.map = function (in_min, in_max, out_min, out_max)
{
	return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
};

var DataUtil = {
	prepare_index: function (data)
	{
		//myString.standardize();
		var index = lunr(function ()
		{
			this.field('name');
			this.ref('pid');
		});
		var pt_a = [];
		var uiq = {};
		var cities = data.cities;
		var countries = data.countries;
		for (var i = 0; i < cities.length; i++)
		{
			var c = cities[i];
			for (var pid in c)
			{
				if (!uiq[pid])
				{
					var pt = c[pid];
					uiq[pid] = true
					index.add({
						name: pt.s,
						pid: pt_a.length
					});
					pt_a.include(pt);
				}
			}
		}
		for (var pid in countries)
		{
			if (!uiq[pid])
			{
				var pt = countries[pid];
				uiq[pid] = true
				index.add({
					name: pt.s,
					pid: pt_a.length
				});
				pt_a.include(pt);
			}
		}
		return {pt_arr: pt_a, ft_index: index};
	},
	count_arr: function (data, w)
	{
		var r = [];
		var total = 0;
		for (var pid in data)
		{
			var a = data[pid];
			var l = a.length;
			switch (w)
			{
				case 0:
					total += data[pid].length;
					r.include({pid: pid, count: l, p: 0});
					break;
				case 1:
					var c = 0;
					for (var i = 0; i < l; i++)
					{
						c += a[i].amount;
					}
					r.include({pid: pid, count: c, p: 0});
					total += c;
					break;
			}

		}
		for (var i = 0; i < r.length; i++)
		{
			r[i]['p'] = r[i]['count'] / (total / 100);
		}
		return r;
	},
	get_max_len: function (data)
	{
		var max = 0;
		for (var pid in data)
		{
			var l = data[pid].length;
			if (l > max)
			{
				max = l;
			}
		}
		return max;
	},
	group_by_country: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.country])
			{
				r[d.country] = [];
			}
			r[d.country].include(d);
		}
		return r;
	},
	group_by_year: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.year])
			{
				r[d.year] = [];
			}
			r[d.year].include(d);
		}
		return r;
	},
	group_by_city: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.pt_id])
			{
				r[d.pt_id] = [];
			}
			r[d.pt_id].include(d);
		}
		return r;
	},
	group_by_c: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			for (var j = 0; j < d.c.length; j++)
			{
				var dc = d.c[j];
				if (!r[dc])
				{
					r[dc] = [];
				}
				r[dc].include(d);
			}
		}
		return r;
	},
	group_by_g: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.g])
			{
				r[d.g] = [];
			}
			r[d.g].include(d);
		}
		return r;
	},
	flatten_data: function (data)
	{
		var d = [];//data
		var p = {};
		for (var i = 0; i < data.length; i++)
		{
			var dx = data[i];
			var pid = dx.s;
			if (!p[pid])
			{
				p[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
			}
			var dt = dx.data;
			for (var pt_year in dt)
			{
				var y_d = dt[pt_year];
				for (var j = 0; j < y_d.length; j++)
				{
					var fd = y_d[j];
					var f_tp = [];
					if (fd['c'])
					{
						for (var k = 0; k < fd.c.length; k++)
						{
							f_tp[k] = String.from(fd.c[k]);
						}
					}
					var o = {
						pt_id: pid,
						city: dx.s,
						country: dx.c,
						year: String.from(pt_year),
						a: fd.a,
						c: f_tp,
						g: String.from(fd.g),
						amount: fd.amount,
						name: fd.name
					};
					d.include(o);
				}
			}
		}
		return {
			data: d,
			points: p
		}
	}
};

(function ()
{
	Array.implement({
		filterOn: function (fields)
		{
			return this.filter(function (item)
			{
				var ret = true;
				for (var pid in fields)
				{
					var a = fields[pid];
					switch (pid)
					{
						case 'countries':
							if (!a.contains(item.country))
							{
								ret = false;
								return ret;
							}
							break;
						case 'years':
							if (!a.contains(item.year))
							{
								ret = false;
								return ret;
							}
							break;

						case 'tags':
							var b = [];
							for (var i = 0; i < item.c.length; i++)
							{
								if (a.contains(item.c[i]))
								{
									b.include(item.c[i]);
								}
							}
							if (b.length == 0)
							{
								ret = false;
								return ret;
							}
							break;
						case 'types':
							if (!a.contains(item.g))
							{
								ret = false;
								return ret;
							}
							break;

					}
				}
				return ret;
			});
		}
	});
})();
