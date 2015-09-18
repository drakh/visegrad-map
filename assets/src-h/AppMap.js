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
            this.active_d = moment().startOf('day');
            this.fill_calendar();
        },
        scroll_initial:function()
        {
            if (this.today_element) this.scroll.toElement(this.today_element, 'y');
        },
        get_start_day:function()
        {
            var current_d = moment().startOf('week');
            if(this.is_future) current_d.add(35, 'day');
            return current_d;
        },
        toggle_future:function()
        {
            this.is_future = this.is_future ? false : true;
            
            if (this.is_future) {
                $$('#toggle-future')[0].addClass('future');
            } else {
                $$('#toggle-future')[0].removeClass('future');
            }
            
            this.fill_calendar();
            this.redraw(this.cc_s);
        },
        fill_calendar:function()
        {
            this.day_arr = {};
            $$('#c-content')[0].empty();
            var current_d = this.get_start_day();
            $$('.mindate').set('text', current_d.format('MMM D, YYYY'));
            var boxes = $$('div.row_days > div.day_box');
            var today_d = moment().startOf('day');
            for (var i in boxes) {
                var box = boxes[i];
                if (typeof box.getChildren === 'function') {
                    //skip history and continue with next day
                    if (current_d.isBefore(today_d)) {
                        current_d.add(1, 'd');
                        continue;
                    }
                    if (this.has_event(current_d)) {
                        var d_index = current_d.format('DD-MM-YYYY');
                        // store into global array
                        this.day_arr[d_index] = {box:box};
                        if (current_d.isSame(this.active_d)) {
                            // set today element for scroll and add color
                            this.today_element = 'dt-' + d_index;
                            box.addClass('type_events_cur');
                        } else {
                            box.addClass('type_events');
                        }
                        box.set('data-cboxdate', d_index);
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
            setTimeout(this.scroll_initial.bind(this), 1000);
        },
        calendar_click:function(el)
        {
            var d_index = $(el.target.parentNode).get('data-cboxdate');
            this.scroll.toElement('dt-' + d_index, 'y');
            
            var active_index = this.active_d.format('DD-MM-YYYY');
            this.active_d = moment(d_index, 'DD-MM-YYYY');
            // set previous active day to blue icon
            if (this.day_arr[active_index]) {
                for (var j in this.day_arr[active_index].markers) {
                    if (typeof this.day_arr[active_index].markers[j].setIcon === 'function') {
                        this.day_arr[active_index].markers[j].setIcon(this.blue_icon).setZIndexOffset(0);
                    }
                }
            }
            
            for (var d in this.day_arr) {
                if (this.day_arr[d].box) {
                    if (d === d_index) {
                        this.day_arr[d].box.addClass('type_events_cur').removeClass('type_events');
                    } else {
                        this.day_arr[d].box.removeClass('type_events_cur').addClass('type_events');
                    }
                }
                
                if (this.day_arr[d].markers) {
                    if (d === d_index) {
                        for (var j in this.day_arr[d].markers) {
                            if (typeof this.day_arr[d].markers[j].setIcon === 'function') {
                                this.day_arr[d].markers[j].setIcon(this.red_icon).setZIndexOffset(1000);
                            }
                        }
                    }
                }
            }
            //var $e = $$('#c-content');
            //var y = $$('#'+id).getPosition();
            //console.log(id + ': ' + y[0].y);
            //$e.scrollTo(y[0].x,y[0].y);
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
            var $e = $$('#c-content');
            Elements.from('<div class="vnutro_top" data-cboxdate="08/08/2015" id="dt-' + d.format('DD-MM-YYYY') + '">\n\
                <div class="stvorcek">\n\
                  <div class="top">' + d.date() + '</div>\n\
                  <div class="bottom">' + d.format('MMM YYYY') + '</div>\n\
                </div>\n\
               </div>').inject($e[0]);
            
            var el  = new Element('div', {class: 'vnutro_main'});
            for(var i in mapdata[0]) {
                for(var j in mapdata[0][i].data) {
                    for(var k in mapdata[0][i].data[j]) {
                        var event = mapdata[0][i].data[j][k];
                        if (typeof event.rf === 'undefined') continue;
                        var rf = moment(event.rf, 'DD/MM/YYYY');
                        if (d.isSame(rf)) {
                            Elements.from('<div class="">\n\
                                    <!-- span class="cal_projectno">ID#  21320073</span -->\n\
                                    <span class="cal_headline"><strong>' + event.name + '</strong></span>\n\
                                    <span class="cal_subheadline">' + (event.subheadline ? event.subheadline : '') + '</span>\n\
                                    <span class="cal_link"><a href="' + event.url + '" target="_blank">' + event.url + '</a></span>\n\
                                    <span class="tc clear">\n\
                                    <span class="cal_type">' + (event.type ? event.type : '') + '</span>\n\
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
                var start = this.get_start_day().subtract('1', 'day');
                var end = this.get_start_day().add('35', 'day');
		for (var pid in pt_d)
		{
			if (dt[pid] && dt[pid].length > 0)
			{
				var p = {
					pt: pt_d[pid],
					data: dt[pid]
				};
                                
                                var text = '';
                                var icon = this.blue_icon;
                                var days = [];
                                for (var i=0; i<p.data.length; i++) {
                                    // skip if out of calendar 35days
                                    if (!p.data[i].rf.isBetween(start, end)) continue;
                                    
                                    // icon
                                    if (this.active_d.isSame(p.data[i].rf) && (icon === this.blue_icon)) icon = this.red_icon;
                                    
                                    // which dates is this marker active for
                                    var d_index = p.data[i].rf.format('DD-MM-YYYY');
                                    if (days.indexOf(d_index) < 0) days.push(d_index);
                                    
                                    // construct text
                                    text += '<br/><b>' + p.data[i].name;
                                    text += '</b>'; // + (p.data[i].subheadline ? '<br/>' + p.data[i].subheadline : '');
                                    text += '<br/>' + p.data[i].rf.format('D MMM') + (p.data[i].rt ? '—' + p.data[i].rt.format('D MMM') : '');
                                    text += p.data[i].a;
                                    text += '<div style="padding-top: 3px"><img src="inf-press.png" width="20" title="Press release" /> <img src="inf-info.png" width="20" title="Description" /></div>';
                                }
                                
                                if (text === '') continue;
                                
                                var marker = L.marker([p.pt.lat, p.pt.lon], {icon: icon, title:p.pt.s}).addTo(map).bindPopup(
                                        '<b class="map-popup-city">' + p.pt.s + '</b><div class="leaflet-popup-scrolled">' + text + '</div>',
                                        {
                                            maxWidth: 400,
                                            maxHeight: 200
                                        });
                                        
                                
                                for (var i in days) {
                                    if (typeof this.day_arr[days[i]] !== 'object') {
                                        this.day_arr[days[i]] = {markers: []};
                                    }
                                    if (typeof this.day_arr[days[i]].markers !== 'object') {
                                        this.day_arr[days[i]].markers = [];
                                    }
                                    this.day_arr[days[i]].markers.push(marker);
                                }
                                
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
			map.removeLayer(m[i]);
		}
		this.markers = [];
		this.destroy_graph(map);
	},
        blue_icon: L.icon({
            iconUrl: 'marker.png',
            iconSize: [48, 48], // size of the icon
            iconAnchor: [24, 48],
            popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor,
        }),
        red_icon: L.icon({
            iconUrl: 'marker-red.png',
            iconSize: [48, 48], // size of the icon
            iconAnchor: [24, 48],
            popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
        })
});