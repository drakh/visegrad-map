var CityMarker = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (map, pt, pane, b, tips, options)
	{
		this.setOptions(options);
		this.tips = tips;
		var max_z = 996;
		var min_z = 1;
		var r = pt.total / b.min;
		var l = Math.log(r);
		var z = max_z - Math.round(l * 10);
		if (z < min_z)
		{
			z = min_z;
		}
		var w = Math.round((mapconf.min_radius + (l * 5)));

		var el = new Element('div', {
			title: pt.s,
			styles: {
				position: 'absolute',
				'z-index': z
			},
			events: {
				click: this.fire_click.bind(this, map, pane)
			}
		}).inject(pane);

		new Element('div', {
			styles: {
				position: 'absolute',
				width: w * 2,
				height: w * 2,
				left: -w,
				top: -w
			},
			class: 'marker-circle'
		}).inject(el);
		this.z = z;
		this.pt = pt;
		this.el = el;
		this.g = null;
		this.reposition(map);
		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));

	},
	fire_click: function ()
	{
		this.fireEvent('click');
	},
	to_front: function ()
	{
		this.el.setStyles({
			'z-index': 997
		});
	},
	to_back: function ()
	{
		this.el.setStyles({
			'z-index': this.z
		});
	},
	before_zoom: function ()
	{
		this.el.setStyles({
			display: 'none'
		});
	},
	reposition: function (map)
	{
		var ps = map.latLngToLayerPoint([
			this.pt.lat,
			this.pt.lon
		]);

		this.el.setStyles({
			display: 'block',
			transform: 'translate3d(' + ps.x + 'px, ' + ps.y + 'px, 0px)'
		});
	},
	show_graph: function (map, pane)
	{

		var p = this.pt;
		map.panTo([
			p.lat,
			p.lon
		]);
		this.g = new GraphMarker(p, map, pane, this.tips, {onDestroy: this.graph_destroyed.bind(this, map)});
	},
	graph_destroyed: function ()
	{
		this.g = null;
	},
	destroy_graph: function (map)
	{
		if (this.g != null)
		{
			this.g.destroy(map);
		}
	},
	destroy: function (map)
	{
		this.destroy_graph(map);
		this.el.destroy();
	}
});