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
