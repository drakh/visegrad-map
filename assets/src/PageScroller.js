var PageScroller = new Class({
	Implements: [Events, Options],
	initialize: function (els, options)
	{
		var titles = ['Previous section', 'Next section'];
//		for (var i = 0; i < els.length; i++)
//		{
//			titles[i] = els[i].get('title');
//		}
		this.titles  = titles;
		this.els     = els;
		this.s       = 0;
		this.classes = [
			'el el-arrow-up scroll-btn pure-button light-bg',
			'el el-arrow-down scroll-btn pure-button light-bg'
		];
		this.setOptions(options);
		this.set_max(this.els.length);
		this.build_html();
		this.recalculate();
		window.addEvents(
			{
				resize: this.recalculate.bind(this),
				scroll: this.recalculate.bind(this)
			}
		);
	},
	build_html: function ()
	{
		var c = this.classes;
		var s = [];
		var w = new Element('div', {class: 'page-scroller'}).inject(document.body);
		for (var i = 0; i < 2; i++)
		{
			s[i] = new Element('i', {
				class: c[i],
				title: this.titles[i],
				events: {click: this.sc_clicked.bind(this, i)}
			}).inject(w);
		}
		this.c = s;
	},
	sc_clicked: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		var s = this.s;
		switch (i)
		{
			case 0:
				s--;
				break;
			case 1:
				s++;
				break;
		}
		if (s < 0)
		{
			s = 0;
		}
		if (s >= this.els.length)
		{
			s = this.els.length - 1;
		}
		this.scroll_to(s);
	},
	scroll_to: function (i)
	{
		if (i < this.e_max && i != this.s)
		{
			new Fx.Scroll(window).toElement(this.els[i], 'y');
			this.s = i;
		}
		else if (i >= this.e_max && i != this.s)
		{
			new Fx.Scroll(window).toElement(this.els[(this.e_max - 1)], 'y');
			this.s = this.e_max - 1;
		}
	},
	set_max: function (i)
	{
		this.e_max = i;
	},
	recalculate: function ()
	{
		var els   = this.els;
		var ws    = window.getScroll();
		var win_s = window.getSize();
		var s     = this.s;
		var b     = 0;
		for (var i = 0; i < this.e_max; i++)
		{
			var c = els[i].getCoordinates();
			if (ws.y >= c.top)
			{
				s = i;
			}
			if (i == 0)
			{
				b = c.top;
			}
		}
		if (this.e_max == 2 && ws.y > b)
		{
			s = 1;
		}
		if (s >= this.e_max)
		{
			s = this.e_max - 1;
		}
		if (s <= 0)
		{
			this.c[0].addClass('c-hidden');
			s = 0;
		}
		else
		{
			this.c[0].removeClass('c-hidden');
		}
		if (s >= this.e_max - 1)
		{
			this.c[1].addClass('c-hidden');
		}
		else
		{
			this.c[1].removeClass('c-hidden');
		}
		this.s = s;
	}
});