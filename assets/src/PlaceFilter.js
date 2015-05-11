var PlaceFilter = new Class({
	Implements: [Events, Options],
	initialize: function (data, filterdata, country_filters, options)
	{
		this.created_filter = {years: false, countries: false, types: false, tags: false};
		this.setOptions(options);

		this.select_filters = [
			'countries',
			'types',
			'tags'
		];
		this.cc_s = 0;
		this.msg = {};
		this.data = data;//all points data
		this.filterdata = filterdata;
		this.country_filters = country_filters;
		this.pref = [];
		this.filtered_data = [];//all filtersdata


		this.year_sel = new YearSel($$('ul.years')[0], mapconf.year_bounds, {
			onRangechanged: this.filter_years.bind(this)
		});

		var p = $('filter_pane');
		this.build_selects(p);

		new FilterWin(p, {
			onTypeswitch: this.switch_data.bind(this)
		});
		this.cc_switches = $$('#city-country a');
		this.cc_switches_bind();

	},
	check_created: function ()
	{
		var c = this.created_filter;
		var created = true;
		for (var pid in c)
		{
			if (c[pid] == false)
			{
				created = false;
			}
		}
		if (created == true)
		{
			this.fireEvent('created');
		}
	},
	cc_switches_bind: function ()
	{
		var cc = this.cc_switches;
		for (var i = 0; i < cc.length; i++)
		{
			cc[i].addEvent('click', this.cc_sw.bind(this, i));
		}
		this.cc_sw(this.cc_s);
	},
	cc_sw: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		var cc = this.cc_switches;
		for (var j = 0; j < cc.length; j++)
		{
			if (j == i)
			{
				cc[j].removeClass('dark-bg');
				cc[j].addClass('light-bg');
			}
			else
			{
				cc[j].removeClass('light-bg');
				cc[j].addClass('dark-bg');
			}
		}
		if (i != this.cc_s)
		{
			this.cc_s = i;
			this.switch_data(this.sel_filter);
		}
	},
	get_cc_data: function (data)
	{
		var r = [];
		var cc = this.cc_s;
		if (cc == 0)
		{
			r = data;
		}
		else
		{
			var c = {};
			for (var i = 0; i < data.length; i++)
			{
				var d = data[i];
				if (!c[d.c])
				{
					c[d.c] = countries_geo[d.c]
					c[d.c]['data'] = {};
				}
				for (var pid in d.data)
				{
					if (!c[d.c]['data'][pid])
					{
						c[d.c]['data'][pid] = [];
					}
					c[d.c]['data'][pid].append(d.data[pid]);
				}
			}
			for (var pid in c)
			{
				r.include(c[pid]);
			}
		}
		return r;
	},
	prepare_countries: function ()
	{
		var d = this.filtered_data;
		var cts = this.country_filters;

		var a = mapconf.visegrad;

		for (var i = 0; i < d.length; i++)
		{
			var c = d[i].c;
			if (!a.contains(c))
			{
				a.include(c);
			}
		}
		var r = {};
		for (var i = 0; i < a.length; i++)
		{
			var pid = a[i];
			r[pid] = cts[pid];
		}
		this.countries_prefiltered = r;
	},
	get_msg: function ()
	{
		var m = 'All grants hosted ';
		var msgs = this.msg;
		var m_a = [];
		for (var pid in msgs)
		{
			switch (pid)
			{
				case 'years':
					m_a[1] = 'for period ' + msgs[pid];
					break;
				case 'countries':
					if (msgs[pid] == 'all')
					{
						m_a[0] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[0] = 'in ' + msgs[pid];
					}
					break;
				case 'types':
					if (msgs[pid] == 'all')
					{
						m_a[2] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[2] = 'in ' + msgs[pid];
					}
					break;
				case 'tags':
					if (msgs[pid] == 'all')
					{
						m_a[3] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[3] = 'in ' + msgs[pid];
					}
					break;
			}
		}
		m = m + m_a.join(' ');
		return m;
	},
	build_selects: function (el)
	{
		var s = el.getElements('select');
		var a = el.getElements('a.s-all');
		var n = el.getElements('a.s-none');
		var d = this.select_filters;
		var selects = {};
		this.filt_arr = {};
		for (var i = 0; i < s.length; i++)
		{
			this.filt_arr[d[i]] = [];
			selects[d[i]] = new SelectFilter(s[i], a[i], n[i], {
				onFilterchange: this.set_filt_arr.bind(this, d[i])
			});
		}
		this.selects = selects;

	},
	set_filt_arr: function (i, d)
	{
		this.msg[i] = d.msg;
		this.filt_arr[i] = d.filter;
		var prefiltered = this.prefilter();
		this.pref = prefiltered;
		this.year_sel.set_data(prefiltered);
	},
	switch_data: function (i)
	{
		this.sel_filter = i;
		var d = this.get_cc_data(this.data[i]);
		this.filtered_data = d;
		this.filtered_filters = this.filterdata[i];
		var s = this.selects;
		this.prepare_countries();
		s['countries'].set_data(this.countries_prefiltered);
		s['types'].set_data(this.filtered_filters.g);
		s['tags'].set_data(this.filtered_filters.c);
	},
	filter_years: function (y)
	{
		var yrs = y.years;
		this.msg['years'] = y.msg;
		var f_yrs = {};
		for (var pid in yrs)
		{
			f_yrs[yrs[pid]] = true;
		}
		var points = this.pref;

		var b = [];
		var min = null;
		var max = null;
		var fpts = [];

		var f = 0;
		for (var i = 0; i < points.length; i++)
		{

			var p = points[i];
			var s = 0;
			var dta = {};
			for (var pid in p.data)
			{
				var d = p.data[pid];
				for (var j = 0; j < d.length; j++)
				{
					if (f_yrs[pid])
					{
						//s += d[j].amount;
						s++;
						dta[pid] = p.data[pid];
					}
				}
			}
			if (s > 0)
			{
				b[f] = [
					p.lat,
					p.lon
				];
				p['total'] = s;
				p['data'] = dta;
				fpts[f] = p;
				f++;
				if (min === null)
				{
					min = s;
				}
				else if (min > s)
				{
					min = s
				}

				if (max === null)
				{
					max = s;
				}
				else if (s > max)
				{
					max = s;
				}
			}
		}
		fpts['rel'] = {
			min: min,
			max: max
		};

		var bounds = L.latLngBounds(b);

		var data = {
			points: fpts,
			bounds: bounds
		};
		this.filter(data);
	},
	prefilter: function ()
	{
		var p = this.filtered_data;
		var f = this.filt_arr;

		var pts = [];

		for (var i = 0; i < p.length; i++)
		{
			var d = p[i];
			if (f.countries.contains(d.c))
			{
				var pt_dt = {};
				var dt = d.data;
				var empty = true;
				for (var yr in dt)
				{
					var y_dt = dt[yr];
					var f_y_dt = [];
					for (var j = 0; j < y_dt.length; j++)
					{
						var j_y_dt = y_dt[j];

						var type_c = false;
						if (f['types'].contains(String.from(j_y_dt.g)))
						{
							type_c = true;
						}
						var tag_c = false;
						for (var k = 0; k < y_dt[j].c.length; k++)
						{
							if (f['tags'].contains(String.from(y_dt[j].c[k])))
							{
								tag_c = true;
							}
						}
						if (type_c === true && tag_c === true)
						{
							f_y_dt.include(y_dt[j]);
						}

					}
					if (f_y_dt.length > 0)
					{
						pt_dt[yr] = f_y_dt;
						empty = false;
					}
				}
				if (empty === false)
				{
					var pt = d;
					pt['data'] = pt_dt;
					pts.include(pt);
				}
			}
		}
		return pts;
	},
	filter: function (data)
	{
		var msg = this.get_msg();
		var r = {
			data: data,
			message: msg,
			sel: this.sel_filter
		};
		this.fireEvent('filterchanged', r);
	}
});