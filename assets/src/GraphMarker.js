var GraphMarker = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
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


		var g_f = graph_f['c'];

		if (graph_f['gc'])
		{
			g_f = graph_f['gc'];
		}

		var g_d = {
			graph_data: pt.data,
			graph_descs: g_f,
			graph_group: 'c',
			unit: 0
		};

		if (this.options.dtype && this.options.dtype == 2)
		{
			g_d.graph_group = 'country';
			g_d.graph_descs = countries_geo;
		}

		this.g = new PieGraph(g_el, g_d, {dtype: this.options.dtype});

		new Element('div',
			{
				html: '<div><header>' + pt.pt.s + '</header></div><div>' + pt.data.length + '</div>',
				class: 'graph-inner',
				events: {
					click: this.destroy.bind(this, map)
				}
			}).inject(el);


		this.el = el;
		this.reposition(map);

		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));
		this.fireEvent('create', pt);
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
		this.g.destroy();
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