var PlaceFilter = new Class({
	Implements: [Events, Options],
	initialize: function (data, filterdata, options)
	{
		this.setOptions(options);

		this.created_filter = {years: false, countries: false, types: false, tags: false};

		var p = $('filter_pane');


		this.select_filters = ['countries', 'types', 'tags'];
		this.cc_s = 0;

		this.sel_filter = 0;

		this.msg = {};

		this.data = data;
		this.p_data = [];
		this.f_data = [];
		this.f_points = [];
		this.f_filters = {};

		this.filterdata = filterdata;

		this.pref = [];
		this.filtered_data = [];//all filtersdata


		this.year_sel = new YearSel($$('ul.years')[0], mapconf.year_bounds, {
			onRangechanged: this.filter_years.bind(this)
		});

		this.build_selects(p);

		new FilterWin(p, {
			onTypeswitch: this.switch_data.bind(this)
		});
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
	get_msg: function ()
	{
		var m = 'Showing ';
		var msgs = this.msg;
		var m_a = [];
		switch (this.sel_filter)
		{
			case 0:
				for (var pid in msgs)
				{
					switch (pid)
					{
						case 'years':
							m_a[3] = 'in ' + msgs[pid];
							break;
						case 'countries':
							if (msgs[pid].m1 == 'all')
							{
								m_a[1] = 'in ' + msgs[pid].m1 + ' ' + pid;
							}
							else
							{
								m_a[1] = 'in ' + msgs[pid].m2;
							}
							break;
						case 'types':
							if (msgs[pid].m1 == 'all')
							{
								m_a[0] = '' + msgs[pid].m1 + ' grants';
							}
							else
							{
								m_a[0] = '' + msgs[pid].m1 + ' grants';
							}
							break;
						case 'tags':
							if (msgs[pid].m1 == 'all')
							{
								m_a[2] = 'in ' + msgs[pid].m1 + ' fields';
							}
							else
							{
								m_a[2] = 'in the field(s) <i>' + msgs[pid].m1 + '</i>';
							}
							break;
					}
				}
				break;
			case 1:
				m = 'Showing total number of semesters in'
				for (var pid in msgs)
				{
					switch (pid)
					{
						case 'years':
							m_a[3] = 'in ' + msgs[pid];
							break;
						case 'countries':
							if (msgs[pid].m1 == 'all')
							{
								m_a[1] = 'in ' + msgs[pid].m1 + ' ' + pid;
							}
							else
							{
								m_a[1] = 'in ' + msgs[pid].m2;
							}
							break;
					}
				}
				break;
			case 2:
				m = 'Showing residencies in '
				for (var pid in msgs)
				{
					switch (pid)
					{
						case 'years':
							m_a[3] = 'in ' + msgs[pid];
							break;
						case 'countries':
							if (msgs[pid].m1 == 'all')
							{
								m_a[1] = 'from ' + msgs[pid].m1 + ' ' + pid;
							}
							else
							{
								m_a[1] = 'from ' + msgs[pid].m2;
							}
							break;
						case 'types':
							if (msgs[pid].m1 == 'all')
							{
								m_a[0] = '' + msgs[pid].m1 + ' countries';
							}
							else
							{
								m_a[0] = '' + msgs[pid].m2;
							}
							break;
						case 'tags':
							if (msgs[pid].m1 == 'all')
							{
								m_a[2] = 'in ' + msgs[pid].m1 + ' disciplines';
							}
							else
							{
								m_a[2] = 'in the discipline(s) <i>' + msgs[pid].m1 + '</i>';
							}
							break;
					}
				}
				break;
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
		switch (i)
		{
			case 0:
			case 2:
				this.filt_arr = {countries: [], tags: [], types: []};
				break;
			case 1:
				this.filt_arr = {countries: [], types: []};
				break;
		}
		this.year_sel.set_header(mapconf.year_labels[i]);
		this.fireEvent('datachanged', i);
		this.sel_filter = i;

		var s = this.selects;
		var data = this.data;
		var fd = this.filterdata[i];

		this.f_points = data[i].points;
		this.f_data = data[i].data;
		this.p_data = [];

		this.f_filters = fd;

		if (fd['countries'])
		{
			s['countries'].show();
			s['countries'].set_data(fd.countries);
			s['countries'].set_label(mapconf.filter_labels[i].countries);
		}
		else
		{
			s['countries'].hide();
		}
		if (fd['g'])
		{
			s['types'].show();
			s['types'].set_data(fd.g);
			s['types'].set_label(mapconf.filter_labels[i].g);
		}
		else
		{
			s['types'].hide();
		}
		if (fd['c'])
		{
			s['tags'].show();
			s['tags'].set_data(fd.c);
			s['tags'].set_label(mapconf.filter_labels[i].c);
		}
		else
		{
			s['tags'].hide();
		}
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