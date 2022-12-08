/* Creating a canvas and drawing a grid on it. */
let canvas =
	document.getElementById("canvas");
var anchura = canvas.width;
var altura = canvas.height;
var cd = canvas.getContext("2d");

exhibirCuadricula(20, 20, 1, "blue");

/* A function that is called when the button is clicked. */
document.getElementById("btnCalcular").addEventListener("click", calcular);
let refresh = document.getElementById('btnClean');
refresh.addEventListener('click', _ => {
	location.reload();
})
num();
function calcular() {
	var a = document.getElementById("txta").value;
	var b = document.getElementById("txtb").value;
	var c = document.getElementById("txtc").value;
	var d = document.getElementById("txtd").value;
	var e = document.getElementById("txte").value;
	var f = document.getElementById("txtf").value;
	var x1 = document.getElementById("txtx1").value;
	var x2 = document.getElementById("txtx2").value;
	var x3 = document.getElementById("txtx3").value;
	var x4 = document.getElementById("txtx4").value;

	var arr = new Array(2);
	calcularY1Y2(a, b, c, x1, x2, arr);
	document.getElementById("res").innerHTML = "(y1,y2)=(" + arr[0] + "," + arr[1] + ")";

	var arr2 = new Array(2);
	calcularY3Y4(d, e, f, x3, x4, arr2);
	document.getElementById("res2").innerHTML = "(y3,y4)=(" + arr2[0] + "," + arr2[1] + ")";

	var arrxy = new Array(2);
	s2el(a, b, c, d, e, f, arrxy);
	document.getElementById("res3").innerHTML = "(" + arrxy[0] + "," + arrxy[1] + ")";


	/**
	 * It draws a line between two points on a canvas.
	 * @param arrxy - the array that will hold the x and y values of the intersection point
	 */
	function puntito(arrxy) {
		cd.beginPath();
		cd.arc(arrxy[0] * 20 + anchura / 2, -1 * (arrxy[1] * 20 - altura / 2), 4, 0, 2 * Math.PI);
		cd.fillStyle = "Red";
		cd.fillText(("(" + arrxy[0] + "," + arrxy[1] + ")"), arrxy[0] * 20 + anchura / 2 + 15, -1 * (arrxy[1] * 20 - altura / 2));
		cd.fill();
		cd.stroke();
	}

	pintar(x1, arr[0], x2, arr[1], "Black");
	pinta2s(x3, arr2[0], x4, arr2[1], "Green");
	function pintar(px1, py1, px2, py2, color) {
		cd.beginPath();
		px_1 = px1 * 20 + anchura / 2;
		py_1 = -1 * (py1 * 20 - altura / 2);
		px_2 = px2 * 20 + anchura / 2;
		py_2 = -1 * (py2 * 20 - altura / 2);
		cd.fillText((a + "X" + "+" + b + "Y" + "=" + c), px_2, py_2);
		cd.moveTo(px_1, py_1);
		cd.lineTo(px_2, py_2);
		cd.strokeStyle = color;
		cd.fill();
		cd.closePath();
		cd.stroke();
	}
	function pinta2s(px1, py1, px2, py2, color) {
		cd.beginPath();
		px_1 = px1 * 20 + anchura / 2;
		py_1 = -1 * (py1 * 20 - altura / 2);
		px_2 = px2 * 20 + anchura / 2;
		py_2 = -1 * (py2 * 20 - altura / 2);
		cd.fillText((d + "X" + "+" + e + "Y" + "=" + f), px_2, py_2);
		cd.moveTo(px_1, py_1);
		cd.lineTo(px_2, py_2);
		cd.strokeStyle = color;
		cd.fill();
		cd.closePath();
		cd.stroke();
	}
	puntito(arrxy);
}

function calcularY1Y2(a, b, c, x1, x2, arr) {
	arr[0] = (c - a * x1) / b;
	arr[1] = (c - a * x2) / b;
}
function calcularY3Y4(d, e, f, x3, x4, arr2) {
	arr2[0] = (f - d * x3) / e;
	arr2[1] = (f - d * x4) / e;
}

function exhibirCuadricula(xnumpix_um, ynumpix_um, ancholinea, color) {
	cd.beginPath();
	cd.strokeStyle = color;
	cd.lineWidth = ancholinea;
	for (i = 0; i < anchura; i++) {
		cd.moveTo(0, 0 + i * xnumpix_um);
		cd.lineTo(anchura, 0 + i * xnumpix_um);
	}
	for (i = 0; i < altura; i++) {
		cd.moveTo(0 + i * ynumpix_um, 0);
		cd.lineTo(0 + i * ynumpix_um, altura);
	}
	cd.stroke();
	cd.beginPath();
	cd.strokeStyle = "Black";
	cd.lineWidth = 2;
	cd.moveTo(anchura / 2, 0); //vertical
	cd.lineTo(anchura / 2, altura); //vertical
	cd.moveTo(0, altura / 2); //horizontal
	cd.lineTo(anchura, altura / 2); //horizontal
	cd.stroke();
}

function s2el(a, b, c, d, e, f, arrxy) {
	arrxy[1] = (a * f - d * c) / (a * e - d * b);  //valor x1
	arrxy[0] = (c - b * arrxy[1]) / a;  //valor x2
}
var arrxy = new Array(2);

function num() {
	cd.beginPath();
	cd.font = "9px Calibri";
	for (i = 0; i < altura / 2; i++) {
		cd.strokeText(i - 10, anchura / 2 - 10, altura - i * 20);
	}
	for (i = 0; i < anchura / 2; i++) {
		cd.strokeText((i - 20) * -1, anchura - i * 20, altura / 2 + 10);
	}
}
