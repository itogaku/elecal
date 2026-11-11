/* ============ 資料Bをメインにした追加：6年の新しい問題タイプ・章の並べかえ・「なぜ？」の図 ============ */
const CB='#a9cbe8',CR='#f3c2bc',CG='#cfe3b8',CY='#f6e3a1';

/* ---------- 6年：新しい問題タイプ ---------- */
const NEW6={
 'frac-size':{id:'frac-size',title:'積・商の大きさ',kind:'word',n:4,cols:1,lead:'答えが、左の数より大きくなる式をすべて選びましょう。',parts:['答え'],
  explain:{points:[{h:'かけ算',b:'1より大きい数をかけると、積はかけられる数より大きくなります。1より小さい数をかけると小さくなります。'},{h:'わり算',b:'1より小さい数でわると、商はわられる数より大きくなります。1より大きい数でわると小さくなります。'}],tip:'<b>こつ</b>　計算しなくても、かける数・わる数が1より大きいか小さいかで見分けられます。'},
  gen(){const n=ri(6,30),fs=shuffle([proper(),proper(),improper(),improper()]).slice(0,4),ops=fs.map(()=>pick(['×','÷']));
   const big=fs.map((f,i)=>{const lt1=f.n<f.d;return(ops[i]==='×'?!lt1:lt1)?'アイウエ'[i]:null}).filter(Boolean);
   return{q:choiceQ(fs.map((f,i)=>`${n} ${ops[i]} ${FH(f)}`)),parts:['答え'],a:`答え ${big.join('、')||'なし'}`,steps:['1より大きい数をかける → 大きくなる','1より小さい数でわる → 大きくなる']}}},
 'f-trick':{id:'f-trick',title:'計算のくふう（分数）',kind:'calc',n:10,cols:2,lead:'計算のきまりを使って、くふうして計算しましょう。',
  explain:{points:[{h:'分配のきまり',b:'(□ + ○) × △ = □ × △ + ○ × △',ex:`(${F(1,2)} + ${F(1,3)}) × 6 = 3 + 2 = 5`},{h:'まとめる',b:'□ × △ + ○ × △ = (□ + ○) × △',ex:`${F(3,4)} × 5 + ${F(1,4)} × 5 = 1 × 5 = 5`}],tip:'<b>こつ</b>　分母の公倍数をかけると、分数が消えて計算が楽になります。'},
  gen(){if(chance(.5)){const a=proper(2,6),b=proper(2,6);if(a.d===b.d)return this.gen();const L=lcm(a.d,b.d)*ri(1,3);const x=a.n*L/a.d,y=b.n*L/b.d;return{q:`(${FH(a)}${ADD}${FH(b)})${MUL}${L}`,a:String(x+y),steps:[`${FH(a)} × ${L} + ${FH(b)} × ${L}`,`${x} + ${y} = ${x+y}`]}}
   const d=ri(3,9),p=ri(1,d-1),k=ri(2,12);return{q:`${F(p,d)}${MUL}${k}${ADD}${F(d-p,d)}${MUL}${k}`,a:String(k),steps:[`(${F(p,d)} + ${F(d-p,d)}) × ${k}`,`1 × ${k} = ${k}`]}}},
 'frac-time':{id:'frac-time',title:'時間を分数で表す',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'分 → 時間',b:'1時間 = 60分なので、□分は □/60 時間です。',ex:`40分 = ${F(40,60)}時間 = ${F(2,3)}時間`},{h:'時間 → 分',b:'□時間は、60 × □ 分です。',ex:`${F(3,4)}時間 = 60 × ${F(3,4)} = 45分`}],tip:'<b>こつ</b>　時計の文字盤を思いうかべると、15分＝1/4時間、30分＝1/2時間がすぐわかります。'},
  gen(){const t=ri(0,3),m=pick([5,10,12,15,20,24,30,36,40,45,48,50]);const f=new Fr(m,60);
   if(t===0)return{q:`${m}分 = {_}時間`,tail:'',a:FH(f),steps:[`${m}分 = ${F(m,60)}時間`,...(f.d!==60?[`約分して ${FH(f)}`]:[])]};
   if(t===1)return{q:`${FH(f)}時間 = {_}分`,tail:'',a:String(m),steps:[`60 × ${FH(f)} = ${m}`]};
   if(t===2){const s=pick([10,15,20,30,40,45]),g=new Fr(s,60);return{q:`${s}秒 = {_}分`,tail:'',a:FH(g),steps:[`${s}秒 = ${F(s,60)}分 = ${FH(g)}分`]}}
   const h=ri(1,2);return{q:`${h}時間${m}分 = {_}時間`,tail:'',a:A(new Fr(h*60+m,60)),steps:[`${m}分 = ${FH(f)}時間`,`${h} + ${FH(f)} = ${A(new Fr(h*60+m,60))}`]}}},
 'frac-app':{id:'frac-app',title:'分数の速さ・面積・体積',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'公式はそのまま使える',b:'速さ・道のり・時間、面積・体積の公式は、数が分数でも同じように使えます。'},{h:'時間は分数にそろえる',b:'「40分」は 2/3 時間のように、時間を分数で表してから計算します。'}],tip:'<b>こつ</b>　整数におきかえて式を考えてから、分数を入れましょう。'},
  gen(){return pick([
   ()=>{const m=pick([20,30,40,45,50]),v=pick([3,4,6,12]),t=new Fr(m,60),d=t.mul(new Fr(v));return{q:`時速 ${v}km で ${m}分歩くと、何km 進みますか。`,a:`式 ${v} × ${FH(t)} = ${A(d)}　答え ${A(d)}km`,steps:[`${m}分 = ${FH(t)}時間`,'道のり = 速さ × 時間']}},
   ()=>{const t=pick([new Fr(2,3),new Fr(3,4),new Fr(1,2),new Fr(5,6)]),v=ri(2,6)*t.d,d=t.mul(new Fr(v));return{q:`${A(d)}km の道のりを ${FH(t)}時間で歩きました。時速何km ですか。`,a:`式 ${A(d)} ÷ ${FH(t)} = ${v}　答え 時速 ${v}km`,steps:['速さ = 道のり ÷ 時間','わる数の逆数をかける']}},
   ()=>{const a=proper(2,9),b=proper(2,9),r=a.mul(b);return{q:`たて ${FH(a)}m、横 ${FH(b)}m の長方形の面積は何m² ですか。`,a:`式 ${FH(a)} × ${FH(b)} = ${A(r)}　答え ${A(r)}m²`,steps:['長方形の面積 = たて × 横']}},
   ()=>{const a=proper(2,5),b=proper(2,5),c=pick([new Fr(1,2),new Fr(2,3),new Fr(3,4)]),r=a.mul(b).mul(c);return{q:`たて ${FH(a)}m、横 ${FH(b)}m、高さ ${FH(c)}m の直方体の体積は何m³ ですか。`,a:`式 ${FH(a)} × ${FH(b)} × ${FH(c)} = ${A(r)}　答え ${A(r)}m³`,steps:['直方体の体積 = たて × 横 × 高さ']}},
  ])()}},
 'ratio-ratio':{id:'ratio-ratio',title:'割合の割合',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'割合 × 割合',b:'「全体の 2/3 の、さらに 3/4」は、全体の 2/3 × 3/4 = 1/2 にあたります。'},{h:'残りの割合',b:'「〜を使った残りの、さらに〜」は、まず 1 − 割合 で残りの割合を出します。'}],tip:'<b>こつ</b>　テープ図をかいて、どこが全体（1）なのかを確かめましょう。'},
  gen(){const a=proper(2,6),b=proper(2,6),W=a.d*b.d*ri(2,6)*10;return pick([
   ()=>{const r=a.mul(b);return{q:`花だんの ${FH(a)} にチューリップを植え、その ${FH(b)} が赤いチューリップです。赤いチューリップは花だん全体の何分のいくつですか。`,a:`式 ${FH(a)} × ${FH(b)} = ${FH(r)}　答え ${FH(r)}`,steps:['全体の □ の □ → 割合どうしをかける']}},
   ()=>{const rest=new Fr(a.d-a.n,a.d),r=rest.mul(b),v=W*r.n/r.d;return{q:`${W}円のおこづかいのうち ${FH(a)} を使い、残りの ${FH(b)} を貯金しました。貯金したのは何円ですか。`,a:`式 ${W} × (1 − ${FH(a)}) × ${FH(b)} = ${v}　答え ${v}円`,steps:[`残りの割合は 1 − ${FH(a)} = ${FH(rest)}`,`貯金は全体の ${FH(rest)} × ${FH(b)} = ${FH(r)}`]}},
  ])()}},
 'ratio3':{id:'ratio3',title:'3つの数の比・かげの長さ',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'3つの数の比',b:'a : b : c に分けるとき、全体を a + b + c とみて、それぞれ全体の a/(a+b+c) などになります。'},{h:'かげの長さ',b:'同じ時刻には、物の高さとかげの長さの比はどれも等しくなります（三角形が拡大図・縮図になる）。'}],tip:'<b>こつ</b>　かげの問題は、図をかいて「高さ : かげ」の比をそろえましょう。'},
  gen(){return pick([
   ()=>{let p,q,r;do{p=ri(1,5);q=ri(1,5);r=ri(1,5)}while(new Set([p,q,r]).size<3);const s=p+q+r,T0=s*ri(3,20)*10;return{q:`${T0}円を、A・B・C の3人で ${p} : ${q} : ${r} の比になるように分けます。Bは何円ですか。`,a:`式 ${T0} × ${F(q,s)} = ${T0*q/s}　答え ${T0*q/s}円`,steps:[`全体を ${p} + ${q} + ${r} = ${s} とみる`,`Bは全体の ${F(q,s)}`]}},
   ()=>{const h=pick([1,1.2,1.5,2]),k=pick([1.5,2,2.5,3]),H=ri(3,9);const sh=num(h*k),SH=num(H*k);return{q:`長さ ${num(h)}m の棒のかげの長さが ${sh}m のとき、近くにある木のかげの長さは ${SH}m でした。木の高さは何m ですか。`,a:`式 ${SH} ÷ ${num(k)} = ${H}　答え ${H}m`,steps:[`棒のかげは高さの ${sh} ÷ ${num(h)} = ${num(k)} 倍`,`木の高さ = かげ ÷ ${num(k)}`]}},
   ()=>{const p=ri(2,5),q=ri(2,5),r=ri(2,5),k=ri(2,6);return{q:`赤・青・白の玉の数の比が ${p} : ${q} : ${r} です。赤い玉が ${p*k}こ のとき、白い玉は何こですか。`,a:`式 ${r} × ${k} = ${r*k}　答え ${r*k}こ`,steps:[`赤の ${p} が ${p*k}こ → 1にあたる数は ${k}こ`,`白は ${r} × ${k}`]}},
  ])()}},
 'sector':{id:'sector',title:'おうぎ形の面積とまわりの長さ',kind:'fig',n:6,cols:3,lead:'つぎのおうぎ形の、面積とまわりの長さを求めましょう。円周率は 3.14 とします。',
  explain:{points:[{h:'おうぎ形の面積',b:'円の面積 × 中心角/360',ex:'半径6cm・中心角60° → 6 × 6 × 3.14 × 60/360'},{h:'まわりの長さ',b:'曲線部分（円周 × 中心角/360）に、半径2本分をたします。'}],tip:'<b>ちゅうい</b>　まわりの長さでは、半径2本分を忘れやすいので気をつけましょう。'},
  gen(){const ang=pick([30,45,60,90,120,135,150,180,240,270]),r=pick([2,3,4,6,8,9,10,12]);const fr=ang/360;
   const area=num(r*r*3.14*fr),arc=num(r*2*3.14*fr),per=num(r*2*3.14*fr+2*r);
   const cx=50,cy=50,R=34,a0=-Math.PI/2,a1=a0+ang*Math.PI/180,lg=ang>180?1:0;
   const svg=SVGW('0 0 100 100',`<path d="M${cx},${cy} L${num(cx+R*Math.cos(a0))},${num(cy+R*Math.sin(a0))} A${R},${R} 0 ${lg} 1 ${num(cx+R*Math.cos(a1))},${num(cy+R*Math.sin(a1))} Z" fill="#ededed" stroke="#111" stroke-width="1.2"/>${T(cx+8*Math.cos((a0+a1)/2),cy+8*Math.sin((a0+a1)/2)+1.5,ang+'°',5)}${T(cx-3,cy-R/2,r+'cm',5,'end')}`);
   return{q:`<div class="fig">${svg}</div><div class="figcap">面積（　　）　まわり（　　）</div>`,a:`<b>面積 ${area} cm²、まわり ${per} cm</b>`,steps:[`面積：${r} × ${r} × 3.14 × ${F(ang,360)} = ${area}`,`曲線：${r*2} × 3.14 × ${F(ang,360)} = ${arc}`,`まわり：${arc} + ${r} × 2 = ${per}`]}}},
 'surface':{id:'surface',title:'角柱・円柱の表面積',kind:'word',n:6,cols:2,lead:'表面積（すべての面の面積の和）を求めましょう。円周率は 3.14 とします。',
  explain:{points:[{h:'表面積 = 底面積 × 2 + 側面積',b:'底面は2つあります。側面を開くと長方形になります。'},{h:'側面積',b:'側面の長方形は、たて = 高さ、横 = 底面のまわりの長さ です。'}],tip:'<b>こつ</b>　展開図をかくと、どの面をたせばよいかがよくわかります。'},
  gen(){return pick([
   ()=>{const a=ri(2,9),b=ri(2,9),c=ri(2,9),s=2*(a*b+b*c+a*c);return{q:`たて ${a}cm、横 ${b}cm、高さ ${c}cm の直方体`,a:`式 ${a*b} × 2 + (${a} + ${b} + ${a} + ${b}) × ${c} = ${s}　答え ${s} cm²`,steps:[`底面積 ${a} × ${b} = ${a*b}`,`側面積 = 高さ × 底面のまわり = ${c} × ${2*(a+b)} = ${2*(a+b)*c}`]}},
   ()=>{const k=ri(1,3),A0=3*k,B0=4*k,C0=5*k,h=ri(3,10),base=A0*B0/2,side=(A0+B0+C0)*h,s=base*2+side;return{q:`底面が、直角をはさむ辺が ${A0}cm と ${B0}cm、ななめの辺が ${C0}cm の直角三角形で、高さが ${h}cm の三角柱`,a:`式 ${base} × 2 + ${A0+B0+C0} × ${h} = ${s}　答え ${s} cm²`,steps:[`底面積 ${A0} × ${B0} ÷ 2 = ${base}`,`側面積 ${h} × (${A0} + ${B0} + ${C0}) = ${side}`]}},
   ()=>{const r=ri(1,6),h=ri(2,10),base=num(r*r*3.14),side=num(h*r*2*3.14),s=num(r*r*3.14*2+h*r*2*3.14);return{q:`底面の半径が ${r}cm、高さが ${h}cm の円柱`,a:`式 ${base} × 2 + ${h} × ${r*2} × 3.14 = ${s}　答え ${s} cm²`,steps:[`底面積 ${r} × ${r} × 3.14 = ${base}`,`側面の横 = 円周 = ${r*2} × 3.14、側面積 = ${side}`]}},
  ])()}},
 'comb-more':{id:'comb-more',title:'いろいろな場合の数',kind:'word',n:5,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'かけ算で数える',b:'Aの選び方が a 通り、それぞれに Bの選び方が b 通りあれば、全部で a × b 通りです。'},{h:'勝ち抜き戦（トーナメント）',b:'1試合で1チームずつ負けて消えるので、試合数は「チーム数 − 1」です。'}],tip:'<b>こつ</b>　表や図にして、もれや重なりがないか確かめましょう。'},
  gen(){return pick([
   ()=>{const n=ri(4,16);return{q:`${n}チームで勝ち抜き戦（トーナメント）をします。優勝が決まるまでに、試合は全部で何試合ですか。`,parts:['答え'],a:`答え ${n-1}試合`,steps:['1試合ごとに1チームが負ける',`優勝以外の ${n-1}チームが負けるまで → ${n-1}試合`]}},
   ()=>{const a=ri(2,4),b=ri(2,4),c=ri(2,3);return{q:`ランチセットで、主食を ${a}種類、おかずを ${b}種類、飲み物を ${c}種類の中から1つずつ選びます。組み合わせは全部で何通りですか。`,parts:['答え'],a:`答え ${a*b*c}通り`,steps:[`${a} × ${b} × ${c} = ${a*b*c}`]}},
   ()=>{const k=ri(3,11);let c=0;for(let i=1;i<=6;i++)for(let j=1;j<=6;j++)if(i+j===k)c++;return{q:`大小2つのさいころを同時に投げます。出た目の和が ${k} になる出方は何通りですか。`,parts:['答え'],a:`答え ${c}通り`,steps:['（大、小）の組を表にして数える',`和が ${k} になるのは ${c}通り`]}},
   ()=>{const a=ri(2,4),b=ri(2,4);return{q:`家から駅までの道が ${a}通り、駅から公園までの道が ${b}通りあります。家から駅を通って公園まで行く行き方は何通りですか。`,parts:['答え'],a:`答え ${a*b}通り`,steps:[`${a} × ${b} = ${a*b}`]}},
  ])()}},
 'nobe':{id:'nobe',title:'のべ人数と1日の平均',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'のべ人数',b:'同じ人が何回来ても、来た回数だけ数えた人数の合計です。'},{h:'1日あたりの平均',b:'のべ人数 ÷ 日数 で求めます。'}],tip:'<b>ちゅうい</b>　0人の日も、日数には入れます。'},
  gen(){const d=ri(4,6);let v;do{v=Array.from({length:d},()=>ri(0,9))}while(v.reduce((a,b)=>a+b)%d);const s=v.reduce((a,b)=>a+b);
   return{q:`図書室を利用した人数を ${d}日間調べると、${v.map((x,i)=>`${i+1}日目 ${x}人`).join('、')} でした。のべ人数と、1日あたりの平均の人数を求めましょう。`,a:`式 ${v.join(' + ')} = ${s}、${s} ÷ ${d} = ${s/d}　答え のべ ${s}人、1日平均 ${s/d}人`,steps:['のべ人数 = 全部の日の人数の合計','平均 = のべ人数 ÷ 日数']}}},
};

/* ---------- 6年の章を資料Bの流れに並べかえる ---------- */
(()=>{const pool={};GRADE_UNITS[6].forEach(c=>c.items.forEach(u=>{pool[u.id]={...u}}));Object.assign(pool,NEW6);
  const plan=[
   ['分数のかけ算・わり算',['f-int','f-mul','f-div','frac-size']],
   ['分数のいろいろな計算',['f-mixed','f-three','f-recip','f-trick']],
   ['分数の利用と割合',['frac-time','frac-app','f-word','ratio-ratio']],
   ['比',['ratio-val','ratio-simp','ratio-x','ratio-word','ratio3']],
   ['対称な図形',['sym-line','sym-point','sym-judge','sym-corr']],
   ['拡大図と縮図',['enl-grid','enl-find','enl-side','enl-center','scale']],
   ['いろいろな面積',['circle','circle-combo','sector','approx-area']],
   ['角柱や円柱の体積',['volume','vol6-combo','surface']],
   ['文字と式',['x-find','x-expr','x-value','x-match','x-pattern']],
   ['比例と反比例',['prop','prop-graph','graph-read','inv','inv-graph']],
   ['場合の数',['comb','comb-tree','comb-league','comb-coin','comb-path','comb-more']],
   ['資料の調べ方',['data','dotplot','histogram','data-compare','nobe']],
   ['中学への準備（復習）',['r-fadd','r-decmul','r-decdiv','r-speed','r-percent','r-area','units','units-len','units-prefix','units-word']]];
  const used=new Set(),chs=plan.map(([ch,ids])=>({ch,items:ids.filter(id=>pool[id]).map(id=>{used.add(id);return pool[id]})}));
  const rest=Object.keys(pool).filter(id=>!used.has(id));if(rest.length)chs[chs.length-1].items.push(...rest.map(id=>pool[id]));
  GRADE_UNITS[6]=chs})();

/* ============ 「なぜ？」の図 ============ */
const WHY={};
const box=(x,y,w,h,f,sw=.6)=>`<rect x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}" fill="${f||'#fff'}" stroke="#111" stroke-width="${sw}"/>`;
const arrowR=(x1,y,x2,t)=>`<path d="M${num(x1)},${num(y)} H${num(x2)} m-2,-1.5 l2,1.5 l-2,1.5" fill="none" stroke="#111" stroke-width=".7"/>${t?T((x1+x2)/2,y-1.8,t,3.8):''}`;
const curve=(x1,x2,y,t,up=true)=>`<path d="M${num(x1)},${num(y)} Q${num((x1+x2)/2)},${num(y+(up?-9:9))} ${num(x2)},${num(y)}" fill="none" stroke="#c0392b" stroke-width=".7"/><path d="M${num(x2-2)},${num(y+(up?-2:2))} L${num(x2)},${num(y)} L${num(x2-2.6)},${num(y+(up?.6:-.6))}" fill="none" stroke="#c0392b" stroke-width=".7"/>${T((x1+x2)/2,y+(up?-7:10),t,3.8).replace('fill="#111"','fill="#c0392b"')}`;
const fracT=(x,y,n,d,sz=4.2)=>`<text x="${num(x)}" y="${num(y-1)}" font-size="${sz}" text-anchor="middle" fill="#111">${n}</text><line x1="${num(x-2.6)}" y1="${num(y)}" x2="${num(x+2.6)}" y2="${num(y)}" stroke="#111" stroke-width=".35"/><text x="${num(x)}" y="${num(y+sz)}" font-size="${sz}" text-anchor="middle" fill="#111">${d}</text>`;

/* 分数 × 整数・分数 ÷ 整数（面積図） */
WHY['f-int']=()=>{let a='',b='';const s=11;
  for(let k=0;k<2;k++){for(let i=0;i<5;i++){const idx=k*5+i,col=idx<6?[CB,CR,CG][Math.floor(idx/2)]:'#fff';a+=box(4+k*60+i*s,8,s,44,col)}a+=T(4+k*60+27.5,58,'1m²',3.8)}
  for(let i=0;i<5;i++)for(let j=0;j<3;j++)b+=box(6+i*13,6+j*14,13,14,i<2&&j===0?CB:'#fff');
  return[{svg:SVGW('0 0 124 62',a),cap:`${F(2,5)} × 3`,lines:[`1dLで ${F(2,5)}m² ぬれるペンキを 3dL 使う`,`${F(1,5)}m² が 2こずつ、3回分 → ${F(1,5)} が 2 × 3 = 6こ`,`${F(2,5)} × 3 = ${F('2 × 3',5)} = ${F(6,5)}（分母はそのまま）`]},
         {svg:SVGW('0 0 76 50',b),cap:`${F(2,5)} ÷ 3`,lines:[`${F(2,5)}m² を3等分する`,`1m² を 5 × 3 = 15 に分けた1つ分は ${F(1,15)}`,`色のところは2こ → ${F(2,'5 × 3')} = ${F(2,15)}（分子はそのまま）`]}]};
/* 分数 × 分数（面積図） */
WHY['f-mul']=()=>{let g='';const W=70,H=54,ox=14,oy=6;for(let i=0;i<5;i++)for(let j=0;j<3;j++)g+=box(ox+i*W/5,oy+j*H/3,W/5,H/3,i<4&&j>=1?CB:'#fff',.5);
  g+=`<rect x="${ox}" y="${oy}" width="${W}" height="${H}" fill="none" stroke="#111" stroke-width="1.1"/>`+T(ox+W/2,oy+H+6,'よこ 1m を 5 等分 → 4つ分が '+'4/5 m',3.8)+T(ox-2,oy+H*2/3,'2/3m',3.8,'end')+T(ox-2,oy+H/2-12,'1m',3.4,'end');
  return[{svg:SVGW('0 0 96 68',g),cap:`${F(4,5)} × ${F(2,3)}`,lines:['たて1m・よこ1mの正方形（1m²）を、よこに5つ、たてに3つに分ける',`小さい長方形1つは 1m² を 5 × 3 = 15 に分けた1つ → ${F(1,15)}m²`,`色のところ（よこ ${F(4,5)}m、たて ${F(2,3)}m）は 4 × 2 = 8こ → ${F(8,15)}m²`,'だから「分子どうし・分母どうしをかける」']}]};
/* 分数 ÷ 分数（数直線） */
WHY['f-div']=()=>{const ox=10,u=80/5;let g=`<line x1="${ox}" y1="18" x2="${ox+90}" y2="18" stroke="#111" stroke-width=".6"/><line x1="${ox}" y1="38" x2="${ox+90}" y2="38" stroke="#111" stroke-width=".6"/>`;
  for(let i=0;i<=5;i++)g+=`<line x1="${ox+i*u}" y1="36" x2="${ox+i*u}" y2="40" stroke="#111" stroke-width=".5"/>`;
  g+=`<rect x="${ox}" y="35" width="${4*u}" height="6" fill="${CB}" opacity=".7"/>`+T(ox-2,19,'m²',3.4,'end')+T(ox-2,39,'dL',3.4,'end')+fracT(ox+4*u,13,2,3)+fracT(ox+4*u,47,4,5)+fracT(ox+u,47,1,5)+T(ox+5*u,47,'1',4)+T(ox+5*u,14,'□',4.5)+T(ox,47,'0',3.8)+T(ox,14,'0',3.8);
  g+=`<line x1="${ox+4*u}" y1="18" x2="${ox+4*u}" y2="38" stroke="#999" stroke-dasharray="1.5 1" stroke-width=".4"/>`+curve(ox+4*u,ox+u,40,'÷4',false)+curve(ox+u,ox+5*u,40,'×5',false).replace(/y\+10/,'');
  return[{svg:SVGW('0 0 110 64',g),cap:`${F(2,3)} ÷ ${F(4,5)}`,lines:[`${F(4,5)}dL で ${F(2,3)}m² ぬれる。1dL では何m²？`,`${F(1,5)}dL（目もり1つ）では ${F(2,3)} ÷ 4 = ${F(2,'3 × 4')}`,`1dL（目もり5つ）では その5倍 → ${F('2 × 5','3 × 4')}`,`これは ${F(2,3)} × ${F(5,4)} と同じ → わる数の逆数をかければよい`]}]};
WHY['frac-size']=()=>{const ox=8,u=34;let g=`<line x1="${ox}" y1="20" x2="${ox+2.2*u}" y2="20" stroke="#111" stroke-width=".6"/>`;[0,1,2].forEach(i=>g+=`<line x1="${ox+i*u}" y1="18" x2="${ox+i*u}" y2="22" stroke="#111" stroke-width=".5"/>${T(ox+i*u,27,i,3.8)}`);
  g+=`<rect x="${ox}" y="8" width="${u}" height="5" fill="#ddd" stroke="#111" stroke-width=".4"/>${T(ox+u+2,12,'かけられる数',3.2,'start')}<rect x="${ox}" y="32" width="${u*.6}" height="5" fill="${CB}" stroke="#111" stroke-width=".4"/>${T(ox+u*.6+2,36,'× 3/5 → 小さくなる',3.2,'start')}<rect x="${ox}" y="40" width="${u*1.5}" height="5" fill="${CR}" stroke="#111" stroke-width=".4"/>${T(ox+u*1.5+2,44,'× 3/2 → 大きくなる',3.2,'start')}`;
  return[{svg:SVGW('0 0 120 48',g),cap:'かける数と積の大きさ',lines:['「× 3/5」は「3/5 倍」なので、もとの大きさより小さくなる','「× 3/2」は「1.5 倍」なので大きくなる','わり算は逆で、1 より小さい数でわると大きくなる（逆数をかけるから）']}]};
WHY['f-mixed']=()=>{let g='';for(let k=0;k<3;k++)for(let i=0;i<3;i++)g+=box(4+k*34+i*10,8,10,14,k<2||i<1?CB:'#fff');g+=T(19,30,'1',4)+T(53,30,'1',4)+fracT(80,30,1,3);
  return[{svg:SVGW('0 0 108 38',g),cap:`${M(2,1,3)} = ${F(7,3)}`,lines:[`${M(2,1,3)} は「1が2こと ${F(1,3)}」`,`1 = ${F(3,3)} なので、${F(1,3)} が 3 × 2 + 1 = 7こ → ${F(7,3)}`]}]};
WHY['f-recip']=()=>[{svg:'',cap:'逆数どうしをかけると 1',lines:[`${F(3,4)} × ${F(4,3)} = ${F('3 × 4','4 × 3')} = ${F(12,12)} = 1`,'分子と分母を入れかえると、かけたときに上と下が同じ数になる','だから「分子と分母を入れかえた数」が逆数になる']}];
WHY['f-three']=()=>{let g='';for(let i=0;i<10;i++)g+=box(6+i*9,8,9,12,i<3?CB:'#fff');g+=T(6,27,'0',3.6)+T(96,27,'1',3.6)+T(33,27,'0.3',3.6);
  return[{svg:SVGW('0 0 104 32',g),cap:`0.3 = ${F(3,10)}`,lines:['1を10等分した3つ分が 0.3',`だから 0.3 = ${F(3,10)}。小数は分母が10や100の分数になおせる`,'整数は分母が1の分数（5 = 5/1）と考えると、全部を分数のかけ算にまとめられる']}]};
WHY['f-trick']=()=>[{svg:'',cap:'分配のきまり',lines:[`(${F(1,2)} + ${F(1,3)}) × 6 は、「${F(1,2)} の 6 倍」と「${F(1,3)} の 6 倍」をあわせたもの`,'6 × 1/2 = 3、6 × 1/3 = 2 → 3 + 2 = 5','先に（ ）の中を通分するより、ずっと楽に計算できる']}];
WHY['frac-time']=()=>{const cx=30,cy=30,R=22;let g=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#111" stroke-width=".8"/><path d="M${cx},${cy} L${cx},${cy-R} A${R},${R} 0 1 1 ${num(cx+R*Math.cos(Math.PI*(-0.5+4/3)))},${num(cy+R*Math.sin(Math.PI*(-0.5+4/3)))} Z" fill="${CB}" stroke="#111" stroke-width=".6"/>`;
  for(let i=0;i<12;i++){const a=i*Math.PI/6;g+=`<line x1="${num(cx+R*Math.sin(a))}" y1="${num(cy-R*Math.cos(a))}" x2="${num(cx+(R-3)*Math.sin(a))}" y2="${num(cy-(R-3)*Math.cos(a))}" stroke="#111" stroke-width=".5"/>`}
  g+=T(70,28,'40分 = 60分の 40',3.8,'start')+T(70,36,'= 2/3 時間',3.8,'start');
  return[{svg:SVGW('0 0 120 60',g),cap:'40分 は 何時間？',lines:['1時間（60分）を1とみると、40分は 60分の40','40/60 を約分して 2/3 → 40分 = 2/3 時間']}]};
WHY['f-word']=()=>{let g=`<rect x="10" y="10" width="80" height="10" fill="#fff" stroke="#111" stroke-width=".7"/><rect x="10" y="10" width="${80*3/4}" height="10" fill="${CB}" stroke="#111" stroke-width=".7"/>`;for(let i=1;i<4;i++)g+=`<line x1="${10+i*20}" y1="10" x2="${10+i*20}" y2="20" stroke="#111" stroke-width=".4"/>`;
  g+=`<line x1="10" y1="28" x2="90" y2="28" stroke="#111" stroke-width=".6"/>${T(10,34,'0',3.6)}${T(70,34,'3/4',3.6)}${T(90,34,'1',3.6)}${T(90,7,'40m',3.8)}${T(70,7,'□m',3.8)}`;
  return[{svg:SVGW('0 0 100 38',g),cap:'40m の 3/4 は？',lines:['もとにする量（40m）を 1 とみる','その 3/4 にあたる長さ = 40 × 3/4 = 30m','「〇〇の □」の〇〇が、もとにする量']}]};
WHY['ratio-ratio']=()=>{let g=`<rect x="8" y="8" width="84" height="12" fill="#fff" stroke="#111" stroke-width=".7"/><rect x="8" y="8" width="${84*2/3}" height="12" fill="${CB}" stroke="#111" stroke-width=".6"/><rect x="8" y="8" width="${84*2/3*3/4}" height="12" fill="${CR}" stroke="#111" stroke-width=".6"/>`;
  g+=T(50,27,'全体を 1 とすると、赤いところは 2/3 × 3/4 = 1/2',3.6);return[{svg:SVGW('0 0 100 30',g),cap:'全体の 2/3 の、さらに 3/4',lines:['青いところ（全体の 2/3）のうち 3/4 が赤','赤は全体の 2/3 × 3/4 = 1/2']}]};
/* 比（カップ） */
const cups=(x,y,n,col)=>{let s='';for(let i=0;i<n;i++)s+=`<path d="M${x+i*9},${y} l1.2,9 h5.6 l1.2,-9 z" fill="${col}" stroke="#111" stroke-width=".5"/>`;return s};
WHY['ratio-val']=WHY['ratio-simp']=WHY['ratio-x']=()=>{let g=cups(6,6,2,CY)+cups(26,6,3,CB)+T(26,22,'2 : 3',4)+cups(60,6,4,CY)+cups(60,20,6,CB).replace(/y="/g,'y="')+T(84,40,'4 : 6',4);
  g=cups(6,6,2,CY)+cups(26,6,3,CB)+T(25,24,'酢 2 ： 油 3',3.6)+cups(56,6,4,CY)+cups(56,19,6,CB)+T(80,36,'酢 4 ： 油 6',3.6);
  return[{svg:SVGW('0 0 116 40',g),cap:'2 : 3 と 4 : 6 は同じ味',lines:['酢2カップ・油3カップを、両方2倍にすると 4 : 6','両方を同じ倍にしても、まぜた味（割合）は変わらない → 等しい比','比の値も 2 ÷ 3 = 4 ÷ 6 = 2/3 で同じ']}]};
WHY['ratio-word']=WHY['ratio3']=()=>{let g=`<rect x="8" y="10" width="${84*3/5}" height="10" fill="${CB}" stroke="#111" stroke-width=".6"/><rect x="${8+84*3/5}" y="10" width="${84*2/5}" height="10" fill="${CR}" stroke="#111" stroke-width=".6"/>`;for(let i=1;i<5;i++)g+=`<line x1="${8+i*84/5}" y1="10" x2="${8+i*84/5}" y2="20" stroke="#111" stroke-width=".3"/>`;
  g+=T(50,7,'全体 100cm',3.8)+T(8+84*3/10,27,'姉 3',3.8)+T(8+84*4/5,27,'妹 2',3.8);
  return[{svg:SVGW('0 0 100 30',g),cap:'3 : 2 に分ける',lines:['全体を 3 + 2 = 5 つに分けたと考える','姉は 5 つのうち 3 つ → 全体の 3/5 = 60cm']}]};
/* 対称 */
WHY['sym-line']=WHY['sym-corr']=WHY['sym-judge']=()=>{const P=[[50,6],[70,18],[64,40],[50,48],[36,40],[30,18]];let g=polyS(P,1,0,0,'#111','#eef4fb',.9)+`<line x1="50" y1="2" x2="50" y2="52" stroke="#c0392b" stroke-width=".7" stroke-dasharray="4 1.5 1 1.5"/>`;
  g+=`<line x1="30" y1="18" x2="70" y2="18" stroke="#2a6fb0" stroke-width=".6" stroke-dasharray="1.5 1"/>`+T(40,16,'○',3.2)+T(60,16,'○',3.2)+`<rect x="50" y="18" width="2.5" height="2.5" fill="none" stroke="#2a6fb0" stroke-width=".4"/>`+T(28,18,'B',3.8,'end')+T(73,18,'F',3.8,'start')+T(55,4,'対称の軸',3.4,'start');
  return[{svg:SVGW('0 0 100 54',g),cap:'線対称な図形',lines:['対称の軸で折ると、BとFがぴったり重なる','BとFを結ぶ直線は、軸と垂直に交わる','軸からBまでと、軸からFまでの長さは等しい（○と○）']}]};
WHY['sym-point']=()=>{const P=[[30,14],[62,10],[70,40],[38,44]];let g=polyS(P,1,0,0,'#111','#eef4fb',.9)+dot(50,27,1.2)+T(52,25,'O',3.8,'start')+`<line x1="30" y1="14" x2="70" y2="40" stroke="#2a6fb0" stroke-width=".6" stroke-dasharray="1.5 1"/>`+T(27,13,'A',3.8,'end')+T(73,42,'C',3.8,'start')+T(40,19,'○',3.2)+T(60,35,'○',3.2);
  return[{svg:SVGW('0 0 100 50',g),cap:'点対称な図形',lines:['点Oを中心に180°回すと、AとCが重なる','AとCを結ぶ直線は、対称の中心Oを通る','OからAまでと、OからCまでの長さは等しい']}]};
/* 拡大図 */
WHY['enl-grid']=WHY['enl-find']=WHY['enl-side']=WHY['enl-center']=()=>{const s=5;let g=gl(7,5,s,2,2)+gl(13,9,s,44,2);const t1=[[1,4],[5,4],[1,1]],t2=[[1,8],[9,8],[1,2]];
  g+=polyS(t1,s,2,2,'#111',CB,1)+polyS(t2,s,44,2,'#111',CR,1)+T(17,27,'4ます',3.4)+T(4,14,'3',3.4,'end')+T(69,47,'8ます（2倍）',3.4)+T(47,30,'6',3.4,'end');
  return[{svg:SVGW('0 0 112 52',g),cap:'2倍の拡大図',lines:['対応する辺の長さが、どれも同じ倍（2倍）になっている','角の大きさは変わらない（直角は直角のまま）','だから「形は同じで、大きさだけちがう」']}]};
WHY['scale']=()=>{let g=`<rect x="6" y="6" width="40" height="26" fill="#eef4fb" stroke="#111" stroke-width=".6"/>`+T(26,22,'地図',4)+`<line x1="10" y1="36" x2="30" y2="36" stroke="#111" stroke-width="1"/>`+T(20,42,'2cm',3.6)+arrowR(50,20,64,'')+`<rect x="68" y="4" width="40" height="30" fill="#eaf3e0" stroke="#111" stroke-width=".6"/>`+T(88,22,'実際',4)+T(88,42,'2 × 25000 = 50000cm = 500m',3.2);
  return[{svg:SVGW('0 0 116 46',g),cap:'縮尺 1/25000',lines:['地図の長さは、実際の長さを 1/25000 に縮めたもの','だから実際の長さ = 地図の長さ × 25000','cm で計算してから、m や km になおす']}]};
/* 円の面積（切って並べかえる） */
WHY['circle']=WHY['circle-combo']=WHY['approx-area']=()=>{const n=12,R=16,cx=20,cy=22;let g='';for(let i=0;i<n;i++){const a0=i*2*Math.PI/n-Math.PI/2,a1=a0+2*Math.PI/n;g+=`<path d="M${cx},${cy} L${num(cx+R*Math.cos(a0))},${num(cy+R*Math.sin(a0))} A${R},${R} 0 0 1 ${num(cx+R*Math.cos(a1))},${num(cy+R*Math.sin(a1))} Z" fill="${i%2?CB:CR}" stroke="#111" stroke-width=".3"/>`}
  const w=2*Math.PI*R/n/1.0,ox=50,oy=38;for(let i=0;i<n;i++){const x=ox+i*w/2;const up=i%2===0;g+=up?`<path d="M${num(x)},${oy} L${num(x+w/2)},${oy-R} L${num(x+w)},${oy} Z" fill="${CR}" stroke="#111" stroke-width=".3"/>`:`<path d="M${num(x)},${oy-R} L${num(x+w)},${oy-R} L${num(x+w/2)},${oy} Z" fill="${CB}" stroke="#111" stroke-width=".3"/>`}
  g+=arrowR(39,22,47,'')+T(ox+n*w/4+2,oy+5,'円周の半分 ＝ 半径 × 3.14',3.2)+T(ox-2,oy-R/2,'半径',3.2,'end');
  return[{svg:SVGW('0 0 116 46',g),cap:'円を切って並べかえる',lines:['円を細かいおうぎ形に切って、たがいちがいに並べる','細かくするほど長方形に近づく：たて＝半径、よこ＝円周の半分','円周の半分 = 直径 × 3.14 ÷ 2 = 半径 × 3.14','だから 円の面積 = 半径 × 半径 × 3.14']}]};
WHY['sector']=()=>{let g=`<circle cx="22" cy="22" r="18" fill="#fff" stroke="#111" stroke-width=".7"/><path d="M22,22 L22,4 A18,18 0 0 1 ${num(22+18*Math.cos(-Math.PI/2+Math.PI/3))},${num(22+18*Math.sin(-Math.PI/2+Math.PI/3))} Z" fill="${CB}" stroke="#111" stroke-width=".7"/>`+T(26,16,'60°',3.4,'start')+T(48,20,'60° は 360° の 60/360 = 1/6',3.6,'start')+T(48,28,'→ 面積も円の 1/6',3.6,'start');
  return[{svg:SVGW('0 0 116 44',g),cap:'おうぎ形は円の一部',lines:['中心角が円全体（360°）の何分のいくつかを考える','面積も、曲線部分の長さも、円の「同じ分」だけになる']}]};
/* 体積（積み上げる） */
const cube=(x,y,s,f)=>{const d=s*.5;return `<polygon points="${num(x)},${num(y)} ${num(x+s)},${num(y)} ${num(x+s)},${num(y+s)} ${num(x)},${num(y+s)}" fill="${f}" stroke="#111" stroke-width=".35"/><polygon points="${num(x)},${num(y)} ${num(x+d)},${num(y-d*.8)} ${num(x+s+d)},${num(y-d*.8)} ${num(x+s)},${num(y)}" fill="#fff" stroke="#111" stroke-width=".35"/><polygon points="${num(x+s)},${num(y)} ${num(x+s+d)},${num(y-d*.8)} ${num(x+s+d)},${num(y+s-d*.8)} ${num(x+s)},${num(y+s)}" fill="#ddd" stroke="#111" stroke-width=".35"/>`};
WHY['volume']=WHY['vol6-combo']=WHY['g5-vol']=WHY['g5-volcombo']=()=>{let g='';const s=7;for(let z=0;z<3;z++)for(let r=1;r>=0;r--)for(let c=0;c<3;c++)g+=cube(10+c*s+r*s*.5,34-z*s-r*s*.4,s,z===0?CB:'#f4f4f4');
  g+=T(48,14,'1だん目：3×2＝6こ',4.4,'start')+T(48,22,'（底面積 6cm²）',4.4,'start')+T(48,31,'3だんで 6×3＝18こ',4.4,'start')+T(48,40,'→ 体積 18cm³',4.4,'start');
  return[{svg:SVGW('0 0 100 44',g),cap:'1cm³ の立方体を積む',lines:['底面に 1cm³ の立方体をしきつめる → その数は底面積と同じ','それを高さの分だけ積み上げる','だから 体積 = 底面積 × 高さ（円柱でも同じ）']}]};
WHY['surface']=()=>{let g=box(30,4,20,12,CB)+box(10,16,20,14,'#fff')+box(30,16,20,14,'#fff')+box(50,16,20,14,'#fff')+box(70,16,20,14,'#fff')+box(30,30,20,12,CB)+T(50,48,'側面は 1つの長方形（たて＝高さ、よこ＝底面のまわり）',3.2);
  return[{svg:SVGW('0 0 100 52',g),cap:'展開図で考える',lines:['底面（色）が2つ','側面をつなげると、1つの長方形になる','表面積 = 底面積 × 2 + 高さ × 底面のまわりの長さ']}]};
/* 比例・反比例 */
const tblSVG=(xs,ys,arrows)=>{const w=13,ox=14;let g='';xs.forEach((x,i)=>{g+=box(ox+i*w,12,w,8,'#fff',.4)+T(ox+i*w+w/2,17.6,x,3.6)+box(ox+i*w,20,w,8,'#fff',.4)+T(ox+i*w+w/2,25.6,ys[i],3.6)});g+=box(2,12,12,8,'#eee',.4)+T(8,17.6,'x',3.6)+box(2,20,12,8,'#eee',.4)+T(8,25.6,'y',3.6);
  arrows.forEach(([i,j,t1,t2])=>{g+=curve(ox+i*w+w/2,ox+j*w+w/2,11,t1,true)+curve(ox+i*w+w/2,ox+j*w+w/2,29,t2,false)});return g};
WHY['prop']=WHY['prop-graph']=WHY['graph-read']=WHY['g5-prop']=()=>[{svg:SVGW('0 0 100 42',tblSVG([1,2,3,4,5],[3,6,9,12,15],[[0,1,'×2','×2'],[0,2,'×3','×3']])),cap:'比例',lines:['x が 2倍、3倍になると、y も 2倍、3倍になる','y ÷ x はいつも 3（きまった数）→ y = 3 × x','グラフは 0 の点を通るまっすぐな線になる']}];
WHY['inv']=WHY['inv-graph']=()=>{let g='';[[1,12],[2,6],[3,4],[4,3],[6,2]].forEach(([a,b],i)=>{const s=2.2;g+=box(4+i*20,40-b*s,a*s*1.4,b*s,i%2?CB:CR,.4)+T(4+i*20+a*s*.7,44,`${a}×${b}`,3.2)});
  return[{svg:SVGW('0 0 104 48',g),cap:'面積12の長方形',lines:['たて x と よこ y をかけると、いつも 12','x が 2倍になると、y は 1/2 になる → 反比例','y = 12 ÷ x']}]};
/* 場合の数 */
WHY['comb']=WHY['comb-tree']=WHY['comb-more']=WHY['comb-league']=WHY['comb-path']=WHY['comb-coin']=()=>{let g='';['A','B','C'].forEach((a,i)=>{const y0=8+i*15;g+=T(6,y0+4,a,4);['A','B','C'].filter(x=>x!==a).forEach((b,j)=>{const y1=y0+j*7;const c=['A','B','C'].find(x=>x!==a&&x!==b);g+=`<line x1="9" y1="${y0+3}" x2="20" y2="${y1+2}" stroke="#111" stroke-width=".4"/>${T(23,y1+3.4,b,3.6)}<line x1="26" y1="${y1+2}" x2="36" y2="${y1+2}" stroke="#111" stroke-width=".4"/>${T(39,y1+3.4,c,3.6)}`})});
  g+=T(50,16,'1番目：3通り',3.6,'start')+T(50,24,'2番目：のこり2通り',3.6,'start')+T(50,32,'3番目：のこり1通り',3.6,'start')+T(50,42,'3 × 2 × 1 = 6通り',3.8,'start');
  return[{svg:SVGW('0 0 104 52',g),cap:'樹形図',lines:['1番目を決めると、2番目は残りから選ぶ','枝の数をかけ算すると、全部の数がわかる','組み合わせでは「AとB」と「BとA」が同じなので、重なりの分でわる']}]};
/* データ */
WHY['data']=WHY['dotplot']=WHY['data-compare']=WHY['histogram']=WHY['nobe']=()=>{const v=[2,3,3,4,4,4,5,7,9];const u=9,ox=8;let g=`<line x1="${ox}" y1="34" x2="${ox+8*u+4}" y2="34" stroke="#111" stroke-width=".6"/>`;for(let i=0;i<=8;i++)g+=`<line x1="${ox+i*u}" y1="34" x2="${ox+i*u}" y2="36" stroke="#111" stroke-width=".4"/>${T(ox+i*u,40,i+2,3.2)}`;
  const c={};v.forEach(x=>{c[x]=(c[x]||0)+1;g+=dot(ox+(x-2)*u,32-(c[x]-1)*4,1.5,x===4?CR.replace('#f3c2bc','#d9534f'):'#2a6fb0')});
  g+=`<line x1="${ox+(41/9-2)*u}" y1="10" x2="${ox+(41/9-2)*u}" y2="34" stroke="#2a6fb0" stroke-dasharray="1.5 1" stroke-width=".5"/>`+T(ox+(41/9-2)*u,8,'平均 4.6',3.2)+T(86,14,'最頻値 4（いちばん多い）',3.2,'start')+T(86,22,'中央値 4（5番目）',3.2,'start');
  return[{svg:SVGW('0 0 140 44',g),cap:'代表値',lines:['平均値：全部をならして同じにしたときの値（合計 ÷ 個数）','中央値：小さい順に並べたまん中の値（9こなら5番目）','最頻値：いちばん多く出てくる値']}]};
/* 文字と式 */
WHY['x-find']=WHY['x-value']=()=>{let g=`<rect x="10" y="10" width="50" height="10" fill="${CB}" stroke="#111" stroke-width=".6"/><rect x="60" y="10" width="30" height="10" fill="${CR}" stroke="#111" stroke-width=".6"/>`+T(35,17,'x',4.2)+T(75,17,'3',4)+`<line x1="10" y1="25" x2="90" y2="25" stroke="#111" stroke-width=".5"/>`+T(50,31,'10',4);
  return[{svg:SVGW('0 0 100 34',g),cap:'x + 3 = 10',lines:['テープ全体が 10、そのうち 3 がわかっている','のこりの x は 10 − 3 = 7','たし算の式の x は、ひき算で求められる（反対の計算）']}]};
WHY['x-expr']=WHY['x-match']=WHY['x-pattern']=()=>[{svg:'',cap:'□や○のかわりに文字',lines:['「1本80円のえんぴつを□本」→ 80 × □','□のかわりに x を使うと 80 × x と書ける','x にいろいろな数を入れると、代金がすぐに求められる']}];

/* ---- 1〜5年の主な単元 ---- */
const tenFrame=(x,y,n,col,extra)=>{let s='';for(let i=0;i<10;i++){const cx=x+(i%5)*7+3.5,cy=y+Math.floor(i/5)*7+3.5;s+=`<rect x="${cx-3.5}" y="${cy-3.5}" width="7" height="7" fill="#fff" stroke="#111" stroke-width=".4"/>`;if(i<n)s+=`<circle cx="${cx}" cy="${cy}" r="2.6" fill="${i>=n-(extra||0)?CR:col}" stroke="#111" stroke-width=".3"/>`}return s};
WHY['g1-add20']=()=>{let g=tenFrame(4,6,10,CB,1)+tenFrame(46,6,3,CR)+T(21,26,'9 と 1 で 10',3.6)+T(63,26,'のこり 3',3.6)+T(88,15,'→ 13',4.5,'start');
  return[{svg:SVGW('0 0 104 30',g),cap:'9 + 4',lines:['4 を 1 と 3 に わける','9 に 1 を たして 10','10 と 3 で 13']}]};
WHY['g1-sub20']=()=>{let g=tenFrame(4,6,10,CB)+tenFrame(46,6,3,CB)+`<line x1="4" y1="5" x2="${4+35}" y2="21" stroke="#c0392b" stroke-width=".5"/>`+T(21,26,'10 から 8 を とる → 2',3.4)+T(63,26,'ばらの 3',3.4)+T(88,15,'2 + 3 = 5',4,'start');
  return[{svg:SVGW('0 0 112 30',g),cap:'13 − 8',lines:['13 を 10 と 3 に わける','10 から 8 を とると 2','2 と 3 で 5']}]};
WHY['g1-pair']=WHY['g1-tens']=()=>[{svg:SVGW('0 0 50 20',tenFrame(4,3,7,CB)),cap:'10 は 7 と 3',lines:['10 の わくに 7こ ならべると、あいているのは 3こ','だから 7 と 3 で 10']}];
WHY['g2-kuku']=WHY['g2-mulpic']=WHY['g2-mulword']=WHY['g2-kuku-rev']=()=>{let g='';for(let r=0;r<4;r++){g+=`<rect x="4" y="${4+r*9}" width="30" height="7.5" rx="3.7" fill="none" stroke="#aaa" stroke-width=".4"/>`;for(let c=0;c<3;c++)g+=dot(10+c*9,7.8+r*9,2.6,CB)}g+=T(40,14,'1れつに 3こ',3.6,'start')+T(40,22,'それが 4れつ',3.6,'start')+T(40,32,'3 × 4 = 12',4,'start');
  return[{svg:SVGW('0 0 90 42',g),cap:'3 × 4',lines:['「1つ分の数 × いくつ分」','3こずつの まとまりが 4つ → 3 + 3 + 3 + 3 = 12']}]};
WHY['g2-add']=WHY['g2-hissan']=WHY['g3-add']=WHY['g3-hissan']=()=>{let g='';for(let i=0;i<3;i++)g+=`<rect x="${6+i*5}" y="4" width="3.5" height="20" fill="${CB}" stroke="#111" stroke-width=".3"/>`;for(let i=0;i<8;i++)g+=box(24+(i%4)*4.5,4+Math.floor(i/4)*4.5,3.8,3.8,CR,.3);
  g+=T(14,30,'十が3',3.4)+T(32,30,'一が8',3.4)+T(48,12,'+ 47',4,'start')+T(48,22,'一の位 8 + 7 = 15',3.4,'start')+T(48,29,'→ 10こで 十を1本に（くり上がり）',3.2,'start');
  return[{svg:SVGW('0 0 120 34',g),cap:'38 + 47',lines:['一の位どうし、十の位どうしをたす','一の位が10こになったら、十の位の1本と取りかえる（くり上がり）']}]};
WHY['g3-div']=WHY['g3-divword']=WHY['g4-div1']=()=>{let g='';for(let k=0;k<3;k++){g+=`<rect x="${4+k*26}" y="4" width="22" height="20" rx="3" fill="none" stroke="#999" stroke-width=".5"/>`;for(let i=0;i<4;i++)g+=dot(10+k*26+(i%2)*10,10+Math.floor(i/2)*8,2.6,CB)}g+=T(86,14,'12 ÷ 3 = 4',4,'start');
  return[{svg:SVGW('0 0 120 28',g),cap:'12こを 3人で 同じ数ずつ',lines:['1人に1こずつ、じゅんに くばっていく','1人分は 4こ → 12 ÷ 3 = 4','たしかめ：3 × 4 = 12']}]};
WHY['g3-dec']=WHY['g3-decline']=WHY['g4-decstruct']=WHY['g4-dec']=()=>{let g='';for(let i=0;i<10;i++)g+=box(6+i*8,6,8,10,i<7?CB:'#fff',.4);g+=T(6,22,'0',3.4)+T(86,22,'1',3.4)+T(62,22,'0.7',3.4)+T(92,12,'1 を 10こに 分けた 1つが 0.1',3.4,'start');
  return[{svg:SVGW('0 0 150 26',g),cap:'0.1 が 7こで 0.7',lines:['1 を 10等分した 1つ分が 0.1','小数の計算は「0.1 が いくつ分」と 考えると、整数と 同じように できる']}]};
WHY['g3-frac']=WHY['g4-frac']=WHY['g4-fraceq']=WHY['r-fadd']=WHY['g5-fadd']=WHY['g5-reduce']=()=>{let g='';for(let i=0;i<2;i++)g+=box(6+i*24,6,24,8,i<1?CB:'#fff',.5);for(let i=0;i<3;i++)g+=box(6+i*16,18,16,8,i<1?CR:'#fff',.5);for(let i=0;i<6;i++)g+=box(6+i*8,30,8,8,i<3?CB:i<5?CR:'#fff',.5);
  g+=T(58,12,'1/2 = 3/6',3.6,'start')+T(58,24,'1/3 = 2/6',3.6,'start')+T(58,36,'1/2 + 1/3 = 5/6',3.6,'start');
  return[{svg:SVGW('0 0 100 42',g),cap:'通分',lines:['分母がちがうと 1つ分の大きさがちがうので、そのままではたせない','同じ大きさ（1/6）に分けなおす（通分）と、たし算ができる']}]};
WHY['g4-area']=WHY['g4-area-L']=()=>{let g='';for(let i=0;i<4;i++)for(let j=0;j<3;j++)g+=box(6+i*8,6+j*8,8,8,(i+j)%2?CB:'#dceaf6',.4);g+=T(22,34,'よこ 4cm',3.4)+T(4,18,'たて 3cm',3.4,'end')+T(44,14,'1cm² の正方形が',3.6,'start')+T(44,22,'4 × 3 = 12こ → 12cm²',3.6,'start');
  return[{svg:SVGW('-14 0 120 38',g),cap:'面積は 1cm² が いくつ分',lines:['1辺 1cm の正方形（1cm²）が いくつ分かが 面積','1れつに よこの数だけ、それが たての数だけ → たて × よこ']}]};
WHY['g4-angle']=WHY['g4-sankaku']=WHY['g4-protractor']=()=>{let g=`<path d="M10,30 A30,30 0 0 1 70,30" fill="#eef4fb" stroke="#111" stroke-width=".6"/><line x1="4" y1="30" x2="76" y2="30" stroke="#111" stroke-width=".9"/><line x1="40" y1="30" x2="${num(40+32*Math.cos(Math.PI/3))}" y2="${num(30-32*Math.sin(Math.PI/3))}" stroke="#111" stroke-width=".9"/>`+T(52,24,'60°',3.6)+T(30,24,'ア',3.8)+T(84,18,'一直線は 180°',3.6,'start')+T(84,26,'ア = 180° − 60°',3.6,'start');
  return[{svg:SVGW('0 0 140 34',g),cap:'一直線の角は 180°',lines:['半回転（一直線）の角は 180°、1回転は 360°','わかっている角を 180° から ひくと、のこりの角が わかる']}]};
WHY['g5-area']=WHY['r-area']=()=>{let g=`<polygon points="4,30 34,30 24,8" fill="${CB}" stroke="#111" stroke-width=".6"/><polygon points="24,8 54,8 34,30" fill="none" stroke="#111" stroke-width=".5" stroke-dasharray="1.5 1"/>`+T(29,38,'三角形 ＝ 平行四辺形の半分',3.2);
  g+=`<polygon points="66,30 96,30 104,8 74,8" fill="${CR}" stroke="#111" stroke-width=".6"/><line x1="74" y1="8" x2="74" y2="30" stroke="#111" stroke-dasharray="1.5 1" stroke-width=".4"/><polygon points="96,30 104,30 104,8" fill="none" stroke="#111" stroke-width=".4" stroke-dasharray="1.5 1"/>`+T(86,38,'切って移すと長方形',3.2);
  return[{svg:SVGW('0 0 112 42',g),cap:'形を変えて考える',lines:['平行四辺形：三角形を切って反対側に移すと長方形 → 底辺 × 高さ','三角形：同じ三角形を2つ合わせると平行四辺形 → 底辺 × 高さ ÷ 2','台形：同じ台形を2つ合わせると平行四辺形 → (上底 + 下底) × 高さ ÷ 2']}]};
WHY['g5-tri']=WHY['g5-quadangle']=()=>{let g=`<polygon points="6,30 40,30 18,6" fill="#eef4fb" stroke="#111" stroke-width=".7"/>`+T(10,28,'ア',3.4)+T(35,28,'イ',3.4)+T(18,12,'ウ',3.4)+arrowR(44,20,54,'')+`<line x1="58" y1="30" x2="110" y2="30" stroke="#111" stroke-width=".8"/><path d="M84,30 L66,30 A18,18 0 0 1 ${num(84-18*Math.cos(Math.PI/3))},${num(30-18*Math.sin(Math.PI/3))} Z" fill="${CB}" stroke="#111" stroke-width=".3"/><path d="M84,30 L${num(84-18*Math.cos(Math.PI/3))},${num(30-18*Math.sin(Math.PI/3))} A18,18 0 0 1 ${num(84+18*Math.cos(Math.PI*.45))},${num(30-18*Math.sin(Math.PI*.45))} Z" fill="${CY}" stroke="#111" stroke-width=".3"/><path d="M84,30 L${num(84+18*Math.cos(Math.PI*.45))},${num(30-18*Math.sin(Math.PI*.45))} A18,18 0 0 1 102,30 Z" fill="${CR}" stroke="#111" stroke-width=".3"/>`+T(84,38,'3つの角を並べると一直線（180°）',3.2);
  return[{svg:SVGW('0 0 116 42',g),cap:'三角形の3つの角',lines:['三角形の3つの角を切りとって並べると、ぴったり一直線になる','だから 3つの角の和は 180°','四角形は2つの三角形に分けられるので 360°']}]};
WHY['g5-circum']=()=>{let g=`<circle cx="24" cy="22" r="18" fill="#fff" stroke="#111" stroke-width=".7"/>`+polyS(Array.from({length:6},(_,i)=>[24+18*Math.cos(i*Math.PI/3),22+18*Math.sin(i*Math.PI/3)]),1,0,0,'#2a6fb0','none',.6)+`<rect x="6" y="4" width="36" height="36" fill="none" stroke="#c0392b" stroke-width=".6"/>`+T(48,14,'内側の六角形のまわり ＝ 直径 × 3',3.4,'start')+T(48,22,'外側の正方形のまわり ＝ 直径 × 4',3.4,'start')+T(48,32,'円周はその間 → 直径 × 3.14',3.6,'start');
  return[{svg:SVGW('0 0 120 44',g),cap:'円周は直径の約3.14倍',lines:['円の内側の正六角形のまわりは、直径の3倍','円の外側の正方形のまわりは、直径の4倍','円周はその間で、くわしく調べると直径の約3.14倍（円周率）']}]};
WHY['g5-avg']=()=>{const v=[3,6,4,7];let g='';v.forEach((x,i)=>g+=box(6+i*12,34-x*4,9,x*4,CB,.4));g+=`<line x1="4" y1="${34-5*4}" x2="54" y2="${34-5*4}" stroke="#c0392b" stroke-dasharray="2 1" stroke-width=".6"/>`+T(58,16,'でこぼこを ならすと',3.6,'start')+T(58,24,'(3+6+4+7) ÷ 4 = 5',3.6,'start');
  return[{svg:SVGW('0 0 120 38',g),cap:'平均 ＝ ならした大きさ',lines:['多いところから少ないところへ移して、同じ高さにする','そのときの高さが平均：合計 ÷ 個数']}]};
WHY['g5-speed']=WHY['r-speed']=WHY['frac-app']=()=>{const ox=10,u=25;let g=`<line x1="${ox}" y1="12" x2="${ox+3*u+6}" y2="12" stroke="#111" stroke-width=".6"/><line x1="${ox}" y1="28" x2="${ox+3*u+6}" y2="28" stroke="#111" stroke-width=".6"/>`;[0,1,2,3].forEach(i=>g+=`<line x1="${ox+i*u}" y1="10" x2="${ox+i*u}" y2="30" stroke="#999" stroke-width=".3"/>${T(ox+i*u,8,i*60+'km',3.4)}${T(ox+i*u,35,i+'時間',3.4)}`);
  return[{svg:SVGW('0 0 100 38',g),cap:'時速60km',lines:['1時間に 60km 進む速さ','2時間で 60 × 2、3時間で 60 × 3 → 道のり = 速さ × 時間','反対に、速さ = 道のり ÷ 時間、時間 = 道のり ÷ 速さ']}]};
WHY['g5-percent']=WHY['r-percent']=WHY['g5-pconv']=()=>{let g=`<rect x="8" y="8" width="84" height="10" fill="#fff" stroke="#111" stroke-width=".6"/><rect x="8" y="8" width="${84*.3}" height="10" fill="${CB}" stroke="#111" stroke-width=".6"/>`+`<line x1="8" y1="24" x2="92" y2="24" stroke="#111" stroke-width=".5"/>`+T(8,30,'0',3.4)+T(8+84*.3,30,'0.3（30%）',3.4)+T(92,30,'1（100%）',3.4)+T(8+84*.3/2,15,'60人',3.4)+T(80,15,'200人',3.4);
  return[{svg:SVGW('0 0 100 34',g),cap:'200人の30%',lines:['もとにする量（200人）を 1（100%）とみる','30% = 0.3 にあたる量は 200 × 0.3 = 60人','割合 = くらべる量 ÷ もとにする量']}]};
WHY['g5-decmul']=WHY['r-decmul']=()=>{let g='';for(let i=0;i<10;i++)for(let j=0;j<10;j++)g+=`<rect x="${6+i*3.2}" y="${4+j*3.2}" width="3.2" height="3.2" fill="${i<3&&j<2?CB:'#fff'}" stroke="#bbb" stroke-width=".15"/>`;g+=`<rect x="6" y="4" width="32" height="32" fill="none" stroke="#111" stroke-width=".6"/>`+T(44,14,'1 を 10 × 10 = 100 に分けた1つが 0.01',3.4,'start')+T(44,22,'0.3 × 0.2 は 3 × 2 = 6こ分 → 0.06',3.4,'start');
  return[{svg:SVGW('0 0 130 40',g),cap:'0.3 × 0.2',lines:['1辺1の正方形を、たて・よこ10等分する','小さい正方形1つは 0.01','だから 0.3 × 0.2 は 0.01 が 6こ = 0.06（小数点の位置がずれる理由）']}]};
WHY['g5-decdiv']=WHY['r-decdiv']=()=>[{svg:'',cap:'わる数を整数にしてよい理由',lines:['わる数とわられる数に同じ数をかけても、商は変わらない','7.56 ÷ 1.8 = 75.6 ÷ 18（両方10倍）','だから、わる数が整数になるように小数点を同じだけ動かす']}];
WHY['g5-gcd']=WHY['g5-lcmword']=()=>{let g='';[4,6].forEach((k,r)=>{for(let i=1;i<=24;i++){const on=i%k===0;g+=`<rect x="${4+i*4}" y="${6+r*8}" width="3.6" height="6" fill="${on?(i%12===0?CR:CB):'#fff'}" stroke="#ccc" stroke-width=".2"/>`}g+=T(6,11+r*8,k+'の倍数',3,'end')});g+=T(52,30,'4 と 6 の両方に色がつくのは 12、24 … → 最小公倍数 12',3.2);
  return[{svg:SVGW('-20 0 128 34',g),cap:'公倍数',lines:['4の倍数と6の倍数に色をぬると、両方ぬられる数が公倍数','いちばん小さい公倍数（12）が最小公倍数']}]};
/* 6年の復習コピー・単位など別名 */
['units','units-len','units-prefix','units-word','g4-units-area','g5-volunit','g2-units','g3-units'].forEach(id=>WHY[id]=()=>[{svg:SVGW('0 0 120 30',box(6,4,22,22,CB,.6)+T(17,17,'1m',3.6)+T(34,10,'1m = 100cm',3.4,'start')+T(34,18,'1m² = 100cm × 100cm',3.4,'start')+T(34,26,'= 10000cm²',3.4,'start')),cap:'単位のしくみ',lines:['長さが10倍になると、面積は 10 × 10 = 100倍、体積は 10 × 10 × 10 = 1000倍','k（キロ）は1000倍、c（センチ）は1/100、m（ミリ）は1/1000']}]);
