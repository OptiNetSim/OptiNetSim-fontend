import httpInstance from "@/utils/request";

export function createNewElementAPI(network_id, params) {
	return httpInstance({
		url: '/api/networks/' + network_id + '/elements',
		method: 'POST',
		data: params
	});
}

export function updateElementAPI(network_id, element_id, params) {
	return httpInstance({
		url: '/api/networks/' + network_id + '/elements/' + element_id,
		method: 'PUT',
		data: params
	});
}

export function deleteElementAPI(network_id, element_id) {
	return httpInstance({
		url: '/api/networks/' + network_id + '/elements/' + element_id,
		method: 'DELETE'
	});
}

export function createNewConnectionAPI(network_id, params) {
	return httpInstance({
		url: '/api/networks/' + network_id + '/connections',
		method: 'POST',
		data: params
	});
}

export function updateConnectionAPI(network_id, connection_id, params) {
	return httpInstance({
		url: '/api/networks/' + network_id + '/connections/' + connection_id,
		method: 'PUT',
		data: params
	});
}

export function deleteConnectionAPI(network_id, connection_id) {
	return httpInstance({
		url: '/api/networks/' + network_id + '/connections/' + connection_id,
		method: 'DELETE'
	});
}