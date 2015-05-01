var mapconf = {
	url: 'http://{s}.tile.stamen.com/{id}/{z}/{x}/{y}.png',
	attr: 'one',
	subdomains: 'a.b.c.d'.split('.'),
	map_id: 'toner',
	min_z: 0,
	max_z: 13,
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
	]
};
var mapid = 'map-main';

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
				/*disabled for now*/
				/*
				 mouseenter: this.to_front.bind(this),
				 mouseleave: this.to_back.bind(this),
				 */
				click: this.fire_click.bind(this, map, pane)
			}
		}).inject(pane);

		var g_el = new Element('div', {
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

var GraphMarker = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (pt, map, pane, tips, options)
	{
		this.setOptions(options);
		this.tips = tips;
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
		}).inject(pane);

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
		var g = new Chartist.Pie(g_el, {
			series: this.mk_graph(pt)
		}, {
			donut: true,
			donutWidth: 50,
			showLabel: false
		});
		g.on('created', this.graph_bind_events.bind(this, g_el));

		new Element('div',
			{
				html: '<div><header>' + pt.s + '</header></div><div>' + pt.total + '</div>',
				class: 'graph-inner',
				events: {
					click: this.destroy.bind(this, map)
				}
			}).inject(el);
		this.pt = pt;
		this.g = g;


		this.el = el;
		this.reposition(map);

		map.on('zoomstart', this.before_zoom.bind(this));
		map.on('zoomend', this.reposition.bind(this, map));
	},
	graph_bind_events: function (el, d)
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
			s[i].store('tip:text', this.g_data[j].t + ': ' + this.g_data[j].v);
		}
		this.slices = s;
		this.tips.attach(s);
	},
	show_tooltip: function (i)
	{
		this.tips.show();
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
		var d = {};
		for (var pid in p.data)
		{
			var a = p.data[pid];
			for (var i = 0; i < a.length; i++)
			{
				var dt = a[i];
				if (d[dt.name])
				{
					d[dt.name] += dt.amount;
				}
				else
				{
					d[dt.name] = dt.amount;
				}
			}
		}
		var g_data = [];
		var r = [];
		var i = 0;
		for (var pid in d)
		{
			g_data[i] = {
				v: d[pid],
				t: pid
			};

			r[i] = {
				data: d[pid],
				className: 'graph-' + (i % 17)
			};
			i++
		}
		this.g_data = g_data;
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
		var ps = map.latLngToLayerPoint([
			this.pt.lat,
			this.pt.lon
		]);

		this.el.setStyles({
			display: 'block',
			transform: 'translate3d(' + ps.x + 'px, ' + ps.y + 'px, 0px)'
		});

	},
	destroy: function (map)
	{
		this.tips.detach(this.slices);
		this.g.detach();
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


var Map = new Class({
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
	draw_points: function (data)
	{

		var points = data.points;
		var bounds = data.bounds;
		var pane = this.pane;
		var map = this.map;
		var tips = this.tips;
		this.map.options.minZoom = 0;
		var z = this.map.getBoundsZoom(bounds);
		this.map.setMaxBounds(bounds);

		this.map.options.minZoom = z;
		this.bounds = bounds;
		this.points = points;
		this.remove_markers();

		for (var i = 0; i < points.length; i++)
		{
			var p = points[i];
			this.markers[i] = new CityMarker(map, p, pane, points.rel, tips, {onClick: this.show_graph.bind(this, i)});
		}
		this.zoom_to_bounds();
	},
	show_graph: function (i)
	{
		var points = this.points;
		var map = this.map;
		var pane = this.pane;
		var map = this.map;
		var tips = this.tips;
		this.destroy_graph(map);
		this.graph = new GraphMarker(points[i], map, pane, tips, {onDestroy: this.graph_destroyed.bind(this, map)});
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

var YearSlider = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (wrapper, sliders, divs, options)
	{
		this.setOptions(options);
		var w_s = wrapper.getSize();
		var d = [];
		var l = sliders.length - 1;
		this.w = wrapper;
		this.bounds = {};
		this.bounds['divs'] = divs;

		for (var i = 0; i < l + 1; i++)
		{
			var s_s = sliders[i].getSize();
			var x = Math.round(s_s.x / 2);
			var y = Math.round(s_s.y / 2);
			sliders[i].setStyles({
				left: ((i * w_s.x) - x)
			});
			var min_x = 0 - x;
			var max_x = w_s.x - x;
			var grid = Math.round(w_s.x / divs);
			d[i] = new Drag(sliders[i], {
				limit: {
					x: [
						min_x + (Math.round(w_s.x / divs) * i),
						max_x - Math.round(w_s.x / divs) * (l - i)
					],
					y: [
						0 - y,
						0 - y
					]
				},
				grid: grid,
				onComplete: this.snap.bind(this, i)
			});
		}
		this.bounds['x'] = {
			min: min_x,
			max: max_x
		};
		this.bounds['grid'] = grid;
		this.drags = d;

		this.slidersel = {
			min: 0,
			max: divs
		}
		this.chng();
	},
	snap: function (i, el)
	{
		var b = this.bounds;
		var p = el.getPosition(this.w);
		switch (i)
		{
			case 0:
				this.drags[1].options.limit.x[0] = p.x + b.grid;
				this.slidersel.min = Math.round((p.x - b.x.min) / b.grid);
				break;
			case 1:
				this.drags[0].options.limit.x[1] = p.x - b.grid;
				this.slidersel.max = Math.round((p.x - b.x.min) / b.grid);
				break;
		}
		this.chng();
	},
	chng: function ()
	{
		this.fireEvent('changed', this.slidersel);
	}
});

var YearSel = new Class({
	Implements: [
		Events,
		Options
	],

	initialize: function (el, options)
	{
		this.setOptions(options);
		this.bars = el.getElements('.year-container div');
		this.vals = el.getElements('div.year-val');
		this.data = [];
		this.drag = new YearDrag(el, this.vals.length, {
			onChanged: this.change_vals.bind(this)
		});
	},
	set_data: function (data)
	{
		this.data = data;
		this.redraw_divs(data);
	},
	redraw_divs: function (data)
	{
		var bars = this.bars;
		var vals = this.vals;
		var lim = this.limit;
		var f = {};
		var dt = this.prepare_data(data);

		var m = dt.max / 100;
		var yr = 0;
		for (var i = 0; i < vals.length; i++)
		{
			var y = vals[i].get('text');
			if (dt.data[y])
			{
				bars[i].set('text', dt.data[y]).setStyles(
					{height: (dt.data[y] / m) + '%'}
				);
			}
			else
			{
				bars[i].setStyles({'height': 0});
			}
			if (i >= lim.min && i < lim.max)
			{
				bars[i].addClass('sel');
				f[yr] = y;
				yr++;
			}
			else
			{
				bars[i].removeClass('sel');
			}
		}
		this.fireEvent('rangechanged', f);
	},
	change_vals: function (d)
	{
		this.limit = d;
		this.redraw_divs(this.data);
	},
	prepare_data: function (data)
	{
		var dt = {};
		var max = 0;
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			for (var pid in d.data)
			{
				var dx = d.data[pid];
				for (var j = 0; j < dx.length; j++)
				{
					if (dt[pid])
					{
						dt[pid] += dx[j].amount;
					}
					else
					{
						dt[pid] = dx[j].amount;
					}
					if (dt[pid] > max)
					{
						max = dt[pid];
					}
				}
			}
		}
		return {
			data: dt,
			max: max
		};
	}
});

var FilterWin = new Class({
	Implements: [Events, Options],
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
		console.log('switch: ' + i);
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
var SelectFilter = new Class({
	Implements: [Events, Options],
	initialize: function (el, options)
	{
		this.setOptions(options);
		this.el = el;
		this.filter = [];
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
				events: {click: this.change_filters.bind(this)}
			}).inject(el);
			els[pid] = e;
		}
		this.els = els;
	},
	change_filters: function ()
	{
		var els = this.els;
		var tmps = [];
		for (var pid in els)
		{
			if (els[pid].selected == true)
			{
				tmps.push(pid);
			}
		}
		this.filter = tmps;
	},
	select_all: function ()
	{
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
	select_none: function ()
	{
		for (var pid in els)
		{
			els[pid].selected = false;
			tmps.push(pid);
		}
		this.filter = [];
		this.select_change();
	},
	select_change: function ()
	{
		this.fireEvent('filterchange', {filter: this.filter});
	}
})
var PlaceFilter = new Class({
	Implements: [
		Events,
		Options
	],
	initialize: function (data, filterdata, country_filters, options)
	{
		this.setOptions(options);

		this.select_filters = ['countries', 'types', 'tags'];

		this.data = data;//all points data
		this.filterdata = filterdata;
		this.country_filters = country_filters;

		this.filtered_data = [];//all filtersdata
		/*
		 this.year_sel = new YearSel($$('ul.years')[0], {
		 onRangechanged: this.filter_years.bind(this)
		 });
		 */
		var p = $('filter_pane');
		this.build_selects(p);

		/*
		 new FilterWin(p, {
		 onTypeswitch: this.switch_data.bind(this)
		 });
		 */

		//this.filter();
	},
	build_selects: function (el)
	{
		var s = el.getElements('select');
		var d = this.select_filters;
		var selects = {}
		for (var i = 0; i < s.length; i++)
		{
			selects[d[i]] = new SelectFilter(s[i]);
			if (d[i] == 'countries')
			{
				selects[d[i]].set_data(this.country_filters);
			}
		}
		this.selects = selects;

	},
	switch_data: function (i)
	{
		this.filter_sel = i;//current filter - GRANTS, SCHOLARSHIPS, RESIDENCES
		this.filtered_data = this.data[i];
		this.filtered_filters = this.filterdata[i];
		//this.year_sel.set_data(this.filtered_data);
	},
	filter_years: function (yrs)
	{
		var f = {};
		for (var pid in yrs)
		{
			f[yrs[pid]] = true;
		}
		this.year_range = f;
		this.filter();
	},

	prepare_data: function (points)
	{
		var yrs = this.year_range;
		var b = [];
		var min = null;
		var max = null;
		var fpts = [];
		var f = 0;
		for (var i = 0; i < points.length; i++)
		{

			var p = points[i];
			var s = 0;
			for (var pid in p.data)
			{
				var d = p.data[pid];
				for (var j = 0; j < d.length; j++)
				{
					if (yrs[pid])
					{
						s += d[j].amount;
					}
				}
			}
			if (s > 0)
			{
				b[f] = [
					p.lat,
					p.lon
				];
				p['total'] = s;
				fpts[f] = p;
				f++;
				if (min === null)
				{
					min = s;
				}
				else if (min > s)
				{
					min = s
				}
				if (max === null)
				{
					max = s;
				}
				else if (s > max)
				{
					max = s;
				}
			}
		}
		fpts['rel'] = {
			min: min,
			max: max
		};

		var bounds = L.latLngBounds(b);

		var data = {
			points: fpts,
			bounds: bounds
		};
		return data;
	},
	filter: function ()
	{
		var data = this.prepare_data(this.filtered_data);
		this.fireEvent('filterchanged', data);
	}
});

var App = {
	init: function ()
	{
		var tips = new Tips();
		this.map = new Map($(mapid), $('map-controls'), tips);
		//this.table=new DTable();
		this.filter = new PlaceFilter(mapdata, filters, filter_countries, {
			onFilterchanged: this.draw.bind(this)
		});
	},
	draw: function (data)
	{
		//this.map.draw_points(data);
		//this.table.fill(data);
	}
};

window.addEvent('domready', App.init.bind(App));
