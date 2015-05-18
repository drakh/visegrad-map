var AppMap = new Class({
	Implements: [Events, Options],
	options: {
		tips: null
	},
	initialize: function (el, c, conf, options)
	{
		this.setOptions(options);
		this.conf = conf;
		this.markers = [];
		var a_map = L.map($(mapid), {
			attributionControl: false,
			zoomControl: false
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
		this.map = a_map;
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
	draw_points: function (data, points, f)
	{

		this.remove_markers();

		var pts_data = DataUtil.group_by_city(data);
		var cts_data = DataUtil.group_by_country(data);
		var data = {
			cities: pts_data,
			countries: cts_data
		};
		var pts = {
			cities: points,
			countries: countries_geo
		};
		var w = 'cities';
		this.data = data;
		this.graph_f = f;
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
				var marker = new CityMarker(map, p, max, {
					tips: o.tips,
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
			var bounds = L.bounds(b_arr);
			this.bounds = bounds;

			//var z = this.map.getBoundsZoom(bounds);
			/*
			 if (z > conf.max_z)
			 {
			 z = conf.max_z;
			 }
			 if (z < conf.min_z)
			 {
			 z = conf.min_z;
			 }
			 */
			//map.setMaxBounds(bounds);
			//map.options.minZoom = z;
			//this.zoom_to_bounds();
		}
		/*
		 this.graph_f = f;

		 var pane = this.pane;
		 var map = this.map;

		 var points = data.points;
		 var bounds = data.bounds;
		 this.map.options.minZoom = 0;
		 var conf = this.conf;

		 if (points.length > 0)
		 {
		 var z = this.map.getBoundsZoom(bounds);
		 if (z > conf.max_z)
		 {
		 z = conf.max_z;
		 }
		 if (z < conf.min_z)
		 {
		 z = conf.min_z;
		 }

		 this.map.setMaxBounds(bounds);
		 this.map.options.minZoom = z;
		 this.bounds = bounds;
		 this.points = points;
		 var rel = points.rel;
		 for (var i = 0; i < points.length; i++)
		 {
		 var p = points[i];
		 this.markers[i] = new CityMarker(map, p, rel, {
		 tips: this.options.tips,
		 pane: pane,
		 onClick: this.show_graph.bind(this, i)
		 });
		 }
		 this.zoom_to_bounds();
		 }
		 */
	},
	show_graph: function (data)
	{
		var map = this.map;
		var pane = this.pane;
		var graph_f = this.graph_f;
		this.destroy_graph(map);
		this.graph = new GraphMarker(data, map, graph_f, {
			pane: pane,
			tips: this.options.tips,
			onDestroy: this.graph_destroyed.bind(this, map)
		});
		this.fireEvent('graphshow',data);
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
		for (var i = 0; i < m.length; i++)
		{
			m[i].destroy(map);
		}
		this.markers = [];
		this.destroy_graph(map);
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


		var r = pt.total / b.min;
		var l = Math.log(r);
		var z = max_z - Math.round(l * 10);
		if (z < min_z)
		{
			z = min_z;
		}

		var w = Math.round((mapconf.min_radius + (l * 5)));
		w=20;
		z=30;
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
		this.setOptions(options);
		this.g = [];
		this.el = el;
	},
	set_data: function (data)
	{
		this.data = data;
		this.el.empty();
		this.build_graphs();
	},
	build_graphs: function ()
	{
		//this.build_topic_graph();
		//this.build_tag_graph();
		this.build_country_graph();
	},
	build_topic_graph: function ()
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: mapconf.graph_names[0] + ':'}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);

		var data = this.data;
		console.log(data);
		/*
		 var g_d = {
		 graph_data: pt.data,
		 graph_descs: graph_f.c,
		 graph_group: 'c'
		 };

		 this.g = new PieGraph(g_el, g_d, {
		 tips: this.options.tips
		 });
		 */

		/*
		 var data = this.data.points;

		 var c_d = {};
		 var y_d = {};

		 for (var i = 0; i < data.length; i++)
		 {
		 var d = data[i].data;
		 for (var yr in d)
		 {
		 var dd = d[yr];
		 if (!y_d[yr])
		 {
		 y_d[yr] = {};
		 }
		 for (var k = 0; k < dd.length; k++)
		 {
		 var g_g = dd[k].g
		 if (!c_d[g_g])
		 {
		 c_d[g_g] = 0;
		 }
		 if (!y_d[yr][g_g])
		 {
		 y_d[yr][g_g] = 0;
		 }
		 y_d[yr][g_g]++;
		 c_d[g_g]++;
		 }
		 }
		 }
		 var i = 0;
		 var r = [];
		 var l = [];
		 for (var pid in c_d)
		 {
		 l[i] = pid;
		 r[i] = {
		 data: c_d[pid],
		 className: 'graph-' + (i % 17)
		 };
		 i++;
		 }
		 new Chartist.Pie(pie, {
		 series: r,
		 labels: l
		 }, {showLabel: false});


		 r = [];
		 l = [];
		 i = 0;
		 for (var yr in y_d)
		 {
		 l[i] = yr;
		 r[i] = [];
		 for (var ct in y_d[yr])
		 {
		 r[i].include(y_d[yr][ct]);
		 }
		 i++;
		 }
		 new Chartist.Bar(bar, {
		 labels: l,
		 series: r
		 }, {stackBars: true});
		 */
	},
	build_tag_graph: function ()
	{
		var re = this.build_graph_head(mapconf.graph_names[1] + ':');
		var data = this.data;
		/*
		 var w = this.el;
		 var s = new Element('section', {class: 'graph-section'}).inject(w);
		 new Element('header', {html: mapconf.graph_names[1] + ':'}).inject(s);
		 var grid = new Element('div', {class: 'pure-g'}).inject(s);
		 var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		 var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		 var data = this.data.points;

		 var c_d = {};
		 var y_d = {};

		 for (var i = 0; i < data.length; i++)
		 {
		 var d = data[i].data;
		 for (var yr in d)
		 {
		 var dd = d[yr];
		 if (!y_d[yr])
		 {
		 y_d[yr] = {};
		 }
		 for (var k = 0; k < dd.length; k++)
		 {
		 var qg_g = dd[k].c;
		 for (var j = 0; j < qg_g.length; j++)
		 {
		 var g_g = qg_g[j];
		 if (!c_d[g_g])
		 {
		 c_d[g_g] = 0;
		 }
		 if (!y_d[yr][g_g])
		 {
		 y_d[yr][g_g] = 0;
		 }
		 y_d[yr][g_g]++;
		 c_d[g_g]++;
		 }

		 }
		 }
		 }
		 var i = 0;
		 var r = [];
		 var l = [];
		 for (var pid in c_d)
		 {
		 l[i] = pid;
		 r[i] = {
		 data: c_d[pid],
		 className: 'graph-' + (i % 17)
		 };
		 i++;
		 }
		 new Chartist.Pie(pie, {
		 series: r,
		 labels: l
		 }, {showLabel: false});


		 r = [];
		 l = [];
		 i = 0;
		 for (var yr in y_d)
		 {
		 l[i] = yr;
		 r[i] = [];
		 for (var ct in y_d[yr])
		 {
		 r[i].include(y_d[yr][ct]);
		 }
		 i++;
		 }
		 new Chartist.Bar(bar, {
		 labels: l,
		 series: r
		 }, {stackBars: true});
		 */
	},
	build_graph_head: function (n)
	{
		var w = this.el;
		var s = new Element('section', {class: 'graph-section'}).inject(w);
		new Element('header', {html: n}).inject(s);
		var grid = new Element('div', {class: 'pure-g'}).inject(s);
		var pie = new Element('div', {class: 'pure-u-1 pure-u-md-1-3 ct-chart'}).inject(grid);
		var bar = new Element('div', {class: 'pure-u-1 pure-u-md-2-3 ct-chart'}).inject(grid);
		return {pie: pie, bar: bar};
	},
	build_country_graph: function ()
	{
		var re = this.build_graph_head(mapconf.graph_names[2] + ':');
		var data = this.data;

		var g_d = {
			graph_data: data,
			graph_descs: countries_geo,
			graph_group: 'country'
		};


		var g = new PieGraph(re.pie, g_d, {
			tips: this.options.tips
		});
		var s_d = g.get_g_data();

		var ord = s_d.d;
		var l = [];
		var r = [];
		var c_d = DataUtil.group_by_country(data);
		var y_d = DataUtil.group_by_year(data);
		for (var yr in y_d)
		{
			l.include(yr);
		}

		for (var c = 0; c < ord.length; c++)
		{
			var grd = {data: [], className: 'graph-' + (c % 17)};
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
				if (c_y_d[l[i]])
				{
					grd.data[i] = c_y_d[l[i]].length;
				}
			}
			r[c] = grd;
		}
		console.log(r);

		new Chartist.Bar(re.bar, {
			labels: l,
			series: r
		}, {stackBars: true});
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
			}
		],
		sort_els: {
			'asc': '<i class="el el-caret-up"></i>',
			'desc': '<i class="el el-caret-down"></i>'
		}
	},
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.pagination = {
			limit: 50,
			page: 0,
			count: 0
		};


		var t = new Element('table', {class: 'pure-table pure-table-bordered pure-table-striped'}).inject(el);
		this.build_head(t);
		this.pager = new DPager(el, {onPagechanged: this.change_page.bind(this)});
		this.el = new Element('tbody').inject(t);
	},
	build_head: function (t)
	{
		var h = new Element('thead').inject(t);
		var r = new Element('tr').inject(h);
		var o = this.options;
		var ho = o.table_headers;
		var se = o.sort_els;
		for (var i = 0; i < ho.length; i++)
		{
			var th = new Element('th').inject(r);
			var e = new Element('div', {
				class: 'pure-menu pure-menu-horizontal'
			}).inject(th);
			new Element('span', {class: 'pure-menu-heading', text: ho[i].name}).inject(e);
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
		this.pagination.page = 0;
		this.pagination.count = data.length;
		this.table_data = data;
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
		var pg = this.pagination;
		var d = this.table_data;
		var min = pg.page * pg.limit;
		var max = min + pg.limit;
		var ho = this.options.table_headers;
		if (max > d.length)
		{
			max = d.length;
		}
		for (var i = min; i < max; i++)
		{
			var r = new Element('tr');
			for (var j = 0; j < ho.length; j++)
			{
				var pid = ho[j].pid;
				new Element('td', {text: d[i][pid]}).inject(r);
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
	point_graph: function ()
	{

	},
	count_arr: function (data)
	{
		var r = [];
		for (var pid in data)
		{
			r.include({pid: pid, count: data[pid].length});
		}
		return r;
	},
	get_max_len: function (data)
	{
		var max = 0;
		for (var pid in data)
		{
			var l = data[pid].length;
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
	flatten_data: function (data)
	{
		var d = [];//data
		var p = {};
		for (var i = 0; i < data.length; i++)
		{
			var dx = data[i];
			var pid = dx.s;
			if (!p[pid])
			{
				p[pid] = {s: dx.s, lat: dx.lat, lon: dx.lon, c: dx.c};
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
				}
			}
		}
		return {
			data: d,
			points: p
		}
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
		};

		this.g = new PieGraph(g_el, g_d, {
			tips: this.options.tips
		});

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
var PieGraph = new Class({
	options: {
		tips: null
	},
	Implements: [Events, Options],
	initialize: function (el, data, options)
	{
		this.data = data;
		this.setOptions(options);
		var g_data = this.mk_graph(data);
		this.g_data = g_data;

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
		this.gr = gr;
		var c_d;
		switch (gr)
		{
			case 'c':
				c_d = DataUtil.group_by_c(data.graph_data);
				break;
			case 'country':
				c_d = DataUtil.group_by_country(data.graph_data);
				break;
		}
		var s = DataUtil.count_arr(c_d);
		s.sortOn("count", Array.DESC_NUMERIC);

		var c = [];
		var d = [];
		for (var i = 0; i < s.length; i++)
		{
			c.include({data: s[i].count, className: 'graph-' + (i % 17)});
			d.include(s[i].pid);
		}
		return {g: c, d: d};
	},
	graph_bind_events: function (el)
	{
		var d = this.data.graph_descs;
		var gr = this.gr;
		var map = this.g_data.d;
		var s = el.getElements('.ct-series');
		var l = s.length;
		var l1 = l - 1;
		for (var i = 0; i < l; i++)
		{
			var j = (l1 - i);
			switch (gr)
			{
				case 'c':
					s[i].store('tip:title', d[map[j]].n);
					s[i].store('tip:text', d[map[j]].d);
					break;
				case 'country':
					s[i].store('tip:title', d[map[j]].s);
					break;
			}
		}
		this.slices = s;
		var o = this.options;
		if (o.tips !== null)
		{
			o.tips.attach(s);
		}
	}
});
var PlaceFilter = new Class({
	Implements: [Events, Options],
	initialize: function (data, filterdata, country_filters, options)
	{
		this.setOptions(options);

		this.created_filter = {years: false, countries: false, types: false, tags: false};

		var p = $('filter_pane');


		this.select_filters = ['countries', 'types', 'tags'];
		this.cc_s = 0;

		this.msg = {};

		this.data = data;
		this.p_data = [];
		this.f_data = [];
		this.f_points = [];
		this.f_filters = {};

		this.filterdata = filterdata;
		this.country_filters = country_filters;

		this.pref = [];
		this.filtered_data = [];//all filtersdata


		this.year_sel = new YearSel($$('ul.years')[0], mapconf.year_bounds, {
			onRangechanged: this.filter_years.bind(this)
		});

		this.build_selects(p);

		new FilterWin(p, {
			onTypeswitch: this.switch_data.bind(this)
		});

		this.cc_switches = $$('#city-country a');
		this.cc_switches_bind();

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
			this.switch_data(this.sel_filter);
		}
	},
	get_cc_data: function (data)
	{
		var r = [];
		var cc = this.cc_s;
		if (cc == 0)
		{
			r = data;
		}
		else
		{
			var c = {};
			for (var i = 0; i < data.length; i++)
			{
				var d = data[i];
				if (!c[d.c])
				{
					c[d.c] = countries_geo[d.c]
					c[d.c]['data'] = {};
				}
				for (var pid in d.data)
				{
					if (!c[d.c]['data'][pid])
					{
						c[d.c]['data'][pid] = [];
					}
					c[d.c]['data'][pid].append(d.data[pid]);
				}
			}
			for (var pid in c)
			{
				r.include(c[pid]);
			}
		}
		return r;
	},
	prepare_countries: function (d)
	{
		var cts = this.country_filters;
		var a = mapconf.visegrad;
		var r = {};
		for (var pid in cts)
		{
			if (a.contains(pid) || d[pid])
			{
				r[pid] = cts[pid];
			}
		}
		this.countries_prefiltered = r;
		return r;
	},
	get_msg: function ()
	{
		var m = 'All grants hosted ';
		var msgs = this.msg;
		var m_a = [];
		for (var pid in msgs)
		{
			switch (pid)
			{
				case 'years':
					m_a[1] = 'for period ' + msgs[pid];
					break;
				case 'countries':
					if (msgs[pid] == 'all')
					{
						m_a[0] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[0] = 'in ' + msgs[pid];
					}
					break;
				case 'types':
					if (msgs[pid] == 'all')
					{
						m_a[2] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[2] = 'in ' + msgs[pid];
					}
					break;
				case 'tags':
					if (msgs[pid] == 'all')
					{
						m_a[3] = 'in ' + msgs[pid] + ' ' + pid;
					}
					else
					{
						m_a[3] = 'in ' + msgs[pid];
					}
					break;
			}
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
		this.year_sel.set_data(prefiltered);
	},
	switch_data: function (i)
	{
		this.sel_filter = i;

		var s = this.selects;
		var data = this.data;
		var fd = this.filterdata[i];

		this.f_points = data[i].points;
		this.f_data = data[i].data;
		this.p_data = [];

		this.f_filters = fd;

		var dc = DataUtil.group_by_country(data[i].data);
		s['countries'].set_data(this.prepare_countries(dc));
		s['types'].set_data(fd.g);
		s['tags'].set_data(fd.c);
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
		return data.filterOn(f);
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
var SelectFilter = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (el, a, n, options)
	{
		this.created = false;
		this.setOptions(options);
		this.el = el;
		this.filter = [];
		this.els = [];
		a.addEvent('click', this.select_all.bind(this));
		n.addEvent('click', this.select_none.bind(this));
	},
	get_message: function ()
	{
		var els = this.els;
		var a = this.filter;
		var r_a = [];
		var all = true;
		var m = 'none';
		for (var pid in els)
		{
			if (a.contains(pid))
			{
				r_a.include(els[pid].get('text'));
			}
			else
			{
				all = false;
			}
		}
		if (all == true)
		{
			m = 'all'
		}
		else if (r_a.length > 0)
		{
			m = r_a.join(', ');
		}
		return m;
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
		var els = {}
		for (var pid in data)
		{
			var e = new Element('option', {
				value: pid,
				text: data[pid],
				events: {
					mousedown: this.prevent.bind(this),
					mouseup: this.prevent.bind(this),
					click: this.change_filters.bind(this, pid)
				}
			}).inject(el);
			els[pid] = e;
		}
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
		var els = this.els;
		if (els[pid].selected == true)
		{
			els[pid].selected = false;
		}
		else
		{
			els[pid].selected = true;
		}
		var tmps = [];
		for (var pid in els)
		{
			if (els[pid].selected == true)
			{
				tmps.push(pid);
			}
		}
		this.filter = tmps;
		this.select_change();
	},
	select_all: function (e)
	{
		if (e)
		{
			e.stop();
		}
		var els = this.els;
		var tmps = [];
		for (var pid in els)
		{
			els[pid].selected = true;
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
		for (var pid in els)
		{
			els[pid].selected = false;
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
	init: function ()
	{
		if (this.initiated == false)
		{
			var tips = new Tips();
			new PageScroller($$('section.page-section'));

			this.initiated = true;
			var dt = [];
			for (var i = 0; i < mapdata.length; i++)
			{
				dt[i] = DataUtil.flatten_data(mapdata[i]);
			}
			this.msg_win = new MessageWin($('filter-message'));
			this.map = new AppMap($(mapid), $('map-controls'), mapconf, {tips: tips});
			this.graph = new DGraph($('e-graphs'), {tips: tips});
			this.table = new DTable($('e-table'));

			this.filter = new PlaceFilter(dt, filters, filter_countries, {
				onFilterchanged: this.draw.bind(this)
			});
		}
	},
	draw: function (d)
	{
		this.all_data = d;
		var data = d.data;
		var message = d.message;
		var pts = d.points;
		var sel = d.sel;
		this.msg_win.set_message(message);
		this.map.draw_points(data, pts, filters[sel]);
		this.graph.set_data(data);
		this.table.set_data(data);
	}
};

window.addEvent('domready', VisegradApp.init.bind(VisegradApp));
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
		this.p_d = {
			data: {},
			max: 0
		};
		this.bounds = bounds;
		this.build_elements(bounds, el);
		this.data = [];
		this.drag = new YearDrag(el, this.vals.length, {
			onChanged: this.change_vals.bind(this)
		});
	},
	get_message: function ()
	{
		var f = this.range;
		var min = f[0];
		var max;
		var m = '';
		for (var i = 0; i < f.length; i++)
		{
			max = Number.from(f[i]);
		}
		if (min != max)
		{
			m = min + '-' + max
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
			var li = new Element('li');
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

		this.redraw_divs();

		if (this.created == false)
		{
			this.created = true;
			this.fireEvent('filtercreated');
		}
	},
	redraw_divs: function ()
	{
		var bars = this.bars;
		var vals = this.vals;
		var lim = this.limit;

		var f = [];

		var dt = this.p_d;
		var data = dt.data;
		var m = dt.max / 100;

		for (var i = 0; i < vals.length; i++)
		{
			var y = vals[i].get('text');
			var v = 0;
			var hg = 0;
			var t = '';
			if (data[y])
			{
				v = data[y].length;
			}
			if (v > 0)
			{
				hg = v / m;
				t = String.from(v);
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
		var ret = {
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
		var max = DataUtil.get_max_len(data);
		return {data: data, max: max};
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
		this.w = wrapper;
		this.sliders = sliders;

		var d = [];
		var l = sliders.length - 1;

		this.bounds = {};
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
		var w_s = wrapper.getSize();
		var divs = this.bounds.divs;

		var grid = Math.round(w_s.x / divs);
		var d = this.drags;
		var sliders = this.sliders;
		var slidersel = this.slidersel;
		var l = sliders.length - 1;

		for (var i = 0; i < d.length; i++)
		{
			var s_s = sliders[i].getSize();
			var x = Math.round(s_s.x / 2);
			var y = Math.round(s_s.y / 2);

			var s_p = (slidersel[i] * grid - x);
			sliders[i].setStyles({
				left: s_p
			});
			var min_x = 0 - x;
			var max_x = w_s.x - x;

			d[i].options.limit = {
				x: [
					min_x + (Math.round(w_s.x / divs) * i),
					max_x - Math.round(w_s.x / divs) * (l - i)
				],
				y: [
					0 - y,
					0 - y
				]
			};
			d[i].options.grid = grid;
		}
		this.bounds['x'] = {
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
				this.slidersel[0] = Math.round((p.x - b.x.min) / b.grid);
				break;
			case 1:
				this.drags[0].options.limit.x[1] = p.x - b.grid;
				this.slidersel[1] = Math.round((p.x - b.x.min) / b.grid);
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
	url: 'http://{s}.tile.stamen.com/{id}/{z}/{x}/{y}.png',
	attr: 'one',
	graph_names: ["Grant programs", "Activity fields", "Countries"],
	visegrad: ["CZ", "HU", "PL", "SK"],
	subdomains: 'a.b.c.d'.split('.'),
	map_id: 'toner',
	min_z: 5,
	max_z: 10,
	min_radius: 5,
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