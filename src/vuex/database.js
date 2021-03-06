/**
 * Created by w3shy on 12/6/16.
 *
 * uses WebStorage to act as a data persistence layer for Zushar
 */

import Store from 'store'

/*
* @desc
*   Create a Form by appending it to the list of forms in localStorage
* @return
*   Array/Objects (list of forms)
* */
export function saveForm(form) {
	let Forms = Store.get('forms');
	Forms = Forms.concat(form);
	Store.set('forms', Forms);
	return Forms;
}

/*
 * @desc
 *   Get list of all saved Forms
 * @return
 *   Array/Objects (list of forms)
 * */
export function getForms() {
	return Store.get('forms');
}

/*
 * @desc
 *   Get a single form
 * @return
 *   Object
 * */
export function getForm(id) {
	let Forms = Store.get('forms');
	return Forms[_.findIndex(Forms, ['id', id])];
}

/*
 * @desc
 *   Update a single form
 * @return
 *   Array/Objects (list of forms with the updated form)
 * */
export function updateForm(id, Form) {
	let Forms = Store.get('forms');
	Forms = Forms.map(form => {
		if (form.id === id) {
			return Form;
		}
		return form;
	});
	// add the form changes to local database
	Store.set('forms', Forms);
	return Forms;
}

/*
 * @desc
 *   Remove a form from the list of forms
 * @return
 *   Array/Objects (list of forms minus the deleted form)
 * */
export function removeForm(id) {
	let Forms = Store.get('forms');
	Forms = Forms.filter(form => (form.id !== id));
	Store.set('forms', Forms);
	return Forms;
}

export function clearForms(id) {
	Store.set('forms', []);
	return true;
}

/*
* @collection: `questions`
* @desc
*	this is a temporary storage for the questions in the workspace to avoid loosing unsaved work
* */ 
export function saveWorkspace(form) {
	Store.set('workspace', form);
	return form;
}

export function retrieveWorkspace() {
	return Store.get('workspace');
}

export function clearWorkspace() {
	Store.set('workspace', {});
	return true;
}

/*
* @desc
*   check whether forms and questions keys have been created
* */
export const hasDbInstance = () => {
	return {
		workspace: !_.isNil(Store.get('workspace')),
		forms: !_.isNil(Store.get('forms'))
	}
};


(function () {
	'use strict';
	
	/*
	* Create Database instance on Web Storage
	* */
	if (!hasDbInstance().workspace) {
		Store.set('workspace', {});
	}
	if (!hasDbInstance().forms) {
		Store.set('forms', []);
	}

})();