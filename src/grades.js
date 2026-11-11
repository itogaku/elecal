/* ============ 1〜5年の単元 ============ */
const PLACE=['一','十','百','千','一万','十万'];
function colAddSteps(a,b){
  const da=String(a).split('').reverse(),db=String(b).split('').reverse(),L=Math.max(da.length,db.length),st=[];let c=0;
  for(let i=0;i<L;i++){const x=+(da[i]||0),y=+(db[i]||0),s=x+y+c;
    st.push(`${PLACE[i]}の位：${x} + ${y}${c?' + 1（くり上がり）':''} = ${s}${s>=10?` → ${s%10} を書いて、1 くり上がる`:''}`);c=s>=10?1:0}
  if(c)st.push(`${PLACE[L]}の位に 1 を書く`);
  return st;
}
function colSubSteps(a,b){
  const da=String(a).split('').reverse(),db=String(b).split('').reverse(),st=[];let br=0;
  for(let i=0;i<da.length;i++){const o=+da[i],y=+(db[i]||0),e=o-br;
    if(i>=db.length&&br===0){continue}
    if(e<0){st.push(`${PLACE[i]}の位：0 から 1 かしたいので、上の位から 1 かりて 10 にして 1 かす → 9 − ${y} = ${9-y}`);br=1}
    else if(e<y){st.push(`${PLACE[i]}の位：${br?`1 かしたので ${e}。`:''}${e} から ${y} はひけないので、上の位から 1 かりて ${e+10} − ${y} = ${e+10-y}`);br=1}
    else{st.push(`${PLACE[i]}の位：${br?`1 かしたので ${e}。`:''}${e} − ${y} = ${e-y}`);br=0}}
  return st;
}
const SUB='<span>−</span>',ADD='<span>+</span>',MUL='<span>×</span>',DIV='<span>÷</span>';
function unitConv(list){
  const c=pick(list);const big=c[2]>=1;
  const v=big?(c[3]?ri(c[3][0],c[3][1]):ri(2,9)):pick(c[3]||[ri(2,9)*Math.round(1/c[2])]);
  const raw=v*c[2];
  return{q:`${num(v)} ${c[0]} = {_} ${c[1]}`,tail:'',a:num(raw),steps:big?[`1 ${c[0]} = ${c[2]} ${c[1]}`,`${num(v)} × ${c[2]} = ${num(raw)}`]:[`1 ${c[1]} = ${num(1/c[2])} ${c[0]}`,`${num(v)} ÷ ${num(1/c[2])} = ${num(raw)}`]};
}
function clockSVG(h,m){
  let t='';for(let i=0;i<60;i++){const a=i*6*Math.PI/180,r1=i%5?42:39;t+=`<line x1="${50+r1*Math.sin(a)}" y1="${50-r1*Math.cos(a)}" x2="${50+44*Math.sin(a)}" y2="${50-44*Math.cos(a)}" stroke="#111" stroke-width="${i%5?.5:1.2}"/>`}
  for(let i=1;i<=12;i++){const a=i*30*Math.PI/180;t+=`<text x="${50+33*Math.sin(a)}" y="${50-33*Math.cos(a)+3.2}" font-size="9" text-anchor="middle" fill="#111">${i}</text>`}
  const ha=((h%12)+m/60)*30*Math.PI/180,ma=m*6*Math.PI/180;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#111" stroke-width="1.6"/>${t}
  <line x1="50" y1="50" x2="${50+22*Math.sin(ha)}" y2="${50-22*Math.cos(ha)}" stroke="#111" stroke-width="3.2" stroke-linecap="round"/>
  <line x1="50" y1="50" x2="${50+36*Math.sin(ma)}" y2="${50-36*Math.cos(ma)}" stroke="#111" stroke-width="1.8" stroke-linecap="round"/><circle cx="50" cy="50" r="2.2" fill="#111"/></svg>`;
}
const SVGW=(vb,inner)=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
const T=(x,y,s,sz=7,anc='middle')=>`<text x="${num(x)}" y="${num(y)}" font-size="${sz}" text-anchor="${anc}" fill="#111">${s}</text>`;

const GRADE_UNITS={
 1:[
  {ch:'10までのかず',items:[
   {id:'g1-pair',title:'いくつといくつ',kind:'calc',n:15,cols:3,lead:'□に あてはまる かずを かきましょう。',
    explain:{points:[{h:'10 は いくつと いくつ',b:'10 は 1と9、2と8、3と7、4と6、5と5 に わけられます。',ex:'7 と 3 で 10'},{h:'ゆびや おはじきで かんがえよう',b:'あと いくつで その かずに なるかを かぞえます。'}],
     tip:'<b>こつ</b>　10 の つくりかたを おぼえると、くりあがりの たしざんが らくに なります。'},
    gen(){const t=ri(5,10),a=ri(1,t-1);return chance(.5)?{q:`${a} と {_} で ${t}`,tail:'',a:String(t-a),steps:[`${a} に あと ${t-a} で ${t}`]}:{q:`${t} は ${a} と {_}`,tail:'',a:String(t-a),steps:[`${t} − ${a} = ${t-a}`]}}},
   {id:'g1-add10',title:'たしざん（くりあがりなし）',kind:'calc',n:15,cols:3,lead:'けいさんを しましょう。',
    explain:{points:[{h:'たしざん',b:'あわせて いくつか、ふえると いくつかを もとめる けいさんです。',ex:'3 + 4 = 7'},{h:'0 の たしざん',b:'0 を たしても かずは かわりません。',ex:'5 + 0 = 5'}],tip:'<b>こつ</b>　おおきい かずから じゅんに かぞえると はやく できます。'},
    gen(){const s=ri(2,10),a=ri(0,s),b=s-a;return{q:`${a}${ADD}${b}`,a:String(s),steps:[`${a} から ${b} ふやすと ${s}`]}}},
   {id:'g1-sub10',title:'ひきざん（くりさがりなし）',kind:'calc',n:15,cols:3,lead:'けいさんを しましょう。',
    explain:{points:[{h:'ひきざん',b:'のこりは いくつか、ちがいは いくつかを もとめる けいさんです。',ex:'7 − 3 = 4'},{h:'10 より おおきい かず',b:'15 − 3 は、ばらの 5 から 3 を ひいて 12 です。',ex:'15 − 3 = 12'}],tip:'<b>ちゅうい</b>　おおきい かずから ちいさい かずを ひきます。'},
    gen(){if(chance(.4)){const o=ri(1,9),b=ri(1,o);return{q:`${10+o}${SUB}${b}`,a:String(10+o-b),steps:[`ばらの ${o} から ${b} を ひいて ${o-b}`,`10 と ${o-b} で ${10+o-b}`]}}const a=ri(2,10),b=ri(1,a);return{q:`${a}${SUB}${b}`,a:String(a-b),steps:[`${a} から ${b} へらすと ${a-b}`]}}},
  ]},
  {ch:'20までのかずの けいさん',items:[
   {id:'g1-add20',title:'たしざん（くりあがりあり）',kind:'calc',n:15,cols:3,lead:'けいさんを しましょう。',
    explain:{points:[{h:'10 の まとまりを つくる',b:'たす かずを わけて、まず 10 を つくります。',ex:'9 + 4 → 4 を 1 と 3 に わける → 10 と 3 で 13'},{h:'じゅんばん',b:'① あと いくつで 10 か かんがえる　② たす かずを わける　③ 10 と のこりを あわせる'}],
     tip:'<b>こつ</b>　「いくつと いくつ」で 10 の つくりかたを おもいだしましょう。'},
    gen(){const a=ri(2,9),b=ri(11-a,9);const need=10-a;return{q:`${a}${ADD}${b}`,a:String(a+b),steps:[`${b} を ${need} と ${b-need} に わける`,`${a} + ${need} = 10`,`10 + ${b-need} = ${a+b}`]}}},
   {id:'g1-sub20',title:'ひきざん（くりさがりあり）',kind:'calc',n:15,cols:3,lead:'けいさんを しましょう。',
    explain:{points:[{h:'10 から ひく',b:'ひかれる かずを 10 と ばらに わけて、10 から ひきます。',ex:'13 − 8 → 10 − 8 = 2 → 2 と 3 で 5'},{h:'じゅんばん',b:'① 10 と ばらに わける　② 10 から ひく　③ ばらと あわせる'}],
     tip:'<b>ちゅうい</b>　ばらの 3 から 8 は ひけないので、10 から ひきます。'},
    gen(){const o=ri(1,8),b=ri(o+1,9),a=10+o;return{q:`${a}${SUB}${b}`,a:String(a-b),steps:[`${a} を 10 と ${o} に わける`,`10 − ${b} = ${10-b}`,`${10-b} + ${o} = ${a-b}`]}}},
   {id:'g1-three',title:'3つの かずの けいさん',kind:'calc',n:12,cols:2,lead:'けいさんを しましょう。',
    explain:{points:[{h:'まえから じゅんに',b:'3つの かずの けいさんは、まえから じゅんに 1つずつ けいさんします。',ex:'4 + 3 + 2 → 7 + 2 = 9'}],tip:'<b>こつ</b>　とちゅうの こたえを ちいさく かいておくと まちがえません。'},
    gen(){for(;;){const a=ri(1,10),b=ri(1,9),c=ri(1,9);const o1=pick(['+','−']),o2=pick(['+','−']);const m=o1==='+'?a+b:a-b;if(m<0)continue;const r=o2==='+'?m+c:m-c;if(r<0||r>20||m>20)continue;
      return{q:`${a}<span>${o1}</span>${b}<span>${o2}</span>${c}`,a:String(r),steps:[`${a} ${o1} ${b} = ${m}`,`${m} ${o2} ${c} = ${r}`]}}}},
  ]},
  {ch:'とけい',items:[
   {id:'g1-clock',title:'とけい（なんじ なんぷん）',kind:'fig',n:9,cols:3,lead:'とけいを よみましょう。',
    explain:{points:[{h:'みじかい はり',b:'「なんじ」を あらわします。すうじと すうじの あいだに あるときは、ちいさい ほうの すうじを よみます。'},{h:'ながい はり',b:'「なんぷん」を あらわします。ちいさい めもり 1つで 1ぷん、すうじ 1つぶんで 5ふん です。',ex:'ながい はりが 3 → 15ふん'}],
     tip:'<b>ちゅうい</b>　ながい はりと みじかい はりを まちがえないように しましょう。'},
    gen(){const h=ri(1,12),m=pick([0,30,ri(1,11)*5,ri(1,59)]);return{q:`<div class="fig" style="max-width:42mm;margin:0 auto">${clockSVG(h,m)}</div>`,a:`<b>${h}じ ${m}ふん</b>`,steps:[`みじかい はりは ${h} と ${h%12+1} の あいだ → ${h}じ`,`ながい はりは ${m} めもり → ${m}ふん`]}}},
  ]},
 ],
 2:[
  {ch:'たし算と ひき算',items:[
   {id:'g2-add',title:'2けたの たし算（ひっ算）',kind:'calc',n:12,cols:2,lead:'ひっ算で 計算しましょう。',
    explain:{points:[{h:'くらいを そろえる',b:'一のくらい、十のくらいを たてに そろえて 書きます。'},{h:'一のくらいから 計算',b:'一のくらいが 10 を こえたら、十のくらいに 1 くり上げます。',ex:'38 + 47 → 8 + 7 = 15 → 5 を書いて 1 くり上げる → 3 + 4 + 1 = 8 → 85'}],
     tip:'<b>ちゅうい</b>　くり上げた 1 を たしわすれないように、小さく 書いておきましょう。'},
    gen(){const a=ri(11,89),b=ri(11,99-(chance(.3)?0:a>50?a-10:0));return{q:`${a}${ADD}${b}`,a:String(a+b),steps:colAddSteps(a,b)}}},
   {id:'g2-sub',title:'2けたの ひき算（ひっ算）',kind:'calc',n:12,cols:2,lead:'ひっ算で 計算しましょう。',
    explain:{points:[{h:'くらいを そろえる',b:'一のくらい、十のくらいを たてに そろえて 書きます。'},{h:'ひけない ときは 十のくらいから かりる',b:'一のくらいが ひけないときは、十のくらいから 1 かりて 10 にします。',ex:'52 − 17 → 12 − 7 = 5 → 4 − 1 = 3 → 35'}],
     tip:'<b>ちゅうい</b>　かした 十のくらいは 1 へって います。'},
    gen(){const a=chance(.3)?ri(101,180):ri(21,99),b=ri(11,Math.min(a-1,99));return{q:`${a}${SUB}${b}`,a:String(a-b),steps:colSubSteps(a,b)}}},
  ]},
  {ch:'かけ算',items:[
   {id:'g2-kuku',title:'かけ算九九',kind:'calc',n:18,cols:3,lead:'計算しましょう。',
    explain:{points:[{h:'かけ算の いみ',b:'「1つぶんの 数 × いくつぶん」で、ぜんぶの 数が わかります。',ex:'3こずつ 4さら → 3 × 4 = 12'},{h:'かける数が 1 ふえると',b:'こたえは かけられる数だけ ふえます。',ex:'3 × 4 = 12、3 × 5 = 15'}],
     tip:'<b>こつ</b>　わすれたときは、1つ前の 九九に かけられる数を たすと 出せます。'},
    gen(){const a=ri(1,9),b=ri(1,9);return{q:`${a}${MUL}${b}`,a:String(a*b),steps:[`${a} が ${b} こぶん：${Array(b).fill(a).join(' + ')} = ${a*b}`]}}},
  ]},
  {ch:'長さ・かさ・時こく',items:[
   {id:'g2-units',title:'長さと かさの たんい',kind:'calc',n:12,cols:2,lead:'□に あてはまる 数を 書きましょう。',
    explain:{points:[{h:'長さ',b:'1 cm = 10 mm　1 m = 100 cm'},{h:'かさ',b:'1 L = 10 dL　1 dL = 100 mL　1 L = 1000 mL'}],tip:'<b>こつ</b>　大きい たんいから 小さい たんいに するときは、数が 大きく なります。'},
    gen(){return unitConv([['cm','mm',10,[1,20]],['m','cm',100,[1,9]],['L','dL',10,[1,9]],['dL','mL',100,[1,9]],['L','mL',1000,[1,5]],['mm','cm',1/10,[20,30,40,50,60,70,80,90]],['cm','m',1/100,[100,200,300,500]],['dL','L',1/10,[10,20,30,40,50]]])}},
   {id:'g2-time',title:'時こくと 時間',kind:'word',n:5,cols:1,lead:'つぎの もんだいに 答えましょう。',
    explain:{points:[{h:'時こくと 時間の ちがい',b:'「8時30分」のように 時計が さす ときを 時こく、ある時こくから ある時こくまでの 長さを 時間と いいます。'},{h:'1時間 = 60分',b:'長い はりが 1まわりすると 1時間です。',ex:'8時40分の 30分後 → 9時10分'}],
     tip:'<b>こつ</b>　60分を こえるときは、ちょうどの 時こく（〇時）で 一度 区切って 考えます。'},
    gen(){const h=ri(7,10),m=ri(1,11)*5,d=ri(2,11)*5;const t=h*60+m+d,th=Math.floor(t/60),tm=t%60;
      if(chance(.5))return{q:`${h}時${m}分から ${d}分 たった 時こくは 何時何分ですか。`,a:`答え ${th}時${tm}分`,steps:[`${h}時${m}分 + ${d}分`,tm<m?`${60-m}分で ${h+1}時ちょうど、のこり ${d-(60-m)}分 → ${th}時${tm}分`:`${m} + ${d} = ${m+d}分 → ${th}時${tm}分`]};
      return{q:`${h}時${m}分から ${th}時${tm}分までの 時間は 何分ですか。`,a:`答え ${d}分`,steps:tm<m?[`${h}時${m}分から ${h+1}時までが ${60-m}分`,`${h+1}時から ${th}時${tm}分までが ${tm}分`,`${60-m} + ${tm} = ${d}`]:[`${tm} − ${m} = ${d}`]}}},
  ]},
 ],
 3:[
  {ch:'たし算と ひき算',items:[
   {id:'g3-add',title:'3けた・4けたの たし算',kind:'calc',n:10,cols:2,lead:'ひっ算で 計算しましょう。',
    explain:{points:[{h:'位を そろえる',b:'一の位、十の位、百の位…を たてに そろえて書きます。'},{h:'一の位から じゅんに',b:'10 を こえたら 上の位に 1 くり上げます。くり上がりが 2回 つづくことも あります。'}],tip:'<b>ちゅうい</b>　くり上げた 1 は 小さく 書いておき、たしわすれないようにしましょう。'},
    gen(){const a=chance(.5)?ri(101,999):ri(1001,8999),b=ri(101,a>999?999:899);return{q:`${a}${ADD}${b}`,a:String(a+b),steps:colAddSteps(a,b)}}},
   {id:'g3-sub',title:'3けた・4けたの ひき算',kind:'calc',n:10,cols:2,lead:'ひっ算で 計算しましょう。',
    explain:{points:[{h:'ひけないときは 上の位から かりる',b:'となりの位から 1 かりて 10 にします。かした位は 1 へります。'},{h:'0 が あるとき',b:'すぐ上の位が 0 のときは、さらに 上の位から かりてきます。',ex:'302 − 158 → 百の位から かりて 十の位を 9 にする'}],tip:'<b>たしかめ</b>　答え + ひく数 = ひかれる数 に なるか 計算しましょう。'},
    gen(){const a=chance(.5)?ri(201,999):ri(1001,9999),b=ri(101,Math.min(a-1,a>999?2999:899));return{q:`${a}${SUB}${b}`,a:String(a-b),steps:colSubSteps(a,b)}}},
  ]},
  {ch:'かけ算と わり算',items:[
   {id:'g3-mul',title:'かけ算（2けた・3けた）',kind:'calc',n:10,cols:2,lead:'計算しましょう。',
    explain:{points:[{h:'位ごとに 分けて かける',b:'かけられる数を 十の位と 一の位に 分けて、それぞれ かけてから たします。',ex:'23 × 4 = 20 × 4 + 3 × 4 = 80 + 12 = 92'},{h:'2けた × 2けた',b:'かける数を 十の位と 一の位に 分けて 考えます。',ex:'23 × 14 = 23 × 10 + 23 × 4 = 230 + 92 = 322'}],tip:'<b>ちゅうい</b>　ひっ算では、十の位を かけた 答えを 1つ 左に ずらして 書きます。'},
    gen(){if(chance(.5)){const a=chance(.5)?ri(12,99):ri(102,999),b=ri(2,9);const h=Math.floor(a/100),t=Math.floor(a%100/10)*10,o=a%10;const parts=[h*100,t,o].filter(Boolean);return{q:`${a}${MUL}${b}`,a:String(a*b),steps:[`${a} = ${parts.join(' + ')} に 分ける`,`${parts.map(p=>`${p} × ${b}`).join(' + ')} = ${parts.map(p=>p*b).join(' + ')} = ${a*b}`]}}
      const a=ri(12,99),b=ri(12,99),t=Math.floor(b/10)*10,o=b%10;return{q:`${a}${MUL}${b}`,a:String(a*b),steps:[`${b} を ${t} と ${o} に 分ける`,`${a} × ${o} = ${a*o}`,`${a} × ${t} = ${a*t}`,`${a*o} + ${a*t} = ${a*b}`]}}},
   {id:'g3-div',title:'わり算（あまりあり）',kind:'calc',n:15,cols:3,lead:'計算しましょう。わり切れないときは あまりも 書きましょう。',
    explain:{points:[{h:'九九を つかう',b:'「わる数 × □」が わられる数に なる □ を 九九で さがします。',ex:'24 ÷ 6 → 6 × 4 = 24 → 4'},{h:'あまりの ある わり算',b:'わられる数を こえない いちばん大きい 九九を さがし、のこりが あまりです。',ex:'26 ÷ 6 → 6 × 4 = 24 → 4 あまり 2'}],tip:'<b>ちゅうい</b>　あまりは、かならず わる数より 小さく なります。'},
    gen(){const b=ri(2,9),q=ri(1,9),r=chance(.6)?ri(1,b-1):0,a=b*q+r;return{q:`${a}${DIV}${b}`,a:r?`${q} あまり ${r}`:String(q),steps:r?[`${b} × ${q} = ${b*q}（${b} × ${q+1} = ${b*(q+1)} は 大きすぎる）`,`${a} − ${b*q} = ${r} が あまり`,`たしかめ：${b} × ${q} + ${r} = ${a}`]:[`${b} × ${q} = ${a}`]}}},
  ]},
  {ch:'小数と 分数',items:[
   {id:'g3-dec',title:'小数の たし算・ひき算',kind:'calc',n:12,cols:2,lead:'計算しましょう。',
    explain:{points:[{h:'0.1 が いくつ分',b:'0.1 が いくつ分かで 考えると、整数と 同じように 計算できます。',ex:'0.6 + 0.8 → 6 + 8 = 14 → 1.4'},{h:'ひっ算は 小数点を そろえる',b:'小数点の 位置を たてに そろえて書き、答えにも 同じ 位置に 小数点を うちます。'}],tip:'<b>ちゅうい</b>　3 + 0.5 のときは、3 を 3.0 と 考えて 位を そろえます。'},
    gen(){const a=ri(1,99),b=ri(1,99);if(chance(.5))return{q:`${num(a/10)}${ADD}${num(b/10)}`,a:num((a+b)/10),steps:[`0.1 が ${a} こ と ${b} こ → ${a} + ${b} = ${a+b} こ`,`0.1 が ${a+b} こで ${num((a+b)/10)}`]};const[x,y]=a>=b?[a,b]:[b,a];return{q:`${num(x/10)}${SUB}${num(y/10)}`,a:num((x-y)/10),steps:[`0.1 が ${x} こ から ${y} こ → ${x-y} こ`,`0.1 が ${x-y} こで ${num((x-y)/10)}`]}}},
   {id:'g3-frac',title:'分数の たし算・ひき算（分母が同じ）',kind:'calc',n:12,cols:2,lead:'計算しましょう。',
    explain:{points:[{h:'分子どうしを 計算',b:'分母が 同じ分数は、分母は そのままで 分子どうしを たしたり ひいたり します。',ex:`${F(2,5)} + ${F(1,5)} = ${F(3,5)}`},{h:'1 は 分母と 分子が 同じ 分数',b:`1 を ${F(5,5)} のように 考えると、1 から ひく 計算も できます。`,ex:`1 − ${F(2,5)} = ${F(5,5)} − ${F(2,5)} = ${F(3,5)}`}],tip:'<b>ちゅうい</b>　分母どうしは たしません。'},
    gen(){const d=ri(3,12);if(chance(.2)){const a=ri(1,d-1);return{q:`1${SUB}${F(a,d)}`,a:F(d-a,d),steps:[`1 = ${F(d,d)} と 考える`,`${F(d,d)} − ${F(a,d)} = ${F(d-a,d)}`]}}
      const a=ri(1,d-1),b=ri(1,d-1);if(chance(.5)&&a+b<=d)return{q:`${F(a,d)}${ADD}${F(b,d)}`,a:a+b===d?'1':F(a+b,d),steps:[`分子どうしを たす：${a} + ${b} = ${a+b}`,...(a+b===d?[`${F(d,d)} = 1`]:[])]};if(a===b)return this.gen();const[x,y]=a>b?[a,b]:[b,a];return{q:`${F(x,d)}${SUB}${F(y,d)}`,a:F(x-y,d),steps:[`分子どうしを ひく：${x} − ${y} = ${x-y}`]}}},
  ]},
  {ch:'たんいと 式',items:[
   {id:'g3-units',title:'長さ・重さの たんい',kind:'calc',n:12,cols:2,lead:'□に あてはまる 数を 書きましょう。',
    explain:{points:[{h:'長さ',b:'1 km = 1000 m　1 m = 100 cm'},{h:'重さ',b:'1 kg = 1000 g　1 t = 1000 kg'}],tip:'<b>こつ</b>　「キロ（k）」が つくと 1000 倍の たんいです。'},
    gen(){return unitConv([['km','m',1000,[1,9]],['kg','g',1000,[1,9]],['t','kg',1000,[1,5]],['m','cm',100,[1,30]],['m','km',1/1000,[2000,3000,5000,7000]],['g','kg',1/1000,[2000,4000,6000]]])}},
   {id:'g3-box',title:'□を つかった 式',kind:'word',n:4,cols:1,lead:'わからない 数を □ として 式に 書き、□に あてはまる 数を もとめましょう。',
    explain:{points:[{h:'お話の じゅんに 式にする',b:'わからない 数を □ に して、お話の とおりに 式を 書きます。',ex:'□こ あって 5こ たべたら 12こ → □ − 5 = 12'},{h:'□を もとめる',b:'ぎゃくの 計算を します。ひき算の □ は たし算で、たし算の □ は ひき算で もとめます。',ex:'□ = 12 + 5 = 17'}],tip:'<b>たしかめ</b>　もとめた 数を □ に 入れて、お話に あうか たしかめましょう。'},
    gen(){return pick([
      ()=>{const x=ri(15,60),a=ri(3,x-5),b=x-a;return{q:`あめが 何こか ありました。${a}こ 食べたら、のこりが ${b}こに なりました。はじめに 何こ ありましたか。`,a:`式 □ − ${a} = ${b}　□ = ${x}　答え ${x}こ`,steps:[`はじめの 数を □ として、□ − ${a} = ${b}`,`□ = ${b} + ${a} = ${x}`]}},
      ()=>{const a=ri(10,50),x=ri(5,40);return{q:`カードを ${a}まい 持っています。友だちから 何まいか もらったので、${a+x}まいに なりました。何まい もらいましたか。`,a:`式 ${a} + □ = ${a+x}　□ = ${x}　答え ${x}まい`,steps:[`もらった 数を □ として、${a} + □ = ${a+x}`,`□ = ${a+x} − ${a} = ${x}`]}},
      ()=>{const n=ri(3,9),x=ri(3,9);return{q:`同じ 数ずつ ${n}人に 配ったら、ちょうど ${n*x}こ つかいました。1人 何こずつ 配りましたか。`,a:`式 □ × ${n} = ${n*x}　□ = ${x}　答え ${x}こ`,steps:[`1人分を □ として、□ × ${n} = ${n*x}`,`□ = ${n*x} ÷ ${n} = ${x}`]}},
    ])()}},
  ]},
 ],
 4:[
  {ch:'わり算の ひっ算',items:[
   {id:'g4-div1',title:'わり算（÷1けた）',kind:'calc',n:12,cols:2,lead:'計算しましょう。わり切れないときは、あまりも 出しましょう。',
    explain:{points:[{h:'上の位から じゅんに',b:'「たてる → かける → ひく → おろす」を くり返します。',ex:'86 ÷ 3 → 8 ÷ 3 = 2 あまり 2 → 26 ÷ 3 = 8 あまり 2 → 28 あまり 2'},{h:'たしかめ',b:'わる数 × 商 + あまり = わられる数 に なれば 正しいです。'}],tip:'<b>ちゅうい</b>　商が たたない 位には 0 を 書きます。あまりは わる数より 小さく なります。'},
    gen(){const b=ri(2,9),q=chance(.5)?ri(11,99):ri(100,300),r=ri(0,b-1),a=b*q+r;return{q:`${a}${DIV}${b}`,a:r?`${q} あまり ${r}`:String(q),steps:[`${b} × ${q} = ${b*q}`,`${a} − ${b*q} = ${r}${r?'（あまり）':''}`,`たしかめ：${b} × ${q}${r?` + ${r}`:''} = ${a}`]}}},
   {id:'g4-div2',title:'わり算（÷2けた）',kind:'calc',n:10,cols:2,lead:'計算しましょう。わり切れないときは、あまりも 出しましょう。',
    explain:{points:[{h:'商の見当をつける',b:'わる数を 何十と みて、商の 見当を つけます。',ex:'96 ÷ 32 → 90 ÷ 30 で 3 くらい'},{h:'大きすぎたら 1 小さく',b:'かけた答えが わられる数より 大きくなったら、商を 1 小さくして やり直します。'}],tip:'<b>たしかめ</b>　わる数 × 商 + あまり = わられる数'},
    gen(){const b=ri(12,49),q=chance(.5)?ri(2,9):ri(10,30),r=ri(0,b-1),a=b*q+r;return{q:`${a}${DIV}${b}`,a:r?`${q} あまり ${r}`:String(q),steps:[`${b} を およそ ${Math.round(b/10)*10} と みて 商の 見当を つける`,`${b} × ${q} = ${b*q}`,`${a} − ${b*q} = ${r}`,`たしかめ：${b} × ${q} + ${r} = ${a}`]}}},
  ]},
  {ch:'がい数と 計算のきまり',items:[
   {id:'g4-round',title:'がい数（四捨五入）',kind:'calc',n:12,cols:2,lead:'四捨五入して、（　）の 位までの がい数に しましょう。',
    explain:{points:[{h:'四捨五入',b:'もとめる位の 1つ 下の位の 数字が 0〜4 なら 切り捨て、5〜9 なら 切り上げます。'},{h:'例',b:'3 4 7 2 を 百の位までの がい数にする → 十の位は 7 なので 切り上げ → 3500',ex:'3472 → 3500'}],tip:'<b>ちゅうい</b>　「百の位まで」と「上から2けた」は ちがうことが あります。どの位を 見るかを まず 決めましょう。'},
    gen(){const N=chance(.5)?ri(1000,9999):ri(10000,99999);const opts=N>=10000?[[1000,'千の位'],[10000,'一万の位']]:[[10,'十の位'],[100,'百の位'],[1000,'千の位']];const [u,name]=pick(opts);
      const below=Math.floor(N%u/(u/10));const r=Math.round(N/u)*u;
      return{q:`${N}（${name}）`,tail:'<span>→</span>',a:String(r),steps:[`${name}の 1つ 下の位の 数字は ${below}`,`${below<5?'0〜4 なので 切り捨て':'5〜9 なので 切り上げ'} → ${r}`]}}},
   {id:'g4-order',title:'計算の じゅんじょ',kind:'calc',n:12,cols:2,lead:'計算しましょう。',
    explain:{points:[{h:'計算の じゅんばん',b:'① ( ) の中を 先に　② × と ÷ を 先に　③ + と − は 左から じゅんに',ex:'6 + 4 × 2 = 6 + 8 = 14'},{h:'( ) が あるとき',b:'( ) の中を いちばん 先に 計算します。',ex:'(6 + 4) × 2 = 10 × 2 = 20'}],tip:'<b>ちゅうい</b>　左から じゅんに 計算して、6 + 4 × 2 = 20 と しないように しましょう。'},
    gen(){const t=ri(0,3),a=ri(2,30),b=ri(2,9),c=ri(2,9);
      if(t===0)return{q:`${a}${ADD}${b}${MUL}${c}`,a:String(a+b*c),steps:[`× を 先に：${b} × ${c} = ${b*c}`,`${a} + ${b*c} = ${a+b*c}`]};
      if(t===1)return{q:`(${a}${ADD}${b})${MUL}${c}`,a:String((a+b)*c),steps:[`( ) の中を 先に：${a} + ${b} = ${a+b}`,`${a+b} × ${c} = ${(a+b)*c}`]};
      if(t===2){const x=b*c,y=ri(x+1,x+40);return{q:`${y}${SUB}${x}${DIV}${b}`,a:String(y-c),steps:[`÷ を 先に：${x} ÷ ${b} = ${c}`,`${y} − ${c} = ${y-c}`]}}
      const x=ri(b+1,b+20);return{q:`(${x}${SUB}${b})${MUL}${c}${ADD}${a}`,a:String((x-b)*c+a),steps:[`( ) の中：${x} − ${b} = ${x-b}`,`×：${x-b} × ${c} = ${(x-b)*c}`,`${(x-b)*c} + ${a} = ${(x-b)*c+a}`]}}},
  ]},
  {ch:'小数と 分数',items:[
   {id:'g4-dec',title:'小数の計算',kind:'calc',n:12,cols:2,lead:'計算しましょう。',
    explain:{points:[{h:'たし算・ひき算',b:'小数点の 位置を そろえて、整数と 同じように 計算します。',ex:'2.45 + 1.8 → 2.45 + 1.80 = 4.25'},{h:'小数 × 整数、小数 ÷ 整数',b:'小数点を ないものとして 計算し、もとの 小数点の 位置に 小数点を うちます。',ex:'1.6 × 3 → 16 × 3 = 48 → 4.8'}],tip:'<b>ちゅうい</b>　小数 ÷ 整数では、商の 小数点は わられる数の 小数点に そろえます。'},
    gen(){const t=ri(0,3);
      if(t<2){const a=ri(101,999),b=ri(11,99);if(t===0)return{q:`${num(a/100)}${ADD}${num(b/10)}`,a:num((a+b*10)/100),steps:[`位を そろえる：${num(a/100)} + ${(b/10).toFixed(2)}`,`0.01 が ${a} + ${b*10} = ${a+b*10} こ → ${num((a+b*10)/100)}`]};const[x,y]=a>b*10?[a,b*10]:[b*10,a];return{q:`${num(x/100)}${SUB}${num(y/100)}`,a:num((x-y)/100),steps:[`位を そろえる：${(x/100).toFixed(2)} − ${(y/100).toFixed(2)}`,`0.01 が ${x} − ${y} = ${x-y} こ → ${num((x-y)/100)}`]}}
      const k=ri(2,9),d=ri(11,99);if(d%10===0)return this.gen();if(t===2)return{q:`${num(d/10)}${MUL}${k}`,a:num(d*k/10),steps:[`小数点を とって ${d} × ${k} = ${d*k}`,`小数点を 1けた もどす → ${num(d*k/10)}`]};
      return{q:`${num(d*k/10)}${DIV}${k}`,a:num(d/10),steps:[`小数点を とって ${d*k} ÷ ${k} = ${d}`,`商の 小数点を わられる数に そろえる → ${num(d/10)}`]}}},
   {id:'g4-frac',title:'分数（帯分数・仮分数）',kind:'calc',n:12,cols:2,lead:'つぎの 問題に 答えましょう。',
    explain:{points:[{h:'仮分数 → 帯分数',b:'分子 ÷ 分母 の 商が 整数の部分、あまりが 分子に なります。',ex:`${F(11,4)} → 11 ÷ 4 = 2 あまり 3 → ${M(2,3,4)}`},{h:'帯分数 → 仮分数',b:'整数 × 分母 + 分子 を 新しい 分子に します。',ex:`${M(2,3,4)} → 2 × 4 + 3 = 11 → ${F(11,4)}`}],tip:'<b>こつ</b>　たし算・ひき算で 分子が ひけないときは、帯分数を 仮分数に なおすと 計算できます。'},
    gen(){const d=ri(2,9),w=ri(1,4),n=ri(1,d-1),imp=w*d+n,t=ri(0,3);
      if(t===0)return{q:`${F(imp,d)} を 帯分数に`,tail:'<span>→</span>',a:M(w,n,d),steps:[`${imp} ÷ ${d} = ${w} あまり ${n}`,`整数の部分 ${w}、分子 ${n}`]};
      if(t===1)return{q:`${M(w,n,d)} を 仮分数に`,tail:'<span>→</span>',a:F(imp,d),steps:[`${w} × ${d} + ${n} = ${imp}`]};
      const n2=ri(1,d-1),w2=ri(0,w);
      if(t===2){const tot=imp+w2*d+n2,ww=Math.floor(tot/d),nn=tot%d;return{q:`${M(w,n,d)}${ADD}${w2?M(w2,n2,d):F(n2,d)}`,a:nn?M(ww,nn,d):String(ww),steps:[`整数どうし ${w} + ${w2} = ${w+w2}、分数どうし ${F(n,d)} + ${F(n2,d)} = ${F(n+n2,d)}`,...(n+n2>=d?[`${F(n+n2,d)} = ${n+n2===d?'1':M(1,n+n2-d,d)} なので くり上げて ${nn?M(ww,nn,d):ww}`]:[])]}}
      const b=w2*d+n2;if(b>=imp)return this.gen();const rr=imp-b,ww=Math.floor(rr/d),nn=rr%d;
      return{q:`${M(w,n,d)}${SUB}${w2?M(w2,n2,d):F(n2,d)}`,a:nn?(ww?M(ww,nn,d):F(nn,d)):String(ww),steps:n>=n2?[`整数どうし ${w} − ${w2} = ${w-w2}、分数どうし ${F(n,d)} − ${F(n2,d)} = ${F(n-n2,d)}`]:[`${F(n,d)} から ${F(n2,d)} は ひけないので、仮分数に なおす：${F(imp,d)} − ${F(b,d)}`,`${F(imp,d)} − ${F(b,d)} = ${F(rr,d)}${ww&&nn?` = ${M(ww,nn,d)}`:''}`]}}},
  ]},
  {ch:'面積と 角',items:[
   {id:'g4-area',title:'長方形・正方形の面積',kind:'word',n:6,cols:2,lead:'つぎの 問題に 答えましょう。',
    explain:{points:[{h:'面積の 公式',b:'長方形の面積 = たて × 横　正方形の面積 = 1辺 × 1辺',ex:'たて 4 cm、横 6 cm → 4 × 6 = 24（cm²）'},{h:'辺の長さを もとめる',b:'面積と 1つの 辺が わかっていれば、わり算で もう1つの 辺が わかります。',ex:'面積 24 cm²、たて 4 cm → 24 ÷ 4 = 6（cm）'}],tip:'<b>ちゅうい</b>　面積の たんいは cm²、m² です。長さの たんいと まちがえないように しましょう。'},
    gen(){return pick([
     ()=>{const a=ri(2,15),b=ri(2,15);return{q:`たて ${a} cm、横 ${b} cm の 長方形の 面積`,a:`式 ${a} × ${b} = ${a*b}　答え ${a*b} cm²`,steps:['長方形の面積 = たて × 横']}},
     ()=>{const a=ri(2,15);return{q:`1辺が ${a} cm の 正方形の 面積`,a:`式 ${a} × ${a} = ${a*a}　答え ${a*a} cm²`,steps:['正方形の面積 = 1辺 × 1辺']}},
     ()=>{const a=ri(2,12),b=ri(2,12);return{q:`面積が ${a*b} cm² で、たてが ${a} cm の 長方形の 横の 長さ`,a:`式 ${a*b} ÷ ${a} = ${b}　答え ${b} cm`,steps:[`横を □ cm として、${a} × □ = ${a*b}`,`□ = ${a*b} ÷ ${a}`]}},
     ()=>{const a=ri(2,9),b=ri(2,9);return{q:`たて ${a} m、横 ${b} m の 長方形の 花だんの 面積`,a:`式 ${a} × ${b} = ${a*b}　答え ${a*b} m²`,steps:['長方形の面積 = たて × 横','たんいは m²']}},
    ])()}},
   {id:'g4-angle',title:'角の大きさ',kind:'fig',n:6,cols:3,lead:'アの 角の 大きさを 計算で もとめましょう。',
    explain:{points:[{h:'一直線の角',b:'一直線の 角は 180° です。',ex:'180° − 50° = 130°'},{h:'1回転の角',b:'1回転の 角は 360° です。直線が 交わってできる 向かい合った 角は 等しく なります。'}],tip:'<b>こつ</b>　図の中に 一直線（180°）や 1回転（360°）を 見つけると、計算で 角が もとめられます。'},
    gen(){const th=ri(3,15)*10+(chance(.3)?5:0),r=th*Math.PI/180,ex=50+38*Math.cos(r),ey=62-38*Math.sin(r);
      const arc=(r0,a0,a1)=>{const x0=50+r0*Math.cos(a0),y0=62-r0*Math.sin(a0),x1=50+r0*Math.cos(a1),y1=62-r0*Math.sin(a1);return `<path d="M${num(x0)},${num(y0)} A${r0},${r0} 0 0 0 ${num(x1)},${num(y1)}" fill="none" stroke="#111" stroke-width=".8"/>`};
      if(chance(.6)){const known=chance(.5);
        const svg=SVGW('0 0 100 72',`<line x1="6" y1="62" x2="94" y2="62" stroke="#111" stroke-width="1.3"/><line x1="50" y1="62" x2="${num(ex)}" y2="${num(ey)}" stroke="#111" stroke-width="1.3"/>${arc(10,0,r)}${arc(14,r,Math.PI)}${T(50+19*Math.cos(r/2),62-19*Math.sin(r/2)+2,known?th+'°':'ア',7)}${T(50+24*Math.cos((r+Math.PI)/2),62-24*Math.sin((r+Math.PI)/2)+2,known?'ア':(180-th)+'°',7)}`);
        const ans=known?180-th:th;return{q:`<div class="fig">${svg}</div>`,a:`<b>${ans}°</b>`,steps:['一直線の 角は 180°',`180° − ${known?th:180-th}° = ${ans}°`]}}
      const svg=SVGW('0 0 100 100',`<line x1="${num(50-40*Math.cos(r))}" y1="${num(50+40*Math.sin(r))}" x2="${num(50+40*Math.cos(r))}" y2="${num(50-40*Math.sin(r))}" stroke="#111" stroke-width="1.3"/><line x1="8" y1="50" x2="92" y2="50" stroke="#111" stroke-width="1.3"/>${T(50+16*Math.cos(r/2),50-16*Math.sin(r/2)+2,th+'°')}${T(50-16*Math.cos(r/2),50+16*Math.sin(r/2)+2,'ア')}`);
      return{q:`<div class="fig">${svg}</div>`,a:`<b>${th}°</b>`,steps:['2本の 直線が 交わって できる 向かい合った 角は 等しい',`ア = ${th}°（180° − ${180-th}° と 考えても よい）`]}}},
  ]},
 ],
 5:[
  {ch:'小数の かけ算・わり算',items:[
   {...UNITS[0].items[1],id:'g5-decmul'},
   {...UNITS[0].items[2],id:'g5-decdiv'},
  ]},
  {ch:'整数と 分数',items:[
   {id:'g5-gcd',title:'公倍数と 公約数',kind:'calc',n:12,cols:2,lead:'つぎの 数を もとめましょう。',
    explain:{points:[{h:'最小公倍数',b:'2つの数の 共通な倍数（公倍数）の うち、いちばん小さい数。大きい方の数の 倍数を じゅんに 調べます。',ex:'(4, 6) → 6, 12 … 12 は 4 でも わり切れる → 12'},{h:'最大公約数',b:'2つの数を どちらも わり切れる数（公約数）の うち、いちばん大きい数。小さい方の数の 約数から 調べます。',ex:'(12, 18) → 12 の約数 1,2,3,4,6,12 → 6'}],tip:'<b>こつ</b>　分数の 通分には 最小公倍数、約分には 最大公約数を つかいます。'},
    gen(){const g=ri(2,9),p=ri(1,7),q=ri(2,8);if(p===q||gcd(p,q)!==1)return this.gen();const a=g*p,b=g*q;
      if(chance(.5)){const L=a*b/gcd(a,b),big=Math.max(a,b),sm=Math.min(a,b);const ms=[];for(let m=big;m<=L;m+=big)ms.push(m);return{q:`(${a}, ${b}) の 最小公倍数`,tail:'<span>→</span>',a:String(L),steps:[`${big} の 倍数：${ms.join(', ')}`,`${L} は ${sm} でも わり切れる`]}}
      const G=gcd(a,b),sm=Math.min(a,b),ds=[];for(let i=1;i<=sm;i++)if(sm%i===0)ds.push(i);return{q:`(${a}, ${b}) の 最大公約数`,tail:'<span>→</span>',a:String(G),steps:[`${sm} の 約数：${ds.join(', ')}`,`この中で ${Math.max(a,b)} も わり切れる いちばん大きい数は ${G}`]}}},
   {id:'g5-reduce',title:'約分と 通分',kind:'calc',n:12,cols:2,lead:'約分・通分しましょう。',
    explain:{points:[{h:'約分',b:'分母と 分子を 同じ数（最大公約数）で わって、かんたんな 分数に します。',ex:`${F(12,18)} → 6 で わる → ${F(2,3)}`},{h:'通分',b:'分母の 最小公倍数を 共通の 分母にして、分子にも 同じ数を かけます。',ex:`${F(1,4)} と ${F(1,6)} → ${F(3,12)} と ${F(2,12)}`}],tip:'<b>ちゅうい</b>　分母だけ、分子だけに かけたり わったり しては いけません。'},
    gen(){if(chance(.5)){const f=proper(2,9),g=ri(2,9);return{q:`${F(f.n*g,f.d*g)} を 約分`,tail:'<span>→</span>',a:F(f.n,f.d),steps:[`${f.n*g} と ${f.d*g} の 最大公約数は ${g}`,`分母と 分子を ${g} で わる → ${F(f.n,f.d)}`]}}
      const a=proper(2,9),b=proper(2,9);if(a.d===b.d)return this.gen();const L=lcm(a.d,b.d);return{q:`(${FH(a)}, ${FH(b)}) を 通分`,tail:'<span>→</span>',a:`(${F(a.n*L/a.d,L)}, ${F(b.n*L/b.d,L)})`,steps:[`${a.d} と ${b.d} の 最小公倍数は ${L}`,`${FH(a)} は 分母・分子に ${L/a.d} を、${FH(b)} は ${L/b.d} を かける`]}}},
   {...UNITS[0].items[0],id:'g5-fadd'},
  ]},
  {ch:'平均・単位量・速さ・割合',items:[
   {id:'g5-avg',title:'平均',kind:'word',n:4,cols:1,lead:'つぎの 問題に 答えましょう。',
    explain:{points:[{h:'平均の 求め方',b:'平均 = 合計 ÷ 個数',ex:'3, 5, 7 → (3 + 5 + 7) ÷ 3 = 5'},{h:'合計の 求め方',b:'平均がわかれば、合計 = 平均 × 個数 で 合計が わかります。'}],tip:'<b>ちゅうい</b>　0 の データも 個数に 入れます。'},
    gen(){if(chance(.6)){const n=ri(4,6);let v;do{v=Array.from({length:n},()=>ri(60,100))}while(v.reduce((a,b)=>a+b)%n);const s=v.reduce((a,b)=>a+b);return{q:`${n}回の テストの 点数は ${v.join('点、')}点でした。平均は 何点ですか。`,a:`式 ${s} ÷ ${n} = ${s/n}　答え ${s/n}点`,steps:[`合計：${v.join(' + ')} = ${s}`,`平均 = 合計 ÷ 回数`]}}
      const n=ri(3,5),av=ri(70,85),tgt=av+ri(1,3),need=tgt*(n+1)-av*n;if(need>100)return this.gen();return{q:`${n}回の テストの 平均が ${av}点でした。${n+1}回目で 何点とれば、${n+1}回の 平均が ${tgt}点に なりますか。`,a:`式 ${tgt} × ${n+1} − ${av} × ${n} = ${need}　答え ${need}点`,steps:[`${n+1}回の 合計：${tgt} × ${n+1} = ${tgt*(n+1)}`,`${n}回の 合計：${av} × ${n} = ${av*n}`,`差が ${n+1}回目の 点数`]}}},
   {id:'g5-speed',title:'速さ',kind:'word',n:5,cols:1,lead:'つぎの 問題に 答えましょう。',
    explain:{points:[{h:'速さの 3つの 式',b:'速さ = 道のり ÷ 時間　道のり = 速さ × 時間　時間 = 道のり ÷ 速さ',wide:true},{h:'時速・分速・秒速',b:'時速は 1時間に、分速は 1分間に、秒速は 1秒間に 進む 道のりです。',ex:'時速 60 km = 分速 1 km'}],tip:'<b>ちゅうい</b>　時間の たんい（時間・分・秒）を そろえてから 計算しましょう。'},
    gen(){const v=pick([40,45,50,60,80]),t=ri(2,5);return pick([
     ()=>({q:`${v*t} km の 道のりを ${t}時間で 走る 自動車の 時速は 何 km ですか。`,a:`式 ${v*t} ÷ ${t} = ${v}　答え 時速 ${v} km`,steps:['速さ = 道のり ÷ 時間']}),
     ()=>({q:`時速 ${v} km で 走る 自動車が ${t}時間に 進む 道のりは 何 km ですか。`,a:`式 ${v} × ${t} = ${v*t}　答え ${v*t} km`,steps:['道のり = 速さ × 時間']}),
     ()=>({q:`${v*t} km の 道のりを 時速 ${v} km で 進むと、何時間 かかりますか。`,a:`式 ${v*t} ÷ ${v} = ${t}　答え ${t}時間`,steps:['時間 = 道のり ÷ 速さ']}),
     ()=>{const m=ri(6,9)*10,tt=ri(10,25);return{q:`分速 ${m} m で ${tt}分間 歩くと、何 m 進みますか。`,a:`式 ${m} × ${tt} = ${m*tt}　答え ${m*tt} m`,steps:['道のり = 速さ × 時間']}},
     ()=>{const s=ri(3,9),tt=ri(10,60);return{q:`${s*tt} m を ${tt}秒で 走りました。秒速は 何 m ですか。`,a:`式 ${s*tt} ÷ ${tt} = ${s}　答え 秒速 ${s} m`,steps:['速さ = 道のり ÷ 時間']}},
    ])()}},
   {id:'g5-percent',title:'割合と 百分率',kind:'word',n:5,cols:1,lead:'つぎの 問題に 答えましょう。',
    explain:{points:[{h:'割合',b:'割合 = くらべる量 ÷ もとにする量　割合を 100 倍すると 百分率（%）に なります。',ex:'0.35 = 35%'},{h:'くらべる量・もとにする量',b:'くらべる量 = もとにする量 × 割合　もとにする量 = くらべる量 ÷ 割合'}],tip:'<b>ちゅうい</b>　% のまま 計算せず、小数（35% → 0.35）に なおしてから 計算します。'},
    gen(){const p=pick([10,20,25,30,40,50,60,75,80]),b=pick([40,60,80,120,200,300,400,500]),c=b*p/100;if(c%1)return this.gen();return pick([
     ()=>({q:`定員 ${b}人の 会場に ${c}人 入っています。入っている人数は 定員の 何% ですか。`,a:`式 ${c} ÷ ${b} = ${num(p/100)}　答え ${p}%`,steps:[`もとにする量は 定員の ${b}人、くらべる量は ${c}人`,`割合 = ${c} ÷ ${b} = ${num(p/100)} → 100 倍して ${p}%`]}),
     ()=>({q:`${b}円の ${p}% は 何円ですか。`,a:`式 ${b} × ${num(p/100)} = ${c}　答え ${c}円`,steps:[`${p}% = ${num(p/100)}`,'くらべる量 = もとにする量 × 割合']}),
     ()=>({q:`ある数の ${p}% が ${c} です。ある数は いくつですか。`,a:`式 ${c} ÷ ${num(p/100)} = ${b}　答え ${b}`,steps:[`${p}% = ${num(p/100)}`,'もとにする量 = くらべる量 ÷ 割合']}),
     ()=>({q:`${b}円の 品物が ${p}% 引きで 売られています。代金は 何円ですか。`,a:`式 ${b} × (1 − ${num(p/100)}) = ${b-c}　答え ${b-c}円`,steps:[`${p}% 引き → 代金は もとの ${100-p}%`,`${b} × ${num((100-p)/100)} = ${b-c}`]}),
    ])()}},
  ]},
  {ch:'図形の 面積と 体積',items:[
   {id:'g5-area',title:'三角形・四角形の面積',kind:'fig',n:6,cols:3,lead:'つぎの 図形の 面積を もとめましょう。',
    explain:{points:[{h:'三角形・平行四辺形',b:'三角形 = 底辺 × 高さ ÷ 2　平行四辺形 = 底辺 × 高さ'},{h:'台形・ひし形',b:'台形 = (上底 + 下底) × 高さ ÷ 2　ひし形 = 対角線 × 対角線 ÷ 2'}],tip:'<b>ちゅうい</b>　高さは 底辺に 垂直な 長さです。ななめの 辺の 長さと まちがえないように しましょう。'},
    gen:genArea5},
   {id:'g5-vol',title:'直方体・立方体の体積',kind:'word',n:6,cols:2,lead:'つぎの 立体の 体積を もとめましょう。',
    explain:{points:[{h:'体積の 公式',b:'直方体 = たて × 横 × 高さ　立方体 = 1辺 × 1辺 × 1辺',ex:'2 × 3 × 4 = 24（cm³）'},{h:'1 m³',b:'1 m³ = 1000000 cm³　1 L = 1000 cm³'}],tip:'<b>ちゅうい</b>　体積の たんいは cm³、m³ です。'},
    gen(){if(chance(.3)){const a=ri(2,9);return{q:`1辺が ${a} cm の 立方体`,a:`式 ${a} × ${a} × ${a} = ${a**3}　答え ${a**3} cm³`,steps:['立方体の 体積 = 1辺 × 1辺 × 1辺']}}const a=ri(2,12),b=ri(2,12),c=ri(2,12);return{q:`たて ${a} cm、横 ${b} cm、高さ ${c} cm の 直方体`,a:`式 ${a} × ${b} × ${c} = ${a*b*c}　答え ${a*b*c} cm³`,steps:['直方体の 体積 = たて × 横 × 高さ']}}},
   {id:'g5-tri',title:'三角形の 角',kind:'fig',n:6,cols:3,lead:'アの 角の 大きさを もとめましょう。',
    explain:{points:[{h:'三角形の 3つの角',b:'三角形の 3つの 角の 大きさの 和は 180° です。',ex:'180° − (60° + 70°) = 50°'},{h:'四角形の 4つの角',b:'四角形は 対角線で 2つの 三角形に 分けられるので、4つの角の 和は 360° です。'}],tip:'<b>こつ</b>　わかっている 角を 先に たしてから 180° から ひくと、計算が 1回で すみます。'},
    gen:genTriAngle},
  ]},
 ],
};

/* 5年：図形の面積 */
function genArea5(){
  const t=pick(['tri','para','trap','rhom']);const dash='stroke="#111" stroke-width=".8" stroke-dasharray="2 1.5"';const sh='fill="#ededed" stroke="#111" stroke-width="1.3"';
  const fit=(w,h)=>{const s=70/Math.max(w,h*1.15);return s};
  if(t==='tri'){const b=ri(3,12),h=ri(3,10),off=ri(-2,b+1);const s=fit(b+2,h);const X0=15,Y0=85;const ax=X0+off*s,ay=Y0-h*s;
    const svg=SVGW('0 0 100 100',`<polygon points="${X0},${Y0} ${num(X0+b*s)},${Y0} ${num(ax)},${num(ay)}" ${sh}/><line x1="${num(ax)}" y1="${num(ay)}" x2="${num(ax)}" y2="${Y0}" ${dash}/>${(off<0||off>b)?`<line x1="${num(Math.min(X0,ax))}" y1="${Y0}" x2="${num(Math.max(X0+b*s,ax))}" y2="${Y0}" ${dash}/>`:''}${T(X0+b*s/2,Y0+8,b+'cm')}${T(ax+2,(ay+Y0)/2,h+'cm',7,'start')}`);
    const v=num(b*h/2);return{q:`<div class="fig">${svg}</div>`,a:`<b>${v} cm²</b>`,steps:[`三角形 = 底辺 × 高さ ÷ 2`,`${b} × ${h} ÷ 2 = ${v}`]}}
  if(t==='para'){const b=ri(3,12),h=ri(3,9),off=ri(1,4);const s=fit(b+off,h);const X0=12,Y0=85;
    const svg=SVGW('0 0 100 100',`<polygon points="${X0},${Y0} ${num(X0+b*s)},${Y0} ${num(X0+(b+off)*s)},${num(Y0-h*s)} ${num(X0+off*s)},${num(Y0-h*s)}" ${sh}/><line x1="${num(X0+off*s)}" y1="${num(Y0-h*s)}" x2="${num(X0+off*s)}" y2="${Y0}" ${dash}/>${T(X0+b*s/2,Y0+8,b+'cm')}${T(X0+off*s+2,Y0-h*s/2,h+'cm',7,'start')}`);
    return{q:`<div class="fig">${svg}</div>`,a:`<b>${b*h} cm²</b>`,steps:['平行四辺形 = 底辺 × 高さ',`${b} × ${h} = ${b*h}`]}}
  if(t==='trap'){const a=ri(2,7),b=a+ri(2,6),h=ri(2,8);const s=fit(b,h);const X0=12,Y0=85,l=ri(0,b-a);
    const svg=SVGW('0 0 100 100',`<polygon points="${X0},${Y0} ${num(X0+b*s)},${Y0} ${num(X0+(l+a)*s)},${num(Y0-h*s)} ${num(X0+l*s)},${num(Y0-h*s)}" ${sh}/><line x1="${num(X0+(l+a/2)*s)}" y1="${num(Y0-h*s)}" x2="${num(X0+(l+a/2)*s)}" y2="${Y0}" ${dash}/>${T(X0+b*s/2,Y0+8,b+'cm')}${T(X0+(l+a/2)*s,Y0-h*s-3,a+'cm')}${T(X0+(l+a/2)*s+2,Y0-h*s/2+2,h+'cm',7,'start')}`);
    const v=num((a+b)*h/2);return{q:`<div class="fig">${svg}</div><div class="figcap">（台形）</div>`,a:`<b>${v} cm²</b>`,steps:['台形 = (上底 + 下底) × 高さ ÷ 2',`(${a} + ${b}) × ${h} ÷ 2 = ${v}`]}}
  const d1=ri(4,12),d2=ri(4,12);const s=fit(d1,d2);const cx=50,cy=48;
  const svg=SVGW('0 0 100 100',`<polygon points="${num(cx-d1*s/2)},${cy} ${cx},${num(cy-d2*s/2)} ${num(cx+d1*s/2)},${cy} ${cx},${num(cy+d2*s/2)}" ${sh}/><line x1="${num(cx-d1*s/2)}" y1="${cy}" x2="${num(cx+d1*s/2)}" y2="${cy}" ${dash}/><line x1="${cx}" y1="${num(cy-d2*s/2)}" x2="${cx}" y2="${num(cy+d2*s/2)}" ${dash}/>${T(cx+d1*s/4,cy-2,d1+'cm')}${T(cx+2,cy+d2*s/4+2,d2+'cm',7,'start')}`);
  const v=num(d1*d2/2);return{q:`<div class="fig">${svg}</div><div class="figcap">（ひし形）</div>`,a:`<b>${v} cm²</b>`,steps:['ひし形 = 対角線 × 対角線 ÷ 2',`${d1} × ${d2} ÷ 2 = ${v}`]};
}
/* 5年：三角形の角（実際の角度で作図） */
function genTriAngle(){
  let a,b,c;do{a=ri(3,11)*10+pick([0,5]);b=ri(3,11)*10+pick([0,5]);c=180-a-b}while(c<25);
  const ra=a*Math.PI/180,rb=b*Math.PI/180,rc=c*Math.PI/180,L=1,AC=L*Math.sin(rb)/Math.sin(rc);
  let P=[[0,0],[1,0],[AC*Math.cos(ra),AC*Math.sin(ra)]];
  const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]),mnx=Math.min(...xs),mxx=Math.max(...xs),mxy=Math.max(...ys),s=76/Math.max(mxx-mnx,mxy);
  P=P.map(p=>[12+(p[0]-mnx)*s,88-p[1]*s]);
  const cen=[(P[0][0]+P[1][0]+P[2][0])/3,(P[0][1]+P[1][1]+P[2][1])/3];
  const hide=ri(0,2),angs=[a,b,c];
  const lab=P.map((p,i)=>{const dx=cen[0]-p[0],dy=cen[1]-p[1],d=Math.hypot(dx,dy),k=Math.min(13,d*.45);return T(p[0]+dx/d*k,p[1]+dy/d*k+2.4,i===hide?'ア':angs[i]+'°')}).join('');
  const svg=SVGW('0 0 100 100',`<polygon points="${P.map(p=>`${num(p[0])},${num(p[1])}`).join(' ')}" fill="#ededed" stroke="#111" stroke-width="1.3"/>${lab}`);
  const kn=angs.filter((_,i)=>i!==hide);
  return{q:`<div class="fig">${svg}</div>`,a:`<b>${angs[hide]}°</b>`,steps:['三角形の 3つの角の 和は 180°',`180° − (${kn[0]}° + ${kn[1]}°) = ${angs[hide]}°`]};
}

/* ============ 脳トレ・パズル（学年でむずかしさが変わる） ============ */
let LV=6; // 現在の学年
const PZ_LEAD='つぎの パズルを ときましょう。';
const pzBox=(x,y,w,h,v,red,fs=.55)=>`<rect x="${num(x)}" y="${num(y)}" width="${num(w)}" height="${num(h)}" fill="#fff" stroke="#111" stroke-width="1"/>${v!==''&&v!=null?`<text x="${num(x+w/2)}" y="${num(y+h/2+h*.2)}" font-size="${num(h*fs)}" text-anchor="middle" fill="${red?'#d2372b':'#111'}" font-weight="${red?700:400}">${v}</text>`:''}`;

function genMaze(){
  const N=LV<=2?8:LV<=4?10:13,vis=new Array(N*N).fill(false),R=new Array(N*N).fill(true),D=new Array(N*N).fill(true);
  const st=[0];vis[0]=true;
  while(st.length){const c=st[st.length-1],x=c%N,y=Math.floor(c/N),nb=[];
    if(x>0&&!vis[c-1])nb.push(c-1);if(x<N-1&&!vis[c+1])nb.push(c+1);if(y>0&&!vis[c-N])nb.push(c-N);if(y<N-1&&!vis[c+N])nb.push(c+N);
    if(!nb.length){st.pop();continue}const n=pick(nb);
    if(n===c+1)R[c]=false;else if(n===c-1)R[n]=false;else if(n===c+N)D[c]=false;else D[n]=false;vis[n]=true;st.push(n)}
  const prev=new Array(N*N).fill(-1),q=[0];prev[0]=0;
  while(q.length){const c=q.shift(),x=c%N,y=Math.floor(c/N);const mv=[];if(x<N-1&&!R[c])mv.push(c+1);if(x>0&&!R[c-1])mv.push(c-1);if(y<N-1&&!D[c])mv.push(c+N);if(y>0&&!D[c-N])mv.push(c-N);mv.forEach(n=>{if(prev[n]<0){prev[n]=c;q.push(n)}})}
  const path=[];for(let c=N*N-1;;c=prev[c]){path.push(c);if(c===0)break}path.reverse();
  const s=96/N,o=2;let w='';
  for(let i=0;i<N*N;i++){const x=i%N,y=Math.floor(i/N);
    if(x<N-1&&R[i])w+=`M${num(o+(x+1)*s)},${num(o+y*s)}V${num(o+(y+1)*s)}`;
    if(y<N-1&&D[i])w+=`M${num(o+x*s)},${num(o+(y+1)*s)}H${num(o+(x+1)*s)}`}
  w+=`M${num(o+s)},${o}H${o+96}V${o+96}M${num(o+96-s)},${o+96}H${o}V${o}`;
  const walls=`<path d="${w}" fill="none" stroke="#111" stroke-width="1.1" stroke-linecap="square"/>`;
  const lbl=`${T(o+s/2,-1.5,'スタート',4.5)}<path d="M${num(o+s/2)},0.5 v3" stroke="#111" stroke-width=".6"/>${T(o+96-s/2,o+96+6,'ゴール',4.5)}`;
  const pl=path.map(c=>`${num(o+(c%N+.5)*s)},${num(o+(Math.floor(c/N)+.5)*s)}`);
  const sol=`<polyline points="${num(o+s/2)},${o} ${pl.join(' ')} ${num(o+96-s/2)},${o+96}" fill="none" stroke="#d2372b" stroke-width="1.4" stroke-linejoin="round"/>`;
  const vb='-2 -6 104 112';
  return{q:`<div class="fig">${SVGW(vb,walls+lbl)}</div>`,a:`<div class="fig">${SVGW(vb,walls+lbl+sol)}</div>`,figAns:true,steps:['行き止まりに 入ったら、分かれ道まで もどって ちがう道を ためす','ゴールから 逆に たどるのも 1つの 方法']};
}
function sudokuSolveCount(g,n,bh,bw,lim){let cnt=0;
  const ok=(i,v)=>{const r=Math.floor(i/n),c=i%n;for(let k=0;k<n;k++){if(g[r*n+k]===v||g[k*n+c]===v)return false}const r0=r-r%bh,c0=c-c%bw;for(let y=r0;y<r0+bh;y++)for(let x=c0;x<c0+bw;x++)if(g[y*n+x]===v)return false;return true};
  const go=()=>{const i=g.indexOf(0);if(i<0){cnt++;return cnt>=lim}for(let v=1;v<=n;v++)if(ok(i,v)){g[i]=v;if(go()){g[i]=0;return true}g[i]=0}return false};
  go();return cnt}
function genSudoku(){
  const big=LV>=4,n=big?6:4,bh=2,bw=big?3:2;
  const perm=(k)=>shuffle([...Array(k).keys()]);
  const bandO=perm(n/bh),rows=[];bandO.forEach(b=>perm(bh).forEach(r=>rows.push(b*bh+r)));
  const stackO=perm(n/bw),cols=[];stackO.forEach(s=>perm(bw).forEach(c=>cols.push(s*bw+c)));
  const lab=perm(n).map(x=>x+1);
  const sol=[];for(let r=0;r<n;r++)for(let c=0;c<n;c++){const R=rows[r],C=cols[c];sol.push(lab[(bw*(R%bh)+Math.floor(R/bh)+C)%n])}
  const g=[...sol],target=big?(LV>=6?13:15):(LV<=1?8:6);
  for(const i of shuffle([...Array(n*n).keys()])){if(g.filter(Boolean).length<=target)break;const v=g[i];g[i]=0;if(sudokuSolveCount([...g],n,bh,bw,2)!==1)g[i]=v}
  const s=96/n,o=2;
  const draw=(show)=>{let t='';for(let i=0;i<n*n;i++){const x=i%n,y=Math.floor(i/n);const v=g[i]||(show?sol[i]:'');t+=`<rect x="${num(o+x*s)}" y="${num(o+y*s)}" width="${num(s)}" height="${num(s)}" fill="#fff" stroke="#999" stroke-width=".5"/>`;if(v)t+=`<text x="${num(o+x*s+s/2)}" y="${num(o+y*s+s*.7)}" font-size="${num(s*.55)}" text-anchor="middle" fill="${g[i]?'#111':'#d2372b'}" font-weight="${g[i]?400:700}">${v}</text>`}
    for(let k=0;k<=n;k++){if(k%bw===0)t+=`<line x1="${num(o+k*s)}" y1="${o}" x2="${num(o+k*s)}" y2="${o+96}" stroke="#111" stroke-width="1.6"/>`;if(k%bh===0)t+=`<line x1="${o}" y1="${num(o+k*s)}" x2="${o+96}" y2="${num(o+k*s)}" stroke="#111" stroke-width="1.6"/>`}return SVGW('0 0 100 100',t)};
  return{q:`<div class="fig">${draw(false)}</div>`,a:`<div class="fig">${draw(true)}</div>`,figAns:true,steps:[`まず、数字が たくさん 入っている 列や ${big?'太わく':'太わく'}を 見る`,`たて・よこ・太わくに ない 数字が 1つだけなら、それが 答え`]};
}
function genMagic(){
  const base=[[2,7,6],[9,5,1],[4,3,8]];let m=base.map(r=>[...r]);
  const rot=a=>a[0].map((_,i)=>a.map(r=>r[i]).reverse());for(let k=ri(0,3);k>0;k--)m=rot(m);if(chance(.5))m=m.map(r=>[...r].reverse());
  const add=LV<=2?0:LV<=4?ri(0,10):ri(5,30),mul=LV>=5&&chance(.4)?2:1;m=m.map(r=>r.map(v=>v*mul+add));
  const flat=m.flat(),S=flat[0]+flat[1]+flat[2];
  const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const want=LV<=2?5:LV<=4?4:3;let clue;
  for(let t=0;t<500;t++){clue=shuffle([...Array(9).keys()]).slice(0,want);const k=new Array(9).fill(null);clue.forEach(i=>k[i]=flat[i]);let ch=true;
    while(ch){ch=false;for(const L of lines){const u=L.filter(i=>k[i]==null);if(u.length===1){k[u[0]]=S-L.filter(i=>k[i]!=null).reduce((a,i)=>a+k[i],0);ch=true}}}
    if(k.every((v,i)=>v===flat[i]))break;clue=null}
  if(!clue)return genMagic();
  const s=30,o=5;const draw=(show)=>SVGW('0 0 100 100',flat.map((v,i)=>pzBox(o+(i%3)*s,o+Math.floor(i/3)*s,s,s,clue.includes(i)||show?v:'',show&&!clue.includes(i),.42)).join(''));
  return{q:`<div class="fig">${draw(false)}</div><div class="figcap">たて・よこ・ななめの 3つの数の 和が どれも ${S} に なるように、あいている ますに 数を 入れましょう。</div>`,a:`<div class="fig">${draw(true)}</div>`,figAns:true,
    steps:[`数が 2つ わかっている 列を さがす → 残りの 1つは ${S} − (2つの和)`,'1つ うめたら、また 2つ わかっている 列を さがす']};
}
function genPyramid(){
  const R=LV<=2?3:LV<=4?4:5,mx=LV<=2?9:LV<=4?15:25;
  const bot=Array.from({length:R},()=>ri(1,mx));const rows=[bot];while(rows[0].length>1){const r=rows[0],up=[];for(let i=0;i<r.length-1;i++)up.push(r[i]+r[i+1]);rows.unshift(up)}
  const show=rows.map((r,y)=>r.map(()=>y===R-1));
  if(LV>=3){const j=ri(0,R-1);show[R-1][j]=false;const p=j===0?0:j===R-1?R-2:pick([j-1,j]);show[R-2][p]=true}
  if(LV>=5){show[0][0]=true;const j2=ri(0,R-1);if(show[R-1][j2]&&show[R-1].filter(Boolean).length>R-2){show[R-1][j2]=false}}
  // 解けるか確認（下の段と上の段の関係でうめていく）
  const k=rows.map((r,y)=>r.map((v,x)=>show[y][x]?v:null));let ch=true;
  while(ch){ch=false;for(let y=0;y<R-1;y++)for(let x=0;x<=y;x++){const t=k[y][x],l=k[y+1][x],r=k[y+1][x+1];
    if(t==null&&l!=null&&r!=null){k[y][x]=l+r;ch=true}else if(t!=null&&l==null&&r!=null){k[y+1][x]=t-r;ch=true}else if(t!=null&&l!=null&&r==null){k[y+1][x+1]=t-l;ch=true}}}
  if(!k.every((r,y)=>r.every((v,x)=>v===rows[y][x])))return genPyramid();
  const bw=92/R,bh=bw*.62;const draw=(sh)=>SVGW(`0 0 100 ${num(R*bh+8)}`,rows.map((r,y)=>r.map((v,x)=>pzBox(4+(R-r.length)*bw/2+x*bw,4+y*bh,bw,bh,show[y][x]||sh?v:'',sh&&!show[y][x])).join('')).join(''));
  return{q:`<div class="fig">${draw(false)}</div>`,a:`<div class="fig">${draw(true)}</div>`,figAns:true,steps:['上の ますは、すぐ下の 2つの ますの 数の 和','下が わからないときは、上の数 − となりの数 で もとめる']};
}
function genMushikui(){
  const sub=LV>=5&&chance(.4),dig=LV<=2?2:3,hideN=LV<=2?2:LV<=4?3:4;
  for(let t=0;t<300;t++){
    let a=ri(10**(dig-1),10**dig-1),b=ri(10**(dig-1),10**dig-1);if(sub&&a<b)[a,b]=[b,a];const c=sub?a-b:a+b;
    const rows=[String(a),String(b),String(c)],W=Math.max(...rows.map(s=>s.length));
    const pos=[];rows.forEach((s,r)=>[...s].forEach((_,i)=>pos.push([r,i])));
    const hid=shuffle(pos).slice(0,hideN);
    const isH=(r,i)=>hid.some(h=>h[0]===r&&h[1]===i);
    // a ± b − c = 0 を、かくした数字の重みつき和で数える（解がちょうど1つか）
    const sign=[1,sub?-1:1,-1];let base=0;const ws=[],lead=[];
    rows.forEach((s,r)=>[...s].forEach((d,i)=>{const w=sign[r]*10**(s.length-1-i);if(isH(r,i))return;base+=w*(+d)}));
    hid.forEach(h=>{const s=rows[h[0]];ws.push(sign[h[0]]*10**(s.length-1-h[1]));lead.push(h[1]===0&&s.length>1)});
    let cnt=0;const dg=new Array(hideN).fill(0);
    for(;;){let ok=true,sum=base;for(let k=0;k<hideN;k++){if(lead[k]&&dg[k]===0){ok=false;break}sum+=dg[k]*ws[k]}
      if(ok&&sum===0&&++cnt>1)break;
      let k=0;while(k<hideN&&dg[k]===9){dg[k]=0;k++}if(k===hideN)break;dg[k]++}
    if(cnt!==1)continue;
    const cw=14,o=6;const draw=(sh)=>{let t='';rows.forEach((s,r)=>{const off=W-s.length;[...s].forEach((d,i)=>{const x=o+18+(off+i)*cw,y=o+r*cw*1.25+(r===2?4:0);t+=isH(r,i)?pzBox(x,y,cw-1.5,cw-1.5,sh?d:'',sh):`<text x="${num(x+(cw-1.5)/2)}" y="${num(y+cw*.75)}" font-size="${num(cw*.75)}" text-anchor="middle" fill="#111">${d}</text>`})});
      t+=`<text x="${o+6}" y="${num(o+cw*1.25+cw*.75)}" font-size="${num(cw*.7)}" text-anchor="middle" fill="#111">${sub?'−':'+'}</text><line x1="${o}" y1="${num(o+2*cw*1.25+1)}" x2="${num(o+18+W*cw)}" y2="${num(o+2*cw*1.25+1)}" stroke="#111" stroke-width="1.2"/>`;
      return SVGW(`0 0 ${num(o*2+18+W*cw)} ${num(o*2+3*cw*1.25+4)}`,t)};
    return{q:`<div class="fig" style="max-width:48mm">${draw(false)}</div>`,a:`<div class="fig" style="max-width:48mm">${draw(true)}</div>`,figAns:true,
      steps:[`一の位から じゅんに、${sub?'くり下がり':'くり上がり'}に 気をつけて 考える`,'あてはまる 数字が 1つに しぼれる 位から 先に うめる']};
  }
  return genMushikui();
}
function genSymbols(){
  const lo=LV<=2?1:2,hi=LV<=2?9:LV<=4?15:30,x=ri(lo,hi),y=ri(lo,hi),z=ri(lo,hi);
  if(LV<=2)return{q:`● + ● = ${2*x}<br>● + ▲ = ${x+y}<br><b>▲ は いくつ？</b>`,a:`答え ▲ = ${y}`,steps:[`● + ● = ${2*x} だから、● = ${2*x} ÷ 2 = ${x}`,`${x} + ▲ = ${x+y} だから、▲ = ${x+y} − ${x} = ${y}`]};
  if(LV<=4)return{q:`● + ● + ● = ${3*x}<br>● + ▲ = ${x+y}<br>▲ + ■ = ${y+z}<br><b>■ は いくつ？</b>`,a:`答え ■ = ${z}`,steps:[`● = ${3*x} ÷ 3 = ${x}`,`▲ = ${x+y} − ${x} = ${y}`,`■ = ${y+z} − ${y} = ${z}`]};
  const s=x+y+z;return{q:`● + ▲ = ${x+y}<br>▲ + ■ = ${y+z}<br>● + ■ = ${x+z}<br><b>●、▲、■ は それぞれ いくつ？</b>`,a:`答え ● = ${x}、▲ = ${y}、■ = ${z}`,steps:[`3つの式を ぜんぶ たすと、● + ▲ + ■ の 2つ分 = ${2*s}`,`● + ▲ + ■ = ${2*s} ÷ 2 = ${s}`,`● = ${s} − ${y+z} = ${x}、▲ = ${s} − ${x+z} = ${y}、■ = ${s} − ${x+y} = ${z}`]};
}
function evalOps(ns,os){const v=[ns[0]],ad=[];for(let i=0;i<os.length;i++){const o=os[i],b=ns[i+1];if(o==='×')v.push(v.pop()*b);else if(o==='÷'){const a=v.pop();if(a%b)return null;v.push(a/b)}else{v.push(b);ad.push(o)}}
  let r=v[0];for(let j=0;j<ad.length;j++){r=ad[j]==='+'?r+v[j+1]:r-v[j+1];if(r<0)return null}return r}
function genOps(){
  const k=LV<=2?3:4,opsSet=LV<=2?['+','−']:LV<=4?['+','−','×']:['+','−','×','÷'];
  for(let t=0;t<500;t++){const ns=Array.from({length:k},()=>ri(1,9)),os=Array.from({length:k-1},()=>pick(opsSet)),r=evalOps(ns,os);if(r==null||r>99)continue;
    let cnt=0;const all=(i,cur)=>{if(i===k-1){if(evalOps(ns,cur)===r)cnt++;return}for(const o of opsSet)all(i+1,[...cur,o])};all(0,[]);
    const blank=`<span class="blank" style="min-width:8mm;border-radius:50%;height:8mm"></span>`;
    const q=ns.map((n,i)=>i?`${blank}${n}`:n).join('')+` = ${r}`;
    const a=ns.map((n,i)=>i?`<span class="ans">&nbsp;${os[i-1]}&nbsp;</span>${n}`:n).join('')+` = ${r}`;
    return{q:`<div class="exq" style="font-size:14pt">${q}</div><div class="figcap">つかう記号：${opsSet.join('　')}</div>`,a:`<div class="exq" style="font-size:14pt">${a}</div>${cnt>1?'<div class="figcap">（答えの 一例です。ほかの 答えも あります）</div>':''}`,figAns:true,
      steps:[opsSet.includes('×')?'× や ÷ は、+ や − より 先に 計算する':'左から じゅんに 計算する','答えより 大きく なりすぎたら − を、小さすぎたら + や × を ためす']}}
}
function genSequence(){
  const t=LV<=2?pick(['add','sub','add']):LV<=4?pick(['add','mul','inc','alt']):pick(['mul','inc','sq','fib','alt']);let s,rule;
  if(t==='add'){const a=ri(1,20),d=pick([2,3,4,5,10]);s=Array.from({length:6},(_,i)=>a+d*i);rule=`${d} ずつ ふえている`}
  else if(t==='sub'){const d=pick([2,3,5,10]),a=d*6+ri(0,20);s=Array.from({length:6},(_,i)=>a-d*i);rule=`${d} ずつ へっている`}
  else if(t==='mul'){const a=ri(1,5),r=pick([2,3]);s=Array.from({length:6},(_,i)=>a*r**i);rule=`${r} 倍ずつ ふえている`}
  else if(t==='inc'){const a=ri(1,10),d0=ri(1,3);s=[a];for(let i=0;i<5;i++)s.push(s[i]+d0+i);rule=`ふえ方が ${d0}, ${d0+1}, ${d0+2} … と 1 ずつ 大きく なっている`}
  else if(t==='sq'){const a=ri(1,4);s=Array.from({length:6},(_,i)=>(a+i)**2);rule=`${a}×${a}, ${a+1}×${a+1}, ${a+2}×${a+2} … と 同じ数を 2回 かけた数`}
  else if(t==='fib'){s=[ri(1,4),ri(1,5)];for(let i=2;i<6;i++)s.push(s[i-1]+s[i-2]);rule='前の 2つの 数を たした数'}
  else{const a=ri(1,9),b=ri(20,40),d=pick([2,3,5]);s=Array.from({length:6},(_,i)=>i%2?b-d*((i-1)/2):a+d*(i/2));rule=`1つおきに 見ると、${d} ずつ ふえる 列と ${d} ずつ へる 列が 交ごうに 並んでいる`}
  const hide=LV<=2?5:chance(.5)?5:ri(2,4);
  const box=`<span class="blank" style="min-width:12mm"></span>`;
  const q=s.map((v,i)=>i===hide?box:v).join('<span>、</span>');
  const a=s.map((v,i)=>i===hide?`<span class="ans">${v}</span>`:v).join('<span>、</span>');
  return{q:`<div class="exq" style="font-size:13pt;gap:2mm">${q}</div>`,a:`<div class="exq" style="font-size:13pt;gap:2mm">${a}</div>`,figAns:true,steps:[`きまり：${rule}`,'となりどうしの 差や 何倍かを 調べると 見つかりやすい']};
}
function genSquares(){
  const [n,m]=LV<=2?pick([[2,2],[2,3],[1,4]]):LV<=4?pick([[3,3],[2,4],[3,4]]):pick([[4,4],[3,5],[4,5]]);
  const rect=LV>=5&&chance(.4);
  const s=80/Math.max(n,m),ox=50-m*s/2,oy=6;let g='';for(let i=0;i<=n;i++)g+=`<line x1="${num(ox)}" y1="${num(oy+i*s)}" x2="${num(ox+m*s)}" y2="${num(oy+i*s)}" stroke="#111" stroke-width="1.1"/>`;for(let j=0;j<=m;j++)g+=`<line x1="${num(ox+j*s)}" y1="${oy}" x2="${num(ox+j*s)}" y2="${num(oy+n*s)}" stroke="#111" stroke-width="1.1"/>`;
  const svg=SVGW(`0 0 100 ${num(n*s+12)}`,g);
  if(rect){const c=(k)=>k*(k+1)/2,tot=c(n)*c(m);return{q:`<div class="fig">${svg}</div><div class="figcap">この図の中に 長方形（正方形も ふくむ）は いくつ ありますか。</div>`,a:`<b>${tot}こ</b>`,steps:[`横の 線 ${n+1}本から 2本、たての 線 ${m+1}本から 2本 えらぶと 長方形が 1つ 決まる`,`${c(n)} × ${c(m)} = ${tot}`]}}
  const parts=[];let tot=0;for(let k=1;k<=Math.min(n,m);k++){const c=(n-k+1)*(m-k+1);parts.push(`${k}×${k} の正方形 ${c}こ`);tot+=c}
  return{q:`<div class="fig">${svg}</div><div class="figcap">この図の中に 正方形は ぜんぶで いくつ ありますか。（大きさの ちがう 正方形も 数えます）</div>`,a:`<b>${tot}こ</b>`,steps:[...parts,`あわせて ${tot}こ`]};
}
const PUZZLE_CHAPTER={ch:'脳トレ・パズル',puzzle:true,items:[
  {id:'pz-maze',title:'めいろ',kind:'fig',n:4,cols:2,lead:'スタートから ゴールまで、線を ひいて 進みましょう。',explain:{points:[{h:'ルール',b:'かべ（黒い線）を こえずに、スタートから ゴールまで 進みます。'},{h:'コツ',b:'行き止まりに 入ったら、さいごの 分かれ道まで もどって ほかの 道を ためします。'}],tip:'<b>ためしてみよう</b>　ゴールから 逆に たどると、早く 見つかることも あります。'},gen:genMaze},
  {id:'pz-sudoku',title:'ミニ数独',kind:'fig',n:4,cols:2,lead:'あいている ますに 数字を 入れましょう。',explain:{points:[{h:'ルール',b:'たての列、よこの列、太い線で かこまれた わくの 中に、同じ 数字が 1回ずつ 入るように します（4×4 は 1〜4、6×6 は 1〜6）。'},{h:'コツ',b:'数字が たくさん 入っている 列から 考えます。あと1つしか 入らない ますが ねらいめです。'}],tip:'<b>ちゅうい</b>　あてずっぽうに 入れず、「ここには これしか 入らない」と 決まる ますから うめましょう。'},gen:genSudoku},
  {id:'pz-magic',title:'魔方陣',kind:'fig',n:6,cols:3,lead:'あいている ますに 数を 入れましょう。',explain:{points:[{h:'ルール',b:'たて・よこ・ななめ、どの 3つの 数を たしても 同じ 数に なるように します。'},{h:'コツ',b:'数が 2つ わかっている 列を さがします。残りの1つは「合計 − 2つの和」で わかります。'}],tip:'<b>はっけん</b>　まん中の 数は、合計の 3分の1 に なっています。'},gen:genMagic},
  {id:'pz-pyramid',title:'数のピラミッド',kind:'fig',n:4,cols:2,lead:'あいている ますに 数を 入れましょう。',explain:{points:[{h:'ルール',b:'上の ますの 数は、すぐ下に ある 2つの ますの 数の 和です。'},{h:'コツ',b:'下が わからないときは、ひき算（上の数 − となりの数）で もとめます。'}],tip:'<b>ためしてみよう</b>　下の段から 1段ずつ うめていきましょう。'},gen:genPyramid},
  {id:'pz-mushikui',title:'虫食い算',kind:'fig',n:6,cols:3,lead:'□に あてはまる 数字を 入れて、ひっ算を 完成させましょう。',explain:{points:[{h:'ルール',b:'□の 中には 0〜9 の 数字が 1つずつ 入ります。いちばん 上の 位には 0 は 入りません。'},{h:'コツ',b:'一の位から じゅんに、くり上がり・くり下がりが あるかどうかを 考えます。'}],tip:'<b>たしかめ</b>　うめたら、もう一度 ひっ算を して 答えが 合うか たしかめましょう。'},gen:genMushikui},
  {id:'pz-symbols',title:'記号の計算',kind:'word',n:4,cols:2,lead:'同じ 記号には 同じ 数が 入ります。',explain:{points:[{h:'ルール',b:'●、▲、■ は それぞれ ある 数を 表します。式から その数を 見つけます。'},{h:'コツ',b:'記号が 1しゅるいだけの 式から 考えると、1つ目の 数が わかります。'}],tip:'<b>ためしてみよう</b>　わかった 数を ほかの 式に 入れると、つぎの 記号の 数が わかります。'},gen:genSymbols},
  {id:'pz-ops',title:'式づくりパズル',kind:'fig',n:8,cols:2,lead:'○に 記号を 入れて、正しい 式に しましょう。',explain:{points:[{h:'ルール',b:'○に +、−（学年によって ×、÷ も）を 入れて、= の 右の 数に なるように します。'},{h:'コツ',b:'答えが 大きいときは × や + を、小さいときは − や ÷ を ためします。'}],tip:'<b>ちゅうい</b>　× と ÷ は、+ と − より 先に 計算します。'},gen:genOps},
  {id:'pz-seq',title:'数のならび',kind:'fig',n:6,cols:1,lead:'きまりを 見つけて、□に あてはまる 数を 書きましょう。',explain:{points:[{h:'さがし方',b:'となりどうしの 数の 差（いくつ ふえたか）を 調べます。差が 同じでなければ、何倍か、1つおきかを 調べます。'},{h:'よくある きまり',b:'同じ数ずつ ふえる／何倍かずつ ふえる／ふえ方が ふえる／前の 2つを たす'}],tip:'<b>ためしてみよう</b>　数と 数の 間に、差を 小さく 書きこんで みましょう。'},gen:genSequence},
  {id:'pz-squares',title:'正方形はいくつ？',kind:'fig',n:6,cols:3,lead:'図を よく 見て 数えましょう。',explain:{points:[{h:'大きさ べつに 数える',b:'1ます分、2ます分、3ます分…と 大きさごとに 数えると、落ちが ありません。'},{h:'きまりを 見つける',b:'3×3 の 方眼では、1ます 9こ、2ます 4こ、3ます 1こ。9, 4, 1 は 同じ数を 2回 かけた数です。'}],tip:'<b>ちゅうい</b>　大きな 正方形を 数えわすれないように しましょう。'},gen:genSquares},
]};
