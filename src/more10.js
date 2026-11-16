/* ============ 資料G（小5のミニドリルと確認テスト）をもとにした追加：計算の復習の章 ============ */
const sig1=n=>{const p=10**(String(n).length-1);return Math.round(n/p)*p};
const NEW5G={
 'g5-calcest':{id:'g5-calcest',title:'計算の見積もり',kind:'calc',n:10,cols:2,lead:'（　）のがい数にして、答えを見積もりましょう。<br>（千）… 千の位まで　（上1）… 上から1けた　（上2÷上1）… わられる数を上から2けた、わる数を上から1けた',
  explain:{points:[{h:'和・差の見積もり',b:'求めたい位までのがい数（四捨五入）にしてから計算します。',ex:'4578 + 3245 → 5000 + 3000 = 8000'},{h:'積・商の見積もり',b:'積は、どちらも上から1けたのがい数にします。商は、わられる数を上から2けた、わる数を上から1けたのがい数にします。',ex:'487 × 51 → 500 × 50 = 25000'}],tip:'<b>こつ</b>　見積もりは「だいたいの大きさ」を知るためのものです。計算した答えが見積もりと大きくちがったら、計算をたしかめましょう。'},
  gen(){const t=ri(0,3);
   if(t<2){const a=ri(1100,9800),b=ri(1100,t?a-200:9800);if(b<1000)return this.gen();const A=Math.round(a/1000)*1000,B=Math.round(b/1000)*1000;const r=t?A-B:A+B;if(t&&r<=0)return this.gen();
    return{q:`${a} ${t?'−':'+'} ${b}（千）`,tail:'<span>→ 約</span>',a:String(r),steps:[`${a} → ${A}、${b} → ${B}`,`${A} ${t?'−':'+'} ${B} = ${r}`]}}
   if(t===2){const a=ri(110,9400),b=ri(11,940);const A=sig1(a),B=sig1(b);if(String(A).length>String(a).length||String(B).length>String(b).length)return this.gen();return{q:`${a} × ${b}（上1）`,tail:'<span>→ 約</span>',a:String(A*B),steps:[`${a} → ${A}、${b} → ${B}`,`${A} × ${B} = ${A*B}`]}}
   const d1=ri(2,9),k=pick([10,100]),q=ri(2,9)*pick([1,10]);const D=d1*k,R=D*q;if(String(R).replace(/0+$/,'').length>2)return this.gen();const p=10**(String(R).length-2),dp=k;
   const a=R+ri(-Math.floor(p/2)+1,Math.floor(p/2)-1),b=D+ri(-Math.floor(dp/2)+1,Math.floor(dp/2)-1);if(a<=0||b<=0||String(a).length!==String(R).length||String(b).length!==String(D).length)return this.gen();
   return{q:`${a} ÷ ${b}（上2÷上1）`,tail:'<span>→ 約</span>',a:String(q),steps:[`${a} → ${R}、${b} → ${D}`,`${R} ÷ ${D} = ${q}`]}}},
 'g5-unitmix':{id:'g5-unitmix',title:'いろいろな単位（復習）',kind:'calc',n:14,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'長さ・重さ・かさ',b:'1km = 1000m、1m = 100cm、1cm = 10mm　／　1t = 1000kg、1kg = 1000g　／　1L = 10dL = 1000mL'},{h:'時間・面積',b:'1時間 = 60分、1分 = 60秒　／　1a = 100m²、1ha = 100a = 10000m²、1km² = 1000000m²'}],tip:'<b>こつ</b>　k（キロ）は1000倍、c（センチ）は1/100、m（ミリ）は1/1000 を表します。'},
  gen(){const t=ri(0,8);
   if(t===0){const k=ri(1,9),m=ri(1,999);return{q:`${k}km ${m}m = {_}m`,tail:'',a:String(k*1000+m),steps:[`${k}km = ${k*1000}m`,`${k*1000} + ${m} = ${k*1000+m}`]}}
   if(t===1){const c=ri(101,999);return{q:`${c}cm = {_}m {_}cm`,tail:'',blanks:[Math.floor(c/100),c%100],a:`${Math.floor(c/100)}、${c%100}`,steps:['100cm = 1m',`${c} = ${Math.floor(c/100)*100} + ${c%100}`]}}
   if(t===2){const s=ri(61,599);return{q:`${s}秒 = {_}分 {_}秒`,tail:'',blanks:[Math.floor(s/60),s%60],a:`${Math.floor(s/60)}、${s%60}`,steps:['60秒 = 1分',`${s} ÷ 60 = ${Math.floor(s/60)} あまり ${s%60}`]}}
   if(t===3){const h=ri(1,4),m=ri(1,59);return{q:`${h}時間 ${m}分 = {_}分`,tail:'',a:String(h*60+m),steps:[`${h}時間 = ${h*60}分`,`${h*60} + ${m} = ${h*60+m}`]}}
   if(t===4){const v=pick([ri(2,9),ri(11,49)/10]);return{q:`${num(v)}L = {_}dL`,tail:'',a:num(v*10),steps:['1L = 10dL',`${num(v)} × 10 = ${num(v*10)}`]}}
   if(t===5){const v=ri(1,9)*pick([100,1000])+ri(0,9)*100;return{q:`${v}mL = {_}L`,tail:'',a:num(v/1000),steps:['1000mL = 1L',`${v} ÷ 1000 = ${num(v/1000)}`]}}
   if(t===6){const g=ri(11,99)*100;return chance(.5)?{q:`${g}g = {_}kg`,tail:'',a:num(g/1000),steps:['1000g = 1kg',`${g} ÷ 1000 = ${num(g/1000)}`]}:{q:`${num(g/1000)}t = {_}kg`,tail:'',a:String(g),steps:['1t = 1000kg',`${num(g/1000)} × 1000 = ${g}`]}}
   if(t===7){const a=ri(2,9);return pick([{q:`${a}ha = {_}a`,tail:'',a:String(a*100),steps:['1ha = 100a']},{q:`${a*100}m² = {_}a`,tail:'',a:String(a),steps:['100m² = 1a']},{q:`${a}km² = {_}ha`,tail:'',a:String(a*100),steps:['1km² = 100ha（1km² = 1000000m²、1ha = 10000m²）']}])}
   const m=ri(2,9)*10000;return{q:`${m}m² = {_}ha`,tail:'',a:String(m/10000),steps:['10000m² = 1ha',`${m} ÷ 10000 = ${m/10000}`]}}},
};

/* ---------- 5年に「計算の復習」の章を追加（下の学年の計算もまとめて練習できる） ---------- */
(()=>{const items=[];const cp=(g,id,title)=>{const u=copyU(g,id,'g5-r-'+id.replace(/^g\d-/,''));u.title=title;items.push(u);WHY[u.id]=()=>WHY[id]?WHY[id]():[]};
  cp(3,'g3-add','整数のたし算（復習）');cp(3,'g3-sub','整数のひき算（復習）');cp(3,'g3-mul','整数のかけ算（復習）');cp(4,'g4-div2','整数のわり算（復習）');cp(4,'g4-order','計算の順序（復習）');cp(4,'g4-rule','計算のきまり（復習）');
  items.push(NEW5G['g5-calcest'],NEW5G['g5-unitmix']);GRADE_UNITS[5].push({ch:'計算の復習（ミニドリル）',items})})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['g5-calcest']=()=>{let g=`<line x1="6" y1="20" x2="110" y2="20" stroke="#111" stroke-width=".6"/>`;for(let i=0;i<=10;i++)g+=`<line x1="${6+i*10.4}" y1="18" x2="${6+i*10.4}" y2="22" stroke="#111" stroke-width=".4"/>`;g+=T(6,28,'400',3)+T(110,28,'500',3)+T(58,28,'450',3)+dot(6+8.7*10.4,20,1.6,'#c0392b')+T(6+8.7*10.4,14,'487',3.4)+arrowR(96,10,106,'')+T(80,8,'500 に近い',3.2);
  return W1(SVGW('0 0 116 32',g),'上から1けたのがい数',['487 は 400 と 500 の間で、450 より大きいので 500 に近い','487 × 51 → 500 × 50 = 25000 とすると、だいたいの大きさがすぐわかる','本当の答え 24837 は、見積もり 25000 に近い'])};
WHY['g5-unitmix']=()=>{const u=[['k','1000倍','km・kg'],['','1','m・g・L'],['d','1/10','dL'],['c','1/100','cm'],['m','1/1000','mm・mL']];let g='';u.forEach((r,i)=>{g+=box(4+i*22,4,22,8,i===1?CB:'#eef4fb',.3)+T(15+i*22,9.5,r[0]||'もと',3.4)+box(4+i*22,12,22,8,'#fff',.3)+T(15+i*22,17.5,r[1],3.2)+T(15+i*22,26,r[2],2.8)});
  return W1(SVGW('0 0 118 30',g),'単位の前につく記号',['k（キロ）は1000倍、d（デシ）は1/10、c（センチ）は1/100、m（ミリ）は1/1000','面積は 10m 四方 = 1a、100m 四方 = 1ha、1km 四方 = 1km²','時間だけは 60 ずつで変わる（1時間 = 60分、1分 = 60秒）'])};
