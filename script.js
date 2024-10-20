let pens = new Decimal("0");
let byClick = new Decimal("1");
let up1amt = new Decimal("0");
let formLvl = 1;
let formX = 1;

class Building {
	constructor(amount, basePrice, n, priceIncreasePerN, basePps, ppsIncreasePerN, priceIncrease) {
		this.amount = amount
		this.basePrice = basePrice;
		this.n = n;
		this.priceIncreasePerN = priceIncreasePerN;
		this.basePps = basePps;
		this.ppsIncreasePerN = ppsIncreasePerN;
		this.priceIncrease = priceIncrease
	}
	buy() {
		let cost = (this.basePrice.mul(this.priceIncrease.pow((this.amount)))).mul(this.priceIncreasePerN.pow((this.amount).div(this.n).floor()));
		//console.log((this.basePrice.mul(new Decimal("1.07").pow((this.amount)))).mul(this.priceIncreasePerN.pow((this.amount).div(this.n).floor())));
		if(pens.gte(cost)) {                                   //checks that the player can afford the cursor
			pens = pens.sub(cost); 
			this.amount = this.amount.add(1);                         //removes the cookies spent
		};
	}
	pps(){
		return this.basePps.mul(this.amount).mul(this.ppsIncreasePerN.pow(this.amount.div(this.n).floor()));
	}
	ppms(){
		return (this.basePps.mul(this.amount).mul(this.ppsIncreasePerN.pow(this.amount.div(this.n).floor()))).div(new Decimal("1000"));
	}
	price() {
		return (this.basePrice.mul(this.priceIncrease.pow(this.amount))).mul(this.priceIncreasePerN.pow((this.amount).div(this.n).floor()));
	}
	setAmt(amt) {
		this.amount = new Decimal(amt);
	}
}

let bil1 = new Building(new Decimal("0"), new Decimal("15"), new Decimal("10"), new Decimal("2.1"), new Decimal("0.1"), new Decimal("2"), new Decimal("1.15"))
let bil2 = new Building(new Decimal("0"), new Decimal("100"), new Decimal("10"), new Decimal("2.1"), new Decimal("1"), new Decimal("2"), new Decimal("1.15"))
let bil3 = new Building(new Decimal("0"), new Decimal("1000"), new Decimal("10"), new Decimal("2.1"), new Decimal("8"), new Decimal("2"), new Decimal("1.15"))
let bilp1 = new Building(new Decimal("0"), new Decimal("10"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp2 = new Building(new Decimal("0"), new Decimal("100"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp3 = new Building(new Decimal("0"), new Decimal("1000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))

function getHash(str, algo = "SHA-512") {
	let strBuf = new TextEncoder().encode(str);
	const hashArray = Array.from(new Uint8Array(strBuf)); // convert buffer to byte array
  	const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  	return hashHex;
  }

function mainBtnClick() {
	pens = pens.add(byClick);
}

function clickUpgrade() {
	let cost = new Decimal(new Decimal("1.15").pow(formX));
	if(pens.gte(cost)) {
		pens = pens.sub(cost);
		formX = formX + 0.1; 
		if(formLvl === 1) {
			byClick = new Decimal(formX);
		} else if (formLvl === 2) {
			byClick = new Decimal(bil1.amount.div("10").add("1").mul(formX));
		}
	}
}

function formUpgrade() {
	let cost = new Decimal(new Decimal("1000").pow(new Decimal(formLvl)));
	if(pens.gte(cost) && formLvl < 2) {
		pens = pens.sub(cost);
		formLvl = formLvl + 1;
	}
}

function getForm(lvl) {
	if (lvl === 1) {
		return "ручки за клик = уровень клика";
	} else if (lvl === 2) {
		return "ручки за клик = (кол-во рук / 10 + 1) * уровень клика";
	}
}

function swMain() {
	document.getElementsByClassName("main")[0].style.display = "block";
	document.getElementsByClassName("saving")[0].style.display = "none";
	document.getElementsByClassName("upgrade")[0].style.display = "none";
}

function swSaving() {
	document.getElementsByClassName("main")[0].style.display = "none";
	document.getElementsByClassName("saving")[0].style.display = "block";
	document.getElementsByClassName("upgrade")[0].style.display = "none";
}

function swUpgrade() {
	document.getElementsByClassName("main")[0].style.display = "none";
	document.getElementsByClassName("saving")[0].style.display = "none";
	document.getElementsByClassName("upgrade")[0].style.display = "block";
}

function up1() {
	let cost = new Decimal(10).pow(up1amt.add(new Decimal(1)));
	if(pens.gte(cost)) {    
		pens = pens.sub(cost); 
		up1amt = up1amt.add(1);                         
	};
}

let savegame = JSON.parse(localStorage.getItem("save"));
if (savegame.chksum === getHash(JSON.stringify(savegame.pens + savegame.bil1amt + savegame.bil2amt + savegame.bil3amt + savegame.bilp1amt + savegame.bilp2amt + savegame.bilp3amt + savegame.formLvl + savegame.formX))) {
	if (typeof savegame?.pens !== ("undefined" || "null")) {pens = new Decimal(savegame.pens)};
	if (typeof savegame?.bil1amt !== ("undefined" || "null")) {bil1.setAmt(new Decimal(savegame.bil1amt))};
	if (typeof savegame?.bil2amt !== ("undefined" || "null")) {bil2.setAmt(new Decimal(savegame.bil2amt))};
	if (typeof savegame?.bil3amt !== ("undefined" || "null")) {bil3.setAmt(new Decimal(savegame.bil3amt))};
	if (typeof savegame?.bilp1amt !== ("undefined" || "null")) {bilp1.setAmt(new Decimal(savegame.bilp1amt))};
	if (typeof savegame?.bilp2amt !== ("undefined" || "null")) {bilp2.setAmt(new Decimal(savegame.bilp2amt))};
	if (typeof savegame?.bilp3amt !== ("undefined" || "null")) {bilp3.setAmt(new Decimal(savegame.bilp3amt))};
	if (typeof savegame?.formLvl !== ("undefined" || "null")) {formLvl = savegame.formLvl};
	if (typeof savegame?.formX !== ("undefined" || "null")) {formX = savegame.formX};
}

function updateGame(delta_time, total_time) {
	pens = pens.add(bil1.ppms().mul(delta_time).add(bil2.ppms().mul(delta_time).add(bil3.ppms().mul(new Decimal(2).pow(up1amt)).mul(delta_time))));
	pps = bil1.pps().add(bil2.pps().add(bil3.pps())).mul(new Decimal(2).pow(up1amt));
	document.getElementById('mainCnt').innerHTML = pens.toFixed(3);
	document.getElementById('mainPs').innerHTML = pps.toFixed(4);
	document.getElementById('am1').innerHTML = bil1.amount.toFixed(3);
	document.getElementById('pr1').innerHTML = bil1.price().round();
	document.getElementById('am2').innerHTML = bil2.amount.toFixed(3);
	document.getElementById('pr2').innerHTML = bil2.price().round();
	document.getElementById('am3').innerHTML = bil3.amount.toFixed(3);
	document.getElementById('pr3').innerHTML = bil3.price().round();
	bil1.setAmt(bil1.amount.add(bilp1.ppms().mul(delta_time)));
	document.getElementById('amp1').innerHTML = bilp1.amount.toFixed(0);
	document.getElementById('prp1').innerHTML = bilp1.price().round();
	bil2.setAmt(bil2.amount.add(bilp2.ppms().mul(delta_time)));
	document.getElementById('amp2').innerHTML = bilp2.amount.toFixed(0);
	document.getElementById('prp2').innerHTML = bilp2.price().round();
	bil3.setAmt(bil3.amount.add(bilp3.ppms().mul(delta_time)));
	document.getElementById('amp3').innerHTML = bilp3.amount.toFixed(0);
	document.getElementById('prp3').innerHTML = bilp3.price().round();
	document.getElementById('clickLvl').innerHTML = formX.toFixed(1);
	document.getElementById('clickLvlp').innerHTML = new Decimal(new Decimal("1.15").pow(formX)).toFixed(1);
	document.getElementById('formul').innerHTML = getForm(formLvl);
	document.getElementById('formulLvl').innerHTML = formLvl.toFixed(0);
	if (formLvl < 2) {
		document.getElementById("formulLvlp").innerHTML = new Decimal(new Decimal("1000").pow(new Decimal(formLvl)));
	} else {
		document.getElementById("formu1").innerHTML = "";
		document.getElementById("formu2").innerHTML = "";
	}
	document.getElementById('up1amt').innerHTML = up1amt.toFixed(0);
	document.getElementById('up1pr').innerHTML = new Decimal(10).pow(up1amt.add(new Decimal(1))).toFixed(0);
}

let last_time = null;
let total_time = 0;
setInterval(function gameLoop() {
  const current_time = performance.now();
  if (last_time === null) last_time = current_time;
  const delta_time = current_time - last_time;
  total_time += delta_time;
  last_time = current_time;
  updateGame(delta_time, total_time);
}, 20);

window.setInterval(function(){
	let save = {
		pens: new Decimal(pens),
		bil1amt: new Decimal(bil1.amount),
		bil2amt: new Decimal(bil2.amount),
		bil3amt: new Decimal(bil3.amount),
		bilp1amt: new Decimal(bilp1.amount).round(),
		bilp2amt: new Decimal(bilp2.amount).round(),
		bilp3amt: new Decimal(bilp3.amount).round(),
		formLvl: formLvl,
		formX: formX,
		chksum: getHash(JSON.stringify(new Decimal(pens) + new Decimal(bil1.amount) + new Decimal(bil2.amount) + new Decimal(bil3.amount) + new Decimal(bilp1.amount).round() + new Decimal(bilp2.amount).round() + new Decimal(bilp3.amount).round() + formLvl + formX)),
	}
	localStorage.setItem("save", JSON.stringify(save));
	
}, 5000);