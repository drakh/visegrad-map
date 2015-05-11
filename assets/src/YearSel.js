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
		var m;
		for (pid in f)
		{
			max = f[pid];
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
		this.data = data;
		this.p_d = this.prepare_data(data);
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
		var f = {};
		var dt = this.p_d;

		var m = dt.max / 100;
		var yr = 0;

		for (var i = 0; i < vals.length; i++)
		{
			var y = vals[i].get('text');
			if (dt.data[y])
			{
				var hg = (dt.data[y] / m);
				bars[i].set('text', dt.data[y]).setStyles(
					{height: hg + '%'}
				);
			}
			else
			{
				bars[i].set('text', '');
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
		var dt = {};
		var max = 0;
		for (var i = 0; i < data.length; i++)
		{
			var d = data[i];
			for (var pid in d.data)
			{
				var dx = d.data[pid];
				if (!dt[pid])
				{
					dt[pid] = 0;
				}
				for (var j = 0; j < dx.length; j++)
				{
					dt[pid]++;
					if (dt[pid] > max)
					{
						max = dt[pid];
					}
				}
			}
		}
		var r = {
			data: dt,
			max: max
		};
		return r;
	}
});