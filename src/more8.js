/* ============ 資料E（小5の問題集）をもとにした追加：5年の新しい問題タイプと「なぜ？」の図 ============ */
const arcP=(cx,cy,r,a1,a2)=>{const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)];const s=p(a1),e=p(a2);return `<path d="M${num(s[0])},${num(s[1])} A${r},${r} 0 ${Math.abs(a2-a1)>180?1:0} 0 ${num(e[0])},${num(e[1])}" fill="none" stroke="#c0392b" stroke-width=".5"/>`};
const angT=(cx,cy,r,a1,a2,t,fs=3.8)=>{const m=(a1+a2)/2*Math.PI/180;return T(cx+r*Math.cos(m),cy-r*Math.sin(m)+fs*.35,t,fs)};
/* 積み木（高さの表 h[r][c]、r=0が手前）を斜めから見た図 */
const stackSVG=(h,s=6,fill=CB)=>{const D=h.length,W=h[0].length,d=s*.5;let mx=0;h.forEach(r=>r.forEach(v=>mx=Math.max(mx,v)));
  const ox=2,oy=2+mx*s+D*d*.8;let g='';
  for(let r=D-1;r>=0;r--)for(let z=0;z<mx;z++)for(let c=0;c<W;c++)if(h[r][c]>z)g+=cube(ox+c*s+r*d,oy-(z+1)*s-r*d*.8,s,z===h[r][c]-1?fill:'#f4f4f4');
  return{g,w:ox+W*s+D*d+2,h:oy+2}};

const foldSVG=(a,tP,tQ)=>{const h=20,p=50,L=46,ar=a*Math.PI/180;const Q=[p-h/Math.tan(ar),0],P=[p,h];
   const refl=pt=>{const ux=Math.cos(ar),uy=Math.sin(ar),vx=pt[0]-Q[0],vy=pt[1]-Q[1],t=vx*ux+vy*uy;return[Q[0]+2*t*ux-vx,Q[1]+2*t*uy-vy]};
   const R1=refl([P[0]+L,h]),R2=refl([Q[0]+L,0]);const pts=[[0,0],[0,h],P,Q,R1,R2,[P[0]+L*.6+2,h]];const minX=Math.min(...pts.map(q=>q[0]))-4,maxX=Math.max(...pts.map(q=>q[0]))+4,maxY=Math.max(...pts.map(q=>q[1]))+4;
   const S=q=>[q[0]-minX,maxY-q[1]];const ps=arr=>arr.map(q=>S(q).map(num).join(',')).join(' ');const Hh=maxY+4;
   let g=`<polygon points="${ps([[-2,0],Q,P,[-2,h]])}" fill="#f6f6f6" stroke="#111" stroke-width=".6"/><polygon points="${ps([Q,P,R1,R2])}" fill="${CB}" fill-opacity=".75" stroke="#111" stroke-width=".6"/><line x1="${num(S(Q)[0])}" y1="${num(S(Q)[1])}" x2="${num(S(P)[0])}" y2="${num(S(P)[1])}" stroke="#c0392b" stroke-dasharray="1.5 1" stroke-width=".6"/>`;
   const sp=S(P),sq=S(Q);g+=arcP(sq[0],sq[1],6,2*a,180)+angT(sq[0],sq[1],11.5,2*a,180,tQ,4.6);
   if(tP==='○'){const E1=S([Q[0]+L*.6,0]),E2=S([P[0]+L*.6,h]);g+=`<path d="M${num(sq[0])},${num(sq[1])} L${num(E1[0])},${num(E1[1])} L${num(E2[0])},${num(E2[1])} L${num(sp[0])},${num(sp[1])}" fill="none" stroke="#888" stroke-dasharray="1.2 1" stroke-width=".5"/>`+arcP(sq[0],sq[1],8,0,a)+angT(sq[0],sq[1],12,0,a,'○',4)+arcP(sq[0],sq[1],8,a,2*a)+angT(sq[0],sq[1],12,a,2*a,'○',4)}
   else g+=arcP(sp[0],sp[1],6,180,180+a)+angT(sp[0],sp[1],11.5,180,180+a,tP,4.6);
   return SVGW(`0 0 ${num(maxX-minX)} ${num(Hh)}`,g)};

const NEW5E={
 'g5-cubecount':{id:'g5-cubecount',title:'積み木の体積',kind:'fig',n:6,cols:2,lead:'1辺が1cmの立方体の積み木を積んで作った形です。体積は何cm³ですか。',
  explain:{points:[{h:'1cm³ がいくつ分か',b:'1辺が1cmの立方体の体積が 1cm³ です。積み木がいくつあるかを数えれば、体積がわかります。'},{h:'段ごとに数える',b:'1だん目、2だん目…と、段ごとに数えてからたすと、数えまちがいが少なくなります。'}],tip:'<b>ちゅうい</b>　うしろや下にかくれている積み木も数えます（下に空いているところはありません）。'},
  gen(){const D=ri(2,3),W=ri(2,4);const h=[];for(let r=D-1;r>=0;r--){h[r]=[];for(let c=0;c<W;c++){let v=ri(r===D-1&&c===0?2:0,4);if(r<D-1)v=Math.min(v,h[r+1][c]);if(c>0)v=Math.min(v,h[r][c-1]);h[r][c]=v}}
   if(h[0][0]===0)h[0][0]=1;const lv=[];let tot=0;for(let z=1;z<=4;z++){let k=0;h.forEach(r=>r.forEach(v=>{if(v>=z)k++}));if(k){lv.push(k);tot+=k}}if(tot<5)return this.gen();
   const s=stackSVG(h);return{q:`<div class="fig" style="max-width:${num(s.w*1.45)}mm">${SVGW(`0 0 ${num(s.w)} ${num(s.h)}`,s.g)}</div>`,a:`<b>${tot} cm³</b>`,steps:[lv.map((k,i)=>`${i+1}だん目 ${k}こ`).join('、'),`${lv.join(' + ')} = ${tot}（こ）`]}}},
 'g5-venn':{id:'g5-venn',title:'倍数の個数（図で整理）',kind:'word',n:3,cols:1,lead:'図を見ながら、つぎの問題に答えましょう。',parts:['(1)','(2)','(3)','(4)'],
  explain:{points:[{h:'□の倍数の個数',b:'1から N までに、□の倍数は N ÷ □ の商の数だけあります（あまりは切りすてる）。',ex:'1〜100 の 6の倍数 → 100 ÷ 6 = 16 あまり 4 → 16こ'},{h:'重なりに気をつける',b:'2つの円が重なったところが公倍数です。最小公倍数の倍数を数えます。'}],tip:'<b>こつ</b>　「どちらでもない数」は、全体から「少なくともどちらかの倍数」をひきます。'},
  gen(){const pairs=[[2,3],[3,4],[4,6],[6,9],[4,10],[6,8],[3,5],[2,5],[5,6],[8,12]];const [a,b]=pick(pairs),N=pick([50,60,80,100,120,150,200]);const L=lcm(a,b),na=Math.floor(N/a),nb=Math.floor(N/b),nl=Math.floor(N/L),no=N-(na+nb-nl);
   const g=`<rect x="2" y="2" width="96" height="40" fill="#fff" stroke="#111" stroke-width=".5"/><circle cx="38" cy="23" r="15" fill="${CB}" fill-opacity=".6" stroke="#111" stroke-width=".5"/><circle cx="60" cy="23" r="15" fill="${CR}" fill-opacity=".6" stroke="#111" stroke-width=".5"/>`+T(31,24.5,a+'の倍数',3.6)+T(67,24.5,b+'の倍数',3.6)+T(49,24.5,'両方',3.2)+T(5,7.5,`1〜${N}の整数`,3.6,'start');
   return{q:`<div class="fig" style="max-width:64mm">${SVGW('0 0 100 44',g)}</div><div class="figcap">1から${N}までの整数について答えましょう。(1) ${a}の倍数はいくつ　(2) ${b}の倍数はいくつ　(3) ${a}と${b}の公倍数はいくつ　(4) ${a}の倍数でも${b}の倍数でもない数はいくつ</div>`,parts:['(1)','(2)','(3)','(4)'],
    a:`(1) ${na}こ　(2) ${nb}こ　(3) ${nl}こ　(4) ${no}こ`,steps:[`(1) ${N} ÷ ${a} = ${na} あまり ${N%a}`,`(2) ${N} ÷ ${b} = ${nb} あまり ${N%b}`,`(3) 最小公倍数は ${L}。${N} ÷ ${L} = ${nl} あまり ${N%L}`,`(4) ${N} − (${na} + ${nb} − ${nl}) = ${no}`]}}},
 'g5-remain':{id:'g5-remain',title:'あまりと公倍数・公約数',kind:'word',n:5,cols:1,lead:'つぎの問題に答えましょう。',parts:['答え'],
  explain:{points:[{h:'どちらでわっても同じだけあまる',b:'□でわっても△でわっても1あまる数は、「□と△の公倍数」に1をたした数です。',ex:'4でも6でも1あまる → 12 + 1 = 13'},{h:'あまりをひいてわり切れる数',b:'50をわると2あまる数は、50 − 2 = 48 をわり切る数（ただし2より大きい数）です。'}],tip:'<b>こつ</b>　あまりの分をひいたりたしたりして、「わり切れる」問題になおしましょう。'},
  gen(){return pick([
   ()=>{const [a,b]=pick([[4,6],[6,8],[6,9],[8,12],[4,10],[9,12],[6,10]]),r=ri(1,Math.min(a,b)-1),L=lcm(a,b),k=ri(1,3);const x=L*k+r;const nth=['いちばん小さい','2番目に小さい','3番目に小さい'][k-1];
     return{q:`${a}でわっても${b}でわっても${r}あまる整数のうち、${nth}数を答えましょう。（${r}は数えません）`,parts:['答え'],a:`答え ${x}`,steps:[`あまりの ${r} をひくと、${a}でも${b}でもわり切れる → ${a}と${b}の公倍数`,`${a}と${b}の公倍数は ${L}, ${2*L}, ${3*L}, …`,`${L*k} + ${r} = ${x}`]}},
   ()=>{const [a,b]=pick([[12,18],[8,12],[6,15],[10,15],[16,24],[12,20]]),L=lcm(a,b),N=ri(10,60)*10;const lo=Math.floor(N/L)*L,hi=lo+L;const ans=(N-lo<=hi-N)?lo:hi;if(N-lo===hi-N)return this.gen();
     return{q:`${a}と${b}の公倍数のうち、${N}にいちばん近い数を答えましょう。`,parts:['答え'],a:`答え ${ans}`,steps:[`最小公倍数は ${L}。公倍数は ${L}の倍数`,`${N} ÷ ${L} = ${Math.floor(N/L)} あまり ${N%L} → ${lo} と ${hi} をくらべる`,`${N}との差：${N-lo} と ${hi-N} → ${ans}`]}},
   ()=>{for(;;){const g=pick([6,8,9,12,14,15,16,18,24]),m1=ri(2,7),m2=ri(2,7);if(m1===m2||gcd(m1,m2)!==1)continue;const r1=ri(1,4),r2=ri(1,4),x=g*m1+r1,y=g*m2+r2;const G=gcd(x-r1,y-r2);const ds=[];for(let d=1;d<=G;d++)if(G%d===0&&d>Math.max(r1,r2))ds.push(d);if(!ds.length||ds.length>6)continue;
     return{q:`${x}をわると${r1}あまり、${y}をわると${r2}あまる整数をすべて答えましょう。`,parts:['答え'],a:`答え ${ds.join('、')}`,steps:[`${x} − ${r1} = ${x-r1}、${y} − ${r2} = ${y-r2} をどちらもわり切る数 → 公約数`,`${x-r1}と${y-r2}の公約数のうち、あまり（${Math.max(r1,r2)}）より大きい数`]}}},
  ])()}},
 'g5-fold':{id:'g5-fold',title:'紙テープを折り返した角',kind:'fig',n:4,cols:2,lead:'紙テープを、点線のところで折り返しました。□の角の大きさを求めましょう。',
  explain:{points:[{h:'折り返した角は等しい',b:'折り返すと、折り目をはさんだ2つの角はぴったり重なるので、大きさが等しくなります。'},{h:'一直線は180°',b:'一直線にならんだ角をたすと180°になることを使います。'}],tip:'<b>こつ</b>　等しい角に同じ印（○）をつけてから、180°からひきましょう。'},
  gen(){const a=pick([50,55,60,65,70]),x=180-2*a,ask=chance(.5);const f=foldSVG(a,ask?a+'°':'□',ask?'□':x+'°');
   return{q:`<div class="fig" style="max-width:62mm">${f}</div>`,a:`<b>${ask?x:a}°</b>`,steps:ask?[`折り返した角は等しいので、折り目の両がわは ${a}° と ${a}°`,`180 − ${a} × 2 = ${x}`]:[`下の一直線で、${x}° の残りを2つの等しい角で分ける`,`(180 − ${x}) ÷ 2 = ${a}`]}}},
 'g5-road':{id:'g5-road',title:'道をのぞいた面積',kind:'fig',n:4,cols:2,lead:'長方形の土地に、はばの同じ道があります。色のついた部分の面積を求めましょう。',
  explain:{points:[{h:'道を寄せる',b:'道を土地のはしに寄せても、残りの部分の面積は変わりません。残りは1つの長方形になります。'},{h:'ななめの道',b:'ななめの道でも、横はば（平行四辺形の底辺）が同じなら、寄せた形は同じになります。'}],tip:'<b>こつ</b>　（たて − 道のはば）×（横 − 道のはば）で求められます。'},
  gen(){const W=ri(8,16)*(chance(.5)?1:2),H=ri(6,12),w=pick([1,2]),slant=chance(.5);const s=Math.min(60/W,36/H),ox=8,oy=7;const X=v=>num(ox+v*s),Y=v=>num(oy+v*s);
   const cx=ri(2,W-w-2),cy=ri(2,H-w-2),sh=slant?ri(2,Math.min(4,cx)):0;
   let g=`<rect x="${X(0)}" y="${Y(0)}" width="${num(W*s)}" height="${num(H*s)}" fill="${CG}" stroke="#111" stroke-width=".7"/>`;
   g+=`<polygon points="${X(cx+sh)},${Y(0)} ${X(cx+sh+w)},${Y(0)} ${X(cx+w)},${Y(H)} ${X(cx)},${Y(H)}" fill="#fff" stroke="#111" stroke-width=".5"/><rect x="${X(0)}" y="${Y(cy)}" width="${num(W*s)}" height="${num(w*s)}" fill="#fff" stroke="#111" stroke-width=".5"/>`;
   g+=T(ox+W*s/2,oy-2,W+'m',3.8)+T(ox-1.5,oy+H*s/2+1.3,H+'m',3.8,'end')+T(X(cx+w/2),oy+H*s+5.5,w+'m',3.4)+T(ox+W*s+1.5,oy+(cy+w/2)*s+1.3,w+'m',3.4,'start');
   const v=(W-w)*(H-w);return{q:`<div class="fig" style="max-width:56mm">${SVGW(`0 0 ${num(ox+W*s+10)} ${num(oy+H*s+8)}`,g)}</div>`,a:`<b>${v} m²</b>`,steps:['道を土地のはしに寄せると、残りは1つの長方形',`(${W} − ${w}) × (${H} − ${w}) = ${W-w} × ${H-w} = ${v}`]}}},
 'g5-arcperim':{id:'g5-arcperim',title:'円を使った図形のまわりの長さ',kind:'fig',n:4,cols:2,lead:'色のついた部分のまわりの長さを求めましょう。円周率は3.14とします。',
  explain:{points:[{h:'曲線と直線に分ける',b:'まわりを、円周の一部（曲線）と、まっすぐな線に分けて考えます。'},{h:'円周の何分の1か',b:'半円の曲線は円周の 1/2、4分の1の円の曲線は円周の 1/4 です。',ex:'半径 6cm の 1/4 の円の曲線 → 6 × 2 × 3.14 ÷ 4 = 9.42cm'}],tip:'<b>ちゅうい</b>　まっすぐな線（半径や直径）をたし忘れないようにしましょう。'},
  gen(){const t=ri(0,3),a=pick([4,6,8,10,12]),s=36/a,o=6,L=num(a*s);let g='',ans,st;
   if(t===0){g=`<path d="M${o},${o+a*s} A${L},${L} 0 0 1 ${o+a*s},${o} A${L},${L} 0 0 1 ${o},${o+a*s}Z" fill="${CB}" stroke="#111" stroke-width=".6"/><rect x="${o}" y="${o}" width="${L}" height="${L}" fill="none" stroke="#111" stroke-width=".5"/>`;ans=a*3.14;st=[`4分の1の円の曲線 ${a} × 2 × 3.14 ÷ 4 = ${num(a*3.14/2)}`,`それが2本 → ${num(a*3.14/2)} × 2 = ${num(ans)}`]}
   else if(t===1){g=`<path d="M${o},${o+a*s} V${o} A${L},${L} 0 0 1 ${o+a*s},${o+a*s}Z" fill="${CB}" stroke="#111" stroke-width=".6"/>`;ans=a*3.14/2+2*a;st=[`曲線 ${a} × 2 × 3.14 ÷ 4 = ${num(a*3.14/2)}`,`半径2本 ${a} × 2 = ${2*a}`,`${num(a*3.14/2)} + ${2*a} = ${num(ans)}`]}
   else if(t===2){g=`<path d="M${o},${o+a*s} V${o} A${num(a*s/2)},${num(a*s/2)} 0 0 1 ${o+a*s},${o} V${o+a*s}Z" fill="${CB}" stroke="#111" stroke-width=".6" transform="translate(0,${num(a*s/2)})"/>`;ans=3*a+a*3.14/2;st=[`半円の曲線 ${a} × 3.14 ÷ 2 = ${num(a*3.14/2)}`,`正方形の3辺 ${a} × 3 = ${3*a}`,`${num(a*3.14/2)} + ${3*a} = ${num(ans)}`]}
   else{g=`<path d="M${o},${o+a*s/2} A${num(a*s/2)},${num(a*s/2)} 0 0 1 ${o+a*s},${o+a*s/2} A${num(a*s/4)},${num(a*s/4)} 0 0 1 ${o+a*s/2},${o+a*s/2} A${num(a*s/4)},${num(a*s/4)} 0 0 0 ${o},${o+a*s/2}Z" fill="${CB}" stroke="#111" stroke-width=".6"/><line x1="${o}" y1="${num(o+a*s*.75+2)}" x2="${o+a*s}" y2="${num(o+a*s*.75+2)}" stroke="#111" stroke-width=".3"/>`;ans=a*3.14;st=[`大きい半円の曲線 ${a} × 3.14 ÷ 2 = ${num(a*3.14/2)}`,`小さい半円の曲線2つ ${a/2} × 3.14 ÷ 2 × 2 = ${num(a*3.14/2)}`,`${num(a*3.14/2)} + ${num(a*3.14/2)} = ${num(ans)}`]}
   const lab=t===3?T(o+a*s/2,o+a*s*.75+6.5,a+'cm',3.8):T(o+a*s/2,o+a*s+(t===2?a*s/2:0)+5.5,a+'cm',3.8);const Hh=o+a*s+(t===2?a*s/2:0)+(t===3?-a*s/4+9:8);
   return{q:`<div class="fig" style="max-width:${t===2?30:34}mm">${SVGW(`0 0 ${num(a*s+2*o)} ${num(Hh)}`,g+lab)}</div><div class="figcap">${['正方形と、4分の1の円2つ','4分の1の円','正方形と半円','半円の中に小さい半円'][t]}</div>`,a:`<b>${num(ans)} cm</b>`,steps:st}}},
 'g5-net':{id:'g5-net',title:'角柱・円柱の展開図',kind:'fig',n:2,cols:1,lead:'つぎの展開図を組み立ててできる立体について答えましょう。円周率は3.14とします。',parts:['(1)','(2)'],
  explain:{points:[{h:'円柱の展開図',b:'側面は長方形になります。長方形の横の長さは、底面の円の円周と同じです。',ex:'直径 4cm → 横 4 × 3.14 = 12.56cm'},{h:'角柱の展開図',b:'側面は長方形がならんだ形です。全体の横の長さは、底面のまわりの長さと同じです。'}],tip:'<b>こつ</b>　組み立てたとき、どの辺とどの辺がくっつくかを考えましょう。'},
  gen(){if(chance(.5)){const d=pick([2,3,4,5,6,8,10]),h=ri(3,10);const Lw=d*3.14,s=Math.min(90/Lw,4.5),r=d*s/2,ox=6,oy=2*r+4;
    let g=`<rect x="${ox}" y="${num(oy)}" width="${num(Lw*s)}" height="${num(h*s)}" fill="#f4f4f4" stroke="#111" stroke-width=".6"/><circle cx="${num(ox+Lw*s/2)}" cy="${num(oy-r)}" r="${num(r)}" fill="${CB}" stroke="#111" stroke-width=".6"/><circle cx="${num(ox+Lw*s/2)}" cy="${num(oy+h*s+r)}" r="${num(r)}" fill="${CB}" stroke="#111" stroke-width=".6"/>`;
    g+=`<line x1="${num(ox+Lw*s/2-r)}" y1="${num(oy-r)}" x2="${num(ox+Lw*s/2+r)}" y2="${num(oy-r)}" stroke="#111" stroke-width=".4"/>`+T(ox+Lw*s/2+r+2,oy-r+1.3,'直径 '+d+'cm',3.6,'start')+T(ox+Lw*s+2,oy+h*s/2+1.3,h+'cm',3.6,'start')+T(ox+Lw*s/2,oy+h*s/2+1.3,'ア',4);
    return{q:`<div class="fig" style="max-width:${num(Math.min(95,(ox+Lw*s+30)*.9))}mm">${SVGW(`0 0 ${num(ox+Lw*s+30)} ${num(oy+h*s+2*r+3)}`,g)}</div><div class="figcap">(1) 何という立体ですか。　(2) 側面アの長方形の横の長さは何cmですか。</div>`,parts:['(1)','(2)'],a:`(1) 円柱　(2) ${num(Lw)}cm`,steps:['(1) 2つの合同な円が底面、長方形が側面','(2) 横の長さ ＝ 底面の円周',`${d} × 3.14 = ${num(Lw)}`]}}
   const n=pick([3,4,5,6]),e=Array.from({length:n},()=>ri(2,5)),h=ri(3,7),s=3.6,ox=6,oy=12;const reg=n>3;if(reg)e.fill(e[0]);else if(Math.max(...e)*2>=e.reduce((x,y)=>x+y,0))return this.gen();const P=e.reduce((x,y)=>x+y,0);
   let g='',x=ox;e.forEach((v,i)=>{g+=`<rect x="${num(x)}" y="${oy}" width="${num(v*s)}" height="${num(h*s)}" fill="#f4f4f4" stroke="#111" stroke-width=".6"/>`+T(x+v*s/2,oy+h*s+5,v+'cm',3.2);x+=v*s});
   g+=T(x+2,oy+h*s/2+1.3,h+'cm',3.6,'start');const nm={3:'三角柱',4:'四角柱',5:'五角柱',6:'六角柱'}[n];
   g+=`<rect x="${ox}" y="2" width="${num(e[0]*s)}" height="8" fill="${CB}" stroke="#111" stroke-width=".5"/>`+T(ox+e[0]*s+2,7.5,'底面（'+{3:'三角形',4:'正方形',5:'正五角形',6:'正六角形'}[n]+'）',3.2,'start');
   return{q:`<div class="fig" style="max-width:${num(Math.min(100,(x+16)*1.0))}mm">${SVGW(`0 0 ${num(x+16)} ${num(oy+h*s+8)}`,g)}</div><div class="figcap">側面の長方形が${n}つならんでいます（底面は1つだけかいています）。(1) 何という立体ですか。　(2) 側面全体の横の長さは何cmですか。</div>`,parts:['(1)','(2)'],a:`(1) ${nm}　(2) ${P}cm`,steps:[`(1) 側面が${n}つ → 底面は${n}角形 → ${nm}`,`(2) 横の長さ ＝ 底面のまわりの長さ`,`${e.join(' + ')} = ${P}`]}}},
 'g5-pctable':{id:'g5-pctable',title:'くらべる量・もとにする量・割合',kind:'calc',n:12,cols:2,lead:'□にあてはまる数を書きましょう。',
  explain:{points:[{h:'3つの関係',b:'くらべる量 ＝ もとにする量 × 割合、割合 ＝ くらべる量 ÷ もとにする量、もとにする量 ＝ くらべる量 ÷ 割合'},{h:'割合の表し方',b:'0.1 ＝ 10% ＝ 1割、0.01 ＝ 1% ＝ 1分、0.001 ＝ 1厘'}],tip:'<b>こつ</b>　「〇〇の」の〇〇がもとにする量です。百分率や歩合は小数になおしてから計算します。'},
  gen(){const t=ri(0,4),B=pick([20,40,50,60,80,120,150,200,240,300,400,500,800]),p=pick([5,10,15,20,25,30,40,45,60,75,80,120,150]);const C=B*p/100;if(C%1)return this.gen();const wr=Math.floor(p/10),bu=p%10;const wari=`${wr?wr+'割':''}${bu?bu+'分':''}`;
   if(t===0)return{q:`${B} の ${p}% は {_}`,tail:'',a:num(C),steps:[`${B} × ${num(p/100)} = ${num(C)}`]};
   if(t===1)return{q:`${num(C)} は ${B} の {_}%`,tail:'',a:String(p),steps:[`${num(C)} ÷ ${B} = ${num(p/100)}`,`${num(p/100)} → ${p}%`]};
   if(t===2)return{q:`{_} の ${p}% は ${num(C)}`,tail:'',a:String(B),steps:[`□ × ${num(p/100)} = ${num(C)}`,`□ = ${num(C)} ÷ ${num(p/100)} = ${B}`]};
   if(t===3&&p<100)return{q:`${B} の ${wari} は {_}`,tail:'',a:num(C),steps:[`${wari} = ${num(p/100)}`,`${B} × ${num(p/100)} = ${num(C)}`]};
   if(p>=100)return this.gen();return{q:`${num(C)} は ${B} の {_}`,tail:'<span>（歩合で）</span>',a:wari,steps:[`${num(C)} ÷ ${B} = ${num(p/100)}`,`${num(p/100)} → ${wari}`]}}},
 'g5-ratio2':{id:'g5-ratio2',title:'残りの何%（割合を2回使う）',kind:'word',n:4,cols:1,lead:'線分図をかいて考え、式と答えを書きましょう。',
  explain:{points:[{h:'もとにする量が変わる',b:'「残りの30%」は、はじめの量ではなく「残り」をもとにする量（1）とします。'},{h:'順に計算する',b:'はじめ → 1回目の残り → 2回目の残り と、1つずつ求めます。'}],tip:'<b>こつ</b>　線分図を2段にかき、2段目は「残り」を1として区切りましょう。'},
  gen(){const ps=[10,20,25,40,50],p=pick(ps),q=pick(ps);for(;;){const B=ri(10,50)*100;const R1=B*(100-p)/100,R2=R1*(100-q)/100;if(R1%1||R2%1)continue;
   return pick([
    ()=>({q:`${B}円持っています。そのうち ${p}% で本を買い、残りの ${q}% でノートを買いました。残りは何円ですか。`,a:`式 ${B} × (1 − ${num(p/100)}) = ${R1}、${R1} × (1 − ${num(q/100)}) = ${R2}　答え ${R2}円`,steps:[`本を買った残り：${B} × ${num(1-p/100)} = ${R1}`,`その ${q}% を使った残り：${R1} × ${num(1-q/100)} = ${R2}`]}),
    ()=>({q:`はじめに持っていたお金の ${p}% を使い、次に残りの ${q}% を使ったら、${R2}円残りました。はじめに何円持っていましたか。`,a:`式 ${R2} ÷ (1 − ${num(q/100)}) = ${R1}、${R1} ÷ (1 − ${num(p/100)}) = ${B}　答え ${B}円`,steps:['うしろから順にもどる',`${R2}円は1回目の残りの ${num(1-q/100)} → 1回目の残り ${R1}円`,`${R1}円ははじめの ${num(1-p/100)} → はじめ ${B}円`]}),
    ()=>{const N=B/100*(chance(.5)?1:2)*10;const r1=N*(100-p)/100,r2=r1*(100-q)/100;if(r1%1||r2%1)return{q:`${B}円持っています。そのうち ${p}% で本を買い、残りの ${q}% でノートを買いました。残りは何円ですか。`,a:`式 ${B} × (1 − ${num(p/100)}) = ${R1}、${R1} × (1 − ${num(q/100)}) = ${R2}　答え ${R2}円`,steps:[`${B} × ${num(1-p/100)} = ${R1}`,`${R1} × ${num(1-q/100)} = ${R2}`]};
      return{q:`ある本を、1日目に全体の ${p}% 読み、2日目に残りの ${q}% 読んだので、まだ読んでいないページは ${r2}ページです。この本は全部で何ページですか。`,a:`式 ${r2} ÷ (1 − ${num(q/100)}) = ${r1}、${r1} ÷ (1 − ${num(p/100)}) = ${N}　答え ${N}ページ`,steps:[`${r2}ページは1日目の残りの ${num(1-q/100)}`,`1日目の残り ${r1}ページは全体の ${num(1-p/100)}`]}},
   ])()}}},
};

/* ---------- 5年の章に入れる ---------- */
(()=>{const put=(ch,ids,first=false)=>{const c=GRADE_UNITS[5].find(x=>x.ch===ch);if(!c)throw new Error('no chapter '+ch);const us=ids.map(id=>NEW5E[id]);if(first)c.items.unshift(...us);else c.items.push(...us)};
  put('倍数と約数',['g5-remain','g5-venn']);put('体積',['g5-cubecount'],true);put('三角形・四角形の角',['g5-fold']);put('三角形・四角形の面積',['g5-road']);
  put('正多角形と円・角柱と円柱',['g5-arcperim','g5-net']);put('割合',['g5-pctable','g5-ratio2'])})();

/* ---------- 「なぜ？」の図 ---------- */
WHY['g5-cubecount']=()=>{const a=stackSVG([[1,1,0],[2,1,1]],7),b=stackSVG([[1,1,0],[1,1,1]],7,'#f4f4f4');
  return W1(SVGW(`0 0 ${num(a.w*2+30)} ${num(a.h)}`,a.g+`<g transform="translate(${num(a.w+26)},0)">${b.g}</g>`+T(a.w+13,a.h/2,'→',5)),'段ごとに数える',['左：上の段の積み木を数える（1こ）','右：1だん目だけにすると、5こ','合わせて 5 + 1 = 6こ → 6cm³'])};
WHY['g5-venn']=()=>{let g=`<circle cx="30" cy="20" r="15" fill="${CB}" fill-opacity=".6" stroke="#111" stroke-width=".5"/><circle cx="52" cy="20" r="15" fill="${CR}" fill-opacity=".6" stroke="#111" stroke-width=".5"/>`+T(24,17,'2の倍数',3)+T(24,23,'(偶数)',3)+T(59,17,'3の倍数',3)+T(41,21,'6の',2.8)+T(41,25,'倍数',2.8)+T(86,10,'1〜12 では',3.2,'start')+T(86,16,'2の倍数 6こ',3.2,'start')+T(86,22,'3の倍数 4こ',3.2,'start')+T(86,28,'両方 2こ',3.2,'start')+T(86,34,'→ 6 + 4 − 2 = 8こ',3.2,'start');
  return W1(SVGW('0 0 124 38',g),'重なりを1回だけ数える',['2の倍数と3の倍数をたすと、6の倍数（重なり）を2回数えてしまう','だから重なりの数を1回ひく','どちらでもない数 ＝ 全体 − （少なくともどちらかの倍数）'])};
WHY['g5-remain']=()=>{let g='';for(let i=1;i<=25;i++){const x=4+((i-1)%13)*8,y=8+Math.floor((i-1)/13)*12;const m4=(i-1)%4===0,m6=(i-1)%6===0;g+=box(x,y-5,7,7,m4&&m6?CR:m4?CB:m6?CG:'#fff',.3)+T(x+3.5,y,i,3)}
  return W1(SVGW('0 0 110 24',g),'4でも6でも1あまる数',['青：4でわると1あまる数（1, 5, 9, 13, …）','緑：6でわると1あまる数（1, 7, 13, 19, …）','赤が両方。13 − 1 = 12、25 − 1 = 24 → 4と6の公倍数に1をたした数'])};
WHY['g5-fold']=()=>W1(foldSVG(60,'○','□'),'折り返した角',['点線はもとのテープ。折り返した部分は、もとの部分とぴったり重なる','だから折り目をはさんだ2つの角（○）は等しい','下の一直線は180°なので、□ ＝ 180° − ○ × 2']);
WHY['g5-road']=()=>{let g=`<rect x="4" y="4" width="40" height="26" fill="${CG}" stroke="#111" stroke-width=".6"/><rect x="20" y="4" width="5" height="26" fill="#fff" stroke="#111" stroke-width=".4"/><rect x="4" y="15" width="40" height="5" fill="#fff" stroke="#111" stroke-width=".4"/>`+arrowR(48,17,60,'寄せる')+`<rect x="64" y="4" width="40" height="26" fill="#fff" stroke="#111" stroke-width=".6"/><rect x="64" y="4" width="35" height="21" fill="${CG}" stroke="#111" stroke-width=".4"/>`;
  return W1(SVGW('0 0 108 34',g),'道を寄せる',['道をはしに寄せても、緑の部分の面積は変わらない','緑の部分は、たても横も道のはばだけ短い1つの長方形になる'])};
WHY['g5-arcperim']=()=>{let g=`<path d="M6,34 A26,26 0 0 1 32,8" fill="none" stroke="#c0392b" stroke-width="1"/><path d="M6,34 V8 H32" fill="none" stroke="#999" stroke-dasharray="1.5 1" stroke-width=".4"/><circle cx="6" cy="34" r="26" fill="none" stroke="#ccc" stroke-width=".3" stroke-dasharray="1 1"/>`+T(40,14,'4分の1の円の曲線',3.3,'start')+T(40,21,'＝ 円周 ÷ 4',3.3,'start')+T(40,28,'＝ 半径 × 2 × 3.14 ÷ 4',3.3,'start');
  return W1(SVGW('0 0 116 38',g),'円周の一部',['曲線部分は、もとの円の円周の何分の1かを考える','まっすぐな部分（半径・直径・正方形の辺）もわすれずにたす'])};
WHY['g5-net']=()=>{let g=`<ellipse cx="20" cy="8" rx="12" ry="3.5" fill="${CB}" stroke="#111" stroke-width=".5"/><path d="M8,8 V30 A12,3.5 0 0 0 32,30 V8" fill="#f4f4f4" stroke="#111" stroke-width=".5"/>`+arrowR(38,20,52,'開く')+`<rect x="56" y="10" width="60" height="20" fill="#f4f4f4" stroke="#111" stroke-width=".5"/>`+T(86,36,'横 ＝ 底面の円周',3.4)+`<path d="M56,8 H116" stroke="#c0392b" stroke-width=".7"/>`;
  return W1(SVGW('0 0 120 38',g),'側面を開くと長方形',['円柱の側面を切り開くと長方形になる','長方形の横は、底面の円のまわりにぴったり巻きついていた → 円周と同じ長さ'])};
WHY['g5-pctable']=()=>{let g=`<polygon points="40,4 70,34 10,34" fill="#fff" stroke="#111" stroke-width=".6"/><line x1="25" y1="19" x2="55" y2="19" stroke="#111" stroke-width=".5"/><line x1="40" y1="19" x2="40" y2="34" stroke="#111" stroke-width=".5"/>`+T(40,15,'くらべる量',3)+T(28,29,'もとにする',2.6)+T(28,32.5,'量',2.6)+T(53,30,'割合',3)+T(78,12,'上を求める → 下どうしをかける',3.2,'start')+T(78,20,'下を求める → 上 ÷ もう一方',3.2,'start');
  return W1(SVGW('0 0 128 38',g),'3つの量の関係',['くらべる量 ＝ もとにする量 × 割合','割合 ＝ くらべる量 ÷ もとにする量、もとにする量 ＝ くらべる量 ÷ 割合','百分率・歩合は小数（割合）になおしてから計算する'])};
WHY['g5-ratio2']=()=>{let g=tape(6,4,24,8,CR,'40%')+tape(30,4,36,8,CB,'残り 60%')+`<path d="M30,13 L10,19 M66,13 L86,19" stroke="#999" stroke-width=".4"/>`+tape(10,19,19,8,CR,'25%')+tape(29,19,57,8,CG,'残り')+T(48,34,'2段目は「残り」を 1（100%）とみる',3.3);
  return W1(SVGW('0 0 96 37',g),'もとにする量が変わる',['1段目：はじめの量を1として、40%を使う → 残りは 0.6','2段目：その残りを1として、25%を使う → 0.6 × 0.75 = 0.45','はじめの量 × 0.6 × 0.75 が最後の残り'])};
