/* ============ 資料H（小6のミニドリルと確認テスト）をもとにした追加 ============ */
const NEW6H={
 'f-tomul':{id:'f-tomul',title:'かけ算だけの式になおす',kind:'calc',n:12,cols:2,lead:'わり算をかけ算になおして、かけ算だけの式で計算しましょう。',
  explain:{points:[{h:'わり算は逆数のかけ算',b:'□ でわることは、□ の逆数 1/□ をかけることと同じです。',ex:`7 ÷ 6 × 3 = 7 × ${F(1,6)} × 3`},{h:'まとめて約分',b:'かけ算だけの式にすると、1つの分数にまとめて、最後に約分できます。'}],tip:'<b>ちゅうい</b>　わり算をかけ算になおすときは、わる数だけを逆数にします。'},
  gen(){const a=ri(2,12),b=ri(2,12),c=ri(2,12),t=ri(0,2);let q,f,st;
   if(t===0){q=`${a} ÷ ${b} × ${c}`;f=new Fr(a*c,b);st=[`${a} × ${F(1,b)} × ${c} = ${F(a+' × '+c,b)}`]}
   else if(t===1){q=`${a} × ${b} ÷ ${c}`;f=new Fr(a*b,c);st=[`${a} × ${b} × ${F(1,c)} = ${F(a+' × '+b,c)}`]}
   else{q=`${a} ÷ ${b} ÷ ${c}`;f=new Fr(a,b*c);st=[`${a} × ${F(1,b)} × ${F(1,c)} = ${F(a,b+' × '+c)}`]}
   if(f.d===1&&chance(.7))return this.gen();return{q,tail:'<span>=</span>',a:A(f),steps:[...st,'約分して '+FH(f)]}}},
 'prop-use':{id:'prop-use',title:'比例を使って数を求める',kind:'word',n:4,cols:1,lead:'比例の関係を使って、式と答えを書きましょう。',
  explain:{points:[{h:'数えずに重さではかる',b:'紙やくぎの枚数（本数）と重さは比例します。少しの量の重さをはかると、全体の数がわかります。'},{h:'何倍かを考える',b:'全体の重さが、はかった重さの何倍かを求めて、その数だけ枚数も倍にします。',ex:'50まいで 140g、全体 1960g → 1960 ÷ 140 = 14（倍）→ 50 × 14 = 700まい'}],tip:'<b>こつ</b>　1まいあたりの重さを求めるより、何倍かを考えるほうが計算が楽なことがあります。'},
  gen(){return pick([
   ()=>{const n=pick([10,20,25,50]),w=ri(3,9)*n/5*2,k=ri(6,30);const W=w*k;return{q:`画用紙 ${n}まいの重さをはかったら ${num(w)}g でした。同じ画用紙の束全体の重さは ${num(W)}g です。画用紙は全部で何まいありますか。`,a:`式 ${num(W)} ÷ ${num(w)} = ${k}、${n} × ${k} = ${n*k}　答え ${n*k}まい`,steps:['まい数と重さは比例する',`重さは ${num(W)} ÷ ${num(w)} = ${k}倍`,`まい数も ${k}倍`]}},
   ()=>{const n=pick([10,20,30]),w=ri(2,8)*5,k=ri(5,40);return{q:`くぎ ${n}本の重さは ${w}g です。同じくぎ ${n*k}本の重さは何g ですか。`,a:`式 ${n*k} ÷ ${n} = ${k}、${w} × ${k} = ${w*k}　答え ${w*k}g`,steps:[`本数は ${n*k} ÷ ${n} = ${k}倍`,`重さも ${k}倍`]}},
   ()=>{const t=ri(2,6),d=ri(3,9)*10,k=ri(3,8);return{q:`水道から ${t}分間で ${d}L の水が出ます。同じ割合で水を出すとき、${d*k}L 入れるには何分かかりますか。`,a:`式 ${d*k} ÷ ${d} = ${k}、${t} × ${k} = ${t*k}　答え ${t*k}分`,steps:['時間と水の量は比例する',`水の量は ${k}倍 → 時間も ${k}倍`]}},
  ])()}},
 'water-weight':{id:'water-weight',title:'水の体積と重さ',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。（水の体積と重さの関係を使います）',
  explain:{points:[{h:'水の体積と重さ',b:'水 1cm³（1mL）の重さは 1g、水 1L（1000cm³）の重さは 1kg、水 1m³ の重さは 1t です。'},{h:'単位をそろえる',b:'L → mL（cm³）→ g と、順に単位をかえて考えます。'}],tip:'<b>こつ</b>　1mL = 1cm³ = 1g（水のとき）をおぼえておくと便利です。'},
  gen(){const t=ri(0,4);
   if(t===0){const v=ri(11,99)/10;return{q:`水 ${num(v)}kg の体積は {_}cm³`,tail:'',a:num(v*1000),steps:['水 1kg = 1000cm³',`${num(v)} × 1000 = ${num(v*1000)}`]}}
   if(t===1){const m=ri(1,19)*50;return{q:`水 ${m}mL の重さは {_}g`,tail:'',a:String(m),steps:['水 1mL の重さは 1g']}}
   if(t===2){const m=ri(1,19)*50;return{q:`水 ${m}mL の重さは {_}kg`,tail:'',a:num(m/1000),steps:['水 1mL = 1g',`${m}g = ${num(m/1000)}kg`]}}
   if(t===3){const L=ri(2,30);return{q:`水 ${L}L の重さは {_}kg`,tail:'',a:String(L),steps:['水 1L の重さは 1kg']}}
   const m=ri(2,9);return{q:`水 ${m}m³ の重さは {_}t`,tail:'',a:String(m),steps:['水 1m³ = 1000L = 1000kg = 1t']}}},
};

/* ---------- 論理パズル（順位あて） ---------- */
const PZ_H={id:'pz-logic',title:'順位あてパズル',kind:'word',n:4,cols:1,lead:'ヒントをすべて使って、4人の順位を答えましょう。同じ順位の人はいません。',parts:['答え'],
  explain:{points:[{h:'表に○と×を書く',b:'たてに名前、横に順位の表をつくり、ありえない所に×、決まった所に○を書きます。'},{h:'決まったら消していく',b:'ある人の順位が決まったら、その順位にはほかの人は入れません。たてと横の両方に×をつけます。'}],tip:'<b>こつ</b>　「□位だった」のような、すぐ決まるヒントから使いましょう。'},
  gen(){const N=['あおい','けんた','さくら','だいき'];const perms=[];const pm=(a,r)=>{if(!a.length)return perms.push(r);a.forEach((x,i)=>pm(a.filter((_,j)=>j!==i),[...r,x]))};pm([0,1,2,3],[]);
   const sol=shuffle([0,1,2,3]);const rk=p=>{const r=[];p.forEach((who,i)=>r[who]=i+1);return r};const R=rk(sol);
   const mk=()=>{const x=ri(0,3);let y=ri(0,3);while(y===x)y=ri(0,3);const t=ri(0,4);
    if(t===0)return{s:`${N[x]}さんは ${R[x]}位でした。`,f:r=>r[x]===R[x],w:3};
    if(t===1){let k=ri(1,4);while(k===R[x])k=ri(1,4);return{s:`${N[x]}さんは ${k}位ではありませんでした。`,f:r=>r[x]!==k,w:1}}
    if(t===2)return R[x]<R[y]?{s:`${N[x]}さんは ${N[y]}さんより上の順位でした。`,f:r=>r[x]<r[y],w:1}:{s:`${N[x]}さんは ${N[y]}さんより下の順位でした。`,f:r=>r[x]>r[y],w:1};
    if(t===3){if(R[y]-R[x]!==1)return null;return{s:`${N[x]}さんは ${N[y]}さんのすぐ上の順位でした。`,f:r=>r[y]-r[x]===1,w:2}}
    if(Math.abs(R[x]-R[y])!==1)return{s:`${N[x]}さんと ${N[y]}さんの順位はとなりどうしではありません。`,f:r=>Math.abs(r[x]-r[y])!==1,w:1};return{s:`${N[x]}さんと ${N[y]}さんの順位はとなりどうしです。`,f:r=>Math.abs(r[x]-r[y])===1,w:1}};
   for(let tries=0;tries<200;tries++){let cl=[];for(let i=0;i<14&&cl.length<8;i++){const c=mk();if(c&&!cl.some(d=>d.s===c.s))cl.push(c)}
    const cnt=cs=>perms.filter(p=>{const r=rk(p);return cs.every(c=>c.f(r))}).length;if(cnt(cl)!==1)continue;
    for(const c of shuffle([...cl])){const rest=cl.filter(d=>d!==c);if(cnt(rest)===1)cl=rest}
    if(cl.filter(c=>c.w===3).length>1||cl.length<3)continue;
    return{q:`4人でかけっこをしました。<br>${cl.map((c,i)=>`ヒント${i+1}：${c.s}`).join('<br>')}`,parts:['答え'],a:`答え ${sol.map((w,i)=>`${i+1}位 ${N[w]}`).join('、')}`,steps:['名前と順位の表に、ヒントから○×を書きこむ',...cl.map((c,i)=>`ヒント${i+1}をみたすか、たしかめる`).slice(0,2),'すべてのヒントに合うならべ方は1通りだけ']}}
   return this.gen()}};

/* ---------- 6年に入れる ---------- */
(()=>{const ch=n=>{const c=GRADE_UNITS[6].find(x=>x.ch===n);if(!c)throw new Error('no chapter '+n);return c};
  ch('分数のいろいろな計算').items.push(NEW6H['f-tomul']);ch('比例と反比例').items.push(NEW6H['prop-use']);ch('中学への準備（復習）').items.push(NEW6H['water-weight']);
  const items=[];const cp=(g,id,nid,title)=>{const u=copyU(g,id,nid);if(title)u.title=title;items.push(u);WHY[nid]=()=>WHY[id]?WHY[id]():[]};
  cp(3,'g3-add','r6-add','整数のたし算（復習）');cp(3,'g3-sub','r6-sub','整数のひき算（復習）');cp(3,'g3-mul','r6-mul','整数のかけ算（復習）');cp(4,'g4-div2','r6-div','整数のわり算（復習）');
  cp(4,'g4-order','r6-order','計算の順序（復習）');cp(4,'g4-rule','r6-rule','計算のきまり（復習）');cp(5,'g5-calcest','r6-calcest');cp(5,'g5-unitmix','r6-unitmix');
  const pos=GRADE_UNITS[6].findIndex(x=>x.ch==='中学への準備（復習）');GRADE_UNITS[6].splice(pos,0,{ch:'計算の復習（ミニドリル）',items});
  PUZZLE_CHAPTER.items.push(PZ_H)})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['f-tomul']=()=>{let g=T(6,10,'7 ÷ 6 × 3',4.2,'start')+arrowR(46,9,58,'')+T(62,10,`7 × 1/6 × 3`,4.2,'start')+T(6,24,'÷6 は「6等分の1つ分」',3.4,'start')+T(6,31,'＝ 1/6 をかけるのと同じ',3.4,'start');
  return W1(SVGW('0 0 112 34',g),'わり算を逆数のかけ算に',['6 でわることと、1/6 をかけることは同じ大きさになる','かけ算だけにすると、順番を入れかえたり、まとめて約分したりできる','7 × 1/6 × 3 = 21/6 = 7/2'])};
WHY['prop-use']=()=>{let g='';for(let i=0;i<3;i++)g+=box(6+i*3,6-i*2,22,14,'#fff',.4);g+=T(20,27,'50まい 140g',3.2)+arrowR(36,14,50,'×14')+`<rect x="56" y="2" width="28" height="22" fill="${CB}" stroke="#111" stroke-width=".4"/>`+T(70,15,'全部',3.4)+T(70,30,'1960g → 700まい',3.2);
  return W1(SVGW('0 0 100 34',g),'重さで数をはかる',['まい数が2倍、3倍…になると、重さも2倍、3倍…になる（比例）','重さが何倍かを調べれば、まい数も同じ倍だけある'])};
WHY['water-weight']=()=>{let g=box(6,6,20,20,CB,.5)+T(16,18,'1L',4)+T(16,31,'1kg',3.6)+box(40,14,6,6,CB,.4)+T(43,31,'1cm³ = 1g',3.2)+T(60,10,'1L = 1000cm³',3.4,'start')+T(60,18,'1000g = 1kg',3.4,'start')+T(60,26,'1m³ = 1000L → 1t',3.4,'start');
  return W1(SVGW('0 0 120 34',g),'水の体積と重さ',['水は 1cm³ がちょうど 1g になるように重さの単位が決められた','だから 1L（1000cm³）は 1kg、1m³（1000L）は 1t'])};
WHY['pz-logic']=()=>{const N=['あ','け','さ','だ'];let g='';['','1位','2位','3位','4位'].forEach((h,i)=>g+=box(4+i*12,3,12,6,'#eef4fb',.3)+T(10+i*12,7.4,h,2.8));N.forEach((n,r)=>{g+=box(4,9+r*6,12,6,'#eef4fb',.3)+T(10,13.4+r*6,n,3);for(let c=0;c<4;c++){const v=(r===2&&c===0)?'○':(r===2||c===0)?'×':'';g+=box(16+c*12,9+r*6,12,6,v==='○'?CR:'#fff',.3)+T(22+c*12,13.4+r*6,v,3)}});g+=T(70,14,'「さくらは1位」なら',3.2,'start')+T(70,21,'さくらの行と1位の列の',3.2,'start')+T(70,28,'ほかの所に×',3.2,'start');
  return W1(SVGW('0 0 120 34',g),'○×の表で整理する',['決まった所に○を書くと、同じ行と同じ列のほかの所は×になる','×が3つになった行や列は、残りの1つが○に決まる'])};
