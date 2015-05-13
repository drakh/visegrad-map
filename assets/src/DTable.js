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
				pid: 'applicant',
				type: 's'
			},
			{
				name: 'Project title',
				pid: 'project',
				type: 's'
			}
		],
		sort_els: {
			'asc': '<i class="el el-caret-up"></i>',
			'desc': '<i class="el el-caret-down"></i>'
		}
	},
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {
			limit: 50,
			page: 0,
			count: 0
		};


		var t = new Element('table', {class: 'pure-table pure-table-bordered pure-table-striped'}).inject(el);
		this.build_head(t);
		this.pager = new DPager(el, {onPagechanged: this.change_page.bind(this)});
		this.el = new Element('tbody').inject(t);
	},
	build_head: function (t)
	{
		var h = new Element('thead').inject(t);
		var r = new Element('tr').inject(h);
		var o = this.options;
		var ho = o.table_headers;
		var se = o.sort_els;
		for (var i = 0; i < ho.length; i++)
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
		var d = data.points;
		var a = [];
		for (var i = 0; i < d.length; i++)
		{
			var dt = d[i].data;
			for (var yr in dt)
			{
				var y_d = dt[yr];
				for (var k = 0; k < y_d.length; k++)
				{
					var ae = {
						city: d[i].s,
						year: yr,
						applicant: y_d[k].a,
						project: y_d[k].name
					};
					a.include(ae);
				}
			}
		}
		this.pagination.count = a.length;
		this.table_data = a;
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
		console.log(o);
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
		console.log(o.col.pid);
		console.log(Array[st]);
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
		if (max > d.length)
		{
			max = d.length;
		}

		for (var i = min; i < max; i++)
		{
			var r = new Element('tr');
			for (var pid in d[i])
			{
				new Element('td', {text: d[i][pid]}).inject(r);
			}
			r.inject(w);
		}
	}
});