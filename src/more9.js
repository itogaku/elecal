/* ============ 資料F（小5、教科書にそった例題つき問題集）をもとにした追加 ============ */
const yen=n=>n.toLocaleString('ja-JP');
const NEW5F={
 'g5-plant':{id:'g5-plant',title:'間の数（植木算）',kind:'word',n:5,cols:1,lead:'図をかいて考え、式と答えを書きましょう。',
  explain:{points:[{h:'まっすぐな線で両はしにもある',b:'木の数 ＝ 間の数 ＋ 1',ex:'12m に 3m おき → 間は 12 ÷ 3 = 4、木は 5本'},{h:'まわり（輪）にならべる',b:'池のまわりのように、はじめと終わりがつながっているときは、木の数 ＝ 間の数'}],tip:'<b>こつ</b>　短い長さで図をかいて、「間」と「木」の数を数えてみましょう。'},
  gen(){const d=pick([2,3,4,5,6,8,10]),k=ri(4,15),L=d*k;return pick([
   ()=>({q:`長さ ${L}m のまっすぐな道の片がわに、はしからはしまで ${d}m おきに木を植えます。両はしにも植えると、木は何本いりますか。`,a:`式 ${L} ÷ ${d} + 1 = ${k+1}　答え ${k+1}本`,steps:[`間の数 ${L} ÷ ${d} = ${k}`,'両はしにも植えるので、木は間の数より 1 多い']}),
   ()=>({q:`長さ ${L}m のまっすぐな道に、${d}m おきにはたを立てます。片方のはしには立てて、もう片方のはしには立てません。はたは何本いりますか。`,a:`式 ${L} ÷ ${d} = ${k}　答え ${k}本`,steps:[`間の数 ${L} ÷ ${d} = ${k}`,'片方のはしにだけ立てるので、はたの数 ＝ 間の数']}),
   ()=>({q:`まわりの長さが ${L}m の池のまわりに、${d}m おきにくいを打ちます。くいは何本いりますか。`,a:`式 ${L} ÷ ${d} = ${k}　答え ${k}本`,steps:[`間の数 ${L} ÷ ${d} = ${k}`,'まわりはつながっているので、くいの数 ＝ 間の数']}),
   ()=>({q:`まっすぐな線の上に、${k+1}人の子どもが ${d}m おきにならびました。いちばん前からいちばん後ろまでは何m ですか。`,a:`式 ${d} × (${k+1} − 1) = ${L}　答え ${L}m`,steps:[`${k+1}人の間は ${k}こ`,`${d} × ${k} = ${L}`]}),
   ()=>{const s=ri(3,9);return{q:`1辺が ${s}m の正方形の形に、1m おきに人がならんで人文字をつくります。かどにも人が立つとき、全部で何人いりますか。`,a:`式 ${s} × 4 = ${4*s}　答え ${4*s}人`,steps:[`まわりの長さは ${s} × 4 = ${4*s}m`,'まわりはつながっているので、人数 ＝ 間の数']}},
  ])()}},
 'g5-estimate':{id:'g5-estimate',title:'見積もり（足りる？こえる？）',kind:'word',n:5,cols:1,lead:'見積もりを使って答えましょう。どのように見積もったかも書きましょう。',parts:['答え'],
  explain:{points:[{h:'足りるかどうか → 多めに見積もる',b:'代金を切り上げて多めに見積もり、それでも持っているお金以下なら、必ず足ります。'},{h:'こえるかどうか → 少なめに見積もる',b:'代金を切り捨てて少なめに見積もり、それでも決まった金額以上なら、必ずこえます。'}],tip:'<b>こつ</b>　何を知りたいかで、切り上げるか切り捨てるかを決めます。'},
  gen(){const up=chance(.5),n=ri(2,3);for(;;){const ps=Array.from({length:n},()=>ri(11,59)*100+ri(1,99));const ce=ps.map(p=>Math.ceil(p/1000)*1000),fl=ps.map(p=>Math.floor(p/1000)*1000);const sc=ce.reduce((a,b)=>a+b,0),sf=fl.reduce((a,b)=>a+b,0);
   if(up&&chance(.35)){const B=sf-1000;if(B<=0||sc-sf<2000)continue;return{q:`${ps.map(p=>yen(p)+'円').join('、')} の品物を買います。${yen(B)}円で足りますか。`,parts:['答え'],a:`答え 足りない（${fl.map(yen).join(' + ')} = ${yen(sf)} で、${yen(B)}円より多い）`,steps:['足りないことを確かめるには、代金を少なめに（切り捨てて）見積もる',`${ps.map(yen).join('、')} → ${fl.map(yen).join('、')}`,`少なめに見積もっても ${yen(sf)}円で、${yen(B)}円をこえるので足りない`]}}
   if(up){const B=sc;if(sf>=B-1000)continue;return{q:`${ps.map(p=>yen(p)+'円').join('、')} の品物を買います。${yen(B)}円で足りますか。`,parts:['答え'],a:`答え 足りる（${ce.map(yen).join(' + ')} = ${yen(sc)} で、${yen(B)}円以下）`,steps:['足りるかどうかは、代金を多めに（切り上げて）見積もる',`${ps.map(yen).join('、')} → ${ce.map(yen).join('、')}`,`多めに見積もっても ${yen(sc)}円なので、必ず足りる`]}}
   const T=sf;if(sc<=T+1000)continue;return{q:`買い物の合計が ${yen(T)}円以上だと、くじが引けます。${ps.map(p=>yen(p)+'円').join('、')} の品物を買うと、くじは引けますか。`,parts:['答え'],a:`答え 引ける（${fl.map(yen).join(' + ')} = ${yen(sf)} で、${yen(T)}円以上）`,steps:['こえるかどうかは、代金を少なめに（切り捨てて）見積もる',`${ps.map(yen).join('、')} → ${fl.map(yen).join('、')}`,`少なめに見積もっても ${yen(sf)}円なので、必ず ${yen(T)}円以上`]}}}},
 'g5-prime':{id:'g5-prime',title:'素数（発展）',kind:'word',n:6,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'素数',b:'1とその数自身のほかに約数がない数を素数といいます。1は素数ではありません。',ex:'2, 3, 5, 7, 11, 13, …'},{h:'素数のかけ算で表す',b:'素数でない数は、素数だけのかけ算で表すことができます。',ex:'12 = 2 × 2 × 3'}],tip:'<b>こつ</b>　2, 3, 5, 7 で順にわってみて、わり切れるかを調べます。'},
  gen(){const isP=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true};return pick([
   ()=>{const a=ri(1,8)*10,b=a+20;const ps=[];for(let i=a;i<=b;i++)if(isP(i))ps.push(i);return{q:`${a} から ${b} までの整数のうち、素数をすべて答えましょう。`,parts:['答え'],a:`答え ${ps.join('、')}`,steps:['2, 3, 5, 7 でわり切れるか調べる（その数自身はのぞく）',`わり切れない数が素数：${ps.join('、')}`]}},
   ()=>{let n;do{n=ri(12,120)}while(isP(n));const f=[];let m=n;for(let d=2;m>1;)if(m%d===0){f.push(d);m/=d}else d++;return{q:`${n} を、素数だけのかけ算で表しましょう。`,parts:['答え'],a:`答え ${n} = ${f.join(' × ')}`,steps:[`小さい素数から順にわっていく`,f.map((d,i)=>`${f.slice(i).reduce((a,b)=>a*b,1)} ÷ ${d}`).join(' → ')]}},
   ()=>{const ns=shuffle([...Array(6)].map(()=>ri(2,99)));const ps=ns.filter(isP);if(!ps.length)ns[0]=pick([17,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]);const ok=ns.filter(isP);return{q:`つぎの数のうち、素数をすべて選びましょう。　${ns.join('、')}`,parts:['答え'],a:`答え ${ok.join('、')}`,steps:ns.filter(n=>!isP(n)).slice(0,3).map(n=>{let d=2;while(n%d)d++;return `${n} は ${d} でわり切れる → 素数ではない`})}},
  ])()}},
 'g5-kariavg':{id:'g5-kariavg',title:'くふうして平均を求める',kind:'word',n:4,cols:1,lead:'くふうして平均を求めましょう。',
  explain:{points:[{h:'基準をきめる',b:'どれも同じくらいの数のときは、基準の数を決めて、それより多い部分だけの平均を求めます。'},{h:'基準にたす',b:'平均 ＝ 基準 ＋ 多い部分の平均'}],tip:'<b>こつ</b>　いちばん小さい数や、きりのよい数を基準にすると計算が楽になります。'},
  gen(){const B=pick([100,105,120,150,200,250]),n=ri(4,6);for(;;){const df=Array.from({length:n},()=>ri(0,12));const s=df.reduce((a,b)=>a+b,0);if(s%n)continue;const vs=df.map(x=>B+x);const u=pick(['g','cm','円']);
   const [what,cnt,act,kind]=u==='g'?['みかん','こ','重さをはかったら','重さ']:u==='cm'?['ひまわり','本','高さをはかったら','高さ']:['品物','こ','ねだんを調べたら','ねだん'];
   return{q:`${n}${cnt}の${what}の${act}、${vs.map(v=>v+u).join('、')} でした。${B}${u}より多い部分の平均を使って、${kind}の平均を求めましょう。`,
    a:`式 (${df.join(' + ')}) ÷ ${n} = ${s/n}、${B} + ${s/n} = ${B+s/n}　答え ${B+s/n}${u}`,steps:[`${B}${u}より多い部分：${df.join('、')}`,`その平均 ${s} ÷ ${n} = ${s/n}`,`${B} + ${s/n} = ${B+s/n}`]}}}},
 'g5-program':{id:'g5-program',title:'正多角形をかくプログラム',kind:'calc',n:8,cols:1,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'まがる角度',b:'正多角形をかくとき、1つの頂点でまがる角度は 360° ÷ 辺の数 です。',ex:'正六角形 → 360 ÷ 6 = 60（度）'},{h:'くり返す回数',b:'辺の数だけ「進む → まがる」をくり返すと、もとの場所にもどります。'}],tip:'<b>ちゅうい</b>　まがる角度は、正多角形の内がわの角ではなく、外がわの角です。内がわの角 ＝ 180° − まがる角度。'},
  gen(){const n=pick([3,4,5,6,8,9,10,12]),t=360/n,s=ri(2,9),nm={3:'正三角形',4:'正方形',5:'正五角形',6:'正六角形',8:'正八角形',9:'正九角形',10:'正十角形',12:'正十二角形'}[n],ty=ri(0,2);
   if(ty===0)return{q:`${nm}をかく：「${s}cm 進む → 左へ {_} 度 回る」を {_} 回くり返す`,tail:'',blanks:[t,n],a:`${t}、${n}`,steps:[`まがる角度 360 ÷ ${n} = ${t}`,`辺の数だけくり返す → ${n}回`]};
   if(ty===1)return{q:`「${s}cm 進む → 左へ ${t} 度 回る」をくり返すと、正 {_} 角形がかける`,tail:'',a:String(n),steps:[`360 ÷ ${t} = ${n}`]};
   return{q:`${nm}の1つの角の大きさは {_} 度`,tail:'',a:String(180-t),steps:[`まがる角度 360 ÷ ${n} = ${t}`,`180 − ${t} = ${180-t}`]}}},
 'g5-replace':{id:'g5-replace',title:'置きかえて考える',kind:'word',n:4,cols:1,lead:'図や表をかいて考え、式と答えを書きましょう。',
  explain:{points:[{h:'1つの量にそろえる',b:'「AはBの2倍」なら、A 1こを B 2こに置きかえて、全部をBだけで考えます。'},{h:'ちがいに注目する',b:'2つの買い方をくらべて、ちがう部分だけを見ると、1こ分のねだんがわかります。'}],tip:'<b>こつ</b>　図に○や□をかいて、置きかえたあとの数を数えましょう。'},
  gen(){return pick([
   ()=>{const e=ri(3,12)*10,k=ri(2,4),a=ri(1,4),b=ri(1,5);const T=e*(a*k+b);return{q:`えん筆1本のねだんは、消しゴム1このねだんの ${k}倍です。えん筆 ${a}本と消しゴム ${b}こを買うと、代金は ${T}円でした。消しゴム1こは何円ですか。`,a:`式 ${T} ÷ (${k} × ${a} + ${b}) = ${e}　答え ${e}円`,steps:[`えん筆1本を消しゴム ${k}こに置きかえる`,`えん筆 ${a}本 → 消しゴム ${k*a}こ。全部で消しゴム ${k*a+b}こ分`,`${T} ÷ ${k*a+b} = ${e}`]}},
   ()=>{const r=ri(8,20)*10,m=ri(3,9)*10,x=ri(1,4),y=ri(1,3),y2=y+ri(1,3);const P=r*x+m*y,Q=r*x+m*y2;return{q:`りんご ${x}こと みかん ${y}こで ${P}円、りんご ${x}こと みかん ${y2}こで ${Q}円です。みかん1こと りんご1こは、それぞれ何円ですか。`,a:`式 (${Q} − ${P}) ÷ ${y2-y} = ${m}、(${P} − ${m} × ${y}) ÷ ${x} = ${r}　答え みかん ${m}円、りんご ${r}円`,steps:[`2つの買い方のちがいは、みかん ${y2-y}こだけ → ${Q-P}円`,`みかん1こ ${Q-P} ÷ ${y2-y} = ${m}`,`りんご ${x}こは ${P} − ${m*y} = ${P-m*y}`]}},
   ()=>{const c=ri(3,9)*100,d=ri(1,5)*100,a=ri(1,3),b=ri(1,4);const T=(c+d)*a+c*b;return{q:`入園料は、おとな1人が子ども1人より ${d}円高いです。おとな ${a}人と子ども ${b}人で ${T}円でした。子ども1人の入園料は何円ですか。`,a:`式 (${T} − ${d} × ${a}) ÷ (${a} + ${b}) = ${c}　答え ${c}円`,steps:[`おとなを子どもに置きかえると、1人あたり ${d}円安くなる`,`${T} − ${d*a} = ${T-d*a}円で子ども ${a+b}人分`,`${T-d*a} ÷ ${a+b} = ${c}`]}},
  ])()}},
};

/* ---------- パズルの追加 ---------- */
const PZ_F=[
 {id:'pz-hitofude',title:'一筆がき',kind:'fig',n:6,cols:3,lead:'えんぴつを紙からはなさず、同じ線を2回通らずにかけますか。「できる」「できない」で答えましょう。',
  explain:{points:[{h:'点に集まる線の数',b:'それぞれの点に集まる線の数が、偶数か奇数かを調べます。'},{h:'一筆がきできる図',b:'奇数本の線が集まる点が 0こ か 2こ のとき、一筆がきできます。2このときは、その一方から始めてもう一方で終わります。'}],tip:'<b>こつ</b>　点のそばに、集まる線の数を書きこんでみましょう。'},
  gen(){const P=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)P.push([8+c*18,6+r*16]);const cand=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++){const i=r*3+c;if(c<2)cand.push([i,i+1]);if(r<2)cand.push([i,i+3])}
   for(let r=0;r<2;r++)for(let c=0;c<2;c++){const i=r*3+c;cand.push(chance(.5)?[i,i+4]:[i+1,i+3])}
   for(;;){const E=cand.filter(()=>chance(.55));if(E.length<5)continue;const deg=new Array(9).fill(0);E.forEach(([a,b])=>{deg[a]++;deg[b]++});
    const used=deg.map((d,i)=>d?i:-1).filter(i=>i>=0);const par={};used.forEach(i=>par[i]=i);const f=i=>par[i]===i?i:(par[i]=f(par[i]));E.forEach(([a,b])=>{par[f(a)]=f(b)});if(new Set(used.map(f)).size>1)continue;
    const odd=used.filter(i=>deg[i]%2).length;let g='';E.forEach(([a,b])=>g+=`<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#111" stroke-width="1.1" stroke-linecap="round"/>`);used.forEach(i=>g+=dot(P[i][0],P[i][1],1.6));
    return{q:`<div class="fig" style="max-width:34mm">${SVGW('0 0 52 44',g)}</div>`,a:`<b>${odd===0||odd===2?'できる':'できない'}</b>`,steps:[`奇数本の線が集まる点：${odd}こ`,odd===0?'0こなので、どこから始めてもかける':odd===2?'2こなので、その一方から始めるとかける':'0こでも2こでもないので、かけない']}}}},
 {id:'pz-water',title:'水をはかり分ける',kind:'word',n:4,cols:1,lead:'2つの入れ物と、水道（水はいくらでも出せます）を使います。できるだけ少ない回数で、ちょうどの量をはかる方法を考えましょう。',parts:['答え'],
  explain:{points:[{h:'できること',b:'①入れ物をいっぱいにする　②入れ物を空にする　③一方からもう一方へ、どちらかが空かいっぱいになるまで移す'},{h:'表にして考える',b:'2つの入れ物に入っている量を、1回ごとに表に書いていきます。'}],tip:'<b>こつ</b>　大きい入れ物から小さい入れ物へ移すと、「差」の量がつくれます。'},
  gen(){for(;;){const a=ri(5,9),b=ri(3,a-1);if(gcd(a,b)!==1)continue;const c=ri(1,a-1);if(c===b)continue;
    const key=s=>s.join(','),start=[0,0],prev={[key(start)]:null},q=[start];let goal=null;
    while(q.length){const s=q.shift();if(s[0]===c||s[1]===c){goal=s;break}const [x,y]=s;const mv=[[[a,y],`${a}Lの入れ物をいっぱいにする`],[[x,b],`${b}Lの入れ物をいっぱいにする`],[[0,y],`${a}Lの入れ物を空にする`],[[x,0],`${b}Lの入れ物を空にする`]];
     const t1=Math.min(x,b-y);mv.push([[x-t1,y+t1],`${a}Lから${b}Lへ移す`]);const t2=Math.min(y,a-x);mv.push([[x+t2,y-t2],`${b}Lから${a}Lへ移す`]);
     for(const [ns,lab] of mv){const k=key(ns);if(!(k in prev)){prev[k]=[s,lab];q.push(ns)}}}
    if(!goal)continue;const path=[];let k=key(goal);while(prev[k]){path.unshift([prev[k][1],k]);k=key(prev[k][0])}if(path.length<3||path.length>8)continue;
    return{q:`${a}L と ${b}L の入れ物があります。${c}L の水をはかるには、少なくとも何回の作業がいりますか。（いっぱいにする・空にする・移す を それぞれ1回と数えます）`,parts:['答え'],a:`答え ${path.length}回`,steps:path.map(([lab,st],i)=>`${i+1}. ${lab}（${a}L：${st.split(',')[0]}L、${b}L：${st.split(',')[1]}L）`)}}}},
];

/* ---------- 5年の章とパズルに入れる ---------- */
(()=>{const put=(ch,ids)=>{const c=GRADE_UNITS[5].find(x=>x.ch===ch);if(!c)throw new Error('no chapter '+ch);c.items.push(...ids.map(id=>NEW5F[id]))};
  put('整数と小数',['g5-estimate']);put('倍数と約数',['g5-prime']);put('正多角形と円・角柱と円柱',['g5-program']);put('単位量あたり',['g5-kariavg']);put('文章題（線分図）',['g5-plant','g5-replace']);
  PUZZLE_CHAPTER.items.push(...PZ_F)})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['g5-plant']=()=>{let g=`<line x1="8" y1="14" x2="88" y2="14" stroke="#111" stroke-width=".6"/>`;for(let i=0;i<=4;i++){g+=`<path d="M${8+i*20},14 l-3,-6 h6z" fill="#3c8d3c"/>`+T(8+i*20,22,(i+1)+'本',3)}for(let i=0;i<4;i++)g+=T(18+i*20,11,'間'+(i+1),3);
  g+=`<circle cx="112" cy="16" r="10" fill="none" stroke="#111" stroke-width=".6"/>`;for(let i=0;i<4;i++){const t=i*Math.PI/2;g+=dot(112+10*Math.cos(t),16+10*Math.sin(t),1.6,'#3c8d3c')}g+=T(112,33,'まわり：木4本・間4',3);
  return W1(SVGW('0 0 128 36',g),'木の数と間の数',['まっすぐで両はしにも植える → 木は間より1本多い','まわりにならべる → 最後の間が最初の木にもどるので、木の数 ＝ 間の数'])};
WHY['g5-estimate']=()=>{let g=box(6,4,30,7,CB,.4)+T(21,9,'4650 → 5000',3.2)+box(6,13,30,7,CB,.4)+T(21,18,'3780 → 4000',3.2)+T(21,27,'多めに 9000',3.4)+box(60,4,30,7,CR,.4)+T(75,9,'4650 → 4000',3.2)+box(60,13,30,7,CR,.4)+T(75,18,'3780 → 3000',3.2)+T(75,27,'少なめに 7000',3.4)+T(21,33,'足りるかを調べる',3)+T(75,33,'こえるかを調べる',3);
  return W1(SVGW('0 0 100 36',g),'多めか、少なめか',['多めに見積もっても予算以内 → 本当の代金も必ず予算以内（足りる）','少なめに見積もっても目標以上 → 本当の合計も必ず目標以上（こえる）'])};
WHY['g5-prime']=()=>{let g='';const isP=n=>{if(n<2)return false;for(let d=2;d*d<=n;d++)if(n%d===0)return false;return true};for(let n=1;n<=30;n++){const x=4+((n-1)%10)*11,y=4+Math.floor((n-1)/10)*9;g+=box(x,y,10,8,isP(n)?CR:'#fff',.3)+T(x+5,y+5.6,n,3.2)}
  return W1(SVGW('0 0 118 32',g),'1〜30の素数',['2の倍数・3の倍数・5の倍数（その数自身はのぞく）を消していくと、残った数が素数（1はのぞく）','赤い数：2, 3, 5, 7, 11, 13, 17, 19, 23, 29'])};
WHY['g5-kariavg']=()=>{const v=[3,0,8,5];let g=`<line x1="4" y1="30" x2="70" y2="30" stroke="#111" stroke-width=".5"/>`;v.forEach((d,i)=>g+=box(8+i*15,12-d,10,18+d,'#f4f4f4',.4)+box(8+i*15,12-d,10,d||.01,CR,.4));g+=`<line x1="4" y1="12" x2="70" y2="12" stroke="#2a6fb0" stroke-dasharray="1.5 1" stroke-width=".6"/>`+T(72,13,'基準',3.2,'start')+T(72,22,'赤い部分だけ',3.2,'start')+T(72,27,'平均する',3.2,'start');
  return W1(SVGW('0 0 108 34',g),'基準より多い部分の平均',['基準の線より下は、どれも同じ大きさ','上にはみ出した赤い部分だけを平均して、基準にたせばよい'])};
WHY['g5-program']=()=>{const n=6,s=14;let x=20,y=30,a=0,g='';for(let i=0;i<n;i++){const nx=x+s*Math.cos(a),ny=y-s*Math.sin(a);g+=`<line x1="${num(x)}" y1="${num(y)}" x2="${num(nx)}" y2="${num(ny)}" stroke="#111" stroke-width=".7"/>`;x=nx;y=ny;a+=Math.PI/3}
  g+=`<line x1="34" y1="30" x2="44" y2="30" stroke="#999" stroke-dasharray="1 1" stroke-width=".5"/>`+arcP(34,30,6,0,60)+T(44,26,'60°',3.2,'start')+T(62,12,'進む → 左へ 60° 回る',3.4,'start')+T(62,19,'を 6回くり返す',3.4,'start')+T(62,27,'60° × 6 = 360°',3.4,'start');
  return W1(SVGW('0 0 120 36',g),'まがる角度の合計は360°',['1周してもとの向きにもどるので、まがった角度を全部たすと 360°','正六角形なら 360 ÷ 6 = 60° ずつまがる'])};
WHY['g5-replace']=()=>{let g=T(4,8,'えん筆',3.2,'start');for(let i=0;i<2;i++)g+=box(18+i*14,3,12,7,CB,.4)+T(24+i*14,8,'え',3.2);g+=T(4,22,'置きかえ',3.2,'start');for(let i=0;i<4;i++)g+=box(18+i*7,17,6,7,CR,.4)+T(21+i*7,22,'け',2.8);g+=T(60,8,'えん筆1本 ＝ 消しゴム2こ',3.2,'start')+T(60,22,'全部を消しゴムで数える',3.2,'start');
  return W1(SVGW('0 0 120 28',g),'1種類にそろえる',['えん筆を消しゴムに置きかえると、代金は全部「消しゴム何こ分」になる','代金 ÷ 消しゴムの数 で、消しゴム1このねだんがわかる'])};
WHY['pz-hitofude']=()=>{let g=`<polygon points="10,30 40,30 25,6" fill="none" stroke="#111" stroke-width=".9"/>`+[[10,30,'2'],[40,30,'2'],[25,6,'2']].map(([x,y,t])=>dot(x,y,1.4)+T(x+(x<25?-4:x>25?4:0),y+(y>20?5:-2),t,3.4)).join('')+`<polyline points="60,30 60,8 84,8 84,30 60,30 84,8" fill="none" stroke="#111" stroke-width=".9"/>`+[[60,30,'3'],[84,8,'3'],[60,8,'2'],[84,30,'2']].map(([x,y,t])=>dot(x,y,1.4)+T(x+(x<70?-4:4),y+(y>20?5:-2),t,3.4).replace('fill="#111"',t%2?'fill="#c0392b"':'fill="#111"')).join('');
  return W1(SVGW('0 0 96 38',g),'集まる線の数を数える',['とちゅうの点は「入って出る」ので、線は2本ずつ使う（偶数）','奇数になれるのは始まりと終わりの点だけ → 奇数の点が0こか2このときだけかける'])};
WHY['pz-water']=()=>{const rows=[['','7L','3L'],['はじめ','0','0'],['7Lをいっぱい','7','0'],['7L→3L','4','3'],['3Lを空に','4','0'],['7L→3L','1','3']];let g='';rows.forEach((r,i)=>r.forEach((c,j)=>{const x=[4,40,56][j],w=[36,16,16][j];g+=box(x,3+i*6,w,6,i===0?'#eef4fb':i===5&&j===1?CR:'#fff',.3)+T(x+w/2,7.4+i*6,c,3)}));
  return W1(SVGW('0 0 76 40',g),'表で順に調べる',['1回ごとに、2つの入れ物の量を表に書く','7Lから3Lへ移すと「7 − 3 = 4」、もう一度で「4 − 3 = 1」のように、差の量がつくれる'])};
