/* ============ 資料I（小3の教科書にそった問題集）をもとにした追加 ============ */
const tbl=(head,rows,opt={})=>`<table style="border-collapse:collapse;font-size:${opt.fs||9.5}pt;margin:1mm 0">${head?`<tr>${head.map(h=>`<th style="border:1px solid #333;padding:1px 6px;background:#eef4fb;font-weight:500">${h}</th>`).join('')}</tr>`:''}${rows.map(r=>`<tr>${r.map((c,i)=>`<td style="border:1px solid #333;padding:1px 6px;text-align:${i?'center':'left'};min-width:7mm">${c}</td>`).join('')}</tr>`).join('')}</table>`;
const yenN=n=>`${n}円`;
const NEW3I={
 'g3-hundreds':{id:'g3-hundreds',title:'何百・何千の 計算',kind:'calc',n:22,cols:2,lead:'つぎの 計算を しましょう。',
  explain:{points:[{h:'100 の いくつ分',b:'800 + 400 は、100 が 8こ と 4こ で 12こ → 1200'},{h:'1000 の いくつ分',b:'7000 − 2000 は、1000 が 7こ から 2こ とって 5こ → 5000'}],tip:'<b>こつ</b>　100円玉や 1000円さつの まいすうで 考えると かんたんです。'},
  gen(){const big=chance(.35),u=big?1000:100,a=ri(2,big?9:15),b=ri(1,big?9:9),add=chance(.5);if(!add&&a<=b)return this.gen();if(add&&big&&a+b>9&&chance(.5))return this.gen();
   return{q:`${a*u} ${add?'+':'−'} ${b*u}`,a:String(add?(a+b)*u:(a-b)*u),steps:[`${u} が ${a}こ ${add?'と':'から'} ${b}こ ${add?'で':'とって'} ${add?a+b:a-b}こ`]}}},
 'g3-kufu':{id:'g3-kufu',title:'計算の くふう',kind:'calc',n:14,cols:2,lead:'くふうして 計算しましょう。□には あてはまる 数を 書きましょう。',
  explain:{points:[{h:'たし算の じゅんじょを かえる',b:'3つの 数の たし算は、どこから 先に たしても 答えは 同じです。きりの よい 数に なる 組を 先に たします。',ex:'178 + 45 + 55 = 178 + (45 + 55) = 178 + 100'},{h:'かけ算の まとまり',b:'(3 + 7) × 6 = 3 × 6 + 7 × 6 のように、分けて かけても 同じです。'}],tip:'<b>こつ</b>　たして 100 や 10 に なる 数を さがしましょう。'},
  gen(){const t=ri(0,4);
   if(t===0){const a=ri(101,899),b=ri(11,89),c=100-b;return{q:`${a} + ${b} + ${c}`,tail:'<span>=</span>',a:String(a+100),steps:[`${b} + ${c} = 100 を 先に`,`${a} + 100 = ${a+100}`]}}
   if(t===1){const a=ri(11,49);return{q:`${a} × 2 × 5`,tail:'<span>=</span>',a:String(a*10),steps:['2 × 5 = 10 を 先に',`${a} × 10 = ${a*10}`]}}
   if(t===2){const a=ri(2,9),b=10-a,c=ri(2,9);return{q:`(${a} + ${b}) × ${c} = ${a} × ${c} + {_} × ${c}`,tail:'',a:String(b),steps:['まとめて かけても、分けて かけても 同じ',`10 × ${c} = ${10*c}`]}}
   if(t===3){const a=ri(11,19),b=a-10,c=ri(2,9);return{q:`(${a} − ${b}) × ${c} = ${a} × ${c} − ${b} × {_}`,tail:'',a:String(c),steps:[`10 × ${c} = ${a*c} − ${b*c}`]}}
   const a=ri(21,89),n=pick([98,99,97]);return{q:`${a} + ${n} = ${a} + 100 − {_}`,tail:'',a:String(100-n),steps:[`${n} は 100 より ${100-n} 小さい`,`${a} + 100 − ${100-n} = ${a+n}`]}}},
 'g3-table2':{id:'g3-table2',title:'表を 1つに まとめる',kind:'fig',n:2,cols:1,lead:'3つの 表を 1つの 表に まとめました。ア・イ・ウに あてはまる 数を 書きましょう。',parts:['ア','イ','ウ'],
  explain:{points:[{h:'たてと よこの 表',b:'組ごとの 表を 1つに まとめると、たてに 場所、よこに 組を ならべた 表に なります。'},{h:'合計の らん',b:'いちばん 右の らんは よこに たした 数、いちばん 下の らんは たてに たした 数です。右下は 全体の 人数です。'}],tip:'<b>たしかめ</b>　たての 合計を たした 数と、よこの 合計を たした 数は 同じに なります。'},
  gen(){const P=shuffle(['こうえん','としょかん','校てい','家','じどう館']).slice(0,4),C=['1組','2組','3組'];const v=P.map(()=>C.map(()=>ri(2,12)));
   const small=C.map((c,j)=>`<div style="display:inline-block;margin-right:3mm;vertical-align:top"><div style="font-size:9pt">${c}</div>${tbl(['場所','人数'],P.map((p,i)=>[p,v[i][j]]).concat([['合計',P.reduce((s,_,i)=>s+v[i][j],0)]]),{fs:8.5})}</div>`).join('');
   const pi=ri(0,3),cj=ri(0,2);const rowT=P.map((_,i)=>v[i].reduce((a,b)=>a+b,0)),colT=C.map((_,j)=>P.reduce((s,_,i)=>s+v[i][j],0)),G=rowT.reduce((a,b)=>a+b,0);
   const rows=P.map((p,i)=>[p,...C.map((_,j)=>v[i][j]),i===pi?'<b>ア</b>':rowT[i]]).concat([['合計',...C.map((_,j)=>j===cj?'<b>イ</b>':colT[j]),'<b>ウ</b>']]);
   return{q:`<div>${small}</div><div style="font-size:9pt;margin-top:1mm">まとめた 表</div>${tbl(['場所',...C,'合計'],rows)}`,parts:['ア','イ','ウ'],a:`ア ${rowT[pi]}　イ ${colT[cj]}　ウ ${G}`,steps:[`ア：${P[pi]}の 3組分を たす → ${v[pi].join(' + ')} = ${rowT[pi]}`,`イ：${C[cj]}の 合計 → ${colT[cj]}`,`ウ：全体 → ${colT.join(' + ')} = ${G}`]}}},
 'g3-whichop':{id:'g3-whichop',title:'どんな 計算に なるかな',kind:'word',n:5,cols:1,lead:'式と 答えを 書きましょう。どうして その 計算に なるかも 考えましょう。',
  explain:{points:[{h:'かけ算に なる とき',b:'「1つ分の 数」が「いくつ分」か あって、全部の 数を もとめる ときは かけ算です。'},{h:'わり算に なる とき',b:'全部の 数を 同じ 数ずつ 分ける とき（何人に 分けられるか、1人 何こか）は わり算です。'}],tip:'<b>こつ</b>　「1つ分」「いくつ分」「全部」の どれを もとめるのかを 考えましょう。'},
  gen(){const a=ri(3,9),b=ri(3,9),N=a*b;return pick([
   ()=>({q:`1ふくろに あめが ${a}こずつ 入って います。${b}ふくろでは あめは 何こですか。`,a:`式 ${a} × ${b} = ${N}　答え ${N}こ`,steps:[`1つ分（1ふくろ ${a}こ）の いくつ分（${b}ふくろ）→ かけ算`]}),
   ()=>({q:`あめが ${N}こ あります。1人に ${a}こずつ 分けると、何人に 分けられますか。`,a:`式 ${N} ÷ ${a} = ${b}　答え ${b}人`,steps:[`全部（${N}こ）を ${a}こずつ 分ける → わり算`,`${a} × ${b} = ${N}`]}),
   ()=>({q:`あめが ${N}こ あります。${b}人で 同じ 数ずつ 分けると、1人 何こに なりますか。`,a:`式 ${N} ÷ ${b} = ${a}　答え ${a}こ`,steps:[`全部（${N}こ）を ${b}人で 同じ 数ずつ → わり算`,`${b} × ${a} = ${N}`]}),
   ()=>({q:`いすが ${b}れつ あり、1れつに ${a}きゃくずつ ならんで います。いすは 全部で 何きゃくですか。`,a:`式 ${a} × ${b} = ${N}　答え ${N}きゃく`,steps:[`1れつ ${a}きゃくの ${b}れつ分 → かけ算`]}),
  ])()}},
 'g3-route':{id:'g3-route',title:'道のりと きょり',kind:'fig',n:4,cols:2,lead:'地図を 見て 答えましょう。',parts:['(1)','(2)'],
  explain:{points:[{h:'道のり',b:'道に そって はかった 長さを 道のりと いいます。'},{h:'きょり',b:'2つの 場所を まっすぐに はかった 長さを きょりと いいます。'}],tip:'<b>ちゅうい</b>　1km = 1000m です。m が 1000 を こえたら km に なおしましょう。'},
  gen(){const a=ri(6,15)*100,b=ri(6,15)*100,c=Math.round(Math.max(Math.abs(a-b)+200,Math.min(a+b-300,Math.round(Math.sqrt(a*a+b*b)/100)*100)));const f=m=>m>=1000?(m%1000?`${Math.floor(m/1000)}km ${m%1000}m`:`${m/1000}km`):`${m}m`;
   const g=`<line x1="8" y1="34" x2="40" y2="6" stroke="#111" stroke-width=".8"/><line x1="40" y1="6" x2="80" y2="34" stroke="#111" stroke-width=".8"/><line x1="8" y1="34" x2="80" y2="34" stroke="#2a6fb0" stroke-dasharray="2 1" stroke-width=".8"/>`+dot(8,34,1.8)+dot(40,6,1.8)+dot(80,34,1.8)+T(8,42,'家',4.4)+T(40,3.5,'公園',4.4)+T(80,42,'学校',4.4)+T(22,18,f(a),4.2,'end')+T(60,18,f(b),4.2,'start')+T(44,39.5,f(c),4.2);
   return{q:`<div class="fig" style="max-width:64mm">${SVGW('-6 0 104 45',g)}</div><div class="figcap">(1) 家から 公園の 前を 通って 学校まで 行く 道のりは どれだけですか。(2) (1)の 道のりと、家から 学校までの きょりの ちがいは 何m ですか。</div>`,parts:['(1)','(2)'],a:`(1) ${f(a+b)}　(2) ${a+b-c}m`,steps:[`(1) ${a} + ${b} = ${a+b}（m）`,`(2) ${a+b} − ${c} = ${a+b-c}（m）`]}}},
 'g3-unitrel':{id:'g3-unitrel',title:'たんいの かんけい',kind:'calc',n:14,cols:2,lead:'□に あてはまる 数を 書きましょう。',
  explain:{points:[{h:'長さ',b:'1cm = 10mm、1m = 100cm、1km = 1000m'},{h:'重さ・かさ',b:'1kg = 1000g、1t = 1000kg、1L = 10dL = 1000mL'},{h:'k（キロ）と m（ミリ）',b:'k が つくと 1000倍、m（ミリ）が つくと 1000こに 分けた 1つ分です。'}],tip:'<b>こつ</b>　「km・kg」「m・g・L」「mm・mL」のように、同じ ならびかたを しています。'},
  gen(){const L=[['1km','1m',1000],['1m','1cm',100],['1cm','1mm',10],['1m','1mm',1000],['1kg','1g',1000],['1t','1kg',1000],['1L','1dL',10],['1L','1mL',1000],['1dL','1mL',100]];const [a,b,k]=pick(L);
   if(chance(.6))return{q:`${a} は ${b} の {_}倍`,tail:'',a:String(k),steps:[`${a} = ${k}${b.slice(1)}`]};const n=ri(2,9);return{q:`${n}${a.slice(1)} = {_}${b.slice(1)}`,tail:'',a:String(n*k),steps:[`${a} = ${k}${b.slice(1)}`,`${k} × ${n} = ${n*k}`]}}},
 'g3-times':{id:'g3-times',title:'何倍でしょう',kind:'word',n:5,cols:1,lead:'図を かいて 考え、式と 答えを 書きましょう。',
  explain:{points:[{h:'何倍かを もとめる',b:'24cm は 6cm の 何倍か → 6 × □ = 24 → □ = 24 ÷ 6 = 4（倍）'},{h:'もとに する 大きさを もとめる',b:'□ の 3倍が 24 → □ × 3 = 24 → □ = 24 ÷ 3 = 8'},{h:'何倍の 何倍',b:'2倍の 3倍は、2 × 3 = 6倍です。'}],tip:'<b>こつ</b>　テープ図を かいて、もとに する 長さが いくつ分 あるかを 見ましょう。'},
  gen(){const a=ri(3,9),k=ri(2,8);return pick([
   ()=>({q:`赤い テープは ${a*k}cm、白い テープは ${a}cm です。赤い テープの 長さは、白い テープの 何倍ですか。`,a:`式 ${a*k} ÷ ${a} = ${k}　答え ${k}倍`,steps:[`${a} × □ = ${a*k}`,`□ = ${a*k} ÷ ${a} = ${k}`]}),
   ()=>({q:`青い テープの 長さは、黄色い テープの ${k}倍で ${a*k}cm です。黄色い テープは 何cm ですか。`,a:`式 ${a*k} ÷ ${k} = ${a}　答え ${a}cm`,steps:[`□ × ${k} = ${a*k}`,`□ = ${a*k} ÷ ${k} = ${a}`]}),
   ()=>{const p=ri(2,4),q=ri(2,4);return{q:`赤い 花の 数は 白い 花の ${p}倍、黄色い 花の 数は 赤い 花の ${q}倍です。黄色い 花の 数は、白い 花の 何倍ですか。`,a:`式 ${p} × ${q} = ${p*q}　答え ${p*q}倍`,steps:[`${p}倍の ${q}倍 → ${p} × ${q}`]}},
   ()=>({q:`${a}cm の ${k}倍の 長さは 何cm ですか。`,a:`式 ${a} × ${k} = ${a*k}　答え ${a*k}cm`,steps:[`${a}cm の ${k}こ分`]}),
  ])()}},
 'g3-tricount':{id:'g3-tricount',title:'三角形を 数えよう',kind:'fig',n:6,cols:3,lead:'同じ 大きさの 正三角形を しきつめました。図の 中に 正三角形は 全部で いくつ ありますか。（大きさの ちがう ものも 数えます）',
  explain:{points:[{h:'大きさごとに 数える',b:'いちばん 小さい 正三角形、その 4つ分の 正三角形、9つ分の 正三角形…と、大きさごとに 分けて 数えます。'},{h:'上向きと 下向き',b:'さかさまの（下向きの）正三角形も わすれずに 数えましょう。'}],tip:'<b>こつ</b>　数えた ものに しるしを つけると、2回 数えたり 数えわすれたり しません。'},
  gen(){const n=ri(2,4),s=36/n,h=s*Math.sqrt(3)/2;let g='';const P=(r,c)=>[18+(c-r/2)*s,4+r*h];
   for(let r=0;r<=n;r++){const a=P(r,0),b=P(r,r);g+=`<line x1="${num(a[0])}" y1="${num(a[1])}" x2="${num(b[0])}" y2="${num(b[1])}" stroke="#111" stroke-width=".6"/>`}
   for(let c=0;c<=n;c++){const a=P(c,c),b=P(n,c);g+=`<line x1="${num(a[0])}" y1="${num(a[1])}" x2="${num(b[0])}" y2="${num(b[1])}" stroke="#111" stroke-width=".6"/>`;const a2=P(c,0),b2=P(n,n-c);g+=`<line x1="${num(a2[0])}" y1="${num(a2[1])}" x2="${num(b2[0])}" y2="${num(b2[1])}" stroke="#111" stroke-width=".6"/>`}
   g=`<polygon points="${P(0,0).map(num)} ${P(n,0).map(num)} ${P(n,n).map(num)}" fill="${CB}" fill-opacity=".35"/>`+g;
   let up=0,down=0;const ups=[],downs=[];for(let k=1;k<=n;k++){const u=(n-k+1)*(n-k+2)/2;up+=u;ups.push(`${k===1?'小さい':k+'だん分'} 上向き ${u}こ`)}for(let k=1;2*k<=n;k++){const d=(n-2*k+1)*(n-2*k+2)/2;down+=d;downs.push(`${k===1?'小さい':k+'だん分'} 下向き ${d}こ`)}
   return{q:`<div class="fig" style="max-width:32mm">${SVGW('-2 0 40 '+num(4+n*h+3),g)}</div>`,a:`<b>${up+down}こ</b>`,steps:[...ups,...downs,`あわせて ${up+down}こ`]}}},
 'g3-robot':{id:'g3-robot',title:'ロボットを 動かそう（プログラミング）',kind:'fig',n:4,cols:1,lead:'ロボットは はじめ ★の ますに いて、上を 向いて います。めいれいの じゅんに 動くと、どの ますに 着きますか。',
  explain:{points:[{h:'めいれいを 1つずつ',b:'「前に 1 進む」は 向いて いる 方に 1ます、「右を 向く」「左を 向く」は その 場で 向きだけ かえます。'},{h:'くり返し',b:'「〜を 2回 くり返す」は、かっこの 中の めいれいを 2回 つづけて 行います。'}],tip:'<b>こつ</b>　ロボットの 向きを 矢じるしで 書きこみながら、ますを たどりましょう。'},
  gen(){const N=5,D=[[0,-1],[1,0],[0,1],[-1,0]];for(;;){let x=ri(0,1),y=N-1,d=0;const sx=x,sy=y;const prog=[];let ok=true;const k=ri(4,6);
    for(let i=0;i<k;i++){const t=pick(['f','f','f','r','l','rep']);if(t==='f'){x+=D[d][0];y+=D[d][1];prog.push('前に 1 進む')}else if(t==='r'){d=(d+1)%4;prog.push('右を 向く')}else if(t==='l'){d=(d+3)%4;prog.push('左を 向く')}else{x+=2*D[d][0];y+=2*D[d][1];prog.push('（前に 1 進む）を 2回 くり返す')}if(x<0||y<0||x>=N||y>=N){ok=false;break}}
    if(!ok||(x===sx&&y===sy)||!prog.some(p=>p.includes('向く')))continue;
    const cells=[[x,y]];while(cells.length<4){const c=[ri(0,N-1),ri(0,N-1)];if(!cells.some(e=>e[0]===c[0]&&e[1]===c[1])&&!(c[0]===sx&&c[1]===sy))cells.push(c)}const lab=shuffle(['ア','イ','ウ','エ']);const s=8;
    let g='';for(let i=0;i<=N;i++)g+=`<line x1="${2+i*s}" y1="2" x2="${2+i*s}" y2="${2+N*s}" stroke="#111" stroke-width=".4"/><line x1="2" y1="${2+i*s}" x2="${2+N*s}" y2="${2+i*s}" stroke="#111" stroke-width=".4"/>`;
    g+=T(2+sx*s+s/2,2+sy*s+s/2+1.6,'★',4.6);cells.forEach((c,i)=>g+=T(2+c[0]*s+s/2,2+c[1]*s+s/2+1.4,lab[i],4));
    return{q:sideQ(SVGW(`0 0 ${4+N*s} ${4+N*s}`,g),40,`めいれい<br>${prog.map((p,i)=>`${i+1}. ${p}`).join('<br>')}`),a:`<b>${lab[0]}</b>`,steps:['向きを 書きこみながら 1つずつ たどる',...prog.map((p,i)=>`${i+1}. ${p}`).slice(0,3),'…']}}}},
 'g3-canbuy':{id:'g3-canbuy',title:'買えますか？ 買えませんか？',kind:'word',n:5,cols:1,lead:'見積もって 考えましょう。どう 考えたかも 書きましょう。',parts:['答え'],
  explain:{points:[{h:'買えるかを たしかめる',b:'ねだんを 何百円に 多めに 見て（切り上げて）、それでも 持って いる お金で たりれば、かならず 買えます。'},{h:'買えないかを たしかめる',b:'ねだんを 何百円に 少なめに 見て（切り捨てて）、それでも 持って いる お金より 多ければ、買えません。'}],tip:'<b>こつ</b>　ぴったりの 計算を しなくても、見積もりで すぐに わかる ことが あります。'},
  gen(){for(;;){const n=ri(2,3),ps=Array.from({length:n},()=>ri(11,59)*10+ri(1,9)),up=ps.map(p=>Math.ceil(p/100)*100),dn=ps.map(p=>Math.floor(p/100)*100);const su=up.reduce((a,b)=>a+b,0),sd=dn.reduce((a,b)=>a+b,0);const yes=chance(.55);
   if(yes){const M=su;if(sd>=M-100)continue;return{q:`${M}円 持って います。${ps.map(yenN).join('、')}の ものを 1つずつ 買う ことが できますか。`,parts:['答え'],a:`答え 買える（${up.join(' + ')} = ${su}円 で、${M}円 いない）`,steps:['多めに（何百円に 切り上げて）見る',`${ps.join('、')} → ${up.join('、')}`,`多めに 見ても ${su}円 なので 買える`]}}
   const M=sd-100;if(M<=0||su-sd<200)continue;return{q:`${M}円 持って います。${ps.map(yenN).join('、')}の ものを 1つずつ 買う ことが できますか。`,parts:['答え'],a:`答え 買えない（${dn.join(' + ')} = ${sd}円 で、${M}円より 多い）`,steps:['少なめに（何百円に 切り捨てて）見る',`${ps.join('、')} → ${dn.join('、')}`,`少なめに 見ても ${sd}円 なので 買えない`]}}}},
};

/* ---------- 3年の章に入れる ---------- */
(()=>{const ch=n=>{const c=GRADE_UNITS[3].find(x=>x.ch===n);if(!c)throw new Error('no chapter '+n);return c};const U=id=>NEW3I[id];
  ch('たし算と ひき算の ひっ算').items.unshift(U('g3-hundreds'));ch('表と ぼうグラフ').items.push(U('g3-table2'));ch('わり算').items.push(U('g3-whichop'));
  ch('長さ').items.push(U('g3-route'));ch('重さ').items.push(U('g3-unitrel'));ch('三角形と 角').items.push(U('g3-tricount'));ch('考える もんだい').items.push(U('g3-canbuy'),U('g3-robot'));
  const i1=GRADE_UNITS[3].findIndex(x=>x.ch==='円と 球');GRADE_UNITS[3].splice(i1+1,0,{ch:'何倍でしょう',items:[U('g3-times')]});
  const i2=GRADE_UNITS[3].findIndex(x=>x.ch==='□を つかった 式');GRADE_UNITS[3].splice(i2+1,0,{ch:'式と 計算',items:[U('g3-kufu')]})})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['g3-hundreds']=()=>{let g='';for(let i=0;i<12;i++)g+=`<circle cx="${8+(i%6)*9}" cy="${9+Math.floor(i/6)*9}" r="3.8" fill="${i<8?CB:CR}" stroke="#111" stroke-width=".4"/>`+T(8+(i%6)*9,10.2+Math.floor(i/6)*9,'100',2.2);g+=T(66,10,'800 + 400',3.6,'start')+T(66,18,'100 が 12こ',3.6,'start')+T(66,26,'→ 1200',3.6,'start');
  return W1(SVGW('0 0 110 30',g),'100円玉で 考える',['800 は 100 が 8こ、400 は 100 が 4こ','あわせて 100 が 12こ → 1200'])};
WHY['g3-kufu']=()=>{let g=tape(4,6,60,8,'#fff','178')+tape(64,6,20,8,CB,'45')+tape(84,6,24,8,CR,'55')+`<path d="M64,17 H108" stroke="#c0392b" stroke-width=".8"/>`+T(86,23,'45 + 55 = 100',3.4)+T(40,23,'178 + 100 = 278',3.4);
  return W1(SVGW('0 0 112 27',g),'先に たして 100 に する',['45 と 55 を 先に たすと ちょうど 100','たし算は じゅんじょを かえても 答えは 同じ'])};
WHY['g3-table2']=()=>W1(`<div style="font-size:9pt">${tbl(['場所','1組','2組','合計'],[['こうえん',5,4,'<b>9</b>'],['家',3,6,'<b>9</b>'],['合計','<b>8</b>','<b>10</b>','<b>18</b>']])}</div>`,'たてと よこに たす',['よこに たすと 場所ごとの 人数、たてに たすと 組ごとの 人数','右下の 数は どちらから たしても 同じ（全体の 人数）']);
WHY['g3-whichop']=()=>{let g='';for(let i=0;i<3;i++){g+=box(4+i*22,6,20,12,'#fff',.4);for(let j=0;j<4;j++)g+=dot(8+i*22+j*4,12,1.5,CB)}g+=T(36,25,'1つ分 4こ × 3つ分 → かけ算',3.2)+T(96,10,'全部 → 分ける',3.2,'start')+T(96,17,'→ わり算',3.2,'start');
  return W1(SVGW('0 0 130 28',g),'かけ算と わり算',['1つ分の 数 と いくつ分 が わかって、全部を もとめる → かけ算','全部の 数を 同じ 数ずつ 分ける → わり算'])};
WHY['g3-route']=()=>{let g=`<path d="M8,30 L40,6 L80,30" fill="none" stroke="#c0392b" stroke-width="1"/><line x1="8" y1="30" x2="80" y2="30" stroke="#2a6fb0" stroke-dasharray="2 1" stroke-width="1"/>`+dot(8,30,1.6)+dot(80,30,1.6)+T(40,16,'道のり',3.4).replace('fill="#111"','fill="#c0392b"')+T(44,36,'きょり',3.4).replace('fill="#111"','fill="#2a6fb0"');
  return W1(SVGW('0 0 90 38',g),'道のりと きょり',['赤：道に そって はかった 長さ（道のり）','青：まっすぐ はかった 長さ（きょり）。きょりは 道のりより 短い'])};
WHY['g3-unitrel']=()=>{let g='';['mm','cm','m','km'].forEach((u,i)=>g+=box(4+i*28,6,18,9,i===2?CB:'#fff',.4)+T(13+i*28,12,u,3.6));[['10倍',22],['100倍',50],['1000倍',78]].forEach(([t,x])=>g+=arrowR(x,10.5,x+10,'')+T(x+5,22,t,3));
  return W1(SVGW('0 0 120 26',g),'長さの たんいの かんけい',['1mm を 10こ で 1cm、1cm を 100こ で 1m、1m を 1000こ で 1km','重さは 1g → 1kg → 1t が 1000倍ずつ'])};
WHY['g3-times']=()=>{let g='';for(let i=0;i<4;i++)g+=box(4+i*16,4,16,7,CR,.4);g+=box(4,15,16,7,CB,.4)+T(12,20,'6cm',3)+T(36,9,'24cm',3.2)+T(76,9,'← 6cm が 4つ分',3.2,'start')+T(76,20,'24 ÷ 6 = 4（倍）',3.2,'start');
  return W1(SVGW('0 0 130 26',g),'いくつ分か を 見る',['白い テープ（6cm）を 1 と みると、赤い テープは その 4つ分','だから 赤は 白の 4倍。24 ÷ 6 で もとめられる'])};
WHY['g3-tricount']=()=>{const s=10,h=s*Math.sqrt(3)/2;const tri=(x,y,k,up,f)=>`<polygon points="${up?`${num(x)},${num(y)} ${num(x-k*s/2)},${num(y+k*h)} ${num(x+k*s/2)},${num(y+k*h)}`:`${num(x)},${num(y+k*h)} ${num(x-k*s/2)},${num(y)} ${num(x+k*s/2)},${num(y)}`}" fill="${f}" stroke="#111" stroke-width=".5"/>`;
  let g=tri(14,4,2,true,'#fff')+tri(14,4,1,true,CB)+tri(9,4+h,1,true,CB)+tri(19,4+h,1,true,CB)+tri(14,4+h,1,false,CR)+T(14,28,'小さい 4こ',3)+tri(50,4,2,true,CG)+T(50,28,'大きい 1こ',3)+T(70,14,'4 + 1 = 5こ',3.6,'start');
  return W1(SVGW('0 0 110 32',g),'大きさごとに 数える',['小さい 正三角形：上向き 3こ と 下向き（赤）1こ','2だん分の 大きい 正三角形：1こ','あわせて 5こ'])};
WHY['g3-robot']=()=>{let g='';for(let i=0;i<=3;i++)g+=`<line x1="${4+i*9}" y1="4" x2="${4+i*9}" y2="31" stroke="#111" stroke-width=".4"/><line x1="4" y1="${4+i*9}" x2="31" y2="${4+i*9}" stroke="#111" stroke-width=".4"/>`;g+=T(8.5,28,'★',4)+`<path d="M8.5,26 V17 H17.5" fill="none" stroke="#c0392b" stroke-width=".8"/><path d="M8.5,18 l-1.5,2 h3z M16,17 l-2,-1.5 v3z" fill="#c0392b"/>`+T(38,12,'1. 前に 1 進む（上へ）',3.2,'start')+T(38,19,'2. 右を 向く',3.2,'start')+T(38,26,'3. 前に 1 進む（右へ）',3.2,'start');
  return W1(SVGW('0 0 116 34',g),'向きを 書きこむ',['「向く」めいれいでは ますを 動かず、向きだけ かわる','進む ときは、そのとき 向いて いる 方へ 1ます'])};
WHY['g3-canbuy']=()=>{let g=box(4,4,40,8,CB,.4)+T(24,9.5,'196円 → 200円',3.2)+box(4,14,40,8,CB,.4)+T(24,19.5,'185円 → 200円',3.2)+T(24,29,'多めに 見て 400円',3.4)+T(52,12,'400円 持って いれば',3.3,'start')+T(52,20,'かならず 買える',3.3,'start');
  return W1(SVGW('0 0 116 32',g),'多めに 見積もる',['ねだんを 何百円に 切り上げると、本当の 代金より 多く なる','それでも 持って いる お金で たりるなら、本当の 代金でも たりる'])};
