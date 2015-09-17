var SelectFilter = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, a, n, options)
	{
		this.created = false;
		this.setOptions(options);

		var w = new Element('div', {class: 'pure-menu select-wrapper'}).inject(el, 'before');
		var ul = new Element('ul', {class: 'pure-menu-list select'}).inject(w);
		this.el = ul;
		var p = el.getParent()
		this.head = p.getElement('header');
		this.s = p.getParent();
		this.filter = [];
		this.els = {};
		this.vals = {};

		el.destroy();

		a.addEvent('click', this.select_all.bind(this));
		n.addEvent('click', this.select_none.bind(this));
	},
	set_label: function (label)
	{
		this.head.set('html', label);
	},
	show: function ()
	{
		this.s.setStyles({
			visibility: 'visible'
		});
	},
	hide: function ()
	{
		this.s.setStyles({
			visibility: 'hidden'
		});
	},
	get_message: function ()
	{
		var els = this.els;
		var a = this.filter;
		var r_a = [];
		var r_a_ = [];
		var all = true;
		var m = 'none';
		var m_ = 'none';
		for (var pid in els)
		{
			if (a.contains(pid))
			{
				r_a.include(els[pid].get('html'));
				if (countries_geo[pid] && countries_geo[pid]['st'])
				{
					r_a_.include('<span title="' + countries_geo[pid]['st'] + '">' + pid + '</span>');
				}
				else
				{
					r_a_.include(pid);
				}
			}
			else
			{
				all = false;
			}
		}
		if (all == true)
		{
			m = 'all';
			m_ = 'all'
		}
		else if (r_a.length > 0)
		{
			m = r_a.join(', ');
			m_ = r_a_.join(', ');
		}
		return {m1: m, m2: m_};
	},
	set_data: function (data)
	{
		this.rebuild(data);
		this.select_all();
	},
	rebuild: function (data)
	{
		var el = this.el;
		el.empty();
		var els = {};
		var vals = {};
		for (var pid in data)
		{
			var e = new Element('li', {
				class: 'pure-menu-item select-item',
				html: (data[pid]['n'] ? data[pid]['n'] : data[pid]),
                                title: (data[pid]['d'] ? data[pid]['d'] : null),
				events: {
					click: this.change_filters.bind(this, pid)
				}

			}).inject(el);
			els[pid] = e;
			vals[pid] = false;
		}
		this.vals = vals;
		this.els = els;
	},
	prevent: function (e)
	{
		e.stop();
	},
	change_filters: function (pid, e)
	{
		if (e)
		{
			e.stop();
		}
		var vals = this.vals;
		var els = this.els;

		if (vals[pid] == true)
		{
			vals[pid] = false;
			els[pid].addClass('light-bg');
			els[pid].removeClass('dark-bg');
		}
		else
		{
			vals[pid] = true;
			els[pid].addClass('dark-bg');
			els[pid].removeClass('light-bg');
		}

		var tmps = [];

		for (var pd in vals)
		{
			if (vals[pd] == true)
			{
				tmps.push(pd);
			}
		}

		this.filter = tmps;

		if (this.timer)
		{
			window.clearTimeout(this.timer);
		}
		this.timer = this.select_change.delay(50, this);
	},
	select_all: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		var vals = this.vals;

		var tmps = [];

		for (var pid in vals)
		{
			vals[pid] = true;
			els[pid].addClass('dark-bg');
			els[pid].removeClass('light-bg');
			tmps.push(pid);
		}
		this.filter = tmps;
		this.select_change();
	},
	select_none: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		var vals = this.vals;

		for (var pid in vals)
		{
			vals[pid] = false;
			els[pid].addClass('light-bg');
			els[pid].removeClass('dark-bg');
		}

		this.filter = [];
		this.select_change();
	},
	select_change: function ()
	{
		var msg = this.get_message();
		this.fireEvent('filterchange', {filter: this.filter, msg: msg});
	}
});