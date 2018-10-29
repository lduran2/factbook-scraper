const lowAgeCountries = filterOnCol(nonHeaderRowsFrom(0), 2,
	(age) => (Number.parseFloat(age) < 20)) // filter age under 20
	.map((el, k, arr) => nameOfRowCountry(el));

const nonHeadersPopulationRows = nonHeaderRowsFrom(1);

const totalWorldPopulation = totalPopulation(nonHeadersPopulationRows);

const totalLowAgeCountryPopulation = totalPopulation(filterOnCol(nonHeadersPopulationRows, 1,
	(nameAnchor) => (lowAgeCountries.includes(nameAnchor))));

alert(totalLowAgeCountryPopulation/totalWorldPopulation);

function logging(x) {
	console.log(x);
	return x;
}

function nonHeaderRowsFrom(index) {
	return Array.from(
			document.getElementsByTagName('table')[index]
				.getElementsByTagName('tr')
		).slice(2); // first row is header
}

function filterOnCol(rows, nCol, predicate) {
	return rows.filter((el, k, arr) =>
		predicate(cellInCells(el.getElementsByTagName('td'), nCol).firstChild.nodeValue));
}

function cellInCells(cells, nCol) {
	return (nCol == 1) ? cells[nCol].firstChild : cells[nCol];
}

function nameOfRowCountry(row) {
	return row.getElementsByTagName('td')[1].firstChild.firstChild.nodeValue;
}

function totalPopulation(rows) {
	return rows.reduce((acc, el, k, arr) => (
		acc + Number.parseFloat(el.getElementsByTagName('td')[2].firstChild.nodeValue.split(',').join(''))
	), 0);
}
