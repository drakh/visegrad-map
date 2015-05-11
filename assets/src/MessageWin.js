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