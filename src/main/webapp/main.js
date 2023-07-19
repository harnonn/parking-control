
/**
 * http://localhost:8080/parking-spot GET - loadAllSpots
 * http://localhost:8080/parking-spot POST - saveNewSpot
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function doGet(url){
	let request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send();
	return request.responseText;
}

function doDelete(url){
	let request = new XMLHttpRequest();
	request.open("DELETE", url, true);
	request.send();
	return request;
}

function doPost(url, body) {
	let request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify(body));
	
	return request;	
}

function doPut(url, body) {
	let request = new XMLHttpRequest();
	request.open("PUT", url, true);
	request.setRequestHeader("Content-type", "application/json");
	request.send(JSON.stringify(body));
	
	return request;	
}

function createRow(spot) {
	let row = document.createElement("tr");
	
	row.appendChild(createColumn(spot.parkingSpotNumber));
	row.appendChild(createColumn(spot.licensePlateCar));
	row.appendChild(createColumn(spot.brandCar));
	row.appendChild(createColumn(spot.modelCar));
	row.appendChild(createColumn(spot.colorCar));
	row.appendChild(createColumn(spot.registrationDate));
	row.appendChild(createColumn(spot.responsibleName));
	row.appendChild(createColumn(spot.apartment));
	row.appendChild(createColumn(spot.block));
	
	let tdActions = document.createElement("td");
	
	let editLink = document.createElement("a");
	editLink.innerHTML = "Edit";
	editLink.setAttribute('href', '#');
	editLink.onclick = function() { editSpot(spot.id); };
	tdActions.appendChild(editLink);
	
	let span = document.createElement("span");
	span.innerHTML = " - ";
	tdActions.appendChild(span);
	
	let deleteLink = document.createElement("a");
	deleteLink.innerHTML = "Del";
	deleteLink.setAttribute('href', '#');
	deleteLink.onclick = function() { deleteSpot(spot.id); };
	tdActions.appendChild(deleteLink);
	
	row.appendChild(tdActions);
	return row;
}

function createColumn(value) {
	let td = document.createElement("td");
	td.innerHTML = value;
	return td;
}

function saveSpot() {

	let id = document.getElementById('input-id').value;
	let spot = document.getElementById('input-spot').value;
	let plate = document.getElementById('input-plate').value;
	let brand = document.getElementById('input-brand').value;
	let model = document.getElementById('input-model').value;
	let color = document.getElementById('input-color').value;
	let responsible = document.getElementById('input-responsible').value;
	let appartment = document.getElementById('input-appartment').value;
	let block = document.getElementById('input-block').value;
		
	body = {
		'parkingSpotNumber' : spot,
		'licensePlateCar' : plate,
		'brandCar' : brand,
		'modelCar' : model,
		'colorCar' : color,
		'responsibleName' :responsible,
		'apartment' :appartment,
		'block' : block
	}
	let request;
	if (!id) {
		request = doPost('http://localhost:8080/parking-spot', body);
	} else {
		request = doPut('http://localhost:8080/parking-spot/'+id, body);
	}
	
	request.onload = function() {
//		console.log(request);
		if (request.status == 200 || request.status == 201) {
			alert('Parking spot saved succesfully');
			loadSpots();
		} else {
			alert(request.responseText);
		}
	}
}

function loadSpots(){
	let data = doGet('http://localhost:8080/parking-spot');
	let spots = JSON.parse(data);
	let tabelaSpots =  document.getElementById("table-spots");
	var tabelaSpotsRows = document.createElement('tbody');
	
	spots.content.forEach(element => {
		let row = createRow(element);
		tabelaSpotsRows.appendChild(row);
	});
	
	let tableSpotsBody = tabelaSpots.getElementsByTagName('tbody')[0];
	tableSpotsBody.parentNode.replaceChild(tabelaSpotsRows, tableSpotsBody);
}

function editSpot(spotId) {
	let data = doGet('http://localhost:8080/parking-spot/'+spotId);
	let spot = JSON.parse(data);

	document.getElementById('input-id').value = spot.id;
	document.getElementById('input-spot').value = spot.parkingSpotNumber;
	document.getElementById('input-plate').value = spot.licensePlateCar;
	document.getElementById('input-brand').value = spot.brandCar;
	document.getElementById('input-model').value = spot.modelCar;
	document.getElementById('input-color').value = spot.colorCar;
	document.getElementById('input-responsible').value = spot.responsibleName;
	document.getElementById('input-appartment').value = spot.apartment;
	document.getElementById('input-block').value = spot.block;
}

function clearTable(){
	let tableSpotsBody =  document.getElementById("table-spots").getElementsByTagName('tbody')[0];
	let new_tbody = document.createElement('tbody');
	console.log(tableSpotsBody.parentNode);
	
	tableSpotsBody.parentNode.replaceChild(new_tbody, tableSpotsBody);
}

function deleteSpot(spotId) {
	if (confirm("Delete a spot can not be undone!")) {
		let request = doDelete('http://localhost:8080/parking-spot/'+spotId);
		request.onload = function() {
			alert(request.responseText);
			loadSpots();
		}
	}
}

loadSpots();
