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
		//this.head_el = el.getParent().getElement('header');
		this.bounds = bounds;
		this.build_elements(bounds, el);
		this.data = [];
		this.drag = new YearDrag(el, this.vals.length, {
			onChanged: this.change_vals.bind(this)
		});
	},
	set_header: function (t)
	{
		//this.head_el.getFirst().set('text', t);
	},
	set_header_count: function (c)
	{
                this.head_el.getLast().set('text', c.format());
                
                // this hides/shows the below content if 0 items selected and fires scroll (won't help to properly handle scrolling arrows)
                if (c == 0) {
                        $('e-table').hide();
                        $('e-graphs').hide();
                } else {
                        //$('e-table').show();
                        //$('e-graphs').show();
                }
                $$('body').fireEvent('scroll');
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

		this.set_header_count(this.p_d.count);
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
		var count = DataUtil.count_arr(data, 0).total;
		return {data: data, max: max, count: count};
	}
});
