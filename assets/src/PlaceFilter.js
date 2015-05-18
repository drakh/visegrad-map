var PlaceFilter = new Class({
	Implements: [Events, Options],
	initialize: function (data, filterdata, country_filters, options)
	{
		console.log(data);
		this.setOptions(options);

		this.created_filter = {years: false, countries: false, types: false, tags: false};

		var p = $('filter_pane');


		this.select_filters = ['countries', 'types', 'tags'];
		this.cc_s = 0;

		this.msg = {};

		this.data = data;
		this.p_data = [];
		this.f_data = [];
		this.f_points = [];
		this.f_filters = {};

		this.filterdata = filterdata;
		this.country_filters = country_filters;

		this.pref = [];
		this.filtered_data = [];//all filtersdata


		this.year_sel = new YearSel($$('ul.years')[0], mapconf.year_bounds, {
			onRangechanged: this.filter_years.bind(this)
		});

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
	prepare_countries: function (d)
	{
		var cts = this.country_filters;
		var a = mapconf.visegrad;
		var r = {};
		for (var pid in cts)
		{
			if (a.contains(pid) || d[pid])
			{
				r[pid] = cts[pid];
			}
		}
		this.countries_prefiltered = r;
		return r;
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
		this.p_data = prefiltered;
		this.year_sel.set_data(prefiltered);
	},
	switch_data: function (i)
	{
		this.sel_filter = i;

		var s = this.selects;
		var data = this.data;
		var fd = this.filterdata[i];

		this.f_points = data[i].points;
		this.f_data = data[i].data;
		this.p_data = [];

		this.f_filters = fd;

		var dc = DataUtil.group_by_country(data[i].data);
		s['countries'].set_data(this.prepare_countries(dc));
		s['types'].set_data(fd.g);
		s['tags'].set_data(fd.c);
	},
	filter_years: function (y)
	{
		this.msg['years'] = y.msg;
		var yrs = y.years;
		var d = this.p_data;
		var f = {years: yrs};
		var tmp_d = d.filterOn(f);
		this.filter(tmp_d);
	},
	prefilter: function ()
	{
		var f = this.filt_arr;
		var data = this.f_data;
		return data.filterOn(f);
	},
	filter: function (data)
	{
		var msg = this.get_msg();
		var r = {
			points: this.f_points,
			data: data,
			message: msg,
			sel: this.sel_filter
		};
		this.fireEvent('filterchanged', r);
	}
});