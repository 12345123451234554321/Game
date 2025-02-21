const version = "0.7.0-alpha" //изменить!

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
	ppsB(){
		return this.basePps.mul(this.ppsIncreasePerN.pow(this.amount.div(this.n).floor()));
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
let bil4 = new Building(new Decimal("0"), new Decimal("11000"), new Decimal("10"), new Decimal("2.1"), new Decimal("47"), new Decimal("2"), new Decimal("1.15"))
let bil5 = new Building(new Decimal("0"), new Decimal("130000"), new Decimal("10"), new Decimal("2.1"), new Decimal("260"), new Decimal("2"), new Decimal("1.15"))
let bil6 = new Building(new Decimal("0"), new Decimal("1400000"), new Decimal("10"), new Decimal("2.1"), new Decimal("1400"), new Decimal("2"), new Decimal("1.15"))
let bil7 = new Building(new Decimal("0"), new Decimal("20000000"), new Decimal("10"), new Decimal("2.1"), new Decimal("7800"), new Decimal("2"), new Decimal("1.15"))
let bil8 = new Building(new Decimal("0"), new Decimal("330000000"), new Decimal("10"), new Decimal("2.1"), new Decimal("44000"), new Decimal("2"), new Decimal("1.15"))
let bilp1 = new Building(new Decimal("0"), new Decimal("10"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp2 = new Building(new Decimal("0"), new Decimal("100"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp3 = new Building(new Decimal("0"), new Decimal("1000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp4 = new Building(new Decimal("0"), new Decimal("10000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp5 = new Building(new Decimal("0"), new Decimal("100000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp6 = new Building(new Decimal("0"), new Decimal("1000000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp7 = new Building(new Decimal("0"), new Decimal("20000000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
let bilp8 = new Building(new Decimal("0"), new Decimal("200000000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))

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
	let cost = new Decimal(new Decimal("2").pow(formX));
	if(pens.gte(cost)) {
		pens = pens.sub(cost);
		formX = formX + 0.1; 
	}
}

function updByClick() {
	if(formLvl === 1) {
		byClick = new Decimal(formX);
	} else if (formLvl === 2) {
		byClick = new Decimal(bil1.amount.div("10").add("1").mul(formX));
	} else if (formLvl === 3) {
		byClick = new Decimal((bil1.amount.div("10").add("1").mul(formX)).pow(pens.slog(4)));
	}
}

function formUpgrade() {
	let cost = new Decimal(new Decimal("1000").pow(new Decimal(formLvl)));
	if(pens.gte(cost) && formLvl < 3) {
		pens = pens.sub(cost);
		formLvl = formLvl + 1;
	}
}

function getForm(lvl) {
	if (lvl === 1) {
		return "ручки за клик = уровень клика";
	} else if (lvl === 2) {
		return "ручки за клик = (кол-во рук / 10 + 1) * уровень клика";
	} else if (lvl === 3) {
		return "ручки за клик = ((кол-во рук / 10 + 1) * уровень клика)<sup>slog<sub>4</sub>(ручки)</sup>";
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

let savegame = JSON.parse(atob(localStorage.getItem("save")));
//if (savegame.chksum === getHash(JSON.stringify(savegame.pens + savegame.bil1amt + savegame.bil2amt + savegame.bil3amt + savegame.bilp1amt + savegame.bilp2amt + savegame.bilp3amt + savegame.formLvl + savegame.formX))) {
	if (typeof savegame?.pens !== ("undefined" || "null")) {pens = new Decimal(savegame.pens)};
	if (typeof savegame?.bil1amt !== ("undefined" || "null")) {bil1.setAmt(new Decimal(savegame.bil1amt))};
	if (typeof savegame?.bil2amt !== ("undefined" || "null")) {bil2.setAmt(new Decimal(savegame.bil2amt))};
	if (typeof savegame?.bil3amt !== ("undefined" || "null")) {bil3.setAmt(new Decimal(savegame.bil3amt))};
	if (typeof savegame?.bil4amt !== ("undefined" || "null")) {bil4.setAmt(new Decimal(savegame.bil4amt))};
	if (typeof savegame?.bil5amt !== ("undefined" || "null")) {bil5.setAmt(new Decimal(savegame.bil5amt))};
	if (typeof savegame?.bil6amt !== ("undefined" || "null")) {bil6.setAmt(new Decimal(savegame.bil6amt))};
	if (typeof savegame?.bil7amt !== ("undefined" || "null")) {bil7.setAmt(new Decimal(savegame.bil7amt))};
	if (typeof savegame?.bil8amt !== ("undefined" || "null")) {bil8.setAmt(new Decimal(savegame.bil8amt))};
	if (typeof savegame?.bilp1amt !== ("undefined" || "null")) {bilp1.setAmt(new Decimal(savegame.bilp1amt))};
	if (typeof savegame?.bilp2amt !== ("undefined" || "null")) {bilp2.setAmt(new Decimal(savegame.bilp2amt))};
	if (typeof savegame?.bilp3amt !== ("undefined" || "null")) {bilp3.setAmt(new Decimal(savegame.bilp3amt))};
	if (typeof savegame?.bilp4amt !== ("undefined" || "null")) {bilp4.setAmt(new Decimal(savegame.bilp4amt))};
	if (typeof savegame?.bilp5amt !== ("undefined" || "null")) {bilp5.setAmt(new Decimal(savegame.bilp5amt))};
	if (typeof savegame?.bilp6amt !== ("undefined" || "null")) {bilp6.setAmt(new Decimal(savegame.bilp6amt))};
	if (typeof savegame?.bilp7amt !== ("undefined" || "null")) {bilp7.setAmt(new Decimal(savegame.bilp7amt))};
	if (typeof savegame?.bilp8amt !== ("undefined" || "null")) {bilp8.setAmt(new Decimal(savegame.bilp8amt))};
	if (typeof savegame?.formLvl !== ("undefined" || "null")) {formLvl = savegame.formLvl};
	if (typeof savegame?.formX !== ("undefined" || "null")) {formX = savegame.formX};
	if (typeof savegame?.up1 !== ("undefined" || "null")) {up1amt = new Decimal(savegame.up1)};
//}

function updateGame(delta_time, total_time) {
	pens = Decimal.add(pens, ((bil1.ppms().mul(delta_time)).add(bil2.ppms().mul(delta_time)).add(bil3.ppms().mul(delta_time)).add(bil4.ppms().mul(delta_time)).add(bil5.ppms().mul(delta_time)).add(bil6.ppms().mul(delta_time)).add(bil7.ppms().mul(delta_time)).add(bil8.ppms().mul(delta_time))).mul(new Decimal(2).pow(up1amt)));
	pps = bil1.pps().add(bil2.pps().add(bil3.pps().add(bil4.pps().add(bil5.pps().add(bil6.pps().add(bil7.pps().add(bil8.pps()))))))).mul(new Decimal(2).pow(up1amt));
	pps2 = bilp1.pps().mul(bil1.ppsB().mul(new Decimal(2).pow(up1amt))).add(bilp2.pps().mul(bil2.ppsB().mul(new Decimal(2).pow(up1amt))).add(bilp3.pps().mul(bil3.ppsB().mul(new Decimal(2).pow(up1amt)))).add(bilp4.pps().mul(bil4.ppsB().mul(new Decimal(2).pow(up1amt)))).add(bilp5.pps().mul(bil5.ppsB().mul(new Decimal(2).pow(up1amt)))).add(bilp6.pps().mul(bil6.ppsB().mul(new Decimal(2).pow(up1amt)))).add(bilp7.pps().mul(bil7.ppsB().mul(new Decimal(2).pow(up1amt)))).add(bilp8.pps().mul(bil8.ppsB().mul(new Decimal(2).pow(up1amt)))))
	updByClick();
	document.getElementById('mainCnt').innerHTML = pens.toFixed(3);
	document.getElementById('mainPs').innerHTML = pps.toFixed(4);
	document.getElementById('mainA').innerHTML = pps2.toFixed(5);
	document.getElementById('am1').innerHTML = bil1.amount.toFixed(3);
	document.getElementById('pr1').innerHTML = bil1.price().round();
	document.getElementById('am2').innerHTML = bil2.amount.toFixed(3);
	document.getElementById('pr2').innerHTML = bil2.price().round();
	document.getElementById('am3').innerHTML = bil3.amount.toFixed(3);
	document.getElementById('pr3').innerHTML = bil3.price().round();
	document.getElementById('am4').innerHTML = bil4.amount.toFixed(3);
	document.getElementById('pr4').innerHTML = bil4.price().round();
	document.getElementById('am5').innerHTML = bil5.amount.toFixed(3);
	document.getElementById('pr5').innerHTML = bil5.price().round();
	document.getElementById('am6').innerHTML = bil6.amount.toFixed(3);
	document.getElementById('pr6').innerHTML = bil6.price().round();
	document.getElementById('am7').innerHTML = bil7.amount.toFixed(3);
	document.getElementById('pr7').innerHTML = bil7.price().round();
	document.getElementById('am8').innerHTML = bil8.amount.toFixed(3);
	document.getElementById('pr8').innerHTML = bil8.price().round();
	bil1.setAmt(bil1.amount.add(bilp1.ppms().mul(delta_time)));
	document.getElementById('amp1').innerHTML = bilp1.amount.toFixed(0);
	document.getElementById('prp1').innerHTML = bilp1.price().round();
	bil2.setAmt(bil2.amount.add(bilp2.ppms().mul(delta_time)));
	document.getElementById('amp2').innerHTML = bilp2.amount.toFixed(0);
	document.getElementById('prp2').innerHTML = bilp2.price().round();
	bil3.setAmt(bil3.amount.add(bilp3.ppms().mul(delta_time)));
	document.getElementById('amp3').innerHTML = bilp3.amount.toFixed(0);
	document.getElementById('prp3').innerHTML = bilp3.price().round();
	bil4.setAmt(bil4.amount.add(bilp4.ppms().mul(delta_time)));
	document.getElementById('amp4').innerHTML = bilp4.amount.toFixed(0);
	document.getElementById('prp4').innerHTML = bilp4.price().round();
	bil5.setAmt(bil5.amount.add(bilp5.ppms().mul(delta_time)));
	document.getElementById('amp5').innerHTML = bilp5.amount.toFixed(0);
	document.getElementById('prp5').innerHTML = bilp5.price().round();
	bil6.setAmt(bil6.amount.add(bilp6.ppms().mul(delta_time)));
	document.getElementById('amp6').innerHTML = bilp6.amount.toFixed(0);
	document.getElementById('prp6').innerHTML = bilp6.price().round();
	bil7.setAmt(bil7.amount.add(bilp7.ppms().mul(delta_time)));
	document.getElementById('amp7').innerHTML = bilp7.amount.toFixed(0);
	document.getElementById('prp7').innerHTML = bilp7.price().round();
	bil8.setAmt(bil8.amount.add(bilp8.ppms().mul(delta_time)));
	document.getElementById('amp8').innerHTML = bilp8.amount.toFixed(0);
	document.getElementById('prp8').innerHTML = bilp8.price().round();
	document.getElementById('clickLvl').innerHTML = formX.toFixed(1);
	document.getElementById('clickLvlp').innerHTML = new Decimal(new Decimal("2").pow(formX)).toFixed(1);
	document.getElementById('formul').innerHTML = getForm(formLvl);
	document.getElementById('formulLvl').innerHTML = formLvl.toFixed(0);
	if (formLvl < 3) {
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
	
	localStorage.setItem("save", getSave());
	
}, 5000);

function getSave() {
	return btoa(JSON.stringify({
		ver: version,
		pens: new Decimal(pens),
		bil1amt: new Decimal(bil1.amount),
		bil2amt: new Decimal(bil2.amount),
		bil3amt: new Decimal(bil3.amount),
		bil4amt: new Decimal(bil4.amount),
		bil5amt: new Decimal(bil5.amount),
		bil6amt: new Decimal(bil6.amount),
		bil7amt: new Decimal(bil7.amount),
		bil8amt: new Decimal(bil8.amount),
		bilp1amt: new Decimal(bilp1.amount).round(),
		bilp2amt: new Decimal(bilp2.amount).round(),
		bilp3amt: new Decimal(bilp3.amount).round(),
		bilp4amt: new Decimal(bilp4.amount).round(),
		bilp5amt: new Decimal(bilp5.amount).round(),
		bilp6amt: new Decimal(bilp6.amount).round(),
		bilp7amt: new Decimal(bilp7.amount).round(),
		bilp8amt: new Decimal(bilp8.amount).round(),
		formLvl: formLvl,
		formX: formX,
		up1: up1amt,
	}))
}

function exportSave() {
	document.getElementById("saveOut").value = getSave()
}

function importSave() {
	let savegame = JSON.parse(atob(document.getElementById("saveIn").value));
	if (typeof savegame?.ver === ("undefined" || "null")) {alert("Внимание! Загрузка сохранения версии 0.5.0-alpha! Возможны ошибки с загрузкой!")}
	else if (savegame.ver !== version) {alert("Внимание! Загрузка сохранения, сделанного в версии старше новейшей (текущая версия: " + version + ", сохранение сделано в версии " + savegame.ver + "! Возможны ошибки с загрузкой!")}
	if (typeof savegame?.pens !== ("undefined" || "null")) {pens = new Decimal(savegame.pens)};
	if (typeof savegame?.bil1amt !== ("undefined" || "null")) {bil1.setAmt(new Decimal(savegame.bil1amt))};
	if (typeof savegame?.bil2amt !== ("undefined" || "null")) {bil2.setAmt(new Decimal(savegame.bil2amt))};
	if (typeof savegame?.bil3amt !== ("undefined" || "null")) {bil3.setAmt(new Decimal(savegame.bil3amt))};
	if (typeof savegame?.bil4amt !== ("undefined" || "null")) {bil4.setAmt(new Decimal(savegame.bil4amt))};
	if (typeof savegame?.bil5amt !== ("undefined" || "null")) {bil5.setAmt(new Decimal(savegame.bil5amt))};
	if (typeof savegame?.bil6amt !== ("undefined" || "null")) {bil6.setAmt(new Decimal(savegame.bil6amt))};
	if (typeof savegame?.bil7amt !== ("undefined" || "null")) {bil7.setAmt(new Decimal(savegame.bil7amt))};
	if (typeof savegame?.bil8amt !== ("undefined" || "null")) {bil8.setAmt(new Decimal(savegame.bil8amt))};
	if (typeof savegame?.bilp1amt !== ("undefined" || "null")) {bilp1.setAmt(new Decimal(savegame.bilp1amt))};
	if (typeof savegame?.bilp2amt !== ("undefined" || "null")) {bilp2.setAmt(new Decimal(savegame.bilp2amt))};
	if (typeof savegame?.bilp3amt !== ("undefined" || "null")) {bilp3.setAmt(new Decimal(savegame.bilp3amt))};
	if (typeof savegame?.bilp4amt !== ("undefined" || "null")) {bilp4.setAmt(new Decimal(savegame.bilp4amt))};
	if (typeof savegame?.bilp5amt !== ("undefined" || "null")) {bilp5.setAmt(new Decimal(savegame.bilp5amt))};
	if (typeof savegame?.bilp6amt !== ("undefined" || "null")) {bilp6.setAmt(new Decimal(savegame.bilp6amt))};
	if (typeof savegame?.bilp7amt !== ("undefined" || "null")) {bilp7.setAmt(new Decimal(savegame.bilp7amt))};
	if (typeof savegame?.bilp8amt !== ("undefined" || "null")) {bilp8.setAmt(new Decimal(savegame.bilp8amt))};
	if (typeof savegame?.formLvl !== ("undefined" || "null")) {formLvl = savegame.formLvl};
	if (typeof savegame?.formX !== ("undefined" || "null")) {formX = savegame.formX};
	if (typeof savegame?.up1 !== ("undefined" || "null")) {up1amt = new Decimal(savegame.up1)};
}

function wipeButt() {
	let confirmation = confirm("Потвердите сброс сохраниения. ВОССТАНОВИТЬ ПРОГРЕСС БУДЕТ НЕВОЗМОЖНО!");
	if (confirmation) {
		pens = new Decimal("0");
		byClick = new Decimal("1");
		up1amt = new Decimal("0");
		formLvl = 1;
		formX = 1;
		bil1 = new Building(new Decimal("0"), new Decimal("15"), new Decimal("10"), new Decimal("2.1"), new Decimal("0.1"), new Decimal("2"), new Decimal("1.15"))
		bil2 = new Building(new Decimal("0"), new Decimal("100"), new Decimal("10"), new Decimal("2.1"), new Decimal("1"), new Decimal("2"), new Decimal("1.15"))
		bil3 = new Building(new Decimal("0"), new Decimal("1000"), new Decimal("10"), new Decimal("2.1"), new Decimal("8"), new Decimal("2"), new Decimal("1.15"))
		bil4 = new Building(new Decimal("0"), new Decimal("11000"), new Decimal("10"), new Decimal("2.1"), new Decimal("47"), new Decimal("2"), new Decimal("1.15"))
		bil5 = new Building(new Decimal("0"), new Decimal("130000"), new Decimal("10"), new Decimal("2.1"), new Decimal("260"), new Decimal("2"), new Decimal("1.15"))
		bil6 = new Building(new Decimal("0"), new Decimal("1400000"), new Decimal("10"), new Decimal("2.1"), new Decimal("1400"), new Decimal("2"), new Decimal("1.15"))
		bil7 = new Building(new Decimal("0"), new Decimal("20000000"), new Decimal("10"), new Decimal("2.1"), new Decimal("7800"), new Decimal("2"), new Decimal("1.15"))
		bil8 = new Building(new Decimal("0"), new Decimal("330000000"), new Decimal("10"), new Decimal("2.1"), new Decimal("44000"), new Decimal("2"), new Decimal("1.15"))
		bilp1 = new Building(new Decimal("0"), new Decimal("10"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp2 = new Building(new Decimal("0"), new Decimal("100"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp3 = new Building(new Decimal("0"), new Decimal("1000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp4 = new Building(new Decimal("0"), new Decimal("10000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp5 = new Building(new Decimal("0"), new Decimal("100000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp6 = new Building(new Decimal("0"), new Decimal("1000000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp7 = new Building(new Decimal("0"), new Decimal("20000000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		bilp8 = new Building(new Decimal("0"), new Decimal("200000000"), new Decimal("10"), new Decimal("1"), new Decimal("0.0003"), new Decimal("1"), new Decimal("1.20"))
		localStorage.setItem("save", getSave());
	} else {return}
}