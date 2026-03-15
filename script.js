function formatearInputCLP(input){

let valor = input.value.replace(/\./g,"").replace(/\D/g,"");

if(valor === ""){
input.value = "";
return;
}

input.value = Number(valor).toLocaleString("es-CL");

}

function formatoCLP(valor){

return new Intl.NumberFormat('es-CL', {
style: 'currency',
currency: 'CLP',
minimumFractionDigits: 0
}).format(valor);

}

/* CONTADOR ANIMADO */

function animarValor(elemento, valorFinal, duracion=1200){

let inicio = 0;
let incremento = valorFinal / (duracion / 16);

let contador = setInterval(function(){

inicio += incremento;

if(inicio >= valorFinal){
inicio = valorFinal;
clearInterval(contador);
}

elemento.textContent = formatoCLP(Math.floor(inicio));

},16);

}

function simular(){

let aporte = Number(
document.getElementById("monthly").value.replace(/\./g,"")
);

let years = Number(document.getElementById("years").value);
let bank = Number(document.getElementById("bank").value);
let market = Number(document.getElementById("market").value);

let months = years * 12;

let bankCapital = 0;
let marketCapital = 0;

let bankRate = bank / 100 / 12;
let marketRate = market / 100 / 12;

/* VOLATILIDAD MERCADO */

let volatilidad = 0.02;

let marketUpperRate = (market/100 + volatilidad) / 12;
let marketLowerRate = (market/100 - volatilidad) / 12;

let marketUpperCapital = 0;
let marketLowerCapital = 0;

let ahorroData = [];
let bankData = [];
let marketData = [];
let marketUpper = [];
let marketLower = [];

for(let i=0;i<months;i++){

bankCapital = bankCapital * (1 + bankRate) + aporte;
marketCapital = marketCapital * (1 + marketRate) + aporte;

marketUpperCapital = marketUpperCapital * (1 + marketUpperRate) + aporte;
marketLowerCapital = marketLowerCapital * (1 + marketLowerRate) + aporte;

ahorroData.push(aporte * (i+1));
bankData.push(bankCapital);
marketData.push(marketCapital);

marketUpper.push(marketUpperCapital);
marketLower.push(marketLowerCapital);

}

let aporteTotal = aporte * months;

let gananciaBanco = bankCapital - aporteTotal;
let gananciaMercado = marketCapital - aporteTotal;

/* TARJETAS CON CONTADOR */

document.getElementById("ahorroCard").innerHTML =
`<h3>💰 Ahorro simple</h3>
<p>Total: <strong id="ahorroTotal">0</strong></p>`;

document.getElementById("bancoCard").innerHTML =
`<h3>🏦 Banco</h3>
<p>Total: <strong id="bancoTotal">0</strong></p>
<p>Interés ganado: ${formatoCLP(gananciaBanco)}</p>`;

document.getElementById("mercadoCard").innerHTML =
`<h3>📈 Mercado</h3>
<p>Total: <strong id="mercadoTotal">0</strong></p>
<p>Interés ganado: ${formatoCLP(gananciaMercado)}</p>`;

/* ANIMAR VALORES */

animarValor(document.getElementById("ahorroTotal"), aporteTotal);
animarValor(document.getElementById("bancoTotal"), bankCapital);
animarValor(document.getElementById("mercadoTotal"), marketCapital);

let ctx = document.getElementById("grafico").getContext("2d");

if(window.miGrafico){
window.miGrafico.destroy();
}

/* degradados */

let gradMercado = ctx.createLinearGradient(0,0,0,300);
gradMercado.addColorStop(0,"rgba(34,197,94,0.35)");
gradMercado.addColorStop(1,"rgba(34,197,94,0)");

let gradBanco = ctx.createLinearGradient(0,0,0,300);
gradBanco.addColorStop(0,"rgba(59,130,246,0.35)");
gradBanco.addColorStop(1,"rgba(59,130,246,0)");

let gradAhorro = ctx.createLinearGradient(0,0,0,300);
gradAhorro.addColorStop(0,"rgba(239,68,68,0.25)");
gradAhorro.addColorStop(1,"rgba(239,68,68,0)");

window.miGrafico = new Chart(ctx,{

type:"line",

data:{

labels: ahorroData.map((_,i)=>i+1),

datasets:[

{
label:"Ahorro",
data: ahorroData,
borderColor:"#ef4444",
backgroundColor: gradAhorro,
fill:true,
borderWidth:2,
tension:0.4,
pointRadius:0
},

{
label:"Banco",
data: bankData,
borderColor:"#3b82f6",
backgroundColor: gradBanco,
fill:true,
borderWidth:2,
tension:0.4,
pointRadius:0
},

{
label:"Mercado",
data: marketData,
borderColor:"#22c55e",
backgroundColor: gradMercado,
fill:true,
borderWidth:3,
tension:0.4,
pointRadius:0
},

{
label:"Mercado escenario alto",
data: marketUpper,
borderColor:"#22c55e66",
borderWidth:2,
borderDash:[6,6],
tension:0.4,
pointRadius:0
},

{
label:"Mercado escenario bajo",
data: marketLower,
borderColor:"#22c55e55",
borderWidth:2,
borderDash:[6,6],
tension:0.4,
pointRadius:0
}

]

},

options:{

responsive:true,

animation:{
duration:1800,
easing:"easeOutQuart"
},

interaction:{
mode:"index",
intersect:false
},

plugins:{

tooltip:{
backgroundColor:"#0f172a",
titleColor:"#fff",
bodyColor:"#fff",
padding:12,
callbacks:{
label:function(context){
return context.dataset.label + ": " + formatoCLP(context.raw);
}
}
}

},

scales:{

x:{
grid:{
display:false
},
ticks:{
maxTicksLimit:10
}
},

y:{
ticks:{
callback:function(value){
return formatoCLP(value);
}
}
}

}

}

});

document.getElementById("grafico").scrollIntoView({
behavior:"smooth"
});

}
