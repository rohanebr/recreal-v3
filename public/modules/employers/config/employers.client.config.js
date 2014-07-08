'use strict';

// Configuring the Articles module
angular.module('employers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Employers', 'employers', 'dropdown', '/employers(/create)?');
		Menus.addSubMenuItem('topbar', 'employers', 'List Employers', 'employers');
		Menus.addSubMenuItem('topbar', 'employers', 'New Employer', 'employers/create');
	}
]);