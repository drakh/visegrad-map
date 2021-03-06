var AppMap = new Class({
	Implements: [Events, Options],
	initialize: function (el, c, conf, options)
	{
		this.dtype = 0;
		this.setOptions(options);
		this.conf = conf;
		this.markers = [];
		var a_map = L.map($(mapid), {
			attributionControl: false,
			zoomControl: false,
			padding: [200, 200]
		});
                
                Locale.use('EU');

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
		var max = DataUtil.get_max_len(dt, this.dtype);
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
				var marker = new CityMarker(map, p, max, {
					pane: pane,
					onClick: this.show_graph.bind(this)
				});
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
	}
});
var BarGraph = new Class({
	Implements: [Events, Options],
	initialize: function (el, in_d, options)
	{
		this.setOptions(options);
		this.tips = new Tips();
		this.data = in_d;
		var ord = in_d.ord;
		var y_d = in_d.y_d;
		var c_d = in_d.c_d;
		var unit = in_d.unit;
		var l = [];
		var r = [];
		var r_p = [];

		var totals = [];

		for (var yr in y_d)
		{
			l.include(yr);
		}
		l.sort();

		var y_d_c = DataUtil.count_arr_o(y_d, unit);

		for (var c = 0; c < ord.length; c++)
		{
			var grd = {data: [], className: 'graph-' + (c % 17)};
			var p_grd = [];
			var cid = ord[c];
			var c_y_d = {};

			if (c_d[cid])
			{
				var crd = c_d[cid];
				c_y_d = DataUtil.group_by_year(crd);

			}

			for (var i = 0; i < l.length; i++)
			{
				grd.data[i] = 0;
				p_grd[i] = 0;
				if (c_y_d[l[i]])
				{
					var c_year = l[i];
					var t = y_d_c[c_year];

					totals[i] = t.count;

					var al = c_y_d[l[i]].length;
					var am = 0;
					switch (unit)
					{
						case 0:
							am = al;
							p_grd[i] = am / (t.count / 100);
							break;
						case 1:
							am = 0;
							for (var ai = 0; ai < al; ai++)
							{
								am += c_y_d[l[i]][ai].amount;
							}
							p_grd[i] = am / (t.count / 100);
							am = Math.round(am / 1000);
							break;
					}

					grd.data[i] = am;
				}
			}
			r_p[c] = p_grd;
			r[c] = grd;
		}
		this.totals = totals;
		this.r_p = r_p;
		this.unit = unit;

		var g = new Chartist.Bar(el, {
			labels: l,
			series: r
		}, {axisY:{}, stackBars: true});
		g.on('created', this.graph_bind_events.bind(this, el));
	},
	graph_bind_events: function (el)
	{
		var d = this.data;
		var sw = d.g_g;

		var r = this.r_p;
		var unit = this.unit;
		var s = el.getElements('.ct-series');
		var lns = [];
		var strng = 'projects';
		if (this.data.dtype)
		{
			switch (this.data.dtype)
			{
				case 0:
					strng = 'projects';
					break;
				case 1:
					strng = 'semesters';
					break;
				case 2:
					strng = 'artists';
					break;
			}
		}
		for (var i = 0; i < s.length; i++)
		{
			var cid = d.ord[i];

			var l = s[i].getElements('.ct-bar');
			for (var j = 0; j < l.length; j++)
			{
                                var n = r[i][j] * (this.totals[j] / 100);
				var ad = ': ' + (unit === 0 ? n.format({decimals: 0}) + ' ' + strng : n.formatCurrency({decimals: 0})) + ' (' + ((r[i][j]).round(2)) + '%)';
				switch (sw)
				{
					case 'country':
						l[j].store('tip:title', d.g_d[cid].s + ad);
						break;
					case 'c':
						l[j].store('tip:title', d.g_d[cid].n + ad);
						l[j].store('tip:text', d.g_d[cid].d);
						break;
					case 'g':
						l[j].store('tip:title', d.g_d[cid] + ad);
						break;
				}
				lns.include(l[j]);
			}
		}
		if (this.tips)
		{
			this.tips.attach(lns);
		}
                // format numbers in chartist labels
                var s = el.getElementsByClassName('ct-label ct-vertical');
                for (var i = 0; i < s.length; i++) {
                    var n = 1 * s[i].get('text');
                    if (!isNaN(n)) s[i].set('text', n.format({decimals: 0}));
                }
	},
	destroy: function ()
	{
		this.tips.destroy();
	}
});

var CityMarker = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		pane: null,
		front_z: 997,
		max_z: 996,
		min_z: 1
	},
	initialize: function (map, pt, b, options)
	{
		this.setOptions(options);

		var o = this.options;
		var max_z = o.max_z;
		var min_z = o.min_z;
		this.pt = pt;

		var a=Number.from(pt.data.length);
		var w=Math.round(Math.log(a.map(0,b,1.2,Math.E))*mapconf.max_radius);
		var z=Math.round(a.map(b,0,min_z,max_z));
		var el = new Element('div', {
			title: pt.pt.s,
			styles: {
				position: 'absolute',
				'z-index': z
			},
			events: {
				click: this.fire_click.bind(this)
			}
		}).inject(o.pane);

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

		this.el = el;
		this.g = null;
		this.reposition(map);
		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));

	},
	fire_click: function ()
	{
		this.fireEvent('click', this.pt);
	},
	to_front: function ()
	{
		this.el.setStyles({
			'z-index': this.options.front_z
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
			this.pt.pt.lat,
			this.pt.pt.lon
		]);

		this.el.setStyles({
			display: 'block',
			transform: 'translate3d(' + ps.x + 'px, ' + ps.y + 'px, 0px)'
		});
	},
	destroy: function ()
	{
		this.el.destroy();
	}
});
var DGraph = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, options)
	{
		this.dtype = 0;
		this.setOptions(options);
		this.g = [];
		this.btns = ['<i class="el el-tasks"></i>', '<i class="el el-eur"></i>'];
		this.switches = [];
		this.unit = 0;
		this.build_switch(el);

		var w = new Element('div').inject(el);
		this.el = w;
	},
	set_dtype: function (i)
	{
		this.dtype = i;
		this.switch_units(0);
		if (i == 0)
		{
			this.switch_el.setStyles({display: 'block'});
		}
		else
		{
			this.switch_el.setStyles({display: 'none'});
		}
	},
	build_switch: function (el)
	{
		var w = new Element('div', {
			class: 'pure-menu pure-menu-horizontal'
		}).inject(el);

		var ul = new Element('ul', {class: 'pure-menu-list'}).inject(w);

		var btns = this.btns;
		for (var i = 0; i < btns.length; i++)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(ul);
			var a = new Element('a', {
				class: 'pure-button',
				html: btns[i],
				events: {click: this.switch_units.bind(this, i)}
			}).inject(li);
			this.switches.include(a);
		}
		this.switch_units(0);
		this.switch_el = w;
	},
	switch_units: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		var b = this.switches;
		for (var j = 0; j < b.length; j++)
		{
			if (j == i)
			{
				b[j].removeClass('dark-bg');
				b[j].addClass('light-bg');
			}
			else
			{
				b[j].removeClass('light-bg');
				b[j].addClass('dark-bg');
			}
		}
		if (this.unit != i)
		{
			this.unit = i;
			this.build_graphs();
		}
	},
	set_data: function (data, f)
	{
		this.f = f;
		this.data = data;
		this.build_graphs();
	},
	destroy: function ()
	{
		var g = this.g;
		for (var i = 0; i < g.length; i++)
		{
			if (g[i])
			{
				g[i].destroy();
			}

		}
		this.g = [];
		this.el.empty();
	},
	build_graph_head: function (n)
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: n}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1-2 pure-u-md-1-6 ct-chart'}).inject(grid);
		var labels = new Element('div', {class: 'pure-u-1-2 pure-u-md-1-6 gp-labels'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		return {pie: pie, bar: bar, labels: labels};
	},
	build_graphs: function ()
	{
		this.destroy();
		var dt = this.dtype;
		switch (dt)
		{
			case 0:
				this.build_topic_graph();
				this.build_tag_graph();
				this.build_country_graph();
				break;
			case 1:
				this.build_topic_graph();
				break;
			case 2:
				this.build_country_graph();
				this.build_topic_graph();
				this.build_tag_graph();
				break;
		}
	},
	build_topic_graph: function ()
	{
		var dt = this.dtype;
		if (this.f)
		{
			var re = this.build_graph_head(mapconf.graph_names[dt][0]);
			var data = this.data;
			var f = this.f;

			var g_d = {
				graph_data: data,
				graph_descs: f.g,
				graph_group: 'g',
				unit: this.unit
			};

			var g = new PieGraph(re.pie, g_d, {dtype: this.dtype});
			this.g.include(g);

			var s_d = g.get_g_data();

			this.build_labels(s_d, f.g, g.get_total(), re.labels);
			var b = new BarGraph(re.bar, {
				ord: s_d.d,
				c_d: DataUtil.group_by_g(data),
				y_d: DataUtil.group_by_year(data),
				g_d: f.g,
				g_g: 'g',
				unit: this.unit,
				dtype: this.dtype
			});
			this.g.include(b);
		}
	},
	build_labels: function (data, descs, total, el)
	{
		var w = new Element('div', {class: 'pure-menu'}).inject(el);
		var ul = new Element('ul', {
			class: 'pure-menu-list'
		}).inject(w);

		var gd = data.g;
		var dd = data.d;
		var unit = this.unit;
		for (var i = 0; i < gd.length; i++)
		{
			var n = gd[i];
			var d = dd[i];
			var nx = descs[d];
			var nm = descs[d];
			var title = null;
			if (nm['s'])
			{
				nx = nm['s'];
			}
			else if (nm['q'])
			{
				// if q is defined, also n must be defined
				nx = nm['q'];
				title = nm['n'];
			}
			else if (nm['n'])
			{
				nx = nm['n'];
			}
			else
			{
				nx = nm;
			}
			var li = new Element('li', {
				class: 'pure-menu-item',
				title: title,
				html: '<table><tr><td><span class="' + n.className + '"' + (false ? 'title="' + title + '"' : '') + '>&nbsp;</span></td><td>' + (nx) + ': ' + (unit === 0 ? '' : '€') + (n.data * (total / 100)).format({decimals:0}) + ' (' + n.data.round(2) + '%)</td></tr></table>'
			}).inject(ul);

		}
		//console.log(data);
	},
	build_tag_graph: function ()
	{
		var dt = this.dtype;
		if (this.f)
		{
			var re = this.build_graph_head(mapconf.graph_names[dt][1]);
			var data = this.data;
			var f = this.f;

			var g_d = {
				graph_data: data,
				graph_descs: f.c,
				graph_group: 'c',
				unit: this.unit
			};


			var g = new PieGraph(re.pie, g_d, {dtype: this.dtype});
			this.g.include(g);


			var s_d = g.get_g_data();
			this.build_labels(s_d, f.c, g.get_total(), re.labels);
			var b = new BarGraph(re.bar, {
				ord: s_d.d,
				c_d: DataUtil.group_by_c(data),
				y_d: DataUtil.group_by_year(data),
				g_d: f.c,
				g_g: 'c',
				unit: this.unit,
				dtype: this.dtype
			});
			this.g.include(b);
		}
	},
	build_country_graph: function ()
	{
		var dt = this.dtype;
		var re = this.build_graph_head(mapconf.graph_names[dt][2]);
		var data = this.data;

		var g_d = {
			graph_data: data,
			graph_descs: countries_geo,
			graph_group: 'country',
			unit: this.unit
		};


		var g = new PieGraph(re.pie, g_d, {dtype: this.dtype});
		this.g.include(g);


		var s_d = g.get_g_data();
		this.build_labels(s_d, countries_geo, g.get_total(), re.labels);
		var b = new BarGraph(re.bar, {
			ord: s_d.d,
			c_d: DataUtil.group_by_country(data),
			y_d: DataUtil.group_by_year(data),
			g_d: countries_geo,
			g_g: 'country',
			unit: this.unit,
			dtype: this.dtype
		});
		this.g.include(b);
	}
});

var DPager = new Class({
	Implements: [Events, Options],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {};
		var e = new Element('div', {
			class: 'pure-menu pure-menu-horizontal'
		}).inject(el);
		this.w = new Element('ul', {class: 'pure-menu-list'}).inject(e);
	},
	set_data: function (p)
	{
		this.pagination = p;
		this.rebuild();
	},
	rebuild: function ()
	{
		var p = this.pagination;
		var page = p.page;
		var w = this.w;
		w.empty();
		var pages = Math.ceil(p.count / p.limit) - 1;
		if (page > 0)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-fast-backward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (0))
				}
			}).inject(li);

			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-backward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (page - 1))
				}
			}).inject(li);
		}

		var start = page - 3;
		if (start < 0)
		{
			start = 0;
		}
		var end = page + 3;
		if (start == 0)
		{
			end = start + 6;
		}
		if (end > pages)
		{
			end = pages;
		}
		if (end >= pages)
		{
			start = end - (6 - (pages - end));
		}
		if (start < 0)
		{
			start = 0;
		}

		for (var i = start; i <= end; i++)
		{
			if (i == page)
			{
				var li = new Element('li', {
					html: '<span class="pure-button pure-button-active">' + (i + 1) + '</span>',
					class: 'pure-menu-selected pure-menu-item'
				}).inject(w);
			}
			else
			{
				var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
				new Element('a', {
					html: (i + 1),
					class: 'pure-button pure-menu-link',
					events: {
						click: this.change_page.bind(this, (i))
					}
				}).inject(li);
			}

		}
		if (page < pages)
		{
			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-forward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (page + 1))
				}
			}).inject(li);

			var li = new Element('li', {class: 'pure-menu-item'}).inject(w);
			new Element('a', {
				html: '<i class="el el-fast-forward"></i>',
				class: 'pure-button pure-menu-link',
				events: {
					click: this.change_page.bind(this, (pages))
				}
			}).inject(li);
		}
		this.set_page();
	},
	change_page: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		this.pagination.page = i;
		this.rebuild();
	},
	set_page: function ()
	{
		this.fireEvent('pagechanged', this.pagination);
	}

});
var DTable = new Class({
	Implements: [
		Events,
		Options
	],
	options: {
		table_headers: [
			{
				name: 'City',
				pid: 'city',
				type: 's'
			},
			{
				name: 'Year',
				pid: 'year',
				type: 'n'
			},
			{
				name: 'Applicant',
				pid: 'a',
				type: 's'
			},
			{
				name: 'Project title',
				pid: 'name',
				type: 's'
			},
			{
				name: 'Sum <b style="font-weight: normal">(€)</b>',
				pid: 'amount',
				type: 'n',
				style: 'text-align: center'
			}
		],
		sort_els: {
			'asc': '<i class="el el-caret-up"></i>',
			'desc': '<i class="el el-caret-down"></i>'
		}
	},
	initialize: function (el, options)
	{
		this.dtype = 0;
		this.setOptions(options);
		this.pagination = {
			limit: 50,
			page: 0,
			count: 0
		};

		this.wp  = el;
		var t    = new Element('table', {class: 'pure-table pure-table-bordered pure-table-striped'}).inject(el);
		this.tbl = t;
		this.bld_t();
		this.pager = new DPager(el, {onPagechanged: this.change_page.bind(this)});
	},
	bld_t: function ()
	{
		var t = this.tbl;
		t.empty();
		this.build_head(t);
		this.el = new Element('tbody').inject(t);
	},
	hide: function ()
	{
		this.wp.setStyles({display: 'none'});
	},
	show: function ()
	{
		this.wp.setStyles({display: 'block'});
	},
	set_dtype: function (i)
	{
		this.dtype = i;
		if (i == 1)
		{
			this.hide()
		}
		else
		{
			this.show();
			this.bld_t();
		}
	},
	build_head: function (t)
	{
		var h   = new Element('thead').inject(t);
		var r   = new Element('tr').inject(h);
		var o   = this.options;
		var ho  = o.table_headers;
		var se  = o.sort_els;
		var hal = 0;
		if (this.dtype != 0)
		{
			hal = 1;
		}
		for (var i = 0; i < (ho.length - hal); i++)
		{
			var th = new Element('th').inject(r);
			var e  = new Element('div', {
				class: 'pure-menu pure-menu-horizontal'
			}).inject(th);
			new Element('span', {class: 'pure-menu-heading', html: ho[i].name}).inject(e);
			var ul = new Element('ul', {class: 'pure-menu-list'}).inject(e);
			for (var pid in se)
			{
				var li = new Element('li', {class: 'pure-menu-item'}).inject(ul);
				new Element('a', {
					html: se[pid],
					class: 'pure-button pure-menu-link',
					events: {
						click: this.sort_table.bind(this, {col: ho[i], sort_type: pid})
					}
				}).inject(li);
			}
		}
	},
	set_data: function (data)
	{
		// delete data if dtype == 1 (scholarships)
		if (this.dtype == 1)
		{
			data = [];
		}

		this.pagination.page  = 0;
		this.pagination.count = data.length;
		this.table_data       = data;
		this.pager.set_data(this.pagination);
	},
	change_page: function (p)
	{
		this.pagination = p;
		this.fill_table();
	},
	sort_table: function (o, e)
	{
		if (e)
		{
			e.stop();
		}
		var st = '';
		if (o.sort_type == 'desc')
		{
			st = 'DESC_';
		}
		switch (o.col.type)
		{
			case 's':
				st += 'STRING'
				break;
			case 'n':
				st += 'NUMERIC';
				break;
		}
		this.table_data.sortOn(o.col.pid, Array[st]);
		this.pager.change_page(0);
	},
	fill_table: function ()
	{

		var w = this.el;
		w.empty();
		var pg  = this.pagination;
		var d   = this.table_data;
		var min = pg.page * pg.limit;
		var max = min + pg.limit;
		var hal = 0;
		if (this.dtype != 0)
		{
			hal = 1;
		}
		var ho = this.options.table_headers;
		if (max > d.length)
		{
			max = d.length;
		}
		for (var i = min; i < max; i++)
		{
			var r = new Element('tr');

			for (var j = 0; j < (ho.length - hal); j++)
			{
				var pid = ho[j].pid;
				var opt = {text: (pid === 'amount') ? d[i][pid].format() : d[i][pid]};
				if (ho[j].style)
				{
					opt.style = ho[j].style;
				}
				new Element('td', opt).inject(r);
			}
			r.inject(w);
		}
	}
});

Number.prototype.map = function (in_min, in_max, out_min, out_max)
{
	return ( this - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
};

var DataUtil = {
	count_arr_o: function (data, w)
	{
		var rt = this.count_arr(data, w);
		var d = rt.r;
		var r = {};
		for (var i = 0; i < d.length; i++)
		{
			var e = d[i];
			r[e.pid] = {
				count: e.count,
				p: e.p
			};
		}
		return r;
	},
	count_arr: function (data, w)
	{
		var r = [];
		var total = 0;
		for (var pid in data)
		{
			var a = data[pid];
			var l = a.length;
			switch (w)
			{
				case 0:
					total += data[pid].length;
					r.include({pid: pid, count: l, p: 0});
					break;
				case 1:
					var c = 0;
					for (var i = 0; i < l; i++)
					{
						c += a[i].amount;
					}
					r.include({pid: pid, count: c, p: 0});
					total += c;
					break;
			}

		}
		for (var i = 0; i < r.length; i++)
		{
			r[i]['p'] = r[i]['count'] / (total / 100);
		}
		var ret = {total: total, r: r};
		return ret;
	},
        count_or_sum: function(year_data, data_type)
        {
            if (data_type == 1) {
                var total = 0;
                for (var i = 0; i < year_data.length; i++) {
                    total += year_data[i].amount;
                }
                return total;
            }
            return year_data.length;
        },
	get_max_len: function (data, data_type)
	{
		var max = 0;
		for (var pid in data)
		{
                        var l = this.count_or_sum(data[pid], data_type);
			if (l > max)
			{
				max = l;
			}
		}
		return max;
	},
	group_by_country: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.country])
			{
				r[d.country] = [];
			}
			r[d.country].include(d);
		}
		return r;
	},
	group_by_year: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.year])
			{
				r[d.year] = [];
			}
			r[d.year].include(d);
		}
		return r;
	},
	group_by_city: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.pt_id])
			{
				r[d.pt_id] = [];
			}
			r[d.pt_id].include(d);
		}
		return r;
	},
	group_by_c: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			for (var j = 0; j < d.c.length; j++)
			{
				var dc = d.c[j];
				if (!r[dc])
				{
					r[dc] = [];
				}
				r[dc].include(d);
			}
		}
		return r;
	},
	group_by_g: function (data)
	{
		var r = {};
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			if (!r[d.g])
			{
				r[d.g] = [];
			}
			r[d.g].include(d);
		}
		return r;
	},
	flatten_data: function (data, filters, w, u_cities)
	{
		var v_c = mapconf.visegrad;
		var f_c = filter_countries;
		var d = [];//data
		var p = {};
		var countries = {};
		switch (w)
		{
			case 0:
				for (var i = 0; i < data.length; i++)
				{
					var dx = data[i];
					var pid = dx.s;
					if (!p[pid])
					{
						p[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
					}
					if (!u_cities[pid])
					{
						u_cities[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
					}
					var dt = dx.data;
					for (var pt_year in dt)
					{
						var y_d = dt[pt_year];
						for (var j = 0; j < y_d.length; j++)
						{
							var fd = y_d[j];
							var f_tp = [];
							if (fd['c'])
							{
								for (var k = 0; k < fd.c.length; k++)
								{
									f_tp[k] = String.from(fd.c[k]);
								}
							}
							if (!u_cities[countries_geo[dx.c].s])
							{
								u_cities[countries_geo[dx.c].s] = countries_geo[dx.c];
							}

							var o = {
								pt_id: pid,
								city: dx.s,
								country: dx.c,
								year: String.from(pt_year),
								a: fd.a,
								c: f_tp,
								g: String.from(fd.g),
								amount: fd.amount,
								name: fd.name
							};
							d.include(o);
							if (!countries[dx.c])
							{
								countries[dx.c] = true;
							}
						}
					}
				}
				break;
			case 1:
				var g_countries = {};
				for (var i = 0; i < data.length; i++)
				{
					var dx = data[i];
					var pid = dx.s;
					if (!p[pid])
					{
						p[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
					}
					if (!u_cities[pid])
					{
						u_cities[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
					}
					var dt = dx.data;
					for (var pt_year in dt)
					{
						var y_d = dt[pt_year];
						for (var j = 0; j < y_d.length; j++)
						{
							var fd = y_d[j];
							var f_tp = [];
							if (fd['c'])
							{
								for (var k = 0; k < fd.c.length; k++)
								{
									f_tp[k] = String.from(fd.c[k]);
								}
							}
							for (var cpid in fd)
							{
								if (!u_cities[countries_geo[dx.c].s])
								{
									u_cities[countries_geo[dx.c].s] = countries_geo[dx.c];
								}
								var o = {
									pt_id: pid,
									city: dx.s,
									country: dx.c,
									year: String.from(pt_year),
									a: '',
									c: [String.from(cpid)],
									g: String.from(cpid),
									amount: fd[cpid],
									name: ''
								};
								d.include(o);
								if (!g_countries[cpid])
								{
									g_countries[cpid] = true;
								}
							}
							if (!countries[dx.c])
							{
								countries[dx.c] = true;
							}
						}
					}
				}
				var r_countries = {};
				var gr_countries = {};
				for (var pid in f_c)
				{
					if (v_c.contains(pid) || g_countries[pid])
					{
						r_countries[pid] = f_c[pid];
						gr_countries[pid] = {n: f_c[pid], d: ''};
					}
				}
				filters['g'] = r_countries;
				filters['gc'] = gr_countries;
				break;
			case 2:
				var g_countries = {};
				for (var i = 0; i < data.length; i++)
				{
					var dx = data[i];
					var pid = dx.s;
					if (!p[pid])
					{
						p[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
					}
					if (!u_cities[pid])
					{
						u_cities[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
					}
					var dt = dx.data;
					for (var pt_year in dt)
					{
						var y_d = dt[pt_year];
						for (var j = 0; j < y_d.length; j++)
						{
							var fd = y_d[j];
							var f_tp = [];
							if (fd['c'])
							{
								for (var k = 0; k < fd.c.length; k++)
								{
									f_tp[k] = String.from(fd.c[k]);
								}
							}
							if (!u_cities[countries_geo[String.from(fd.ci)].s])
							{
								u_cities[countries_geo[String.from(fd.ci)].s] = countries_geo[String.from(fd.ci)];
							}
							var o = {
								pt_id: pid,
								city: dx.s,
								country: String.from(fd.ci),
								year: String.from(pt_year),
								a: fd.n,
								c: f_tp,
								g: dx.c,
								amount: 1,
								name: fd.h
							};
							d.include(o);
							if (!countries[fd.ci])
							{
								countries[fd.ci] = true;
							}
							if (!g_countries[dx.c])
							{
								g_countries[dx.c] = true;
							}
						}
					}
				}
				var r_countries = {};
				for (var pid in f_c)
				{
					if (v_c.contains(pid) || g_countries[pid])
					{
						r_countries[pid] = f_c[pid];
					}
				}
				filters['g'] = r_countries;
				break;

		}

		var f_countries = {};
		for (var pid in f_c)
		{
			if (v_c.contains(pid) || countries[pid])
			{
				f_countries[pid] = f_c[pid];
			}
		}
		filters['countries'] = f_countries;
		var ret = {
			filters: filters,
			data: d,
			points: p
		};
		return ret;
	}
};


(function ()
{
	Array.implement({
		filterOn: function (fields)
		{
			return this.filter(function (item)
			{
				var ret = true;
				for (var pid in fields)
				{
					var a = fields[pid];
					switch (pid)
					{
						case 'countries':
							if (!a.contains(item.country))
							{
								ret = false;
								return ret;
							}
							break;
						case 'years':
							if (!a.contains(item.year))
							{
								ret = false;
								return ret;
							}
							break;

						case 'tags':
							var b = [];
							for (var i = 0; i < item.c.length; i++)
							{
								if (a.contains(item.c[i]))
								{
									b.include(item.c[i]);
								}
							}
							if (b.length == 0)
							{
								ret = false;
								return ret;
							}
							break;
						case 'types':
							if (!a.contains(item.g))
							{
								ret = false;
								return ret;
							}
							break;

					}
				}
				return ret;
			});
		}
	});
})();

var FilterWin = new Class({
	Implements: [
		Events,
		Options
	],
	options: {current_switch: 0},
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.visible = false;
		this.el = el;
		var b = el.getElement('a.switch');
		b.addEvent('click', this.sw.bind(this));
		this.switches = el.getElements('a.g-switch');
		this.bind_switches();
	},
	bind_switches: function ()
	{
		var s = this.switches;
		for (var i = 0; i < s.length; i++)
		{
			s[i].addEvent('click', this.switch_grants.bind(this, i));
		}
		this.switch_tabs(this.options.current_switch);
	},
	switch_grants: function (i, e)
	{
		if (e)
		{
			e.stop();
		}
		if (i != this.options.current_switch)
		{
			this.options.current_switch = i;//store current switch
			this.switch_tabs(i);
			this.show();//open the filter window
		}
		else
		{
			this.sw();//use as win show/hide switch
		}
	},
	switch_tabs: function (i)
	{
		var s = this.switches;
		for (var j = 0; j < s.length; j++)
		{
			if (j == i)
			{
				s[j].removeClass('dark-bg');
				s[j].addClass('light-bg');
			}
			else
			{
				s[j].removeClass('light-bg');
				s[j].addClass('dark-bg');
			}
		}
		this.fireEvent('typeswitch', this.options.current_switch);
	},
	sw: function (e)
	{
		if (e)
		{
			e.stop();
		}
		switch (this.visible)
		{
			case true:
				this.hide();
				break;
			default :
				this.show();
				break;

		}
	},
	show: function ()
	{
		this.visible = true;
		this.el.addClass('visible');
	},
	hide: function ()
	{
		this.visible = false;
		this.el.removeClass('visible');
	}
});
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
var MessageWin = new Class({
	initialize: function (el)
	{
		this.el = el;
	},
	set_message: function (m)
	{
		this.el.empty();
		this.el.set('html', m);
	}
});
/*
---
description: Add autocomplete functionality to input elements, provides tag and normal text autocmplete modes.

license: MIT-style

authors:
- Erik Dubbelboer

requires:
- Core/Element.Event
- Core/Element.Style

provides: [MooComplete]

...
*/

/*
tag mode and some other minor changes provided by abidibo <abidibo@gmail.com> <http://www.abidibo.net> <http://github.com/abidibo>
*/

// options should be an object and can contain the following members:
//  - list: Array              the list of elements to autocomplete from
//  - size: number             the number of elements to suggest
//  - mode: string             the autocomplete mode ('tag' or 'text'), default 'text'
//  - showonkeydown: boolean   shows suggestions on key down
//  - render: function(value)  the function called when rendering an element from the list
//  - get: function(value)     the function called when testing the value against the input
//  - set: function(value)     the function called when putting an element from the list into the input element (detauls to the get function)
//  - filters: Array           list of functions to filter suggestions. The functions should take two arguments, the first is the suggestion from the list, the second is the user input. If a function returns true the suggestion will be added to the list.
function MooComplete(element, options) {
  options = options || {};

  var list = options.list || [];

  this.setList = function(l) {
    list = l;
  }

  // First add suggestions that match the start, then suggestions that match the middle.
  if (!options.filters) {
    options.filters = [
      function(o, v) { return (o.indexOf(v) == 0); },
      function(o, v) { return ((v.length > 1) && (o.indexOf(v) > 0)); }
    ];
  }

  options.size = options.size || 10;

  // tag mode | text mode others in future?
  options.mode = options.mode || 'text';

  options.showonkeydown = (typeof options.showonkeydown == 'undefined') ? true : false;

  if (!options.render) {
    // Default render function assumes a list of strings and just puts a span around it.
    options.render = function(v) {
      return new Element('span', {
        'text': v
      });
    };
  }

  if (!options.get) {
    // Default get function assumes a list of strings so just return the string.
    options.get = function(v) {
      return v;
    };
  }

  if (!options.set) {
    // The default function is the same as the get function.
    options.set = options.get;
  }

  // allow id and dom object selection
  element = typeOf(element)==='string' ? $(element) : element;

  // For older versions of IE this doesn't work, for those you need to set autocomplete=off in the html.
  element.setAttribute('autocomplete', 'off');

  // Disable auto correct and capitalize on iPhone and iPad.
  element.setAttribute('autocorrect', 'off');
  element.setAttribute('autocapitalize', 'off');

  var box = new Element('div', {
    'class':  'moocomplete',
    'styles': {
      'position': 'absolute',
      'display':  'none'
    }
  }).inject(document.body);

  var old,
      hover       = -1,
      hiding      = false,
      suggestions = 0;

  // Update the position of the box.
  function position() {
    box.setStyles({
      'width': (element.getWidth() - 2) + 'px',
      'top':   (element.getCoordinates().top + element.getHeight()) + 'px',
      'left':  element.getCoordinates().left +'px'
    });
  }

  // Reposition on a resize.
  window.addEvent('resize', position);

  // get element value to search for
  function getNeedle() {
    if (options.mode === 'tag') {
      element.store('input_value', element.get('value').substring(0, element.get('value').lastIndexOf(',') + 1));

      return element.get('value').substr(element.get('value').lastIndexOf(',') + 1 || 0).toLowerCase().trim();
    } else {
      return element.get('value').toLowerCase();
    }
  }

  // Show suggestions for current input.
  function showSuggestions(noEmpty) {
    var v = getNeedle();

    if ((v.length == 0) && !noEmpty) {
      box.setStyle('display', 'none');
      return;
    }

    suggestions = 0;

    box.empty();

    options.filters.each(function(f) {
      if (suggestions == options.size) {
        return;
      }

      list.every(function(o) {
        if (f(options.get(o).toLowerCase(), v)) {
          var li = suggestions++;

          box.adopt(new Element('div', {
            'events': {
              'mousemove': function() { // don't use mouseover since that will bug when the user has the mouse below the input box while typing
                if (!hiding) {
                  hover = li;
                  showHover();
                }
              }
            }
          }).adopt(options.render(o)).store('val', o));

          if (suggestions == options.size) {
            return false;
          }
        }

        return true;
      });
    });

    position();

    // If no suggestions, no need to show the box
    if (suggestions > 0) {
        box.setStyle('display', 'block');
    } else {
        box.setStyle('display', 'none');
    }
  }


  // Highlight hovered item and place it in the input field
  function showHover() {
    var c = box.getChildren();

    c.removeClass('hovered');

    if (hover >= 0) {
      c[hover].addClass('hovered');

      if (options.mode==='tag') {
        element.set('value', element.retrieve('input_value') + options.set(c[hover].retrieve('val')));
      } else {
        element.set('value', options.set(c[hover].retrieve('val')));
      }
    }
  }


  element.addEvents({
    'keydown': function(e) {
      if (box.getStyle('display') == 'none') {
        if (options.showonkeydown && (e.code == 40)) { // down
          showSuggestions(true);
        }

        return;
      }

      if (e.code == 38) { // up
        if (hover >= 0) {
          if (hover == 0) {
            element.set('value',  options.set(old));
          }

          --hover;
          showHover();
        }
      } else if (e.code == 40) { // down
        if (hover < (suggestions - 1)) {
          ++hover;
          showHover();
        }
      } else {
        hover = -1;
        // No need to update the hovered item since we are redrawing the suggestions anyways
      }
    },
    'keyup': function(e) {
      if (e.code == 27) { // escape
        box.setStyle('display', 'none');
      } else if ((e.code != 38) && // up
                 (e.code != 40)) { // down
        old = element.retrieve('val');

        if (e.code != 13) { // enter
          showSuggestions();
        } else {
          box.setStyle('display', 'none');
        }
      }
    },
    'focus': function() {
      hiding = false;

      if (box.getStyle('display') == 'none') {
        showSuggestions();
      }
    },
    'blur': function() {
      hover  = -1;
      old    = element.retrieve('val');
      hiding = true;

      (function() {
        box.setStyle('display', 'none');
      }).delay(100);
    },
    'mousemove': function() {
      if (hover >= 0) {
        element.set('value',  options.set(old));
        hover = -1;
        showHover();
      }
    }
  });
}


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
var PieGraph = new Class({
	Implements: [Events, Options],
	initialize: function (el, data, options)
	{
		this.data = data;
		this.setOptions(options);
		var g_data = this.mk_graph(data);
		this.g_data = g_data;
		this.tips = new Tips();
		var g = new Chartist.Pie(el,
			{
				series: g_data.g
			},
			{
				donut: true,
				donutWidth: 50,
				showLabel: false
			});
		g.on('created', this.graph_bind_events.bind(this, el));
	},
	get_g_data: function ()
	{
		return this.g_data;
	},
	mk_graph: function (data)
	{
		var gr = data.graph_group;
		var unit = data.unit;
		this.gr = gr;
		var c_d;

		switch (gr)
		{
			case 'c':
				c_d = DataUtil.group_by_c(data.graph_data);
				break;
			case 'g':
				c_d = DataUtil.group_by_g(data.graph_data);
				break;
			case 'country':
				c_d = DataUtil.group_by_country(data.graph_data);
				break;
		}
		var gga = DataUtil.count_arr(c_d, unit);
		var s = gga.r;
		this.total = gga.total;

		s.sortOn("count", Array.DESC_NUMERIC);

		var c = [];
		var d = [];
		for (var i = 0; i < s.length; i++)
		{
			c.include({data: s[i].p, className: 'graph-' + (i % 17)});
			d.include(s[i].pid);
		}
		return {g: c, d: d, u: unit};
	},
	get_total: function ()
	{
		return this.total;
	},
	graph_bind_events: function (el)
	{
		var d = this.data.graph_descs;
		var gr = this.gr;
		var p = this.g_data.g;

		var t = this.total;
		var map = this.g_data.d;
		var u = this.g_data.u;
		var s = el.getElements('.ct-series');
		var l = s.length;
		var l1 = l - 1;
		var st = 'projects';
		if (this.options.dtype)
		{
			switch (this.options.dtype)
			{
				case 0:
					st = 'projects';
					break;
				case 1:
					st = 'semesters';
					break;
				case 2:
					st = 'artists';
					break;
			}
		}
		for (var i = 0; i < l; i++)
		{
			var j = (l1 - i);
                        var n = p[j].data * (t / 100);
			var ad = ': ' + (u === 0 ? n.format({decimals:0}) + ' ' + st : n.formatCurrency({decimals:0})) + ' (' + (p[j].data).round(2) + '%)';
			switch (gr)
			{
				case 'c':
					s[i].store('tip:title', d[map[j]].n + ad);
					s[i].store('tip:text', d[map[j]].d);
					break;
				case 'g':
					s[i].store('tip:title', d[map[j]] + ad);
					break;
				case 'country':
					s[i].store('tip:title', d[map[j]].s + ad);
					break;
			}
		}
		if (this.tips)
		{
			this.tips.attach(s);
		}
	},
	destroy: function ()
	{
		this.tips.destroy();
	}
});

var PlaceFilter = new Class({
	Implements: [Events, Options],
	initialize: function (data, filterdata, options)
	{
		this.setOptions(options);

		this.created_filter = {years: false, countries: false, types: false, tags: false};

		var p = $('filter_pane');


		this.select_filters = ['countries', 'types', 'tags'];
		this.cc_s = 0;

		this.sel_filter = 0;

		this.msg = {};

		this.data = data;
		this.p_data = [];
		this.f_data = [];
		this.f_points = [];
		this.f_filters = {};

		this.filterdata = filterdata;

		this.pref = [];
		this.filtered_data = [];//all filtersdata


		this.year_sel = new YearSel($$('ul.years')[0], mapconf.year_bounds, {
			onRangechanged: this.filter_years.bind(this)
		});

		this.build_selects(p);

		new FilterWin(p, {
			onTypeswitch: this.switch_data.bind(this)
		});
	},

	check_created: function ()
	{
		var c = this.created_filter;
		var created = true;
		for (var pid in c)
		{
			if (c[pid] == false)
			{
				created = false;
			}
		}
		if (created == true)
		{
			this.fireEvent('created');
		}
	},
	get_msg: function ()
	{
		var m = 'Showing ';
		var msgs = this.msg;
		var m_a = [];
		switch (this.sel_filter)
		{
			case 0:
				for (var pid in msgs)
				{
					switch (pid)
					{
						case 'years':
							m_a[3] = 'in ' + msgs[pid];
							break;
						case 'countries':
							if (msgs[pid].m1 == 'all')
							{
								m_a[1] = 'in ' + msgs[pid].m1 + ' ' + pid;
							}
							else
							{
								m_a[1] = 'in ' + msgs[pid].m2;
							}
							break;
						case 'types':
							if (msgs[pid].m1 == 'all')
							{
								m_a[0] = '' + msgs[pid].m1 + ' grants';
							}
							else
							{
								m_a[0] = '' + msgs[pid].m1 + ' grants';
							}
							break;
						case 'tags':
							if (msgs[pid].m1 == 'all')
							{
								m_a[2] = 'in ' + msgs[pid].m1 + ' fields';
							}
							else
							{
								m_a[2] = 'in the following field(s) <i>' + msgs[pid].m1 + '</i>';
							}
							break;
					}
				}
				break;
			case 1:
				m = 'Showing total number of semesters in';
				for (var pid in msgs)
				{
					switch (pid)
					{
						case 'years':
							m_a[3] = 'in ' + msgs[pid];
							break;
						case 'countries':
							if (msgs[pid].m1 == 'all')
							{
								m_a[1] = msgs[pid].m1 + ' ' + pid;
							}
							else
							{
								m_a[1] = msgs[pid].m2;
							}
							break;
					}
				}
				break;
			case 2:
				m = 'Showing residencies in ';
				for (var pid in msgs)
				{
					switch (pid)
					{
						case 'years':
							m_a[3] = 'in ' + msgs[pid];
							break;
						case 'countries':
							if (msgs[pid].m1 == 'all')
							{
								m_a[1] = 'from ' + msgs[pid].m1 + ' ' + pid;
							}
							else
							{
								m_a[1] = 'from ' + msgs[pid].m2;
							}
							break;
						case 'types':
							if (msgs[pid].m1 == 'all')
							{
								m_a[0] = '' + msgs[pid].m1 + ' countries';
							}
							else
							{
								m_a[0] = '' + msgs[pid].m2;
							}
							break;
						case 'tags':
							if (msgs[pid].m1 == 'all')
							{
								m_a[2] = 'in ' + msgs[pid].m1 + ' disciplines';
							}
							else
							{
								m_a[2] = 'in the discipline(s) <i>' + msgs[pid].m1 + '</i>';
							}
							break;
					}
				}
				break;
		}
		m = m + m_a.join(' ');
		return m;
	},
	build_selects: function (el)
	{
		var s = el.getElements('select');
		var a = el.getElements('a.s-all');
		var n = el.getElements('a.s-none');
		var d = this.select_filters;
		var selects = {};
		this.filt_arr = {};
		for (var i = 0; i < s.length; i++)
		{
			this.filt_arr[d[i]] = [];
			selects[d[i]] = new SelectFilter(s[i], a[i], n[i], {
				onFilterchange: this.set_filt_arr.bind(this, d[i])
			});
		}
		this.selects = selects;

	},
	set_filt_arr: function (i, d)
	{
		this.msg[i] = d.msg;
		this.filt_arr[i] = d.filter;
		var prefiltered = this.prefilter();
		this.p_data = prefiltered;
                
                // set_data hides or shows bottom sections
                this.year_sel.switch_data(this.get_data_type());
		this.year_sel.set_data(prefiltered);
	},
	switch_data: function (i)
	{
		switch (i)
		{
			case 0:
			case 2:
				this.filt_arr = {countries: [], tags: [], types: []};
				break;
			case 1:
				this.filt_arr = {countries: [], types: []};
				break;
		}
		this.year_sel.set_header(mapconf.year_labels[i]);
		this.fireEvent('datachanged', i);
		this.sel_filter = i;

		var s = this.selects;
		var data = this.data;
		var fd = this.filterdata[i];

		this.f_points = data[i].points;
		this.f_data = data[i].data;
		this.p_data = [];

		this.f_filters = fd;

		if (fd['countries'])
		{
			s['countries'].show();
			s['countries'].set_data(fd.countries);
			s['countries'].set_label(mapconf.filter_labels[i].countries);
		}
		else
		{
			s['countries'].hide();
		}
		if (fd['g'])
		{
			s['types'].show();
			s['types'].set_data(fd.g);
			s['types'].set_label(mapconf.filter_labels[i].g);
		}
		else
		{
			s['types'].hide();
		}
		if (fd['c'])
		{
			s['tags'].show();
			s['tags'].set_data(fd.c);
			s['tags'].set_label(mapconf.filter_labels[i].c);
		}
		else
		{
			s['tags'].hide();
		}
	},
	get_data_type:function()
	{
		return this.sel_filter;
	},
	filter_years: function (y)
	{
		this.msg['years'] = y.msg;
		var yrs = y.years;
		var d = this.p_data;
		var f = {years: yrs};
		var tmp_d = d.filterOn(f);
		this.filter(tmp_d);
	},
	prefilter: function ()
	{
		var f = this.filt_arr;
		var data = this.f_data;
		var rd = data.filterOn(f);
		if (f['tags'] && f['tags'].length > 0)
		{
			for (var i = 0; i < rd.length; i++)
			{
				var c = [];
				for (var j = 0; j < rd[i].c.length; j++)
				{
					var cc = rd[i].c[j];
					if (f['tags'].contains(cc))
					{
						c.include(cc);
					}
				}
				rd[i].c = c;
			}
		}
		return rd;
	},
	filter: function (data)
	{
		var msg = this.get_msg();
		var r = {
			points: this.f_points,
			data: data,
			message: msg,
			sel: this.sel_filter
		};
		this.fireEvent('filterchanged', r);
	}
});

var SearchBox = new Class({
	Implements: [Events, Options],
	initialize: function (points, options)
	{
		$('searchform').addEvent('submit',this.fnd.bind(this));
		this.pts=points;
		var list=[];
		for(var pid in points)
		{
			list.include(pid);
		}
		this.setOptions(options);
		new MooComplete('s-place', {
			list: list,
			size: 3,
			set:function(v)
			{
				this.searched(points[v])
				return v;
			}.bind(this)
		});
	},
	fnd:function(e)
	{
		if(e)
		{
			e.stop();
		}
	},
	searched:function(p)
	{
		this.fireEvent('found', p);
	}
})

var SelectFilter = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, a, n, options)
	{
		this.created = false;
		this.setOptions(options);

		var w = new Element('div', {class: 'pure-menu select-wrapper'}).inject(el, 'before');
		var ul = new Element('ul', {class: 'pure-menu-list select'}).inject(w);
		this.el = ul;
		var p = el.getParent()
		this.head = p.getElement('header');
		this.s = p.getParent();
		this.filter = [];
		this.els = {};
		this.vals = {};

		el.destroy();

		a.addEvent('click', this.select_all.bind(this));
		n.addEvent('click', this.select_none.bind(this));
	},
	set_label: function (label)
	{
		this.head.set('html', label);
	},
	show: function ()
	{
		this.s.setStyles({
			visibility: 'visible'
		});
	},
	hide: function ()
	{
		this.s.setStyles({
			visibility: 'hidden'
		});
	},
	get_message: function ()
	{
		var els = this.els;
		var a = this.filter;
		var r_a = [];
		var r_a_ = [];
		var all = true;
		var m = 'none';
		var m_ = 'none';
		for (var pid in els)
		{
			if (a.contains(pid))
			{
				r_a.include(els[pid].get('html'));
				if (countries_geo[pid] && countries_geo[pid]['st'])
				{
					r_a_.include('<span title="' + countries_geo[pid]['st'] + '">' + pid + '</span>');
				}
				else
				{
					r_a_.include(pid);
				}
			}
			else
			{
				all = false;
			}
		}
		if (all == true)
		{
			m = 'all';
			m_ = 'all'
		}
		else if (r_a.length > 0)
		{
			m = r_a.join(', ');
			m_ = r_a_.join(', ');
		}
		return {m1: m, m2: m_};
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
		var els = {};
		var vals = {};
		for (var pid in data)
		{
			var e = new Element('li', {
				class: 'pure-menu-item select-item',
				html: (data[pid]['n'] ? data[pid]['n'] : data[pid]),
                                title: (data[pid]['d'] ? data[pid]['d'] : null),
				events: {
					click: this.change_filters.bind(this, pid)
				}

			}).inject(el);
			els[pid] = e;
			vals[pid] = false;
		}
		this.vals = vals;
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
		var vals = this.vals;
		var els = this.els;

		if (vals[pid] == true)
		{
			vals[pid] = false;
			els[pid].addClass('light-bg');
			els[pid].removeClass('dark-bg');
		}
		else
		{
			vals[pid] = true;
			els[pid].addClass('dark-bg');
			els[pid].removeClass('light-bg');
		}

		var tmps = [];

		for (var pd in vals)
		{
			if (vals[pd] == true)
			{
				tmps.push(pd);
			}
		}

		this.filter = tmps;

		if (this.timer)
		{
			window.clearTimeout(this.timer);
		}
		this.timer = this.select_change.delay(50, this);
	},
	select_all: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		var vals = this.vals;

		var tmps = [];

		for (var pid in vals)
		{
			vals[pid] = true;
			els[pid].addClass('dark-bg');
			els[pid].removeClass('light-bg');
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
		var vals = this.vals;

		for (var pid in vals)
		{
			vals[pid] = false;
			els[pid].addClass('light-bg');
			els[pid].removeClass('dark-bg');
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
var VisegradApp = {
	initiated: false,
	first_time: true,
	init: function ()
	{
		if (this.initiated == false)
		{

			$$('body').addEvent('keydown', function (event)
			{
				// the passed event parameter is already an instance of the Event type.
				//console.log(event.key);   // returns the lowercase letter pressed.
				//alert(event.shift); // returns true if the key pressed is shift.
				if (event.key == 'l' && event.control)
				{
					$$('header').hide();
					$$('footer').hide();
					$$('.page-scroller').hide();
					$$('#map-controls').hide();
					$$('#mapsearch').hide();
					$$('#city-country').hide();
					$$('#e-graphs').hide();
					$$('#e-table').hide();
					$$('main.main-content').setStyle('top', 0);
				}
			});

			this.scroller = new PageScroller($$('section.page-section'));

			this.initiated = true;
			var dt         = [];
			var cities     = [];
			var u_cities   = [];
			for (var i = 0; i < mapdata.length; i++)
			{
				dt[i]      = DataUtil.flatten_data(mapdata[i], filters[i], i, u_cities);
				cities[i]  = dt[i].points;
				filters[i] = dt[i].filters;
			}

			this.msg_win = new MessageWin($('filter-message'));
			this.map     = new AppMap($(mapid), $('map-controls'), mapconf, {
				onGraphcreated: this.draw_graph.bind(this),
				onGraphdestroyed: this.graph_closed.bind(this)
			});
			this.graph   = new DGraph($('e-graphs'));
			this.table   = new DTable($('e-table'));

			this.filter = new PlaceFilter(dt, filters, {
				onFilterchanged: this.draw.bind(this),
				onDatachanged: this.data_changed.bind(this)
			});

			new SearchBox(u_cities, {
				onFound: this.move_map.bind(this)
			});
		}
	},
	move_map: function (p)
	{
		this.map.move_map(p, true);
	},
	data_changed: function (i)
	{
		this.graph.set_dtype(i);
		this.table.set_dtype(i);
		this.map.set_dtype(i);
		if (i == 1)
		{
			this.scroller.set_max(2);
		}
		else
		{
			this.scroller.set_max(3);
		}
		this.scroller.recalculate();
	},
	draw: function (d)
	{
		this.all_data = d;
		var data      = d.data;
		var message   = d.message;
		var pts       = d.points;
		var sel       = d.sel;
		this.msg_win.set_message(message);
		this.map.draw_points(data, pts, filters[sel]);
		this.refill(d);
	},
	refill: function (d)
	{
		var data = d.data;
		var sel  = d.sel;
		this.graph.set_data(data, filters[sel]);
		this.table.set_data(data);
	},
	draw_graph: function (d_in)
	{
		var d  = this.all_data;
		var di = {data: d_in.data, sel: d.sel};
		this.refill(di);
	},
	graph_closed: function ()
	{
		this.refill(this.all_data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));

function color(c)
{
	$$('.marker-circle').setStyle('fill', c);
	$$('.marker-circle').setStyle('background-color', c);
	return 'At your service';
}

var YearDrag = new Class({
	Implements: [
		Events,
		Options
	],
	drags: [
		'min',
		'max'
	],
	initialize: function (el, divs, options)
	{
		this.setOptions(options);
		var w = el.getParent();
		w.setStyles({
			position: 'relative'
		});

		var el = new Element('div', {
			styles: {
				position: 'absolute',
				width: '100%',
				height: '20px',
				bottom: 10,
				left: 0,
				padding: '1em'
			}
		}).inject(w);
		var d_w = new Element('div', {
			styles: {
				position: 'relative',
				'border-top': '2px solid #000'
			}
		}).inject(el);
		var sliders = [];
		for (var i = 0; i < 2; i++)
		{
			sliders[i] = new Element('a', {
				styles: {
					display: 'block',
					width: 20,
					height: 30,
					top: -15,
					cursor: 'pointer',
					'text-align': 'center',
					'padding-top': '0.2em',
					position: 'absolute'
				},
				html: '<i class="el el-caret-up"></i>'
			}).inject(d_w);
		}
		new YearSlider(d_w, sliders, divs, {
			onChanged: this.sliders_changed.bind(this)
		});
	},
	sliders_changed: function (range)
	{
		this.fireEvent('changed', range);
	}
});
var YearSel = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, bounds, options)
	{
		this.created = false;
		this.setOptions(options);
		this.p_d     = {
			data: {},
			max: 0
		};
		this.head_el = el.getParent().getElement('header');
		this.bounds  = bounds;
		this.build_elements(bounds, el);
		this.data       = [];
		this.sel_filter = 0;
		this.drag       = new YearDrag(el, this.vals.length, {
			onChanged: this.change_vals.bind(this)
		});
	},
	set_header: function (t)
	{
		this.head_el.getFirst().set('text', t);
	},
	set_header_count: function (c)
	{
		this.head_el.getLast().set('text', c.format());
		// this hides/shows the below content if 0 items selected and fires scroll (won't help to properly handle scrolling arrows)
		if (c == 0)
		{
			$('e-table').hide();
			$('e-graphs').hide();
		}
		else
		{
			if (this.sel_filter == 1)
			{
				$('e-table').hide();
			}
			else
			{
				$('e-table').show();
			}

			$('e-graphs').show();
		}
		$$('body').fireEvent('scroll');
	},
	get_message: function ()
	{
		var f   = this.range;
		var min = f[0];
		var max;
		var m   = '';
		for (var i = 0; i < f.length; i++)
		{
			max = Number.from(f[i]);
		}
		if (min != max)
		{
			m = min + '–' + max
		}
		else
		{
			m = min;
		}
		return m;
	},
	build_elements: function (b, el)
	{
		var bars = [];
		var vals = [];
		for (var i = b.min; i <= b.max; i++)
		{
			var li  = new Element('li');
			var y_c = new Element('div', {
				class: 'year-container'
			}).inject(li);

			var ba = new Element('div').inject(y_c);
			var va = new Element('div', {class: 'year-val', text: i}).inject(li);
			li.inject(el);
			vals.include(va);
			bars.include(ba);
		}
		this.bars = bars;
		this.vals = vals;
	},
	set_data: function (data)
	{
		this.p_d = this.prepare_data(DataUtil.group_by_year(data));

		this.set_header_count(this.p_d.count);
		this.redraw_divs();

		if (this.created == false)
		{
			this.created = true;
			this.fireEvent('filtercreated');
		}
	},
	switch_data: function (i)
	{
		this.sel_filter = i;
	},
	get_data_type: function ()
	{
		return this.sel_filter;
	},
	redraw_divs: function ()
	{
		var bars = this.bars;
		var vals = this.vals;
		var lim  = this.limit;

		var f = [];

		var dt   = this.p_d;
		var data = dt.data;
		var m    = dt.max / 100;

		for (var i = 0; i < vals.length; i++)
		{
			var y  = vals[i].get('text');
			var v  = 0;
			var hg = 0;
			var t  = '';
			if (data[y])
			{
				v = DataUtil.count_or_sum(data[y], this.get_data_type());
			}
			if (v > 0)
			{
				hg = v / m;
				t  = String.from(v);
			}
			bars[i].set('text', t).setStyles({
				                                 height: hg + '%'
			                                 });
			if (i >= lim.min && i < lim.max)
			{
				bars[i].addClass('sel');
				f.include(y);
			}
			else
			{
				bars[i].removeClass('sel');
			}
		}
		this.range = f;
		var ret    = {
			years: f,
			msg: this.get_message()
		}
		this.fireEvent('rangechanged', ret);

	},
	change_vals: function (d)
	{
		this.limit = d;
		this.redraw_divs();
	},
	prepare_data: function (data)
	{
		var max   = DataUtil.get_max_len(data, this.get_data_type());
		var w     = (this.get_data_type() == 1) ? 1 : 0;
		var count = DataUtil.count_arr(data, w).total;
		return {data: data, max: max, count: count};
	}
});

var YearSlider = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (wrapper, sliders, divs, options)
	{
		this.setOptions(options);
		this.w       = wrapper;
		this.sliders = sliders;

		var d = [];
		var l = sliders.length - 1;

		this.bounds         = {};
		this.bounds['divs'] = divs;

		for (var i = 0; i < l + 1; i++)
		{
			d[i] = new Drag(sliders[i], {
				onComplete: this.snap.bind(this, i)
			});
		}
		this.drags = d;

		this.slidersel = [0, divs];
		this.set_size();
		this.chng();
		window.addEvent('resize', this.set_size.bind(this));
	},
	set_size: function ()
	{
		var wrapper = this.w;
		var w_s     = wrapper.getSize();
		var divs    = this.bounds.divs;

		var grid      = Math.ceil(w_s.x / divs);
		var d         = this.drags;
		var sliders   = this.sliders;
		var slidersel = this.slidersel;
		var l         = sliders.length - 1;

		for (var i = 0; i < d.length; i++)
		{
			var s_s = sliders[i].getSize();
			var x   = Math.round(s_s.x / 2);
			var y   = Math.round(s_s.y / 2);

			var s_p = (slidersel[i] * grid - x);
			sliders[i].setStyles({
				                     left: s_p
			                     });
			var min_x = 0 - x;
			var max_x = w_s.x - x;

			d[i].options.limit = {
				x: [
					min_x + (Math.floor(w_s.x / divs) * i),
					max_x - Math.ceil(w_s.x / divs) * (l - i - 1)
				],
				y: [
					0 - y,
					0 - y
				]
			};
			d[i].options.grid = grid;
		}
		this.bounds['x']    = {
			min: min_x,
			max: max_x
		};
		this.bounds['grid'] = grid;
	},
	snap: function (i, el)
	{
		var b = this.bounds;
		var p = el.getPosition(this.w);
		switch (i)
		{
			case 0:
				this.drags[1].options.limit.x[0] = p.x + b.grid;
				this.slidersel[0]                = Math.ceil((p.x - b.x.min) / b.grid);
				break;
			case 1:
				this.drags[0].options.limit.x[1] = p.x - b.grid;
				this.slidersel[1]                = Math.ceil((p.x - b.x.min) / b.grid);
				break;
		}
		this.chng();
	},
	chng: function ()
	{
		var s = this.slidersel;
		var r = {
			min: s[0],
			max: s[1]
		}
		this.fireEvent('changed', r);
	}
});
var mapconf = {
	url: 'http://map.visegradfund.org/{id}/{z}/{x}/{y}.png',
	attr: 'one',
	year_labels: ["Total number of grants:", "Total number of semesters:", "Total number of residencies:"],
	filter_labels: [
		{countries: "Country:", g: "Grant program:", c: "Fields of activity:"},
		{countries: "Host countries:", g: "Scholars from:"},
		{countries: "Artist from:", g: "Host country:", c: "Discipline"},
	],
	graph_names: [
		["Grant programs:", "Activity fields:", "Countries:"],
		["Participant countries:", "", ""],
		["Host countries:", "Disciplines:", "Artist from:"]
	],
	visegrad: ["CZ", "HU", "PL", "SK"],
	subdomains: ''.split('.'),
	map_id: 'toner',
	min_z: 3,
	max_z: 10,
	min_radius: 10,
	max_radius: 60,
	v4_bounds: [
		[
			55.0721744,
			12.1004461
		],
		[
			45.7268402,
			24.1729511
		]
	],
	year_bounds: {
		min: 2000,
		max: 2015
	}
};
var mapid = 'map-main';
