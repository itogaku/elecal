/* ============ 資料J（小3のミニドリルと確認テスト）をもとにした追加：3年の計算の復習 ============ */
const NEW3J={
 'g3-three':{id:'g3-three',title:'3つの 数の 計算',kind:'calc',n:22,cols:2,lead:'つぎの 計算を しましょう。',
  explain:{points:[{h:'左から じゅんに',b:'たし算と ひき算が まじった 式は、左から じゅんに 計算します。',ex:'16 − 2 + 3 = 14 + 3 = 17'},{h:'( ) が ある とき',b:'( ) の 中を 先に 計算します。',ex:'62 + (2 + 8) = 62 + 10 = 72'}],tip:'<b>こつ</b>　たして 10 や 100 に なる 数を 見つけると、計算が らくに なります。'},
  gen(){const t=ri(0,3);
   if(t===0){const a=ri(2,9),b=ri(2,9),c=ri(1,a+b-1),op=chance(.5);return op?{q:`${a} + ${b} − ${c}`,a:String(a+b-c),steps:[`${a} + ${b} = ${a+b}`,`${a+b} − ${c} = ${a+b-c}`]}:{q:`${a+b} − ${a} + ${c}`,a:String(b+c),steps:[`${a+b} − ${a} = ${b}`,`${b} + ${c} = ${b+c}`]}}
   if(t===1){const a=ri(11,49),b=ri(11,39),c=ri(11,39);return{q:`${a} + ${b} + ${c}`,a:String(a+b+c),steps:[`${a} + ${b} = ${a+b}`,`${a+b} + ${c} = ${a+b+c}`]}}
   if(t===2){const a=ri(11,89),b=ri(1,9),c=10-b;return{q:`${a} + (${b} + ${c})`,a:String(a+10),steps:[`( ) の 中 ${b} + ${c} = 10`,`${a} + 10 = ${a+10}`]}}
   const a=ri(30,99),b=ri(2,20),c=ri(2,a-b-1);return{q:`${a} − ${b} − ${c}`,a:String(a-b-c),steps:[`${a} − ${b} = ${a-b}`,`${a-b} − ${c} = ${a-b-c}`]}}},
 'g3-kasa':{id:'g3-kasa',title:'かさの たんいと 計算',kind:'calc',n:16,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'かさの たんい',b:'1L = 10dL、1L = 1000mL、1dL = 100mL'},{h:'同じ たんいどうしで',b:'L は L どうし、dL は dL どうしで 計算します。dL が 10 を こえたら 1L に くり上げます。',ex:'2L 5dL + 1L 7dL = 3L 12dL = 4L 2dL'}],tip:'<b>こつ</b>　ひけない ときは、1L を 10dL に して ひきます。'},
  gen(){const t=ri(0,4);
   if(t===0){const L=ri(1,9);return pick([{q:`${L}L = {_}dL`,tail:'',a:String(L*10),steps:['1L = 10dL']},{q:`${L*10}dL = {_}L`,tail:'',a:String(L),steps:['10dL = 1L']},{q:`${L}dL = {_}mL`,tail:'',a:String(L*100),steps:['1dL = 100mL']}])}
   if(t===1){const L=ri(1,5),d=ri(1,9);return{q:`${L}L ${d}dL = {_}dL`,tail:'',a:String(L*10+d),steps:[`${L}L = ${L*10}dL`]}}
   if(t===2){const a=ri(1,4),b=ri(1,9),c=ri(1,4),d=ri(1,9),s=(a+c)*10+b+d;return{q:`${a}L ${b}dL + ${c}L ${d}dL = {_}L {_}dL`,tail:'',blanks:[Math.floor(s/10),s%10],a:`${Math.floor(s/10)}、${s%10}`,steps:[`L どうし ${a} + ${c} = ${a+c}、dL どうし ${b} + ${d} = ${b+d}`,b+d>=10?'10dL を 1L に くり上げる':'dL は 10 より 小さい']}}
   if(t===3){const a=ri(3,9),b=ri(1,8),c=ri(1,a-1),d=ri(b+1,9),s=a*10+b-c*10-d;return{q:`${a}L ${b}dL − ${c}L ${d}dL = {_}L {_}dL`,tail:'',blanks:[Math.floor(s/10),s%10],a:`${Math.floor(s/10)}、${s%10}`,steps:[`${b}dL から ${d}dL は ひけない`,`1L を 10dL に して ${10+b} − ${d} = ${10+b-d}`]}}
   const L=ri(1,4),m=ri(1,9)*100;return{q:`${L}L ${m}mL = {_}mL`,tail:'',a:String(L*1000+m),steps:['1L = 1000mL']}}},
 'g3-lencalc':{id:'g3-lencalc',title:'長さの たんいと 計算',kind:'calc',n:16,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'長さの たんい',b:'1cm = 10mm、1m = 100cm、1km = 1000m'},{h:'同じ たんいどうしで',b:'cm は cm どうし、mm は mm どうしで 計算します。くり上がり・くり下がりに 気を つけます。',ex:'5m 30cm − 2m 60cm = 4m 130cm − 2m 60cm = 2m 70cm'}],tip:'<b>こつ</b>　ひけない ときは、上の たんいから 1 くり下げます（1m → 100cm）。'},
  gen(){const t=ri(0,4);
   if(t===0){const c=ri(1,20),m=ri(1,9);return chance(.5)?{q:`${c}cm ${m}mm = {_}mm`,tail:'',a:String(c*10+m),steps:['1cm = 10mm']}:{q:`${c*10+m}mm = {_}cm {_}mm`,tail:'',blanks:[c,m],a:`${c}、${m}`,steps:['10mm = 1cm']}}
   if(t===1){const a=ri(1,9),b=ri(1,9),c=ri(1,9),d=ri(1,9),s=(a+c)*10+b+d;return{q:`${a}cm ${b}mm + ${c}cm ${d}mm = {_}cm {_}mm`,tail:'',blanks:[Math.floor(s/10),s%10],a:`${Math.floor(s/10)}、${s%10}`,steps:[`mm どうし ${b} + ${d} = ${b+d}`,b+d>=10?'10mm を 1cm に くり上げる':'cm どうし たす']}}
   if(t===2){const a=ri(3,9),b=ri(10,80),c=ri(1,a-1),d=ri(b+5,95),s=a*100+b-c*100-d;return{q:`${a}m ${b}cm − ${c}m ${d}cm = {_}m {_}cm`,tail:'',blanks:[Math.floor(s/100),s%100],a:`${Math.floor(s/100)}、${s%100}`,steps:[`${b}cm から ${d}cm は ひけない`,`1m を 100cm に して ${100+b} − ${d} = ${100+b-d}`]}}
   if(t===3){const a=ri(1,4),b=ri(1,9)*100,c=ri(1,9)*100,s=a*1000+b+c;return{q:`${a}km ${b}m + ${c}m = {_}km {_}m`,tail:'',blanks:[Math.floor(s/1000),s%1000],a:`${Math.floor(s/1000)}、${s%1000}`,steps:[`${b} + ${c} = ${b+c}`,b+c>=1000?'1000m を 1km に くり上げる':'m は 1000 より 小さい']}}
   const m=ri(11,99)*100;if(m%1000===0)return this.gen();return{q:`${m}m = {_}km {_}m`,tail:'',blanks:[Math.floor(m/1000),m%1000],a:`${Math.floor(m/1000)}、${m%1000}`,steps:['1000m = 1km']}}},
};

/* ---------- 3年に「計算の復習（ミニドリル）」の章を追加 ---------- */
(()=>{const items=[];const cp=(g,id,nid,title)=>{const u=copyU(g,id,nid);if(title)u.title=title;items.push(u);WHY[nid]=()=>WHY[id]?WHY[id]():[]};
  cp(2,'g2-add','r3-add','2けたの たし算（ふくしゅう）');cp(2,'g2-sub','r3-sub','2けたの ひき算（ふくしゅう）');cp(2,'g2-kuku','r3-kuku','九九（ふくしゅう）');
  items.push(NEW3J['g3-three'],NEW3J['g3-kasa'],NEW3J['g3-lencalc']);
  const pos=GRADE_UNITS[3].findIndex(x=>x.ch==='考える もんだい');GRADE_UNITS[3].splice(pos,0,{ch:'計算の 復習（ミニドリル）',items})})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['g3-three']=()=>{let g=box(4,6,30,9,'#fff',.4)+T(19,12.5,'16 − 2',3.6)+arrowR(36,10.5,46,'')+box(48,6,14,9,CB,.4)+T(55,12.5,'14',3.6)+T(68,12.5,'+ 3',3.6,'start')+arrowR(80,10.5,90,'')+box(92,6,14,9,CR,.4)+T(99,12.5,'17',3.6);
  return W1(SVGW('0 0 110 20',g),'左から じゅんに',['16 − 2 を 先に 計算して 14','つぎに 14 + 3 = 17','( ) が あれば、( ) の 中を いちばん 先に 計算する'])};
WHY['g3-kasa']=()=>{let g='';for(let i=0;i<10;i++)g+=`<rect x="6" y="${4+i*2.6}" width="14" height="2.6" fill="${CB}" stroke="#111" stroke-width=".25"/>`;g+=T(13,34,'1L',3.4)+T(26,18,'=',4.4);for(let i=0;i<10;i++)g+=box(32+i*7,8,6,14,CB,.3);g+=T(67,30,'1dL が 10こ',3.4);
  return W1(SVGW('0 0 106 36',g),'1L = 10dL',['1L の ますを 10こに 分けた 1つ分が 1dL','dL を たして 10 に なったら、1L に くり上げる'])};
WHY['g3-lencalc']=()=>{let g=tape(4,6,50,8,CB,'1m')+T(60,11.5,'=',4)+tape(66,6,50,8,CR,'100cm');g+=T(60,24,'5m30cm − 2m60cm → 4m130cm − 2m60cm',3.2);
  return W1(SVGW('0 0 120 28',g),'1m を 100cm に くずす',['30cm から 60cm は ひけない','5m の うち 1m を 100cm に して、4m 130cm に する','130 − 60 = 70、4 − 2 = 2 → 2m 70cm'])};
