var SearchBox = new Class({
	Implements: [Events, Options],
	initialize: function (points, options)
	{
		this.setOptions(options);
	},
	searched:function(p)
	{
		this.fireEvent('found', p);
	}
})
