Number.prototype.map = function (in_min, in_max, out_min, out_max)
{
	return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
};

var DataUtil = {
	count_arr_o: function (data, w)
	{
		var d = this.count_arr(data, w);
		var r = {};
		for (var i = 0; i < d.length; i++)
		{
			var e = d[i];
			r[e.pid] = {
				count: e.count,
				p: e.p
			};
		}
		return r;
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
	flatten_data: function (data, filters, w)
	{
		var v_c = mapconf.visegrad;
		var f_c = filter_countries;
		var d = [];//data
		var p = {};
		var countries = {};
		switch (w)
		{
			case 0:
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
							if (!countries[dx.c])
							{
								countries[dx.c] = true;
							}
						}
					}
				}
				break;
			case 1:
				var g_countries={};
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
							for(var cpid in fd)
							{
								var o = {
									pt_id: pid,
									city: dx.s,
									country: dx.c,
									year: String.from(pt_year),
									a: '',
									c: f_tp,
									g: String.from(cpid),
									amount: fd[cpid],
									name: ''
								};
								d.include(o);
								if(!g_countries[cpid])
								{
									g_countries[cpid]=true;
								}
							}
							if (!countries[dx.c])
							{
								countries[dx.c] = true;
							}
						}
					}
				}
				var r_countries = {};
				for (var pid in f_c)
				{
					if (v_c.contains(pid) || g_countries[pid])
					{
						r_countries[pid] = f_c[pid];
					}
				}
				filters['g'] = r_countries;
				break;
			case 2:
				var g_countries={};
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
								a: fd.h,
								c: f_tp,
								g: String.from(fd.ci),
								amount: 1,
								name: fd.n
							};
							d.include(o);
							if (!countries[dx.c])
							{
								countries[dx.c] = true;
							}
							if(!g_countries[fd.ci])
							{
								g_countries[fd.ci]=true;
							}
						}
					}
				}
				var r_countries = {};
				for (var pid in f_c)
				{
					if (v_c.contains(pid) || g_countries[pid])
					{
						r_countries[pid] = f_c[pid];
					}
				}
				filters['g'] = r_countries;
				break;

		}

		var f_countries = {};
		for (var pid in f_c)
		{
			if (v_c.contains(pid) || countries[pid])
			{
				f_countries[pid] = f_c[pid];
			}
		}
		filters['countries'] = f_countries;
		var ret = {
			filters: filters,
			data: d,
			points: p
		};
		console.log(ret);
		return ret;
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
