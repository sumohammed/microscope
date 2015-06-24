Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('postInsert', post, function(error, result) {
			//dispay the error to the user and abort
			if (error)
				return throwError(error.reason);

			// show this result but route anyway
			if (result.postExists)
				throwError('This link has been already posted');

			Router.go('postPage', {_id: result._id});
		});
	}
});