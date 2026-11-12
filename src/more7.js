/* ============ 資料D（小5）をもとにした追加：5年の新しい問題タイプ・章の並べかえ・「なぜ？」の図 ============ */
const copyU=(g,id,newId)=>{for(const ch of GRADE_UNITS[g])for(const u of ch.items)if(u.id===id)return{...u,id:newId};throw new Error('no unit '+id)};

const NEW5={
 'g5-decrep':{id:'g5-decrep',title:'小数の表し方（単位）',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'1より小さい位',b:'1を10等分した1つ分が0.1、0.1を10等分した1つ分が0.01、0.01を10等分した1つ分が0.001です。'},{h:'単位をなおす',b:'1m = 100cm なので 1cm = 0.01m、1km = 1000m なので 1m = 0.001km です。',ex:'324cm = 3.24m'}],tip:'<b>こつ</b>　位取りの表に数字を書きこむと、小数点の位置がすぐにわかります。'},
  gen(){const t=ri(0,4);
   if(t===0){const c=ri(101,999);return{q:`${c}cm = {_}m`,tail:'',a:num(c/100),steps:['1cm = 0.01m',`${c} × 0.01 = ${num(c/100)}`]}}
   if(t===1){const m=ri(1001,9999);return{q:`${m}m = {_}km`,tail:'',a:num(m/1000),steps:['1m = 0.001km',`${m} × 0.001 = ${num(m/1000)}`]}}
   if(t===2){const g=ri(101,999)*(chance(.5)?1:10);return{q:`${g}g = {_}kg`,tail:'',a:num(g/1000),steps:['1g = 0.001kg',`${g} × 0.001 = ${num(g/1000)}`]}}
   if(t===3){const n=ri(101,999);return{q:`0.01 を ${n}こ集めた数は {_}`,tail:'',a:num(n/100),steps:[`0.01 × ${n} = ${num(n/100)}`]}}
   const n=ri(1001,9999),v=num(n/1000);return{q:`${v} は 0.001 を {_}こ集めた数`,tail:'',a:String(n),steps:[`${v} ÷ 0.001 = ${n}`]}}},
 'g5-shift':{id:'g5-shift',title:'10倍・100倍・1/10・1/100',kind:'calc',n:12,cols:2,lead:'計算しましょう。',
  explain:{points:[{h:'10倍、100倍、1000倍',b:'10倍すると小数点は右へ1けた、100倍すると2けた、1000倍すると3けたうつります。'},{h:'1/10、1/100',b:'1/10にすると小数点は左へ1けた、1/100にすると2けたうつります。',ex:'21.5 の 1/100 → 0.215'}],tip:'<b>ちゅうい</b>　けたが足りないときは、0を書き足して小数点をうつします。'},
  gen(){const v=pick([ri(11,999)/10,ri(101,9999)/100,ri(2,99)]),k=pick([10,100,1000,0.1,0.01]);const r=num(v*k);
   const lbl=k>=10?`× ${k}`:(k===0.1?'の 1/10':'の 1/100');
   return{q:`${num(v)} ${lbl}`,tail:'<span>=</span>',a:r,steps:[k>=10?`小数点を右へ ${String(k).length-1}けたうつす`:`小数点を左へ ${k===0.1?1:2}けたうつす`]}}},
 'g5-rel':{id:'g5-rel',title:'計算の関係（□を求める）',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'たし算とひき算',b:'□ + 15 = 27 なら □ = 27 − 15、27 − □ = 15 なら □ = 27 − 15。テープ図で考えます。'},{h:'かけ算とわり算',b:'□ × 4 = 24 なら □ = 24 ÷ 4、24 ÷ □ = 6 なら □ = 24 ÷ 6。'}],tip:'<b>こつ</b>　□の場所によって、たすのか・ひくのか・かけるのか・わるのかが変わります。図にかいて確かめましょう。'},
  gen(){const t=ri(0,5);let q,x,st;
   if(t===0){x=ri(5,90);const a=ri(5,90);q=`{_} + ${a} = ${x+a}`;st=[`□ = ${x+a} − ${a}`]}
   else if(t===1){const b=ri(5,60);x=ri(5,60);q=`${x+b} − {_} = ${b}`;st=[`□ = ${x+b} − ${b}（全体 − のこり）`]}
   else if(t===2){x=ri(20,99);const a=ri(2,x-1);q=`{_} − ${a} = ${x-a}`;st=[`□ = ${x-a} + ${a}`]}
   else if(t===3){x=ri(2,12);const a=ri(2,9);q=`{_} × ${a} = ${x*a}`;st=[`□ = ${x*a} ÷ ${a}`]}
   else if(t===4){x=ri(2,9);const b=ri(2,9);q=`${x*b} ÷ {_} = ${b}`;st=[`□ = ${x*b} ÷ ${b}（わられる数 ÷ 商）`]}
   else{const a=ri(2,9),b=ri(2,12);x=a*b;q=`{_} ÷ ${a} = ${b}`;st=[`□ = ${b} × ${a}`]}
   return{q,tail:'',a:String(x),steps:st}}},
 'g5-decorder':{id:'g5-decorder',title:'計算のきまり（小数）',kind:'calc',n:10,cols:2,lead:'くふうして計算しましょう。',
  explain:{points:[{h:'まとめる・分ける',b:'□ × ○ + △ × ○ = (□ + △) × ○ は、小数でも成り立ちます。',ex:'0.8 × 2.6 + 0.2 × 2.6 = 1 × 2.6 = 2.6'},{h:'順番を変える',b:'かけ算は順番を変えても答えは同じです。2.5 × 4 = 10 のように、きりのよい数をつくります。'}],tip:'<b>こつ</b>　たして1や10になる組、かけて10や100になる組をさがしましょう。'},
  gen(){const t=ri(0,3);
   if(t===0){const k=ri(2,9);return{q:`2.5${MUL}${k}${MUL}4`,a:String(10*k),steps:['2.5 × 4 = 10 を先に',`10 × ${k} = ${10*k}`]}}
   if(t===1){const a=ri(1,9)/10,c=ri(11,99)/10;return{q:`${num(a)}${MUL}${num(c)}${ADD}${num(1-a)}${MUL}${num(c)}`,a:num(c),steps:[`(${num(a)} + ${num(1-a)}) × ${num(c)} = 1 × ${num(c)}`]}}
   if(t===2){const w=ri(2,9),d=ri(1,9)/10,k=ri(2,9);return{q:`${num(w+d)}${MUL}${k}`,a:num((w+d)*k),steps:[`(${w} + ${num(d)}) × ${k} = ${w*k} + ${num(d*k)}`,`= ${num((w+d)*k)}`]}}
   const c=ri(11,99)/10;return{q:`1.25${MUL}${num(c)}${MUL}8`,a:num(10*c),steps:['1.25 × 8 = 10 を先に',`10 × ${num(c)} = ${num(10*c)}`]}}},
 'g5-times':{id:'g5-times',title:'小数倍・分数倍',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'何倍かを求める',b:'くらべる量 ÷ もとにする量 で、何倍かがわかります。倍は小数や分数になることもあります。',ex:'24cm は 16cm の 24 ÷ 16 = 1.5（倍）'},{h:'もとにする量を求める',b:'□ の 2.5倍が 30 なら、□ × 2.5 = 30 → □ = 30 ÷ 2.5'}],tip:'<b>こつ</b>　「〇〇の何倍」の〇〇が、もとにする量（1とみる量）です。'},
  gen(){return pick([
   ()=>{const b=ri(2,9)*4,k=pick([1.25,1.5,1.75,2.5,0.75]);const a=num(b*k);return{q:`赤いテープは ${a}cm、青いテープは ${b}cm です。赤いテープの長さは、青いテープの長さの何倍ですか。`,a:`式 ${a} ÷ ${b} = ${num(k)}　答え ${num(k)}倍`,steps:['もとにする量は青いテープ（1とみる）','赤 ÷ 青']}},
   ()=>{const x=ri(4,20)*2,k=pick([1.5,2.5,0.5,1.2]);return{q:`ある数の ${num(k)}倍が ${num(x*k)} です。ある数はいくつですか。`,a:`式 ${num(x*k)} ÷ ${num(k)} = ${x}　答え ${x}`,steps:[`□ × ${num(k)} = ${num(x*k)}`,`□ = ${num(x*k)} ÷ ${num(k)}`]}},
   ()=>{let a,b;do{a=ri(2,9);b=ri(2,9)}while(a===b||gcd(a,b)!==1);return{q:`Aの重さは ${a}kg、Bの重さは ${b}kg です。Aの重さはBの重さの何倍ですか。分数で答えましょう。`,a:`式 ${a} ÷ ${b} = ${F(a,b)}　答え ${A(new Fr(a,b))}倍`,steps:['もとにする量はB',`${a} ÷ ${b} は分数で ${F(a,b)}`]}},
  ])()}},
 'g5-gcd3':{id:'g5-gcd3',title:'3つの数の公倍数・公約数',kind:'calc',n:10,cols:2,lead:'つぎの数を求めましょう。',
  explain:{points:[{h:'3つの数の最小公倍数',b:'いちばん大きい数の倍数を順に調べ、ほかの2つの数でもわり切れる数をさがします。',ex:'(2, 3, 4) → 4, 8, 12 → 12'},{h:'3つの数の最大公約数',b:'いちばん小さい数の約数を大きい順に調べ、ほかの2つの数もわり切れる数をさがします。',ex:'(12, 18, 24) → 6'}],tip:'<b>こつ</b>　まず2つの数で求め、その答えと3つ目の数でもう一度求めることもできます。'},
  gen(){if(chance(.5)){const s=shuffle([2,3,4,5,6,8,9,10,12]).slice(0,3).sort((a,b)=>a-b);let L=s.reduce((a,b)=>a*b/gcd(a,b));if(L>180)return this.gen();return{q:`(${s.join(', ')}) の 最小公倍数`,tail:'<span>→</span>',a:String(L),steps:[`${s[2]} の倍数を順に調べる`,`${L} は ${s[0]} でも ${s[1]} でもわり切れる`]}}
   const g=ri(2,9),m=shuffle([1,2,3,4,5,6,7]).slice(0,3).sort((a,b)=>a-b);if(m.reduce((a,b)=>gcd(a,b))!==1)return this.gen();const s=m.map(x=>x*g);return{q:`(${s.join(', ')}) の 最大公約数`,tail:'<span>→</span>',a:String(g),steps:[`${s[0]} の約数を大きい順に調べる`,`${g} は3つの数をすべてわり切る`]}}},
 'g5-mjudge':{id:'g5-mjudge',title:'倍数の見分け方',kind:'word',n:5,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'2・5・4の倍数',b:'2の倍数は一の位が偶数、5の倍数は一の位が0か5、4の倍数は下2けたが4の倍数（または00）です。'},{h:'3・9の倍数',b:'各位の数字をたした数が3の倍数なら3の倍数、9の倍数なら9の倍数です。',ex:'243 → 2 + 4 + 3 = 9 → 3の倍数でも9の倍数でもある'}],tip:'<b>なぜ？</b>　100 や 10 は 4 や 2 でわり切れるので、下のけたを見ればよいのです。'},
  gen(){const k=pick([2,3,4,5,9]),ns=Array.from({length:6},()=>ri(100,999));if(!ns.some(n=>n%k===0))ns[0]=k*ri(12,110);
   const rule={2:'一の位が偶数',3:'各位の数字の和が3の倍数',4:'下2けたが4の倍数',5:'一の位が0か5',9:'各位の数字の和が9の倍数'}[k];
   const ok=ns.filter(n=>n%k===0);return{q:`つぎの数の中から、${k}の倍数をすべて選びましょう。　${ns.join('、')}`,parts:['答え'],a:`答え ${ok.join('、')}`,steps:[`${k}の倍数の見分け方：${rule}`,...(k===3||k===9?ns.map(n=>`${n} → ${String(n).split('').join(' + ')} = ${String(n).split('').reduce((a,b)=>a+ +b,0)}`).slice(0,3):[])]}}},
 'g5-weekday':{id:'g5-weekday',title:'あまりで分ける（曜日）',kind:'word',n:5,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'7日ごとにくり返す',b:'曜日は7日ごとに同じになります。何日あとかを7でわったあまりで、曜日がわかります。'},{h:'カレンダーで見る',b:'1日と同じ曜日は、8日・15日・22日・29日（7でわると1あまる日）です。'}],tip:'<b>こつ</b>　「□日は1日の何日あとか」を考えて、その数を7でわりましょう。'},
  gen(){const W=['日','月','火','水','木','金','土'],s=ri(0,6),d=ri(9,31),r=(d-1)%7;return{q:`ある月の1日は${W[s]}曜日です。この月の${d}日は何曜日ですか。`,parts:['答え'],a:`答え ${W[(s+r)%7]}曜日`,steps:[`${d}日は1日の ${d-1}日あと`,`${d-1} ÷ 7 = ${Math.floor((d-1)/7)} あまり ${r} → ${W[s]}曜日から ${r}つ進む`]}}},
 'g5-eqfrac':{id:'g5-eqfrac',title:'等しい分数',kind:'calc',n:10,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'分母と分子に同じ数をかける',b:'分母と分子に同じ数をかけても、分数の大きさは変わりません。',ex:`${F(2,3)} = ${F(4,6)} = ${F(6,9)}`},{h:'同じ数でわる',b:'分母と分子を同じ数でわっても大きさは変わりません（約分）。'}],tip:'<b>こつ</b>　分母が何倍になったかを見て、分子にも同じ数をかけます。'},
  gen(){const f=proper(2,9),k=ri(2,6);if(chance(.5))return{q:`<span class="guide-q">${FH(f)} = ${F('{_}',f.d*k)}</span>`,tail:'',blanks:[f.n*k],a:String(f.n*k),steps:[`分母は ${f.d} → ${f.d*k} で ${k}倍`,`分子も ${f.n} × ${k} = ${f.n*k}`]};
   return{q:`<span class="guide-q">${F(f.n*k,f.d*k)} = ${F(f.n,'{_}')}</span>`,tail:'',blanks:[f.d],a:String(f.d),steps:[`分子は ${f.n*k} → ${f.n} で ${k}でわっている`,`分母も ${f.d*k} ÷ ${k} = ${f.d}`]}}},
 'g5-mixedadd':{id:'g5-mixedadd',title:'帯分数のたし算・ひき算',kind:'calc',n:10,cols:2,lead:LEAD_FRAC,
  explain:{points:[{h:'整数部分と分数部分に分ける',b:'通分してから、整数どうし・分数どうしを計算します。'},{h:'ひけないとき',b:'分数部分がひけないときは、整数部分から1くり下げて仮分数にします。'}],tip:'<b>こつ</b>　答えの分数部分が仮分数になったら、整数部分にくり上げます。'},
  gen(){const a=proper(2,8),b=proper(2,8);if(a.d===b.d)return this.gen();const w1=ri(1,4),w2=ri(1,3),x=new Fr(w1*a.d+a.n,a.d),y=new Fr(w2*b.d+b.n,b.d);const L=lcm(a.d,b.d);
   const toM=f=>f.d===1?String(f.n):f.n>f.d?M(Math.floor(f.n/f.d),f.n%f.d,f.d):F(f.n,f.d);
   if(chance(.5))return{q:`${M(w1,a.n,a.d)}${ADD}${M(w2,b.n,b.d)}`,a:toM(x.add(y)),steps:[`通分：${F(a.n*L/a.d,L)} と ${F(b.n*L/b.d,L)}`,`整数 ${w1} + ${w2}、分数 ${F(a.n*L/a.d+b.n*L/b.d,L)}`]};
   const [p,q]=x.n*y.d>=y.n*x.d?[[w1,a,x],[w2,b,y]]:[[w2,b,y],[w1,a,x]];if(p[2].n*q[2].d===q[2].n*p[2].d)return this.gen();
   return{q:`${M(p[0],p[1].n,p[1].d)}${SUB}${M(q[0],q[1].n,q[1].d)}`,a:toM(p[2].sub(q[2])),steps:[`通分してから、整数どうし・分数どうしをひく`,'分数がひけないときは、整数から1くり下げる']}}},
 'g5-frac3':{id:'g5-frac3',title:'3つの分数の計算',kind:'calc',n:10,cols:2,lead:LEAD_FRAC,
  explain:{points:[{h:'3つまとめて通分',b:'3つの分母の最小公倍数で通分してから、左から順に計算します。',ex:`${F(1,2)} + ${F(1,3)} − ${F(1,4)} = ${F(6,12)} + ${F(4,12)} − ${F(3,12)} = ${F(7,12)}`},{h:'2つずつでもよい',b:'はじめの2つを計算してから、3つ目を計算してもかまいません。'}],tip:'<b>こつ</b>　分母の最小公倍数を先に見つけておくと、1回で通分できます。'},
  gen(){for(;;){const fs=[proper(2,6),proper(2,6),proper(2,6)],ops=[pick(['+','−']),pick(['+','−'])];let r=fs[0];const L=fs.reduce((a,f)=>lcm(a,f.d),1);let ok=true;
    ops.forEach((o,i)=>{r=o==='+'?r.add(fs[i+1]):r.sub(fs[i+1]);if(r.n<=0)ok=false});if(!ok)continue;
    return{q:`${FH(fs[0])}<span>${ops[0]}</span>${FH(fs[1])}<span>${ops[1]}</span>${FH(fs[2])}`,a:A(r),steps:[`分母を ${L} にそろえる：${fs.map(f=>F(f.n*L/f.d,L)).join('、')}`,`左から計算 → ${A(r)}`]}}}},
 'g5-fracmix':{id:'g5-fracmix',title:'分数と小数のまじった計算',kind:'calc',n:10,cols:2,lead:'分数か小数にそろえて計算しましょう。',
  explain:{points:[{h:'分数にそろえる',b:'小数は分母が10や100の分数になおせます。いつでも計算できる方法です。',ex:`0.4 = ${F(4,10)} = ${F(2,5)}`},{h:'小数にそろえる',b:'分数が小数にちょうどなおせるとき（1/2、1/4、2/5 など）は、小数にそろえても計算できます。'}],tip:'<b>ちゅうい</b>　1/3 のように小数でちょうど表せない分数があるときは、分数にそろえます。'},
  gen(){const f=proper(2,9),d=tDec(),op=pick(['+','−']);const [x,y,xh,yh]=chance(.5)?[f,d.f,FH(f),d.h]:[d.f,f,d.h,FH(f)];if(op==='−'&&x.n*y.d<=y.n*x.d)return this.gen();const r=op==='+'?x.add(y):x.sub(y);
   return{q:`${xh}<span>${op}</span>${yh}`,a:A(r),steps:[`${d.h} = ${F(d.i,10)}${d.f.d!==10?` = ${FH(d.f)}`:''}`,`分数どうしで計算 → ${A(r)}`]}}},
 'g5-capacity':{id:'g5-capacity',title:'容積と体積の利用',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'容積',b:'入れ物の中にいっぱいに入る水の体積を容積といいます。内のり（内側の長さ）を使って求めます。'},{h:'しずめた物の体積',b:'水の中に物をしずめると、その体積の分だけ水面が上がります。'}],tip:'<b>単位</b>　1000cm³ = 1L です。'},
  gen(){if(chance(.5)){const a=pick([10,20,25,30,40]),b=pick([10,15,20,25]),c=pick([10,20,30]),t=pick([1,2]);return{q:`厚さ ${t}cm の板で作った、外のりがたて ${a+2*t}cm、横 ${b+2*t}cm、高さ ${c+t}cm のふたのない箱があります。この箱の容積は何cm³ですか。また何Lですか。`,a:`式 ${a} × ${b} × ${c} = ${a*b*c}　答え ${a*b*c}cm³（${num(a*b*c/1000)}L）`,steps:[`内のり：たて ${a+2*t} − ${2*t} = ${a}、横 ${b+2*t} − ${2*t} = ${b}、深さ ${c+t} − ${t} = ${c}`,'容積 = 内のりのたて × 横 × 深さ']}}
   return copyU(6,'stone-volume','x').gen()}},
 'g5-congdraw':{id:'g5-congdraw',title:'合同な三角形をかく',kind:'fig',n:2,cols:2,lead:'つぎの三角形をかきましょう（ものさし・コンパス・分度器を使います）。',
  explain:{points:[{h:'3つの決め方',b:'① 3つの辺の長さ　② 2つの辺の長さとその間の角　③ 1つの辺の長さとその両はしの角　のどれかがわかれば、合同な三角形がかけます。'},{h:'コンパスを使う',b:'3つの辺の長さがわかるときは、辺の両はしからコンパスで円をかき、交わったところが頂点です。'}],tip:'<b>こつ</b>　まず1つの辺をひいてから、のこりの頂点の位置を決めます。'},
  gen(){const t=ri(0,2);let b,c,A0,txt;
   if(t===0){let s;do{s=[ri(3,7),ri(3,7),ri(3,7)].sort((x,y)=>x-y)}while(s[0]+s[1]<=s[2]+.5);b=s[2];c=s[1];const a=s[0];A0=Math.acos((b*b+c*c-a*a)/(2*b*c))*180/Math.PI;txt=`3つの辺が ${s[2]}cm、${s[1]}cm、${s[0]}cm の三角形`}
   else if(t===1){b=ri(4,7);c=ri(3,6);A0=ri(6,16)*5;txt=`2つの辺が ${b}cm と ${c}cm で、その間の角が ${A0}° の三角形`}
   else{b=ri(4,7);const B0=ri(6,14)*5;A0=ri(6,14)*5;const C=180-A0-B0;c=b*Math.sin(B0*Math.PI/180)/Math.sin(C*Math.PI/180);txt=`1つの辺が ${b}cm で、その両はしの角が ${A0}° と ${B0}° の三角形`}
   const ra=A0*Math.PI/180,P0=[[0,0],[b,0],[c*Math.cos(ra),-c*Math.sin(ra)]];const xs=P0.map(p=>p[0]),ys=P0.map(p=>p[1]),mn=Math.min(...xs),s=Math.min(70/(Math.max(...xs)-mn),48/(-Math.min(...ys)));
   const P=P0.map(p=>[10+(p[0]-mn)*s,56+p[1]*s]);const fig=SVGW('0 0 100 64',`<rect x="1" y="1" width="98" height="62" fill="none" stroke="#bbb" stroke-width=".4" stroke-dasharray="2 1.5"/>`+'');
   const ans=SVGW('0 0 100 64',`${polyS(P,1,0,0,RED,'none',1.2)}${vLabels(P,['A','B','C'],4.5)}`);
   return{q:`<div class="figcap">${txt}</div><div class="fig">${fig}</div>`,a:`<div class="figcap">${txt}（かき方の例・縮小）</div><div class="fig">${ans}</div>`,figAns:true,steps:[t===0?'辺ABをひき、AとBからコンパスでそれぞれの長さの円をかく → 交わった点がC':t===1?'辺ABをひき、Aで分度器を使って角をはかり、もう1つの辺の長さをとってCを決める':'辺ABをひき、AとBで分度器を使って角をはかって直線をひく → 交わった点がC','3つの頂点を結ぶ']}}},
 'g5-isoangle':{id:'g5-isoangle',title:'二等辺三角形・正三角形の角',kind:'fig',n:6,cols:3,lead:'アの角の大きさを求めましょう。',
  explain:{points:[{h:'二等辺三角形',b:'2つの辺が等しい三角形は、その辺の下の2つの角（底角）も等しくなります。'},{h:'求め方',b:'頂角がわかれば (180° − 頂角) ÷ 2、底角がわかれば 180° − 底角 × 2'}],tip:'<b>ちゅうい</b>　正三角形の角は、どれも 180° ÷ 3 = 60° です。'},
  gen(){const t=ri(0,1),top=t?ri(4,15)*10:0,base=t?(180-top)/2:ri(4,8)*10;const tp=180-base*2;
   const h=40*Math.tan(base*Math.PI/180);const sc=Math.min(1,50/h);const P=[[10,62],[90,62],[50,62-h*sc]];const W2=40,sx=50;
   const P2=[[sx-W2,62],[sx+W2,62],[sx,62-W2*Math.tan(base*Math.PI/180)*sc]];
   const tick=(p,q)=>{const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy);return `<line x1="${num(mx-dy/L*2.5)}" y1="${num(my+dx/L*2.5)}" x2="${num(mx+dy/L*2.5)}" y2="${num(my-dx/L*2.5)}" stroke="#111" stroke-width=".6"/>`};
   const known=t?angLab(P2,2,top+'°',4.4,10)+angLab(P2,1,'ア',4.4,9):angLab(P2,0,base+'°',4.4,9)+angLab(P2,2,'ア',4.4,10);
   return{q:`<div class="fig">${SVGW('0 0 100 68',polyS(P2,1,0,0,'#111','#ededed',1)+tick(P2[0],P2[2])+tick(P2[1],P2[2])+known)}</div><div class="figcap">（二等辺三角形）</div>`,a:`<b>${t?base:tp}°</b>`,steps:t?['底角は2つとも等しい',`(180° − ${top}°) ÷ 2 = ${base}°`]:['底角は2つとも等しいので、もう1つの底角も '+base+'°',`180° − ${base}° × 2 = ${tp}°`]}}},
 'g5-areafind':{id:'g5-areafind',title:'面積から底辺や高さを求める',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'公式を使って□を求める',b:'わからない長さを □ として面積の公式にあてはめ、反対の計算で □ を求めます。'},{h:'三角形',b:'□ × 高さ ÷ 2 = 面積 なので、□ = 面積 × 2 ÷ 高さ'}],tip:'<b>たしかめ</b>　求めた長さで面積を計算し、もとの面積になるか確かめましょう。'},
  gen(){const b=ri(3,14),h=ri(3,12);return pick([
   ()=>({q:`面積が ${b*h}cm² の平行四辺形があります。底辺が ${b}cm のとき、高さは何cm ですか。`,a:`式 ${b*h} ÷ ${b} = ${h}　答え ${h}cm`,steps:[`${b} × □ = ${b*h}`,`□ = ${b*h} ÷ ${b}`]}),
   ()=>{if((b*h)%2)return{q:`面積が ${b*h}cm² の平行四辺形があります。高さが ${h}cm のとき、底辺は何cm ですか。`,a:`式 ${b*h} ÷ ${h} = ${b}　答え ${b}cm`,steps:[`□ × ${h} = ${b*h}`]};return{q:`面積が ${b*h/2}cm² の三角形があります。底辺が ${b}cm のとき、高さは何cm ですか。`,a:`式 ${b*h/2} × 2 ÷ ${b} = ${h}　答え ${h}cm`,steps:[`${b} × □ ÷ 2 = ${b*h/2}`,`□ = ${b*h/2} × 2 ÷ ${b}`]}},
   ()=>{const a=ri(2,8),c=a+ri(2,8),hh=ri(2,10)*2;return{q:`上底が ${a}cm、下底が ${c}cm で、面積が ${(a+c)*hh/2}cm² の台形があります。高さは何cm ですか。`,a:`式 ${(a+c)*hh/2} × 2 ÷ (${a} + ${c}) = ${hh}　答え ${hh}cm`,steps:[`(${a} + ${c}) × □ ÷ 2 = ${(a+c)*hh/2}`,`□ = ${(a+c)*hh/2} × 2 ÷ ${a+c}`]}},
  ])()}},
 'g5-eqarea':{id:'g5-eqarea',title:'等しい面積の三角形',kind:'fig',n:2,cols:1,lead:'2本の直線あ、いは平行です。アの三角形と面積が等しい三角形をすべて選びましょう。',
  explain:{points:[{h:'底辺と高さが同じなら面積も同じ',b:'底辺の長さと高さが等しい三角形は、形がちがっても面積は等しくなります。'},{h:'平行線の間',b:'平行な2本の直線の間では、高さはどこでも同じです。頂点を直線にそって動かしても面積は変わりません。'}],tip:'<b>こつ</b>　底辺の長さ（ます目）と、頂点が上の直線の上にあるかを調べましょう。'},
  gen(){const s=4,H=6,b=ri(2,4);const items=[{n:'ア',base:b,top:true,eq:true}];const pool=shuffle([{base:b,top:true,eq:true},{base:b,top:true,eq:true},{base:b+1,top:true,eq:false},{base:b,top:false,eq:false},{base:Math.max(1,b-1),top:true,eq:false}]).slice(0,4);pool.forEach((p,i)=>items.push({...p,n:'イウエオ'[i]}));
   let x=2,g='';const y0=6,y1=6+H*s;g+=`<line x1="0" y1="${y0}" x2="200" y2="${y0}" stroke="#111" stroke-width=".7"/><line x1="0" y1="${y1}" x2="200" y2="${y1}" stroke="#111" stroke-width=".7"/>`;
   items.forEach(it=>{const off=ri(-1,it.base+1),ty=it.top?y0:y0+2*s,sx=x+Math.max(0,-off)*s;g+=`<polygon points="${sx},${y1} ${sx+it.base*s},${y1} ${sx+off*s},${ty}" fill="${it.n==='ア'?CB:'#ededed'}" stroke="#111" stroke-width=".7"/>`+T(sx+it.base*s/2,y1+6,it.n,4.2);x=sx+Math.max(it.base,off)*s+8});
   g=g.replace(/x2="200"/g,`x2="${x}"`);for(let i=0;i<=x;i+=s)g=`<line x1="${i}" y1="${y0}" x2="${i}" y2="${y1}" stroke="#e2e2e2" stroke-width=".25"/>`+g;
   const ok=items.slice(1).filter(i=>i.eq).map(i=>i.n);
   return{q:`<div class="fig">${SVGW(`0 0 ${x} ${y1+9}`,g+T(x-1,y0-1.5,'あ',3.6,'end')+T(x-1,y1-1.5,'い',3.6,'end'))}</div><div class="figcap">（うすい線は1ますの目もり）</div>`,a:`<b>${ok.join('、')||'なし'}</b>`,steps:['底辺の長さがアと同じで、頂点が直線あの上にある三角形を選ぶ','高さはどれも平行線の間のはば']}}},
 'g5-step':{id:'g5-step',title:'歩はばと道のり',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'歩はば',b:'何回か歩いた長さの平均から、1歩の長さ（歩はば）を求めます。'},{h:'およその道のり',b:'道のり ＝ 歩はば × 歩数 で、およその長さがわかります。'}],tip:'<b>こつ</b>　歩はばは「10歩の長さ ÷ 10」で求められます。'},
  gen(){const st=ri(55,70)/100,n=ri(300,900);const ten=num(st*10);return{q:`10歩で ${ten}m 歩くまさとさんが、家から公園まで歩いたら ${n}歩でした。家から公園までは約何m ですか。四捨五入して整数で答えましょう。`,a:`式 ${ten} ÷ 10 = ${num(st)}、${num(st)} × ${n} = ${num(st*n)}　答え 約${Math.round(st*n)}m`,steps:[`歩はば = ${ten} ÷ 10 = ${num(st)}m`,`道のり = 歩はば × 歩数`]}}},
 'g5-meet':{id:'g5-meet',title:'出会い・追いつき',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'出会う時間',b:'向かい合って進むとき、2人の間は1分間に（速さの和）だけ縮まります。',ex:'時間 ＝ 道のり ÷ 速さの和'},{h:'追いつく時間',b:'同じ向きに進むとき、2人の間は1分間に（速さの差）だけ縮まります。',ex:'時間 ＝ はじめの差 ÷ 速さの差'}],tip:'<b>こつ</b>　線分図をかき、1分間でどれだけ近づくかを考えましょう。'},
  gen(){const a=pick([60,70,80,90]),b=pick([50,60,70,80]);if(chance(.5)){const t=ri(5,20),D=(a+b)*t;return{q:`${D}m はなれた2地点から、兄は分速 ${a}m、弟は分速 ${b}m で向かい合って同時に歩き始めました。2人が出会うのは何分後ですか。`,a:`式 ${D} ÷ (${a} + ${b}) = ${t}　答え ${t}分後`,steps:[`1分間に ${a} + ${b} = ${a+b}m ずつ近づく`,`${D} ÷ ${a+b}`]}}
   const f=Math.max(a,b)+pick([40,60,80]),s=Math.min(a,b),t=ri(4,15),gap=(f-s)*t;return{q:`弟が分速 ${s}m で家を出てから少したち、弟が ${gap}m 先にいるとき、兄が分速 ${f}m で追いかけました。兄が弟に追いつくのは、兄が出発してから何分後ですか。`,a:`式 ${gap} ÷ (${f} − ${s}) = ${t}　答え ${t}分後`,steps:[`1分間に ${f} − ${s} = ${f-s}m ずつ近づく`,`${gap} ÷ ${f-s}`]}}},
 'g5-work':{id:'g5-work',title:'作業の速さ',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'1分あたりの量でくらべる',b:'作業の速さは「1分あたりにできる量」でくらべます。'},{h:'いっしょにするとき',b:'2つが同時に作業すると、1分あたりの量は2つの和になります。'}],tip:'<b>こつ</b>　速さの問題と同じように、「1分あたり」にそろえて考えます。'},
  gen(){const a=pick([75,80,85,90]),b=pick([60,65,70,95]),ta=ri(4,8),tb=ri(4,8);if(chance(.5))return{q:`A の印刷機は ${ta}分で ${a*ta}まい、B の印刷機は ${tb}分で ${b*tb}まい印刷します。速いのはどちらですか。`,a:`式 A ${a*ta} ÷ ${ta} = ${a}、B ${b*tb} ÷ ${tb} = ${b}　答え ${a>b?'A':a<b?'B':'同じ'}`,steps:['1分あたりのまい数でくらべる']};
   const t=ri(6,20);return{q:`1分間に ${a}まい印刷する A と、1分間に ${b}まい印刷する B を同時に使って、${(a+b)*t}まい印刷します。何分かかりますか。`,a:`式 ${(a+b)*t} ÷ (${a} + ${b}) = ${t}　答え ${t}分`,steps:[`いっしょに使うと1分間に ${a+b}まい`]}}},
 'g5-incdec':{id:'g5-incdec',title:'割合を使って（増える・減る）',kind:'word',n:5,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'〇%増し',b:'もとの量を1とすると、20%増しは 1 + 0.2 = 1.2 にあたります。'},{h:'〇%引き',b:'20%引きは 1 − 0.2 = 0.8 にあたります。'}],tip:'<b>こつ</b>　テープ図に「もとの量（1）」と「増えた・減った分」をかきこみましょう。'},
  gen(){const p=pick([10,15,20,25,30,40]),B=pick([200,400,500,600,800,1200]);return pick([
   ()=>({q:`${B}円の品物が ${p}% 引きで売られています。代金は何円ですか。`,a:`式 ${B} × (1 − ${num(p/100)}) = ${num(B*(100-p)/100)}　答え ${num(B*(100-p)/100)}円`,steps:[`${p}% 引き → もとの ${num(1-p/100)}`]}),
   ()=>({q:`去年の参加者は ${B}人でした。今年は去年より ${p}% 増えました。今年の参加者は何人ですか。`,a:`式 ${B} × (1 + ${num(p/100)}) = ${num(B*(100+p)/100)}　答え ${num(B*(100+p)/100)}人`,steps:[`${p}% 増し → もとの ${num(1+p/100)}`]}),
   ()=>({q:`ある品物を ${p}% 引きで買ったら ${num(B*(100-p)/100)}円でした。もとのねだんは何円ですか。`,a:`式 ${num(B*(100-p)/100)} ÷ (1 − ${num(p/100)}) = ${B}　答え ${B}円`,steps:[`もとのねだんを □ とすると、□ × ${num(1-p/100)} = ${num(B*(100-p)/100)}`]}),
  ])()}},
 'g5-sumdiff':{id:'g5-sumdiff',title:'線分図で考える（和と差・倍）',kind:'word',n:4,cols:1,lead:'線分図をかいて考え、式と答えを書きましょう。',
  explain:{points:[{h:'和と差がわかるとき',b:'大きい方 ＝ (和 ＋ 差) ÷ 2、小さい方 ＝ (和 − 差) ÷ 2',ex:'和 50、差 10 → 大 30、小 20'},{h:'何倍かがわかるとき',b:'小さい方を1とみると、和は（倍 ＋ 1）にあたります。'}],tip:'<b>こつ</b>　線分図の長さをそろえるように、差の分をひいたりたしたりします。'},
  gen(){return pick([
   ()=>{const s=ri(10,40),d=ri(2,20),l=s+d;return{q:`姉と妹のシールは合わせて ${s+l}まいで、姉は妹より ${d}まい多く持っています。姉は何まい持っていますか。`,a:`式 (${s+l} + ${d}) ÷ 2 = ${l}　答え ${l}まい`,steps:[`妹に ${d}まいたすと、2人とも姉と同じになる`,`(${s+l} + ${d}) ÷ 2`]}},
   ()=>{const x=ri(50,300)*10,k=ri(2,4);return{q:`兄の貯金は弟の貯金の ${k}倍で、2人の貯金を合わせると ${x*(k+1)}円です。弟の貯金は何円ですか。`,a:`式 ${x*(k+1)} ÷ (${k} + 1) = ${x}　答え ${x}円`,steps:[`弟を1とみると、合わせて ${k} + 1 = ${k+1}`]}},
   ()=>{const c=ri(10,40),d1=ri(2,10),d2=ri(2,10);const b=c+d2,a=b+d1;return{q:`A、B、C の3人でカードを ${a+b+c}まい分けます。AはBより ${d1}まい多く、BはCより ${d2}まい多くなるようにします。Cは何まいですか。`,a:`式 (${a+b+c} − ${d1+d2} − ${d2}) ÷ 3 = ${c}　答え ${c}まい`,steps:[`Cにそろえると、Aは ${d1+d2}まい、Bは ${d2}まい多い`,`全体からその分をひいて 3 でわる`]}},
  ])()}},
 'g5-backward':{id:'g5-backward',title:'逆から考える',kind:'word',n:4,cols:1,lead:'式と答えを書きましょう。',
  explain:{points:[{h:'最後から順にもどる',b:'「〜して、〜したら、〜になった」という問題は、最後の数から順に反対の計算をしてもどります。'},{h:'反対の計算',b:'たした → ひく、ひいた → たす、かけた → わる、わった → かける'}],tip:'<b>こつ</b>　矢印で順番に書き、そのあと矢印を逆向きにたどりましょう。'},
  gen(){return pick([
   ()=>{const x=ri(4,30),a=ri(2,9),b=ri(1,30);return{q:`ある数に ${a} をかけて ${b} をたすと ${x*a+b} になりました。ある数はいくつですか。`,a:`式 (${x*a+b} − ${b}) ÷ ${a} = ${x}　答え ${x}`,steps:[`最後にたした ${b} をひく → ${x*a}`,`かけた ${a} でわる → ${x}`]}},
   ()=>{const r=ri(3,12)*100,u=ri(1,5)*100,k=pick([2,3,4]);const x=(r+u)*k/(k-1);if(x%1)return this.gen();return{q:`持っていたお金の ${F(1,k)} を使い、そのあと ${u}円使ったら、${r}円残りました。はじめに何円持っていましたか。`,a:`式 (${r} + ${u}) ÷ (1 − ${F(1,k)}) = ${x}　答え ${x}円`,steps:[`あとで使った ${u}円をもどす → ${r+u}円`,`これがはじめの ${F(k-1,k)} にあたる → ${r+u} ÷ ${F(k-1,k)}`]}},
  ])()}},
};

/* ---------- 5年の章を資料Dの流れに並べかえる ---------- */
(()=>{const pool={};GRADE_UNITS[5].forEach(c=>c.items.forEach(u=>{pool[u.id]={...u}}));Object.assign(pool,NEW5);
  const cp=(g,id,n)=>{try{pool[n]=copyU(g,id,n)}catch(e){}};
  cp(6,'frac-time','g5-timefrac');cp(6,'prism-count','g5-prism');cp(6,'polygon-sum','g5-polysum');cp(6,'angle-parallel','g5-parallel');cp(6,'speed-units','g5-speedunits');cp(4,'g4-pattern','g5-change');
  const plan=[
   ['整数と小数',['g5-decrep','g5-shift','g5-rel','g5-decorder']],
   ['小数のかけ算・わり算',['g5-decmul','g5-decdiv','g5-decword','g5-decsize','g5-decround','g5-times']],
   ['倍数と約数',['g5-gcd','g5-gcd3','g5-lcmword','g5-evenodd','g5-mjudge','g5-weekday']],
   ['分数のたし算・ひき算',['g5-eqfrac','g5-reduce','g5-fadd','g5-mixedadd']],
   ['分数と小数・分数のいろいろな計算',['g5-fracdec','g5-frac3','g5-fracmix','g5-timefrac']],
   ['体積',['g5-vol','g5-volcombo','g5-volunit','g5-capacity']],
   ['合同な図形',['g5-cong','g5-congdraw']],
   ['三角形・四角形の角',['g5-tri','g5-isoangle','g5-quadangle','g5-polysum','g5-parallel']],
   ['三角形・四角形の面積',['g5-area','g5-areafind','g5-eqarea']],
   ['正多角形と円・角柱と円柱',['g5-polygon','g5-circum','g5-prism']],
   ['単位量あたり',['g5-avg','g5-density','g5-step']],
   ['速さ',['g5-speed','g5-speedunits','g5-meet','g5-work']],
   ['割合',['g5-percent','g5-pconv','g5-incdec','g5-band','g5-pie']],
   ['変わり方と比例',['g5-prop','g5-change']],
   ['文章題（線分図）',['g5-sumdiff','g5-backward']]];
  const used=new Set(),chs=plan.map(([ch,ids])=>({ch,items:ids.filter(id=>pool[id]).map(id=>{used.add(id);return pool[id]})}));
  const rest=Object.keys(pool).filter(id=>!used.has(id));if(rest.length)chs[1].items.push(...rest.map(id=>pool[id]));
  GRADE_UNITS[5]=chs})();

/* ---------- 「なぜ？」の図（5年の追加分） ---------- */
WHY['g5-timefrac']=()=>WHY['frac-time']();WHY['g5-prism']=()=>WHY['prism-count']();WHY['g5-polysum']=()=>WHY['polygon-sum']();WHY['g5-parallel']=()=>WHY['angle-parallel']();WHY['g5-speedunits']=()=>WHY['speed-units']();WHY['g5-change']=()=>WHY['g4-pattern']();
WHY['g5-gcd3']=()=>WHY['g5-gcd']();WHY['g5-mixedadd']=WHY['g5-frac3']=()=>WHY['g5-fadd']();WHY['g5-fracmix']=()=>WHY['f-three']();WHY['g5-capacity']=()=>WHY['stone-volume']();WHY['g5-step']=()=>WHY['g5-avg']();WHY['g5-work']=()=>WHY['g5-density']();
WHY['g5-decrep']=()=>{const cols=['十','一','.','1/10','1/100','1/1000'];let g='';cols.forEach((c,i)=>g+=box(6+i*14,4,14,8,i===2?'#fff':'#eef4fb',.4)+T(13+i*14,9.8,c,3.2));['','3','.','2','4',''].forEach((d,i)=>g+=box(6+i*14,12,14,10,'#fff',.4)+T(13+i*14,19.6,d,5));g+=T(96,14,'324cm',3.6,'start')+T(96,21,'= 3.24m',3.6,'start');
  return W1(SVGW('0 0 124 26',g),'位取りの表',['1m = 100cm なので、1cm は 1m の 1/100（0.01m）','324cm は 1m が 3こ、0.1m が 2こ、0.01m が 4こ → 3.24m','表に書きこむと、小数点の位置がまちがえにくい'])};
WHY['g5-shift']=()=>{let g='';['百','十','一','.','1/10','1/100'].forEach((c,i)=>g+=T(12+i*13,8,c,3.2));[['','2','1','.','5',''],['2','1','5','.','','']].forEach((r,j)=>r.forEach((d,i)=>g+=box(6+i*13,11+j*12,12,10,'#fff',.3)+T(12+i*13,18.5+j*12,d,4.6)));g+=`<path d="M86,16 q8,6 0,12" fill="none" stroke="#c0392b" stroke-width=".6"/>`+T(92,24,'10倍',3.4,'start');
  return W1(SVGW('0 0 120 36',g),'21.5 の 10倍',['10倍すると、どの数字も1つ上の位にうつる','数字はそのままで、小数点が右へ1けたうつったように見える','1/10 にすると、左へ1けたうつる'])};
WHY['g5-rel']=()=>W1(SVGW('0 0 100 28',tape(6,6,50,9,CB,'□')+tape(56,6,30,9,CR,'15')+`<line x1="6" y1="19" x2="86" y2="19" stroke="#111" stroke-width=".5"/>`+T(46,25,'27',3.8)),'□ + 15 = 27',['テープ全体が 27、そのうち 15 がわかっている','□ = 27 − 15 = 12','かけ算・わり算も、テープを同じ長さで区切ると同じように考えられる']);
WHY['g5-decorder']=()=>{let g='';for(let r=0;r<3;r++)for(let c=0;c<10;c++)g+=dot(8+c*6,8+r*6,2,c<7?CB:CR);g+=T(30,30,'7こ',3.4)+T(57,30,'3こ',3.4)+T(74,14,'7 × 3 + 3 × 3',3.6,'start')+T(74,22,'= (7 + 3) × 3',3.6,'start');
  return W1(SVGW('0 0 128 34',g),'まとめて数える',['●の数を、青と赤べつべつに数えてたしても、まとめて数えても同じ','(□ + △) × ○ = □ × ○ + △ × ○ は、小数でも同じように使える'])};
WHY['g5-times']=()=>{let g=tape(6,6,72,8,CR,'赤 24cm')+tape(6,18,48,8,CB,'青 16cm（1とみる）')+`<line x1="54" y1="4" x2="54" y2="30" stroke="#999" stroke-dasharray="1.5 1" stroke-width=".4"/>`+T(54,33,'1',3.4)+T(78,33,'1.5',3.4);
  return W1(SVGW('0 0 100 36',g),'何倍？',['青いテープを 1 とみると、赤いテープは 1.5 にあたる','24 ÷ 16 = 1.5（倍）。倍は小数や分数になることもある'])};
WHY['g5-mjudge']=()=>{let g=flat(4,4)+flat(26,4)+stick(50,4)+stick(56,4)+stick(62,4);for(let i=0;i<4;i++)g+=one(70+(i%2)*5,4+Math.floor(i/2)*5);g+=T(40,32,'100 は 4 でわり切れる',3.2)+T(84,12,'下2けた（24）だけ',3.4,'start')+T(84,19,'見ればよい',3.4,'start');
  return W1(SVGW('0 0 130 36',g),'4の倍数の見分け方',['100、200… は必ず 4 でわり切れる','だから 4 でわり切れるかどうかは、下2けたで決まる','3の倍数は、10 や 100 を 3 でわると 1 あまるので、各位の数字の和で決まる'])};
WHY['g5-weekday']=()=>{const W=['日','月','火','水','木','金','土'];let g='';W.forEach((w,i)=>g+=T(10+i*11,7,w,3.4));for(let d=1;d<=21;d++){const i=(d+1)%7,r=Math.floor((d+1)/7);g+=box(5+i*11,9+r*8,10,7,d%7===1?CB:'#fff',.3)+T(10+i*11,14.2+r*8,d,3.2)}
  return W1(SVGW('0 0 84 36',g),'7日ごとに同じ曜日',['1日・8日・15日・22日 は同じ曜日（7ずつ増える）','□日の曜日は、(□ − 1) を 7 でわったあまりの分だけ、1日の曜日から進める'])};
WHY['g5-eqfrac']=()=>{let g='';for(let i=0;i<3;i++)g+=box(6+i*20,6,20,10,i<2?CB:'#fff',.5);for(let i=0;i<6;i++)g+=box(6+i*10,20,10,10,i<4?CB:'#fff',.5);g+=T(70,13,'2/3',3.8,'start')+T(70,27,'= 4/6',3.8,'start');
  return W1(SVGW('0 0 90 34',g),'2/3 = 4/6',['1つ分をさらに半分に分けると、分母も分子も2倍になる','色のついた部分の大きさは変わらない → 等しい分数'])};
WHY['g5-congdraw']=()=>{let g=`<line x1="10" y1="34" x2="60" y2="34" stroke="#111" stroke-width="1"/>`+`<path d="M24,10 A30,30 0 0 1 48,14" fill="none" stroke="#2a6fb0" stroke-width=".5"/><path d="M28,8 A26,26 0 0 1 54,16" fill="none" stroke="#c0392b" stroke-width=".5"/>`+dot(37,11,1.2)+T(8,38,'A',3.4,'end')+T(62,38,'B',3.4,'start')+T(37,8,'C',3.4)+T(70,16,'Aから AC の長さ',3.2,'start')+T(70,23,'Bから BC の長さ',3.2,'start')+T(70,30,'で円をかく',3.2,'start');
  return W1(SVGW('0 0 120 40',g),'3つの辺の長さからかく',['まず辺ABをひく','Aを中心に AC、Bを中心に BC の長さでコンパスの円をかく','2つの円が交わった点がC。これで1通りに決まるので合同になる'])};
WHY['g5-isoangle']=()=>{let g=`<polygon points="10,36 50,36 30,6" fill="#eef4fb" stroke="#111" stroke-width=".7"/><line x1="30" y1="6" x2="30" y2="36" stroke="#c0392b" stroke-dasharray="2 1" stroke-width=".6"/>`+T(16,33,'○',3.4)+T(44,33,'○',3.4)+T(58,16,'まん中で折ると',3.4,'start')+T(58,24,'ぴったり重なる',3.4,'start')+T(58,32,'→ 底角は等しい',3.4,'start');
  return W1(SVGW('0 0 116 40',g),'二等辺三角形の角',['二等辺三角形は、まん中の線で折るとぴったり重なる','だから下の2つの角（底角）は等しい','底角 = (180° − 頂角) ÷ 2'])};
WHY['g5-areafind']=()=>WHY['g5-area']();
WHY['g5-eqarea']=()=>{let g=`<line x1="4" y1="8" x2="96" y2="8" stroke="#111" stroke-width=".7"/><line x1="4" y1="34" x2="96" y2="34" stroke="#111" stroke-width=".7"/><polygon points="20,34 44,34 28,8" fill="${CB}" fill-opacity=".7" stroke="#111" stroke-width=".6"/><polygon points="20,34 44,34 70,8" fill="${CR}" fill-opacity=".5" stroke="#111" stroke-width=".6"/>`+arrowR(32,5,66,'頂点を動かす');
  return W1(SVGW('0 0 100 38',g),'平行線の間で頂点を動かす',['底辺はそのままで、頂点を上の直線にそって動かす','高さ（平行線の間のはば）は変わらないので、面積も変わらない'])};
WHY['g5-meet']=()=>{let g=`<line x1="6" y1="18" x2="94" y2="18" stroke="#111" stroke-width=".6"/>`+dot(6,18,1.4)+dot(94,18,1.4)+arrowR(6,12,40,'分速80m')+`<path d="M94,24 H60 m2,-1.5 l-2,1.5 l2,1.5" fill="none" stroke="#111" stroke-width=".7"/>`+T(77,30,'分速60m',3.6)+T(50,6,'1分間に 80 + 60 = 140m ずつ近づく',3.4);
  return W1(SVGW('0 0 100 34',g),'出会うまでの時間',['向かい合って進むと、2人の間は1分間に速さの和だけ縮まる','出会う時間 = はじめの道のり ÷ 速さの和','同じ向きに追いかけるときは、速さの差だけ縮まる'])};
WHY['g5-incdec']=()=>{let g=tape(6,6,60,9,CB,'もとの量 1（100%）')+tape(66,6,12,9,CR,'0.2')+`<line x1="6" y1="19" x2="78" y2="19" stroke="#111" stroke-width=".5"/>`+T(42,25,'20%増し ＝ 1.2',3.6);
  return W1(SVGW('0 0 90 28',g),'20%増し',['もとの量を 1 とすると、20%増しは 1 + 0.2 = 1.2','20%引きは 1 − 0.2 = 0.8','代金 = もとのねだん × 0.8'])};
WHY['g5-sumdiff']=()=>{let g=tape(6,6,50,8,CB,'姉')+tape(56,6,14,8,CR,'差')+tape(6,18,50,8,CB,'妹')+`<path d="M74,6 v20" stroke="#111" stroke-width=".5"/>`+T(78,17,'和',3.6,'start');
  return W1(SVGW('0 0 90 30',g),'和と差の線分図',['妹に差の分をたすと、2人とも姉と同じ長さになる','だから 姉 = (和 + 差) ÷ 2、妹 = (和 − 差) ÷ 2'])};
WHY['g5-backward']=()=>{let g=box(4,8,16,9,'#fff',.6)+T(12,14,'□',4)+arrowR(22,12,38,'×3')+box(40,8,16,9,'#fff',.6)+arrowR(58,12,74,'＋5')+box(76,8,16,9,CB,.6)+T(84,14,'26',3.8)+`<path d="M76,24 H8 m2,-1.5 l-2,1.5 l2,1.5" fill="none" stroke="#c0392b" stroke-width=".7"/>`+T(46,30,'逆にたどる：26 − 5 = 21、21 ÷ 3 = 7',3.4).replace('fill="#111"','fill="#c0392b"');
  return W1(SVGW('0 0 96 34',g),'逆から考える',['した順に矢印で書く','最後の数から、矢印を逆にたどって反対の計算をする'])};
