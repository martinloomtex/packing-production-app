const TIMES=["9:00-10:00","10:00-11:00","11:00-12:15","12:15-1:45","1:45-2:45","2:45-3:45","3:45-5:00","5:00-6:00"];
// Paste your deployed Google Apps Script Web App URL here:
const API_URL="https://script.google.com/macros/s/AKfycbweA7S3O2LoSMyDkkrcW7aAahIcE6nMxXrw_xbCymWeeZjuZrnxFf8JNX00ibiOAbLtDQ/exec";

const dateEl=document.getElementById("date");
dateEl.value=new Date().toISOString().slice(0,10);
const hours=document.getElementById("hours");
TIMES.forEach((t,i)=>{
  const d=document.createElement("div"); d.className="hour";
  d.innerHTML=`<span>${t}</span><input type="number" min="0" inputmode="numeric" id="q${i}" placeholder="Qty" oninput="calc()">`;
  hours.appendChild(d);
});
function calc(){
  let a=TIMES.map((_,i)=>Number(document.getElementById("q"+i).value)||0);
  let total=a.reduce((x,y)=>x+y,0);
  document.getElementById("total").textContent=total;
  document.getElementById("avg").textContent=(a.filter(x=>x>0).length?Math.round(total/a.filter(x=>x>0).length):0);
}
function clearForm(){document.getElementById("form").reset();dateEl.value=new Date().toISOString().slice(0,10);calc();}
function show(msg,ok=false){
 const s=document.getElementById("status"); s.style.display="block"; s.textContent=msg;
 s.style.background=ok?"#dcfce7":"#fee2e2"; s.style.color=ok?"#166534":"#991b1b";
}
document.getElementById("form").addEventListener("submit",async e=>{
 e.preventDefault();
 const quantities=TIMES.map((t,i)=>({time:t,qty:Number(document.getElementById("q"+i).value)||0}));
 const payload={supervisor:supervisor.value,date:dateEl.value,line:line.value,shift:shift.value,operation:operation.value,target:Number(target.value)||0,quantities,remarks:remarks.value,submittedAt:new Date().toISOString()};
 localStorage.setItem("lastProduction",JSON.stringify(payload));
 if(API_URL.includes("PASTE_")){show("Saved on this phone. Connect the Google Sheet backend to share it with all supervisors.",true);return;}
 try{
   await fetch(API_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
   });

   show("Production submitted successfully.",true);
}catch(err){
   show("Internet/backend unavailable. Entry saved on this phone; submit again when connected.");
}
});
