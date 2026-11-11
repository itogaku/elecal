/* ============ 資料Cをもとにした追加：なぞり問題・新しい問題タイプ（6年） ============ */
const B_='{_}';
const add6=(ch,items,at)=>{const c=GRADE_UNITS[6].find(x=>x.ch===ch);if(at==null)c.items.push(...items);else c.items.splice(at,0,...items)};

/* ---------- □をうめて解き方をなぞる ---------- */
add6('分数のかけ算・わり算',[
 {id:'frac-guide',title:'□をうめて計算（分数のかけ算・わり算）',kind:'calc',n:8,cols:1,lead:'□にあてはまる数を書いて、計算のしかたをなぞりましょう。',
  explain:{points:[{h:'かけ算',b:'分子どうし・分母どうしをかけます。整数をかけるときは、分子にだけかけます。'},{h:'わり算',b:'わる数の分子と分母を入れかえて（逆数にして）、かけ算になおします。'}],tip:'<b>こつ</b>　□に入る数を1つずつ確かめながら、計算の流れを覚えましょう。'},
  gen(){const t=ri(0,3);
   if(t===0){const a=proper(),k=ri(2,9),rn=a.n*k,r=new Fr(rn,a.d);return{q:`<span class="guide-q">${FH(a)} × ${k} = ${F(`${a.n} × ${B_}`,a.d)} = ${F(B_,a.d)}${r.d!==a.d?` = ${B_}`:''}</span>`,tail:'',blanks:[k,rn,...(r.d!==a.d?[A(r)]:[])],a:A(r),steps:['分母はそのまま、分子に整数をかける',...reduceStep(rn,a.d)]}}
   if(t===1){const a=proper(),k=ri(2,9),rd=a.d*k,r=new Fr(a.n,rd);return{q:`<span class="guide-q">${FH(a)} ÷ ${k} = ${F(a.n,`${a.d} × ${B_}`)} = ${F(a.n,B_)}${r.d!==rd?` = ${B_}`:''}</span>`,tail:'',blanks:[k,rd,...(r.d!==rd?[A(r)]:[])],a:A(r),steps:['分子はそのまま、分母に整数をかける',...reduceStep(a.n,rd)]}}
   const a=proper(),b=proper();
   if(t===2){const rn=a.n*b.n,rd=a.d*b.d,r=new Fr(rn,rd);return{q:`<span class="guide-q">${FH(a)} × ${FH(b)} = ${F(`${a.n} × ${B_}`,`${a.d} × ${B_}`)} = ${F(B_,B_)}${r.n!==rn?` = ${B_}`:''}</span>`,tail:'',blanks:[b.n,b.d,rn,rd,...(r.n!==rn?[A(r)]:[])],a:A(r),steps:['分子どうし、分母どうしをかける',...reduceStep(rn,rd)]}}
   const rn=a.n*b.d,rd=a.d*b.n,r=new Fr(rn,rd);return{q:`<span class="guide-q">${FH(a)} ÷ ${FH(b)} = ${FH(a)} × ${F(B_,B_)} = ${F(`${a.n} × ${b.d}`,`${a.d} × ${b.n}`)} = ${B_}</span>`,tail:'',blanks:[b.d,b.n,A(r)],a:A(r),steps:['わる数の逆数をかける',...reduceStep(rn,rd)]}}},
]);
add6('比',[
 {id:'ratio-guide',title:'□をうめて等しい比',kind:'calc',n:8,cols:1,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'等しい比のつくり方',b:'比の両方の数に同じ数をかけても、同じ数でわっても、等しい比になります。'},{h:'矢印で考える',b:'前の数が何倍になっているかを矢印で書きこみ、うしろの数にも同じ数をかけます。',ex:'10 : 50 = 20 : 100（両方 ×2）'}],tip:'<b>こつ</b>　まず「何倍？」を□に書き、それから答えを求めましょう。'},
  gen(){let p,q;do{p=ri(1,9);q=ri(1,9)}while(p===q||gcd(p,q)!==1);const k=ri(2,9);
   if(chance(.5))return{q:`<span class="guide-q">${p} : ${q} = ${p*k} : ${B_}　（${p} → ${p*k} は ×${B_} なので、${q} × ${B_}）</span>`,tail:'',blanks:[q*k,k,k],a:String(q*k),steps:[`${p} × ${k} = ${p*k}`,`${q} × ${k} = ${q*k}`]};
   const g=ri(2,9);return{q:`<span class="guide-q">${p*g} : ${q*g} = (${p*g} ÷ ${B_}) : (${q*g} ÷ ${B_}) = ${B_} : ${B_}</span>`,tail:'',blanks:[g,g,p,q],a:`${p} : ${q}`,steps:[`${p*g} と ${q*g} の最大公約数は ${g}`,`両方を ${g} でわる`]}}},
]);
add6('文字と式',[
 {id:'x-guide',title:'□をうめて x を求める',kind:'calc',n:8,cols:1,lead:'□にあてはまる数や記号を書いて、x を求めましょう。',
  explain:{points:[{h:'反対の計算',b:'x + a = b なら x = b − a、x × a = b なら x = b ÷ a のように、反対の計算で求めます。'},{h:'2回の計算があるとき',b:'x × 3 + 5 = 20 なら、まず「x × 3」を1つのまとまりとみて、x × 3 = 20 − 5 = 15、x = 15 ÷ 3 = 5'}],tip:'<b>たしかめ</b>　求めた x をもとの式に入れて、正しくなるか計算しましょう。'},
  gen(){const a=ri(2,9),x=ri(2,15),b=ri(1,30);
   if(chance(.5)){const c=a*x+b;return{q:`<span class="guide-q">${X} × ${a} + ${b} = ${c}　→　${X} × ${a} = ${c} − ${B_} = ${B_}　→　${X} = ${B_} ÷ ${a} = ${B_}</span>`,tail:'',blanks:[b,a*x,a*x,x],a:`${X} = ${x}`,steps:[`まず ${X} × ${a} を求める：${c} − ${b} = ${a*x}`,`${X} = ${a*x} ÷ ${a} = ${x}`]}}
   const c=(x+b)*a;return{q:`<span class="guide-q">(${X} + ${b}) × ${a} = ${c}　→　${X} + ${b} = ${c} ÷ ${B_} = ${B_}　→　${X} = ${B_} − ${b} = ${B_}</span>`,tail:'',blanks:[a,x+b,x+b,x],a:`${X} = ${x}`,steps:[`まず ( ) の中を求める：${c} ÷ ${a} = ${x+b}`,`${X} = ${x+b} − ${b} = ${x}`]}}},
]);

/* ---------- およその面積（方眼を数える） ---------- */
function inPoly(x,y,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const [xi,yi]=P[i],[xj,yj]=P[j];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c}return c}
add6('いろいろな面積',[
 {id:'approx-grid',title:'方眼を数えておよその面積',kind:'fig',n:2,cols:2,lead:'方眼を数えて、図形のおよその面積を求めましょう。',
  explain:{points:[{h:'数え方',b:'図形の中に全部入っている方眼は1こ、線にかかっている方眼は半分（0.5こ）と考えて数えます。'},{h:'計算',b:'およその面積 ＝ 全部入っている数 ＋ 線にかかっている数 ÷ 2'}],tip:'<b>こつ</b>　数えた方眼に印をつけながら数えると、数えまちがいが少なくなります。'},
  gen(){const W=10,H=10,R=3.6+rng()*.6,p1=rng()*6,p2=rng()*6,a1=.12+rng()*.1,a2=.08+rng()*.08,cx=5,cy=5;
   const P=Array.from({length:360},(_,i)=>{const t=i*Math.PI/180,r=R*(1+a1*Math.sin(2*t+p1)+a2*Math.sin(3*t+p2));return[cx+r*Math.cos(t),cy+r*Math.sin(t)]});
   let full=0,part=0;const marks=[];
   for(let i=0;i<W;i++)for(let j=0;j<H;j++){const cs=[[i,j],[i+1,j],[i,j+1],[i+1,j+1]].map(([x,y])=>inPoly(x,y,P)),vin=P.some(([x,y])=>x>i&&x<i+1&&y>j&&y<j+1);
     if(cs.every(Boolean)&&!vin){full++;marks.push([i,j,'f'])}else if(cs.some(Boolean)||vin){part++;marks.push([i,j,'p'])}}
   const s=9,o=4,unit=pick(['cm','km']);const shape=`<polygon points="${P.map(([x,y])=>`${num(o+x*s)},${num(o+y*s)}`).join(' ')}" fill="${CB}" fill-opacity=".55" stroke="#111" stroke-width=".8"/>`;
   const mk=marks.map(([i,j,k])=>k==='f'?`<circle cx="${o+i*s+s/2}" cy="${o+j*s+s/2}" r="1.3" fill="#c0392b"/>`:`<path d="M${o+i*s+2},${o+j*s+s-2} L${o+i*s+s-2},${o+j*s+2}" stroke="#2a6fb0" stroke-width=".6"/>`).join('');
   const base=gl(W,H,s,o,o)+shape;const v=num(full+part/2);
   return{q:`<div class="fig">${SVGW('0 0 98 98',base)}</div><div class="figcap">方眼1目もりは 1${unit}。(1) 全部入っている方眼　(2) 線にかかっている方眼　(3) およその面積</div>`,a:`<div class="fig">${SVGW('0 0 98 98',base+mk)}</div><div class="ans-block">(1) <b>${full}こ</b>（●）　(2) <b>${part}こ</b>（／）　(3) <b>約 ${v}${unit}²</b><br><span style="font-size:8.5pt">※ 線にかかっているかどうかの見方で、数が少しちがってもかまいません。</span></div>`,figAns:true,
     steps:[`全部入っている方眼 ${full}こ、線にかかっている方眼 ${part}こ`,`${full} + ${part} ÷ 2 = ${v}`]}}},
]);

/* ---------- 縮図で高さを求める ---------- */
add6('拡大図と縮図',[
 {id:'scale-height',title:'縮図で実際の高さを求める',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'縮図をかいて測る',b:'直接はかれない高さも、縮図をかいて縮図上の長さを測れば、実際の長さを計算で求められます。'},{h:'目の高さに注意',b:'見上げて測るときは、目の高さから上の部分を求めているので、最後に目の高さをたします。'}],tip:'<b>こつ</b>　縮図上の長さ × 縮尺の分母 で実際の長さ（単位は cm）になります。'},
  gen(){const n=pick([200,250,500,1000]),eye=pick([1.2,1.4,1.5]),l=ri(10,60)/10,real=num(l*n/100),H=num(l*n/100+eye);
   const what=pick(['木','校舎','電柱','タワー']);
   return{q:`${what}から少しはなれたところで見上げて、縮尺 ${F(1,n)} の縮図をかきました。縮図の上で、目の高さから${what}の先までの長さは ${num(l)}cm でした。目の高さを ${eye}m とすると、${what}の実際の高さは約何m ですか。`,
     a:`式 ${num(l)} × ${n} = ${num(l*n)}（cm）→ ${real}m、${real} + ${eye} = ${H}　答え 約${H}m`,steps:[`縮図上の ${num(l)}cm は、実際には ${num(l)} × ${n} = ${num(l*n)}cm = ${real}m`,`目の高さ ${eye}m をたす`]}}},
]);

/* ---------- 角柱・円柱：面・辺・頂点、石の体積 ---------- */
add6('角柱や円柱の体積',[
 {id:'prism-count',title:'角柱・円柱の面・辺・頂点',kind:'word',n:5,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'□角柱の数',b:'面の数 ＝ □ ＋ 2（底面2つと側面□つ）、辺の数 ＝ □ × 3、頂点の数 ＝ □ × 2'},{h:'円柱',b:'平らな面（底面）が2つと、曲がった面（側面）が1つあります。'}],tip:'<b>こつ</b>　底面の多角形の辺の数が □ です。三角柱なら □ = 3 です。'},
  gen(){const n=ri(3,10),nm=['','','','三','四','五','六','七','八','九','十'][n];return pick([
   ()=>({q:`${nm}角柱の、面の数・辺の数・頂点の数をそれぞれ答えましょう。`,parts:['答え'],a:`答え 面 ${n+2}、辺 ${3*n}、頂点 ${2*n}`,steps:[`面：底面2つ ＋ 側面 ${n}つ = ${n+2}`,`辺：底面のまわり ${n} × 2 ＋ 側面の辺 ${n} = ${3*n}`,`頂点：上と下に ${n}こずつ = ${2*n}`]}),
   ()=>({q:`辺の数が ${3*n}本の角柱は、何角柱ですか。`,parts:['答え'],a:`答え ${nm}角柱`,steps:[`辺の数 = □ × 3 なので、□ = ${3*n} ÷ 3 = ${n}`]}),
   ()=>({q:`頂点の数が ${2*n}この角柱の、面の数はいくつですか。`,parts:['答え'],a:`答え ${n+2}`,steps:[`頂点の数 = □ × 2 → □ = ${n}`,`面の数 = ${n} + 2`]}),
  ])()}},
 {id:'stone-volume',title:'水の高さで体積を求める',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'しずめた物の体積',b:'水の中に物を全部しずめると、その物の体積の分だけ水面が上がります。'},{h:'求め方',b:'しずめた物の体積 ＝ 水そうの底面積 × 上がった水の高さ'}],tip:'<b>ちゅうい</b>　水そうの長さは「内のり」（内側の長さ）を使います。'},
  gen(){const a=pick([10,15,20,25,30]),b=pick([10,12,15,20]),h=ri(1,6)*(chance(.5)?1:.5),v=num(a*b*h);
   return{q:`内のりが、たて ${a}cm、横 ${b}cm の直方体の水そうに水が入っています。この中に石を全部しずめたら、水面が ${num(h)}cm 上がりました。石の体積は何cm³ ですか。`,a:`式 ${a} × ${b} × ${num(h)} = ${v}　答え ${v}cm³`,steps:['上がった水の体積 = 石の体積',`底面積 ${a} × ${b} = ${a*b}、× 上がった高さ ${num(h)}`]}}},
]);

/* ---------- 比例・反比例かどうか ---------- */
add6('比例と反比例',[
 {id:'prop-judge',title:'比例・反比例を見分ける',kind:'table',n:3,cols:1,lead:'表を見て、y が x に比例するか、反比例するか、どちらでもないかを答えましょう。比例・反比例するときは、式も書きましょう。',
  explain:{points:[{h:'比例',b:'x が 2倍、3倍…になると y も 2倍、3倍…。y ÷ x がいつも同じ数です。'},{h:'反比例',b:'x が 2倍、3倍…になると y は 1/2、1/3…。x × y がいつも同じ数です。'}],tip:'<b>こつ</b>　y ÷ x と x × y の両方を計算してみて、どちらがいつも同じかを調べましょう。'},
  gen(){const t=ri(0,2),xs=[1,2,3,4,6];let ys,ans,st;
   if(t===0){const a=ri(2,9);ys=xs.map(x=>a*x);ans=`比例　${Y} = ${a} × ${X}`;st=[`${Y} ÷ ${X} がいつも ${a}`]}
   else if(t===1){const K=pick([12,24,36,48]);ys=xs.map(x=>K/x);ans=`反比例　${Y} = ${K} ÷ ${X}`;st=[`${X} × ${Y} がいつも ${K}`]}
   else{const c=ri(2,9);ys=xs.map(x=>x+c);ans='どちらでもない';st=[`${Y} ÷ ${X} も ${X} × ${Y} も一定ではない（${Y} = ${X} + ${c}）`]}
   const ctx=pick(['ある2つの量','x と y']);
   const tb=`<table class="tbl"><tr><th>${X}</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>${Y}</th>${ys.map(y=>`<td>${y}</td>`).join('')}</tr></table>`;
   return{q:`${tb}`,parts:['答え'],a:ans,steps:st}}},
]);

/* ---------- 中学への準備 ---------- */
const PREP='中学への準備（復習）';
add6(PREP,[
 {id:'big-num',title:'大きな数（億・兆）',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'4けたごとに単位が変わる',b:'一・十・百・千 のくり返しで、万・億・兆 と4けたごとに大きな単位になります。'},{h:'10倍・1/10',b:'10倍すると位が1つ上がり、1/10にすると位が1つ下がります。'}],tip:'<b>こつ</b>　右から4けたずつ区切ると、読みやすくなります。'},
  gen(){const t=ri(0,3),a=ri(2,9);
   if(t===0)return{q:`${a}億を 10倍した数は {_}`,tail:'',a:`${a*10}億`,steps:['位が1つ上がる']};
   if(t===1)return{q:`1兆は 1億の {_}倍`,tail:'',a:'10000',steps:['1兆 = 1億 × 10000（4けた上）']};
   if(t===2){const b=ri(1,9)*100,c=ri(1,9)*100;return{q:`${b}億 + ${c}億 = {_}`,tail:'',a:b+c>=10000?`${Math.floor((b+c)/10000)}兆${(b+c)%10000?(b+c)%10000+'億':''}`:`${b+c}億`,steps:['億を単位にして計算する',...(b+c>=10000?['10000億 = 1兆']:[])]}}
   const m=ri(1,9)*1000+ri(0,9)*100;return{q:`${a}億${m}万 を数字で書くと {_}`,tail:'',a:String(a*100000000+m*10000),steps:['億の位、万の位をそろえて書く']}}},
 {id:'speed-units',title:'速さの単位をかえる',kind:'calc',n:8,cols:1,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'時速 → 分速 → 秒速',b:'1時間 = 60分、1分 = 60秒 なので、時速 ÷ 60 = 分速、分速 ÷ 60 = 秒速 です。'},{h:'km と m',b:'1km = 1000m。単位をそろえてから60でわります。'}],tip:'<b>ちゅうい</b>　秒速 → 時速は、60 × 60 = 3600 倍になります。'},
  gen(){const v=pick([36,54,72,90,108,18]),m=v*1000/60,s=m/60;
   if(chance(.5))return{q:`<span class="guide-q">時速 ${v}km ＝ 分速 ${B_}m ＝ 秒速 ${B_}m</span>`,tail:'',blanks:[m,s],a:`分速 ${m}m、秒速 ${s}m`,steps:[`${v}km = ${v*1000}m、${v*1000} ÷ 60 = ${m}`,`${m} ÷ 60 = ${s}`]};
   return{q:`<span class="guide-q">秒速 ${s}m ＝ 分速 ${B_}m ＝ 時速 ${B_}km</span>`,tail:'',blanks:[m,v],a:`分速 ${m}m、時速 ${v}km`,steps:[`${s} × 60 = ${m}`,`${m} × 60 = ${m*60}m = ${v}km`]}}},
 {id:'angle-parallel',title:'平行線と角',kind:'fig',n:6,cols:3,lead:'2本の直線あ、いは平行です。アの角の大きさを求めましょう。',
  explain:{points:[{h:'平行線と角',b:'平行な2本の直線に1本の直線が交わると、同じ位置にある角（同位角）は等しく、ななめ向かいの角（錯角）も等しくなります。'},{h:'一直線と向かい合う角',b:'一直線の角は 180°。2本の直線が交わってできる向かい合った角（対頂角）は等しくなります。'}],tip:'<b>こつ</b>　平行な直線にそって角をすべらせると、同じ大きさの角が見つかります。'},
  gen(){const th=ri(8,16)*5,r=th*Math.PI/180,P=[58,26],Q=[58-30/Math.tan(r),56];
   const ang=pos=>pos%2===0?th:180-th; // 0:右上 1:左上 2:左下 3:右下
   const dirs=pos=>[th/2,(th+180)/2,180+th/2,(180+th+360)/2][pos]*Math.PI/180;
   const gp=ri(0,3),gq=ri(0,1),ap=ri(0,3);const G=gq?P:Q,Aq=gq?Q:P;
   const lab=(C,pos,t)=>T(C[0]+11*Math.cos(dirs(pos)),C[1]-11*Math.sin(dirs(pos))+1.6,t,4.4);
   const L=60;let g=`<line x1="4" y1="26" x2="98" y2="26" stroke="#111" stroke-width="1"/><line x1="4" y1="56" x2="98" y2="56" stroke="#111" stroke-width="1"/><line x1="${num(P[0]+L*Math.cos(r)*0.4)}" y1="${num(P[1]-L*Math.sin(r)*0.4)}" x2="${num(Q[0]-L*Math.cos(r)*0.4)}" y2="${num(Q[1]+L*Math.sin(r)*0.4)}" stroke="#111" stroke-width="1"/>`;
   g+=T(100,25,'あ',4,'start')+T(100,55,'い',4,'start')+lab(G,gp,ang(gp)+'°')+lab(Aq,ap,'ア');
   const a=ang(ap),same=(gp%2)===(ap%2);
   return{q:`<div class="fig">${SVGW('0 2 106 76',g)}</div>`,a:`<b>${a}°</b>`,steps:[same?'同じ向きの角（同位角・錯角・対頂角）は等しい':`一直線は 180° なので、180° − ${ang(gp)}°`,`ア = ${a}°`]}}},
 {id:'polygon-sum',title:'多角形の角の和',kind:'calc',n:10,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'三角形に分ける',b:'□角形は、1つの頂点から対角線をひくと（□ − 2）この三角形に分けられます。'},{h:'角の和',b:'□角形の角の和 ＝ 180° × (□ − 2)',ex:'五角形 → 180° × 3 = 540°'}],tip:'<b>こつ</b>　正多角形の1つの角は、角の和 ÷ 頂点の数 で求められます。'},
  gen(){const n=ri(4,10),nm=['','','','三','四','五','六','七','八','九','十'][n],S=180*(n-2);
   if(chance(.5))return{q:`${nm}角形の角の和は {_}°`,tail:'',a:String(S),steps:[`${n-2}この三角形に分けられる`,`180 × ${n-2} = ${S}`]};
   if(360%n===0||S%n===0)return{q:`正${nm}角形の1つの角は {_}°`,tail:'',a:num(S/n),steps:[`角の和 180 × ${n-2} = ${S}`,`${S} ÷ ${n} = ${num(S/n)}`]};
   return this.gen()}},
 {id:'quad-prop',title:'四角形の性質',kind:'fig',n:2,cols:1,lead:'あてはまるところに○を書きましょう。',
  explain:{points:[{h:'辺と角',b:'平行四辺形は向かい合う辺が平行で長さが等しい。ひし形は4つの辺が等しい。長方形は4つの角が直角。正方形はその全部。'},{h:'対角線',b:'平行四辺形の対角線はまん中で交わり、ひし形は垂直に、長方形は長さが等しく交わります。'}],tip:'<b>こつ</b>　正方形は、ひし形でもあり長方形でもあります。'},
  gen(){const rows=['台形','平行四辺形','ひし形','長方形','正方形'];const all=[['向かい合う2組の辺が平行',[0,1,1,1,1]],['4つの辺の長さが等しい',[0,0,1,0,1]],['4つの角が直角',[0,0,0,1,1]],['対角線がまん中で交わる',[0,1,1,1,1]],['対角線が垂直に交わる',[0,0,1,0,1]],['対角線の長さが等しい',[0,0,0,1,1]]];
   const cols=shuffle([...all]).slice(0,4);const tb=sh=>`<table class="tbl" style="width:100%"><tr><th></th>${cols.map(c=>`<th style="font-weight:400;font-size:8.5pt;white-space:normal">${c[0]}</th>`).join('')}</tr>${rows.map((r,i)=>`<tr><th>${r}</th>${cols.map(c=>c[1][i]?(sh?'<td class="r">○</td>':'<td></td>'):'<td></td>').join('')}</tr>`).join('')}</table>`;
   return{q:tb(false),a:tb(true),figAns:true,steps:['正方形は、ひし形と長方形の両方の性質をもつ','平行四辺形の性質は、ひし形・長方形・正方形にもある']}}},
 {id:'dice-net',title:'さいころの展開図',kind:'fig',n:4,cols:2,lead:'さいころは、向かい合う面の目の数の和が 7 です。あいている面に数を書きましょう。',
  explain:{points:[{h:'さいころのきまり',b:'向かい合う面の数をたすと、いつも 7（1と6、2と5、3と4）です。'},{h:'展開図で向かい合う面',b:'4つならんだ面では1つおき、そのほかの面は組み立てたところを想像して見つけます。'}],tip:'<b>こつ</b>　まず向かい合う面の組を見つけてから、7 − （わかっている数）を書きましょう。'},
  gen(){const nets=[{c:[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]],op:[[2,4],[1,3],[0,5]]},{c:[[0,0],[0,1],[1,1],[2,1],[3,1],[3,2]],op:[[1,3],[2,4],[0,5]]},{c:[[1,0],[0,1],[1,1],[2,1],[3,1],[2,2]],op:[[2,4],[1,3],[0,5]]}];
   const nt=pick(nets),lab=new Array(6),shown=new Set(),pairs=shuffle([[1,6],[2,5],[3,4]]);nt.op.forEach((pr,i)=>{const [a,b]=chance(.5)?pairs[i]:[pairs[i][1],pairs[i][0]];lab[pr[0]]=a;lab[pr[1]]=b;shown.add(chance(.5)?pr[0]:pr[1])});
   const s=14;const draw=sh=>{let g='';nt.c.forEach((c,i)=>{g+=box(4+c[0]*s,4+c[1]*s,s,s,shown.has(i)?'#f2f2f2':'#fff',.6);if(shown.has(i))g+=T(4+c[0]*s+s/2,4+c[1]*s+s*.68,lab[i],6);else if(sh)g+=T(4+c[0]*s+s/2,4+c[1]*s+s*.68,lab[i],6).replace('fill="#111"','fill="#d2372b"')});return SVGW(`0 0 ${4*s+8} ${3*s+8}`,g)};
   return{q:`<div class="fig" style="max-width:55mm">${draw(false)}</div>`,a:`<div class="fig" style="max-width:55mm">${draw(true)}</div>`,figAns:true,steps:['向かい合う面の組を見つける','7 − （わかっている数）を書く']}}},
]);

/* ---------- 「なぜ？」の図（追加分） ---------- */
WHY['frac-guide']=()=>WHY['f-mul']();
WHY['ratio-guide']=()=>WHY['ratio-val']();
WHY['x-guide']=()=>{let g=tape(6,6,18,9,CB,'x')+tape(24,6,18,9,CB,'x')+tape(42,6,18,9,CB,'x')+tape(60,6,16,9,CR,'5')+`<line x1="6" y1="19" x2="76" y2="19" stroke="#111" stroke-width=".5"/>`+T(41,25,'20',3.8);
  return W1(SVGW('0 0 84 28',g),'x × 3 + 5 = 20',['テープ全体が 20、そのうち 5 をのぞくと x が3つ分','x × 3 = 20 − 5 = 15','x = 15 ÷ 3 = 5'])};
WHY['approx-grid']=()=>{let g=gl(6,4,8,6,4);for(let i=1;i<5;i++)for(let j=1;j<3;j++)g+=`<rect x="${6+i*8}" y="${4+j*8}" width="8" height="8" fill="${CB}"/>`;g+=`<ellipse cx="30" cy="20" rx="21" ry="12" fill="none" stroke="#111" stroke-width=".8"/>`+T(64,12,'全部入っている → 1こ',3.4,'start')+T(64,20,'線にかかる → 半分',3.4,'start')+T(64,28,'と考えて数える',3.4,'start');
  return W1(SVGW('0 0 120 38',g),'方眼で数える',['全部入っている方眼は、そのまま1こと数える','線にかかっている方眼は、大きいのも小さいのもあるので、平均して半分（0.5こ）と考える','およその面積 ＝ 全部入っている数 ＋ かかっている数 ÷ 2'])};
WHY['scale-height']=()=>{let g=`<line x1="6" y1="40" x2="70" y2="40" stroke="#111" stroke-width=".6"/><line x1="64" y1="40" x2="64" y2="6" stroke="#111" stroke-width="1"/><line x1="14" y1="34" x2="64" y2="34" stroke="#999" stroke-dasharray="1.5 1" stroke-width=".5"/><line x1="14" y1="34" x2="64" y2="6" stroke="#2a6fb0" stroke-width=".6"/><line x1="14" y1="40" x2="14" y2="34" stroke="#111" stroke-width="1.4"/>`+T(12,38,'目',3,'end')+T(67,20,'縮図で測る',3.2,'start')+T(67,37,'目の高さ',3.2,'start');
  return W1(SVGW('0 0 110 44',g),'縮図で高さを求める',['見上げた角度ときょりを使って、縮図（例：1/500）をかく','縮図上の長さ × 500 で実際の長さがわかる','目の高さから上を測っているので、最後に目の高さをたす'])};
WHY['prism-count']=()=>{const P=[[10,30],[28,30],[34,20],[16,20]];let g=polyS([[10,34],[30,34],[36,26],[16,26]],1,0,0,'#111',CB,.5)+polyS([[10,12],[30,12],[36,4],[16,4]],1,0,0,'#111',CB,.5)+`<line x1="10" y1="12" x2="10" y2="34" stroke="#111" stroke-width=".5"/><line x1="30" y1="12" x2="30" y2="34" stroke="#111" stroke-width=".5"/><line x1="36" y1="4" x2="36" y2="26" stroke="#111" stroke-width=".5"/><line x1="16" y1="4" x2="16" y2="26" stroke="#111" stroke-width=".4" stroke-dasharray="1.5 1"/>`+T(44,10,'四角柱：底面（色）2つ',3.4,'start')+T(44,18,'側面 4つ → 面 4 + 2 = 6',3.4,'start')+T(44,26,'辺 4 × 3 = 12、頂点 4 × 2 = 8',3.4,'start');
  return W1(SVGW('0 0 120 38',g),'□角柱の数え方',['底面（上と下）が2つ、側面は底面の辺の数（□）だけある','辺は、上の底面に□本・下の底面に□本・たてに□本で □ × 3','頂点は、上に□こ・下に□こで □ × 2'])};
WHY['stone-volume']=()=>{let g=`<rect x="6" y="6" width="34" height="30" fill="none" stroke="#111" stroke-width=".7"/><rect x="6" y="20" width="34" height="16" fill="${CB}"/>`+arrowR(44,22,54,'')+`<rect x="58" y="6" width="34" height="30" fill="none" stroke="#111" stroke-width=".7"/><rect x="58" y="14" width="34" height="22" fill="${CB}"/><rect x="58" y="14" width="34" height="6" fill="${CR}"/><ellipse cx="75" cy="31" rx="7" ry="4" fill="#888"/>`+T(98,18,'上がった分',3.2,'start')+T(98,25,'＝ 石の体積',3.2,'start');
  return W1(SVGW('0 0 130 40',g),'水面が上がる理由',['石が入ると、石の体積の分だけ水がおしのけられて水面が上がる','上がった部分（赤）は直方体なので、底面積 × 上がった高さで求められる'])};
WHY['prop-judge']=()=>WHY['prop']().concat(WHY['inv']());
WHY['big-num']=()=>{let g='';['兆','千','百','十','億','千','百','十','万','千','百','十','一'].forEach((d,i)=>g+=box(4+i*8,6,8,8,['兆','億','万','一'].includes(d)?CB:'#fff',.4)+T(8+i*8,11.8,d,3.4));g+=T(56,22,'4けたごとに 万 → 億 → 兆',3.6);
  return W1(SVGW('0 0 112 26',g),'大きな数の位',['一・十・百・千 のまとまりがくり返される','4けた上がるごとに、万・億・兆 と単位が変わる','1億 = 1万の1万倍、1兆 = 1億の1万倍'])};
WHY['speed-units']=()=>{let g=box(4,8,30,10,CB,.5)+T(19,14.8,'時速 72km',3.4)+arrowR(36,13,46,'÷60')+box(48,8,30,10,CY,.5)+T(63,14.8,'分速 1200m',3.4)+arrowR(80,13,90,'÷60')+box(92,8,26,10,CR,.5)+T(105,14.8,'秒速 20m',3.4);
  return W1(SVGW('0 0 122 24',g),'時速・分速・秒速',['1時間は60分なので、1分間に進む道のりは 時速 ÷ 60','1分は60秒なので、1秒間に進む道のりは 分速 ÷ 60','km を m にするのを忘れずに（72km = 72000m）'])};
WHY['angle-parallel']=()=>{let g=`<line x1="4" y1="10" x2="80" y2="10" stroke="#111" stroke-width=".8"/><line x1="4" y1="30" x2="80" y2="30" stroke="#111" stroke-width=".8"/><line x1="52" y1="2" x2="28" y2="38" stroke="#111" stroke-width=".8"/>`+`<path d="M${num(46.7+6)},10 A6,6 0 0 0 ${num(46.7+6*Math.cos(Math.atan2(8,-5.3)))},${num(10-6*Math.sin(Math.atan2(8,-5.3)))}" fill="none" stroke="#2a6fb0" stroke-width=".7"/><path d="M${num(33.3+6)},30 A6,6 0 0 0 ${num(33.3+6*Math.cos(Math.atan2(8,-5.3)))},${num(30-6*Math.sin(Math.atan2(8,-5.3)))}" fill="none" stroke="#2a6fb0" stroke-width=".7"/>`+T(86,14,'平行な線にそって',3.4,'start')+T(86,21,'すべらせると重なる',3.4,'start')+T(86,28,'→ 同位角は等しい',3.4,'start');
  return W1(SVGW('0 0 124 40',g),'平行線と角',['平行な2本の直線は、同じかたむきで交わる','上の交わりの角を、平行な線にそってすべらせると、下の同じ位置の角にぴったり重なる（同位角）','向かい合った角（対頂角）や、ななめ向かいの角（錯角）も等しくなる'])};
WHY['polygon-sum']=()=>{const P=[[20,4],[36,14],[30,34],[10,34],[4,14]];let g=polyS(P,1,0,0,'#111','#eef4fb',.7)+`<line x1="20" y1="4" x2="30" y2="34" stroke="#c0392b" stroke-width=".6"/><line x1="20" y1="4" x2="10" y2="34" stroke="#c0392b" stroke-width=".6"/>`+T(44,14,'五角形は三角形 3つ',3.6,'start')+T(44,22,'180° × 3 = 540°',3.6,'start');
  return W1(SVGW('0 0 110 38',g),'三角形に分ける',['1つの頂点から対角線をひくと、□角形は（□ − 2）この三角形に分かれる','三角形の角の和は 180° なので、□角形の角の和は 180° × (□ − 2)'])};
WHY['quad-prop']=()=>{let g=`<polygon points="6,30 24,6 42,30 24,54" transform="scale(.6)" fill="#eef4fb" stroke="#111" stroke-width="1"/><line x1="3.6" y1="18" x2="25.2" y2="18" stroke="#c0392b" stroke-width=".6" transform=""/><line x1="14.4" y1="3.6" x2="14.4" y2="32.4" stroke="#c0392b" stroke-width=".6"/>`+T(14,38,'ひし形',3.2)+`<rect x="40" y="6" width="30" height="20" fill="#eef4fb" stroke="#111" stroke-width=".6"/><line x1="40" y1="6" x2="70" y2="26" stroke="#c0392b" stroke-width=".6"/><line x1="70" y1="6" x2="40" y2="26" stroke="#c0392b" stroke-width=".6"/>`+T(55,34,'長方形',3.2);
  return W1(SVGW('0 0 80 40',g),'対角線を比べる',['ひし形の対角線は垂直に交わる（4つの辺が等しいから）','長方形の対角線は長さが等しい（4つの角が直角だから）','正方形は両方の性質をもつ'])};
WHY['dice-net']=()=>WHY['g4-cubeface']();
