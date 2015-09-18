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
                this.init_calendar();
	},
        init_calendar:function()
        {
            moment.locale('en-gb');
            this.scroll = new Fx.Scroll('c-content', {
                wait: false,
                duration: 1000,
//                offset: {'x': -200, 'y': -50},
                transition: Fx.Transitions.Quad.easeInOut
            });
            $$('#toggle-future').addEvent('click', this.toggle_future.bind(this));
            this.is_future = false;
            this.fill_calendar();
        },
        toggle_future:function()
        {
            this.is_future = this.is_future ? false : true;
            console.log(this.is_future);
            this.fill_calendar();
        },
        fill_calendar:function()
        {
            $$('div.n_body').empty();
            var current_d = moment().startOf('week');
            if(this.is_future) current_d.add(35, 'day');
            console.log(current_d.format('MMM D, YYYY'));
            $$('.mindate').set('text', current_d.format('MMM D, YYYY'));
            var boxes = $$('.day_box');
            for (var i in boxes) {
                var box = boxes[i];
                if (typeof box.getChildren === 'function') {
                    if (this.has_event(current_d)) {
                        box.addClass('type_events');
                        box.set('data-cboxdate', current_d.format('DD-MM-YYYY'));
                        this.render_day(current_d);
                        box.removeEvents();
                        box.addEvent('click', this.calendar_click.bind(this));
                    } else {
                        box.removeClass('type_events');
                    }
                    if (false) box.addClass('nt_week');
                    box.getChildren('.top').set('text', current_d.date());
                    box.getChildren('.bottom').set('text', current_d.format('MMM YYYY'));
                    $$('.maxdate').set('text', current_d.format('MMM D, YYYY'));
                    current_d.add(1, 'd');
                }
            }
        },
        calendar_click:function(el)
        {
            var id = 'dt-' + $(el.target.parentNode).get('data-cboxdate');
            var $e = $$('#c-content');
            var y = $$('#'+id).getPosition();
            //console.log(id + ': ' + y[0].y);
            //$e.scrollTo(y[0].x,y[0].y);
            this.scroll.toElement(id);
            
        },
        has_event:function(d)
        {
            for(var i in mapdata[0]) {
                for(var j in mapdata[0][i].data) {
                    for(var k in mapdata[0][i].data[j]) {
                        var rf = mapdata[0][i].data[j][k].rf;
                        if (typeof rf === 'undefined') continue;
                        rf = moment(rf, 'DD/MM/YYYY');
                        if (d.isSame(rf)) return true;
                    }
                }
            }
            return false;
        },
        render_day:function(d)
        {
            var $e = $$('div.n_body');
            Elements.from('<div class="day_box" data-cboxdate="08/08/2015" id="dt-' + d.format('DD-MM-YYYY') + '">\n\
                <div class="top">' + d.date() + '</div>\n\
                <div class="bottom">' + d.format('MMM YYYY') + '</div>\n\
               </div>').inject($e[0]);
            
            var el  = new Element('div', {class: 'day_content'});
            for(var i in mapdata[0]) {
                for(var j in mapdata[0][i].data) {
                    for(var k in mapdata[0][i].data[j]) {
                        var event = mapdata[0][i].data[j][k];
                        if (typeof event.rf === 'undefined') continue;
                        var rf = moment(event.rf, 'DD/MM/YYYY');
                        if (d.isSame(rf)) {
                            Elements.from('<div class="cal_event clear">\n\
                                    <!-- span class="cal_projectno">ID#  21320073</span -->\n\
                                    <span class="cal_headline"><strong>' + event.name + '</strong></span>\n\
                                    <span class="cal_subheadline">' + event.subheadline + '</span>\n\
                                    <span class="cal_link"><a href="' + event.url + '" target="_blank">' + event.url + '</a></span>\n\
                                    <span class="tc clear">\n\
                                    <span class="cal_type">' + event.type + '</span>\n\
                                    <span class="cal_city_country">' + event.place + '</span>\n\
                                    </span>\n\
                                </div>').inject(el);
                        }
                    }
                }
            }
            el.inject($e[0]);
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
                                        '<b style="font-size: 125%">' + p.pt.s + '</b><div style="height: 200px" class="leaflet-popup-scrolled">' + text + "</div>",
                                        {
                                            maxWidth: 400,
                                            maxHeight: 200,
                                            //className: 'no-leaflet-scroll'
                                        });
                                        
                                //marker.removeClass('leaflet-popup-scrolled');
                                
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