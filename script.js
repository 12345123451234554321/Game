let pens = new Decimal("0");
let byClick = new Decimal("1");

class Building {
	constructor(amount, basePrice, n, priceIncreasePerN, basePps, ppsIncreasePerN) {
		this.amount = amount
		this.basePrice = basePrice;
		this.n = n;
		this.priceIncreasePerN = priceIncreasePerN;
		this.basePps = basePps;
		this.ppsIncreasePerN = ppsIncreasePerN;
	}
	buy() {
		let cost = (this.basePrice.mul(new Decimal("1.15").pow((this.amount)))).mul(this.priceIncreasePerN.pow(this.amount.div(this.n).floor()));
		if(pens.gte(cost)) {                                   //checks that the player can afford the cursor
			pens = pens.sub(cost); 
			this.amount = this.amount.add(1);                         //removes the cookies spent
		};
	}
	pps(){
		return this.basePps.mul(this.amount).mul(this.ppsIncreasePerN.pow(this.amount.div(this.n).floor()));
	}
	pp10ms(){
		return (this.basePps.mul(this.amount).mul(this.ppsIncreasePerN.pow(this.amount.div(this.n).floor()))).div(new Decimal("100"));
	}
	price() {
		return (this.basePrice.mul(new Decimal("1.15").pow((this.amount)))).mul(this.priceIncreasePerN.pow(this.amount.div(this.n).floor()));
	}
}

let bil1 = new Building(new Decimal("0"), new Decimal("15"), new Decimal("10"), new Decimal("2.1"), new Decimal("0.1"), new Decimal("2"))

function mainBtnClick() {
	pens = pens.add(byClick);
}
function buy1() {
	bil1.buy();
}

let savegame = JSON.parse(localStorage.getItem("save"));
if (typeof savegame?.pens !== ("undefined" || "null")) {pens = new Decimal(savegame.pens)};
if (typeof savegame?.bil1 !== ("undefined" || "null")) {bil1.amount = new Decimal(savegame.bil1)};

window.setInterval(function(){
	pens = pens.add(bil1.pp10ms())
	document.getElementById('mainCnt').innerHTML = (pens.round());
	document.getElementById('am1').innerHTML = bil1.amount;
	document.getElementById('pr1').innerHTML = bil1.price().round();
	
}, 10);

window.setInterval(function(){
	let save = {
		pens: pens,
		bil1: bil1.amount,
	}
	localStorage.setItem("save",JSON.stringify(save));
	
}, 3000);
