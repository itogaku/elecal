/* ============ 各章の問題の種類を増やす（追加分その2） ============ */
const W_=(parts)=>parts; // 解答欄の見出し
/** 筆算（たてがき）の図。op: '+', '−', '×'。答えの行は方眼になる */
function hissanFig(a,b,op,show){
  const A=String(a),B=String(b);let res=op==='+'?a+b:op==='−'?a-b:a*b;const R=String(res);
  const parts=op==='×'&&b>=10?[...B].reverse().map((d,i)=>String(a*+d)+'_'.repeat(i)):[];
  const W=Math.max(A.length,B.length+1,R.length,...parts.map(p=>p.length))+0;const cw=11,ox=4,top=4;
  const cellX=i=>ox+(W-1-i)*cw; // i: 右からの位置
  let t='',y=top;const rowText=(s,yy,col)=>{[...s].reverse().forEach((ch,i)=>{if(ch!=='_')t+=`<text x="${num(cellX(i)+cw/2)}" y="${num(yy+cw*.78)}" font-size="${num(cw*.78)}" text-anchor="middle" fill="${col||'#111'}" ${col?'font-weight="700"':''}>${ch}</text>`})};
  const grid=(yy)=>{for(let i=0;i<W;i++)t+=`<rect x="${num(cellX(i)+.6)}" y="${num(yy+.6)}" width="${cw-1.2}" height="${cw-1.2}" fill="none" stroke="#bbb" stroke-width=".5" stroke-dasharray="1.5 1"/>`};
  rowText(A,y);y+=cw+2;rowText(B,y);t+=`<text x="${ox-1}" y="${num(y+cw*.78)}" font-size="${num(cw*.75)}" fill="#111">${op}</text>`;y+=cw+2;
  t+=`<line x1="${ox-2}" y1="${y}" x2="${ox+W*cw}" y2="${y}" stroke="#111" stroke-width="1.1"/>`;y+=2;
  if(parts.length){parts.forEach(p=>{show?rowText(p,y,RED):grid(y);y+=cw+1});t+=`<line x1="${ox-2}" y1="${y}" x2="${ox+W*cw}" y2="${y}" stroke="#111" stroke-width="1.1"/>`;y+=2}
  show?rowText(R,y,RED):grid(y);y+=cw+3;
  return SVGW(`0 0 ${ox+W*cw+4} ${num(y)}`,t);
}
const hissanUnit=(id,title,mk,lead,explain,op)=>({id,title,kind:'fig',n:6,cols:3,lead,explain,gen(){const [a,b]=mk();const o=op||pick(['+','−']);const [x,y]=o==='−'&&a<b?[b,a]:[a,b];
  const st=o==='+'?colAddSteps(x,y):o==='−'?colSubSteps(x,y):(y>=10?[`${x} × ${y%10} = ${x*(y%10)}`,`${x} × ${Math.floor(y/10)} = ${x*Math.floor(y/10)} を1けた左にずらして書く`,`たす → ${x*y}`]:[`${x} × ${y} = ${x*y}（一の位からじゅんにかける）`]);
  return{q:`<div class="fig" style="max-width:40mm;margin:0 auto">${hissanFig(x,y,o,false)}</div>`,a:`<div class="fig" style="max-width:40mm;margin:0 auto">${hissanFig(x,y,o,true)}</div>`,figAns:true,steps:st}}});
const choiceQ=(opts)=>opts.map((o,i)=>`${'アイウエオ'[i]} ${o}`).join('　');
const pts2=(arr)=>arr.join(' ');

/* ================= 1年 ================= */
addUnits(1,'10までのかず',[
 {id:'g1-compare',title:'どちらが おおきい',kind:'calc',n:15,cols:3,lead:'おおきい ほうの かずを かきましょう。',
  explain:{points:[{h:'くらべかた',b:'かずの せんで みぎに ある ほうが おおきい かずです。'},{h:'2けたの かず',b:'まず 十のくらいを くらべます。おなじなら 一のくらいを くらべます。',ex:'18 と 15 → 18'}],tip:'<b>こつ</b>　ゆびで かぞえて たしかめても いいよ。'},
  gen(){let a,b;do{a=ri(0,20);b=ri(0,20)}while(a===b);return{q:`${a} と ${b}`,tail:'<span>→</span>',a:String(Math.max(a,b)),steps:[`${Math.max(a,b)} の ほうが かずの せんで みぎ`]}}},
 {id:'g1-seq',title:'かずの ならび',kind:'calc',n:10,cols:1,lead:'□に あてはまる かずを かきましょう。',
  explain:{points:[{h:'いくつずつ ふえているか',b:'となりの かずとの ちがいを みます。1ずつ、2ずつ、5ずつ、10ずつ などが あります。'},{h:'へっていく ならび',b:'かずが ちいさく なっていく ときも あります。'}],tip:'<b>こつ</b>　わかっている 2つの かずを みて、きまりを みつけよう。'},
  gen(){const d=pick([1,2,5,10]),down=chance(.3),st=down?ri(6,12)*d:ri(0,4)*d,s=Array.from({length:6},(_,i)=>st+(down?-d:d)*i),h=ri(1,5);return{q:s.map((v,i)=>i===h?'{_}':v).join('<span>、</span>'),tail:'',a:String(s[h]),steps:[`${d} ずつ ${down?'へって':'ふえて'} いる`]}}},
 {id:'g1-word1',title:'おはなしの けいさん（10まで）',kind:'word',n:5,cols:1,lead:'しきと こたえを かきましょう。',
  explain:{points:[{h:'あわせて・ふえると',b:'「あわせて」「ぜんぶで」「ふえると」は たしざんです。'},{h:'のこりは・ちがいは',b:'「のこりは」「ちがいは」「どちらが おおい」は ひきざんです。'}],tip:'<b>こつ</b>　ことばに せんを ひいて かんがえよう。'},
  gen(){const a=ri(2,7),b=ri(1,10-a);return pick([
   ()=>({q:`あかい はなが ${a}ほん、しろい はなが ${b}ほん あります。あわせて なんぼん ですか。`,a:`しき ${a} + ${b} = ${a+b}　こたえ ${a+b}ほん`,steps:['「あわせて」なので たしざん']}),
   ()=>({q:`こどもが ${a}にん あそんで います。${b}にん きました。みんなで なんにんに なりましたか。`,a:`しき ${a} + ${b} = ${a+b}　こたえ ${a+b}にん`,steps:['「きました」で ふえるので たしざん']}),
   ()=>({q:`あめが ${a+b}こ あります。${b}こ たべました。のこりは なんこ ですか。`,a:`しき ${a+b} − ${b} = ${a}　こたえ ${a}こ`,steps:['「のこりは」なので ひきざん']}),
   ()=>({q:`いぬが ${a+b}ひき、ねこが ${a}ひき います。どちらが なんびき おおいですか。`,a:`しき ${a+b} − ${a} = ${b}　こたえ いぬが ${b}ひき おおい`,steps:['「ちがい」は ひきざん']}),
  ])()}},
]);
addUnits(1,'20までのかずの けいさん',[
 {id:'g1-tens',title:'10と いくつ',kind:'calc',n:12,cols:2,lead:'□に あてはまる かずを かきましょう。',
  explain:{points:[{h:'10より おおきい かず',b:'13 は 10 と 3。十のくらいが 1、一のくらいが 3 です。'},{h:'10の まとまり',b:'10 と 6 で 16 です。'}],tip:'<b>こつ</b>　10の まとまりを ○で かこんで かんがえよう。'},
  gen(){const o=ri(1,9),n=10+o;return pick([()=>({q:`${n} は 10 と {_}`,tail:'',a:String(o),steps:[`${n} は 10 と ${o}`]}),()=>({q:`10 と ${o} で {_}`,tail:'',a:String(n),steps:[`10 と ${o} で ${n}`]}),()=>({q:`${n} より 2 おおきい かずは {_}`,tail:'',a:String(n+2),steps:[`${n} の つぎの つぎ`]}),()=>({q:`${n} より 3 ちいさい かずは {_}`,tail:'',a:String(n-3),steps:[`${n} から 3 もどる`]})])()}},
 {id:'g1-big',title:'100までの かず',kind:'calc',n:12,cols:2,lead:'□に あてはまる かずを かきましょう。',
  explain:{points:[{h:'十の まとまり',b:'10が 3こと 1が 5こで 35 です。'},{h:'なん十の けいさん',b:'30 + 40 は、10の まとまりで 3 + 4 = 7 → 70 と かんがえます。'}],tip:'<b>こつ</b>　10の まとまりが いくつ あるかを かんがえよう。'},
  gen(){const t=ri(2,9),o=ri(0,9);return pick([()=>({q:`10が ${t}こと 1が ${o}こで {_}`,tail:'',a:String(t*10+o),steps:[`十のくらいが ${t}、一のくらいが ${o}`]}),()=>{const a=ri(1,5),b=ri(1,9-a);return{q:`${a*10}${ADD}${b*10}`,a:String((a+b)*10),steps:[`10の まとまりで ${a} + ${b} = ${a+b} → ${(a+b)*10}`]}},()=>{const a=ri(3,9),b=ri(1,a-1);return{q:`${a*10}${SUB}${b*10}`,a:String((a-b)*10),steps:[`10の まとまりで ${a} − ${b} = ${a-b} → ${(a-b)*10}`]}},()=>({q:`${t*10+o} は 10が {_}こと 1が ${o}こ`,tail:'',a:String(t),steps:[`十のくらいの かずは ${t}`]})])()}},
 {id:'g1-word2',title:'おはなしの けいさん（20まで）',kind:'word',n:5,cols:1,lead:'しきと こたえを かきましょう。',
  explain:{points:[{h:'たしざんの おはなし',b:'「あわせて」「ぜんぶで」「ふえると」は たしざん。'},{h:'ひきざんの おはなし',b:'「のこりは」「ちがいは」は ひきざん。'}],tip:'<b>こつ</b>　ずに かいて かんがえると わかりやすいよ。'},
  gen(){const a=ri(5,9),b=ri(11-a,9);return pick([
   ()=>({q:`えんぴつを ${a}ほん もって います。おかあさんから ${b}ほん もらいました。ぜんぶで なんぼんに なりましたか。`,a:`しき ${a} + ${b} = ${a+b}　こたえ ${a+b}ほん`,steps:['ぜんぶで → たしざん',`${b} を ${10-a} と ${b-(10-a)} に わけて 10 を つくる`]}),
   ()=>({q:`シールが ${a+b}まい あります。ともだちに ${b}まい あげました。のこりは なんまい ですか。`,a:`しき ${a+b} − ${b} = ${a}　こたえ ${a}まい`,steps:['のこりは → ひきざん']}),
   ()=>({q:`バスに ${a+b}にん のって います。${a}にん おりました。バスに のって いるのは なんにんに なりましたか。`,a:`しき ${a+b} − ${a} = ${b}　こたえ ${b}にん`,steps:['おりると へるので ひきざん']}),
  ])()}},
]);
addUnits(1,'とけい',[
 {id:'g1-clockdraw',title:'とけいに はりを かこう',kind:'fig',n:6,cols:3,lead:'ながい はりを かきましょう。',
  explain:{points:[{h:'ながい はり',b:'「なんぷん」を あらわします。すうじ 1つぶんで 5ふん、ちょうど なんじの ときは 12 を さします。'},{h:'みじかい はり',b:'もう かいて あります。じかんに あわせて ながい はりを かきます。'}],tip:'<b>こつ</b>　30ぷん（はん）は 6 を さします。'},
  gen(){const h=ri(1,12),m=pick([0,15,30,45,ri(1,11)*5]);const face=clockSVG(h,m);const blank=face.replace(/<line x1="50" y1="50" x2="[^"]+" y2="[^"]+" stroke="#111" stroke-width="1.8" stroke-linecap="round"\/>/,'');
   const ans=face.replace('stroke-width="1.8" stroke-linecap="round"',`stroke-width="1.8" stroke-linecap="round" style="stroke:${RED}"`);
   return{q:`<div class="fig" style="max-width:40mm;margin:0 auto">${blank}</div><div class="figcap" style="text-align:center">${h}じ ${m}ふん</div>`,a:`<div class="fig" style="max-width:40mm;margin:0 auto">${ans}</div><div class="figcap" style="text-align:center">${h}じ ${m}ふん</div>`,figAns:true,steps:[`${m}ふんは すうじの ${m/5||12} の ところ`]}}},
 {id:'g1-clockcalc',title:'なんじかん まえ・あと',kind:'word',n:6,cols:2,lead:'こたえを かきましょう。',parts:['こたえ'],
  explain:{points:[{h:'1じかん たつと',b:'みじかい はりが すうじ 1つぶん すすみます。'},{h:'1じかん まえは',b:'みじかい はりを すうじ 1つぶん もどします。'}],tip:'<b>ちゅうい</b>　12じの 1じかん あとは 1じです。'},
  gen(){const h=ri(1,12),d=ri(1,3),after=chance(.5),r=after?((h+d-1)%12)+1:((h-d+11)%12)+1;return{q:`${h}じの ${d}じかん ${after?'あと':'まえ'}は なんじ ですか。`,parts:['こたえ'],a:`こたえ ${r}じ`,steps:[`みじかい はりを ${d}つ ${after?'すすめる':'もどす'}`]}}},
]);
addUnits(1,'かずと かたち',[
 {id:'g1-longer',title:'どちらが ながい',kind:'fig',n:4,cols:2,lead:'どちらが なんます ながいですか。',
  explain:{points:[{h:'ますで くらべる',b:'ますめの かずを かぞえると、ながさを くらべられます。'},{h:'ちがいを もとめる',b:'ながい ほうの ます − みじかい ほうの ます'}],tip:'<b>こつ</b>　はしを そろえて くらべよう。'},
  gen(){let a,b;do{a=ri(3,12);b=ri(3,12)}while(a===b);const s=7;let g=gl(13,4,s,2,2);g+=`<rect x="2" y="${2+s*.15}" width="${a*s}" height="${s*.7}" fill="#d9d9d9" stroke="#111" stroke-width=".7"/><rect x="2" y="${2+s*2.15}" width="${b*s}" height="${s*.7}" fill="#fff" stroke="#111" stroke-width=".7"/>${T(2+a*s+4,2+s*.72,'あ',5,'start')}${T(2+b*s+4,2+s*2.72,'い',5,'start')}`;
   return{q:`<div class="fig">${SVGW('0 0 100 32',g)}</div>`,a:`<b>${a>b?'あ':'い'}が ${Math.abs(a-b)}ます ながい</b>`,steps:[`あは ${a}ます、いは ${b}ます`,`${Math.max(a,b)} − ${Math.min(a,b)} = ${Math.abs(a-b)}`]}}},
 {id:'g1-shapes',title:'かたちの なかま',kind:'fig',n:4,cols:2,lead:'はこの かたち・つつの かたち・ボールの かたちは それぞれ いくつ ありますか。',
  explain:{points:[{h:'3つの かたち',b:'はこの かたち（たいらな めんだけ）、つつの かたち（まるい めんと まがった めん）、ボールの かたち（どこから みても まる）が あります。'},{h:'ころがるかな',b:'ボールは どの むきにも ころがり、つつは よこに ころがります。はこは ころがりません。'}],tip:'<b>こつ</b>　かぞえた ものに しるしを つけよう。'},
  gen(){const c=[ri(1,5),ri(1,5),ri(1,5)],cells=shuffle([...Array(18).keys()]);let k=0,g='';
   const box=(x,y)=>`<polygon points="${x-6},${y-2} ${x+2},${y-2} ${x+2},${y+6} ${x-6},${y+6}" fill="#fff" stroke="#111" stroke-width=".8"/><polygon points="${x-6},${y-2} ${x-2},${y-6} ${x+6},${y-6} ${x+2},${y-2}" fill="#eee" stroke="#111" stroke-width=".8"/><polygon points="${x+2},${y-2} ${x+6},${y-6} ${x+6},${y+2} ${x+2},${y+6}" fill="#ddd" stroke="#111" stroke-width=".8"/>`;
   const cyl=(x,y)=>`<path d="M${x-5},${y-4} v9 a5,2 0 0 0 10,0 v-9" fill="#fff" stroke="#111" stroke-width=".8"/><ellipse cx="${x}" cy="${y-4}" rx="5" ry="2" fill="#eee" stroke="#111" stroke-width=".8"/>`;
   const ball=(x,y)=>`<circle cx="${x}" cy="${y}" r="5.5" fill="#fff" stroke="#111" stroke-width=".8"/><path d="M${x-5.5},${y} a5.5,2 0 0 0 11,0" fill="none" stroke="#111" stroke-width=".5"/>`;
   [box,cyl,ball].forEach((f,t)=>{for(let i=0;i<c[t];i++){const q=cells[k++];g+=f(10+(q%6)*16,12+Math.floor(q/6)*17)}});
   return{q:`<div class="fig" style="max-width:70mm">${SVGW('0 0 100 56',`<rect x=".5" y=".5" width="99" height="55" rx="3" fill="none" stroke="#999" stroke-width=".5"/>${g}`)}</div><div class="figcap">はこ（　）　つつ（　）　ボール（　）</div>`,a:`<b>はこ ${c[0]}、つつ ${c[1]}、ボール ${c[2]}</b>`,steps:['かたちの なかまごとに かぞえる']}}},
]);

/* ================= 2年 ================= */
const EX_HISSAN={points:[{h:'くらいを そろえて 書く',b:'一のくらい、十のくらい…を たてに そろえて 書きます。'},{h:'一のくらいから 計算',b:'たし算は くり上がり、ひき算は くり下がりに 気を つけます。'}],tip:'<b>たしかめ</b>　ひき算の 答えに ひく数を たすと、ひかれる数に なります。'};
addUnits(2,'たし算と ひき算',[
 hissanUnit('g2-hissan','ひっ算（たてがき）',()=>[ri(11,99),ri(11,99)],'ひっ算を しましょう。',EX_HISSAN),
 {id:'g2-word',title:'たし算・ひき算の 文しょうだい',kind:'word',n:5,cols:1,lead:'しきと 答えを 書きましょう。',
  explain:{points:[{h:'たし算に なる ことば',b:'「あわせて」「ぜんぶで」「ふえると」'},{h:'ひき算に なる ことば',b:'「のこりは」「ちがいは」「どちらが 多い」'}],tip:'<b>こつ</b>　テープの 図に 書くと、たすのか ひくのかが わかりやすく なります。'},
  gen(){const a=ri(20,80),b=ri(11,60);return pick([
   ()=>({q:`青い 色紙が ${a}まい、赤い 色紙が ${b}まい あります。あわせて 何まい ですか。`,a:`しき ${a} + ${b} = ${a+b}　答え ${a+b}まい`,steps:['あわせて → たし算']}),
   ()=>{const t=a+b;return{q:`本を ${t}ページ 読む よていです。きょうまでに ${a}ページ 読みました。のこりは 何ページ ですか。`,a:`しき ${t} − ${a} = ${b}　答え ${b}ページ`,steps:['のこりは → ひき算']}},
   ()=>{const [x,y]=a>b?[a,b]:[b,a];return{q:`なわとびで、しょうたさんは ${x}回、ゆいさんは ${y}回 とびました。ちがいは 何回 ですか。`,a:`しき ${x} − ${y} = ${x-y}　答え ${x-y}回`,steps:['ちがい → 大きい方から 小さい方を ひく']}},
   ()=>({q:`はじめに ${a}円 もって いました。おこづかいを ${b}円 もらうと、何円に なりますか。`,a:`しき ${a} + ${b} = ${a+b}　答え ${a+b}円`,steps:['ふえるので たし算']}),
  ])()}},
 {id:'g2-big',title:'1000までの 数',kind:'calc',n:12,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'百・十・一の くらい',b:'100が 3こ、10が 4こ、1が 7こで 347 です。'},{h:'10が いくつ',b:'250 は 10が 25こ 集まった 数です。'}],tip:'<b>ちゅうい</b>　0 の くらいが ある ときは、0 を 書きわすれないように。（100が 4こと 1が 6こ → 406）'},
  gen(){const h=ri(1,9),t=ri(0,9),o=ri(0,9),n=h*100+t*10+o;return pick([()=>({q:`100が ${h}こ、10が ${t}こ、1が ${o}こで {_}`,tail:'',a:String(n),steps:[`百のくらい ${h}、十のくらい ${t}、一のくらい ${o}`]}),()=>{const m=ri(11,99);return{q:`10を ${m}こ 集めた 数は {_}`,tail:'',a:String(m*10),steps:[`10が 10こで 100 → 10が ${m}こで ${m*10}`]}},()=>{const m=ri(2,9)*100+ri(1,9)*10;return{q:`${m} は 10を {_}こ 集めた 数`,tail:'',a:String(m/10),steps:[`${m} = 10 × ${m/10}`]}},()=>({q:`${n} の 百のくらいの 数字は {_}`,tail:'',a:String(h),steps:[`${n} → 百のくらいは ${h}`]})])()}},
 {id:'g2-mental',title:'何十・何百の 計算',kind:'calc',n:15,cols:3,lead:'計算しましょう。',
  explain:{points:[{h:'10の まとまりで 考える',b:'70 + 50 は、10が 7 + 5 = 12こ → 120'},{h:'100の まとまりで 考える',b:'800 − 300 は、100が 8 − 3 = 5こ → 500'}],tip:'<b>こつ</b>　0 を かくして 計算し、あとから 0 を つけます。'},
  gen(){if(chance(.5)){const a=ri(1,9),b=ri(1,9);if(chance(.5))return{q:`${a*10}${ADD}${b*10}`,a:String((a+b)*10),steps:[`10が ${a} + ${b} = ${a+b}こ`]};const [x,y]=a>b?[a,b]:[b,a+0];if(x===y)return this.gen();return{q:`${x*10+100}${SUB}${y*10}`,a:String(x*10+100-y*10),steps:[`10が ${x+10} − ${y} = ${x+10-y}こ`]}}
   const a=ri(1,8),b=ri(1,9-a);return chance(.5)?{q:`${a*100}${ADD}${b*100}`,a:String((a+b)*100),steps:[`100が ${a} + ${b} = ${a+b}こ`]}:{q:`${(a+b)*100}${SUB}${b*100}`,a:String(a*100),steps:[`100が ${a+b} − ${b} = ${a}こ`]}}},
]);
addUnits(2,'かけ算',[
 {id:'g2-kuku-table',title:'九九の ひょう',kind:'fig',n:1,cols:1,lead:'九九の ひょうの あいている ところに 答えを 書きましょう。',
  explain:{points:[{h:'ひょうの 見方',b:'たての 数（かけられる数）と よこの 数（かける数）が 交わった ところに 答えを 書きます。'},{h:'きまり',b:'かける数が 1 ふえると、答えは かけられる数だけ ふえます。3 × 4 と 4 × 3 は 同じ 答えです。'}],tip:'<b>こつ</b>　わかる だんから うめていくと、きまりが 見えてきます。'},
  gen(){const hide=new Set(shuffle([...Array(81).keys()]).slice(0,ri(30,45)));const tb=(sh)=>`<table class="tbl" style="font-size:11pt"><tr><th>×</th>${[1,2,3,4,5,6,7,8,9].map(i=>`<th>${i}</th>`).join('')}</tr>${[1,2,3,4,5,6,7,8,9].map(r=>`<tr><th>${r}</th>${[1,2,3,4,5,6,7,8,9].map(c=>{const i=(r-1)*9+c-1;return hide.has(i)?(sh?`<td class="r">${r*c}</td>`:'<td></td>'):`<td>${r*c}</td>`}).join('')}</tr>`).join('')}</table>`;
   return{q:tb(false),a:tb(true),figAns:true,steps:['たての 数 × よこの 数','同じ だんの となりどうしは、かけられる数ずつ ちがう']}}},
 {id:'g2-mulpic',title:'図を 見て かけ算の しき',kind:'fig',n:6,cols:3,lead:'●の 数を もとめる かけ算の しきと 答えを 書きましょう。',
  explain:{points:[{h:'1つ分の 数',b:'1れつ（1つの まとまり）に いくつ あるかを 見ます。'},{h:'いくつ分',b:'そのまとまりが いくつ あるかを 数えて、「1つ分 × いくつ分」の しきに します。'}],tip:'<b>こつ</b>　たてに 見ても よこに 見ても、答えは 同じに なります。'},
  gen(){const a=ri(2,9),b=ri(2,6);let g='';for(let r=0;r<b;r++){g+=`<rect x="3" y="${3+r*12}" width="${a*10+2}" height="10" rx="5" fill="none" stroke="#999" stroke-width=".5"/>`;for(let c=0;c<a;c++)g+=dot(9+c*10,8+r*12,3)}
   return{q:`<div class="fig" style="max-width:48mm">${SVGW(`0 0 ${a*10+8} ${b*12+6}`,g)}</div><div class="figcap">しき（　　　　）答え（　　）</div>`,a:`<b>${a} × ${b} = ${a*b}</b>`,steps:[`1れつに ${a}こ、それが ${b}れつ`,`${a} × ${b} = ${a*b}`]}}},
 {id:'g2-mulword',title:'かけ算の 文しょうだい',kind:'word',n:5,cols:1,lead:'しきと 答えを 書きましょう。',
  explain:{points:[{h:'しきの じゅんばん',b:'「1つ分の 数 × いくつ分」の じゅんに 書きます。',ex:'1さらに 3こずつ、4さら → 3 × 4'},{h:'答えの たんい',b:'1つ分の 数の たんい（こ、本、人）が 答えの たんいに なります。'}],tip:'<b>ちゅうい</b>　4 × 3 と 書くと、「4こずつ 3さら」の いみに なってしまいます。'},
  gen(){const a=ri(2,9),b=ri(2,9);return pick([
   ()=>({q:`1はこに ケーキが ${a}こずつ 入って います。${b}はこでは、ケーキは 何こ ですか。`,a:`しき ${a} × ${b} = ${a*b}　答え ${a*b}こ`,steps:[`1つ分は ${a}こ、いくつ分は ${b}はこ`]}),
   ()=>({q:`1つの 長いすに ${a}人ずつ すわります。長いすが ${b}つ あると、何人 すわれますか。`,a:`しき ${a} × ${b} = ${a*b}　答え ${a*b}人`,steps:[`1つ分は ${a}人、いくつ分は ${b}つ`]}),
   ()=>({q:`${a}cm の テープを ${b}本 つなぎました（重ねません）。ぜんぶで 何cm ですか。`,a:`しき ${a} × ${b} = ${a*b}　答え ${a*b}cm`,steps:[`${a}cm の ${b}つ分`]}),
  ])()}},
 {id:'g2-kuku-rev',title:'九九の □を もとめる',kind:'calc',n:15,cols:3,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'九九を となえて さがす',b:'3 × □ = 21 なら、「三一が3、三二が6…三七21」と となえて □ = 7。'}],tip:'<b>こつ</b>　だんの 九九を じゅんに 言っていくと 見つかります。'},
  gen(){const a=ri(2,9),b=ri(1,9);return chance(.5)?{q:`${a} × {_} = ${a*b}`,tail:'',a:String(b),steps:[`${a}の だん：${a} × ${b} = ${a*b}`]}:{q:`{_} × ${b} = ${a*b}`,tail:'',a:String(a),steps:[`${a} × ${b} = ${a*b}`]}}},
]);
addUnits(2,'長さ・かさ・時こく',[
 {id:'g2-lencalc',title:'長さの 計算',kind:'calc',n:12,cols:2,lead:'計算しましょう。',
  explain:{points:[{h:'同じ たんいどうしを 計算',b:'cm は cm どうし、mm は mm どうしで 計算します。',ex:'3cm5mm + 2cm3mm = 5cm8mm'},{h:'くり上がり',b:'10 mm に なったら 1 cm に くり上げます。100 cm に なったら 1 m です。'}],tip:'<b>ちゅうい</b>　m と cm、cm と mm を まぜて 計算しないように しましょう。'},
  gen(){if(chance(.5)){const a=ri(1,9),b=ri(1,9),c=ri(1,8),d=ri(1,9);if(chance(.5)){const mm=b+d,cm=a+c+Math.floor(mm/10);return{q:`${a}cm${b}mm${ADD}${c}cm${d}mm`,a:`${cm}cm${mm%10?mm%10+'mm':''}`,steps:[`cm どうし ${a} + ${c} = ${a+c}、mm どうし ${b} + ${d} = ${mm}`,...(mm>=10?[`${mm}mm = 1cm${mm-10}mm を くり上げる`]:[])]}}
     const x=a*10+b,y=Math.min(x-1,c*10+d),r=x-y;return{q:`${a}cm${b}mm${SUB}${Math.floor(y/10)}cm${y%10}mm`,a:`${Math.floor(r/10)?Math.floor(r/10)+'cm':''}${r%10?r%10+'mm':''}`,steps:[`mm に なおすと ${x} − ${y} = ${r}mm`]}}
   const a=ri(1,4),b=ri(10,90),c=ri(10,90);const t=a*100+b+c;return{q:`${a}m${b}cm${ADD}${c}cm`,a:`${Math.floor(t/100)}m${t%100?t%100+'cm':''}`,steps:[`cm どうし ${b} + ${c} = ${b+c}`,...(b+c>=100?['100cm = 1m を くり上げる']:[])]}}},
 {id:'g2-pour',title:'かさの 目もり',kind:'fig',n:6,cols:3,lead:'水の かさは どれだけですか。',
  explain:{points:[{h:'1L ます',b:'1L ますは 10 等分されていて、1目もりが 1dL です。'},{h:'読み方',b:'いっぱいの ますが いくつ（L）と、のこりの 目もり（dL）を 読みます。',ex:'1L ます 2こと 4目もり → 2L4dL'}],tip:'<b>ちゅうい</b>　1L = 10dL です。'},
  gen(){const L=ri(0,3),d=ri(1,9);const n=L+1;let g='';for(let i=0;i<n;i++){const x=4+i*22,lv=i<L?10:d;g+=`<rect x="${x}" y="${num(6+(10-lv)*5)}" width="18" height="${lv*5}" fill="#cfe0ef" />`+`<rect x="${x}" y="6" width="18" height="50" fill="none" stroke="#111" stroke-width=".9"/>`;for(let k=1;k<10;k++)g+=`<line x1="${x}" y1="${6+k*5}" x2="${x+(k===5?8:5)}" y2="${6+k*5}" stroke="#111" stroke-width=".4"/>`;g+=T(x+9,62,'1L',4)}
   return{q:`<div class="fig" style="max-width:${18+n*12}mm">${SVGW(`0 0 ${n*22+6} 66`,g)}</div>`,a:`<b>${L?L+'L':''}${d}dL</b>`,steps:[`いっぱいの ますが ${L}こ → ${L}L`,`のこりの 目もりが ${d} → ${d}dL`]}}},
]);
addUnits(2,'かたちと 分数',[
 {id:'g2-shape',title:'三角形と 四角形',kind:'fig',n:2,cols:1,lead:'三角形と 四角形を それぞれ えらびましょう。',
  explain:{points:[{h:'三角形・四角形',b:'3本の 直線で かこまれた 形が 三角形、4本の 直線で かこまれた 形が 四角形です。'},{h:'なかまに 入らない 形',b:'まがった 線が ある 形や、線が つながって いない（すきまが ある）形は 入りません。'}],tip:'<b>こつ</b>　かどの 数（ちょう点）を 数えると わかります。'},
  gen(){const pool=shuffle([{t:'三',d:'M8,32 L20,6 L34,32 Z'},{t:'三',d:'M6,32 L34,32 L10,8 Z'},{t:'四',d:'M6,8 L34,8 L34,32 L6,32 Z'},{t:'四',d:'M10,8 L34,12 L30,32 L6,28 Z'},{t:'四',d:'M14,8 L34,8 L28,32 L6,32 Z'},{t:'×',d:'M8,32 L20,6 L34,32 L12,32'},{t:'×',d:'M6,32 Q20,0 34,32 Z'},{t:'×',d:'M6,8 L34,8 L34,32 L6,32 L6,14'},{t:'×',d:'M20,6 L34,18 L28,34 L12,34 L6,18 Z'}]).slice(0,6);
   let g='';pool.forEach((p,i)=>g+=`<g transform="translate(${i*42},0)"><path d="${p.d}" fill="none" stroke="#111" stroke-width="1.2"/>${T(20,42,'アイウエオカ'[i],5)}</g>`);
   const tri=pool.map((p,i)=>p.t==='三'?'アイウエオカ'[i]:null).filter(Boolean),qd=pool.map((p,i)=>p.t==='四'?'アイウエオカ'[i]:null).filter(Boolean);
   return{q:`<div class="fig">${SVGW('0 0 252 46',g)}</div><div class="figcap">三角形（　　　）　四角形（　　　）</div>`,a:`<b>三角形 ${tri.join('、')||'なし'}　四角形 ${qd.join('、')||'なし'}</b>`,steps:['直線だけで かこまれているか、すきまが ないかを 見る','かどの 数が 3つなら 三角形、4つなら 四角形']}}},
 {id:'g2-frac',title:'もとの 大きさの 1/2・1/4',kind:'fig',n:6,cols:3,lead:'色を ぬった ところは、もとの 大きさの 何分の一ですか。',
  explain:{points:[{h:'同じ 大きさに 分ける',b:'もとの 大きさを 同じ 大きさに 2つに 分けた 1つ分を 1/2（二分の一）と いいます。'},{h:'1/4、1/8',b:'4つに 分けた 1つ分が 1/4、8つに 分けた 1つ分が 1/8 です。'}],tip:'<b>ちゅうい</b>　同じ 大きさに 分けて いないときは、1/2 とは いいません。'},
  gen(){const n=pick([2,4,8]),sh=pick(['rect','circle']);let g='';
   if(sh==='rect'){const w=80/n;for(let i=0;i<n;i++)g+=`<rect x="${10+i*w}" y="20" width="${w}" height="30" fill="${i===0?'#bdbdbd':'#fff'}" stroke="#111" stroke-width=".9"/>`}
   else{for(let i=0;i<n;i++){const a0=-Math.PI/2+i*2*Math.PI/n,a1=a0+2*Math.PI/n;g+=`<path d="M50,35 L${num(50+28*Math.cos(a0))},${num(35+28*Math.sin(a0))} A28,28 0 0 1 ${num(50+28*Math.cos(a1))},${num(35+28*Math.sin(a1))} Z" fill="${i===0?'#bdbdbd':'#fff'}" stroke="#111" stroke-width=".9"/>`}}
   return{q:`<div class="fig">${SVGW('0 0 100 70',g)}</div>`,a:`<b>${F(1,n)}</b>`,steps:[`同じ 大きさに ${n}つに 分けた 1つ分`]}}},
 {id:'g2-box',title:'はこの 形',kind:'word',n:4,cols:2,lead:'つぎの 問題に 答えましょう。',parts:['答え'],
  explain:{points:[{h:'面・へん・ちょう点',b:'はこの 形には、面が 6つ、へんが 12本、ちょう点が 8つ あります。'},{h:'さいころの 形',b:'ぜんぶの 面が 正方形の はこの 形です。'}],tip:'<b>こつ</b>　ひごと ねん土玉で 作ると、へんは ひご、ちょう点は ねん土玉に なります。'},
  gen(){const a=ri(2,9),b=ri(2,9),c=ri(2,9);return pick([
   ()=>({q:'はこの 形には、面が いくつ ありますか。',parts:['答え'],a:'答え 6つ',steps:['上と 下、前と うしろ、右と 左で 6つ']}),
   ()=>({q:'はこの 形を ひごと ねん土玉で 作ります。ひごは 何本、ねん土玉は 何こ いりますか。',parts:['答え'],a:'答え ひご 12本、ねん土玉 8こ',steps:['へんの 数 12 → ひご','ちょう点の 数 8 → ねん土玉']}),
   ()=>({q:`たて ${a}cm、よこ ${b}cm、高さ ${c}cm の はこの 形を ひごで 作ります。${a}cm の ひごは 何本 いりますか。`,parts:['答え'],a:'答え 4本',steps:['同じ 長さの へんは 4本ずつ ある']}),
  ])()}},
]);

/* ================= 3年 ================= */
addUnits(3,'たし算と ひき算',[
 hissanUnit('g3-hissan','ひっ算（たてがき）',()=>[ri(101,999),ri(101,999)],'ひっ算を しましょう。',EX_HISSAN),
 {id:'g3-word',title:'たし算・ひき算の 文しょうだい',kind:'word',n:5,cols:1,lead:'しきと 答えを 書きましょう。',
  explain:{points:[{h:'もとめる ものを たしかめる',b:'「あわせて」「のこり」「ちがい」「はじめは」など、何を もとめるのかを 線で ひいて 考えます。'},{h:'図に かく',b:'テープ図に わかっている 数と □を 書くと、たし算か ひき算かが わかります。'}],tip:'<b>たしかめ</b>　答えを 問題文に もどして、話が 合うか 考えましょう。'},
  gen(){const a=ri(120,800),b=ri(105,a-10);return pick([
   ()=>({q:`遊園地に 午前 ${a}人、午後 ${b}人 来ました。あわせて 何人 来ましたか。`,a:`しき ${a} + ${b} = ${a+b}　答え ${a+b}人`,steps:['あわせて → たし算']}),
   ()=>({q:`${a}円 もって 買いものに 行き、${b}円の 本を 買いました。のこりは 何円 ですか。`,a:`しき ${a} − ${b} = ${a-b}　答え ${a-b}円`,steps:['のこり → ひき算']}),
   ()=>({q:`ある数から ${b} を ひいたら ${a-b} に なりました。ある数は いくつ ですか。`,a:`しき ${a-b} + ${b} = ${a}　答え ${a}`,steps:[`□ − ${b} = ${a-b}`,'□ は たし算で もとめる']}),
  ])()}},
 {id:'g3-mental',title:'2けたの 暗算',kind:'calc',n:15,cols:3,lead:'暗算で 計算しましょう。',
  explain:{points:[{h:'十の位と 一の位に 分ける',b:'36 + 28 → 30 + 20 = 50、6 + 8 = 14、50 + 14 = 64'},{h:'きりのよい 数に して',b:'47 + 29 → 47 + 30 − 1 = 76'}],tip:'<b>こつ</b>　頭の 中で 計算しやすい 形に 分けましょう。'},
  gen(){const a=ri(12,89),b=ri(11,99-a>11?99-a:11);if(chance(.5)&&a+b<100)return{q:`${a}${ADD}${b}`,a:String(a+b),steps:[`十の位 ${a-a%10} + ${b-b%10} = ${a-a%10+b-b%10}、一の位 ${a%10} + ${b%10} = ${a%10+b%10}`,`あわせて ${a+b}`]};const [x,y]=a>b?[a,b]:[b,a];if(x===y)return this.gen();return{q:`${x}${SUB}${y}`,a:String(x-y),steps:[`${x} − ${y-y%10} = ${x-y+y%10}`,`${x-y+y%10} − ${y%10} = ${x-y}`]}}},
]);
addUnits(3,'かけ算と わり算',[
 hissanUnit('g3-hissan-mul','かけ算の ひっ算（たてがき）',()=>chance(.5)?[ri(12,99),ri(12,99)]:[ri(102,999),ri(2,9)],'ひっ算を しましょう。',{points:[{h:'一の位から かける',b:'かける数の 一の位から じゅんに かけ、くり上がりを 小さく 書いておきます。'},{h:'2けたを かけるとき',b:'十の位を かけた 答えは、1けた 左に ずらして 書き、さいごに たします。'}],tip:'<b>ちゅうい</b>　くり上がりを たすのを わすれないように しましょう。'},'×'),
 {id:'g3-divword',title:'わり算の 文しょうだい',kind:'word',n:5,cols:1,lead:'しきと 答えを 書きましょう。',
  explain:{points:[{h:'あまりの ある わり算',b:'「何人に 分けられて、何こ あまるか」は、商と あまりで 答えます。'},{h:'あまりの あつかい',b:'「ぜんぶ 運ぶには 何回」のように、あまりの 分も もう1回 いるときは、商に 1 を たします。'}],tip:'<b>ちゅうい</b>　あまりが わる数より 大きく なっていないか たしかめましょう。'},
  gen(){const b=ri(3,9),q=ri(2,9),r=ri(1,b-1),a=b*q+r;return pick([
   ()=>({q:`あめが ${a}こ あります。1人に ${b}こずつ 分けると、何人に 分けられて、何こ あまりますか。`,a:`しき ${a} ÷ ${b} = ${q} あまり ${r}　答え ${q}人に 分けられて ${r}こ あまる`,steps:[`${b} × ${q} = ${b*q}、${a} − ${b*q} = ${r}`]}),
   ()=>({q:`${a}人の 子どもが、1台に ${b}人ずつ ボートに 乗ります。みんなが 乗るには、ボートは 何台 いりますか。`,a:`しき ${a} ÷ ${b} = ${q} あまり ${r}　答え ${q+1}台`,steps:[`${q}台では ${r}人 乗れない`,`あまりの ${r}人の ために もう1台 → ${q}+1 = ${q+1}`]}),
   ()=>({q:`${a}cm の リボンから ${b}cm の リボンを 切りとります。何本 とれますか。`,a:`しき ${a} ÷ ${b} = ${q} あまり ${r}　答え ${q}本`,steps:[`あまりの ${r}cm では 1本 とれない`]}),
  ])()}},
 {id:'g3-mul10',title:'何十を かける 計算',kind:'calc',n:15,cols:3,lead:'計算しましょう。',
  explain:{points:[{h:'0 を とって 計算',b:'20 × 30 は、2 × 3 = 6 を 計算して、0 を 2つ つけて 600。'},{h:'0 の かけ算',b:'どんな 数に 0 を かけても、0 に どんな 数を かけても 答えは 0。'}],tip:'<b>ちゅうい</b>　さいごに つける 0 の 数を まちがえないように しましょう。'},
  gen(){const a=ri(2,9),b=ri(2,9),t=ri(0,3);if(t===0)return{q:`${a*10}${MUL}${b}`,a:String(a*b*10),steps:[`${a} × ${b} = ${a*b}、0 を 1つ つけて ${a*b*10}`]};if(t===1)return{q:`${a*10}${MUL}${b*10}`,a:String(a*b*100),steps:[`${a} × ${b} = ${a*b}、0 を 2つ つけて ${a*b*100}`]};if(t===2)return{q:`${a}${MUL}0`,a:'0',steps:['0 を かけると 答えは 0']};return{q:`${a*100}${MUL}${b}`,a:String(a*b*100),steps:[`${a} × ${b} = ${a*b}、0 を 2つ つけて ${a*b*100}`]}}},
]);
addUnits(3,'小数と 分数',[
 {id:'g3-decline',title:'小数・分数の 数直線',kind:'fig',n:4,cols:1,lead:'↓の ところの 数を 書きましょう。',
  explain:{points:[{h:'1目もりの 大きさ',b:'0 と 1 の 間が 10 等分されて いれば、1目もりは 0.1（1/10）です。'},{h:'分数で 表す',b:'0 と 1 の 間を 5 等分した 3目もり分は 3/5 です。'}],tip:'<b>こつ</b>　数字が 書いてある 目もりから 数えましょう。'},
  gen(){const fr=chance(.4),n=fr?pick([4,5,6,8]):10,L=fr?n:20,u=88/L,ox=6;let t=`<line x1="${ox-2}" y1="20" x2="${ox+L*u+3}" y2="20" stroke="#111" stroke-width=".8"/>`;
   for(let i=0;i<=L;i++)t+=`<line x1="${num(ox+i*u)}" y1="${i%n===0?16.5:18.5}" x2="${num(ox+i*u)}" y2="${i%n===0?23.5:21.5}" stroke="#111" stroke-width="${i%n?.5:.8}"/>${i%n===0?T(ox+i*u,29,i/n,4):''}`;
   const ps=shuffle([...Array(L+1).keys()].filter(i=>i%n)).slice(0,2).sort((a,b)=>a-b);
   ps.forEach((p,j)=>t+=`<path d="M${num(ox+p*u)},7 v8 M${num(ox+p*u-1.5)},12.5 L${num(ox+p*u)},15 L${num(ox+p*u+1.5)},12.5" fill="none" stroke="#111" stroke-width=".7"/>${T(ox+p*u,5.5,'アイ'[j],4)}`);
   const v=p=>fr?(p<n?F(p,n):`${M(1,p-n,n)}`):num(p/10);
   return{q:`<div class="fig">${SVGW('0 0 100 32',t)}</div><div class="figcap">ア（　　）　イ（　　）</div>`,a:`<b>ア ${v(ps[0])}　イ ${v(ps[1])}</b>`,steps:[fr?`0 と 1 の 間が ${n} 等分 → 1目もりは ${F(1,n)}`:'0 と 1 の 間が 10 等分 → 1目もりは 0.1']}}},
 {id:'g3-compare',title:'数の 大小（不等号）',kind:'calc',n:12,cols:2,lead:'□に、＞、＜、＝ の どれかを 書きましょう。',
  explain:{points:[{h:'不等号',b:'3 ＞ 2 は「3 は 2 より 大きい」、2 ＜ 3 は「2 は 3 より 小さい」。ひらいている 方が 大きい 数です。'},{h:'小数と 分数を くらべる',b:'分母が 10 の 分数は 小数に なおせます。7/10 = 0.7'}],tip:'<b>こつ</b>　数直線に 表すと くらべやすく なります。'},
  gen(){const t=ri(0,2);let a,b,ah,bh;if(t===0){a=ri(1,29);b=ri(1,29);ah=num(a/10);bh=num(b/10)}else if(t===1){a=ri(1,9);b=ri(1,9);ah=num(a/10);bh=F(b,10)}else{const d=ri(3,9);a=ri(1,d);b=ri(1,d);ah=F(a,d);bh=F(b,d)}
   const s=a>b?'＞':a<b?'＜':'＝';return{q:`${ah} {_} ${bh}`,tail:'',a:s,steps:[t===1?`${F(b,10)} = ${num(b/10)}`:t===2?'分母が 同じなので 分子を くらべる':'0.1 が いくつ分かで くらべる',`${s==='＝'?'同じ 大きさ':s==='＞'?'左の 方が 大きい':'右の 方が 大きい'}`]}}},
 {id:'g3-fracword',title:'分数・小数の 文しょうだい',kind:'word',n:4,cols:1,lead:'しきと 答えを 書きましょう。',
  explain:{points:[{h:'分数の たし算・ひき算',b:'分母が 同じ 分数は、分子どうしを 計算します。'},{h:'小数の たし算・ひき算',b:'0.1 が いくつ分かで 考えると、整数と 同じように 計算できます。'}],tip:'<b>ちゅうい</b>　答えの たんい（L、m）を わすれずに。'},
  gen(){const d=ri(5,9),a=ri(1,d-2),b=ri(1,d-1-a);return pick([
   ()=>({q:`ジュースが ${F(a,d)}L と ${F(b,d)}L あります。あわせて 何L ですか。`,a:`しき ${F(a,d)} + ${F(b,d)} = ${F(a+b,d)}　答え ${F(a+b,d)}L`,steps:[`分子どうしを たす：${a} + ${b} = ${a+b}`]}),
   ()=>{const x=ri(15,40),y=ri(3,x-5);return{q:`テープが ${num(x/10)}m あります。${num(y/10)}m 使うと、のこりは 何m ですか。`,a:`しき ${num(x/10)} − ${num(y/10)} = ${num((x-y)/10)}　答え ${num((x-y)/10)}m`,steps:[`0.1 が ${x} − ${y} = ${x-y}こ`]}},
   ()=>({q:`1m の テープの うち ${F(a,d)}m を 使いました。のこりは 何m ですか。`,a:`しき 1 − ${F(a,d)} = ${F(d-a,d)}　答え ${F(d-a,d)}m`,steps:[`1 = ${F(d,d)} と 考える`]}),
  ])()}},
]);
addUnits(3,'たんいと 式',[
 {id:'g3-time2',title:'時間の 計算（分・秒）',kind:'calc',n:12,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'1分 = 60秒',b:'1分20秒 = 60秒 + 20秒 = 80秒'},{h:'1時間 = 60分',b:'90分 = 60分 + 30分 = 1時間30分'}],tip:'<b>ちゅうい</b>　時間は 60 で くり上がります。100 では ありません。'},
  gen(){const t=ri(0,3),m=ri(1,4),s=ri(1,59);if(t===0)return{q:`${m}分${s}秒 = {_}秒`,tail:'',a:String(m*60+s),steps:[`${m}分 = ${m*60}秒`,`${m*60} + ${s} = ${m*60+s}`]};if(t===1){const x=m*60+s;return{q:`${x}秒 = {_}分 ${s}秒`,tail:'',a:String(m),steps:[`${x} = 60 × ${m} + ${s}`]}}if(t===2){const h=ri(1,3),mm=ri(1,59);return{q:`${h}時間${mm}分 = {_}分`,tail:'',a:String(h*60+mm),steps:[`${h}時間 = ${h*60}分`,`${h*60} + ${mm} = ${h*60+mm}`]}}const a=ri(20,50),b=ri(20,50);return{q:`${a}分 + ${b}分 = {_}`,tail:'',a:a+b>=60?`${Math.floor((a+b)/60)}時間${(a+b)%60?(a+b)%60+'分':''}`:`${a+b}分`,steps:[`${a} + ${b} = ${a+b}分`,...(a+b>=60?[`60分 = 1時間`]:[])]}}},
 {id:'g3-scale',title:'はかりの 目もり',kind:'fig',n:6,cols:3,lead:'はかりの はりが さしている 重さを 読みましょう。',
  explain:{points:[{h:'1目もりを 調べる',b:'数字の 間が いくつに 分けられているかを 見て、1目もりの 重さを 調べます。'},{h:'kg と g',b:'1kg = 1000g。1kg を こえたら「1kg200g」のように 表します。'}],tip:'<b>こつ</b>　はりの すぐ 前の 数字から 数えましょう。'},
  gen(){const max=pick([1000,2000,4000]),step=max===1000?10:max===2000?20:50,v=ri(1,max/step-1)*step;const cx=50,cy=50,R=40;let g=`<circle cx="${cx}" cy="${cy}" r="44" fill="#fff" stroke="#111" stroke-width="1.2"/>`;
   const N=max/step;for(let i=0;i<N;i++){const a=i/N*2*Math.PI,l=i%(N/(max/ (max===1000?100:max===2000?200:500)))===0?6:i%5===0?4:2.5;g+=`<line x1="${num(cx+R*Math.sin(a))}" y1="${num(cy-R*Math.cos(a))}" x2="${num(cx+(R-l)*Math.sin(a))}" y2="${num(cy-(R-l)*Math.cos(a))}" stroke="#111" stroke-width=".4"/>`}
   const lab=max===1000?100:max===2000?200:500;for(let w=0;w<max;w+=lab){const a=w/max*2*Math.PI;g+=T(cx+(R-12)*Math.sin(a),cy-(R-12)*Math.cos(a)+1.5,w>=1000?(w%1000?`${Math.floor(w/1000)}kg${w%1000}`:`${w/1000}kg`):w,3.6)}
   const a=v/max*2*Math.PI;g+=`<line x1="${cx}" y1="${cy}" x2="${num(cx+(R-3)*Math.sin(a))}" y2="${num(cy-(R-3)*Math.cos(a))}" stroke="${RED}" stroke-width="1.2"/>${dot(cx,cy,1.5)}`;
   const ans=v>=1000?`${Math.floor(v/1000)}kg${v%1000?v%1000+'g':''}`:`${v}g`;
   return{q:`<div class="fig">${SVGW('0 0 100 100',g)}</div><div class="figcap" style="text-align:center">（${max/1000}kg まで はかれる はかり）</div>`,a:`<b>${ans}</b>`,steps:[`1目もりは ${step}g`,`はりは ${v}g の ところ → ${ans}`]}}},
 {id:'g3-bar-draw',title:'ぼうグラフを かく',kind:'fig',n:2,cols:1,lead:'表を見て、ぼうグラフに表しましょう。',
  explain:{points:[{h:'かく じゅんばん',b:'① 1目もりの 大きさを 決める　② 目もりの 数字を 書く　③ ぼうを かく　④ 題名と たんいを 書く'},{h:'ならべ方',b:'ふつう、数の 多い じゅんに ならべ、「その他」は さいごに します。'}],tip:'<b>ちゅうい</b>　ぼうの はばは 同じに しましょう。'},
  gen(){const cats=shuffle(['犬','ねこ','うさぎ','ハムスター','金魚']).slice(0,4),v=cats.map(()=>ri(2,14));
   const tb=`<table class="tbl"><tr><th>しゅるい</th>${cats.map(c=>`<td>${c}</td>`).join('')}</tr><tr><th>人数（人）</th>${v.map(x=>`<td>${x}</td>`).join('')}</tr></table>`;
   const yc=16,s=4,ox=12,oy=yc*s+6;let g='';for(let j=0;j<=yc;j++)g+=`<line x1="${ox}" y1="${oy-j*s}" x2="${ox+60}" y2="${oy-j*s}" stroke="#c4c4c4" stroke-width=".35"/>${j%2?'':T(ox-1.5,oy-j*s+1.2,j,3.2,'end')}`;
   g+=`<line x1="${ox}" y1="${oy}" x2="${ox+60}" y2="${oy}" stroke="#111" stroke-width=".8"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy-yc*s}" stroke="#111" stroke-width=".8"/>${T(ox,oy-yc*s-3,'(人)',3.4)}`;cats.forEach((c,i)=>g+=T(ox+7.5+i*15,oy+5,c.length>4?c.slice(0,4):c,3.4));
   const bars=v.map((x,i)=>`<rect x="${ox+4+i*15}" y="${oy-x*s}" width="7" height="${x*s}" fill="#f4c7c3" stroke="${RED}" stroke-width=".7"/>`).join('');
   return{q:`<div class="figcap">かいたい どうぶつ しらべ</div>${tb}<div class="fig" style="max-width:90mm">${SVGW(`0 0 76 ${oy+8}`,g)}</div>`,a:`<div class="fig" style="max-width:90mm">${SVGW(`0 0 76 ${oy+8}`,g+bars)}</div>`,figAns:true,steps:['1目もりは 1人','表の 数だけ 目もりを 数えて ぼうを かく']}}},
]);
addUnits(3,'円と 球・グラフ',[
 {id:'g3-tri',title:'二等辺三角形と 正三角形',kind:'fig',n:6,cols:3,lead:'何という 三角形ですか。',
  explain:{points:[{h:'二等辺三角形',b:'2つの 辺の 長さが 等しい 三角形です。2つの 角の 大きさも 等しく なります。'},{h:'正三角形',b:'3つの 辺の 長さが すべて 等しい 三角形です。3つの 角の 大きさも すべて 等しく なります。'}],tip:'<b>こつ</b>　辺の 長さを 3つ くらべて、同じ ものが いくつ あるか 見ましょう。'},
  gen(){const t=pick(['eq','iso','iso','sc']);let a,b,c;if(t==='eq'){a=b=c=ri(3,8)}else if(t==='iso'){a=b=ri(4,8);c=ri(2,a+2);if(c===a)c=a-1}else{a=ri(4,8);b=a+1;c=a+2}
   const C=(a*a+c*c-b*b)/(2*c),H=Math.sqrt(Math.max(a*a-C*C,.1)),s=60/Math.max(c,H*1.1),P=[[20,70],[20+c*s,70],[20+C*s,70-H*s]];
   const svg=SVGW('0 0 100 80',`${polyS(P,1,0,0,'#111','#ededed',1)}${sideLab(P,0,1,c+'cm')}${sideLab(P,1,2,b+'cm')}${sideLab(P,0,2,a+'cm')}`);
   const name=t==='eq'?'正三角形':t==='iso'?'二等辺三角形':'どちらでもない';return{q:`<div class="fig">${svg}</div>`,a:`<b>${name}</b>`,steps:[`辺の 長さ ${a}cm、${b}cm、${c}cm`,t==='eq'?'3つとも 等しい':t==='iso'?'2つの 辺が 等しい':'等しい 辺が ない']}}},
]);

/* ================= 4年 ================= */
addUnits(4,'わり算の ひっ算',[
 {id:'g4-divword',title:'わり算の 文章題',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'わり算の場面',b:'同じ数ずつ分けるとき（1人分・何人分）はわり算です。'},{h:'あまりの考え方',b:'問題によって、あまりを切り捨てるか、商に1をたすかを考えます。'}],tip:'<b>たしかめ</b>　わる数 × 商 + あまり = わられる数'},
  gen(){const b=ri(3,9),q=ri(12,60),r=ri(1,b-1),a=b*q+r;return pick([
   ()=>({q:`色紙が ${b*q}まい あります。${b}人で同じ数ずつ分けると、1人分は何まいですか。`,a:`式 ${b*q} ÷ ${b} = ${q}　答え ${q}まい`,steps:['同じ数ずつ分ける → わり算']}),
   ()=>({q:`${a}本の花を、${b}本ずつたばにします。何たばできて、何本あまりますか。`,a:`式 ${a} ÷ ${b} = ${q} あまり ${r}　答え ${q}たばできて ${r}本あまる`,steps:[`${b} × ${q} + ${r} = ${a}`]}),
   ()=>({q:`${a}ページの本を、1日 ${b}ページずつ読みます。全部読み終わるのは何日目ですか。`,a:`式 ${a} ÷ ${b} = ${q} あまり ${r}　答え ${q+1}日目`,steps:[`${q}日では ${r}ページ残る`,'残りを読む日が1日いる']}),
  ])()}},
 {id:'g4-divbox',title:'わり算の □を求める',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'わられる数を求める',b:'□ ÷ 7 = 12 あまり 3 → □ = 7 × 12 + 3 = 87'},{h:'わる数を求める',b:'84 ÷ □ = 12 → □ = 84 ÷ 12 = 7'}],tip:'<b>こつ</b>　たしかめ算の式を思い出しましょう。'},
  gen(){const b=ri(3,9),q=ri(11,40),r=ri(0,b-1),a=b*q+r;return chance(.6)?{q:`{_} ÷ ${b} = ${q}${r?` あまり ${r}`:''}`,tail:'',a:String(a),steps:[`□ = ${b} × ${q}${r?` + ${r}`:''} = ${a}`]}:{q:`${b*q} ÷ {_} = ${q}`,tail:'',a:String(b),steps:[`□ = ${b*q} ÷ ${q} = ${b}`]}}},
 {id:'g4-div10',title:'何十でわる計算',kind:'calc',n:15,cols:3,lead:'計算しましょう。わり切れないときは、あまりも出しましょう。',
  explain:{points:[{h:'10のまとまりで考える',b:'80 ÷ 20 は、10が 8こ ÷ 10が 2こ → 8 ÷ 2 = 4'},{h:'あまりに注意',b:'90 ÷ 20 は 9 ÷ 2 = 4 あまり 1 ですが、あまりは 10が1こなので 10 です。'}],tip:'<b>ちゅうい</b>　あまりにだけは 0 をつけもどします（90 ÷ 20 = 4 あまり 10）。'},
  gen(){const b=ri(2,9),q=ri(1,9),r=chance(.5)?ri(1,b-1):0,a=(b*q+r)*10;return{q:`${a}${DIV}${b*10}`,a:r?`${q} あまり ${r*10}`:String(q),steps:[`10のまとまりで ${a/10} ÷ ${b} = ${q}${r?` あまり ${r}`:''}`,...(r?[`あまりは 10が ${r}こ → ${r*10}`]:[])]}}},
]);
addUnits(4,'がい数と 計算のきまり',[
 {id:'g4-estimate',title:'見積もり',kind:'word',n:5,cols:1,lead:'がい数を使って見積もりましょう。',
  explain:{points:[{h:'和・差の見積もり',b:'求めたい位までのがい数にしてから計算します。'},{h:'積・商の見積もり',b:'上から1けたのがい数にしてから計算すると、およその答えがすぐにわかります。',ex:'312 × 48 → 300 × 50 = 15000'}],tip:'<b>こつ</b>　「およそ」「約」と聞かれたら見積もりです。'},
  gen(){return pick([
   ()=>{const a=ri(1200,4800),b=ri(1200,4800),A1=Math.round(a/100)*100,B1=Math.round(b/100)*100;return{q:`${a}円と${b}円の品物を買います。代金はおよそ何円ですか。百の位までのがい数にして見積もりましょう。`,a:`式 ${A1} + ${B1} = ${A1+B1}　答え 約${A1+B1}円`,steps:[`${a} → ${A1}、${b} → ${B1}`]}},
   ()=>{const a=ri(210,890),b=ri(21,89),A1=Number(String(a)[0]+'00')+(+String(a)[1]>=5?100:0),B1=Math.round(b/10)*10;return{q:`1こ ${a}円のおかしを ${b}こ買います。代金はおよそ何円ですか。上から1けたのがい数にして見積もりましょう。`,a:`式 ${A1} × ${B1} = ${A1*B1}　答え 約${A1*B1}円`,steps:[`${a} → ${A1}、${b} → ${B1}`]}},
   ()=>{const a=ri(5000,9000),b=ri(1000,4000),A1=Math.round(a/1000)*1000,B1=Math.round(b/1000)*1000;return{q:`${a}人入る会場に、${b}人が入っています。あと約何人入れますか。千の位までのがい数にして見積もりましょう。`,a:`式 ${A1} − ${B1} = ${A1-B1}　答え 約${A1-B1}人`,steps:[`${a} → ${A1}、${b} → ${B1}`]}},
  ])()}},
 {id:'g4-range',title:'がい数のはんい',kind:'word',n:4,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'以上・未満・以下',b:'「5以上」は5をふくみ、「5未満」は5をふくみません。「5以下」は5をふくみます。'},{h:'はんいの求め方',b:'十の位で四捨五入して300になる整数は、250から349まで（250以上350未満）です。'}],tip:'<b>こつ</b>　数直線に表すと、はしの数がわかりやすくなります。'},
  gen(){const u=pick([10,100,1000]),c=ri(2,9)*u*(u===10?ri(1,9):1);const lo=c-u/2,hi=c+u/2-1,name=u===10?'一の位':u===100?'十の位':'百の位';
   return{q:`${name}で四捨五入して ${c} になる整数のうち、いちばん小さい数といちばん大きい数を答えましょう。`,parts:['答え'],a:`答え いちばん小さい数 ${lo}、いちばん大きい数 ${hi}`,steps:[`${c} の前後 ${u/2} の範囲で考える`,`${lo}以上 ${c+u/2}未満`]}}},
 {id:'g4-rule',title:'計算のきまりでくふうする',kind:'calc',n:10,cols:2,lead:'くふうして計算しましょう。',
  explain:{points:[{h:'まとめて計算',b:'(□ + ○) × △ = □ × △ + ○ × △',ex:'98 × 6 = (100 − 2) × 6 = 600 − 12 = 588'},{h:'順番を変える',b:'かけ算は順番を変えても答えは同じです。',ex:'25 × 7 × 4 = 25 × 4 × 7 = 700'}],tip:'<b>こつ</b>　100 や 1000 などのきりのよい数をつくると楽になります。'},
  gen(){const t=ri(0,3);if(t===0){const k=ri(1,3),n=100-k,m=ri(3,9);return{q:`${n}${MUL}${m}`,a:String(n*m),steps:[`${n} = 100 − ${k}`,`100 × ${m} − ${k} × ${m} = ${100*m} − ${k*m} = ${n*m}`]}}
   if(t===1){const m=ri(3,9);return{q:`25${MUL}${m}${MUL}4`,a:String(100*m),steps:['25 × 4 = 100 を先に',`100 × ${m} = ${100*m}`]}}
   if(t===2){const a=ri(11,49),b=ri(2,9),c=10-b;return{q:`${a}${MUL}${b}${ADD}${a}${MUL}${c}`,a:String(a*10),steps:[`${a} × (${b} + ${c}) = ${a} × 10 = ${a*10}`]}}
   const a=ri(11,99),b=100-a+ri(0,0),c=ri(11,99);return{q:`${a}${ADD}${c}${ADD}${b}`,a:String(a+b+c),steps:[`${a} + ${b} = 100 を先に`,`100 + ${c} = ${100+c}`]}}},
]);
addUnits(4,'小数と 分数',[
 {id:'g4-decstruct',title:'小数のしくみ',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'位の名前',b:'0.1 の位（小数第一位）、0.01 の位（小数第二位）、0.001 の位（小数第三位）'},{h:'いくつ分',b:'2.35 は、1 を 2こ、0.1 を 3こ、0.01 を 5こ あわせた数です。0.01 が 235こ ともいえます。'}],tip:'<b>こつ</b>　10倍すると位が1つ上がり、1/10にすると位が1つ下がります。'},
  gen(){const n=ri(101,999),v=num(n/100),t=ri(0,3);if(t===0)return{q:`0.01 を ${n}こ集めた数は {_}`,tail:'',a:v,steps:[`0.01 × ${n} = ${v}`]};if(t===1)return{q:`${v} は 0.01 を {_}こ集めた数`,tail:'',a:String(n),steps:[`${v} ÷ 0.01 = ${n}`]};if(t===2)return{q:`${v} を 10倍した数は {_}`,tail:'',a:num(n/10),steps:['位が1つ上がる']};return{q:`${v} を 1/10 にした数は {_}`,tail:'',a:num(n/1000),steps:['位が1つ下がる']}}},
 {id:'g4-fraceq',title:'大きさの等しい分数',kind:'fig',n:3,cols:1,lead:'数直線を見て、大きさの等しい分数を答えましょう。',
  explain:{points:[{h:'等しい分数',b:'1/2 = 2/4 = 3/6 のように、分母と分子がちがっても大きさが等しい分数があります。'},{h:'数直線で見る',b:'たてにそろった目もりは、同じ大きさを表します。'}],tip:'<b>こつ</b>　分母と分子に同じ数をかけると、等しい分数ができます。'},
  gen(){const base=pick([2,3,4]),ks=[1,2,3].map(k=>base*k).filter(d=>d<=12),num0=ri(1,base-1);let g='';const u=84,ox=8;
   ks.forEach((d,r)=>{const y=8+r*14;g+=`<line x1="${ox}" y1="${y}" x2="${ox+u}" y2="${y}" stroke="#111" stroke-width=".7"/>`;for(let i=0;i<=d;i++)g+=`<line x1="${num(ox+i*u/d)}" y1="${y-2}" x2="${num(ox+i*u/d)}" y2="${y+2}" stroke="#111" stroke-width=".5"/>`;g+=T(ox-3,y+1.3,`${d}等分`,3,'end')});
   g+=`<line x1="${num(ox+num0*u/base)}" y1="3" x2="${num(ox+num0*u/base)}" y2="${8+(ks.length-1)*14+4}" stroke="${RED}" stroke-width=".6" stroke-dasharray="2 1.2"/>`;
   return{q:`<div class="fig">${SVGW('-6 0 106 '+(14*ks.length+6),g)}</div><div class="figcap">赤い点線の目もりの大きさを、それぞれの数直線の分数で表しましょう。</div>`,a:`<b>${ks.map(d=>F(num0*d/base,d)).join(' = ')}</b>`,steps:[`${F(num0,base)} の分母と分子に同じ数をかける`]}}},
 {id:'g4-fracword',title:'分数・小数の文章題',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'帯分数のたし算・ひき算',b:'整数部分どうし、分数部分どうしを計算します。ひけないときは仮分数になおします。'},{h:'小数 × 整数',b:'1 m の重さ × 長さ、1 本の量 × 本数 などはかけ算です。'}],tip:'<b>ちゅうい</b>　分数部分が 1 をこえたら、整数部分にくり上げます。'},
  gen(){const d=ri(3,8),w1=ri(1,3),n1=ri(1,d-1),w2=ri(1,2),n2=ri(1,d-1);return pick([
   ()=>{const tot=(w1*d+n1)+(w2*d+n2),W=Math.floor(tot/d),N=tot%d;return{q:`赤いリボンが ${M(w1,n1,d)}m、青いリボンが ${M(w2,n2,d)}m あります。あわせて何m ですか。`,a:`式 ${M(w1,n1,d)} + ${M(w2,n2,d)} = ${N?M(W,N,d):W}　答え ${N?M(W,N,d):W}m`,steps:[`整数部分 ${w1} + ${w2}、分数部分 ${F(n1,d)} + ${F(n2,d)} = ${F(n1+n2,d)}`]}},
   ()=>{const x=ri(12,48),k=ri(3,9);return{q:`1本 ${num(x/10)}L 入りのお茶が ${k}本 あります。全部で何L ですか。`,a:`式 ${num(x/10)} × ${k} = ${num(x*k/10)}　答え ${num(x*k/10)}L`,steps:[`${x} × ${k} = ${x*k} → 小数点を1けたもどす`]}},
   ()=>{const k=ri(3,8),x=ri(11,40);return{q:`${num(x*k/10)}m のロープを ${k}人で同じ長さに分けます。1人分は何m ですか。`,a:`式 ${num(x*k/10)} ÷ ${k} = ${num(x/10)}　答え ${num(x/10)}m`,steps:[`${x*k} ÷ ${k} = ${x} → 小数点を1けたもどす`]}},
  ])()}},
]);
addUnits(4,'面積と 角',[
 {id:'g4-area-L',title:'組み合わせた図形の面積',kind:'fig',n:4,cols:2,lead:'つぎの図形の面積を求めましょう。',
  explain:{points:[{h:'分けて考える',b:'長方形2つに分けて、それぞれの面積をたします。'},{h:'全体からひく',b:'大きい長方形の面積から、欠けている部分の長方形をひきます。'}],tip:'<b>こつ</b>　どちらの方法でも答えは同じです。たしかめに使いましょう。'},
  gen(){const W=ri(6,12),H=ri(6,12),w=ri(2,W-2),h=ri(2,H-2);const s=70/Math.max(W,H),ox=12,oy=8;
   const P=[[0,0],[W-w,0],[W-w,h],[W,h],[W,H],[0,H]].map(p=>[ox+p[0]*s,oy+p[1]*s]);
   const svg=SVGW('0 0 100 96',`${polyS(P,1,0,0,'#111','#ededed',1.1)}${T(ox+W*s/2,oy+H*s+7,W+'cm',4.5)}${T(ox-2,oy+H*s/2,H+'cm',4.5,'end')}${T(ox+(W-w)*s/2,oy-2,(W-w)+'cm',4.5)}${T(ox+W*s+2,oy+h*s+(H-h)*s/2,(H-h)+'cm',4.5,'start')}`);
   const v=W*H-w*h;return{q:`<div class="fig" style="max-width:60mm">${svg}</div>`,a:`<b>${v} cm²</b>`,steps:[`大きい長方形 ${W} × ${H} = ${W*H}`,`欠けた部分 ${w} × ${h} = ${w*h}（${W} − ${W-w} = ${w}、${H} − ${H-h} = ${h}）`,`${W*H} − ${w*h} = ${v}`]}}},
 {id:'g4-units-area',title:'面積の単位',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'面積の単位',b:'1 m² = 10000 cm²　1 a = 100 m²　1 ha = 10000 m²　1 km² = 1000000 m²'},{h:'しくみ',b:'1辺が10倍になると、面積は100倍になります。'}],tip:'<b>ちゅうい</b>　長さの単位とちがい、面積は100倍ずつ変わります。'},
  gen(){return unitConv([['m²','cm²',10000,[1,9]],['a','m²',100,[1,30]],['ha','m²',10000,[1,9]],['ha','a',100,[1,20]],['km²','m²',1000000,[1,5]],['km²','ha',100,[1,9]],['m²','a',1/100,[200,500,800,1200]]])}},
 {id:'g4-sankaku',title:'三角じょうぎの角',kind:'fig',n:6,cols:3,lead:'三角じょうぎを組み合わせてできたアの角の大きさを求めましょう。',
  explain:{points:[{h:'三角じょうぎの角',b:'1組の三角じょうぎの角は、45°・45°・90° と 30°・60°・90° です。'},{h:'組み合わせ',b:'2つの角をたしたり、大きい角から小さい角をひいたりして求めます。',ex:'45° + 30° = 75°'}],tip:'<b>こつ</b>　どの三角じょうぎのどの角が使われているかを、図に書きこみましょう。'},
  gen(){const pairs=[[45,30,'+'],[45,60,'+'],[90,45,'+'],[90,30,'+'],[60,45,'−'],[45,30,'−'],[90,60,'−'],[90,45,'−']],p=pick(pairs),ans=p[2]==='+'?p[0]+p[1]:p[0]-p[1];
   const cx=20,cy=70,R=60;const ray=a=>[cx+R*Math.cos(a*Math.PI/180),cy-R*Math.sin(a*Math.PI/180)];
   let g=`<line x1="${cx}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="#111" stroke-width="1.1"/>`;const a1=p[0],a2=p[2]==='+'?p[0]+p[1]:p[0]-p[1];
   [a1,a2].forEach(a=>{const e=ray(a);g+=`<line x1="${cx}" y1="${cy}" x2="${num(e[0])}" y2="${num(e[1])}" stroke="#111" stroke-width="1.1"/>`});
   const lb=(a,t,r)=>T(cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)+1.5,t,4.5);
   if(p[2]==='+'){g+=lb(a1/2,a1+'°',22)+lb((a1+a2)/2,p[1]+'°',30)+lb(a2/2,'',0)}else{g+=lb(a2/2,'',0)+lb((a2+a1)/2,p[1]+'°',30)}
   g+=`<path d="M${num(cx+12)},${cy} A12,12 0 0 0 ${num(cx+12*Math.cos(a2*Math.PI/180))},${num(cy-12*Math.sin(a2*Math.PI/180))}" fill="none" stroke="${RED}" stroke-width=".8"/>`+lb(a2/2,'ア',16);
   return{q:`<div class="fig">${SVGW('0 0 100 80',g)}</div><div class="figcap">${p[2]==='+'?`${a1}° と ${p[1]}° の角を合わせた`:`${a1}° の角から ${p[1]}° の角をとった`}</div>`,a:`<b>${ans}°</b>`,steps:[`${p[0]}° ${p[2]} ${p[1]}° = ${ans}°`]}}},
]);
addUnits(4,'折れ線グラフ',[
 {id:'g4-line-draw',title:'折れ線グラフをかく',kind:'fig',n:2,cols:1,lead:'表を見て、折れ線グラフに表しましょう。',
  explain:{points:[{h:'かく順番',b:'① 横じくと縦じくの目もり・単位を書く　② 表の値を点でとる　③ 点を直線でつなぐ　④ 題名を書く'},{h:'目もりのくふう',b:'変わり方が小さいときは、≈ の印で途中を省き、目もりを大きくとります。'}],tip:'<b>ちゅうい</b>　点をとる位置は、目もりの線の交わるところです。'},
  gen(){const ms=['1月','2月','3月','4月','5月','6月'],v=[ri(3,8)];for(let i=1;i<6;i++)v.push(Math.min(28,v[i-1]+ri(1,6)));
   const tb=`<table class="tbl"><tr><th>月</th>${ms.map(m=>`<td>${m}</td>`).join('')}</tr><tr><th>気温（度）</th>${v.map(x=>`<td>${x}</td>`).join('')}</tr></table>`;
   const yc=30,s=2.2,ox=12,oy=yc*s+6,u=12;let g='';for(let j=0;j<=yc;j++)g+=`<line x1="${ox}" y1="${num(oy-j*s)}" x2="${ox+5*u}" y2="${num(oy-j*s)}" stroke="${j%5?'#e0e0e0':'#bdbdbd'}" stroke-width=".3"/>${j%5?'':T(ox-1.5,oy-j*s+1.2,j,3.2,'end')}`;
   for(let i=0;i<6;i++)g+=`<line x1="${ox+i*u}" y1="${oy}" x2="${ox+i*u}" y2="${num(oy-yc*s)}" stroke="#bdbdbd" stroke-width=".3"/>${T(ox+i*u,oy+5,ms[i],3.2)}`;
   g+=`<line x1="${ox}" y1="${oy}" x2="${ox+5*u+2}" y2="${oy}" stroke="#111" stroke-width=".8"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${num(oy-yc*s)}" stroke="#111" stroke-width=".8"/>${T(ox,oy-yc*s-3,'(度)',3.4)}`;
   const sol=`<polyline points="${v.map((x,i)=>`${ox+i*u},${num(oy-x*s)}`).join(' ')}" fill="none" stroke="${RED}" stroke-width="1"/>${v.map((x,i)=>dot(ox+i*u,oy-x*s,1,RED)).join('')}`;
   return{q:`<div class="figcap">ある町の月ごとの気温</div>${tb}<div class="fig" style="max-width:90mm">${SVGW(`0 0 ${ox+5*u+8} ${num(oy+8)}`,g)}</div>`,a:`<div class="fig" style="max-width:90mm">${SVGW(`0 0 ${ox+5*u+8} ${num(oy+8)}`,g+sol)}</div>`,figAns:true,steps:['1目もりは1度','それぞれの月の気温のところに点をとり、直線でつなぐ']}}},
 {id:'g4-pattern',title:'変わり方と式',kind:'fig',n:3,cols:1,lead:'図のように、ぼうを使って正方形を横にならべていきます。',
  explain:{points:[{h:'表にして調べる',b:'正方形の数とぼうの数を表にすると、きまりが見つかります。'},{h:'式に表す',b:'正方形が1つふえると、ぼうは3本ふえます。ぼうの数 = 1 + 3 × 正方形の数'}],tip:'<b>こつ</b>　図に、さいしょの1本と、あとからふえる3本ずつを色分けしてみましょう。'},
  gen(){const t=pick(['sq','tri']),per=t==='sq'?3:2,first=1;const N=ri(10,30);let g='';const s=10;
   for(let k=1;k<=3;k++){const x0=4+(k-1)*(k*s)+ (k-1)*8;}
   let x=4;for(let k=1;k<=3;k++){for(let i=0;i<k;i++){if(t==='sq'){g+=`<rect x="${x+i*s}" y="6" width="${s}" height="${s}" fill="none" stroke="#111" stroke-width="1"/>`}else{const bx=x+i*s/2*1;g+=`<polygon points="${x+i*s},${6+s} ${x+i*s+s},${6+s} ${x+i*s+s/2},6" fill="none" stroke="#111" stroke-width="1"/>`}}g+=T(x+k*s/2,6+s+7,`${k}こ`,4);x+=k*s+10}
   const cnt=k=>t==='sq'?1+3*k:1+2*k;
   const tb=(sh)=>`<table class="tbl"><tr><th>${t==='sq'?'正方形':'三角形'}の数（こ）</th>${[1,2,3,4,5].map(k=>`<td>${k}</td>`).join('')}</tr><tr><th>ぼうの数（本）</th>${[1,2,3,4,5].map(k=>k<=2?`<td>${cnt(k)}</td>`:sh?`<td class="r">${cnt(k)}</td>`:'<td></td>').join('')}</tr></table>`;
   const svg=SVGW(`0 0 ${x} 30`,g);
   return{q:`<div class="fig" style="max-width:80mm">${svg}</div><div class="figcap">${t==='sq'?'正方形':'三角形（となりと1辺を共有）'}の数とぼうの数</div>${tb(false)}<div class="figcap">(1) 表のあいているところに数を書きましょう。　(2) ${t==='sq'?'正方形':'三角形'}が ${N}こ のとき、ぼうは何本ですか。</div><div class="answer-lines"><div class="ln"><span>(2)</span><i></i></div></div>`,a:`${tb(true)}<div class="ans-block">(2) <b>${cnt(N)}本</b>（1 + ${per} × ${N}）</div>`,figAns:true,steps:[`1つふえるごとに、ぼうは ${per}本ずつふえる`,`ぼうの数 = 1 + ${per} × ${t==='sq'?'正方形':'三角形'}の数`]}}},
]);
addUnits(4,'直方体と 立方体',[
 {id:'g4-net',title:'立方体の展開図',kind:'fig',n:2,cols:1,lead:'組み立てると立方体になる展開図を、すべて選びましょう。',
  explain:{points:[{h:'展開図',b:'立体を辺にそって切り開き、平面に広げた図です。立方体の展開図は11種類あります。'},{h:'見分け方',b:'4つならんだ正方形の上と下に1つずつあれば立方体になります。1つの頂点のまわりに正方形が4つ集まると、重なってしまいます。'}],tip:'<b>ためしてみよう</b>　頭の中で1つの面を底にして、ほかの面を順に折り上げてみましょう。'},
  gen(){const good=[[[0,1],[1,1],[2,1],[3,1],[0,0],[0,2]],[[0,1],[1,1],[2,1],[3,1],[1,0],[1,2]],[[0,1],[1,1],[2,1],[3,1],[0,0],[1,2]],[[0,1],[1,1],[2,1],[3,1],[0,0],[2,2]],[[0,1],[1,1],[2,1],[3,1],[0,0],[3,2]],[[0,1],[1,1],[2,1],[3,1],[1,0],[2,2]],[[0,0],[1,0],[1,1],[2,1],[3,1],[2,2]],[[0,0],[1,0],[1,1],[2,1],[2,2],[3,2]],[[0,0],[1,0],[2,0],[2,1],[3,1],[4,1]],[[0,0],[1,0],[1,1],[2,1],[3,1],[1,2]],[[0,1],[1,1],[1,0],[2,1],[3,1],[3,2]]];
   const bad=[[[0,1],[1,1],[2,1],[3,1],[0,0],[1,0]],[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],[[0,1],[1,1],[2,1],[3,1],[4,1],[0,0]],[[0,0],[1,0],[1,1],[2,1],[2,0],[3,1]],[[0,1],[1,1],[2,1],[1,0],[1,2],[2,2]]];
   const ch=shuffle([...shuffle(good).slice(0,ri(2,3)),...shuffle(bad)]).slice(0,4);if(!ch.some(c=>good.includes(c)))ch[0]=good[0];if(ch.every(c=>good.includes(c)))ch[3]=bad[0];
   const s=7;let x=2,g='';ch.forEach((c,i)=>{const w=Math.max(...c.map(p=>p[0]))+1;c.forEach(p=>g+=`<rect x="${x+p[0]*s}" y="${3+p[1]*s}" width="${s}" height="${s}" fill="#f2f2f2" stroke="#111" stroke-width=".7"/>`);g+=T(x+w*s/2,3+3*s+7,'アイウエ'[i],5);x+=w*s+8});
   const ok=ch.map((c,i)=>good.includes(c)?'アイウエ'[i]:null).filter(Boolean);
   return{q:`<div class="fig">${SVGW(`0 0 ${x} ${3*s+14}`,g)}</div>`,a:`<b>${ok.join('、')}</b>`,steps:ch.map((c,i)=>`${'アイウエ'[i]}：${good.includes(c)?'組み立てると立方体になる':'面が重なってしまう'}`)}}},
 {id:'g4-cuboid',title:'直方体の面・辺の関係',kind:'fig',n:2,cols:2,lead:'直方体を見て答えましょう。',
  explain:{points:[{h:'面と面',b:'向かい合った面は平行、となり合った面は垂直です。'},{h:'辺と辺',b:'1つの辺に平行な辺は3本、垂直な辺は4本あります。'}],tip:'<b>こつ</b>　見えない辺（点線）もわすれずに考えましょう。'},
  gen(){const P={A:[10,30],B:[60,30],C:[60,70],D:[10,70],E:[30,12],F:[80,12],G:[80,52],H:[30,52]};
   const ln=(a,b,d)=>`<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="#111" stroke-width="1" ${d?'stroke-dasharray="2 1.5"':''}/>`;
   let g=['AB','BC','CD','DA','EF','FG','AE','BF','CG'].map(e=>ln(e[0],e[1])).join('')+['HE','HG','HD'].map(e=>ln(e[0],e[1],1)).join('');
   g+=Object.entries(P).map(([k,p])=>T(p[0]+(p[0]<40?-3:3),p[1]+(p[1]<40?-1:5),k,5)).join('');
   const q=pick([
    {q:'面あ（ABCD）に平行な面はどれですか。',a:'面EFGH',s:'向かい合った面が平行'},
    {q:'辺ABに平行な辺をすべて答えましょう。',a:'辺DC、辺EF、辺HG',s:'同じ向きの辺'},
    {q:'辺ABに垂直な辺をすべて答えましょう。',a:'辺AD、辺AE、辺BC、辺BF',s:'Aと Bで交わる辺'},
    {q:'面ABCDに垂直な面はいくつありますか。',a:'4つ',s:'となり合う面はすべて垂直'},
    {q:'頂点Aに集まっている辺をすべて答えましょう。',a:'辺AB、辺AD、辺AE',s:'Aから出ている辺は3本'}]);
   return{q:`<div class="fig">${SVGW('0 0 92 80',g)}</div><div class="figcap">${q.q}</div>`,a:`<b>${q.a}</b>`,steps:[q.s]}}},
]);

/* ================= 5年 ================= */
addUnits(5,'小数の かけ算・わり算',[
 {id:'g5-decword',title:'小数の文章題',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'かけ算の場面',b:'1 m あたりの重さ × 長さ = 全体の重さ（長さが小数でもかけ算）'},{h:'わり算の場面',b:'全体 ÷ 長さ = 1 m あたり'}],tip:'<b>ちゅうい</b>　小数のときも、整数におきかえると式が考えやすくなります（1.5 m → 2 m なら？）。'},
  gen(){const p=pick([120,150,180,240,80]),l=ri(12,48)/10;return pick([
   ()=>({q:`1m の重さが ${p}g の針金があります。この針金 ${num(l)}m の重さは何g ですか。`,a:`式 ${p} × ${num(l)} = ${num(p*l)}　答え ${num(p*l)}g`,steps:['1m の重さ × 長さ']}),
   ()=>({q:`${num(l)}m で ${num(p*l)}円 のリボンがあります。このリボン1m のねだんは何円ですか。`,a:`式 ${num(p*l)} ÷ ${num(l)} = ${p}　答え ${p}円`,steps:['代金 ÷ 長さ = 1m のねだん']}),
   ()=>{const a=ri(15,45)/10,b=ri(12,35)/10;return{q:`たて ${num(a)}m、横 ${num(b)}m の長方形の花だんの面積は何m² ですか。`,a:`式 ${num(a)} × ${num(b)} = ${num(a*b)}　答え ${num(a*b)}m²`,steps:['たて × 横']}},
  ])()}},
 {id:'g5-decsize',title:'積・商の大きさ',kind:'word',n:4,cols:1,lead:'答えが、もとの数（左の数）より小さくなる式をすべて選びましょう。',parts:['答え'],
  explain:{points:[{h:'かけ算',b:'1 より小さい数をかけると、積はかけられる数より小さくなります。'},{h:'わり算',b:'1 より小さい数でわると、商はわられる数より大きくなります。'}],tip:'<b>こつ</b>　計算しなくても、かける数・わる数が 1 より大きいか小さいかで判断できます。'},
  gen(){const n=ri(20,90),ops=shuffle([['×',pick([0.8,0.5,0.9])],['×',pick([1.2,1.5,2.4])],['÷',pick([0.4,0.5,0.8])],['÷',pick([1.5,2.5,1.2])]]);
   const small=ops.map((o,i)=>(o[0]==='×'?o[1]<1:o[1]>1)?'アイウエ'[i]:null).filter(Boolean);
   return{q:choiceQ(ops.map(o=>`${n} ${o[0]} ${o[1]}`)),parts:['答え'],a:`答え ${small.join('、')}`,steps:['1より小さい数をかける → 小さくなる','1より大きい数でわる → 小さくなる']}}},
 {id:'g5-decround',title:'商を四捨五入する・あまりを出す',kind:'calc',n:10,cols:2,lead:'つぎの計算をしましょう。',
  explain:{points:[{h:'商のがい数',b:'わり切れないときは、求める位の1つ下の位まで計算して四捨五入します。'},{h:'あまりの小数点',b:'商を整数で求めてあまりを出すとき、あまりの小数点は、わられる数のもとの小数点の位置にそろえます。'}],tip:'<b>たしかめ</b>　わる数 × 商 + あまり = わられる数'},
  gen(){if(chance(.5)){const b=ri(3,9),a=ri(10,99);const q=a/b;if(Number.isInteger(q*10))return this.gen();return{q:`${a} ÷ ${b}（商を 1/10 の位までのがい数で）`,tail:'<span>→</span>',a:`約 ${num(Math.round(q*10)/10)}`,steps:[`${a} ÷ ${b} = ${num(Math.floor(q*100)/100)}…`,`1/100 の位を四捨五入 → ${num(Math.round(q*10)/10)}`]}}
   const b=ri(12,48)/10,q=ri(2,9),r=ri(1,Math.round(b*10)-1)/10,a=num(b*q+r);return{q:`${a} ÷ ${num(b)}（商は整数で、あまりも出す）`,tail:'<span>→</span>',a:`${q} あまり ${num(r)}`,steps:[`${num(b)} × ${q} = ${num(b*q)}`,`${a} − ${num(b*q)} = ${num(r)}`]}}},
]);
addUnits(5,'整数と 分数',[
 {id:'g5-fracdec',title:'分数と小数・整数の関係',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'わり算と分数',b:'a ÷ b の商は、分数で a/b と表せます。',ex:`3 ÷ 4 = ${F(3,4)}`},{h:'分数 → 小数',b:'分子 ÷ 分母 で小数になおします。小数 → 分数は、分母を 10、100 にして約分します。',ex:`0.25 = ${F(25,100)} = ${F(1,4)}`}],tip:'<b>ちゅうい</b>　1/3 のように、小数でちょうど表せない分数もあります。'},
  gen(){const t=ri(0,2);if(t===0){const a=ri(1,8),b=ri(a+1,9);return{q:`${a} ÷ ${b} = {_}（分数で）`,tail:'',a:FH(new Fr(a,b)),steps:['わられる数が分子、わる数が分母']}}
   const pairs=[[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[1,10],[7,10],[9,20]];const p=pick(pairs),dv=num(p[0]/p[1]);
   if(t===1)return{q:`${F(p[0],p[1])} = {_}（小数で）`,tail:'',a:dv,steps:[`${p[0]} ÷ ${p[1]} = ${dv}`]};
   const den=dv.split('.')[1].length===1?10:dv.split('.')[1].length===2?100:1000;return{q:`${dv} = {_}（分数で）`,tail:'',a:F(p[0],p[1]),steps:[`${dv} = ${F(Math.round(+dv*den),den)}`,`約分して ${F(p[0],p[1])}`]}}},
 {id:'g5-lcmword',title:'公倍数・公約数の文章題',kind:'word',n:4,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'公倍数を使う場面',b:'「同時に〜するのは何分後」「たてと横に並べて正方形をつくる」など、両方の倍数になる数を考えます。'},{h:'公約数を使う場面',b:'「あまりなく同じ数ずつ分ける」「長方形を同じ大きさの正方形でしきつめる」など、両方をわり切る数を考えます。'}],tip:'<b>こつ</b>　「いちばん小さい」なら最小公倍数、「いちばん大きい」なら最大公約数です。'},
  gen(){return pick([
   ()=>{const a=pick([6,8,10,12,15]),b=pick([4,9,10,12,18,20]);if(a===b)return this.gen();const L=a*b/gcd(a,b);return{q:`駅から、Aバスは ${a}分ごと、Bバスは ${b}分ごとに出発します。午前8時に同時に出発したあと、次に同時に出発するのは何時何分ですか。`,parts:['答え'],a:`答え 午前${8+Math.floor(L/60)}時${L%60}分`,steps:[`${a} と ${b} の最小公倍数は ${L}`,`8時の ${L}分後`]}},
   ()=>{const a=pick([12,16,18,24,30]),b=pick([20,24,36,40,45]);if(a===b)return this.gen();const G=gcd(a,b);return{q:`えんぴつ ${a}本と消しゴム ${b}こを、あまりが出ないように、できるだけ多くの人に同じ数ずつ分けます。何人に分けられますか。`,parts:['答え'],a:`答え ${G}人`,steps:[`${a} と ${b} の最大公約数は ${G}`]}},
   ()=>{const a=pick([4,6,8]),b=pick([6,9,10,12]);if(a===b)return this.gen();const L=a*b/gcd(a,b);return{q:`たて ${a}cm、横 ${b}cm の長方形のカードを同じ向きにすきまなく並べて、できるだけ小さい正方形をつくります。正方形の1辺は何cm ですか。`,parts:['答え'],a:`答え ${L}cm`,steps:[`${a} と ${b} の最小公倍数 ${L}`]}},
  ])()}},
 {id:'g5-evenodd',title:'偶数・奇数と倍数',kind:'word',n:4,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'偶数と奇数',b:'2でわり切れる整数が偶数、わり切れない整数が奇数です。0 は偶数です。'},{h:'倍数の見つけ方',b:'1〜100 のうち 3 の倍数は 100 ÷ 3 = 33 あまり 1 で 33こ あります。'}],tip:'<b>こつ</b>　一の位を見ると、偶数か奇数かがすぐわかります。'},
  gen(){const n=pick([50,60,80,100]),k=ri(3,9);return pick([
   ()=>({q:`1 から ${n} までの整数のうち、${k} の倍数はいくつありますか。`,parts:['答え'],a:`答え ${Math.floor(n/k)}こ`,steps:[`${n} ÷ ${k} = ${Math.floor(n/k)} あまり ${n%k}`]}),
   ()=>{const ns=Array.from({length:8},()=>ri(10,99));return{q:`つぎの数を偶数と奇数に分けましょう。　${ns.join('、')}`,parts:['答え'],a:`答え 偶数 ${ns.filter(x=>x%2===0).join('、')||'なし'}　奇数 ${ns.filter(x=>x%2).join('、')||'なし'}`,steps:['一の位が 0, 2, 4, 6, 8 なら偶数']}},
   ()=>({q:`1 から ${n} までの整数のうち、奇数はいくつありますか。`,parts:['答え'],a:`答え ${Math.ceil(n/2)}こ`,steps:['偶数と奇数は交ごうに並ぶ',`${n} ÷ 2 = ${n/2}`]}),
  ])()}},
]);
addUnits(5,'平均・単位量・速さ・割合',[
 {id:'g5-density',title:'単位量あたりの大きさ',kind:'word',n:4,cols:1,lead:'つぎの問題に答えましょう。',
  explain:{points:[{h:'こみぐあいをくらべる',b:'1 m² あたりの人数（人数 ÷ 面積）や、1人あたりの面積（面積 ÷ 人数）でくらべます。'},{h:'いろいろな単位量',b:'1 L あたりで走る道のり（燃費）、1 km² あたりの人口（人口密度）なども同じ考え方です。'}],tip:'<b>ちゅうい</b>　1 m² あたりの人数は、多いほうがこんでいます。'},
  gen(){return pick([
   ()=>{const a=pick([20,25,30,40]),b=pick([15,20,24,30]);let n1,n2;do{n1=a*ri(2,6);n2=b*ri(2,6)}while(n1/a===n2/b);const d1=n1/a,d2=n2/b;return{q:`A室は ${a}m² に ${n1}人、B室は ${b}m² に ${n2}人います。どちらの部屋がこんでいますか。`,a:`式 A ${n1} ÷ ${a} = ${num(d1)}、B ${n2} ÷ ${b} = ${num(d2)}　答え ${d1>d2?'A室':'B室'}`,steps:['1m² あたりの人数でくらべる','多いほうがこんでいる']}},
   ()=>{const k=pick([12,15,18,20]),l=ri(20,50);return{q:`ガソリン ${l}L で ${k*l}km 走る自動車があります。ガソリン1L あたり何km 走りますか。`,a:`式 ${k*l} ÷ ${l} = ${k}　答え ${k}km`,steps:['道のり ÷ ガソリンの量']}},
   ()=>{const p=pick([120,250,380]),a=pick([20,40,50]);return{q:`面積が ${a}km² で、人口が ${p*a}人の町があります。人口密度（1km² あたりの人口）を求めましょう。`,a:`式 ${p*a} ÷ ${a} = ${p}　答え ${p}人`,steps:['人口 ÷ 面積']}},
  ])()}},
 {id:'g5-pconv',title:'小数・百分率・歩合',kind:'calc',n:12,cols:2,lead:'□にあてはまる数や言葉を書きましょう。',
  explain:{points:[{h:'百分率',b:'割合を表す小数を 100 倍すると百分率（%）になります。0.35 = 35%'},{h:'歩合',b:'0.1 = 1割、0.01 = 1分、0.001 = 1厘。0.35 = 3割5分'}],tip:'<b>ちゅうい</b>　1 = 100% = 10割 です。'},
  gen(){const x=ri(1,99),d=num(x/100),t=ri(0,3);const wari=`${Math.floor(x/10)?Math.floor(x/10)+'割':''}${x%10?x%10+'分':''}`;
   if(t===0)return{q:`${d} = {_} %`,tail:'',a:String(x),steps:[`${d} × 100 = ${x}`]};if(t===1)return{q:`${x}% = {_}（小数で）`,tail:'',a:d,steps:[`${x} ÷ 100 = ${d}`]};if(t===2)return{q:`${d} = {_}（歩合で）`,tail:'',a:wari,steps:['0.1 → 1割、0.01 → 1分']};return{q:`${wari} = {_} %`,tail:'',a:String(x),steps:[`${wari} = ${d} = ${x}%`]}}},
 {id:'g5-band',title:'帯グラフをかく・読む',kind:'fig',n:2,cols:1,lead:'表を帯グラフに表しましょう。',
  explain:{points:[{h:'帯グラフ',b:'全体を長方形の帯で表し、割合に合わせて区切ったグラフです。'},{h:'かき方',b:'割合の大きい順に左から区切り、「その他」は最後にします。目もりは全体を100%として読みます。'}],tip:'<b>こつ</b>　区切る位置は、それまでの割合をたした目もりです。'},
  gen(){let p;for(;;){p=[ri(6,9)*5,ri(3,6)*5,ri(2,4)*5];const o=100-p.reduce((a,b)=>a+b);if(o>0&&o<=p[2]){p.push(o);p=[...p.slice(0,3).sort((a,b)=>b-a),o];if(new Set(p.slice(0,3)).size===3)break}}
   const labs=[...shuffle(['米','小麦','とうもろこし','大豆']).slice(0,3),'その他'];const tb=`<table class="tbl"><tr><th>種類</th>${labs.map(l=>`<td>${l}</td>`).join('')}<td>合計</td></tr><tr><th>割合（%）</th>${p.map(x=>`<td>${x}</td>`).join('')}<td>100</td></tr></table>`;
   const ox=4,w=0.9;let g=`<rect x="${ox}" y="8" width="${100*w}" height="12" fill="none" stroke="#111" stroke-width=".8"/>`;for(let i=0;i<=100;i+=10)g+=`<line x1="${ox+i*w}" y1="20" x2="${ox+i*w}" y2="23" stroke="#111" stroke-width=".4"/>${T(ox+i*w,27,i,3)}`;
   let acc=0,sol='';p.forEach((x,i)=>{sol+=`<line x1="${ox+(acc+x)*w}" y1="8" x2="${ox+(acc+x)*w}" y2="20" stroke="${RED}" stroke-width=".8"/>${T(ox+(acc+x/2)*w,15.5,labs[i].length>4?labs[i].slice(0,3)+'…':labs[i],3,'middle')}`;acc+=x});
   return{q:`<div class="figcap">ある国の作物の生産量の割合</div>${tb}<div class="fig">${SVGW('0 4 100 26',g)}</div>`,a:`<div class="fig">${SVGW('0 4 100 26',g+sol.replace(/fill="#111">/g,`fill="${RED}">`))}</div>`,figAns:true,steps:['大きい順に左から区切る',`区切りの目もり：${p.map((x,i)=>p.slice(0,i+1).reduce((a,b)=>a+b)).join('、')}`]}}},
]);
addUnits(5,'図形の 面積と 体積',[
 {id:'g5-polygon',title:'正多角形',kind:'fig',n:6,cols:3,lead:'円の中心のまわりの角を等分して正多角形をかきました。アの角は何度ですか。',
  explain:{points:[{h:'正多角形',b:'辺の長さがすべて等しく、角の大きさもすべて等しい多角形です。'},{h:'円を使ったかき方',b:'円の中心のまわりの角（360°）を等分して、円周と交わった点を結びます。正六角形なら 360° ÷ 6 = 60°'}],tip:'<b>はっけん</b>　正六角形は、6つの正三角形に分けられます。'},
  gen(){const n=pick([5,6,8,9,10,12]),cx=50,cy=50,R=38;const P=Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]});
   const g=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#999" stroke-width=".6"/>${polyS(P,1,0,0,'#111','#f2f2f2',1)}<line x1="${cx}" y1="${cy}" x2="${num(P[0][0])}" y2="${num(P[0][1])}" stroke="#111" stroke-width=".7"/><line x1="${cx}" y1="${cy}" x2="${num(P[1][0])}" y2="${num(P[1][1])}" stroke="#111" stroke-width=".7"/>${dot(cx,cy,1.2)}${angLab([[cx,cy],P[0],P[1]],0,'ア',5,10)}`;
   return{q:`<div class="fig">${SVGW('0 0 100 100',g)}</div><div class="figcap">（正${n}角形）</div>`,a:`<b>${num(360/n)}°</b>`,steps:[`360° を ${n} 等分`,`360 ÷ ${n} = ${num(360/n)}`]}}},
 {id:'g5-quadangle',title:'四角形の角',kind:'fig',n:6,cols:3,lead:'アの角の大きさを求めましょう。',
  explain:{points:[{h:'四角形の4つの角',b:'四角形は対角線で2つの三角形に分けられるので、4つの角の和は 180° × 2 = 360° です。'},{h:'求め方',b:'360° から、わかっている3つの角の和をひきます。'}],tip:'<b>はっけん</b>　五角形の角の和は 540°、六角形は 720° です。'},
  gen(){let a;do{a=[ri(14,26)*5,ri(14,26)*5,ri(14,26)*5]}while(360-a[0]-a[1]-a[2]<50||360-a[0]-a[1]-a[2]>140);const d=360-a[0]-a[1]-a[2];
   const P=[[12,80],[88,80],[80,20],[22,28]];const hide=ri(0,3),angs=[a[0],a[1],a[2],d];const ord=[...angs];[ord[hide],ord[3]]=[ord[3],ord[hide]];
   const lab=P.map((p,i)=>{const c=[50,52],dx=c[0]-p[0],dy=c[1]-p[1],L=Math.hypot(dx,dy);return T(p[0]+dx/L*11,p[1]+dy/L*11+1.5,i===hide?'ア':ord[i]+'°',4.5)}).join('');
   return{q:`<div class="fig">${SVGW('0 0 100 96',polyS(P,1,0,0,'#111','#ededed',1)+lab)}</div><div class="figcap" style="font-size:8pt">（図の角の大きさは正確ではありません）</div>`,a:`<b>${d}°</b>`,steps:['四角形の4つの角の和は 360°',`360° − (${ord.filter((_,i)=>i!==hide).join('° + ')}°) = ${d}°`]}}},
 {id:'g5-volcombo',title:'組み合わせた立体の体積',kind:'fig',n:4,cols:2,lead:'つぎの立体の体積を求めましょう。',
  explain:{points:[{h:'分けて考える',b:'2つの直方体に分けて、それぞれの体積をたします。'},{h:'全体からひく',b:'大きい直方体の体積から、欠けている部分の直方体の体積をひきます。'}],tip:'<b>こつ</b>　どこで分けるか、図に線を書きこんで考えましょう。'},
  gen(){const W=ri(6,10),H=ri(6,10),w=ri(2,W-3),h=ri(2,H-3),D=ri(3,8);const s=5.2,dx=D*s*.5,dy=D*s*.4,ox=8,oy=10+dy;
   const fr=[[0,0],[W-w,0],[W-w,h],[W,h],[W,H],[0,H]].map(p=>[ox+p[0]*s,oy+p[1]*s]);const bk=fr.map(p=>[p[0]+dx,p[1]-dy]);
   let g='';[[0,1],[1,2],[2,3],[3,4]].forEach(([i,j])=>{g+=`<polygon points="${num(fr[i][0])},${num(fr[i][1])} ${num(fr[j][0])},${num(fr[j][1])} ${num(bk[j][0])},${num(bk[j][1])} ${num(bk[i][0])},${num(bk[i][1])}" fill="#dcdcdc" stroke="#111" stroke-width=".7"/>`});
   g+=polyS(fr,1,0,0,'#111','#f0f0f0',.8);
   g+=T(ox+W*s/2,oy+H*s+6,W+'cm',4.2)+T(ox-2,oy+H*s/2,H+'cm',4.2,'end')+T(ox+(W-w)*s/2,oy-dy-1.5,(W-w)+'cm',4.2)+T(ox+W*s+dx/2+3,oy+H*s-dy/2,D+'cm',4.2,'start')+T(ox+W*s+2,oy+h*s+(H-h)*s/2,(H-h)+'cm',4.2,'start');
   const v=(W*H-w*h)*D;return{q:`<div class="fig" style="max-width:60mm">${SVGW(`0 0 ${num(ox+W*s+dx+14)} ${num(oy+H*s+10)}`,g)}</div>`,a:`<b>${v} cm³</b>`,steps:[`大きい直方体 ${W} × ${H} × ${D} = ${W*H*D}`,`欠けた部分 ${w} × ${h} × ${D} = ${w*h*D}`,`${W*H*D} − ${w*h*D} = ${v}`]}}},
 {id:'g5-volunit',title:'体積の単位',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'体積の単位',b:'1 m³ = 1000000 cm³　1 L = 1000 cm³　1 mL = 1 cm³　1 m³ = 1000 L'},{h:'しくみ',b:'1辺が 10 倍になると、体積は 1000 倍になります。'}],tip:'<b>こつ</b>　1 L は 1辺 10 cm の立方体の体積です。'},
  gen(){return unitConv([['m³','cm³',1000000,[1,5]],['L','cm³',1000,[1,9]],['m³','L',1000,[1,9]],['cm³','mL',1,[50,500]],['dL','cm³',100,[1,9]],['cm³','L',1/1000,[2000,5000,8000]],['L','m³',1/1000,[2000,3000,4000]]])}},
]);
addUnits(5,'比例',[
 {id:'g5-prop',title:'比例の関係',kind:'table',n:3,cols:1,lead:'表を見て答えましょう。',
  explain:{points:[{h:'比例',b:'□が2倍、3倍…になると、○も2倍、3倍…になるとき、○は□に比例するといいます。'},{h:'表の見方',b:'□が1のときの○の値を見ると、○ = 1のときの値 × □ がわかります。'}],tip:'<b>こつ</b>　表を横に見て、何倍になっているかを調べましょう。'},
  gen(){const a=pick([3,4,5,6,8,12,15,20]),c=pick([{s:'1本 a 円のえんぴつの本数 □本 と代金 ○円'},{s:'1こ a g のビー玉の数 □こ と重さ ○g'},{s:'1分間に a L ずつ水を入れた時間 □分 と水の量 ○L'}]);const xs=[1,2,3,4,5,6],hide=new Set(shuffle([1,2,3,4,5]).slice(0,3)),k=pick([10,12,15]);
   const tb=(sh)=>`<table class="tbl"><tr><th>□</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>○</th>${xs.map((x,i)=>hide.has(i)?(sh?`<td class="r">${a*x}</td>`:'<td></td>'):`<td>${a*x}</td>`).join('')}</tr></table>`;
   return{q:`${c.s.replace('a',a)}の関係を表にしました。${tb(false)}(1) 表のあいているところに数を書きましょう。<br>(2) □が ${k} のとき、○はいくつですか。`,parts:['(2)'],a:`${tb(true)}(2) ${a*k}`,steps:[`□が1のとき○は ${a} → ○ = ${a} × □`,`${a} × ${k} = ${a*k}`]}}},
]);

/* ================= 6年 ================= */
const R6=GRADE_UNITS[6].find(c=>c.ch==='5年の復習');
R6.items.push({...GRADE_UNITS[5].find(c=>c.ch==='平均・単位量・速さ・割合').items.find(u=>u.id==='g5-speed'),id:'r-speed'},{...GRADE_UNITS[5].find(c=>c.ch==='平均・単位量・速さ・割合').items.find(u=>u.id==='g5-percent'),id:'r-percent'},{...GRADE_UNITS[5].find(c=>c.ch==='図形の 面積と 体積').items.find(u=>u.id==='g5-area'),id:'r-area'});
addUnits(6,'文字と式',[
 {id:'x-value',title:'式の値を求める',kind:'calc',n:12,cols:2,lead:`${X} の値を式にあてはめて、式の値を求めましょう。`,
  explain:{points:[{h:'あてはめる',b:`${X} のところに数を入れて計算します。`,ex:`${X} = 5 のとき ${X} × 4 + 3 → 5 × 4 + 3 = 23`},{h:'計算の順序',b:'× や ÷ を先に計算し、( ) があればその中を先にします。'}],tip:'<b>ちゅうい</b>　小数や分数をあてはめるときも同じです。'},
  gen(){const a=ri(2,9),b=ri(1,30),x=chance(.7)?ri(2,12):ri(11,49)/10,t=ri(0,2);const xs=num(x);
   if(t===0)return{q:`${X} = ${xs} のとき　${X} × ${a} + ${b}`,tail:'<span>→</span>',a:num(x*a+b),steps:[`${xs} × ${a} + ${b} = ${num(x*a)} + ${b} = ${num(x*a+b)}`]};
   if(t===1)return{q:`${X} = ${xs} のとき　(${X} + ${b}) × ${a}`,tail:'<span>→</span>',a:num((x+b)*a),steps:[`(${xs} + ${b}) × ${a} = ${num(x+b)} × ${a} = ${num((x+b)*a)}`]};
   const c=a*ri(2,6);return{q:`${X} = ${c} のとき　${X} ÷ ${a} − 1`,tail:'<span>→</span>',a:String(c/a-1),steps:[`${c} ÷ ${a} − 1 = ${c/a} − 1 = ${c/a-1}`]}}},
 {id:'x-match',title:'式に合う場面を選ぶ',kind:'word',n:4,cols:1,lead:'式に合う場面を、ア〜ウから選びましょう。',parts:['答え'],
  explain:{points:[{h:'式を言葉にする',b:`${X} × 5 + 20 は「${X} の5つ分に 20 をたす」です。`},{h:'場面に当てはめる',b:'それぞれの場面を式に表して、同じ形になるものを選びます。'}],tip:'<b>こつ</b>　選ばなかった場面が、どんな式になるかも考えてみましょう。'},
  gen(){const n=ri(3,8),m=pick([50,80,100,120]);const opts=shuffle([
    {s:`1こ ${X} 円のパンを ${n}こ買い、${m}円のジュースを1本買ったときの代金`,f:'mul+'},
    {s:`${X} 円のパンを1こと、${m}円のジュースを ${n}本買ったときの代金`,f:'+mul'},
    {s:`${X} 円もっていて、${m}円のジュースを ${n}本買ったときの残りのお金`,f:'-mul'}]);
   const ans='アイウ'[opts.findIndex(o=>o.f==='mul+')];
   return{q:`式：${X} × ${n} + ${m}<br>${opts.map((o,i)=>`${'アイウ'[i]} ${o.s}`).join('<br>')}`,parts:['答え'],a:`答え ${ans}`,steps:[`${X} × ${n} は「${X} 円のものを ${n}こ」`,`+ ${m} は「${m}円のものを1つ」`]}}},
 {id:'x-pattern',title:'図の規則を文字の式に',kind:'fig',n:3,cols:1,lead:'図のように、ご石を正方形の形にならべます。',
  explain:{points:[{h:'まとまりを見つける',b:'1辺の数を x として、どのようにまとめると数えやすいかを考えます。'},{h:'いろいろな式',b:'(x − 1) × 4 でも、x × 4 − 4 でも同じ数になります。考え方によって式がちがっても正しい答えです。'}],tip:'<b>こつ</b>　図を丸で囲んで、まとまりをかきこみましょう。'},
  gen(){let g='',x0=4;[3,4,5].forEach(n=>{for(let i=0;i<n;i++)for(let j=0;j<n;j++)if(i===0||j===0||i===n-1||j===n-1)g+=`<circle cx="${x0+i*5+2}" cy="${4+j*5+2}" r="1.8" fill="#111"/>`;g+=T(x0+(n-1)*2.5+2,4+5*5+5,`1辺${n}こ`,3.6);x0+=n*5+8});
   const k=ri(8,20);return{q:`<div class="fig" style="max-width:90mm">${SVGW(`0 0 ${x0} 34`,g)}</div><div class="figcap">(1) 1辺の数を ${X} こ、ご石全部の数を ${Y} ことして、${X} と ${Y} の関係を式に表しましょう。　(2) 1辺が ${k}こ のとき、ご石は全部で何こですか。</div><div class="answer-lines"><div class="ln"><span>(1)</span><i></i></div><div class="ln"><span>(2)</span><i></i></div></div>`,
    a:`<div class="ans-block">(1) <b>(${X} − 1) × 4 = ${Y}</b>（${X} × 4 − 4 = ${Y} なども正解）　(2) <b>${(k-1)*4}こ</b></div>`,figAns:true,steps:[`1辺の ${X}こ から角の1こをのぞいた ${X} − 1 こが4組`,`(${k} − 1) × 4 = ${(k-1)*4}`]}}},
]);
addUnits(6,'円の面積・立体の体積',[
 {id:'vol6-combo',title:'くふうして体積を求める',kind:'fig',n:4,cols:2,lead:'つぎの立体の体積を求めましょう。円周率は 3.14 とします。',
  explain:{points:[{h:'底面積 × 高さ',b:'底面の形が複雑でも、底面積がわかれば「底面積 × 高さ」で体積が求められます。'},{h:'穴のあいた立体',b:'大きい円柱の体積から、くりぬいた円柱の体積をひきます。'}],tip:'<b>こつ</b>　どの面を底面とみるかがポイントです。'},
  gen(){if(chance(.5)){const R=ri(3,6),r=ri(1,R-2),h=ri(4,10);const v=num((R*R-r*r)*3.14*h);
     const g=`<ellipse cx="50" cy="70" rx="36" ry="10" fill="#e6e6e6" stroke="#111" stroke-width=".8"/><rect x="14" y="22" width="72" height="48" fill="#e6e6e6" stroke="none"/><line x1="14" y1="22" x2="14" y2="70" stroke="#111" stroke-width=".8"/><line x1="86" y1="22" x2="86" y2="70" stroke="#111" stroke-width=".8"/><ellipse cx="50" cy="22" rx="36" ry="10" fill="#f4f4f4" stroke="#111" stroke-width=".8"/><ellipse cx="50" cy="22" rx="${num(36*r/R)}" ry="${num(10*r/R)}" fill="#fff" stroke="#111" stroke-width=".8"/>${T(70,20,R+'cm',4.2)}${T(50,25,r+'cm',3.6)}${T(91,48,h+'cm',4.2,'start')}`;
     return{q:`<div class="fig" style="max-width:55mm">${SVGW('0 0 104 84',g)}</div><div class="figcap">（円柱の中心を円柱の形にくりぬいた立体。外側の半径 ${R}cm、穴の半径 ${r}cm）</div>`,a:`<b>${v} cm³</b>`,steps:[`底面積：${R} × ${R} × 3.14 − ${r} × ${r} × 3.14 = ${num((R*R-r*r)*3.14)}`,`体積：${num((R*R-r*r)*3.14)} × ${h} = ${v}`]}}
   return GRADE_UNITS[5].find(c=>c.ch==='図形の 面積と 体積').items.find(u=>u.id==='g5-volcombo').gen()}},
 {id:'approx-area',title:'およその面積・体積',kind:'word',n:4,cols:1,lead:'およその形とみて、面積や体積を求めましょう。円周率は 3.14 とします。',
  explain:{points:[{h:'およその形とみる',b:'池や土地の形を、円・長方形・三角形などの形とみて計算します。'},{h:'がい数で答える',b:'求めた答えは「約〜」と表します。'}],tip:'<b>こつ</b>　実際の形に近い、計算しやすい形を選びましょう。'},
  gen(){return pick([
   ()=>{const d=pick([20,30,40,60]);return{q:`直径がおよそ ${d}m の円の形をした池があります。この池のおよその面積は何m² ですか。`,a:`式 ${d/2} × ${d/2} × 3.14 = ${num(d*d/4*3.14)}　答え 約${num(d*d/4*3.14)}m²`,steps:['円とみる',`半径は ${d/2}m`]}},
   ()=>{const a=ri(20,60),b=ri(10,40);return{q:`ある公園は、たてがおよそ ${a}m、横がおよそ ${b}m の長方形とみることができます。およその面積は何m² ですか。`,a:`式 ${a} × ${b} = ${a*b}　答え 約${a*b}m²`,steps:['長方形とみる']}},
   ()=>{const a=ri(6,12),b=ri(4,8),c=ri(10,25);return{q:`ある箱は、たて ${a}cm、横 ${b}cm、高さ ${c}cm の直方体とみることができます。およその体積は何cm³ ですか。`,a:`式 ${a} × ${b} × ${c} = ${a*b*c}　答え 約${a*b*c}cm³`,steps:['直方体とみる']}},
   ()=>{const b=ri(20,60),h=ri(10,40);return{q:`三角形の形をした畑があり、底辺がおよそ ${b}m、高さがおよそ ${h}m です。およその面積は何m² ですか。`,a:`式 ${b} × ${h} ÷ 2 = ${num(b*h/2)}　答え 約${num(b*h/2)}m²`,steps:['三角形とみる']}},
  ])()}},
]);
addUnits(6,'データの活用',[
 {id:'data-compare',title:'2つのデータをくらべる',kind:'fig',n:2,cols:1,lead:'2つの組の記録をくらべましょう。',
  explain:{points:[{h:'代表値でくらべる',b:'平均値・中央値・最頻値をそれぞれ求めてくらべます。'},{h:'散らばりもみる',b:'平均値が同じでも、ドットプロットにすると散らばりのようすがちがうことがあります。'}],tip:'<b>こつ</b>　何を重視するかで「どちらがよい記録か」の判断は変わります。理由を書けるようにしましょう。'},
  gen(){for(let t=0;t<4000;t++){const n=9,A=Array.from({length:n},()=>ri(3,12)),B=Array.from({length:n},()=>ri(3,12));const sa=A.reduce((a,b)=>a+b),sb=B.reduce((a,b)=>a+b);if(sa%n||sb%n||sa===sb)continue;
     const med=v=>[...v].sort((a,b)=>a-b)[4];const mA=med(A),mB=med(B);if(mA===mB)continue;
     const tb=`<table class="tbl"><tr><th>1組</th>${A.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>2組</th>${B.map(x=>`<td>${x}</td>`).join('')}</tr></table>`;
     return{q:`<div class="figcap">1組と2組の9人ずつが、輪投げで入った数（回）です。</div>${tb}<div class="figcap">(1) それぞれの組の平均値を求めましょう。　(2) それぞれの組の中央値を求めましょう。　(3) 平均値でくらべると、どちらの組の記録がよいといえますか。</div><div class="answer-lines"><div class="ln"><span>(1)</span><i></i></div><div class="ln"><span>(2)</span><i></i></div><div class="ln"><span>(3)</span><i></i></div></div>`,
       a:`<div class="ans-block">(1) <b>1組 ${sa/n}回、2組 ${sb/n}回</b>　(2) <b>1組 ${mA}回、2組 ${mB}回</b>　(3) <b>${sa>sb?'1組':'2組'}</b></div>`,figAns:true,steps:[`1組の合計 ${sa}、2組の合計 ${sb}、それぞれ ÷ 9`,'中央値は小さい順に並べて5番目',`平均値が大きいのは ${sa>sb?'1組':'2組'}`]}}}},
]);
addUnits(6,'場合の数',[
 {id:'comb-tree',title:'樹形図をかく',kind:'fig',n:2,cols:2,lead:'樹形図を完成させて、全部で何通りあるか答えましょう。',
  explain:{points:[{h:'樹形図',b:'1番目、2番目…と順に枝分かれさせて、すべての場合をもれなく書き出す図です。'},{h:'かき方のこつ',b:'最初の1つを決めたときの枝を全部かき、同じ形をくり返します。'}],tip:'<b>こつ</b>　1つの枝の数がわかれば、かけ算で全体の数も求められます。'},
  gen(){const n=3,L=['A','B','C'],perms=[];L.forEach(a=>L.filter(x=>x!==a).forEach(b=>perms.push([a,b,L.find(x=>x!==a&&x!==b)])));
   const nm=pick([['りく','そら','はる'],['A','B','C'],['赤','青','黄']]);const lbl=s=>nm[L.indexOf(s)];
   const draw=(full)=>{let g='',y=6;L.forEach((a,i)=>{const y0=6+i*30;g+=T(8,y0+11,lbl(a),4.5);L.filter(x=>x!==a).forEach((b,j)=>{const y1=y0+j*15+4,c=L.find(x=>x!==a&&x!==b);const show=full||i===0;const col=full&&i>0?RED:'#111';
      if(show){g+=`<line x1="14" y1="${y0+10}" x2="30" y2="${y1+1}" stroke="${col}" stroke-width=".6"/>${T(35,y1+3,lbl(b),4.5)}<line x1="41" y1="${y1+1}" x2="56" y2="${y1+1}" stroke="${col}" stroke-width=".6"/>${T(62,y1+3,lbl(c),4.5)}`.replace(/fill="#111">([^<]+)<\/text>/g,(m,s)=>full&&i>0?`fill="${RED}">${s}</text>`:m)}});});return g};
   return{q:`<div class="figcap">${nm.join('、')}の3人が1列に並ぶ並び方（左から1番目・2番目・3番目）</div><div class="fig" style="max-width:60mm">${SVGW('0 0 70 96',draw(false))}</div><div class="answer-lines"><div class="ln short"><span>答え</span><i></i></div></div>`,a:`<div class="fig" style="max-width:60mm">${SVGW('0 0 70 96',draw(true))}</div><div class="ans-block"><b>6通り</b></div>`,figAns:true,steps:['1番目が決まると、2番目は2通り、3番目は1通り','3 × 2 × 1 = 6']}}},
 {id:'comb-league',title:'対戦表（リーグ戦）',kind:'fig',n:2,cols:1,lead:'どのチームとも1回ずつ試合をします。',
  explain:{points:[{h:'対戦表',b:'たてとよこにチーム名を書き、試合をするところに○をつけます。同じチームどうしのます（ななめ）は使いません。'},{h:'重なりに注意',b:'A対B と B対A は同じ試合です。表の半分だけ数えます。'}],tip:'<b>こつ</b>　ななめの線より上だけに○をつけると、重なりなく数えられます。'},
  gen(){const n=ri(4,6),T_=['A','B','C','D','E','F'].slice(0,n);const tb=(sh)=>`<table class="tbl"><tr><th></th>${T_.map(t=>`<th>${t}</th>`).join('')}</tr>${T_.map((r,i)=>`<tr><th>${r}</th>${T_.map((c,j)=>i===j?'<td style="background:#ddd"></td>':(sh&&i<j?`<td class="r">○</td>`:'<td></td>')).join('')}</tr>`).join('')}</table>`;
   return{q:`<div class="figcap">${T_.join('、')} の ${n}チームのリーグ戦です。(1) 試合をする組み合わせに○をつけましょう（重ならないように）。　(2) 試合は全部で何試合ですか。</div>${tb(false)}<div class="answer-lines"><div class="ln short"><span>(2)</span><i></i></div></div>`,a:`${tb(true)}<div class="ans-block">(2) <b>${n*(n-1)/2}試合</b></div>`,figAns:true,steps:['ななめより上に○をつける',`${Array.from({length:n-1},(_,i)=>n-1-i).join(' + ')} = ${n*(n-1)/2}`]}}},
 {id:'comb-coin',title:'お金の組み合わせ',kind:'word',n:4,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'表に整理する',b:'大きい金額の硬貨から使う枚数を決めていき、表にまとめるともれがありません。'},{h:'できる金額',b:'硬貨を何枚か組み合わせたときの合計金額を、すべて書き出します。'}],tip:'<b>こつ</b>　同じ金額が2回出てきたら、1つとして数えます。'},
  gen(){return pick([
   ()=>{const cs=[10,50,100,500];const pickC=shuffle(cs).slice(0,3).sort((a,b)=>a-b);const sums=new Set();for(let m=1;m<8;m++){let s=0;pickC.forEach((c,i)=>{if(m>>i&1)s+=c});sums.add(s)}
     return{q:`${pickC.join('円玉、')}円玉が1枚ずつあります。このうち1枚以上を使ってできる金額は、何通りありますか。`,parts:['答え'],a:`答え ${sums.size}通り（${[...sums].sort((a,b)=>a-b).join('円、')}円）`,steps:['1枚、2枚、3枚使うときに分けて書き出す']}},
   ()=>{const T0=pick([100,150,200]);let c=0;const list=[];for(let a=0;a*50<=T0;a++)for(let b=0;a*50+b*10<=T0;b++){if(a*50+b*10===T0){c++;list.push(`50円${a}枚・10円${b}枚`)}}
     return{q:`50円玉と10円玉を使って、ちょうど ${T0}円にする方法は何通りありますか（どちらかを使わなくてもよい）。`,parts:['答え'],a:`答え ${c}通り`,steps:['50円玉の枚数で分けて考える',list.join('、')]}},
  ])()}},
 {id:'comb-path',title:'道順の数',kind:'fig',n:4,cols:2,lead:'Aから Bまで、遠回りをしないで行く道順は何通りありますか。',
  explain:{points:[{h:'交差点に数を書く',b:'それぞれの交差点に「そこまで行く道順の数」を書きます。左と下（来る方向）の数をたすと、その交差点の数になります。'},{h:'はしの交差点',b:'いちばん下の行といちばん左の列は、すべて1通りです。'}],tip:'<b>こつ</b>　Aから順に、数をたしながら進みましょう。'},
  gen(){const w=ri(2,4),h=ri(2,3),s=Math.min(70/w,50/h),ox=12,oy=8;let g='';for(let i=0;i<=w;i++)g+=`<line x1="${ox+i*s}" y1="${oy}" x2="${ox+i*s}" y2="${oy+h*s}" stroke="#111" stroke-width=".8"/>`;for(let j=0;j<=h;j++)g+=`<line x1="${ox}" y1="${oy+j*s}" x2="${ox+w*s}" y2="${oy+j*s}" stroke="#111" stroke-width=".8"/>`;
   g+=dot(ox,oy+h*s,1.6)+T(ox-4,oy+h*s+5,'A',5)+dot(ox+w*s,oy,1.6)+T(ox+w*s+3,oy-2.5,'B',5,'start');
   const C=[];for(let i=0;i<=w;i++){C[i]=[];for(let j=0;j<=h;j++)C[i][j]=i===0||j===0?1:C[i-1][j]+C[i][j-1]}
   let nums='';for(let i=0;i<=w;i++)for(let j=0;j<=h;j++)if(i||j)nums+=T(ox+i*s+1.5,oy+(h-j)*s+5,C[i][j],4.2,'start').replace('fill="#111"',`fill="${RED}"`);
   return{q:`<div class="fig">${SVGW(`0 0 ${ox+w*s+10} ${oy+h*s+9}`,g)}</div>`,a:`<div class="fig">${SVGW(`0 0 ${ox+w*s+10} ${oy+h*s+9}`,g+nums)}</div><div class="ans-block"><b>${C[w][h]}通り</b></div>`,figAns:true,steps:['交差点ごとに、左と下の数をたす',`Bの数は ${C[w][h]}`]}}},
]);
addUnits(6,'単位',[
 {id:'units-len',title:'長さの単位',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'長さの単位',b:'1 km = 1000 m　1 m = 100 cm　1 cm = 10 mm　1 m = 1000 mm'},{h:'キロ・センチ・ミリ',b:'キロ（k）は1000倍、センチ（c）は1/100、ミリ（m）は1/1000 を表します。'}],tip:'<b>こつ</b>　単位の前の文字の意味を知ると、重さや体積の単位にも使えます。'},
  gen(){return unitConv([['km','m',1000,[1,9]],['m','cm',100,[1,20]],['m','mm',1000,[1,9]],['cm','mm',10,[2,50]],['m','km',1/1000,[2000,3500,8000]],['mm','cm',1/10,[30,250,480]],['cm','m',1/100,[300,1200,450]]])}},
 {id:'units-word',title:'単位の文章題',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'単位をそろえる',b:'ちがう単位がまざっているときは、どちらかにそろえてから計算します。'},{h:'容積',b:'入れ物いっぱいに入る水の体積を容積といいます。1000 cm³ = 1 L'}],tip:'<b>ちゅうい</b>　答えの単位が何かを、問題文でよく確かめましょう。'},
  gen(){return pick([
   ()=>{const a=pick([20,30,40,50]),b=pick([20,25,30]),c=pick([20,30,40]);return{q:`内のりが、たて ${a}cm、横 ${b}cm、深さ ${c}cm の水そうがあります。この水そうには何L の水が入りますか。`,a:`式 ${a} × ${b} × ${c} = ${a*b*c}（cm³）　答え ${num(a*b*c/1000)}L`,steps:['容積を cm³ で求める','1000 cm³ = 1 L']}},
   ()=>{const g=pick([250,350,450]),n=ri(4,9);return{q:`1こ ${g}g のかんづめが ${n}こあります。全部で何kg ですか。`,a:`式 ${g} × ${n} = ${g*n}（g）　答え ${num(g*n/1000)}kg`,steps:['1000 g = 1 kg']}},
   ()=>{const m=ri(2,9)*100+ri(1,9)*10,k=ri(1,3);return{q:`家から駅まで ${k}km${m}m、駅から学校まで ${m}m あります。家から学校までは何m ですか（駅を通ります）。`,a:`式 ${k*1000+m} + ${m} = ${k*1000+2*m}　答え ${k*1000+2*m}m`,steps:[`${k}km${m}m = ${k*1000+m}m`]}},
  ])()}},
]);

/* ---------- 少ない章をおぎなう ---------- */
addUnits(2,'かたちと 分数',[
 {id:'g2-rect',title:'長方形と 正方形',kind:'word',n:5,cols:1,lead:'つぎの 問題に 答えましょう。',parts:['答え'],
  explain:{points:[{h:'長方形',b:'4つの かどが すべて 直角の 四角形です。むかい合う へんの 長さは 同じです。'},{h:'正方形',b:'4つの かどが すべて 直角で、4つの へんの 長さが すべて 同じ 四角形です。'}],tip:'<b>こつ</b>　まわりの 長さは、4つの へんの 長さを ぜんぶ たします。'},
  gen(){const a=ri(2,9),b=ri(2,9);return pick([
   ()=>({q:`たて ${a}cm、よこ ${b}cm の 長方形の まわりの 長さは 何cm ですか。`,parts:['答え'],a:`答え ${2*(a+b)}cm`,steps:[`${a} + ${b} + ${a} + ${b} = ${2*(a+b)}`]}),
   ()=>({q:`1つの へんが ${a}cm の 正方形の まわりの 長さは 何cm ですか。`,parts:['答え'],a:`答え ${4*a}cm`,steps:[`${a} + ${a} + ${a} + ${a} = ${4*a}`]}),
   ()=>({q:`長方形の かどは、ぜんぶで いくつ ありますか。また、それは どんな かどですか。`,parts:['答え'],a:'答え 4つ、ぜんぶ 直角',steps:['長方形の 4つの かどは すべて 直角']}),
  ])()}},
]);
addUnits(3,'円と 球・グラフ',[
 {id:'g3-table',title:'表を まとめる',kind:'fig',n:2,cols:1,lead:'表の あいている ところに 数を 書きましょう。',
  explain:{points:[{h:'合計の らん',b:'たての 合計は たてに たし、よこの 合計は よこに たします。'},{h:'たしかめ',b:'いちばん 右下の 合計は、たての 合計を たしても、よこの 合計を たしても 同じに なります。'}],tip:'<b>こつ</b>　わかっている 数が 多い 列から うめましょう。'},
  gen(){const cats=shuffle(['ドッジボール','おにごっこ','なわとび','てつぼう']),cl=['1組','2組','3組'],v=cl.map(()=>cats.map(()=>ri(2,12)));
   const rs=v.map(r=>r.reduce((a,b)=>a+b)),cs=cats.map((_,j)=>v.reduce((a,r)=>a+r[j],0)),N=rs.reduce((a,b)=>a+b);
   const hid=new Set([`0,${ri(0,3)}`,`1,${ri(0,3)}`,`r2`,`c${ri(0,3)}`,'N']);
   const cell=(k,val,sh)=>hid.has(k)?(sh?`<td class="r">${val}</td>`:'<td></td>'):`<td>${val}</td>`;
   const tb=sh=>`<table class="tbl"><tr><th></th>${cats.map(c=>`<th style="font-weight:400">${c}</th>`).join('')}<th>合計</th></tr>${v.map((r,i)=>`<tr><th>${cl[i]}</th>${r.map((x,j)=>cell(`${i},${j}`,x,sh)).join('')}${cell('r'+i,rs[i],sh)}</tr>`).join('')}<tr><th>合計</th>${cs.map((x,j)=>cell('c'+j,x,sh)).join('')}${cell('N',N,sh)}</tr></table>`;
   return{q:`<div class="figcap">すきな 遊び しらべ（人）</div>${tb(false)}`,a:tb(true),figAns:true,steps:['よこの 合計 = その組の 人数を ぜんぶ たす','ひき算で、わからない ところを もとめる（合計 − ほかの 数）']}}},
]);
addUnits(4,'折れ線グラフ',[
 {id:'g4-table2',title:'2つのことがらを表にまとめる',kind:'fig',n:2,cols:1,lead:'表のあいているところに数を書きましょう。',
  explain:{points:[{h:'2つのことがら',b:'「犬を飼っているか」「ねこを飼っているか」のように、2つのことがらを同時に整理する表です。'},{h:'たし算・ひき算でうめる',b:'たての合計・よこの合計を使って、ひき算でわからないところを求めます。'}],tip:'<b>こつ</b>　1つの数がわかると、ほかの数も次々にわかります。'},
  gen(){const a=ri(2,9),b=ri(3,12),c=ri(3,12),d=ri(2,15);const cells={a,b,c,d,r1:a+b,r2:c+d,c1:a+c,c2:b+d,N:a+b+c+d};const hid=new Set(['b','c','d','N']);
   const cl=(k,sh)=>hid.has(k)?(sh?`<td class="r">${cells[k]}</td>`:'<td></td>'):`<td>${cells[k]}</td>`;
   const tb=sh=>`<table class="tbl"><tr><th colspan="2" rowspan="2"></th><th colspan="2">ねこ</th><th rowspan="2">合計</th></tr><tr><th>いる</th><th>いない</th></tr><tr><th rowspan="2">犬</th><th>いる</th>${cl('a',sh)}${cl('b',sh)}${cl('r1',sh)}</tr><tr><th>いない</th>${cl('c',sh)}${cl('d',sh)}${cl('r2',sh)}</tr><tr><th colspan="2">合計</th>${cl('c1',sh)}${cl('c2',sh)}${cl('N',sh)}</tr></table>`;
   return{q:`<div class="figcap">クラスで、犬とねこを飼っているかを調べました（人）。</div>${tb(false)}`,a:tb(true),figAns:true,steps:[`犬もねこもいない以外：${a+b} − ${a} = ${b}、${a+c} − ${a} = ${c}`,`犬いない・ねこいない：${c+d} − ${c} = ${d}`,`合計：${a+b} + ${c+d} = ${a+b+c+d}`]}}},
]);
addUnits(4,'直方体と 立方体',[
 {id:'g4-position',title:'空間の位置の表し方',kind:'fig',n:2,cols:2,lead:'頂点Dをもとにして、ほかの頂点の位置を（横、たて、高さ）で表しましょう。',
  explain:{points:[{h:'平面の位置',b:'もとにする点から、横に何cm・たてに何cm で表します。'},{h:'空間の位置',b:'それに「高さ何cm」を加えた、3つの数で表します。',ex:'（横 4cm、たて 3cm、高さ 2cm）'}],tip:'<b>こつ</b>　もとにする点から、辺にそってどれだけ進むかを考えます。'},
  gen(){const a=ri(3,9),b=ri(2,6),c=ri(2,6);const P={A:[10,30],B:[60,30],C:[60,70],D:[10,70],E:[30,12],F:[80,12],G:[80,52],H:[30,52]};const pos={A:[0,0,c],B:[a,0,c],C:[a,0,0],E:[0,b,c],F:[a,b,c],G:[a,b,0],H:[0,b,0]};
   const ln=(p,q,d)=>`<line x1="${P[p][0]}" y1="${P[p][1]}" x2="${P[q][0]}" y2="${P[q][1]}" stroke="#111" stroke-width="1" ${d?'stroke-dasharray="2 1.5"':''}/>`;
   let g=['AB','BC','CD','DA','EF','FG','AE','BF','CG'].map(e=>ln(e[0],e[1])).join('')+['HE','HG','HD'].map(e=>ln(e[0],e[1],1)).join('');
   g+=Object.entries(P).map(([k,p])=>T(p[0]+(p[0]<40?-3:3),p[1]+(p[1]<40?-1:5),k,5)).join('')+T(35,77,`横 ${a}cm`,4.2)+T(74,66,`たて ${b}cm`,4.2,'start')+T(6,52,`高さ ${c}cm`,4.2,'end');
   const k=pick(['B','F','G','E']);const p=pos[k];
   return{q:`<div class="fig">${SVGW('-14 0 106 82',g)}</div><div class="figcap">頂点${k}の位置</div>`,a:`<b>（横 ${p[0]}cm、たて ${p[1]}cm、高さ ${p[2]}cm）</b>`,steps:[`Dから横に ${p[0]}cm、たてに ${p[1]}cm、高さ ${p[2]}cm 進む`]}}},
 {id:'g4-cubeface',title:'展開図で向かい合う面',kind:'fig',n:4,cols:2,lead:'展開図を組み立てたとき、色のついた面と向かい合う面の数字を答えましょう。',
  explain:{points:[{h:'向かい合う面',b:'展開図で、1つおいてとなりにある面どうしは向かい合います。'},{h:'たしかめ',b:'向かい合う面どうしは、展開図でとなり合うことはありません。'}],tip:'<b>こつ</b>　4つならんだ正方形の列では、1つおきの面が向かい合います。'},
  gen(){const nets=[{c:[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]],op:[[2,4],[1,3],[0,5]]},{c:[[0,0],[0,1],[1,1],[2,1],[3,1],[3,2]],op:[[1,3],[2,4],[0,5]]},{c:[[1,0],[0,1],[1,1],[2,1],[3,1],[2,2]],op:[[2,4],[1,3],[0,5]]}];
   const nt=pick(nets),lab=shuffle([1,2,3,4,5,6]),pr=pick(nt.op),[f,o]=chance(.5)?pr:[pr[1],pr[0]];const s=14;let g='';
   nt.c.forEach((p,i)=>{g+=`<rect x="${4+p[0]*s}" y="${4+p[1]*s}" width="${s}" height="${s}" fill="${i===f?'#cfcfcf':'#fff'}" stroke="#111" stroke-width=".8"/>${T(4+p[0]*s+s/2,4+p[1]*s+s*.68,lab[i],6)}`});
   return{q:`<div class="fig" style="max-width:55mm">${SVGW(`0 0 ${4*s+8} ${3*s+8}`,g)}</div>`,a:`<b>${lab[o]}</b>`,steps:[`色の面（${lab[f]}）から1つおいた面を探す`,`${lab[f]} と ${lab[o]} が向かい合う`]}}},
]);
addUnits(6,'単位',[
 {id:'units-prefix',title:'単位のしくみ（k・c・m）',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'単位の前につく記号',b:'k（キロ）は1000倍、c（センチ）は1/100、m（ミリ）は1/1000 を表します。'},{h:'いろいろな単位',b:'1 kL = 1000 L　1 g = 1000 mg　1 kg = 1000 g　1 L = 1000 mL'}],tip:'<b>こつ</b>　m（メートル）以外でも、同じ記号は同じ意味です。'},
  gen(){return unitConv([['kL','L',1000,[1,9]],['g','mg',1000,[1,9]],['kg','g',1000,[1,9]],['L','mL',1000,[1,9]],['km','m',1000,[1,9]],['mg','g',1/1000,[2000,5000]],['L','kL',1/1000,[3000,6000]]])}},
]);
/* 章の整理：1年の「とけい」と「かずと かたち」をまとめる、5年の「比例」を割合の章へ */
(()=>{const g1=GRADE_UNITS[1],t=g1.find(c=>c.ch==='とけい'),k=g1.find(c=>c.ch==='かずと かたち');if(t&&k){t.ch='とけいと かたち';t.items.push(...k.items);g1.splice(g1.indexOf(k),1)}
  const g5=GRADE_UNITS[5],p=g5.find(c=>c.ch==='比例'),w=g5.find(c=>c.ch==='平均・単位量・速さ・割合');if(p&&w){w.items.push(...p.items);w.ch='平均・単位量・速さ・割合・比例';g5.splice(g5.indexOf(p),1)}})();
