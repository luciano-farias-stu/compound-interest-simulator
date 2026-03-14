function formatearInputCLP(input){

let valor = input.value.replace(/\./g,"").replace(/\D/g,"");

if(valor===""){
input.value="";
return;
}

input.value = Number(valor).toLocaleString("es-CL");

}

function formatoCLP(valor){

return new Intl.NumberFormat('es-CL',{
style:'currency',
currency:'CLP',
minimumFractionDigits:0
}).format(valor);

}

function simular(){

let aporte = Number(
document.getElementById("monthly").value.replace(/\./g,"")
);

let years = Number(document.getElementById("years").value);
let bank = Number(document.getElementById("bank").value);
let market = Number(document.getElementById("market").value);

let months = years*12;

let bankRate = bank/100/12;
let marketRate = market/100/12;

let ahorroData=[];
let bankData=[];
let marketData=[];

let bankCapital=0;
let marketCapital=0;

for(let i=0;i<months;i++){

bankCapital = bankCapital*(1+bankRate)+aporte;
marketCapital = marketCapital*(1+marketRate)+aporte;

ahorroData.push(aporte*(i+1));
bankData.push(bankCapital);
marketData.push(marketCapital);

}

document.getElementById("ahorroCard").innerHTML=
`<h3>Ahorro simple</h3>
<p>${formatoCLP(aporte*months)}</p>`;

document.getElementById("bancoCard").innerHTML=
`<h3>Banco</h3>
<p>${formatoCLP(bankCapital)}</p>`;

document.getElementById("mercadoCard").innerHTML=
`<h3>Mercado</h3>
<p>${formatoCLP(marketCapital)}</p>`;

let ctx = document.getElementById("grafico");

if(window.miGrafico){
window.miGrafico.destroy();
}

window.miGrafico = new Chart(ctx,{

type:'line',

data:{
labels:ahorroData.map((_,i)=>i+1),

datasets:[

{
label:'Ahorro',
data:ahorroData,
borderColor:'#ef4444',
tension:0.3
},

{
label:'Banco',
data:bankData,
borderColor:'#3b82f6',
tension:0.3
},

{
label:'Mercado',
data:marketData,
borderColor:'#22c55e',
tension:0.3
}

]

},

options:{
responsive:true
}

});

}
