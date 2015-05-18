var SelectFilter = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, a, n, options)
	{
		this.created = false;
		this.setOptions(options);
		this.el = el;
		this.filter = [];
		this.els = [];
		a.addEvent('click', this.select_all.bind(this));
		n.addEvent('click', this.select_none.bind(this));
	},
	get_message: function ()
	{
		var els = this.els;
		var a = this.filter;
		var r_a = [];
		var all = true;
		var m = 'none';
		for (var pid in els)
		{
			if (a.contains(pid))
			{
				r_a.include(els[pid].get('text'));
			}
			else
			{
				all = false;
			}
		}
		if (all == true)
		{
			m = 'all'
		}
		else if (r_a.length > 0)
		{
			m = r_a.join(', ');
		}
		return m;
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
		var els = {}
		for (var pid in data)
		{
			var e = new Element('option', {
				value: pid,
				text: (data[pid]['n']?data[pid]['n']:data[pid]),
				events: {
					mousedown: this.prevent.bind(this),
					mouseup: this.prevent.bind(this),
					click: this.change_filters.bind(this, pid)
				}
			}).inject(el);
			els[pid] = e;
		}
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
		var els = this.els;
		if (els[pid].selected == true)
		{
			els[pid].selected = false;
		}
		else
		{
			els[pid].selected = true;
		}
		var tmps = [];
		for (var pid in els)
		{
			if (els[pid].selected == true)
			{
				tmps.push(pid);
			}
		}
		this.filter = tmps;
		this.select_change();
	},
	select_all: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		var tmps = [];
		for (var pid in els)
		{
			els[pid].selected = true;
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
		for (var pid in els)
		{
			els[pid].selected = false;
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