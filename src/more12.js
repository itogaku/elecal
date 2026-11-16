/* ============ 3年の拡充：教科書の単元の流れにそった新しい問題タイプ・章の並べかえ・「なぜ？」の図 ============ */
const KJ='〇一二三四五六七八九';
const toKanji=n=>{const f=x=>{let s='';[[1000,'千'],[100,'百'],[10,'十'],[1,'']].forEach(([p,u])=>{const c=Math.floor(x/p)%10;if(!c)return;s+=(c===1&&u?'':KJ[c])+u});return s};const man=Math.floor(n/10000),r=n%10000;return (man?f(man)+'万':'')+f(r)||'〇'};
const tfmt=t=>{const h=Math.floor(t/60),m=t%60;return m?`${h}時${m}分`:`${h}時`};
const dfmt=d=>d>=60?(d%60?`${Math.floor(d/60)}時間${d%60}分`:`${d/60}時間`):`${d}分`;
const sideQ=(fig,w,txt)=>`<div class="side"><div class="fig" style="width:${w}mm">${fig}</div><div class="figcap">${txt}</div></div>`;
const soroSVG=(v,dec)=>{const ds=String(Math.round(v*10)).padStart(5,'0').split('').map(Number);let g=`<rect x="2" y="2" width="64" height="48" fill="#fff" stroke="#111" stroke-width="1"/><line x1="2" y1="14" x2="66" y2="14" stroke="#111" stroke-width="1.2"/>`;
  ds.forEach((d,i)=>{const x=10+i*12;g+=`<line x1="${x}" y1="2" x2="${x}" y2="50" stroke="#777" stroke-width=".6"/>`;const up=d>=5?10.6:5.6;g+=`<ellipse cx="${x}" cy="${up}" rx="4.6" ry="2.2" fill="${CB}" stroke="#111" stroke-width=".5"/>`;const k=d%5;for(let j=0;j<4;j++){const y=j<k?16.4+j*4.4:45.8-(3-j)*4.4;g+=`<ellipse cx="${x}" cy="${num(y)}" rx="4.6" ry="2.2" fill="${CB}" stroke="#111" stroke-width=".5"/>`}});
  g+=dot(46,14,1.1,'#c0392b');['千','百','十','一','小数'].forEach((u,i)=>g+=T(10+i*12,56,u,3.2));return SVGW('0 0 68 59',g)};
const angSVG=(list)=>{let g='',x=4;list.forEach(o=>{const a=o.a*Math.PI/180,L1=o.l1,L2=o.l2;const vx=x+(o.a>90?L2*Math.cos(Math.PI-a)+2:2),vy=34;g+=`<path d="M${num(vx+L1)},${vy} L${num(vx)},${vy} L${num(vx+L2*Math.cos(a))},${num(vy-L2*Math.sin(a))}" fill="none" stroke="#111" stroke-width=".9"/>`+arcP(vx,vy,5,0,o.a)+T(vx+Math.max(L1,L2*Math.max(0,Math.cos(a)))/2,vy+7,o.n,4.2);x=vx+Math.max(L1,L2*Math.cos(a))+10});return{g,w:x}};

const NEW3={
 'g3-mulrule':{id:'g3-mulrule',title:'かけ算の きまり',kind:'calc',n:14,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'じゅんじょを かえても 同じ',b:'かけられる数と かける数を 入れかえても、答えは 同じです。',ex:'3 × 7 = 7 × 3'},{h:'かける数が 1 ふえると',b:'かける数が 1 ふえると、答えは かけられる数だけ ふえます。',ex:'4 × 6 = 4 × 5 + 4'},{h:'0 や 10 の かけ算',b:'どんな 数に 0 を かけても、0 に どんな 数を かけても 答えは 0 です。10 を かけると、0 を 1こ つけた 数に なります。'}],tip:'<b>こつ</b>　九九の ひょうを 見て、たてや よこに ならんだ 数の きまりを さがしましょう。'},
  gen(){const a=ri(2,9),b=ri(2,9),t=ri(0,6);
   if(t===0)return{q:`${a} × ${b} = ${b} × {_}`,tail:'',a:String(a),steps:['かけられる数と かける数を 入れかえても 答えは 同じ']};
   if(t===1)return{q:`${a} × ${b} = ${a} × ${b-1} + {_}`,tail:'',a:String(a),steps:[`かける数が 1 ふえると、答えは ${a} ふえる`]};
   if(t===2)return{q:`${a} × ${b} = ${a} × ${b+1} − {_}`,tail:'',a:String(a),steps:[`かける数が 1 へると、答えは ${a} へる`]};
   if(t===3)return chance(.5)?{q:`${a} × 0 = {_}`,tail:'',a:'0',steps:['どんな 数に 0 を かけても 0']}:{q:`0 × ${a} = {_}`,tail:'',a:'0',steps:['0 に どんな 数を かけても 0']};
   if(t===4){const k=ri(2,9);return chance(.5)?{q:`${k} × 10 = {_}`,tail:'',a:String(k*10),steps:[`${k} × 10 は ${k} の 10こ分 → ${k*10}`]}:{q:`10 × ${k} = {_}`,tail:'',a:String(k*10),steps:[`10 × ${k} = ${k} × 10 = ${k*10}`]}}
   if(t===5){const B=ri(11,15),c=ri(5,9);return{q:`${a} × ${B} = ${a} × ${c} + ${a} × {_}`,tail:'',a:String(B-c),steps:[`${B} を ${c} と ${B-c} に 分ける`,`${a*c} + ${a*(B-c)} = ${a*B}`]}}
   return{q:`{_} × ${b} = ${a*b}`,tail:'',a:String(a),steps:[`${b} の だんで ${a*b} に なるのは ${a} × ${b}`]}}},
 'g3-timeclock':{id:'g3-timeclock',title:'時こくと 時間',kind:'word',n:6,cols:1,lead:'つぎの もんだいに 答えましょう。',parts:['答え'],
  explain:{points:[{h:'時こくと 時間',b:'「8時30分」のような ときを 時こく、「30分間」のような 長さを 時間と いいます。'},{h:'ちょうどの 時こくで 分ける',b:'8時40分から 9時15分までは、9時までの 20分と、9時からの 15分を あわせて 35分です。',ex:'60分 = 1時間'}],tip:'<b>こつ</b>　数直線（時間の ものさし）を かいて、ちょうどの 時こくで 区切ると わかりやすく なります。'},
  gen(){const h=ri(2,10),m=ri(1,11)*5,t0=h*60+m;return pick([
   ()=>{const d=ri(3,10)*5;return{q:sideQ(clockSVG(h,m),24,`いまの 時こくは 左の 時計の とおりです。${d}分後の 時こくは 何時何分ですか。`),parts:['答え'],a:`答え ${tfmt(t0+d)}`,steps:[`いまは ${tfmt(t0)}`,`${d}分後 → ${tfmt(t0+d)}`]}},
   ()=>{const d=ri(3,10)*5;return{q:sideQ(clockSVG(h,m),24,`いまの 時こくは 左の 時計の とおりです。${d}分前の 時こくは 何時何分ですか。`),parts:['答え'],a:`答え ${tfmt(t0-d)}`,steps:[`いまは ${tfmt(t0)}`,`${d}分前 → ${tfmt(t0-d)}`]}},
   ()=>{const d=ri(4,14)*5;const t1=t0+d;return{q:`家を ${tfmt(t0)}に 出て、${tfmt(t1)}に 駅に つきました。かかった 時間は 何分ですか。`,parts:['答え'],a:`答え ${d}分`,steps:[`${tfmt(t0)} → ${tfmt(Math.ceil(t0/60)*60)} は ${Math.ceil(t0/60)*60-t0}分`,`${tfmt(Math.ceil(t0/60)*60)} → ${tfmt(t1)} は ${t1-Math.ceil(t0/60)*60}分`,`あわせて ${d}分`]}},
   ()=>{const a=ri(5,11)*5,b=ri(5,11)*5;return{q:`しゅくだいを ${a}分、読書を ${b}分 しました。あわせて 何時間何分ですか。`,parts:['答え'],a:`答え ${dfmt(a+b)}`,steps:[`${a} + ${b} = ${a+b}（分）`,'60分 = 1時間']}},
  ])()}},
 'g3-div0':{id:'g3-div0',title:'わり算（あまりなし）',kind:'calc',n:22,cols:2,lead:'つぎの 計算を しましょう。',
  explain:{points:[{h:'わり算は 九九で',b:'24 ÷ 6 の 答えは、6 の だんの 九九で 6 × □ = 24 に なる □ を さがします。',ex:'6 × 4 = 24 → 24 ÷ 6 = 4'},{h:'0 や 1 の わり算',b:'0 を どんな 数で わっても 0 です。わる数と わられる数が 同じなら 答えは 1 です。'},{h:'何十 ÷ 1けた',b:'60 ÷ 3 は、10 が 6こ を 3 で 分けて、10 が 2こ → 20'}],tip:'<b>たしかめ</b>　答え × わる数 が わられる数に なれば 正かいです。'},
  gen(){const t=ri(0,9);
   if(t<=5){const b=ri(2,9),q=ri(1,9);return{q:`${b*q} ÷ ${b}`,a:String(q),steps:[`${b} × ${q} = ${b*q}`]}}
   if(t===6){const b=ri(1,9);return chance(.5)?{q:`0 ÷ ${b}`,a:'0',steps:['0 を どんな 数で わっても 0']}:{q:`${b} ÷ ${b}`,a:'1',steps:['わる数と わられる数が 同じ → 1']}}
   if(t===7){const b=ri(2,9);return{q:`${b} ÷ 1`,a:String(b),steps:['1 で わると、わられる数の まま']}}
   if(t===8){const b=ri(2,4),q=ri(2,3);if(b*q>9)return this.gen();return{q:`${b*q*10} ÷ ${b}`,a:String(q*10),steps:[`10 が ${b*q}こ を ${b} で 分けると、10 が ${q}こ`]}}
   const b=ri(2,4),q1=ri(1,2),q2=ri(1,2);const n=b*(q1*10+q2);if(b*q1>9)return this.gen();return{q:`${n} ÷ ${b}`,a:String(q1*10+q2),steps:[`${b*q1*10} ÷ ${b} = ${q1*10}、${b*q2} ÷ ${b} = ${q2}`,`${q1*10} + ${q2} = ${q1*10+q2}`]}}},
 'g3-remword':{id:'g3-remword',title:'あまりの 考え方',kind:'word',n:5,cols:1,lead:'式と 答えを 書きましょう。あまりを どうするか 考えましょう。',
  explain:{points:[{h:'あまりも 1つ ふやす',b:'「全員が すわるには」「全部 運ぶには」のときは、あまった 分の ために もう 1つ いります。',ex:'27人を 4人ずつ → 27 ÷ 4 = 6 あまり 3 → 7きゃく'},{h:'あまりは つかわない',b:'「何こ 買えるか」「何本 できるか」のときは、あまりでは 1つ 分に たりないので、商が 答えです。'}],tip:'<b>こつ</b>　あまりの 数が 何を あらわして いるかを 考えましょう。'},
  gen(){const b=ri(3,8),q=ri(3,9),r=ri(1,b-1),n=b*q+r;return pick([
   ()=>({q:`${n}人が 長いすに すわります。1きゃくに ${b}人ずつ すわると、全員が すわるには 長いすは 何きゃく いりますか。`,a:`式 ${n} ÷ ${b} = ${q} あまり ${r}　答え ${q+1}きゃく`,steps:[`${q}きゃくでは ${r}人が すわれない`,`あと 1きゃく いるので ${q} + 1 = ${q+1}`]}),
   ()=>({q:`${n}cm の リボンから、${b}cm の リボンは 何本 とれますか。`,a:`式 ${n} ÷ ${b} = ${q} あまり ${r}　答え ${q}本`,steps:[`のこりの ${r}cm では ${b}cm に たりない`]}),
   ()=>({q:`${n}まいの 色紙を、1人に ${b}まいずつ くばります。何人に くばれて、何まい あまりますか。`,a:`式 ${n} ÷ ${b} = ${q} あまり ${r}　答え ${q}人に くばれて ${r}まい あまる`,steps:[`たしかめ ${b} × ${q} + ${r} = ${n}`]}),
   ()=>({q:`${n}この ボールを、1回に ${b}こずつ はこぶと、全部 はこぶには 何回 かかりますか。`,a:`式 ${n} ÷ ${b} = ${q} あまり ${r}　答え ${q+1}回`,steps:[`のこりの ${r}こ を はこぶのに もう 1回`]}),
  ])()}},
 'g3-bignum':{id:'g3-bignum',title:'大きい 数（一万を こえる 数）',kind:'calc',n:14,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'4けたずつ 区切る',b:'一の位から 4けたずつ 区切ると、読みやすく なります。千の 10こ分が 一万、千万の 10こ分が 一億です。',ex:'3502|0400 → 三千五百二万四百'},{h:'10倍、100倍、10で わる',b:'10倍すると 位が 1つ 上がり、右に 0 が 1こ つきます。一の位が 0 の 数を 10 で わると、0 を 1こ とった 数に なります。'}],tip:'<b>こつ</b>　位の ひょう（千万・百万・十万・一万・千・百・十・一）に 数字を 書くと まちがえにくいです。'},
  gen(){const t=ri(0,6);
   if(t===0){const n=ri(1,9999)*10000+(chance(.6)?ri(0,9999):0);return{q:`${toKanji(n)} を 数字で 書くと {_}`,tail:'',a:String(n),steps:['万の 前と 後ろに 分けて、4けたずつ 数字に する']}}
   if(t===1){const k=ri(11,99);return{q:`1000 を ${k}こ あつめた 数は {_}`,tail:'',a:String(k*1000),steps:[`1000 が 10こ で 10000`,`${k*1000}`]}}
   if(t===2){const k=ri(12,99)*10;return{q:`${k*100} は 100 を {_}こ あつめた 数`,tail:'',a:String(k),steps:[`${k*100} ÷ 100 = ${k}`]}}
   if(t===3){const n=ri(21,999),k=pick([10,100]);return{q:`${n} を ${k}倍した 数は {_}`,tail:'',a:String(n*k),steps:[`${k===10?'0 を 1こ':'0 を 2こ'} つける`]}}
   if(t===4){const n=ri(12,999)*10;return{q:`${n} を 10 で わった 数は {_}`,tail:'',a:String(n/10),steps:['一の位の 0 を とる']}}
   if(t===5){const n=ri(10000,99999999);const s=String(n),pos=ri(0,Math.min(7,s.length-1));const names=['一','十','百','千','一万','十万','百万','千万'];return{q:`${n.toLocaleString('ja-JP')} の ${names[pos]}の位の 数字は {_}`,tail:'',a:s[s.length-1-pos],steps:['一の位から 数える']}}
   const a=ri(2,60),b=ri(2,40),op=chance(.5);if(!op&&a<=b)return this.gen();return{q:`${a}万 ${op?'+':'−'} ${b}万 = {_}万`,tail:'',a:String(op?a+b:a-b),steps:[`1万が ${a}こ と ${b}こ`,`${op?a+b:a-b}万`]}}},
 'g3-bigline':{id:'g3-bigline',title:'大きい 数の 数直線',kind:'fig',n:4,cols:1,lead:'↓の さして いる 数を 書きましょう。',parts:['ア','イ'],
  explain:{points:[{h:'1目もりの 大きさ',b:'まず、数が 書いて ある 目もりの 間が いくつに 区切られて いるかを 数えて、1目もりの 大きさを 見つけます。',ex:'0 と 10000 の 間が 10目もり → 1目もりは 1000'},{h:'目もりを 数える',b:'近くの 数から、目もりの 数だけ 1目もりの 大きさを たして いきます。'}],tip:'<b>こつ</b>　大きい 目もり（長い 線）と 小さい 目もりを 区別しましょう。'},
  gen(){const step=pick([100,1000,10000,100000]),base=ri(0,9)*step*10,a=base,b=base+step*10;const p1=ri(1,9),p2=ri(11,19);const B=base+step*20;
   const x0=6,x1=146;let g=numLine(x0,x1,16,a,B,step,v=>(v-a)%(step*10)===0);const u=(x1-x0)/20;
   const arr=(i,t)=>`<path d="M${num(x0+i*u)},4 V12 m-1.6,-2.4 l1.6,2.4 l1.6,-2.4" fill="none" stroke="#c0392b" stroke-width=".7"/>`+T(x0+i*u,3.5,t,3.8);g+=arr(p1,'ア')+arr(p2,'イ');
   return{q:`<div class="fig" style="max-width:150mm">${SVGW('0 0 152 26',g)}</div>`,parts:['ア','イ'],a:`ア ${(a+p1*step).toLocaleString('ja-JP')}　イ ${(a+p2*step).toLocaleString('ja-JP')}`,steps:[`1目もりは ${step.toLocaleString('ja-JP')}`,`ア：${a.toLocaleString('ja-JP')} から ${p1}目もり`,`イ：${b.toLocaleString('ja-JP')} から ${p2-10}目もり`]}}},
 'g3-decstruct':{id:'g3-decstruct',title:'小数の しくみ',kind:'calc',n:14,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'0.1 が いくつ',b:'1 を 10こに 分けた 1つ分が 0.1 です。2.3 は 0.1 が 23こ 分です。'},{h:'たんいと 小数',b:'1dL = 0.1L、1mm = 0.1cm です。',ex:'1L 6dL = 1.6L'}],tip:'<b>こつ</b>　小数点の 左が 一の位、右が 小数第一位（1/10の位）です。'},
  gen(){const t=ri(0,5);
   if(t===0){const k=ri(11,99);return{q:`0.1 を ${k}こ あつめた 数は {_}`,tail:'',a:num(k/10),steps:[`0.1 が 10こ で 1`,`${num(k/10)}`]}}
   if(t===1){const k=ri(11,99);return{q:`${num(k/10)} は 0.1 を {_}こ あつめた 数`,tail:'',a:String(k),steps:[`${Math.floor(k/10)} は 0.1 が ${Math.floor(k/10)*10}こ、0.${k%10} は ${k%10}こ`]}}
   if(t===2){const L=ri(1,5),d=ri(1,9);return chance(.5)?{q:`${L}L ${d}dL = {_}L`,tail:'',a:num(L+d/10),steps:['1dL = 0.1L']}:{q:`${num(L+d/10)}L = {_}dL`,tail:'',a:String(L*10+d),steps:['1L = 10dL']}}
   if(t===3){const c=ri(1,20),m=ri(1,9);return chance(.5)?{q:`${c}cm ${m}mm = {_}cm`,tail:'',a:num(c+m/10),steps:['1mm = 0.1cm']}:{q:`${num(c+m/10)}cm = {_}mm`,tail:'',a:String(c*10+m),steps:['1cm = 10mm']}}
   if(t===4){const w=ri(1,9),d=ri(1,9);return{q:`${w} と 0.${d} を あわせた 数は {_}`,tail:'',a:num(w+d/10),steps:[`${w} + 0.${d}`]}}
   const v=ri(11,99)/10;return{q:`${num(v)} の 小数第一位の 数字は {_}`,tail:'',a:String(Math.round(v*10)%10),steps:['小数点の すぐ 右の 数字']}}},
 'g3-fracmean':{id:'g3-fracmean',title:'分数の いみ',kind:'fig',n:6,cols:2,lead:'色の ついた ところの 長さ（かさ）を 分数で 書きましょう。',
  explain:{points:[{h:'等分した いくつ分',b:'1m を 同じ 長さに 4つに 分けた 1つ分が 1/4m、3つ分が 3/4m です。'},{h:'分母と 分子',b:'下の 数（分母）は いくつに 分けたか、上の 数（分子）は その いくつ分かを あらわします。'}],tip:'<b>ちゅうい</b>　分けた 数と 同じ 数 あつまると 1 に なります（4/4 = 1）。'},
  gen(){const d=ri(2,8),k=ri(1,d),u=chance(.5)?'m':'L';const W=60,w=W/d;let g='';
   if(u==='m'){for(let i=0;i<d;i++)g+=box(4+i*w,6,w,8,i<k?CB:'#fff',.5);g+=T(4,22,'0',3.4)+T(4+W,22,'1m',3.4)+`<line x1="4" y1="17" x2="${4+W}" y2="17" stroke="#111" stroke-width=".4"/>`;}
   else{g+=`<rect x="20" y="2" width="26" height="40" fill="#fff" stroke="#111" stroke-width=".7"/>`;for(let i=0;i<d;i++){const h=40/d;g+=`<rect x="20" y="${num(42-(i+1)*h)}" width="26" height="${num(h)}" fill="${i<k?CB:'#fff'}" stroke="#111" stroke-width=".35"/>`}g+=T(50,6,'1L',3.4,'start')}
   const ans=k===d?`${F(k,d)}${u}（= 1${u}）`:`${F(k,d)}${u}`;return{q:`<div class="fig" style="max-width:${u==='m'?62:30}mm">${SVGW(u==='m'?'0 0 70 25':'0 0 66 44',g)}</div>`,a:`<b>${ans}</b>`,steps:[`1${u} を ${d}つに 分けた ${k}こ分`]}}},
 'g3-soroban':{id:'g3-soroban',title:'そろばん',kind:'fig',n:6,cols:2,lead:'そろばんに 入って いる 数を 書きましょう。（赤い 点の ついた けたが 一の位です）',
  explain:{points:[{h:'玉の あらわす 数',b:'はりより 上の 玉（五玉）は 1つで 5、下の 玉（一玉）は 1つで 1 を あらわします。はりに くっついて いる 玉だけを 数えます。'},{h:'位',b:'赤い 点（定位点）の ついた けたが 一の位、その 右が 小数第一位です。'}],tip:'<b>こつ</b>　1けたずつ、五玉が 下りて いるか（5）と、一玉が いくつ 上がって いるかを たします。'},
  gen(){const dec=chance(.4);const v=dec?ri(11,9999)/10:ri(100,9999);return{q:`<div class="fig" style="max-width:46mm">${soroSVG(v,dec)}</div>`,a:`<b>${num(v)}</b>`,steps:['はりに くっついた 玉を けたごとに 数える','五玉は 5、一玉は 1']}}},
 'g3-circleword':{id:'g3-circleword',title:'円と 球の もんだい',kind:'fig',n:4,cols:2,lead:'図を 見て 答えましょう。',
  explain:{points:[{h:'直径は 半径の 2倍',b:'円や 球の 直径は、半径の 2つ分の 長さです。'},{h:'ならべた ボール',b:'ボールを まっすぐ ならべた 長さは、直径 × ボールの 数 です。'}],tip:'<b>こつ</b>　図に 直径の 線を 書きこんで 考えましょう。'},
  gen(){const n=ri(2,5),r=ri(2,6),d=2*r,s=Math.min(60/(n*d),24/d);const W=n*d*s,H=d*s;let g=`<rect x="4" y="4" width="${num(W)}" height="${num(H)}" fill="#fff" stroke="#111" stroke-width=".8"/>`;for(let i=0;i<n;i++)g+=`<circle cx="${num(4+(i+.5)*d*s)}" cy="${num(4+H/2)}" r="${num(r*s)}" fill="${CB}" stroke="#111" stroke-width=".5"/>`;
   const ask=ri(0,1);if(ask===0){g+=T(4+W/2,4+H+6,'□cm',3.8)+T(4+W+2,4+H/2+1.3,`${d}cm`,3.6,'start');return{q:`<div class="fig" style="max-width:62mm">${SVGW(`0 0 ${num(W+22)} ${num(H+12)}`,g)}</div><div class="figcap">同じ 大きさの ボールが ${n}こ ぴったり 入って います。箱の よこの 長さは 何cm ですか。</div>`,a:`<b>${n*d}cm</b>`,steps:[`ボールの 直径は 箱の たての 長さと 同じ ${d}cm`,`${d} × ${n} = ${n*d}`]}}
   g+=T(4+W/2,4+H+6,`${n*d}cm`,3.8);return{q:`<div class="fig" style="max-width:62mm">${SVGW(`0 0 ${num(W+10)} ${num(H+12)}`,g)}</div><div class="figcap">同じ 大きさの ボールが ${n}こ ぴったり 入って います。ボールの 半径は 何cm ですか。</div>`,a:`<b>${r}cm</b>`,steps:[`直径は ${n*d} ÷ ${n} = ${d}`,`半径は ${d} ÷ 2 = ${r}`]}}},
 'g3-line':{id:'g3-line',title:'じゅんばんと 間の 数（考える もんだい）',kind:'word',n:5,cols:1,lead:'図を かいて 考え、答えましょう。',parts:['答え'],
  explain:{points:[{h:'じゅんばんの もんだい',b:'前から 5番目で 後ろから 3番目なら、その 人を 2回 数えて いるので、5 + 3 − 1 = 7人 です。'},{h:'間の 数',b:'木が 5本 ならんで いると、木と 木の 間は 4つです。'}],tip:'<b>こつ</b>　○を ならべた 図を かいて、ていねいに 数えましょう。'},
  gen(){return pick([
   ()=>{const f=ri(3,12),b=ri(3,12);return{q:`子どもが 1れつに ならんで います。ゆいさんは 前から ${f}番目で、後ろから ${b}番目です。全部で 何人 ならんで いますか。`,parts:['答え'],a:`答え ${f+b-1}人`,steps:[`${f} + ${b} で ゆいさんを 2回 数えて いる`,`${f} + ${b} − 1 = ${f+b-1}`]}},
   ()=>{const N=ri(12,25),f=ri(2,6),b=ri(2,6);return{q:`${N}人が 1れつに ならんで います。前から ${f}番目の 人と、後ろから ${b}番目の 人の 間には 何人 いますか。`,parts:['答え'],a:`答え ${N-f-b}人`,steps:[`後ろから ${b}番目は 前から ${N-b+1}番目`,`${f}番目と ${N-b+1}番目の 間 → ${N-b+1} − ${f} − 1 = ${N-f-b}`]}},
   ()=>{const k=ri(4,9),d=pick([2,3,4,5]);return{q:`まっすぐな 道に、${d}m おきに 木が ${k}本 ならんで います（はしにも 木が あります）。はしの 木から はしの 木までは 何m ですか。`,parts:['答え'],a:`答え ${d*(k-1)}m`,steps:[`木が ${k}本 → 間は ${k-1}こ`,`${d} × ${k-1} = ${d*(k-1)}`]}},
   ()=>{const a=ri(20,60),b=ri(20,60),o=ri(3,9);return{q:`${a}cm と ${b}cm の テープを、${o}cm かさねて つなぎました。全体の 長さは 何cm ですか。`,parts:['答え'],a:`答え ${a+b-o}cm`,steps:[`かさねた ${o}cm は 2回 数えて いる`,`${a} + ${b} − ${o} = ${a+b-o}`]}},
  ])()}},
 'g3-tape':{id:'g3-tape',title:'まきじゃくの 目もり',kind:'fig',n:4,cols:1,lead:'↓の さして いる 長さを 書きましょう。',parts:['ア','イ'],
  explain:{points:[{h:'1目もりは 1cm',b:'まきじゃくの 小さい 目もり 1つは 1cm、10目もりで 10cm です。'},{h:'m と cm',b:'100cm = 1m です。2m の 目もりから 何cm 先かを 数えます。'}],tip:'<b>こつ</b>　長い 目もり（10cmごと）を 先に 見つけて、そこから 数えましょう。'},
  gen(){const m=ri(1,9),c0=ri(0,6)*10;const start=m*100+c0;const x0=6,x1=146,u=(x1-x0)/40;let g=`<rect x="2" y="9" width="148" height="12" fill="#fdf4c8" stroke="#111" stroke-width=".5"/>`;
   for(let i=0;i<=40;i++){const v=start+i,big=v%10===0,mid=v%5===0;g+=`<line x1="${num(x0+i*u)}" y1="9" x2="${num(x0+i*u)}" y2="${big?15:mid?13.5:12}" stroke="#111" stroke-width="${big?.5:.3}"/>`;if(big)g+=T(x0+i*u,19.5,v%100===0?`${v/100}m`:String(v%100),3)}
   const p1=ri(1,19),p2=ri(21,39);const arr=(i,t)=>`<path d="M${num(x0+i*u)},1 V8 m-1.4,-2 l1.4,2 l1.4,-2" fill="none" stroke="#c0392b" stroke-width=".7"/>`+T(x0+i*u+3,4,t,3.6,'start');g+=arr(p1,'ア')+arr(p2,'イ');
   const f=v=>`${Math.floor(v/100)}m ${v%100}cm`;return{q:`<div class="fig" style="max-width:150mm">${SVGW('0 0 152 23',g)}</div><div class="figcap">（目もりの 数は ${m}m を こえた cm を あらわします）</div>`,parts:['ア','イ'],a:`ア ${f(start+p1)}　イ ${f(start+p2)}`,steps:['小さい 1目もりは 1cm',`ア：${f(start)} から ${p1}目もり`,`イ：${f(start)} から ${p2}目もり`]}}},
 'g3-wcalc':{id:'g3-wcalc',title:'重さの 計算',kind:'calc',n:14,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'重さの たんい',b:'1kg = 1000g、1t = 1000kg です。'},{h:'同じ たんいどうしで 計算',b:'kg は kg どうし、g は g どうしで 計算します。g が 1000 を こえたら 1kg に くり上げます。',ex:'1kg 700g + 500g = 1kg 1200g = 2kg 200g'}],tip:'<b>こつ</b>　ひけない ときは、1kg を 1000g に なおして ひきます。'},
  gen(){const t=ri(0,4);
   if(t===0){const g=ri(11,49)*100;return{q:`${g}g = {_}kg {_}g`,tail:'',blanks:[Math.floor(g/1000),g%1000],a:`${Math.floor(g/1000)}、${g%1000}`,steps:['1000g = 1kg']}}
   if(t===1){const k=ri(1,5),g=ri(1,9)*100;return{q:`${k}kg ${g}g = {_}g`,tail:'',a:String(k*1000+g),steps:[`${k}kg = ${k*1000}g`]}}
   if(t===2){const k=ri(1,4),g1=ri(2,9)*100,g2=ri(2,9)*100,s=k*1000+g1+g2;return{q:`${k}kg ${g1}g + ${g2}g = {_}kg {_}g`,tail:'',blanks:[Math.floor(s/1000),s%1000],a:`${Math.floor(s/1000)}、${s%1000}`,steps:[`${g1} + ${g2} = ${g1+g2}g`,g1+g2>=1000?'1000g を 1kg に くり上げる':'g は 1000 より 小さい']}}
   if(t===3){const k=ri(2,5),g1=ri(1,8)*100,g2=ri(g1/100+1,9)*100,s=k*1000+g1-g2;return{q:`${k}kg ${g1}g − ${g2}g = {_}kg {_}g`,tail:'',blanks:[Math.floor(s/1000),s%1000],a:`${Math.floor(s/1000)}、${s%1000}`,steps:[`${g1}g から ${g2}g は ひけない`,`1kg を 1000g に して ${1000+g1} − ${g2} = ${1000+g1-g2}`]}}
   const k=ri(2,9);return{q:`${k}t = {_}kg`,tail:'',a:String(k*1000),steps:['1t = 1000kg']}}},
 'g3-angle':{id:'g3-angle',title:'角の 大きさくらべ',kind:'fig',n:4,cols:2,lead:'角の 大きい じゅんに 記ごうを ならべましょう。',
  explain:{points:[{h:'角とは',b:'1つの 点から 出て いる 2本の 直線が つくる 形を 角と いいます。'},{h:'角の 大きさ',b:'角の 大きさは、2本の 辺の ひらきぐあいで きまります。辺の 長さには かんけい ありません。'}],tip:'<b>こつ</b>　うすい 紙に 角を うつしとって、かさねて くらべましょう。'},
  gen(){let as;do{as=[ri(2,16)*10,ri(2,16)*10,ri(2,16)*10]}while(new Set(as).size<3||Math.min(Math.abs(as[0]-as[1]),Math.abs(as[1]-as[2]),Math.abs(as[0]-as[2]))<20);
   const ls=as.map(a=>{const big=a>=Math.max(...as);return{l1:big?ri(10,13):ri(18,26),l2:big?ri(10,13):ri(18,26)}});const list=as.map((a,i)=>({a,n:'アイウ'[i],...ls[i]}));const s=angSVG(list);
   const ord=list.slice().sort((x,y)=>y.a-x.a).map(o=>o.n);return{q:`<div class="fig" style="max-width:80mm">${SVGW(`0 0 ${num(s.w)} 44`,s.g)}</div>`,a:`<b>${ord.join(' → ')}</b>`,steps:['辺の 長さでは なく、ひらきぐあいで くらべる',`大きい じゅんに ${ord.join('、')}`]}}},
};

/* ---------- 3年の章を 教科書の 流れに ならべかえる ---------- */
(()=>{const pool={};GRADE_UNITS[3].forEach(c=>c.items.forEach(u=>{pool[u.id]=u}));Object.assign(pool,NEW3);
  const plan=[
   ['かけ算の きまり',['g3-mulrule','g3-mul10']],
   ['時こくと 時間',['g3-timeclock','g3-time2']],
   ['わり算',['g3-div0','g3-divword']],
   ['表と ぼうグラフ',['g3-table','g3-bar','g3-bar-draw']],
   ['たし算と ひき算の ひっ算',['g3-add','g3-sub','g3-hissan','g3-word','g3-mental']],
   ['長さ',['g3-tape','g3-units']],
   ['あまりの ある わり算',['g3-div','g3-remword']],
   ['大きい 数',['g3-bignum','g3-bigline','g3-compare']],
   ['かけ算の ひっ算',['g3-mul','g3-hissan-mul']],
   ['円と 球',['g3-ball','g3-circleword']],
   ['小数',['g3-decstruct','g3-dec','g3-decline']],
   ['重さ',['g3-scale','g3-wcalc']],
   ['分数',['g3-fracmean','g3-frac','g3-fracword']],
   ['□を つかった 式',['g3-box']],
   ['三角形と 角',['g3-tri','g3-angle']],
   ['そろばん',['g3-soroban']],
   ['考える もんだい',['g3-line']]];
  const used=new Set(),chs=plan.map(([ch,ids])=>({ch,items:ids.filter(id=>pool[id]).map(id=>{used.add(id);return pool[id]})}));
  const rest=Object.keys(pool).filter(id=>!used.has(id));if(rest.length)chs[chs.length-1].items.push(...rest.map(id=>pool[id]));GRADE_UNITS[3]=chs})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['g3-mulrule']=()=>{let g='';for(let r=0;r<3;r++)for(let c=0;c<5;c++)g+=dot(8+c*7,8+r*7,2.6,c<4?CB:CR);g+=T(22,32,'3 × 5',3.6)+T(56,12,'3 × 4 に',3.4,'start')+T(56,19,'3 を たすと',3.4,'start')+T(56,26,'3 × 5',3.4,'start');
  return W1(SVGW('0 0 100 36',g),'かける数が 1 ふえると',['●が 3こずつ ならんだ 列が 1つ ふえると、3こ ふえる','だから 3 × 5 = 3 × 4 + 3','よこに 見ると 5 × 3 なので、3 × 5 = 5 × 3'])};
WHY['g3-timeclock']=()=>{let g=`<line x1="6" y1="16" x2="114" y2="16" stroke="#111" stroke-width=".6"/>`;[[6,'8:40'],[60,'9:00'],[114,'9:15']].forEach(([x,t])=>g+=`<line x1="${x}" y1="13" x2="${x}" y2="19" stroke="#111" stroke-width=".6"/>`+T(x,25,t,3.4));g+=T(33,11,'20分',3.6)+T(87,11,'15分',3.6)+T(60,32,'あわせて 35分',3.6);
  return W1(SVGW('0 0 120 35',g),'ちょうどの 時こくで 区切る',['8時40分から 9時までは 20分','9時から 9時15分までは 15分','20分 + 15分 = 35分'])};
WHY['g3-div0']=()=>{let g='';for(let i=0;i<12;i++)g+=dot(8+(i%6)*7,8+Math.floor(i/6)*7,2.6,CB);g+=arrowR(50,12,62,'');for(let k=0;k<3;k++)for(let j=0;j<4;j++)g+=dot(68+k*16+(j%2)*6,6+Math.floor(j/2)*7,2.4,[CB,CR,CG][k]);g+=T(90,28,'3人に 分けると 4こずつ',3.2);
  return W1(SVGW('0 0 120 32',g),'12 ÷ 3',['12こを 3人に 同じ 数ずつ 分けると、1人 4こ','3 × 4 = 12 なので、九九で 答えが 見つかる'])};
WHY['g3-remword']=()=>{let g='';for(let i=0;i<7;i++){g+=box(4+i*15,6,13,9,i<6?CB:CR,.4);const k=i<6?4:3;for(let j=0;j<k;j++)g+=dot(7+i*15+j*2.8,10.5,1,'#111')}g+=T(52,24,'27人 → 4人ずつ 6きゃく と 3人',3.3)+T(52,31,'のこりの 3人にも 1きゃく いる → 7きゃく',3.3);
  return W1(SVGW('0 0 112 34',g),'あまりを どうする？',['27 ÷ 4 = 6 あまり 3','6きゃくだと 3人が すわれないので、もう 1きゃく いる','「何こ 買えるか」のときは、あまりでは 買えないので 商が 答え'])};
WHY['g3-bignum']=()=>{const H=['千','百','十','一','千','百','十','一'];let g='';H.forEach((h,i)=>{g+=box(4+i*12,4,12,7,i<4?CR:'#eef4fb',.3)+T(10+i*12,9,h,3)});g+=T(28,15.5,'万の グループ',3)+T(76,15.5,'一の グループ',3);'35020400'.split('').forEach((d,i)=>g+=box(4+i*12,18,12,9,'#fff',.3)+T(10+i*12,24.5,d,4.2));
  return W1(SVGW('0 0 104 30',g),'4けたずつ 区切って 読む',['一の位から 4けたで 区切ると、左の グループに「万」が つく','3502|0400 → 三千五百二 万 四百'])};
WHY['g3-bigline']=()=>{let g=numLine(6,106,14,0,10000,1000,v=>v%5000===0);g+=`<path d="M${6+30},4 V10 m-1.4,-2 l1.4,2 l1.4,-2" fill="none" stroke="#c0392b" stroke-width=".7"/>`+T(36,3.5,'3000',3.2);
  return W1(SVGW('0 0 112 24',g),'1目もりは いくつ？',['0 から 10000 までが 10目もり → 1目もりは 1000','↓は 0 から 3目もり → 3000'])};
WHY['g3-decstruct']=()=>{let g='';for(let i=0;i<2;i++)g+=box(4+i*12,4,10,24,CB,.4);for(let i=0;i<10;i++)g+=`<rect x="30" y="${4+i*2.4}" width="10" height="2.4" fill="${i>=7?CB:'#fff'}" stroke="#111" stroke-width=".25"/>`;g+=T(9,33,'1',3.4)+T(21,33,'1',3.4)+T(35,33,'0.3',3.4)+T(50,14,'1L が 2こ と',3.4,'start')+T(50,21,'0.1L が 3こ',3.4,'start')+T(50,28,'→ 2.3L',3.6,'start');
  return W1(SVGW('0 0 100 36',g),'0.1 の いくつ分',['1 を 10こに 分けた 1つ分が 0.1','2.3 は 1 が 2こ と 0.1 が 3こ、0.1 が 23こ 分'])};
WHY['g3-fracmean']=()=>{let g='';for(let i=0;i<4;i++)g+=box(4+i*15,6,15,8,i<3?CB:'#fff',.5);g+=T(4,20,'0',3.4)+T(64,20,'1m',3.4)+T(11.5,4,'1/4',3)+T(70,12,'1/4 が 3こ = 3/4m',3.4,'start');
  return W1(SVGW('0 0 122 24',g),'4等分した 3つ分',['1m を 同じ 長さに 4つに 分けた 1つ分が 1/4m','その 3つ分が 3/4m。4つ分で 4/4m = 1m'])};
WHY['g3-soroban']=()=>W1(soroSVG(306.7,true),'306.7 の 入れ方',['百の位：一玉 3こ → 3','十の位：玉なし → 0','一の位（赤い 点）：五玉 1こ と 一玉 1こ → 6','小数第一位：五玉 と 一玉 2こ → 7']);
WHY['g3-circleword']=()=>{let g=`<rect x="4" y="4" width="72" height="24" fill="#fff" stroke="#111" stroke-width=".7"/>`;for(let i=0;i<3;i++)g+=`<circle cx="${16+i*24}" cy="16" r="12" fill="${CB}" stroke="#111" stroke-width=".5"/><line x1="${4+i*24}" y1="16" x2="${28+i*24}" y2="16" stroke="#c0392b" stroke-width=".6"/>`;g+=T(84,14,'直径 × 3',3.4,'start')+T(84,21,'= 箱の よこ',3.4,'start');
  return W1(SVGW('0 0 120 32',g),'直径を ならべる',['ボールの 直径は 箱の たての 長さと 同じ','ボールを 3こ ならべると、箱の よこは 直径の 3つ分'])};
WHY['g3-line']=()=>{let g='';for(let i=0;i<7;i++)g+=`<circle cx="${8+i*12}" cy="14" r="4" fill="${i===4?CR:'#fff'}" stroke="#111" stroke-width=".5"/>`;g+=`<path d="M4,6 H58" stroke="#2a6fb0" stroke-width=".8"/>`+T(30,4,'前から 5番目',3)+`<path d="M50,24 H88" stroke="#c0392b" stroke-width=".8"/>`+T(70,30,'後ろから 3番目',3)+T(96,14,'5 + 3 − 1 = 7人',3.4,'start');
  return W1(SVGW('0 0 128 33',g),'2回 数えた 人を ひく',['前から 5番目 と 後ろから 3番目 を たすと、赤い 人を 2回 数えて いる','だから 1 ひいて 7人'])};
WHY['g3-tape']=()=>{let g=`<rect x="2" y="6" width="116" height="10" fill="#fdf4c8" stroke="#111" stroke-width=".5"/>`;for(let i=0;i<=20;i++)g+=`<line x1="${6+i*5.4}" y1="6" x2="${6+i*5.4}" y2="${i%10?9:12}" stroke="#111" stroke-width=".3"/>`;g+=T(6,15,'2m',3)+T(60,15,'10',3)+T(114,15,'20',3)+`<path d="M${6+13*5.4},0 V5" stroke="#c0392b" stroke-width=".7"/>`+T(6+13*5.4,24,'2m 13cm',3.4);
  return W1(SVGW('0 0 120 26',g),'2m から 何cm 先か',['小さい 目もり 1つは 1cm、長い 目もりは 10cm ごと','2m の 目もりから 13目もり 先 → 2m 13cm'])};
WHY['g3-wcalc']=()=>{let g=box(4,6,26,12,CB,.5)+T(17,13.5,'1kg',3.6)+T(36,13.5,'=',4)+box(42,6,70,12,'#fff',.5);for(let i=0;i<10;i++)g+=`<line x1="${42+i*7}" y1="6" x2="${42+i*7}" y2="18" stroke="#999" stroke-width=".3"/>`;g+=T(77,13.5,'1000g（100g が 10こ）',3.2)+T(58,27,'g が 1000 を こえたら 1kg に くり上げ',3.2);
  return W1(SVGW('0 0 116 30',g),'1kg = 1000g',['1kg は 1000g と 同じ 重さ','g どうしを たして 1000g を こえたら、1kg に くり上げる'])};
WHY['g3-angle']=()=>{const s=angSVG([{a:60,n:'ア',l1:30,l2:30},{a:60,n:'イ',l1:12,l2:12}]);return W1(SVGW(`0 0 ${num(s.w)} 44`,s.g),'辺の 長さと 角の 大きさ',['アと イは 辺の 長さが ちがうが、ひらきぐあいは 同じ','角の 大きさは 辺の 長さでは なく、ひらきぐあいで きまる'])};
