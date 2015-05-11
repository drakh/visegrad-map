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