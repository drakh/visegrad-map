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