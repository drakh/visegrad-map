var PieGraph = new Class({
	options: {
		tips: null
	},
	Implements: [Events, Options],
	initialize: function (el, data, options)
	{
		this.data = data;
		this.setOptions(options);
		console.log(data);
		/*
		var g = new Chartist.Pie(el,
			{
				series: this.mk_graph()
			},
			{
				donut: true,
				donutWidth: 50,
				showLabel: false
			});
		g.on('created', this.graph_bind_events.bind(this, el));
		*/
	},
	mk_graph: function ()
	{

	},
	graph_bind_events: function ()
	{

	}
});