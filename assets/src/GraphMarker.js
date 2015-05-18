var GraphMarker = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		tips: null,
		pane: null
	},
	initialize: function (pt, map, graph_f, options)
	{
		this.setOptions(options);
		this.pt = pt;
		this.graph_f = graph_f;
		var o = this.options;
		this.tooltip_visible = false;
		var el = new Element('div', {
			styles: {
				title: pt.s,
				position: 'absolute',
				'z-index': 998
			},
			events: {
				mouseenter: this.to_front.bind(this),
				mouseleave: this.to_back.bind(this)
			}
		}).inject(o.pane);

		var g_el = new Element('div', {
			styles: {
				position: 'absolute',
				width: 200,
				height: 200,
				left: -100,
				top: -100,
				background: '#fff',
				'border-radius': '50%'
			},
			class: 'ct-chart'
		}).inject(el);

		var g_d = {
			graph_data: pt.data,
			graph_descs: graph_f.c,
			graph_group: 'c'
		}

		new PieGraph(g_el, g_d, {
			tips: this.options.tips
		});
		/*
		 var g = new Chartist.Pie(g_el,
		 {
		 series: this.mk_graph(pt)
		 },
		 {
		 donut: true,
		 donutWidth: 50,
		 showLabel: false
		 });
		 g.on('created', this.graph_bind_events.bind(this, g_el));
		 */

		new Element('div',
			{
				html: '<div><header>' + pt.pt.s + '</header></div><div>' + pt.data.length + '</div>',
				class: 'graph-inner',
				events: {
					click: this.destroy.bind(this, map)
				}
			}).inject(el);
		//this.g = g;


		this.el = el;
		this.reposition(map);

		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));
	},
	graph_bind_events: function (el)
	{
		var s = el.getElements('.ct-series');
		var l = s.length;
		for (var i = 0; i < s.length; i++)
		{
			var j = (l - 1 - i);
			s[i].addEvents({
				click: this.show_hide_tooltip.bind(this, j)
			});
			s[i].store('tip:title', this.pt.s);
			s[i].store('tip:text', this.mk_text(j));
		}
		this.slices = s;
		var o = this.options;
		if (o.tips !== null)
		{
			o.tips.attach(s);
		}
	},
	mk_text: function (i)
	{

		var g = this.g_data[i].v;
		var p = this.pt_data;
		var d = this.desc;
		var str = d[i].nm + ': <strong>' + d[i].count + '</strong>';
		return str;
	},
	show_tooltip: function (i)
	{
		this.options.tips.show();
		this.tooltip_visible = true;
	},
	hide_tooltip: function (i)
	{
		this.tooltip_visible = false;
	},
	show_hide_tooltip: function (i)
	{
		if (this.tooltip_visible == true)
		{
			this.hide_tooltip(i);
		}
		else
		{
			this.show_tooltip(i);
		}
	},
	mk_graph: function (p)
	{
		var graph_f = this.graph_f;
		var d = {};
		var pdt = [];
		for (var pid in p.data)
		{
			var a = p.data[pid];
			for (var i = 0; i < a.length; i++)
			{
				var dt = a[i].c;
				for (var j = 0; j < dt.length; j++)
				{
					var t = dt[j];
					if (!d[t])
					{
						d[t] = 0;
					}
					d[t]++;
				}
			}
		}
		for (var pid in d)
		{
			pdt.include({
				name: pid,
				value: d[pid]
			});
		}
		pdt.sortOn("value", Array.NUMERIC);
		var g_data = [];
		var desc = [];
		var r = [];
		var l = pdt.length - 1;
		for (var i = 0; i <= l; i++)
		{
			var k = l - i;
			desc[i] = {
				nm: graph_f.c[pdt[k].name],
				count: pdt[k].value
			}
			g_data[i] = {
				v: pdt[k].value,
				t: pdt[k].name
			}
			r[i] = {
				data: pdt[k].value,
				className: 'graph-' + (i % 17)
			}
		}
		this.pt_data = p;
		this.g_data = g_data;
		this.desc = desc;
		return (r);
	},
	before_zoom: function ()
	{
		this.el.setStyles({
			display: 'none'
		});
	},
	reposition: function (map)
	{
		var pt = this.pt;
		var ps = map.latLngToLayerPoint([
			pt.pt.lat,
			pt.pt.lon
		]);

		this.el.setStyles({
			display: 'block',
			transform: 'translate3d(' + ps.x + 'px, ' + ps.y + 'px, 0px)'
		});

	},
	destroy: function (map)
	{
		this.options.tips.detach(this.slices);
		//this.g.detach();
		this.el.destroy();
		map.off('zoomstart', this.before_zoom.bind(this));
		map.off('zoomend', this.reposition.bind.bind(this, map));

		this.fireEvent('destroy');
		this.removeEvents();
	},
	to_front: function ()
	{
		this.el.setStyles({
			'z-index': 999
		});
	},
	to_back: function ()
	{
		this.el.setStyles({
			'z-index': 998
		});
	}
});