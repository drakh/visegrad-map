var DTable = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		table_headers: [
			{
				name: 'City',
				pid: 'city',
				type: 's'
			},
			{
				name: 'Year',
				pid: 'year',
				type: 'n'
			},
			{
				name: 'Applicant',
				pid: 'a',
				type: 's'
			},
			{
				name: 'Project title',
				pid: 'name',
				type: 's'
			},
			{
				name: 'Money',
				pid: 'amount',
				type: 'n'
			}
		],
		sort_els: {
			'asc': '<i class="el el-caret-up"></i>',
			'desc': '<i class="el el-caret-down"></i>'
		}
	},
	initialize: function (el, options)
	{
		this.dtype = 0;
		this.setOptions(options);
		this.pagination = {
			limit: 50,
			page: 0,
			count: 0
		};

		this.wp = el;
		var t = new Element('table', {class: 'pure-table pure-table-bordered pure-table-striped'}).inject(el);
		this.tbl = t;
		this.bld_t();
		this.pager = new DPager(el, {onPagechanged: this.change_page.bind(this)});
	},
	bld_t: function ()
	{
		var t = this.tbl;
		t.empty();
		this.build_head(t);
		this.el = new Element('tbody').inject(t);
	},
	set_dtype: function (i)
	{
		this.dtype = i;
		if (i == 1)
		{
			this.wp.setStyles({display: 'none'});
		}
		else
		{
			this.wp.setStyles({display: 'block'});
		}
		this.bld_t();
	},
	build_head: function (t)
	{
		var h = new Element('thead').inject(t);
		var r = new Element('tr').inject(h);
		var o = this.options;
		var ho = o.table_headers;
		var se = o.sort_els;
		var hal = 0;
		if (this.dtype != 0)
		{
			hal = 1;
		}
		for (var i = 0; i < (ho.length - hal); i++)
		{
			var th = new Element('th').inject(r);
			var e = new Element('div', {
				class: 'pure-menu pure-menu-horizontal'
			}).inject(th);
			new Element('span', {class: 'pure-menu-heading', text: ho[i].name}).inject(e);
			var ul = new Element('ul', {class: 'pure-menu-list'}).inject(e);
			for (var pid in se)
			{
				var li = new Element('li', {class: 'pure-menu-item'}).inject(ul);
				new Element('a', {
					html: se[pid],
					class: 'pure-button pure-menu-link',
					events: {
						click: this.sort_table.bind(this, {col: ho[i], sort_type: pid})
					}
				}).inject(li);
			}
		}
	},
	set_data: function (data)
	{
		this.pagination.page = 0;
		this.pagination.count = data.length;
		this.table_data = data;
		this.pager.set_data(this.pagination);
	},
	change_page: function (p)
	{
		this.pagination = p;
		this.fill_table();
	},
	sort_table: function (o, e)
	{
		if (e)
		{
			e.stop();
		}
		var st = '';
		if (o.sort_type == 'desc')
		{
			st = 'DESC_';
		}
		switch (o.col.type)
		{
			case 's':
				st += 'STRING'
				break;
			case 'n':
				st += 'NUMERIC';
				break;
		}
		this.table_data.sortOn(o.col.pid, Array[st]);
		this.pager.change_page(0);
	},
	fill_table: function ()
	{

		var w = this.el;
		w.empty();
		var pg = this.pagination;
		var d = this.table_data;
		var min = pg.page * pg.limit;
		var max = min + pg.limit;
		var hal = 0;
		if (this.dtype != 0)
		{
			hal = 1;
		}
		var ho = this.options.table_headers;
		if (max > d.length)
		{
			max = d.length;
		}
		for (var i = min; i < max; i++)
		{
			var r = new Element('tr');

			for (var j = 0; j < (ho.length - hal); j++)
			{
				var pid = ho[j].pid;
				new Element('td', {text: d[i][pid]}).inject(r);
			}
			r.inject(w);
		}
	}
});