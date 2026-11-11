"use strict";
/* ============ 乱数・数のユーティリティ ============ */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let rng=Math.random;
const ri=(a,b)=>a+Math.floor(rng()*(b-a+1));
const pick=a=>a[Math.floor(rng()*a.length)];
const chance=p=>rng()<p;
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};
const lcm=(a,b)=>a/gcd(a,b)*b;
const num=x=>String(+(+x).toFixed(6));
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

class Fr{
  constructor(n,d=1){if(d<0){n=-n;d=-d}const g=gcd(n,d)||1;this.n=n/g;this.d=d/g}
  mul(o){return new Fr(this.n*o.n,this.d*o.d)}
  div(o){return new Fr(this.n*o.d,this.d*o.n)}
  add(o){return new Fr(this.n*o.d+o.n*this.d,this.d*o.d)}
  sub(o){return new Fr(this.n*o.d-o.n*this.d,this.d*o.d)}
  inv(){return new Fr(this.d,this.n)}
}
const F=(n,d)=>`<span class="frac"><span class="n">${n}</span><span class="d">${d}</span></span>`;
const M=(w,n,d)=>`<span class="mixed">${w}${F(n,d)}</span>`;
/** 答えの表示：整数ならそのまま、仮分数なら帯分数も添える */
function A(f){
  if(f.d===1)return String(f.n);
  if(f.n>f.d)return `${F(f.n,f.d)}<span class="alt">（${M(Math.floor(f.n/f.d),f.n%f.d,f.d)}）</span>`;
  return F(f.n,f.d);
}
const FH=f=>f.d===1?String(f.n):F(f.n,f.d);
const X='<i class="var">x</i>',Y='<i class="var">y</i>';
const why=s=>`<span>${s}</span>`;
function proper(dmin=2,dmax=9){for(;;){const d=ri(dmin,dmax),n=ri(1,d-1);if(gcd(n,d)===1)return new Fr(n,d)}}
function improper(dmax=7){for(;;){const d=ri(2,dmax),n=ri(d+1,2*d-1);if(gcd(n,d)===1)return new Fr(n,d)}}
/* 式の「項」：f=値、h=表示、k=種類（frac / mixed / dec / int） */
const tFrac=f=>({f,h:FH(f),k:f.d===1?'int':'frac'});
const tInt=n=>({f:new Fr(n),h:String(n),k:'int'});
function tMixed(){const w=ri(1,3),p=proper(2,7);return{f:new Fr(w*p.d+p.n,p.d),h:M(w,p.n,p.d),k:'mixed'}}
function tDec(){for(;;){const i=ri(1,24);if(i%10)return{f:new Fr(i,10),h:num(i/10),k:'dec',i}}}

/** 約分のステップ */
function reduceStep(rn,rd){const g=gcd(rn,rd);if(g>1)return[`分子と分母を ${g} でわって約分する → ${A(new Fr(rn,rd))}`];
  if(rd!==1&&rn>rd)return[`帯分数になおすと ${M(Math.floor(rn/rd),rn%rd,rd)}`];return[]}
/** 分数のかけ算を1本の式にまとめて計算するステップ */
function mulSteps(fs){
  const ns=fs.map(f=>f.n),ds=fs.map(f=>f.d);
  const rn=ns.reduce((a,b)=>a*b,1),rd=ds.reduce((a,b)=>a*b,1);
  const sn=ns.filter(x=>x!==1),sd=ds.filter(x=>x!==1);
  const raw=rd===1?String(rn):F(rn,rd);
  const out=[];
  if(sn.length>1||sd.length>1){const top=sn.length?sn.join(' × '):'1';out.push(`分子どうし、分母どうしをかける：${sd.length?F(top,sd.join(' × ')):top} = ${raw}`)}
  else out.push(`分子どうし、分母どうしをかける → ${raw}`);
  return out.concat(reduceStep(rn,rd));
}
/** 項と演算子の列 → 解き方（仮分数・分数になおす → 逆数 → かけ算） */
function chainSteps(terms,ops){
  const st=[];
  terms.forEach(t=>{
    if(t.k==='mixed')st.push(`帯分数を仮分数になおす：${t.h} = ${F(t.f.n,t.f.d)}`);
    if(t.k==='dec')st.push(`小数を分数になおす：${t.h} = ${F(t.i,10)}${t.f.d!==10?` = ${FH(t.f)}`:''}`);
  });
  const fs=terms.map((t,i)=>i>0&&ops[i-1]==='÷'?t.f.inv():t.f);
  if(ops.includes('÷')){
    const expr=terms.map((t,i)=>(i?' × ':'')+FH(fs[i])).join('');
    st.push(`わる数を逆数にして、かけ算にする：${expr}`);
  }
  return st.concat(mulSteps(fs));
}
const exprOf=(terms,ops)=>terms.map((t,i)=>(i?`<span>${ops[i-1]}</span>`:'')+t.h).join('');
function calcProblem(terms,ops){
  const fs=terms.map((t,i)=>i>0&&ops[i-1]==='÷'?t.f.inv():t.f);
  const r=fs.reduce((a,b)=>a.mul(b),new Fr(1));
  return{q:exprOf(terms,ops),a:A(r),steps:chainSteps(terms,ops)};
}

/* ============ 単元・解説・問題ジェネレーター ============
   kind: calc（式と答え）/ word（文章題）/ fig（図）/ table（表）/ data（資料）
   gen() → { q, a, steps[], tail?, parts?, figAns? }
   explain: { points:[{h,b,ex?,wide?}], tip }  … 解説ページの「ポイント」と「ここに注意」 */
const LEAD_FRAC='次の計算をしましょう。答えが約分できるときは約分しましょう。';
const LEAD_WORD='次の問題に答えましょう。';
const S=(...a)=>a.join('<span>=</span>');

const UNITS=[
 {ch:'5年の復習',items:[
  {id:'r-fadd',title:'分数のたし算・ひき算',kind:'calc',n:12,cols:2,lead:LEAD_FRAC,
   explain:{points:[
     {h:'分母がちがうときは通分する',b:'分母を同じ数（分母の最小公倍数）にそろえてから、分子どうしをたしたりひいたりします。',ex:S(`${F(1,2)}<span>+</span>${F(1,3)}`,`${F(3,6)}<span>+</span>${F(2,6)}`,F(5,6))},
     {h:'答えは約分する',b:'計算したあと、分子と分母を同じ数でわれるときは約分して、いちばんかんたんな分数にします。',ex:S(F(4,6),F(2,3))}],
    tip:'<b>ここに注意</b>　分母どうし・分子どうしをそのままたしてはいけません。たとえば 1/2 + 1/3 を 2/5 とするのはまちがいです。'},
   gen(){
    for(;;){const a=proper(2,9),b=proper(2,9);if(a.d===b.d)continue;
      let [x,y]=[a,b],op='+';
      if(chance(.5)){op='−';if(a.n*b.d<b.n*a.d)[x,y]=[b,a];if(x.n*y.d===y.n*x.d)continue}
      const L=lcm(x.d,y.d),xn=x.n*L/x.d,yn=y.n*L/y.d,rn=op==='+'?xn+yn:xn-yn;
      return{q:`${FH(x)}<span>${op}</span>${FH(y)}`,a:A(new Fr(rn,L)),steps:[
        `分母を ${L} にそろえる（通分）：${FH(x)} = ${F(xn,L)}、${FH(y)} = ${F(yn,L)}`,
        `分子どうしを${op==='+'?'たす':'ひく'}：${F(xn,L)} ${op} ${F(yn,L)} = ${F(rn,L)}`,...reduceStep(rn,L)]}}}},
  {id:'r-decmul',title:'小数のかけ算',kind:'calc',n:12,cols:2,lead:'次の計算をしましょう。',
   explain:{points:[
     {h:'小数点がないものとして計算',b:'まず、小数点をとった整数どうしでかけ算をします。',ex:'2.3 × 1.4 → 23 × 14 = 322'},
     {h:'積の小数点をうつ',b:'かけられる数とかける数の、小数点より右のけた数をたします。積の右からその数だけ数えて小数点をうちます。',ex:'1けた + 1けた = 2けた → 3.22'}],
    tip:'<b>ここに注意</b>　小数点をうったあと、いちばん右にある 0 は消します。（0.5 × 0.4 = 0.20 → 0.2）'},
   gen(){
    const p1=pick([1,1,2]),p2=pick([1,1,2]);
    const a=p1===1?ri(11,99):ri(101,499),b=p2===1?ri(2,49):ri(11,99);
    if(a%10===0||b%10===0)return this.gen();
    const prod=a*b,ans=num(prod/10**(p1+p2)),zero=String(prod).endsWith('0');
    return{q:`${num(a/10**p1)}<span>×</span>${num(b/10**p2)}`,a:ans,steps:[
      `小数点をとって整数で計算：${a} × ${b} = ${prod}`,
      `小数点より右のけた数は ${p1} + ${p2} = ${p1+p2} けた → 右から ${p1+p2} けたのところに小数点 → ${ans}${zero?'（右はしの 0 は消す）':''}`]}}},
  {id:'r-decdiv',title:'小数のわり算',kind:'calc',n:12,cols:2,lead:'次の計算をしましょう。わり切れるまで計算しましょう。',
   explain:{points:[
     {h:'わる数を整数にする',b:'わる数の小数点を右にうつして整数にします。わられる数の小数点も、同じけた数だけ右にうつします。',ex:'7.56 ÷ 1.8 → 75.6 ÷ 18'},
     {h:'整数でわる計算をする',b:'あとは整数でわるわり算と同じです。商の小数点は、うつしたあとのわられる数の小数点にそろえます。',ex:'75.6 ÷ 18 = 4.2'}],
    tip:'<b>ここに注意</b>　わる数だけ10倍して、わられる数をそのままにすると、答えが10倍ずれてしまいます。'},
   gen(){
    const b=ri(2,39);if(b%10===0)return this.gen();
    const q=pick([ri(2,9),ri(11,49)/10,ri(2,19)]);
    const qi=Math.round(q*10),di=b*qi;
    return{q:`${num(di/100)}<span>÷</span>${num(b/10)}`,a:num(q),steps:[
      `わる数 ${num(b/10)} を10倍して整数 ${b} にする。わられる数も10倍して ${num(di/10)}`,
      `${num(di/10)} ÷ ${b} = ${num(q)}`]}}},
 ]},
 {ch:'対称な図形',items:[
  {id:'sym-line',title:'線対称な図形をかく',kind:'fig',n:4,cols:2,lead:'直線アイを対称の軸として、線対称な図形を完成させましょう。',
   explain:{points:[
     {h:'線対称な図形',b:'1本の直線で折ったとき、両側がぴったり重なる図形です。この直線を<b>対称の軸</b>といいます。'},
     {h:'対応する点の性質',b:'対応する2つの点を結ぶ直線は、対称の軸と垂直に交わります。軸から2つの点までの長さは等しくなります。'}],
    tip:'<b>かき方</b>　① 頂点から軸までのます目を数える　② 軸の反対側に同じます目だけ進んで点をとる　③ とった点を順に結ぶ。軸の上にある点はそのまま使います。'},
   gen:genLineSym},
  {id:'sym-point',title:'点対称な図形をかく',kind:'fig',n:4,cols:2,lead:'点Oを対称の中心として、点対称な図形を完成させましょう。',
   explain:{points:[
     {h:'点対称な図形',b:'ある点のまわりに180°回転させたとき、もとの形にぴったり重なる図形です。この点を<b>対称の中心</b>といいます。'},
     {h:'対応する点の性質',b:'対応する2つの点を結ぶ直線は、対称の中心を通ります。中心から2つの点までの長さは等しくなります。'}],
    tip:'<b>かき方</b>　① 頂点から点Oまで「横に何ます、縦に何ます」かを数える　② 点Oから<b>反対向き</b>に同じだけ進んで点をとる　③ とった点を順に結ぶ。'},
   gen:genPointSym},
 ]},
 {ch:'文字と式',items:[
  {id:'x-find',title:'xにあてはまる数',kind:'calc',n:12,cols:2,lead:`次の式の ${X} にあてはまる数を求めましょう。`,
   explain:{points:[
     {h:'たし算・ひき算の式',b:`${X} + 3 = 10 なら ${X} = 10 − 3。${X} − 3 = 10 なら ${X} = 10 + 3。反対の計算をします。`},
     {h:'かけ算・わり算の式',b:`4 × ${X} = 12 なら ${X} = 12 ÷ 4。${X} ÷ 4 = 3 なら ${X} = 3 × 4。こちらも反対の計算です。`}],
    tip:`<b>たしかめ</b>　求めた数を ${X} のところに入れて、式が正しくなるかを計算してみましょう。`},
   gen(){
    const t=pick(['add','sub','mul','div']);let q,x,st;
    if(t==='add'){x=ri(3,80);const a=ri(2,50),b=x+a;q=`${X}<span>+</span>${a}<span>=</span>${b}`;st=[`たし算の反対はひき算：${X} = ${b} − ${a} = ${x}`,`たしかめ：${x} + ${a} = ${b}`]}
    else if(t==='sub'){x=ri(20,99);const a=ri(2,x-1),b=x-a;q=`${X}<span>−</span>${a}<span>=</span>${b}`;st=[`ひき算の反対はたし算：${X} = ${b} + ${a} = ${x}`,`たしかめ：${x} − ${a} = ${b}`]}
    else if(t==='mul'){const a=ri(2,9);x=ri(2,15);q=`${a}<span>×</span>${X}<span>=</span>${a*x}`;st=[`かけ算の反対はわり算：${X} = ${a*x} ÷ ${a} = ${x}`,`たしかめ：${a} × ${x} = ${a*x}`]}
    else{const a=ri(2,9),b=ri(2,12);x=a*b;q=`${X}<span>÷</span>${a}<span>=</span>${b}`;st=[`わり算の反対はかけ算：${X} = ${b} × ${a} = ${x}`,`たしかめ：${x} ÷ ${a} = ${b}`]}
    return{q,tail:'',a:`${X} = ${x}`,steps:st}}},
  {id:'x-expr',title:'xとyの関係を式に表す',kind:'word',n:4,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'まず、ことばの式をつくる',b:'「1こ分のねだん × こ数 = 代金」のように、ことばで関係を書きます。',ex:'1こ分のねだん × こ数 = 代金'},
     {h:'わからない数を文字にする',b:`ことばの式の、変わる数を ${X} や ${Y} におきかえます。${X} に数を入れると ${Y} の値が求められます。`,ex:`${X} × 3 = ${Y}`}],
    tip:`<b>ここに注意</b>　式は「${X} を使った式 = ${Y}」の形で書きます。${X} と ${Y} を入れかえないようにしましょう。`},
   gen(){
    return pick([
     ()=>{const n=ri(3,8),m=pick([100,120,150,180,200]),k=pick([40,50,60,70,80]);
       return{q:`1本 ${X} 円のえんぴつを ${n} 本と、${m} 円のノートを1さつ買います。代金の合計を ${Y} 円とします。<br>(1) ${X} と ${Y} の関係を式に表しましょう。<br>(2) ${X} が ${k} のときの ${Y} の値を求めましょう。`,parts:['(1)','(2)'],a:`(1) ${X} × ${n} + ${m} = ${Y}　(2) ${k*n+m}`,
        steps:['ことばの式：えんぴつ1本のねだん × 本数 + ノートのねだん = 代金',`(2) ${X} に ${k} を入れる：${k} × ${n} + ${m} = ${k*n+m}`]}},
     ()=>{const k=ri(4,15);return{q:`1辺の長さが ${X} cm の正方形があります。まわりの長さを ${Y} cm とします。<br>(1) ${X} と ${Y} の関係を式に表しましょう。<br>(2) ${X} が ${k} のときの ${Y} の値を求めましょう。`,parts:['(1)','(2)'],a:`(1) ${X} × 4 = ${Y}　(2) ${k*4}`,
        steps:['ことばの式：1辺の長さ × 4 = まわりの長さ',`(2) ${k} × 4 = ${k*4}`]}},
     ()=>{const h=pick([4,6,8,10]),k=ri(3,12);return{q:`底辺が ${X} cm、高さが ${h} cm の三角形の面積を ${Y} cm² とします。<br>(1) ${X} と ${Y} の関係を式に表しましょう。<br>(2) ${X} が ${k} のときの ${Y} の値を求めましょう。`,parts:['(1)','(2)'],a:`(1) ${X} × ${h} ÷ 2 = ${Y}　(2) ${k*h/2}`,
        steps:['ことばの式：底辺 × 高さ ÷ 2 = 三角形の面積',`(2) ${k} × ${h} ÷ 2 = ${k*h/2}`]}},
     ()=>{const n=ri(4,9),b=pick([150,200,250,300]),k=pick([20,30,40,50,60]);return{q:`1こ ${X} g のおもりを ${n} こ、重さ ${b} g の箱に入れたときの全体の重さを ${Y} g とします。<br>(1) ${X} と ${Y} の関係を式に表しましょう。<br>(2) ${X} が ${k} のときの ${Y} の値を求めましょう。`,parts:['(1)','(2)'],a:`(1) ${X} × ${n} + ${b} = ${Y}　(2) ${k*n+b}`,
        steps:['ことばの式：おもり1こ分の重さ × こ数 + 箱の重さ = 全体の重さ',`(2) ${k} × ${n} + ${b} = ${k*n+b}`]}},
     ()=>{const t=pick([600,720,840,960,1200]),k=pick([4,5,6,8]);return{q:`${t} mL のお茶を ${X} 人で同じ量ずつ分けたときの1人分の量を ${Y} mL とします。<br>(1) ${X} と ${Y} の関係を式に表しましょう。<br>(2) ${X} が ${k} のときの ${Y} の値を求めましょう。`,parts:['(1)','(2)'],a:`(1) ${t} ÷ ${X} = ${Y}　(2) ${t/k}`,
        steps:['ことばの式：全部の量 ÷ 人数 = 1人分の量',`(2) ${t} ÷ ${k} = ${t/k}`]}},
    ])()}},
 ]},
 {ch:'分数のかけ算・わり算',items:[
  {id:'f-int',title:'分数×整数、分数÷整数',kind:'calc',n:12,cols:2,lead:LEAD_FRAC,
   explain:{points:[
     {h:'分数 × 整数',b:'分母はそのままにして、分子に整数をかけます。',ex:S(`${F(2,7)}<span>×</span>3`,F('2 × 3',7),F(6,7))},
     {h:'分数 ÷ 整数',b:'分子はそのままにして、分母に整数をかけます。',ex:S(`${F(3,5)}<span>÷</span>4`,F(3,'5 × 4'),F(3,20))}],
    tip:'<b>ここに注意</b>　÷ のとき分子をわらないこと。答えが約分できるときは、かならず約分します。'},
   gen(){
    const a=proper(2,9),k=ri(2,9);
    if(chance(.5)){const rn=a.n*k;return{q:`${FH(a)}<span>×</span>${k}`,a:A(new Fr(rn,a.d)),steps:[`分母はそのまま、分子に ${k} をかける：${F(`${a.n} × ${k}`,a.d)} = ${F(rn,a.d)}`,...reduceStep(rn,a.d)]}}
    const rd=a.d*k;return{q:`${FH(a)}<span>÷</span>${k}`,a:A(new Fr(a.n,rd)),steps:[`分子はそのまま、分母に ${k} をかける：${F(a.n,`${a.d} × ${k}`)} = ${F(a.n,rd)}`,...reduceStep(a.n,rd)]}}},
  {id:'f-mul',title:'分数×分数',kind:'calc',n:12,cols:2,lead:LEAD_FRAC,
   explain:{points:[
     {h:'分子どうし、分母どうしをかける',b:'分数に分数をかけるときは、分子どうし、分母どうしをかけます。',ex:S(`${F(2,3)}<span>×</span>${F(4,5)}`,F('2 × 4','3 × 5'),F(8,15))},
     {h:'約分はとちゅうでもできる',b:'かける前に、上と下で同じ数でわれるものを約分しておくと、計算がかんたんになります。',ex:S(`${F(3,4)}<span>×</span>${F(2,9)}`,F('3 × 2','4 × 9'),F(1,6))}],
    tip:'<b>ここに注意</b>　分母どうしをかけわすれて、分母をそのままにしないようにしましょう。'},
   gen(){const a=chance(.2)?improper():proper(),b=chance(.2)?improper():proper();return calcProblem([tFrac(a),tFrac(b)],['×'])}},
  {id:'f-div',title:'分数÷分数',kind:'calc',n:12,cols:2,lead:LEAD_FRAC,
   explain:{points:[
     {h:'わる数の逆数をかける',b:'分数でわるときは、わる数の分子と分母を入れかえた数（逆数）をかけます。',ex:S(`${F(2,3)}<span>÷</span>${F(4,5)}`,`${F(2,3)}<span>×</span>${F(5,4)}`,F('2 × 5','3 × 4'),F(5,6))},
     {h:'あとはかけ算と同じ',b:'かけ算になおしたら、分子どうし、分母どうしをかけて、約分します。'}],
    tip:'<b>ここに注意</b>　ひっくり返すのは「わる数」（÷ のうしろの数）だけです。わられる数はそのままです。'},
   gen(){const a=chance(.2)?improper():proper(),b=chance(.2)?improper():proper();return calcProblem([tFrac(a),tFrac(b)],['÷'])}},
  {id:'f-mixed',title:'帯分数のかけ算・わり算',kind:'calc',n:12,cols:2,lead:LEAD_FRAC,
   explain:{points:[
     {h:'帯分数は仮分数になおす',b:'整数の部分 × 分母 + 分子 を新しい分子にします。',ex:S(M(2,1,3),F('2 × 3 + 1',3),F(7,3))},
     {h:'あとはいつもの計算',b:'仮分数になおしたら、かけ算はそのまま、わり算は逆数をかけて計算します。答えが仮分数のときは帯分数にもなおせます。'}],
    tip:'<b>ここに注意</b>　帯分数のまま、整数どうし・分数どうしをかけてはいけません。'},
   gen(){
    const m=tMixed(),o=chance(.5)?tMixed():tFrac(proper());
    const [l,r]=chance(.7)?[m,o]:[o,m];
    return calcProblem([l,r],[chance(.5)?'×':'÷'])}},
  {id:'f-three',title:'整数・小数・分数のまじった計算',kind:'calc',n:10,cols:2,lead:LEAD_FRAC,
   explain:{points:[
     {h:'すべて分数になおす',b:'小数は分母が10の分数に、整数は分母が1の分数と考えます。',ex:`0.3 = ${F(3,10)}、5 = ${F(5,1)}`},
     {h:'1つの式にまとめる',b:'わり算は逆数のかけ算になおし、かけ算だけの式にします。最後に分子どうし、分母どうしをかけます。'}],
    tip:'<b>ここに注意</b>　÷ があるときは、÷ のすぐうしろの数だけを逆数にします。'},
   gen(){
    const t=ri(0,4),a=tFrac(proper()),b=tFrac(proper()),c=tFrac(proper());
    if(t===0)return calcProblem([a,b,c],['×','÷']);
    if(t===1)return calcProblem([a,b,c],['÷','×']);
    const d=tDec();
    if(t===2)return calcProblem([d,a],['×']);
    if(t===3)return calcProblem([a,d],['÷']);
    return calcProblem([tInt(ri(2,9)),a,d],['×','÷'])}},
  {id:'f-recip',title:'逆数',kind:'calc',n:12,cols:3,lead:'次の数の逆数を求めましょう。',
   explain:{points:[
     {h:'逆数とは',b:'2つの数をかけた答えが 1 になるとき、一方の数をもう一方の数の逆数といいます。',ex:`${F(3,4)} × ${F(4,3)} = 1`},
     {h:'分子と分母を入れかえる',b:`分数の逆数は、分子と分母を入れかえた数です。整数は「分母が1の分数」、小数は分数になおしてから入れかえます。`,ex:`5 = ${F(5,1)} → ${F(1,5)}`}],
    tip:'<b>ここに注意</b>　帯分数はまず仮分数になおしてから入れかえます。'},
   gen(){
    const t=ri(0,3);let v,h,st;
    if(t===0){v=chance(.3)?improper():proper();h=FH(v);st=[`分子と分母を入れかえる：${h} → ${FH(v.inv())}`]}
    else if(t===1){const k=ri(2,15);v=new Fr(k);h=String(k);st=[`${k} = ${F(k,1)} と考えて、分子と分母を入れかえる → ${F(1,k)}`]}
    else if(t===2){const d=tDec();v=d.f;h=d.h;st=[`小数を分数になおす：${h} = ${F(d.i,10)}${v.d!==10?` = ${FH(v)}`:''}`,`分子と分母を入れかえる → ${FH(v.inv())}`]}
    else{const m=tMixed();v=m.f;h=m.h;st=[`仮分数になおす：${h} = ${F(v.n,v.d)}`,`分子と分母を入れかえる → ${FH(v.inv())}`]}
    return{q:h,tail:'<span>→</span>',a:A(v.inv()),steps:st}}},
  {id:'f-word',title:'割合を表す分数（文章題）',kind:'word',n:4,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'比べる量を求める',b:'もとにする量の □ 倍（□は分数）を求めるときは、かけ算をします。',ex:'もとにする量 × 割合 = 比べる量'},
     {h:'もとにする量を求める',b:'「□ にあたる量」がわかっていて全体を求めるときは、わり算をします。',ex:'比べる量 ÷ 割合 = もとにする量'}],
    tip:'<b>見分け方</b>　「〇〇の 3/4」の「〇〇」がもとにする量です。「残り」を求めるときは、まず 1 − 割合 で残りの割合を出します。'},
   gen(){
    const p=proper(2,9);
    return pick([
     ()=>{const L=p.d*ri(2,9),r=L*p.n/p.d;return{q:`${L} m のロープの ${FH(p)} の長さは何 m ですか。`,a:`式 ${L} × ${FH(p)} = ${r}　答え ${r} m`,steps:[`もとにする量は ${L} m、割合は ${FH(p)}`,'比べる量 = もとにする量 × 割合 なので、かけ算']}},
     ()=>{const N=p.d*ri(8,30),r=N*p.n/p.d;return{q:`ある小学校の6年生は ${N} 人で、そのうち ${FH(p)} が自転車で図書館に来たことがあります。それは何人ですか。`,a:`式 ${N} × ${FH(p)} = ${r}　答え ${r} 人`,steps:[`もとにする量は6年生全体の ${N} 人、割合は ${FH(p)}`,'比べる量 = もとにする量 × 割合']}},
     ()=>{const w=p.n*ri(2,9),W=w*p.d/p.n;return{q:`ある米ぶくろの重さの ${FH(p)} が ${w} kg です。米ぶくろ全体の重さは何 kg ですか。`,a:`式 ${w} ÷ ${FH(p)} = ${W}　答え ${W} kg`,steps:[`全体（もとにする量）を □ kg とすると、□ × ${FH(p)} = ${w}`,`□ を求めるので、わり算：${w} ÷ ${FH(p)}`]}},
     ()=>{const total=p.d*ri(3,12)*10,used=total*p.n/p.d;const rest=new Fr(p.d-p.n,p.d);return{q:`水そうに水が ${total} L 入っています。そのうち ${FH(p)} を使いました。残りは何 L ですか。`,a:`式 ${total} × (1 − ${FH(p)}) = ${total-used}　答え ${total-used} L`,steps:[`残りの割合は 1 − ${FH(p)} = ${FH(rest)}`,`残りの量 = ${total} × ${FH(rest)}`]}},
     ()=>{const pg=p.d*ri(4,20),r=pg*p.n/p.d;return{q:`${pg} ページの本のうち、${FH(p)} を読みました。何ページ読みましたか。`,a:`式 ${pg} × ${FH(p)} = ${r}　答え ${r} ページ`,steps:[`もとにする量は本全体の ${pg} ページ、割合は ${FH(p)}`,'比べる量 = もとにする量 × 割合']}},
    ])()}},
 ]},
 {ch:'比',items:[
  {id:'ratio-val',title:'比の値',kind:'calc',n:12,cols:3,lead:'次の比の値を求めましょう。',
   explain:{points:[
     {h:'比の値の求め方',b:'a : b の比の値は a ÷ b です。分数で表すと、前の数が分子、うしろの数が分母になります。',ex:`3 : 4 → 3 ÷ 4 = ${F(3,4)}`},
     {h:'等しい比',b:'比の値が同じになる比は「等しい比」です。',ex:`2 : 3 と 4 : 6 は、どちらも ${F(2,3)}`}],
    tip:'<b>ここに注意</b>　比の値は約分して答えます。小数の比は、両方を10倍して整数にしてから考えるとかんたんです。'},
   gen(){
    if(chance(.25)){const a=tDec(),b=tDec(),r=a.f.div(b.f);const g=gcd(a.i,b.i);return{q:`${a.h} : ${b.h}`,tail:'<span>→</span>',a:A(r),steps:[`両方を10倍して整数の比にする：${a.i} : ${b.i}`,`${a.i} ÷ ${b.i} = ${F(a.i,b.i)}`,...reduceStep(a.i,b.i)]}}
    for(;;){const a=ri(1,24),b=ri(2,24);if(a!==b)return{q:`${a} : ${b}`,tail:'<span>→</span>',a:A(new Fr(a,b)),steps:[`前の数 ÷ うしろの数：${a} ÷ ${b} = ${F(a,b)}`,...reduceStep(a,b)]}}}},
  {id:'ratio-simp',title:'比を簡単にする',kind:'calc',n:12,cols:2,lead:'次の比を簡単にしましょう。',
   explain:{points:[
     {h:'同じ数でわる・かける',b:'比の両方の数に同じ数をかけても、同じ数でわっても、比は等しくなります。',ex:'12 : 18 → 両方を 6 でわって 2 : 3'},
     {h:'小数・分数の比',b:'小数は10倍・100倍して整数に、分数は分母の最小公倍数をかけて整数にしてから簡単にします。',ex:`0.6 : 0.9 → 6 : 9 → 2 : 3`}],
    tip:'<b>ここに注意</b>　最大公約数でわると1回で終わります。わったあとも、まだ同じ数でわれないか確かめましょう。'},
   gen(){
    let p,q;do{p=ri(1,9);q=ri(1,9)}while(p===q||gcd(p,q)!==1);
    const t=ri(0,2);
    if(t===0){const g=ri(2,12);return{q:`${g*p} : ${g*q}`,a:`${p} : ${q}`,steps:[`${g*p} と ${g*q} の最大公約数は ${g}`,`両方を ${g} でわる → ${p} : ${q}`]}}
    if(t===1){const k=ri(1,9);const st=[`両方を10倍して整数にする：${p*k} : ${q*k}`];if(k>1)st.push(`両方を ${k} でわる → ${p} : ${q}`);return{q:`${num(p*k/10)} : ${num(q*k/10)}`,a:`${p} : ${q}`,steps:st}}
    const a=proper(2,9),b=proper(2,9);const r=a.div(b);const L=lcm(a.d,b.d),x=a.n*L/a.d,y=b.n*L/b.d,g=gcd(x,y);
    const st=[`分母の最小公倍数 ${L} を両方にかける：${x} : ${y}`];if(g>1)st.push(`両方を ${g} でわる → ${r.n} : ${r.d}`);
    return{q:`${FH(a)} : ${FH(b)}`,a:`${r.n} : ${r.d}`,steps:st}}},
  {id:'ratio-x',title:'等しい比（xを求める）',kind:'calc',n:12,cols:2,lead:`${X} にあてはまる数を求めましょう。`,
   explain:{points:[
     {h:'何倍になっているかを見る',b:'わかっている数どうしを見て、何倍（または何分の1）になっているかを調べます。',ex:`2 : 5 = 6 : ${X} → 2 が 6 で 3 倍`},
     {h:'もう一方も同じ倍にする',b:`等しい比では、両方の数が同じ倍になります。`,ex:`${X} = 5 × 3 = 15`}],
    tip:`<b>たしかめ</b>　求めた ${X} を入れて、2つの比の値が同じになるか確かめましょう。`},
   gen(){
    let p,q;do{p=ri(1,9);q=ri(1,9)}while(p===q||gcd(p,q)!==1);const k=ri(2,9);
    const f=[
      [`${p} : ${q} = ${p*k} : ${X}`,q*k,[`${p} → ${p*k} は ${k} 倍`,`${X} = ${q} × ${k} = ${q*k}`]],
      [`${p} : ${q} = ${X} : ${q*k}`,p*k,[`${q} → ${q*k} は ${k} 倍`,`${X} = ${p} × ${k} = ${p*k}`]],
      [`${p*k} : ${q*k} = ${p} : ${X}`,q,[`${p*k} → ${p} は ${k} でわっている`,`${X} = ${q*k} ÷ ${k} = ${q}`]],
      [`${X} : ${q*k} = ${p} : ${q}`,p*k,[`${q} → ${q*k} は ${k} 倍`,`${X} = ${p} × ${k} = ${p*k}`]]][ri(0,3)];
    return{q:f[0],tail:'',a:`${X} = ${f[1]}`,steps:f[2]}}},
  {id:'ratio-word',title:'比の利用（文章題）',kind:'word',n:4,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'全体を比で分ける',b:'p : q に分けるとき、全体を p + q とみます。p の部分は全体の p/(p+q) です。',ex:`3 : 2 に分ける → 全体の ${F(3,5)} と ${F(2,5)}`},
     {h:'一方から他方を求める',b:'等しい比の式をつくって、何倍になっているかを考えます。',ex:`2 : 3 = 8 : ${X} → ${X} = 12`}],
    tip:'<b>ここに注意</b>　「全体」と「一部分」のどちらがわかっているのかを、問題文からまず読み取りましょう。'},
   gen(){
    let p,q;do{p=ri(1,7);q=ri(1,7)}while(p===q||gcd(p,q)!==1);
    return pick([
     ()=>{const L=(p+q)*ri(3,15)*2,r=L*p/(p+q);return{q:`長さ ${L} cm のリボンを、姉と妹の長さの比が ${p} : ${q} になるように分けます。姉のリボンは何 cm ですか。`,a:`式 ${L} × ${F(p,p+q)} = ${r}　答え ${r} cm`,steps:[`全体を ${p} + ${q} = ${p+q} とみると、姉は ${p} にあたる`,`姉は全体の ${F(p,p+q)}`]}},
     ()=>{const k=ri(2,12);return{q:`縦と横の長さの比が ${p} : ${q} の長方形をかきます。横の長さを ${q*k} cm にすると、縦の長さは何 cm ですか。`,a:`式 ${p} : ${q} = ${X} : ${q*k}　${X} = ${p*k}　答え ${p*k} cm`,steps:[`縦を ${X} cm として、${p} : ${q} = ${X} : ${q*k}`,`${q} → ${q*k} は ${k} 倍なので、${X} = ${p} × ${k}`]}},
     ()=>{const k=pick([10,15,20,30,40]);return{q:`酢とサラダ油を ${p} : ${q} の比でまぜてドレッシングを作ります。酢を ${p*k} mL にすると、サラダ油は何 mL 必要ですか。`,a:`式 ${p} : ${q} = ${p*k} : ${X}　${X} = ${q*k}　答え ${q*k} mL`,steps:[`サラダ油を ${X} mL として、${p} : ${q} = ${p*k} : ${X}`,`${p} → ${p*k} は ${k} 倍なので、${X} = ${q} × ${k}`]}},
     ()=>{const T=(p+q)*ri(3,12),r=T*q/(p+q);return{q:`赤い玉と白い玉が全部で ${T} こあり、赤い玉と白い玉の数の比は ${p} : ${q} です。白い玉は何こですか。`,a:`式 ${T} × ${F(q,p+q)} = ${r}　答え ${r} こ`,steps:[`全体を ${p} + ${q} = ${p+q} とみると、白い玉は ${q} にあたる`,`白い玉は全体の ${F(q,p+q)}`]}},
     ()=>{const T=(p+q)*ri(2,10)*100,r=T*p/(p+q);return{q:`${T} 円を、兄と弟で ${p} : ${q} の比になるように分けます。兄は何円になりますか。`,a:`式 ${T} × ${F(p,p+q)} = ${r}　答え ${r} 円`,steps:[`全体を ${p} + ${q} = ${p+q} とみると、兄は ${p} にあたる`,`兄は全体の ${F(p,p+q)}`]}},
    ])()}},
 ]},
 {ch:'円の面積・立体の体積',items:[
  {id:'circle',title:'円の面積',kind:'fig',n:6,cols:3,lead:'次の図形の面積を求めましょう。円周率は 3.14 とします。',
   explain:{points:[
     {h:'円の面積の公式',b:'円の面積 = 半径 × 半径 × 3.14',ex:'半径 3 cm → 3 × 3 × 3.14 = 28.26（cm²）'},
     {h:'いろいろな形',b:'直径がわかっているときは、2でわって半径にします。半円は円の面積 ÷ 2、円を4等分した形は ÷ 4 です。'}],
    tip:'<b>ここに注意</b>　「半径 × 2 × 3.14」は円周の長さの公式です。面積は「半径 × 半径」です。'},
   gen:genCircle},
  {id:'volume',title:'角柱・円柱の体積',kind:'word',n:6,cols:2,lead:'次の立体の体積を求めましょう。円周率は 3.14 とします。',
   explain:{points:[
     {h:'体積の公式',b:'角柱・円柱の体積 = 底面積 × 高さ',ex:'底面積 12 cm²、高さ 5 cm → 12 × 5 = 60（cm³）',wide:true},
     {h:'底面積の求め方',b:'長方形：縦 × 横　三角形：底辺 × 高さ ÷ 2　円：半径 × 半径 × 3.14',wide:true}],
    tip:'<b>ここに注意</b>　三角柱の「底面の三角形の高さ」と「立体の高さ」はちがいます。どちらの高さかを区別しましょう。'},
   gen(){
    return pick([
     ()=>{const a=ri(2,12),b=ri(2,12),h=ri(2,15);return{q:`底面が縦 ${a} cm、横 ${b} cm の長方形で、高さが ${h} cm の四角柱`,a:`式 ${a} × ${b} × ${h} = ${a*b*h}　答え ${a*b*h} cm³`,steps:[`底面積 = ${a} × ${b} = ${a*b}（cm²）`,`体積 = 底面積 × 高さ = ${a*b} × ${h}`]}},
     ()=>{let a,b;do{a=ri(2,12);b=ri(2,12)}while((a*b)%2);const h=ri(2,15);return{q:`底面が底辺 ${a} cm、高さ ${b} cm の三角形で、高さが ${h} cm の三角柱`,a:`式 ${a} × ${b} ÷ 2 × ${h} = ${a*b/2*h}　答え ${a*b/2*h} cm³`,steps:[`底面積 = ${a} × ${b} ÷ 2 = ${a*b/2}（cm²）`,`体積 = ${a*b/2} × ${h}`]}},
     ()=>{const r=ri(1,10),h=ri(2,12);const s=num(r*r*3.14),v=num(r*r*314*h/100);return{q:`底面の半径が ${r} cm、高さが ${h} cm の円柱`,a:`式 ${r} × ${r} × 3.14 × ${h} = ${v}　答え ${v} cm³`,steps:[`底面積 = ${r} × ${r} × 3.14 = ${s}（cm²）`,`体積 = ${s} × ${h}`]}},
     ()=>{const d=ri(1,6)*2,h=ri(2,12),r=d/2;const s=num(r*r*3.14),v=num(r*r*314*h/100);return{q:`底面の直径が ${d} cm、高さが ${h} cm の円柱`,a:`式 ${r} × ${r} × 3.14 × ${h} = ${v}　答え ${v} cm³`,steps:[`半径 = ${d} ÷ 2 = ${r}（cm）`,`底面積 = ${r} × ${r} × 3.14 = ${s}（cm²）`,`体積 = ${s} × ${h}`]}},
     ()=>{const S=ri(6,60),h=ri(2,15);return{q:`底面積が ${S} cm²、高さが ${h} cm の角柱`,a:`式 ${S} × ${h} = ${S*h}　答え ${S*h} cm³`,steps:['体積 = 底面積 × 高さ']}},
    ])()}},
 ]},
 {ch:'拡大図と縮図',items:[
  {id:'scale',title:'縮図の利用（縮尺）',kind:'word',n:4,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'縮尺の意味',b:'縮尺 1/1000（1 : 1000）は、実際の長さを 1/1000 に縮めて表しているという意味です。',ex:'地図上の長さ × 1000 = 実際の長さ'},
     {h:'単位のなおし方',b:'1 m = 100 cm、1 km = 1000 m = 100000 cm。計算は cm でして、最後に m や km になおします。',ex:'30000 cm = 300 m'}],
    tip:'<b>ここに注意</b>　実際の長さから縮図の長さを求めるときは、縮尺の分母でわります。単位をそろえてから計算しましょう。'},
   gen(){
    const n=pick([500,1000,2000,2500,5000,10000,25000,50000]);
    const sc=chance(.5)?F(1,n):`1 : ${n}`;
    const a=ri(2,12)*(chance(.3)?0.5:1);
    const cm=a*n,m=cm/100,useKm=m>=1000,out=useKm?`${num(m/1000)} km`:`${num(m)} m`;
    const conv=useKm?`${num(cm)} cm = ${num(m)} m = ${num(m/1000)} km`:`${num(cm)} cm = ${num(m)} m`;
    if(chance(.5))return{q:`縮尺 ${sc} の地図で、${num(a)} cm の長さは、実際には何 ${useKm?'km':'m'} ですか。`,a:`式 ${num(a)} × ${n} = ${num(cm)}（cm）　答え ${out}`,steps:[`実際の長さ = 地図上の長さ × ${n}`,`単位をなおす：${conv}`]};
    return{q:`実際の長さが ${out} のきょりを、縮尺 ${sc} の縮図に表すと何 cm になりますか。`,a:`式 ${num(cm)} ÷ ${n} = ${num(a)}　答え ${num(a)} cm`,steps:[`まず cm になおす：${out} = ${num(cm)} cm`,`縮図の長さ = 実際の長さ ÷ ${n}`]}}},
 ]},
 {ch:'比例と反比例',items:[
  {id:'prop',title:'比例の表と式',kind:'table',n:2,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'比例とは',b:`${X} が 2倍、3倍…になると、${Y} も 2倍、3倍…になる関係です。`},
     {h:'比例の式',b:`${Y} ÷ ${X} はいつも同じ数（きまった数）になります。式は ${Y} = きまった数 × ${X} です。`,ex:`${Y} = 3 × ${X}`}],
    tip:`<b>求め方</b>　表から ${X} と ${Y} がそろっている列を1つ選んで、${Y} ÷ ${X} を計算すると「きまった数」がわかります。`},
   gen(){
    const c=pick([
      {s:'1 m あたりの重さが {a} g の針金の、長さ {x} m と重さ {y} g',a:[3,4,5,6,8,12,15,20,1.5,2.5]},
      {s:'1分間に {a} L ずつ水を入れるときの、時間 {x} 分と水の量 {y} L',a:[2,3,4,5,6,1.5,2.5]},
      {s:'1こ {a} 円のあめを買うときの、個数 {x} こと代金 {y} 円',a:[10,20,30,40,50,60]},
      {s:'時速 {a} km で走る自動車の、走った時間 {x} 時間と道のり {y} km',a:[30,40,45,50,60]}]);
    const a=pick(c.a),xs=[1,2,3,4,5,6],hide=new Set(shuffle([0,1,2,3,4,5]).slice(0,3)),k=pick([8,9,10,12]);
    const known=xs.findIndex((x,i)=>!hide.has(i));
    const lab=c.s.replace('{a}',num(a)).replace('{x}',X).replace('{y}',Y);
    const tbl=(show)=>`<table class="tbl"><tr><th>${X}</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>${Y}</th>${xs.map((x,i)=>hide.has(i)?(show?`<td class="r">${num(a*x)}</td>`:'<td></td>'):`<td>${num(a*x)}</td>`).join('')}</tr></table>`;
    return{q:`${lab}の関係を表にしました。${Y} は ${X} に比例しています。${tbl(false)}(1) 表のあいているところに数を書きましょう。<br>(2) ${X} と ${Y} の関係を式に表しましょう。<br>(3) ${X} が ${k} のときの ${Y} の値を求めましょう。`,parts:['(2)','(3)'],
      a:`${tbl(true)}(2) ${Y} = ${num(a)} × ${X}　(3) ${num(a*k)}`,
      steps:[`きまった数：${Y} ÷ ${X} = ${num(a*xs[known])} ÷ ${xs[known]} = ${num(a)}`,`あいているところは ${num(a)} × ${X} で求める`,`(3) ${num(a)} × ${k} = ${num(a*k)}`]}}},
  {id:'inv',title:'反比例の表と式',kind:'table',n:2,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'反比例とは',b:`${X} が 2倍、3倍…になると、${Y} は 1/2、1/3…になる関係です。`},
     {h:'反比例の式',b:`${X} × ${Y} はいつも同じ数（きまった数）になります。式は ${Y} = きまった数 ÷ ${X} です。`,ex:`${Y} = 24 ÷ ${X}`}],
    tip:`<b>ここに注意</b>　比例は「${Y} ÷ ${X}」、反比例は「${X} × ${Y}」がきまった数です。まちがえやすいので、表で確かめましょう。`},
   gen(){
    const K=pick([12,18,24,36,48,60]);
    const divs=[];for(let i=1;i<=K;i++)if(K%i===0)divs.push(i);const xs=divs.slice(0,6);
    const c=pick([
      `面積が ${K} cm² の長方形の、縦の長さ ${X} cm と横の長さ ${Y} cm`,
      `${K} km の道のりを進むときの、時速 ${X} km とかかる時間 ${Y} 時間`,
      `${K} L 入る水そうに水を入れるときの、1分間に入れる量 ${X} L といっぱいになるまでの時間 ${Y} 分`]);
    const hide=new Set(shuffle([1,2,3,4,5]).slice(0,3));
    const tbl=(show)=>`<table class="tbl"><tr><th>${X}</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>${Y}</th>${xs.map((x,i)=>hide.has(i)?(show?`<td class="r">${K/x}</td>`:'<td></td>'):`<td>${K/x}</td>`).join('')}</tr></table>`;
    return{q:`${c}の関係を表にしました。${Y} は ${X} に反比例しています。${tbl(false)}(1) 表のあいているところに数を書きましょう。<br>(2) ${X} と ${Y} の関係を式に表しましょう。`,parts:['(2)'],
      a:`${tbl(true)}(2) ${Y} = ${K} ÷ ${X}`,steps:[`きまった数：${X} × ${Y} = 1 × ${K} = ${K}`,`あいているところは ${K} ÷ ${X} で求める`]}}},
 ]},
 {ch:'データの活用',items:[
  {id:'data',title:'平均値・中央値・最頻値',kind:'data',n:3,cols:1,lead:LEAD_WORD,
   explain:{points:[
     {h:'平均値',b:'データの合計 ÷ データの個数',ex:'4, 6, 8 → (4 + 6 + 8) ÷ 3 = 6'},
     {h:'中央値',b:'小さい順に並べたときのまん中の値。個数が偶数のときは、まん中の2つの平均です。',ex:'1, 3, 5, 8 → (3 + 5) ÷ 2 = 4'},
     {h:'最頻値',b:'データの中でいちばん多く出てくる値です。',ex:'2, 5, 5, 7 → 5',wide:true}],
    tip:'<b>ここに注意</b>　中央値を求めるときは、かならず小さい順に並べかえてから、まん中を探します。'},
   gen:genData},
 ]},
 {ch:'場合の数',items:[
  {id:'comb',title:'並べ方と組み合わせ',kind:'word',n:6,cols:2,lead:LEAD_WORD,
   explain:{points:[
     {h:'並べ方',b:'1番目に何通り、2番目に何通り…と考えて、それぞれをかけます。図（樹形図）や表にかくと落ちや重なりがなくなります。',ex:'A, B, C の並べ方 → 3 × 2 × 1 = 6 通り'},
     {h:'組み合わせ',b:'「A と B」と「B と A」は同じ組です。並べ方の数を出してから、重なりの分でわるか、表で数えます。',ex:'4人から2人 → 4 × 3 ÷ 2 = 6 通り'}],
    tip:'<b>ここに注意</b>　順番が関係ある（並べ方）のか、関係ない（組み合わせ）のかを、まず問題文で確かめましょう。'},
   gen(){
    const names=['A','B','C','D','E','F'];
    return pick([
     ()=>{const n=ri(3,4);const seq=Array.from({length:n},(_,i)=>n-i);const f=seq.reduce((a,b)=>a*b,1);return{q:`${names.slice(0,n).join('、')} の ${n} 人がリレーで走る順番を決めます。走る順番は全部で何通りありますか。`,a:`答え ${f} 通り`,steps:[`1番目は ${n} 通り、2番目はのこりの ${n-1} 通り…`,`${seq.join(' × ')} = ${f}`]}},
     ()=>{const n=ri(4,6);return{q:`${names.slice(0,n).join('、')} の ${n} 人の中から、図書係を2人選びます。選び方は全部で何通りありますか。`,a:`答え ${n*(n-1)/2} 通り`,steps:[`順番をつけて並べると ${n} × ${n-1} = ${n*(n-1)} 通り`,`「AとB」と「BとA」は同じ組なので 2 でわる：${n*(n-1)} ÷ 2 = ${n*(n-1)/2}`]}},
     ()=>{const n=ri(4,6);return{q:`${n} チームでサッカーの試合をします。どのチームとも1回ずつ試合をすると、試合は全部で何試合になりますか。`,a:`答え ${n*(n-1)/2} 試合`,steps:[`1チームは ${n-1} 試合するので ${n} × ${n-1} = ${n*(n-1)}`,`1つの試合を2チームで2回数えているので 2 でわる：${n*(n-1)/2}`]}},
     ()=>{const z=chance(.5);let ds;do{ds=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4)}while(z!==ds.includes(0));
       const h=z?3:4,t=3,o=2,c=h*t*o;
       return{q:`${ds.sort((a,b)=>a-b).join('、')} の4枚のカードのうち3枚を並べて、3けたの整数をつくります。整数は全部で何通りできますか。`,a:`答え ${c} 通り`,steps:[`百の位：${z?'0 は使えないので 3':'4'} 通り`,`十の位：のこりの 3 通り　一の位：のこりの 2 通り`,`${h} × ${t} × ${o} = ${c}`]}},
     ()=>{const t=ri(2,4);return{q:`10円玉を ${t} 回投げます。表と裏の出方は全部で何通りありますか。`,a:`答え ${2**t} 通り`,steps:['1回ごとに、表・裏の 2 通り',`${Array(t).fill(2).join(' × ')} = ${2**t}`]}},
     ()=>{const cs=['赤','青','黄','緑','白','茶'];const n=ri(4,5);return{q:`${cs.slice(0,n).join('、')} の ${n} 色の中から2色を選んで旗をぬります（ぬる場所は区別しません）。色の選び方は全部で何通りありますか。`,a:`答え ${n*(n-1)/2} 通り`,steps:[`並べ方で数えると ${n} × ${n-1} = ${n*(n-1)} 通り`,`同じ組を2回数えているので 2 でわる：${n*(n-1)/2}`]}},
    ])()}},
 ]},
 {ch:'単位',items:[
  {id:'units',title:'面積・体積・重さの単位',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
   explain:{points:[
     {h:'面積の単位',b:`<table class="utbl"><tr><td>1 m² = 10000 cm²</td><td>1 a = 100 m²</td></tr><tr><td>1 ha = 10000 m²</td><td>1 km² = 100 ha</td></tr></table>`},
     {h:'体積・重さの単位',b:`<table class="utbl"><tr><td>1 L = 1000 cm³</td><td>1 cm³ = 1 mL</td></tr><tr><td>1 dL = 100 mL</td><td>1 m³ = 1000 L</td></tr><tr><td>1 kg = 1000 g</td><td>1 t = 1000 kg</td></tr></table>`}],
    tip:'<b>考え方</b>　大きい単位 → 小さい単位はかけ算、小さい単位 → 大きい単位はわり算です。'},
   gen(){
    const c=pick([['m²','cm²',10000],['cm²','m²',1/10000],['a','m²',100],['ha','a',100],['km²','ha',100],['ha','m²',10000],
      ['L','cm³',1000],['cm³','mL',1],['dL','mL',100],['m³','L',1000],['L','dL',10],['kg','g',1000],['t','kg',1000],['g','kg',1/1000],['mL','L',1/1000]]);
    const v=c[2]>=1?(chance(.5)?ri(2,40):ri(11,99)/10):pick([ri(2,9)*1000,ri(11,99)*100,ri(2,90)*10000]);
    const raw=v*c[2];
    const st=c[2]>=1?[`1 ${c[0]} = ${c[2]} ${c[1]}`,`${num(v)} × ${c[2]} = ${num(raw)}`]:[`1 ${c[1]} = ${num(1/c[2])} ${c[0]}`,`${num(v)} ÷ ${num(1/c[2])} = ${num(raw)}`];
    return{q:`${num(v)} ${c[0]} = {_} ${c[1]}`,tail:'',a:num(raw),steps:st}}},
 ]},
];
/*GRADES*/
GRADE_UNITS[6]=UNITS;
/*MORE*/
const chaptersFor=g=>GRADE_UNITS[g].concat([PUZZLE_CHAPTER]);
const UNIT_BY_ID={};
for(const g of [1,2,3,4,5,6])chaptersFor(g).forEach(ch=>ch.items.forEach(u=>{UNIT_BY_ID[g+':'+u.id]=Object.assign(Object.create(u),{chapter:ch.ch,grade:g,puzzle:!!ch.puzzle})}));
const unitOf=id=>UNIT_BY_ID[state.grade+':'+id];

/* ============ 図のジェネレーター ============ */
const G=10;
function gridSVG(inner){
  let g='';for(let i=0;i<=G;i++){g+=`<line x1="${i*10}" y1="0" x2="${i*10}" y2="${G*10}"/><line x1="0" y1="${i*10}" x2="${G*10}" y2="${i*10}"/>`}
  return `<svg viewBox="-6 -8 112 116" xmlns="http://www.w3.org/2000/svg" role="img"><g stroke="#c4c4c4" stroke-width=".5" fill="none">${g}</g>${inner}</svg>`;
}
const P=pts=>pts.map(p=>`${p[0]*10},${p[1]*10}`).join(' ');
function genLineSym(){
  for(let tries=0;tries<200;tries++){
    const side=chance(.5)?-1:1,top=ri(1,3),bot=ri(7,9),k=ri(3,5);
    const angs=Array.from({length:k},()=>ri(20,160)).sort((a,b)=>a-b);
    const pts=[[5,top]];let ok=true;
    for(const a of angs){const r=ri(2,5),rad=a*Math.PI/180;const x=5+side*Math.round(r*Math.sin(rad)),y=5-Math.round(r*Math.cos(rad));
      if(Math.abs(x-5)<1||x<0||x>10||y<0||y>10){ok=false;break}
      const l=pts[pts.length-1];if(l[0]===x&&l[1]===y)continue;pts.push([x,y])}
    if(!ok||pts.length<4)continue;
    pts.push([5,bot]);
    const mir=pts.map(p=>[10-p[0],p[1]]);
    const axis=`<line x1="50" y1="-4" x2="50" y2="104" stroke="#222" stroke-width="1" stroke-dasharray="6 2 1.5 2"/><text x="54" y="-1.5" font-size="7" fill="#222">ア</text><text x="54" y="107" font-size="7" fill="#222">イ</text>`;
    const half=`<polyline points="${P(pts)}" fill="none" stroke="#111" stroke-width="1.8" stroke-linejoin="round"/>`;
    const ansl=`<polyline points="${P(mir)}" fill="none" stroke="#d2372b" stroke-width="1.8" stroke-linejoin="round"/>`;
    const v=pts[1],d=Math.abs(v[0]-5);
    return{q:`<div class="fig">${gridSVG(axis+half)}</div>`,a:`<div class="fig">${gridSVG(axis+half+ansl)}</div>`,figAns:true,
      steps:[`たとえば上から2番目の頂点は、軸から${side<0?'左':'右'}に ${d} ます → 軸の${side<0?'右':'左'}に ${d} ますのところに点をとる`,'ほかの頂点も同じようにして、とった点を順に結ぶ']};
  }
}
function genPointSym(){
  for(let tries=0;tries<200;tries++){
    const dx=ri(1,4)*(chance(.5)?1:-1),dy=ri(1,4)*(chance(.5)?1:-1);
    const a0=Math.atan2(dy,dx),k=ri(2,4);
    const ts=Array.from({length:k},()=>0.12+rng()*0.76).sort((a,b)=>a-b);
    const off=[[dx,dy]];let ok=true;
    for(const t of ts){const r=ri(2,5),an=a0+t*Math.PI;const ox=Math.round(r*Math.cos(an)),oy=Math.round(r*Math.sin(an));
      if((ox===0&&oy===0)||Math.abs(ox)>5||Math.abs(oy)>5){ok=false;break}
      const l=off[off.length-1];if(l[0]===ox&&l[1]===oy)continue;off.push([ox,oy])}
    if(!ok||off.length<3)continue;
    off.push([-dx,-dy]);
    const toG=o=>[5+o[0],5-o[1]];
    const half=off.map(toG),rot=off.map(o=>toG([-o[0],-o[1]]));
    const center=`<circle cx="50" cy="50" r="1.8" fill="#111"/><text x="53" y="47" font-size="7" fill="#111">O</text>`;
    const h=`<polyline points="${P(half)}" fill="none" stroke="#111" stroke-width="1.8" stroke-linejoin="round"/>`;
    const r=`<polyline points="${P(rot)}" fill="none" stroke="#d2372b" stroke-width="1.8" stroke-linejoin="round"/>`;
    const v=off[1],hz=v[0]>0?'右':'左',vt=v[1]>0?'上':'下',hz2=v[0]>0?'左':'右',vt2=v[1]>0?'下':'上';
    const desc=(a,b,ha,va)=>[a?`${ha}に ${Math.abs(a)} ます`:'',b?`${va}に ${Math.abs(b)} ます`:''].filter(Boolean).join('、');
    return{q:`<div class="fig">${gridSVG(center+h)}</div>`,a:`<div class="fig">${gridSVG(center+h+r)}</div>`,figAns:true,
      steps:[`たとえば2番目の頂点は、Oから${desc(v[0],v[1],hz,vt)} → Oから${desc(v[0],v[1],hz2,vt2)}のところに点をとる`,'ほかの頂点も同じようにして、とった点を順に結ぶ']};
  }
}
function genCircle(){
  const t=pick(['r','r','d','d','half','half','quarter','quarter','circ']);
  const Sv=(inner)=>`<svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg" role="img">${inner}</svg>`;
  const fill='fill="#e9e9e9" stroke="#111" stroke-width="1.4"';
  const lab=(x,y,s)=>`<text x="${x}" y="${y}" font-size="8.5" text-anchor="middle" fill="#111">${s}</text>`;
  const area=r=>num(r*r*3.14);
  if(t==='r'){const r=ri(2,10);return{q:`<div class="fig">${Sv(`<circle cx="50" cy="46" r="38" ${fill}/><line x1="50" y1="46" x2="88" y2="46" stroke="#111" stroke-width="1.2"/><circle cx="50" cy="46" r="1.6" fill="#111"/>${lab(69,42,r+'cm')}`)}</div>`,a:`<b>${area(r)} cm²</b>`,steps:[`半径 × 半径 × 3.14：${r} × ${r} × 3.14 = ${area(r)}`]}}
  if(t==='d'){const d=ri(2,10)*2,r=d/2;return{q:`<div class="fig">${Sv(`<circle cx="50" cy="46" r="38" ${fill}/><line x1="12" y1="46" x2="88" y2="46" stroke="#111" stroke-width="1.2"/>${lab(50,42,d+'cm')}`)}</div>`,a:`<b>${area(r)} cm²</b>`,steps:[`直径が ${d} cm なので、半径は ${d} ÷ 2 = ${r} cm`,`${r} × ${r} × 3.14 = ${area(r)}`]}}
  if(t==='half'){const r=ri(2,10);const v=num(r*r*314/200);return{q:`<div class="fig">${Sv(`<path d="M10,66 A40,40 0 0 1 90,66 Z" ${fill}/><line x1="50" y1="66" x2="90" y2="66" stroke="#111" stroke-width="1.2"/>${lab(70,78,r+'cm')}`)}</div><div class="figcap">（半円）</div>`,a:`<b>${v} cm²</b>`,steps:[`円全体の面積：${r} × ${r} × 3.14 = ${area(r)}`,`半円なので 2 でわる：${area(r)} ÷ 2 = ${v}`]}}
  if(t==='quarter'){const r=ri(2,10);const v=num(r*r*314/400);return{q:`<div class="fig">${Sv(`<path d="M18,82 L88,82 A70,70 0 0 0 18,12 Z" ${fill}/><polyline points="18,74 26,74 26,82" fill="none" stroke="#111" stroke-width=".8"/>${lab(53,90,r+'cm')}`)}</div><div class="figcap">（円を4等分した形）</div>`,a:`<b>${v} cm²</b>`,steps:[`円全体の面積：${r} × ${r} × 3.14 = ${area(r)}`,`4等分なので 4 でわる：${area(r)} ÷ 4 = ${v}`]}}
  const r=ri(1,10);const C=num(r*2*3.14);return{q:`<div class="figcap" style="padding-top:6mm">円周の長さが ${C} cm の円</div>`,a:`<b>${area(r)} cm²</b>`,steps:[`直径 = 円周 ÷ 3.14 = ${C} ÷ 3.14 = ${2*r}`,`半径 = ${2*r} ÷ 2 = ${r}`,`${r} × ${r} × 3.14 = ${area(r)}`]};
}
function genData(){
  const c=pick([{s:'ソフトボール投げの記録',u:'m',lo:14,hi:36},{s:'1か月に読んだ本の数',u:'さつ',lo:1,hi:12},{s:'家から学校までの通学時間',u:'分',lo:4,hi:25},{s:'1週間になわとびをした日数',u:'日',lo:0,hi:7}]);
  for(let t=0;t<5000;t++){
    const n=pick([9,10,11]);const mode=ri(c.lo,c.hi);const vals=[mode,mode,mode];
    while(vals.length<n)vals.push(ri(c.lo,c.hi));
    const cnt={};vals.forEach(v=>cnt[v]=(cnt[v]||0)+1);
    if(Object.entries(cnt).some(([v,k])=>+v!==mode&&k>=3))continue;
    const sum=vals.reduce((a,b)=>a+b,0);if(sum%n)continue;
    const s=[...vals].sort((a,b)=>a-b);const med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;
    shuffle(vals);
    const medStep=n%2?`中央値：小さい順に ${s.join(', ')}　→ ${(n+1)/2} 番目の ${med}`:`中央値：小さい順に ${s.join(', ')}　→ ${n/2} 番目と ${n/2+1} 番目の平均 (${s[n/2-1]} + ${s[n/2]}) ÷ 2 = ${num(med)}`;
    return{q:`下の資料は、${n} 人の${c.s}（${c.u}）です。<div class="datalist">${vals.map(v=>`<span>${v}</span>`).join('')}</div>(1) 平均値を求めましょう。　(2) 中央値を求めましょう。　(3) 最頻値を求めましょう。`,
      parts:['(1)','(2)','(3)'],a:`(1) <b>${sum/n} ${c.u}</b>　(2) <b>${num(med)} ${c.u}</b>　(3) <b>${mode} ${c.u}</b>`,
      steps:[`平均値：合計 ${sum} ÷ 人数 ${n} = ${sum/n}`,medStep,`最頻値：${mode} が 3 回出てきて、いちばん多い`]};
  }
}

/* ============ 描画 ============ */
const $=s=>document.querySelector(s);
const state={sets:1,grade:6,sel:{1:new Set(['g1-add20','pz-maze']),2:new Set(['g2-kuku','pz-pyramid']),3:new Set(['g3-div','pz-magic']),4:new Set(['g4-div1','pz-sudoku']),5:new Set(['g5-percent','pz-symbols']),6:new Set(['f-div','pz-mushikui'])},mode:'unit',amount:2,answers:true,steps:true,explain:true,name:true,seed:1024};
Object.defineProperty(state,'selected',{get(){return this.sel[this.grade]}});
function hashStr(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}

function buildUnitList(){
  const sc=$('#units').scrollTop;
  $('#units').innerHTML=chaptersFor(state.grade).map((ch,ci)=>`<div class="chap${ch.puzzle?' puzzle':''}"><div class="chap-name"><span>${ch.ch}</span>${ch.puzzle?'<span class="tag">全学年・むずかしさは学年に合わせて変わります</span>':''}<button type="button" class="chap-toggle" data-ch="${ci}"></button></div>${ch.items.map(u=>`
    <label class="unit" for="u-${u.id}"><input type="checkbox" id="u-${u.id}" value="${u.id}" ${state.selected.has(u.id)?'checked':''}><span>${u.title}${u.kind==='fig'?'<span class="tag">図</span>':''}${u.kind==='word'||u.kind==='table'||u.kind==='data'?'<span class="tag">文章題</span>':''}</span></label>`).join('')}</div>`).join('');
  $('#units').scrollTop=sc;refreshSel();
}
/* 選択数・章ごとのボタン・学年ごとの件数を更新し、選択を保存する */
function refreshSel(){
  const n=state.selected.size,all=Object.values(state.sel).reduce((a,s)=>a+s.size,0);
  $('#sel-count').textContent=n?`${n}単元を選択中`:'未選択';
  $('#clear-grade').disabled=!n;$('#clear-all').disabled=!all;
  const chs=chaptersFor(state.grade);
  document.querySelectorAll('.chap-toggle').forEach(b=>{const ids=chs[+b.dataset.ch].items.map(u=>u.id),on=ids.every(id=>state.selected.has(id));b.textContent=on?'全部はずす':'全部選ぶ';b.dataset.on=on?'1':''});
  document.querySelectorAll('.grades button').forEach((b,i)=>{const c=state.sel[i+1].size;let s=b.querySelector('.gc');if(!s){s=document.createElement('span');s.className='gc';b.append(s)}s.textContent=c?`${c}`:'';b.setAttribute('aria-label',`${i+1}年${c?`（${c}単元選択中）`:''}`)});
  try{localStorage.setItem('sansu-print-sel',JSON.stringify(Object.fromEntries(Object.entries(state.sel).map(([g,s])=>[g,[...s]]))))}catch(e){}
}
let undoSnap=null,undoTimer=null;
function snapshot(){return Object.fromEntries(Object.entries(state.sel).map(([g,s])=>[g,new Set(s)]))}
function offerUndo(snap){undoSnap=snap;const u=$('#undo-reset');u.hidden=false;clearTimeout(undoTimer);undoTimer=setTimeout(()=>{u.hidden=true;undoSnap=null},10000)}
$('#units').addEventListener('change',e=>{if(e.target.type==='checkbox'){e.target.checked?state.selected.add(e.target.value):state.selected.delete(e.target.value);refreshSel();render()}});
$('#units').addEventListener('click',e=>{const b=e.target.closest('.chap-toggle');if(!b)return;const ids=chaptersFor(state.grade)[+b.dataset.ch].items.map(u=>u.id);
  if(b.dataset.on)ids.forEach(id=>state.selected.delete(id));else ids.forEach(id=>state.selected.add(id));
  ids.forEach(id=>{const c=document.getElementById('u-'+id);if(c)c.checked=state.selected.has(id)});refreshSel();render()});
$('#clear-grade').addEventListener('click',()=>{const s=snapshot();state.selected.clear();buildUnitList();render();offerUndo(s)});
$('#clear-all').addEventListener('click',()=>{const s=snapshot();Object.values(state.sel).forEach(x=>x.clear());buildUnitList();render();offerUndo(s)});
$('#undo-reset').addEventListener('click',()=>{if(!undoSnap)return;state.sel=undoSnap;undoSnap=null;$('#undo-reset').hidden=true;buildUnitList();render()});
function makeProblems(u,count,seedKey){
  LV=u.grade||state.grade;rng=mulberry32(hashStr(u.grade+'|'+seedKey));const out=[];
  const seen=new Set();
  for(let i=0;i<count;i++){let p,t=0;do{p=u.gen.call(u)}while(seen.has(p.q)&&++t<30);seen.add(p.q);out.push(p)}
  return out;
}
/* 問題数：単元ごとの「1枚分」の数 × 選んだ枚数。図の問題も同じように増える */
function countFor(u){const c=u.cols||1;return Math.max(1,Math.round(u.n*state.amount/c)*c)}
/** {_} を空らん（または赤字の答え）にする。p.blanks があれば、□ごとに順に答えを入れる */
function fillBlanks(p,ans){let i=0;return p.q.replace(/\{_\}/g,()=>{const v=p.blanks?p.blanks[i++]:p.a;return ans?`<span class="calc-ans">${v}</span>`:'<span class="blank"></span>'})}
const stepsHTML=p=>p.steps&&p.steps.length?`<ol class="steps">${p.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`:'';
function probHTML(u,p,i,ans){
  const no=`<span class="no">(${i+1})</span>`;
  const st=ans&&state.steps?stepsHTML(p):'';
  if(u.kind==='calc'){
    const tail=p.tail===undefined?'<span>=</span>':p.tail;
    const q=p.q.includes('{_}')?fillBlanks(p,ans):`${p.q}${tail}${ans?`<span class="calc-ans">${p.a}</span>`:''}`;
    return `<li class="p${st?' has-steps':''}">${no}<div class="body"><span class="q">${q}</span>${st}</div></li>`;
  }
  if(u.kind==='fig'){
    if(ans&&p.figAns)return `<li class="p">${no}${p.a}${st}</li>`;
    const lines=ans?`<div class="ans-block">${p.a}</div>${st}`:`<div class="answer-lines"><div class="ln short"><span>答え</span><i></i></div></div>`;
    return `<li class="p">${no}${p.q}${p.figAns&&!ans?'':lines}</li>`;
  }
  const parts=p.parts||['式','答え'];
  const lines=ans?`<div class="ans-block">${p.a}</div>${st}`:
    `${parts.includes('式')?'<div class="work"></div>':''}<div class="answer-lines">${parts.map(t=>`<div class="ln ${t==='答え'?'short':''}"><span>${t}</span><i></i></div>`).join('')}</div>`;
  return `<li class="p">${no}<div class="body"><div class="wq">${p.q}</div>${lines}</div></li>`;
}
/* ---- 解説ページ ---- */
function exampleHTML(u,p,i){
  const head=`<div class="ex-h"><span class="badge">例題${i+1}</span></div>`;
  const steps=`<span class="kangae">考え方</span>${stepsHTML(p)}`;
  if(u.kind==='calc'){
    const tail=p.tail===undefined?'<span>=</span>':p.tail;
    const q=p.q.includes('{_}')?fillBlanks(p,false):`${p.q}${tail}`;
    return `<li class="p"><div class="ex">${head}<div class="exq">${q}</div>${steps}<div class="exa">答え <span class="ans">${p.blanks?fillBlanks(p,true):p.a}</span></div></div></li>`;
  }
  if(u.kind==='fig'){
    if(p.figAns)return `<li class="p"><div class="ex">${head}<div class="ex-fig"><div><div class="figlabel">問題</div>${p.q}</div><div><div class="figlabel">できあがり（赤い線）</div>${p.a}</div></div>${steps}</div></li>`;
    return `<li class="p"><div class="ex">${head}<div class="ex-fig"><div>${p.q}</div><div>${steps}<div class="exa">答え <span class="ans">${p.a}</span></div></div></div></div></li>`;
  }
  return `<li class="p"><div class="ex">${head}<div class="exq text">${p.q}</div>${steps}<div class="exa">答え <span class="ans">${p.a}</span></div></div></li>`;
}
function explainSheet(u){
  const e=u.explain||{points:[]};
  const pts=`<li class="p"><div class="ex-h">ポイント</div><div class="pts">${e.points.map(pt=>`<div class="pt${pt.wide?' wide':''}"><h3>${pt.h}</h3><div>${pt.b}</div>${pt.ex?`<div class="exm">${pt.ex}</div>`:''}</div>`).join('')}</div></li>`;
  const nEx=u.kind==='table'||u.kind==='data'||(typeof WHY!=='undefined'&&WHY[u.id])?1:2;
  const exs=makeProblems(u,nEx,`${state.seed}:ex:${u.id}`).map((p,i)=>exampleHTML(u,p,i)).join('');
  const tip=e.tip?`<li class="p"><div class="tip">${e.tip}</div></li>`:'';
  const wf=typeof WHY!=='undefined'&&WHY[u.id];
  const why=wf?wf().map(w=>`<li class="p"><div class="why"><div class="ex-h"><span class="badge why-b">なぜ？</span>${w.cap}</div><div class="why-grid${w.svg?'':' nofig'}">${w.svg?`<div class="fig">${w.svg}</div>`:''}<ol class="why-steps">${w.lines.map(l=>`<li>${l}</li>`).join('')}</ol></div></div></li>`).join(''):'';
  const body=`<div class="sec k-ex" data-uid="ex-${u.id}"><ol class="probs c1">${pts}${why}${exs}${tip}</ol></div>`;
  return sheetHTML(body,headHTML(u.chapter,u.title,'ex',false),`${u.title}（解説）`);
}
function headHTML(chapter,title,mark,test){
  const meta=state.name&&!mark?`<div class="sh-meta"><div class="box date"><small>日付</small><span>　月　　日</span></div><div class="box name"><small>名前</small><span></span></div>${test?'<div class="box score"><small>得点</small><span><b>/100点</b></span></div>':''}</div>`:'<div></div>';
  const m=mark==='ans'?'<span class="ans-mark">こたえ</span>':mark==='ex'?'<span class="ex-mark">解説</span>':'';
  return `<header class="sh-head"><div><span class="sh-ch">${chapter}</span><h2 class="sh-title">${title}${m}</h2></div>${meta}</header>`;
}
let curSeed=1024;
const footHTML=(label)=>`<footer class="sh-foot"><span>さんすうプリント工房 ・ 小学${state.grade}年 算数</span><span>${label} ・ No.${curSeed}</span></footer>`;
const sheetHTML=(sections,head,label)=>`<section class="sheet">${head}<div class="sh-body">${sections}</div>${footHTML(label)}</section>`;
function secHTML(u,probs,ans,idx,pts){
  const cols=u.cols||1;
  const h=idx==null?`<p class="lead">${u.lead}</p>`:
    `<div class="sec-head"><span class="sec-no">${idx}</span><p class="lead">${u.lead}</p>${pts?`<span class="sec-pts">${pts}</span>`:''}</div>`;
  return `<div class="sec k-${u.kind}" data-uid="${u.id}${ans?'-a':''}">${h}<ol class="probs c${cols}">${probs.map((p,i)=>probHTML(u,p,i,ans)).join('')}</ol></div>`;
}
const TEST_N={calc:4,word:2,fig:2,table:1,data:1};
function render(){
  const ids=chaptersFor(state.grade).flatMap(c=>c.items.map(u=>u.id)).filter(id=>state.selected.has(id));
  const stack=$('#stack');
  if(!ids.length){stack.innerHTML=`<section class="sheet"><div class="sh-body" style="justify-content:center;align-items:center;color:#777;text-align:center">左の一覧から単元を選ぶと、ここにプリントが表示されます。</div></section>`;$('#count').textContent='0枚';fit();return}
  const sheets=[],answers=[];
  for(let k=0;k<state.sets;k++){
  curSeed=(state.seed+k-1)%99999+1;const sd=curSeed,tag=state.sets>1?`（${k+1}回目）`:'';
  if(state.mode==='unit'){
    ids.forEach(id=>{const u=unitOf(id);const probs=makeProblems(u,countFor(u),`${sd}:${id}`);curSeed=sd;
      if(state.explain&&k===0)sheets.push(explainSheet(u));curSeed=sd;
      sheets.push(sheetHTML(secHTML(u,probs,false),headHTML(u.chapter,u.title+tag,'',false),u.title));
      answers.push(sheetHTML(secHTML(u,probs,true),headHTML(u.chapter,u.title+tag,'ans',false),u.title))});
  }else{
    const us=ids.map(unitOf);
    const data=us.map(u=>({u,probs:makeProblems(u,TEST_N[u.kind]||2,`${sd}:test:${u.id}`)}));
    const total=data.reduce((s,d)=>s+d.probs.length,0);let used=0;
    const pts=data.map((d,i)=>{const p=i===data.length-1?100-used:Math.round(100*d.probs.length/total);used+=p;return p});
    const label=(i)=>{const each=pts[i]/data[i].probs.length;return Number.isInteger(each)?`1問 ${each}点`:`${pts[i]}点`};
    const title=(us.length===1?`${us[0].title} まとめテスト`:'まとめテスト')+tag;
    const chap=[...new Set(us.map(u=>u.chapter))].join('・');
    sheets.push(sheetHTML(data.map((d,i)=>secHTML(d.u,d.probs,false,i+1,label(i))).join(''),headHTML(chap,title,'',true),title));
    answers.push(sheetHTML(data.map((d,i)=>secHTML(d.u,d.probs,true,i+1,label(i))).join(''),headHTML(chap,title,'ans',false),title));
  }}
  curSeed=state.seed;
  const all=state.answers?sheets.concat(answers):sheets;
  stack.innerHTML=all.join('');
  paginate();
  $('#count').textContent=`A4 ${stack.querySelectorAll('.sheet').length}枚`;
  fit();
}
/* A4 1枚に入りきらないときは、問題単位で次のページへ送る */
const A4H=297*96/25.4;
function paginate(){
  const MM=96/25.4,sheets=[...$('#stack').querySelectorAll('.sheet')];
  for(let i=0;i<sheets.length;i++){
    const sh=sheets[i];let next=null,guard=0;
    while(sh.scrollHeight>A4H+1&&guard++<60){
      const foot=sh.querySelector('.sh-foot'),limit=A4H-foot.offsetHeight-15*MM-2;
      const secs=[...sh.querySelectorAll('.sh-body>.sec')];if(!secs.length)break;
      let k=secs.findIndex(x=>x.offsetTop+x.offsetHeight>limit);if(k<0)k=secs.length-1;
      const sec=secs[k],lis=[...sec.querySelectorAll('.probs>.p')];
      let j=lis.findIndex(li=>li.offsetTop+li.offsetHeight>limit);
      if(j<0)j=lis.length-1;
      if(j===0&&k===0){if(lis.length<=1)break;j=1}
      if(!next){next=document.createElement('section');next.className='sheet';
        const head=sh.querySelector('.sh-head').cloneNode(true);const meta=head.querySelector('.sh-meta');if(meta)meta.replaceWith(document.createElement('div'));
        if(!head.querySelector('.cont'))head.querySelector('.sh-title').insertAdjacentHTML('beforeend','<span class="cont">（つづき）</span>');
        next.append(head);const b=document.createElement('div');b.className='sh-body';next.append(b,foot.cloneNode(true));
        sh.after(next);sheets.splice(i+1,0,next)}
      const nb=next.querySelector('.sh-body'),later=secs.slice(k+1);
      if(j===0){nb.prepend(sec,...later);continue}
      let tgt=nb.firstElementChild;
      if(!tgt||tgt.dataset.uid!==sec.dataset.uid||!tgt.dataset.clone){tgt=sec.cloneNode(true);tgt.dataset.clone='1';tgt.querySelector('.probs').innerHTML='';const lead=tgt.querySelector('.sec-head,.lead');if(lead)lead.remove();nb.prepend(tgt)}
      if(later.length)tgt.after(...later);
      tgt.querySelector('.probs').prepend(...lis.slice(j));
    }
  }
}
function fit(){
  const wrap=$('#stack-wrap'),stack=$('#stack');
  stack.style.transform='none';
  const w=wrap.clientWidth,sw=stack.offsetWidth;const s=Math.min(1,w/sw);
  stack.style.transform=s<1?`scale(${s})`:'none';
  wrap.style.height=s<1?`${stack.offsetHeight*s}px`:'auto';
}

/* ============ 操作 ============ */
try{const sv=JSON.parse(localStorage.getItem('sansu-print-sel')||'null');if(sv)for(const g in state.sel){if(Array.isArray(sv[g]))state.sel[g]=new Set(sv[g].filter(id=>UNIT_BY_ID[g+':'+id]))}}catch(e){}
buildUnitList();
document.querySelectorAll('.grades button').forEach((b,i)=>{b.disabled=false;b.removeAttribute('title');b.setAttribute('aria-pressed',String(i+1===state.grade));
  b.addEventListener('click',()=>{state.grade=i+1;document.querySelectorAll('.grades button').forEach((x,j)=>x.setAttribute('aria-pressed',String(j===i)));buildUnitList();render()})});
document.querySelectorAll('input[name="mode"]').forEach(r=>r.addEventListener('change',e=>{state.mode=e.target.value;
  $('#mode-hint').textContent=state.mode==='unit'?'選んだ単元を1枚ずつプリントにします。解説ページもつけられます。':'選んだ単元から数問ずつ集めて、1枚の100点テストにします（3〜5単元がおすすめ）。';render()}));
$('#amount').addEventListener('change',e=>{state.amount=+e.target.value;render()});
$('#sets').addEventListener('change',e=>{state.sets=+e.target.value;render()});
$('#with-explain').addEventListener('change',e=>{state.explain=e.target.checked;render()});
$('#with-answers').addEventListener('change',e=>{state.answers=e.target.checked;$('#with-steps').disabled=!e.target.checked;render()});
$('#with-steps').addEventListener('change',e=>{state.steps=e.target.checked;render()});
$('#with-name').addEventListener('change',e=>{state.name=e.target.checked;render()});
$('#seed').addEventListener('change',e=>{const v=Math.max(1,Math.min(99999,parseInt(e.target.value)||1));state.seed=v;e.target.value=v;render()});
$('#reroll').addEventListener('click',()=>{state.seed=1+Math.floor(Math.random()*99999);$('#seed').value=state.seed;render()});
const pb=$('#print');if(pb)pb.addEventListener('click',()=>window.print());
window.addEventListener('resize',fit);
window.addEventListener('beforeprint',()=>{$('#stack').style.transform='none';$('#stack-wrap').style.height='auto'});
window.addEventListener('afterprint',fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(render);
render();
