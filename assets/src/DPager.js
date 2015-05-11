var DPager = new Class({
	Implements: [Events, Options],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {};
		var e = new Element('div', {
			class: 'pure-menu pure-menu-horizontal'
		}).inject(el);
		this.w = new Element('ul', {class: 'pure-menu-list'}).inject(e);
	},
	set_data: function (p)
	{
		this.pagination = p;
		this.rebuild();
	},
	rebuild: function ()
	{
		var p = this.pagination;
		var page = p.page;
		var w = this.w;
		w.empty();
		var pages = Math.ceil(p.count / p.limit) - 1;
		if (page > 0)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-fast-backward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (0))
				}
			}).inject(li);

			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-backward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (page - 1))
				}
			}).inject(li);
		}

		var start = page - 3;
		if (start < 0)
		{
			start = 0;
		}
		var end = page + 3;
		if (start == 0)
		{
			end = start + 6;
		}
		if (end > pages)
		{
			end = pages;
		}
		if (end >= pages)
		{
			start = end - (6 - (pages - end));
		}
		if (start < 0)
		{
			start = 0;
		}

		for (var i = start; i <= end; i++)
		{
			if (i == page)
			{
				var li = new Element('li', {
					html: '<span class="pure-button pure-button-active">' + (i + 1) + '</span>',
					class: 'pure-menu-selected pure-menu-item'
				}).inject(w);
			}
			else
			{
				var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
				new Element('a', {
					html: (i + 1),
					class: 'pure-button pure-menu-link',
					events: {
						click: this.change_page.bind(this, (i))
					}
				}).inject(li);
			}

		}
		if (page < pages)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-forward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (page + 1))
				}
			}).inject(li);

			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-fast-forward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (pages))
				}
			}).inject(li);
		}
		this.set_page();
	},
	change_page: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		this.pagination.page = i;
		this.rebuild();
	},
	set_page: function ()
	{
		this.fireEvent('pagechanged', this.pagination);
	}

});