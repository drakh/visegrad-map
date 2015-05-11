var AppMap = new Class({
	initialize: function (el, c, tips)
	{
		this.markers = {};
		this.tips = tips;
		var map = L.map($(mapid), {
			attributionControl: false,
			zoomControl: false
		});

		L.tileLayer(mapconf.url, {
			attribution: mapconf.attr,
			id: mapconf.map_id,
			subdomains: mapconf.subdomains,
			minZoom: mapconf.min_z,
			maxZoom: mapconf.max_z
		}).addTo(map);

		this.pane = map.getPanes().popupPane;

		if (c)
		{
			this.initialize_controls(c);
		}
		this.map = map;
		this.zoom_to_v4();

	},

	initialize_controls: function (el)
	{
		var els = el.getElements('a');
		els[0].addEvent('click', this.zoom_to_bounds.bind(this));
		els[1].addEvent('click', this.zoom_to_v4.bind(this));
		els[2].addEvent('click', this.zoom_in.bind(this));
		els[3].addEvent('click', this.zoom_out.bind(this));
	},
	zoom_in: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.map.zoomIn();
	},
	zoom_out: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.map.zoomOut();

	},
	zoom_to_v4: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.map.fitBounds(mapconf.v4_bounds);
	},
	zoom_to_bounds: function (e)
	{
		if (e)
		{
			e.stop();
		}
		if (this.bounds)
		{
			this.map.fitBounds(this.bounds);
		}
	},
	draw_points: function (data, f)
	{
		this.graph_f = f;
		this.remove_markers();

		var pane = this.pane;
		var map = this.map;
		var tips = this.tips;

		var points = data.points;
		var bounds = data.bounds;
		this.map.options.minZoom = 0;
		if (points.length > 0)
		{
			var z = this.map.getBoundsZoom(bounds);
			if (z > mapconf.max_z)
			{
				z = mapconf.max_z;
			}
			if (z < mapconf.min_z)
			{
				z = mapconf.min_z;
			}

			this.map.setMaxBounds(bounds);
			this.map.options.minZoom = z;
			this.bounds = bounds;
			this.points = points;
			for (var i = 0; i < points.length; i++)
			{
				var p = points[i];
				this.markers[i] = new CityMarker(map, p, pane, points.rel, tips, {onClick: this.show_graph.bind(this, i)});
			}
			this.zoom_to_bounds();
		}
	},
	show_graph: function (i)
	{
		var points = this.points;
		var map = this.map;
		var pane = this.pane;
		var map = this.map;
		var tips = this.tips;
		var graph_f = this.graph_f;
		this.destroy_graph(map);
		this.graph = new GraphMarker(points[i], map, pane, tips, graph_f, {onDestroy: this.graph_destroyed.bind(this, map)});
	},
	destroy_graph: function (map)
	{
		if (this.graph)
		{
			this.graph.destroy(map);
		}
	},
	graph_destroyed: function (map)
	{
		this.graph = null;
	},
	remove_markers: function ()
	{
		var m = this.markers;
		var map = this.map;
		for (var pid in m)
		{
			m[pid].destroy(map)
		}
		this.markers = {};
		this.destroy_graph(map);

	}
});