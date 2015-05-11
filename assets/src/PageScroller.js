var PageScroller = new Class({
	Implements: [Events, Options],
	initialize: function (els, options)
	{
		var titles = [];
		for (var i = 0; i < els.length; i++)
		{
			titles[i] = els[i].get('title');
		}
		this.titles = titles;
		this.els = els;
		this.s = 0;
		this.classes = [
			'el el-arrow-up scroll-btn pure-button light-bg',
			'el el-arrow-down scroll-btn pure-button light-bg'
		];
		this.setOptions(options);
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
			s[i] = new Element('i', {class: c[i], events: {click: this.sc_clicked.bind(this, i)}}).inject(w);
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
		if (i != this.s)
		{
			new Fx.Scroll(window).toElement(this.els[i], 'y');
			this.s = i;
		}
	},
	recalculate: function ()
	{
		var els = this.els;
		var ws = window.getScroll();
		var s = 0;
		for (var i = 0; i < els.length; i++)
		{
			var c = els[i].getCoordinates();
			if (ws.y >= c.top)
			{
				s = i;
			}
		}
		if (s <= 0)
		{
			this.c[0].addClass('c-hidden');
		}
		else
		{
			this.c[0].set('title', this.titles[s - 1]);
			this.c[0].removeClass('c-hidden');
		}

		if (s >= this.els.length - 1)
		{
			this.c[1].addClass('c-hidden');
		}
		else
		{
			this.c[1].set('title', this.titles[s + 1]);
			this.c[1].removeClass('c-hidden');
		}
		this.s = s;
	}
});