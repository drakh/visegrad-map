var AppMap = new Class({
	Implements: [Events, Options],
	initialize: function (el, c, conf, options)
	{
            $('filter-message').hide();
            $('city-country').hide();
            $('e-graphs').hide();
            $('e-table').hide();
            $$('.filter-tab-switch').hide();
            //$$('.filter-btn').hide();
            $$('.page-scroller').hide();
                this.tips = new Tips();
		this.dtype = 0;
		this.setOptions(options);
		this.conf = conf;
		this.markers = [];
		var a_map = L.map($(mapid), {
			attributionControl: false,
			zoomControl: false,
			padding: [200, 200]
		});

		L.tileLayer(conf.url, {
			attribution: conf.attr,
			id: conf.map_id,
			subdomains: conf.subdomains,
			minZoom: conf.min_z,
			maxZoom: conf.max_z
		}).addTo(a_map);

		this.pane = a_map.getPanes().popupPane;

		if (c)
		{
			this.initialize_controls(c);
		}
		this.cc_s_w = ['cities', 'countries'];
		this.cc_s = 0;
		this.cc_switches = $$('#city-country a');
		this.cc_switches_bind();

		this.map = a_map;
		this.zoom_to_v4();
	},
	move_map:function(p,z)
	{
		if(z)
		{
			this.map.setView([p.lat, p.lon],this.map.getMaxZoom())
		}
		else
		{
			this.map.panTo([p.lat, p.lon]);
		}
	},
	set_dtype: function (i)
	{
		this.dtype = i;
	},
	cc_switches_bind: function ()
	{
		var cc = this.cc_switches;
		for (var i = 0; i < cc.length; i++)
		{
			cc[i].addEvent('click', this.cc_sw.bind(this, i));
		}
		this.cc_sw(this.cc_s);
	},
	cc_sw: function (i, e)
	{
		if (e)
		{
			e.stop();
		}

		var cc = this.cc_switches;
		for (var j = 0; j < cc.length; j++)
		{
			if (j == i)
			{
				cc[j].removeClass('dark-bg');
				cc[j].addClass('light-bg');
			}
			else
			{
				cc[j].removeClass('light-bg');
				cc[j].addClass('dark-bg');
			}
		}
		if (i != this.cc_s)
		{
			this.cc_s = i;
			this.redraw(i);
		}
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
		this.map.fitBounds(this.conf.v4_bounds);
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
	redraw: function (i)
	{
		this.remove_markers();
		var w = this.cc_s_w[i];
		var pts = this.pts_g;
		var data = this.data;

		var dt = data[w];
		var pt_d = pts[w];
		var max = DataUtil.get_max_len(dt);
		var markers = [];
		var o = this.options;
		var pane = this.pane;
		var map = this.map;
		var b_arr = [];
		for (var pid in pt_d)
		{
			if (dt[pid] && dt[pid].length > 0)
			{
				var p = {
					pt: pt_d[pid],
					data: dt[pid]
				};
                                
                                var text = '';
                                for (var i=0; i<p.data.length; i++) {
                                    text += '<br/><br/>' + p.data[i].name + p.data[i].a;
                                }
                                
                                var marker = L.marker([p.pt.lat, p.pt.lon], {icon: this.my_icon, title:p.pt.s}).addTo(map).bindPopup(
                                        '<b>' + p.pt.s + '</b>' + text,
                                        {
                                            maxWidth: 400,
                                            maxHeight: 200
                                        });
                                
//				var marker = new CityMarker(map, p, max, {
//					pane: pane,
//					onClick: this.show_graph.bind(this)
//				});
//                                
//                                marker.el.store('tip:title', cities[p.pt.s]);
//                                if (this.tips)
//                                {
//                                        this.tips.attach(marker.el);
//                                }
//                                
				markers.include(marker);
				b_arr.include([p.pt.lat, p.pt.lon]);
			}
		}
		this.markers = markers;
		var conf = this.conf;
		if (markers.length > 0)
		{
			var bounds = L.latLngBounds(b_arr);
			this.bounds = bounds;

			var z = this.map.getBoundsZoom(bounds);
			if (z > conf.max_z)
			{
				z = conf.max_z;
			}
			if (z < conf.min_z)
			{
				z = conf.min_z;
			}

			//map.setMaxBounds(bounds);
			//map.options.minZoom = z;
			this.zoom_to_v4();
		}
	},
	draw_points: function (data_in, points, f)
	{
		var pts_data = DataUtil.group_by_city(data_in);
		var cts_data = DataUtil.group_by_country(data_in);
		var data = {
			cities: pts_data,
			countries: cts_data
		};
		var pts = {
			cities: points,
			countries: countries_geo
		};
		this.pts_g = pts;
		this.data = data;
		this.graph_f = f;
		this.redraw(this.cc_s);
	},
	show_graph: function (data)
	{
		this.move_map(data.pt);
		var map = this.map;
		var pane = this.pane;
		var graph_f = this.graph_f;
		this.destroy_graph(map);


		this.graph = new GraphMarker(data, map, graph_f, {
			pane: pane,
			dtype:this.dtype,
			onDestroy: this.graph_destroyed.bind(this),
			onCreate: this.graph_created.bind(this)
		});
		this.fireEvent('graphshow', data);
	},
	graph_created: function (data)
	{
		this.fireEvent('graphcreated', data);
	},
	destroy_graph: function (map)
	{
		if (this.graph)
		{
			this.graph.destroy(map);
		}
	},
	graph_destroyed: function ()
	{
		this.graph = null;
		this.fireEvent('graphdestroyed');
	},
	remove_markers: function ()
	{
		var m = this.markers;
		var map = this.map;
		for (var i = 0; i < m.length; i++)
		{
			m[i].destroy(map);
		}
		this.markers = [];
		this.destroy_graph(map);
	},
        my_icon: L.icon({
            iconUrl: 'marker.png',
            iconSize: [48, 48], // size of the icon
            iconAnchor: [24, 48],
            popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
        })
});