/* ============ 図・グラフを使う問題（追加分） ============ */
function addUnits(g,chName,items){const chs=GRADE_UNITS[g];let ch=chs.find(c=>c.ch===chName);if(!ch){ch={ch:chName,items:[]};chs.push(ch)}ch.items.push(...items)}
const RED='#d2372b';
const gl=(W,H,s,ox=0,oy=0)=>{let g='';for(let i=0;i<=W;i++)g+=`<line x1="${num(ox+i*s)}" y1="${num(oy)}" x2="${num(ox+i*s)}" y2="${num(oy+H*s)}"/>`;for(let j=0;j<=H;j++)g+=`<line x1="${num(ox)}" y1="${num(oy+j*s)}" x2="${num(ox+W*s)}" y2="${num(oy+j*s)}"/>`;return `<g stroke="#c4c4c4" stroke-width=".35">${g}</g>`};
const polyS=(pts,s,ox,oy,col='#111',fill='none',w=1.3)=>`<polygon points="${pts.map(p=>num(ox+p[0]*s)+','+num(oy+p[1]*s)).join(' ')}" fill="${fill}" stroke="${col}" stroke-width="${w}" stroke-linejoin="round"/>`;
const dot=(x,y,r=1.2,c='#111')=>`<circle cx="${num(x)}" cy="${num(y)}" r="${r}" fill="${c}"/>`;
const ABC='ABCDEFGHIJKLMN';
function sideLab(P,i,j,t,fs=4.4){const cx=P.reduce((a,p)=>a+p[0],0)/P.length,cy=P.reduce((a,p)=>a+p[1],0)/P.length;const p=P[i],q=P[j],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;
  let nx=-(q[1]-p[1]),ny=q[0]-p[0];const d=Math.hypot(nx,ny)||1;nx/=d;ny/=d;if(nx*(mx-cx)+ny*(my-cy)<0){nx=-nx;ny=-ny}return T(mx+nx*4.5,my+ny*4.5+fs*.35,t,fs)}
function angLab(P,i,t,fs=3.8,r=7){const p=P[i],a=P[(i+1)%3],b=P[(i+2)%3];const u=[a[0]-p[0],a[1]-p[1]],v=[b[0]-p[0],b[1]-p[1]];const nu=Math.hypot(...u),nv=Math.hypot(...v);let bx=u[0]/nu+v[0]/nv,by=u[1]/nu+v[1]/nv;const d=Math.hypot(bx,by)||1;return T(p[0]+bx/d*r,p[1]+by/d*r+fs*.35,t,fs)}
function randPoly(W,H,k){for(let t=0;t<2000;t++){const pts=[];while(pts.length<k){const p=[ri(0,W),ri(0,H)];if(!pts.some(q=>q[0]===p[0]&&q[1]===p[1]))pts.push(p)}
  const cx=pts.reduce((a,p)=>a+p[0],0)/k,cy=pts.reduce((a,p)=>a+p[1],0)/k;pts.sort((a,b)=>Math.atan2(a[1]-cy,a[0]-cx)-Math.atan2(b[1]-cy,b[0]-cx));
  let ok=true;for(let i=0;i<k;i++){const a=pts[i],b=pts[(i+1)%k],c=pts[(i+2)%k];if((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])===0)ok=false}
  const area=Math.abs(pts.reduce((s,p,i)=>{const q=pts[(i+1)%k];return s+p[0]*q[1]-q[0]*p[1]},0))/2;
  const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);if(ok&&area>=W*H*.3&&Math.max(...xs)-Math.min(...xs)===W&&Math.max(...ys)-Math.min(...ys)===H)return pts}
  return [[0,H],[W,H],[0,0]]}
const kName=k=>k.n>k.d?`${FH(k)}倍の拡大図`:`${FH(k)}の縮図`;
/** 頂点ラベルを図形の外側に置く */
function vLabels(P,names,fs=6){const cx=P.reduce((a,p)=>a+p[0],0)/P.length,cy=P.reduce((a,p)=>a+p[1],0)/P.length;
  return P.map((p,i)=>{const dx=p[0]-cx,dy=p[1]-cy,d=Math.hypot(dx,dy)||1;return T(p[0]+dx/d*5,p[1]+dy/d*5+fs*.35,names[i],fs)}).join('')}

/* ---------- 6年：拡大図と縮図 ---------- */
addUnits(6,'拡大図と縮図',[
 {id:'enl-grid',title:'方眼に拡大図・縮図をかく',kind:'fig',n:2,cols:1,lead:'左の図形の拡大図・縮図を、右の方眼にかきましょう。',
  explain:{points:[{h:'拡大図・縮図',b:'形を変えずに大きくした図を拡大図、小さくした図を縮図といいます。対応する辺の長さの比はすべて等しく、対応する角の大きさはそれぞれ等しくなります。'},{h:'方眼でのかき方',b:'1つの頂点から次の頂点まで「横に何ます・縦に何ます」かを数え、それを2倍（または1/2）にして進みます。'}],
   tip:'<b>ここに注意</b>　横だけ・縦だけを2倍にすると形が変わってしまいます。横も縦も同じ倍にしましょう。'},
  gen(){const up=chance(.6),k=up?new Fr(2):new Fr(1,2),n=ri(3,4);
    const base=randPoly(up?4:3,up?4:3,n);
    const orig=up?base.map(p=>[p[0]+1,p[1]+1]):base.map(p=>[p[0]*2+1,p[1]*2+1]);
    const ans=up?base.map(p=>[p[0]*2+1,p[1]*2+1]):base.map(p=>[p[0]+1,p[1]+1]);
    const OW=up?6:8,NW=up?10:5,s=96/(OW+NW+2),ox2=(OW+2)*s,H=Math.max(OW,NW);
    const nm=ABC.slice(0,n).split('');
    const lab=(P,ox,names)=>vLabels(P.map(p=>[ox+p[0]*s,p[1]*s+4]),names,4.5);
    const draw=(show)=>SVGW(`-2 0 100 ${num(H*s+8)}`,`${gl(OW,OW,s,0,4)}${gl(NW,NW,s,ox2,4)}${polyS(orig,s,0,4)}${lab(orig,0,nm)}${dot(ox2+ans[0][0]*s,4+ans[0][1]*s,1.3)}${T(ox2+ans[0][0]*s+3,4+ans[0][1]*s-2,"A'",4.5,'start')}${show?polyS(ans,s,ox2,4,RED,'none',1.4):''}`);
    const dx=orig[1][0]-orig[0][0],dy=orig[1][1]-orig[0][1];const kk=up?2:.5;
    const mv=(a,b,c,d)=>[a?`${a>0?'右':'左'}に ${Math.abs(a)} ます`:'',b?`${b>0?'下':'上'}に ${Math.abs(b)} ます`:''].filter(Boolean).join('、');
    return{q:`<div class="figcap">${kName(k)}をかきましょう。頂点Aに対応する点はA'です。</div><div class="fig" style="max-width:130mm">${draw(false)}</div>`,a:`<div class="fig" style="max-width:130mm">${draw(true)}</div>`,figAns:true,
      steps:[`辺ABは、Aから ${mv(dx,dy)} → ${FH(k)}倍にして、A'から ${mv(dx*kk,dy*kk)}`,'ほかの辺も同じように進み、最後にA\'にもどる','角の大きさは もとの図形と同じになっているか確かめる']}}},
 {id:'enl-find',title:'拡大図・縮図を見つける',kind:'fig',n:2,cols:1,lead:'「もとの図形」の拡大図や縮図になっているものを、ア〜エから すべて選びましょう。また、何倍の拡大図か、何分の1の縮図かも答えましょう。',
  explain:{points:[{h:'見分け方',b:'すべての辺が同じ倍になっていて、角の大きさが変わっていなければ、拡大図・縮図です。'},{h:'方眼で調べる',b:'横の長さ・縦の長さを数えて、横も縦も同じ倍になっているかを調べます。'}],tip:'<b>ここに注意</b>　1つの辺だけ同じ倍でも、ほかの辺がちがえば拡大図・縮図ではありません。'},
  gen(){const B0=randPoly(2,2,ri(3,4)),base=B0.map(p=>[p[0]*2,p[1]*2]);
    const opts=shuffle([
      {pts:B0,ok:true,d:`横も縦も ${F(1,2)} → ${F(1,2)}の縮図`,a:`${F(1,2)}の縮図`},
      {pts:B0.map(p=>[p[0]*3,p[1]*3]),ok:true,d:'横も縦も 1.5倍 → 1.5倍の拡大図',a:'1.5倍の拡大図'},
      {pts:B0.map(p=>[p[0]*4,p[1]*4]),ok:true,d:'横も縦も 2倍 → 2倍の拡大図',a:'2倍の拡大図'},
      {pts:B0.map(p=>[p[0]*4,p[1]*2]),ok:false,d:'横は2倍だが縦は同じ → 形がちがう'},
      {pts:B0.map(p=>[p[0]*2,p[1]*4]),ok:false,d:'縦は2倍だが横は同じ → 形がちがう'},
      {pts:B0.map(p=>[p[0]*3,p[1]*2]),ok:false,d:'横は1.5倍だが縦は同じ → 形がちがう'}]);
    let pick4=opts.slice(0,4);if(!pick4.some(o=>o.ok))pick4[0]=opts.find(o=>o.ok);if(pick4.every(o=>o.ok))pick4[3]=opts.find(o=>!o.ok);
    const panels=[{pts:base,name:'もとの図形'},...pick4.map((o,i)=>({...o,name:'アイウエ'[i]}))];
    const s=3.1;let x=1,svg='';const H=Math.max(...panels.map(p=>Math.max(...p.pts.map(q=>q[1]))))+2;
    panels.forEach(p=>{const w=Math.max(...p.pts.map(q=>q[0]))+2;svg+=gl(w,H,s,x,2)+polyS(p.pts.map(q=>[q[0]+1,q[1]+1]),s,x,2,'#111','#ededed',1)+T(x+w*s/2,H*s+8,p.name,4.5);x+=w*s+3});
    const okL=pick4.map((o,i)=>o.ok?`${'アイウエ'[i]}（${o.a}）`:null).filter(Boolean);
    return{q:`<div class="fig">${SVGW(`0 0 ${num(x)} ${num(H*s+11)}`,svg)}</div>`,a:`<b>${okL.join('、')}</b>`,steps:pick4.map((o,i)=>`${'アイウエ'[i]}：${o.d}`)}}},
 {id:'enl-side',title:'拡大図・縮図の辺と角',kind:'fig',n:2,cols:1,lead:'三角形DEFは、三角形ABCの拡大図か縮図です。',
  explain:{points:[{h:'辺の長さ',b:'対応する辺の長さは、すべて同じ倍になります。1組の辺から何倍かを求め、ほかの辺にもかけます。',ex:'AB 3 cm → DE 6 cm なら 2倍'},{h:'角と面積',b:'対応する角の大きさは変わりません。面積は「倍 × 倍」になります（2倍の拡大図なら 4倍）。'}],tip:'<b>ここに注意</b>　角の大きさまで2倍にしないようにしましょう。'},
  gen(){const ks=[new Fr(2),new Fr(2),new Fr(1,2),new Fr(3,2)];let k,b,c;
    for(;;){k=pick(ks);b=ri(3,8);c=ri(3,8);if(b===c||Math.abs(b-c)>3)continue;const kb=b*k.n/k.d,kc=c*k.n/k.d;if(k.d===1||(kb*2%1===0&&kc*2%1===0&&b%2===0&&c%2===0))break}
    const A=ri(10,18)*5,ra=A*Math.PI/180,kv=k.n/k.d;
    const cs=Math.cos(ra),sn=Math.sin(ra);
    const box=z=>({mn:Math.min(0,c*z*cs),w:Math.max(b*z,c*z*cs)-Math.min(0,c*z*cs),h:c*z*sn});
    const b1=box(1),b2=box(kv),u=Math.min(76/(b1.w+b2.w),40/Math.max(b1.h,b2.h));
    const tri=(x0,z)=>[[x0,50],[x0+b*z*u,50],[x0+c*z*u*cs,50-c*z*u*sn]];
    const P1=tri(8-b1.mn*u,1),P2=tri(8+b1.w*u+18-b2.mn*u,kv);
    const side=(p,q,t,flip)=>{const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;return T(mx+(flip?-2.5:0),my+(flip?-1:8.5),t,4.4,flip?'end':'middle')};
    const lab1=vLabels(P1,['A','B','C'],5),lab2=vLabels(P2,['D','E','F'],5);
    const svg=SVGW('0 0 106 62',`${polyS(P1,1,0,0,'#111','#ededed',1)}${polyS(P2,1,0,0,'#111','#ededed',1)}${lab1}${lab2}${sideLab(P1,0,1,b+'cm')}${sideLab(P1,0,2,c+'cm')}${angLab(P1,0,A+'°')}${sideLab(P2,0,1,num(b*kv)+'cm')}`);
    const k2=k.mul(k);
    return{q:`<div class="fig" style="max-width:130mm">${svg}</div><div class="figcap">(1) 三角形DEFは、三角形ABCの何倍の拡大図（何分の1の縮図）ですか。　(2) 辺DFの長さは何cmですか。　(3) 角Dの大きさは何度ですか。　(4) 三角形DEFの面積は、三角形ABCの面積の何倍ですか。</div>`,parts:['(1)','(2)','(3)','(4)'],
      a:`(1) <b>${kName(k)}</b>　(2) <b>${num(c*kv)} cm</b>　(3) <b>${A}°</b>　(4) <b>${FH(k2)}倍</b>`,
      steps:[`辺ABと辺DEが対応：${num(b*kv)} ÷ ${b} = ${FH(k)}`,`辺DF = 辺AC × ${FH(k)} = ${c} × ${FH(k)} = ${num(c*kv)}`,'角Dは角Aと対応し、大きさは変わらない',`面積は ${FH(k)} × ${FH(k)} = ${FH(k2)}倍`]}}},
 {id:'enl-center',title:'1つの点を中心にした拡大図・縮図',kind:'fig',n:2,cols:2,lead:'点Aを中心にして、三角形ABCの拡大図・縮図をかきましょう。',
  explain:{points:[{h:'かき方',b:'中心の点Aから、点B・点Cを通る直線をひきます。AB、ACの長さを2倍（1/2）にしたところに点をとって結びます。'},{h:'方眼を使うと',b:'Aから「横に何ます・縦に何ます」で表し、その数を2倍（1/2）にすると、対応する点が見つかります。'}],tip:'<b>ここに注意</b>　中心の点Aは、拡大しても縮小しても動きません。'},
  gen(){const up=chance(.6),k=up?2:.5;let B,C;
    for(;;){if(up){B=[ri(1,5),-ri(0,4)];C=[ri(0,5),-ri(1,4)]}else{B=[ri(1,5)*2,-ri(0,4)*2];C=[ri(0,5)*2,-ri(1,4)*2]}
      const cr=B[0]*C[1]-B[1]*C[0];if(cr!==0&&!(B[0]===C[0]&&B[1]===C[1]))break}
    const W=11,H=9,s=96/W,A=[0.5,8.5].map(v=>v),toP=o=>[1+o[0],H-1+o[1]];
    const Ap=toP([0,0]),Bp=toP(B),Cp=toP(C),B2=toP([B[0]*k,B[1]*k]),C2=toP([C[0]*k,C[1]*k]);
    const base=`${gl(W,H,s,0,0)}${polyS([Ap,Bp,Cp],s,0,0)}${vLabels([Ap,Bp,Cp].map(p=>[p[0]*s,p[1]*s]),['A','B','C'],5)}`;
    const far=up?[B2,C2]:[Bp,Cp];
    const rays=far.map(p=>`<line x1="${num(Ap[0]*s)}" y1="${num(Ap[1]*s)}" x2="${num(p[0]*s)}" y2="${num(p[1]*s)}" stroke="${RED}" stroke-width=".6" stroke-dasharray="2 1.5"/>`).join('');
    const vb=`-4 -4 ${num(W*s+8)} ${num(H*s+8)}`;
    const mv=o=>[o[0]?`右に ${Math.abs(o[0])} ます`:'',o[1]?`上に ${Math.abs(o[1])} ます`:''].filter(Boolean).join('、');
    return{q:`<div class="figcap">${up?'2倍の拡大図':`${F(1,2)}の縮図`}をかきましょう。</div><div class="fig">${SVGW(vb,base)}</div>`,a:`<div class="fig">${SVGW(vb,base+rays+polyS([Ap,B2,C2],s,0,0,RED,'none',1.4))}</div>`,figAns:true,
      steps:[`点Bは、Aから ${mv(B)} → ${up?'2倍':'半分'}にして ${mv([B[0]*k,B[1]*k])} のところに点をとる`,`点Cも同じように、Aから ${mv([C[0]*k,C[1]*k])} のところ`,'Aと、とった2つの点を結ぶ']}}},
]);

/* ---------- 6年：対称な図形（判定・対応） ---------- */
const SHAPES=(()=>{const reg=(n,r=16)=>Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i*2*Math.PI/n;return[20+r*Math.cos(a),21+r*Math.sin(a)]});
  return[{n:'正三角形',p:reg(3,18),l:3,pt:false},{n:'二等辺三角形',p:[[20,4],[30,36],[10,36]],l:1,pt:false},{n:'直角三角形',p:[[7,6],[7,35],[33,35]],l:0,pt:false},
   {n:'正方形',p:[[7,7],[33,7],[33,33],[7,33]],l:4,pt:true},{n:'長方形',p:[[3,11],[37,11],[37,30],[3,30]],l:2,pt:true},{n:'ひし形',p:[[20,3],[33,20],[20,37],[7,20]],l:2,pt:true},
   {n:'平行四辺形',p:[[11,11],[37,11],[29,30],[3,30]],l:0,pt:true},{n:'台形',p:[[9,11],[26,11],[37,30],[3,30]],l:0,pt:false},{n:'正五角形',p:reg(5,17),l:5,pt:false},{n:'正六角形',p:reg(6,17),l:6,pt:true}]})();
const SYM6=GRADE_UNITS[6].find(c=>c.ch==='対称な図形');
SYM6.items.push(
 {id:'sym-judge',title:'線対称・点対称を調べる',kind:'fig',n:2,cols:1,lead:'下の図形について調べ、表にまとめましょう。',
  explain:{points:[{h:'線対称かどうか',b:'1本の直線で折って、ぴったり重なるかを考えます。重なる折り目の数が対称の軸の数です。'},{h:'点対称かどうか',b:'ある点を中心に180°回したとき、もとの形にぴったり重なるかを考えます。'}],tip:'<b>はっけん</b>　正多角形の対称の軸の数は、頂点の数と同じです。頂点の数が偶数の正多角形は点対称でもあります。'},
  gen(){const sh=shuffle([...SHAPES]).slice(0,5);
    const head=`<tr><th></th>${sh.map(s=>`<th style="font-weight:400"><svg viewBox="0 0 40 40" style="width:15mm;height:15mm;display:block;margin:0 auto">${polyS(s.p,1,0,0,'#111','#ededed',1)}</svg>${s.n}</th>`).join('')}</tr>`;
    const tbl=(show)=>`<table class="tbl" style="width:100%">${head}<tr><th>線対称</th>${sh.map(s=>`<td${show?' class="r"':''}>${show?(s.l?'○':'×'):''}</td>`).join('')}</tr><tr><th>対称の軸の数</th>${sh.map(s=>`<td${show?' class="r"':''}>${show?s.l:''}</td>`).join('')}</tr><tr><th>点対称</th>${sh.map(s=>`<td${show?' class="r"':''}>${show?(s.pt?'○':'×'):''}</td>`).join('')}</tr></table>`;
    return{q:`<div class="figcap">線対称なら○、そうでなければ×を書き、対称の軸の数（ないときは0）も書きましょう。</div>${tbl(false)}`,a:tbl(true),figAns:true,steps:['折って重なるか（線対称）、180°回して重なるか（点対称）を考える','正多角形の対称の軸の数は、頂点の数と同じ']}}},
 {id:'sym-corr',title:'対応する点・辺・角',kind:'fig',n:2,cols:2,lead:'図を見て答えましょう。',
  explain:{points:[{h:'線対称な図形',b:'対称の軸で折ったときに重なる点・辺・角を、対応する点・辺・角といいます。対応する点を結ぶ直線は、軸と垂直に交わります。'},{h:'点対称な図形',b:'対称の中心で180°回したときに重なる点・辺・角が対応します。対応する点を結ぶ直線は、対称の中心を通ります。'}],tip:'<b>こつ</b>　図を頭の中で折ったり回したりして、重なる相手をさがしましょう。'},
  gen(){
    if(chance(.5)){let half;for(;;){const k=ri(2,3),ang=Array.from({length:k},()=>ri(25,155)).sort((a,b)=>a-b);half=[];let ok=true;
        for(const a of ang){const r=ri(2,5),x=5+Math.round(r*Math.sin(a*Math.PI/180)),y=5-Math.round(r*Math.cos(a*Math.PI/180));if(x<=5||half.some(p=>p[0]===x&&p[1]===y)){ok=false;break}half.push([x,y])}if(ok)break}
      const top=[5,ri(0,2)],bot=[5,ri(8,10)],P=[top,...half,bot,...half.map(p=>[10-p[0],p[1]]).reverse()],n=P.length,mp=i=>(n-i)%n;
      const nm=ABC.slice(0,n).split(''),s=8.6,pp=P.map(p=>[p[0]*s,p[1]*s]);
      const svg=SVGW('-6 -6 98 98',`${polyS(P,s,0,0,'#111','#ededed',1.1)}<line x1="${5*s}" y1="-5" x2="${5*s}" y2="${10*s+5}" stroke="#111" stroke-width=".7" stroke-dasharray="5 2 1.2 2"/>${vLabels(pp,nm,5)}`);
      const i=1,j=2;
      return{q:`<div class="fig">${svg}</div><div class="figcap">線対称な図形です。(1) 点${nm[i]}に対応する点　(2) 辺${nm[i]}${nm[j]}に対応する辺　(3) 角${nm[j]}に対応する角　(4) 直線${nm[i]}${nm[mp(i)]}と対称の軸は、どのように交わっていますか。</div>`,parts:['(1)','(2)','(3)','(4)'],
        a:`(1) <b>点${nm[mp(i)]}</b>　(2) <b>辺${nm[mp(i)]}${nm[mp(j)]}</b>　(3) <b>角${nm[mp(j)]}</b>　(4) <b>垂直に交わる</b>`,steps:['対称の軸で折ったときに重なる相手をさがす',`${nm[i]} ↔ ${nm[mp(i)]}、${nm[j]} ↔ ${nm[mp(j)]}`]};
    }
    let half;for(;;){const m=ri(2,3),a0=rng()*Math.PI;half=[];let ok=true;for(let t=0;t<m;t++){const an=a0+(t+.5)*Math.PI/m,r=ri(2,4),o=[Math.round(r*Math.cos(an)),Math.round(r*Math.sin(an))];if((o[0]===0&&o[1]===0)||half.some(p=>p[0]===o[0]&&p[1]===o[1])){ok=false;break}half.push(o)}if(ok)break}
    const m=half.length,P=[...half,...half.map(o=>[-o[0],-o[1]])].map(o=>[5+o[0],5-o[1]]),n=P.length,mp=i=>(i+m)%n;
    const nm=ABC.slice(0,n).split(''),s=8.6,pp=P.map(p=>[p[0]*s,p[1]*s]);
    const svg=SVGW('-6 -6 98 98',`${polyS(P,s,0,0,'#111','#ededed',1.1)}${dot(5*s,5*s,1.4)}${T(5*s+3,5*s-2,'O',5,'start')}${vLabels(pp,nm,5)}`);
    return{q:`<div class="fig">${svg}</div><div class="figcap">点対称な図形です。(1) 点Aに対応する点　(2) 辺ABに対応する辺　(3) 角Bに対応する角　(4) 直線A${nm[mp(0)]}は、どの点を通りますか。</div>`,parts:['(1)','(2)','(3)','(4)'],
      a:`(1) <b>点${nm[mp(0)]}</b>　(2) <b>辺${nm[mp(0)]}${nm[mp(1)]}</b>　(3) <b>角${nm[mp(1)]}</b>　(4) <b>対称の中心O</b>`,steps:['点Oを中心に180°回したときに重なる相手をさがす',`A ↔ ${nm[mp(0)]}、B ↔ ${nm[mp(1)]}`]};
  }});

/* ---------- 6年：比例・反比例のグラフ ---------- */
function axes(xmax,ymax,s,ox,oy,ystep,xl,yl,xtick=1,ytick=1){
  let t=gl(xmax,ymax,s,ox,oy-ymax*s);
  t+=`<line x1="${ox}" y1="${oy}" x2="${num(ox+xmax*s+3)}" y2="${oy}" stroke="#111" stroke-width=".8"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${num(oy-ymax*s-3)}" stroke="#111" stroke-width=".8"/>`;
  for(let i=0;i<=xmax;i+=xtick)t+=T(ox+i*s,oy+4.5,i,3.4);
  for(let j=ytick;j<=ymax;j+=ytick)t+=T(ox-1.5,oy-j*s+1.2,num(j*ystep),3.4,'end');
  t+=T(ox+xmax*s+4,oy+1,xl,3.6,'start')+T(ox,oy-ymax*s-5,yl,3.6);return t}
addUnits(6,'比例と反比例',[
 {id:'prop-graph',title:'比例のグラフをかく',kind:'fig',n:2,cols:2,lead:'表を見て、xとyの関係をグラフに表しましょう。',
  explain:{points:[{h:'比例のグラフ',b:'比例する2つの量の関係をグラフに表すと、0の点（原点）を通る直線になります。'},{h:'かき方',b:'表の x と y の組を点でとり、0の点と結んで直線をひきます。'}],tip:'<b>ここに注意</b>　直線は 0 の点から始まります。点をまちがえていないか、2つ以上の点で確かめましょう。'},
  gen(){const a=pick([1,2,3,0.5,1.5]),xmax=a<1||a===1.5?8:6,ymax=a*xmax,ys=ymax>12?2:1;
    const xs=a===0.5||a===1.5?[0,2,4,6,8]:[0,1,2,3,4,5];
    const tbl=`<table class="tbl"><tr><th>${X}</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>${Y}</th>${xs.map(x=>`<td>${num(a*x)}</td>`).join('')}</tr></table>`;
    const yc=Math.ceil(ymax/ys),s=Math.min(70/xmax,66/yc),ox=10,oy=yc*s+8;
    const base=axes(xmax,yc,s,ox,oy,ys,X.replace(/<[^>]+>/g,'')||'x','y');
    const sol=`<line x1="${ox}" y1="${oy}" x2="${num(ox+xmax*s)}" y2="${num(oy-a*xmax/ys*s)}" stroke="${RED}" stroke-width="1.2"/>${xs.map(x=>dot(ox+x*s,oy-a*x/ys*s,1,RED)).join('')}`;
    const vb=`0 0 ${num(ox+xmax*s+10)} ${num(oy+7)}`;
    return{q:`${tbl}<div class="fig">${SVGW(vb,base.replace('>x<','><tspan font-style="italic">x</tspan><'))}</div>`,a:`<div class="fig">${SVGW(vb,base+sol)}</div>`,figAns:true,steps:[`表の組（${xs.slice(1,3).map(x=>`${x}, ${num(a*x)}`).join('）（')}）を点でとる`,'0 の点と結んで直線をひく']}}},
 {id:'graph-read',title:'グラフを読み取る',kind:'fig',n:2,cols:1,lead:'グラフを見て答えましょう。',
  explain:{points:[{h:'グラフの読み方',b:'横の軸で x の値を見つけ、まっすぐ上に進んで線とぶつかった点の、縦の軸の目もりを読みます。'},{h:'くらべる',b:'2本のグラフでは、かたむきが急な方が、同じ時間で多く進む（速い）ことを表します。'}],tip:'<b>ここに注意</b>　1目もりがいくつを表しているかを、最初に確かめましょう。'},
  gen(){const step=80,a1=80,a2=pick([40,60]),xmax=8,yc=8,s=8,ox=12,oy=yc*s+8;
    let t=axes(xmax,yc,s,ox,oy,step,'(分)','(m)',1,1);
    t+=`<line x1="${ox}" y1="${oy}" x2="${num(ox+xmax*s)}" y2="${num(oy-a1*xmax/step*s)}" stroke="#111" stroke-width="1.3"/><line x1="${ox}" y1="${oy}" x2="${num(ox+xmax*s)}" y2="${num(oy-a2*xmax/step*s)}" stroke="#111" stroke-width="1.3" stroke-dasharray="3 1.5"/>`;
    t+=T(ox+xmax*s*.55-2,oy-a1*xmax*.55/step*s-2,'ひろと',3.8,'end')+T(ox+xmax*s+1,oy-a2*xmax/step*s+4,'みお',3.8,'start');
    const xq=4,yq=a2*6;
    return{q:`<div class="figcap">ひろとさん（実線）とみおさん（点線）が、同じ場所から同時に歩き始めました。グラフは、歩いた時間 ${X} 分と道のり ${Y} m を表しています。</div><div class="fig" style="max-width:110mm">${SVGW(`0 0 ${ox+xmax*s+16} ${oy+7}`,t)}</div><div class="figcap">(1) 速いのはどちらですか。　(2) 歩き始めて ${xq}分後、2人は何mはなれていますか。　(3) みおさんが ${yq} m 歩くのは何分後ですか。　(4) ひろとさんの ${X} と ${Y} の関係を式に表しましょう。</div>`,parts:['(1)','(2)','(3)','(4)'],
      a:`(1) <b>ひろとさん</b>　(2) <b>${(a1-a2)*xq} m</b>　(3) <b>6分後</b>　(4) <b>${Y} = ${a1} × ${X}</b>`,steps:['かたむきが急な方が速い',`${xq}分のとき：ひろと ${a1*xq} m、みお ${a2*xq} m → 差 ${(a1-a2)*xq} m`,`縦の軸の ${yq} から横に進み、点線とぶつかったところの時間を読む`,`1分で ${a1} m 進むので ${Y} = ${a1} × ${X}`]}}},
 {id:'inv-graph',title:'反比例のグラフ',kind:'fig',n:2,cols:2,lead:'表を見て、xとyの組を表す点をとりましょう。',
  explain:{points:[{h:'反比例のグラフ',b:'反比例のグラフは直線にならず、なめらかな曲線になります。0の点は通りません。'},{h:'かき方',b:'表の x と y の組を点でとり、点どうしをなめらかな線でつなぎます。'}],tip:'<b>ここに注意</b>　点と点を定規でまっすぐ結ぶのではなく、曲線でつなぎます。'},
  gen(){const K=pick([12,24]),ys=K===12?1:2,xs=[];for(let i=1;i<=12;i++)if(K%i===0&&K/i<=K)xs.push(i);
    const tbl=`<table class="tbl"><tr><th>${X}</th>${xs.map(x=>`<td>${x}</td>`).join('')}</tr><tr><th>${Y}</th>${xs.map(x=>`<td>${K/x}</td>`).join('')}</tr></table>`;
    const yc=12,s=6,ox=10,oy=yc*s+8;const base=axes(12,yc,s,ox,oy,ys,'x','y',2,2);
    const curve=[];for(let x=K/(yc*ys);x<=12.001;x+=.1)curve.push(`${num(ox+x*s)},${num(oy-K/x/ys*s)}`);
    const sol=xs.map(x=>dot(ox+x*s,oy-K/x/ys*s,1.1,RED)).join('')+`<polyline points="${curve.join(' ')}" fill="none" stroke="${RED}" stroke-width=".8"/>`;
    const vb=`0 0 ${ox+12*s+8} ${oy+7}`;
    return{q:`${tbl}<div class="fig">${SVGW(vb,base)}</div>`,a:`<div class="fig">${SVGW(vb,base+sol)}</div>`,figAns:true,steps:['表の組を点でとる',`${X} × ${Y} = ${K} がいつも成り立っている`,'点をなめらかな線でつなぐ']}}},
]);

/* ---------- 6年：データ（ドットプロット・ヒストグラム） ---------- */
addUnits(6,'データの活用',[
 {id:'dotplot',title:'ドットプロット',kind:'fig',n:2,cols:1,lead:'データをドットプロットに表して答えましょう。',
  explain:{points:[{h:'ドットプロット',b:'数直線の上に、データを1つずつ●で表した図です。同じ値は上に積み上げます。'},{h:'読み取り',b:'いちばん高く積み上がった値が最頻値です。中央値は、左から数えてまん中の●の値です。'}],tip:'<b>こつ</b>　かいた●の数が、データの個数と同じになっているか確かめましょう。'},
  gen(){const lo=ri(0,10),hi=lo+10;for(let t=0;t<3000;t++){const n=ri(12,16),mode=ri(lo+2,hi-2),v=[mode,mode,mode,mode];while(v.length<n)v.push(ri(lo,hi));
      const c={};v.forEach(x=>c[x]=(c[x]||0)+1);if(Object.entries(c).some(([x,k])=>+x!==mode&&k>=4))continue;
      const s=[...v].sort((a,b)=>a-b),med=n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2;shuffle(v);
      const u=8.4,ox=6,oy=42;let line=`<line x1="${ox-2}" y1="${oy}" x2="${ox+10*u+2}" y2="${oy}" stroke="#111" stroke-width=".8"/>`;for(let i=0;i<=10;i++)line+=`<line x1="${ox+i*u}" y1="${oy}" x2="${ox+i*u}" y2="${oy+2}" stroke="#111" stroke-width=".6"/>${T(ox+i*u,oy+6.5,lo+i,3.6)}`;
      const dots=Object.entries(c).map(([x,k])=>Array.from({length:k},(_,j)=>dot(ox+(+x-lo)*u,oy-3-j*4.2,1.7,RED)).join('')).join('');
      return{q:`<div class="figcap">${n}人が1週間に読んだ本のページ数（×10ページ）の記録です。</div><div class="datalist">${v.map(x=>`<span>${x}</span>`).join('')}</div><div class="fig" style="max-width:120mm">${SVGW('0 0 96 50',line)}</div><div class="figcap">(1) ドットプロットに表しましょう。　(2) 最頻値を求めましょう。　(3) 中央値を求めましょう。</div>`,parts:['(2)','(3)'],
        a:`<div class="fig" style="max-width:120mm">${SVGW('0 0 96 50',line+dots)}</div>(2) <b>${mode}</b>　(3) <b>${num(med)}</b>`,steps:[`${mode} の●が ${c[mode]}こで いちばん多い`,n%2?`${n}人なので、小さい方から ${(n+1)/2} 番目の ${med}`:`${n}人なので、${n/2} 番目と ${n/2+1} 番目の平均 (${s[n/2-1]} + ${s[n/2]}) ÷ 2 = ${num(med)}`]}}}},
 {id:'histogram',title:'度数分布表とヒストグラム',kind:'fig',n:1,cols:1,lead:'データを整理して答えましょう。',
  explain:{points:[{h:'度数分布表',b:'データをいくつかの区間（階級）に分けて、それぞれに入る個数（度数）を表にしたものです。「20以上25未満」には20は入り、25は入りません。'},{h:'ヒストグラム',b:'度数分布表を柱状のグラフに表したものです。柱と柱の間はあけません。'}],tip:'<b>こつ</b>　数えたデータに／をつけていくと、数えまちがいが少なくなります。'},
  gen(){const cls=[15,20,25,30,35];for(let t=0;t<3000;t++){const v=Array.from({length:20},()=>ri(15,39));const c=cls.map(b=>v.filter(x=>x>=b&&x<b+5).length);const mx=Math.max(...c);if(c.filter(x=>x===mx).length>1||c.some(x=>x===0))continue;
      const over=v.filter(x=>x>=30).length;
      const tbl=(sh)=>`<table class="tbl"><tr><th>きょり（m）<br><span style="font-weight:400;font-size:8pt">以上〜未満</span></th>${cls.map(b=>`<th style="font-weight:400;font-size:8.5pt">${b}〜${b+5}</th>`).join('')}<th>合計</th></tr><tr><th>人数（人）</th>${c.map(x=>`<td${sh?' class="r"':''}>${sh?x:''}</td>`).join('')}<td>20</td></tr></table>`;
      const yc=Math.max(8,mx+1),s=6.2,ox=12,oy=yc*s+6;let g=gl(5,yc,s*2,ox,oy-yc*s*2/2);
      g='';for(let j=0;j<=yc;j++)g+=`<line x1="${ox}" y1="${num(oy-j*s)}" x2="${ox+5*12}" y2="${num(oy-j*s)}" stroke="#c4c4c4" stroke-width=".35"/>${j%2?'':T(ox-1.5,oy-j*s+1.2,j,3.4,'end')}`;
      g+=`<line x1="${ox}" y1="${oy}" x2="${ox+5*12+2}" y2="${oy}" stroke="#111" stroke-width=".8"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${num(oy-yc*s-2)}" stroke="#111" stroke-width=".8"/>`;
      cls.concat([40]).forEach((b,i)=>g+=T(ox+i*12,oy+4.5,b,3.4));g+=T(ox+64,oy+1,'(m)',3.4,'start')+T(ox,oy-yc*s-4,'(人)',3.4);
      const bars=c.map((x,i)=>`<rect x="${ox+i*12}" y="${num(oy-x*s)}" width="12" height="${num(x*s)}" fill="#f4c7c3" stroke="${RED}" stroke-width=".8"/>`).join('');
      const vb=`0 0 ${ox+74} ${oy+7}`,mi=c.indexOf(mx);
      return{q:`<div class="figcap">20人のソフトボール投げの記録（m）です。</div><div class="datalist">${v.map(x=>`<span>${x}</span>`).join('')}</div>${tbl(false)}<div class="fig" style="max-width:95mm">${SVGW(vb,g)}</div><div class="figcap">(1) 度数分布表を完成させましょう。　(2) ヒストグラムに表しましょう。　(3) 人数がいちばん多いのは、どの階級ですか。　(4) 30m以上投げた人は、全体の何%ですか。</div><div class="answer-lines"><div class="ln"><span>(3)</span><i></i></div><div class="ln"><span>(4)</span><i></i></div></div>`,figAns:true,
        a:`${tbl(true)}<div class="fig" style="max-width:95mm">${SVGW(vb,g+bars)}</div>(3) <b>${cls[mi]}m以上${cls[mi]+5}m未満</b>　(4) <b>${over*5}%</b>`,steps:['階級ごとに、入るデータを数える（境目の数は「以上」の方に入る）',`30m以上は ${c[3]} + ${c[4]} = ${over}人`,`${over} ÷ 20 = ${num(over/20)} → ${over*5}%`]}}}},
]);

/* ---------- 6年：組み合わせた図形の面積 ---------- */
GRADE_UNITS[6].find(c=>c.ch==='円の面積・立体の体積').items.splice(1,0,
 {id:'circle-combo',title:'円を組み合わせた図形の面積',kind:'fig',n:4,cols:2,lead:'色のついた部分の面積を求めましょう。円周率は 3.14 とします。',
  explain:{points:[{h:'全体からひく',b:'色のついた部分を「大きい図形 − 小さい図形」と考えます。',ex:'正方形 − おうぎ形'},{h:'分けてたす',b:'いくつかの部分に分けて求め、あとでたすこともできます。半円・4分の1の円の面積は、円の面積を2や4でわります。'}],tip:'<b>こつ</b>　どの図形からどの図形をひけばよいかを、図に線を書きこんで考えましょう。'},
  gen(){const t=pick(['corner','leaf','donut','inscribed']),G='#d9d9d9';
    if(t==='corner'){const a=pick([4,6,8,10,20]),q=num(a*a*3.14/4),v=num(a*a-a*a*3.14/4);return{q:`<div class="fig" style="max-width:55mm">${SVGW('0 0 100 100',`<rect x="10" y="10" width="80" height="80" fill="${G}" stroke="#111" stroke-width="1.2"/><path d="M10,90 L10,10 A80,80 0 0 1 90,90 Z" fill="#fff" stroke="#111" stroke-width="1.2"/>${T(50,98,a+'cm',7)}`)}</div><div class="figcap">（正方形と、円を4等分した形）</div>`,a:`<b>${v} cm²</b>`,steps:[`正方形：${a} × ${a} = ${a*a}`,`円を4等分した形：${a} × ${a} × 3.14 ÷ 4 = ${q}`,`${a*a} − ${q} = ${v}`]}}
    if(t==='leaf'){const a=pick([4,6,8,10,20]),q=num(a*a*3.14/4),v=num(a*a*3.14/2-a*a);return{q:`<div class="fig" style="max-width:55mm">${SVGW('0 0 100 100',`<rect x="10" y="10" width="80" height="80" fill="#fff" stroke="#111" stroke-width="1.2"/><path d="M10,10 A80,80 0 0 1 90,90 A80,80 0 0 1 10,10 Z" fill="${G}" stroke="#111" stroke-width="1.2"/>${T(50,98,a+'cm',7)}`)}</div><div class="figcap">（正方形の中に、円を4等分した形を2つ重ねた）</div>`,a:`<b>${v} cm²</b>`,steps:[`円を4等分した形1つ：${a} × ${a} × 3.14 ÷ 4 = ${q}`,`2つ分から正方形をひく：${q} × 2 − ${a*a} = ${v}`]}}
    if(t==='donut'){const r=ri(1,5),R=r+ri(1,5),v=num((R*R-r*r)*3.14);return{q:`<div class="fig" style="max-width:55mm">${SVGW('0 0 100 100',`<circle cx="50" cy="50" r="42" fill="${G}" stroke="#111" stroke-width="1.2"/><circle cx="50" cy="50" r="${num(42*r/R)}" fill="#fff" stroke="#111" stroke-width="1.2"/>${dot(50,50)}<line x1="50" y1="50" x2="92" y2="50" stroke="#111" stroke-width=".8"/><line x1="50" y1="50" x2="${num(50-42*r/R*.7071)}" y2="${num(50-42*r/R*.7071)}" stroke="#111" stroke-width=".8"/>${T(80,47,R+'cm',6)}${T(44,44,r+'cm',6,'end')}`)}</div>`,a:`<b>${v} cm²</b>`,steps:[`大きい円：${R} × ${R} × 3.14 = ${num(R*R*3.14)}`,`小さい円：${r} × ${r} × 3.14 = ${num(r*r*3.14)}`,`${num(R*R*3.14)} − ${num(r*r*3.14)} = ${v}`]}}
    const a=pick([4,6,8,10,20]),r=a/2,v=num(a*a-r*r*3.14);return{q:`<div class="fig" style="max-width:55mm">${SVGW('0 0 100 100',`<rect x="10" y="10" width="80" height="80" fill="${G}" stroke="#111" stroke-width="1.2"/><circle cx="50" cy="50" r="40" fill="#fff" stroke="#111" stroke-width="1.2"/>${T(50,98,a+'cm',7)}`)}</div><div class="figcap">（正方形にぴったり入った円）</div>`,a:`<b>${v} cm²</b>`,steps:[`正方形：${a} × ${a} = ${a*a}`,`円の半径は ${a} ÷ 2 = ${r}、面積 ${r} × ${r} × 3.14 = ${num(r*r*3.14)}`,`${a*a} − ${num(r*r*3.14)} = ${v}`]}}});

/* ---------- 1年 ---------- */
addUnits(1,'かずと かたち',[
 {id:'g1-count',title:'かずを かぞえよう',kind:'fig',n:4,cols:2,lead:'それぞれ いくつ ありますか。',
  explain:{points:[{h:'しるしを つけて かぞえる',b:'かぞえた ものに ✓を つけていくと、2かい かぞえたり、わすれたり しません。'},{h:'なかまに わける',b:'まる・さんかく・しかく の なかまごとに かぞえます。'}],tip:'<b>こつ</b>　ひだりうえから じゅんばんに かぞえよう。'},
  gen(){const cnt=[ri(2,9),ri(2,9),ri(2,9)],cells=shuffle([...Array(30).keys()]);let k=0,g='';
    const sh=[(x,y)=>`<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#111" stroke-width="1.2"/>`,(x,y)=>`<polygon points="${x},${y-5.5} ${x+5.5},${y+4.5} ${x-5.5},${y+4.5}" fill="#fff" stroke="#111" stroke-width="1.2"/>`,(x,y)=>`<rect x="${x-4.6}" y="${y-4.6}" width="9.2" height="9.2" fill="#fff" stroke="#111" stroke-width="1.2"/>`];
    cnt.forEach((n,t)=>{for(let i=0;i<n;i++){const c=cells[k++];g+=sh[t](8+(c%6)*16.5+ri(-2,2),8+Math.floor(c/6)*13+ri(-1,1))}});
    return{q:`<div class="fig" style="max-width:70mm">${SVGW('0 0 100 68',`<rect x=".5" y=".5" width="99" height="67" rx="3" fill="none" stroke="#999" stroke-width=".6"/>${g}`)}</div><div class="figcap">まる（　）こ　さんかく（　）こ　しかく（　）こ</div>`,a:`<b>まる ${cnt[0]}こ、さんかく ${cnt[1]}こ、しかく ${cnt[2]}こ</b>`,steps:['かぞえた ものに しるしを つける','なかまごとに かぞえる']}}},
 {id:'g1-numline',title:'かずの せん',kind:'fig',n:4,cols:1,lead:'↓の ところの かずを かきましょう。',
  explain:{points:[{h:'めもりを よむ',b:'1めもりが いくつかを みてから、すうじの かいてある ところから かぞえます。'},{h:'大きい かず',b:'みぎに いくほど かずが 大きく なります。'}],tip:'<b>こつ</b>　5 や 10 の ところを めじるしに しよう。'},
  gen(){const st=pick([0,0,10,20,30,40,50,60,70,80,90,100]),L=20;const pts=shuffle([...Array(L+1).keys()].filter(i=>i%5)).slice(0,3).sort((a,b)=>a-b);
    const u=4.5,ox=5;let t=`<line x1="${ox-2}" y1="20" x2="${ox+L*u+3}" y2="20" stroke="#111" stroke-width=".8"/>`;
    for(let i=0;i<=L;i++)t+=`<line x1="${ox+i*u}" y1="${i%5?18.5:17}" x2="${ox+i*u}" y2="${i%5?21.5:23}" stroke="#111" stroke-width="${i%5?.5:.8}"/>${i%10===0?T(ox+i*u,28,st+i,4):''}`;
    pts.forEach((p,j)=>t+=`<path d="M${ox+p*u},8 v7 M${ox+p*u-1.5},12.5 L${ox+p*u},15 L${ox+p*u+1.5},12.5" fill="none" stroke="#111" stroke-width=".7"/>${T(ox+p*u,6,'アイウ'[j],4)}`);
    return{q:`<div class="fig">${SVGW('0 0 100 31',t)}</div><div class="figcap">ア（　　）　イ（　　）　ウ（　　）</div>`,a:`<b>ア ${st+pts[0]}　イ ${st+pts[1]}　ウ ${st+pts[2]}</b>`,steps:['1めもりは 1',`ア：${st+Math.floor(pts[0]/10)*10} から ${pts[0]%10} めもり すすむ → ${st+pts[0]}`]}}},
]);
/* ---------- 2年 ---------- */
addUnits(2,'長さ・かさ・時こく',[
 {id:'g2-ruler',title:'ものさしの 目もり',kind:'fig',n:4,cols:1,lead:'テープの 長さは どれだけですか。',
  explain:{points:[{h:'cm と mm',b:'ものさしの 大きい 目もり 1つが 1 cm、小さい 目もり 1つが 1 mm です。1 cm = 10 mm。'},{h:'読み方',b:'まず 何 cm かを 読み、のこりの 小さい 目もりを 数えて mm を 読みます。',ex:'5 cm と 3 mm → 5 cm 3 mm = 53 mm'}],tip:'<b>ちゅうい</b>　はしが 0 の 目もりに そろっているか たしかめましょう。'},
  gen(){const L=ri(15,118);const u=0.78,ox=4;let t=`<rect x="${ox-2}" y="12" width="${120*u+4}" height="14" fill="#fff" stroke="#111" stroke-width=".7"/>`;
    for(let i=0;i<=120;i++){const h=i%10===0?6:i%5===0?4.2:2.6;t+=`<line x1="${num(ox+i*u)}" y1="12" x2="${num(ox+i*u)}" y2="${num(12+h)}" stroke="#111" stroke-width="${i%10?.3:.55}"/>`;if(i%10===0)t+=T(ox+i*u,24,i/10,3.6)}
    t+=`<rect x="${ox}" y="4" width="${num(L*u)}" height="6" fill="#d9d9d9" stroke="#111" stroke-width=".6"/>`;
    const cm=Math.floor(L/10),mm=L%10;
    return{q:`<div class="fig">${SVGW('0 0 100 28',t)}</div><div class="figcap">（　　）cm（　　）mm ＝（　　）mm</div>`,a:`<b>${cm} cm ${mm} mm ＝ ${L} mm</b>`,steps:[`大きい 目もりで ${cm} cm`,`のこりの 小さい 目もりが ${mm}こで ${mm} mm`,`${cm} cm = ${cm*10} mm なので、${cm*10} + ${mm} = ${L} mm`]}}},
]);
/* ---------- 3年 ---------- */
addUnits(3,'円と 球・グラフ',[
 {id:'g3-ball',title:'円と 球',kind:'fig',n:4,cols:2,lead:'図を 見て 答えましょう。',
  explain:{points:[{h:'半径と 直径',b:'円や 球の 中心から まわりまでが 半径、中心を 通って はしから はしまでが 直径です。直径 = 半径 × 2'},{h:'ならんだ ボール',b:'同じ 大きさの ボールが ぴったり ならんでいるとき、全体の 長さ = 直径 × こ数 です。'}],tip:'<b>ちゅうい</b>　半径を 聞かれているのか、直径を 聞かれているのか、よく 読みましょう。'},
  gen(){const n=ri(2,4),r=ri(2,6),d=r*2,len=d*n,ask=chance(.5);const R=40/n;let g=`<rect x="8" y="${50-R-1}" width="${num(n*2*R+2)}" height="${num(2*R+2)}" fill="none" stroke="#111" stroke-width="1"/>`;
    for(let i=0;i<n;i++)g+=`<circle cx="${num(9+R+i*2*R)}" cy="50" r="${num(R)}" fill="#ededed" stroke="#111" stroke-width="1"/>`;
    g+=`<line x1="8" y1="${num(50+R+6)}" x2="${num(10+n*2*R)}" y2="${num(50+R+6)}" stroke="#111" stroke-width=".6"/>${T(9+n*R,50+R+12,ask?len+'cm':'？',6)}`;
    if(!ask)g+=`<line x1="${num(9+R)}" y1="50" x2="${num(9+2*R)}" y2="50" stroke="#111" stroke-width=".7"/>${T(9+1.5*R,48,r+'cm',5)}`;
    return ask?{q:`<div class="fig">${SVGW('0 0 100 80',g)}</div><div class="figcap">同じ 大きさの ボールが ${n}こ ぴったり 入っています。ボールの 半径は 何 cm ですか。</div>`,a:`<b>${r} cm</b>`,steps:[`直径は ${len} ÷ ${n} = ${d} cm`,`半径は ${d} ÷ 2 = ${r} cm`]}:{q:`<div class="fig">${SVGW('0 0 100 80',g)}</div><div class="figcap">半径 ${r} cm の ボールが ${n}こ ぴったり 入っています。箱の 横の 長さは 何 cm ですか。</div>`,a:`<b>${len} cm</b>`,steps:[`直径は ${r} × 2 = ${d} cm`,`${d} × ${n} = ${len} cm`]}}},
 {id:'g3-bar',title:'ぼうグラフを 読む',kind:'fig',n:2,cols:1,lead:'ぼうグラフを 見て 答えましょう。',
  explain:{points:[{h:'1目もりを 調べる',b:'まず、いちばん小さい 1目もりが 何人を 表しているかを 調べます。'},{h:'くらべる',b:'ぼうの 長さを くらべると、どれが 多いか すぐに わかります。ちがいは ひき算で もとめます。'}],tip:'<b>ちゅうい</b>　1目もりが 1 とは かぎりません。2 や 5 の ときも あります。'},
  gen(){const cats=shuffle(['りんご','バナナ','みかん','ぶどう','いちご','メロン']).slice(0,5),st=pick([1,2,5]),v=cats.map(()=>ri(1,10)*st);const mx=Math.max(...v);if(v.filter(x=>x===mx).length>1)return this.gen();
    const yc=Math.ceil(mx/st)+1,s=Math.min(5.5,55/yc),ox=14,oy=yc*s+6;let g='';
    for(let j=0;j<=yc;j++)g+=`<line x1="${ox}" y1="${num(oy-j*s)}" x2="${ox+5*15}" y2="${num(oy-j*s)}" stroke="#c4c4c4" stroke-width=".35"/>${j%(st===1?2:1)===0||j===0?T(ox-1.5,oy-j*s+1.2,j*st,3.4,'end'):''}`;
    g+=`<line x1="${ox}" y1="${oy}" x2="${ox+75}" y2="${oy}" stroke="#111" stroke-width=".8"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${num(oy-yc*s)}" stroke="#111" stroke-width=".8"/>${T(ox,oy-yc*s-3,'(人)',3.4)}`;
    v.forEach((x,i)=>g+=`<rect x="${ox+4+i*15}" y="${num(oy-x/st*s)}" width="7" height="${num(x/st*s)}" fill="#bdbdbd" stroke="#111" stroke-width=".6"/>${T(ox+7.5+i*15,oy+5,cats[i],3.6)}`);
    const mi=v.indexOf(mx),[i1,i2]=shuffle([0,1,2,3,4]).slice(0,2);
    return{q:`<div class="figcap">すきな くだもの しらべ</div><div class="fig" style="max-width:110mm">${SVGW(`0 0 92 ${num(oy+8)}`,g)}</div><div class="figcap">(1) 1目もりは 何人ですか。　(2) いちばん 多いのは 何で、何人ですか。　(3) ${cats[i1]}と${cats[i2]}の ちがいは 何人ですか。</div>`,parts:['(1)','(2)','(3)'],
      a:`(1) <b>${st}人</b>　(2) <b>${cats[mi]}、${mx}人</b>　(3) <b>${Math.abs(v[i1]-v[i2])}人</b>`,steps:[`目もりの 数字から、1目もり ${st}人`,`いちばん 長い ぼうは ${cats[mi]}`,`${Math.max(v[i1],v[i2])} − ${Math.min(v[i1],v[i2])} = ${Math.abs(v[i1]-v[i2])}`]}}},
]);
/* ---------- 4年 ---------- */
addUnits(4,'面積と 角',[
 {id:'g4-protractor',title:'分度器で 角を はかる',kind:'fig',n:6,cols:3,lead:'分度器の 目もりを 読んで、角の 大きさを 答えましょう。',
  explain:{points:[{h:'分度器の あて方',b:'分度器の 中心を 角の 頂点に、0° の線を 角の 1つの 辺に 合わせます。'},{h:'目もりの 読み方',b:'0° から 数えて、もう1つの 辺が 通る 目もりを 読みます。1目もりは 1°、数字は 10° ごとです。'}],tip:'<b>ちゅうい</b>　分度器には 内がわと 外がわの 2つの 目もりが あります。0° から 始まる 方を 読みましょう。'},
  gen(){const th=ri(2,34)*5,cx=50,cy=56,R=44;let g=`<path d="M${cx-R},${cy} A${R},${R} 0 0 1 ${cx+R},${cy} Z" fill="#f6f6f6" stroke="#111" stroke-width=".8"/>`;
    for(let a=0;a<=180;a+=5){const r=a*Math.PI/180,l=a%10?3:5;g+=`<line x1="${num(cx+R*Math.cos(r))}" y1="${num(cy-R*Math.sin(r))}" x2="${num(cx+(R-l)*Math.cos(r))}" y2="${num(cy-(R-l)*Math.sin(r))}" stroke="#111" stroke-width=".45"/>`;if(a%30===0)g+=T(cx+(R-10)*Math.cos(r),cy-(R-10)*Math.sin(r)+1.5,a,4.2)}
    const r=th*Math.PI/180;g+=`<line x1="${cx}" y1="${cy}" x2="${cx+R+4}" y2="${cy}" stroke="#111" stroke-width="1.4"/><line x1="${cx}" y1="${cy}" x2="${num(cx+(R+4)*Math.cos(r))}" y2="${num(cy-(R+4)*Math.sin(r))}" stroke="#111" stroke-width="1.4"/>${dot(cx,cy,1.2)}`;
    return{q:`<div class="fig">${SVGW('0 4 100 56',g)}</div>`,a:`<b>${th}°</b>`,steps:['0° の線に 合わせた 辺から 数える',`もう1つの 辺は ${th}° の 目もりを 通っている`]}}},
]);
addUnits(4,'折れ線グラフ',[
 {id:'g4-line',title:'折れ線グラフを 読む',kind:'fig',n:2,cols:1,lead:'折れ線グラフを 見て 答えましょう。',
  explain:{points:[{h:'変わり方を 見る',b:'折れ線グラフは、時間とともに 変わる ようすを 表すのに 使います。線の かたむきが 急なほど、変わり方が 大きいです。'},{h:'読み方',b:'横の じくの 時こくから 上に 進み、点の 高さを 縦の じくで 読みます。'}],tip:'<b>こつ</b>　上がり方が いちばん 大きい ところは、線が いちばん 急に 上がっている ところです。'},
  gen(){for(let t=0;t<500;t++){const hrs=[8,9,10,11,12,13,14],pk=ri(3,5);let v=[ri(10,18)];for(let i=1;i<7;i++)v.push(v[i-1]+(i<=pk?ri(1,5):-ri(0,4)));
      const mx=Math.max(...v);if(v.filter(x=>x===mx).length>1)continue;const d=v.slice(1).map((x,i)=>x-v[i]);const md=Math.max(...d);if(d.filter(x=>x===md).length>1)continue;
      const lo=Math.floor(Math.min(...v)/2)*2-2,yc=mx-lo+2,s=Math.min(5,60/yc),ox=14,oy=yc*s+6,u=12;let g='';
      for(let j=0;j<=yc;j++)g+=`<line x1="${ox}" y1="${num(oy-j*s)}" x2="${ox+6*u}" y2="${num(oy-j*s)}" stroke="#c4c4c4" stroke-width=".35"/>${(lo+j)%2===0?T(ox-1.5,oy-j*s+1.2,lo+j,3.4,'end'):''}`;
      for(let i=0;i<7;i++)g+=`<line x1="${ox+i*u}" y1="${oy}" x2="${ox+i*u}" y2="${num(oy-yc*s)}" stroke="#c4c4c4" stroke-width=".35"/>${T(ox+i*u,oy+5,hrs[i],3.6)}`;
      g+=`<line x1="${ox}" y1="${oy}" x2="${ox+6*u+2}" y2="${oy}" stroke="#111" stroke-width=".8"/><line x1="${ox}" y1="${oy}" x2="${ox}" y2="${num(oy-yc*s)}" stroke="#111" stroke-width=".8"/>${T(ox+6*u+3,oy+1,'(時)',3.4,'start')}${T(ox,oy-yc*s-3,'(度)',3.4)}`;
      g+=`<polyline points="${v.map((x,i)=>`${ox+i*u},${num(oy-(x-lo)*s)}`).join(' ')}" fill="none" stroke="#111" stroke-width="1.1"/>${v.map((x,i)=>dot(ox+i*u,oy-(x-lo)*s,1.1)).join('')}`;
      const mi=v.indexOf(mx),di=d.indexOf(md),[a,b]=[ri(0,2),ri(4,6)];
      return{q:`<div class="figcap">ある日の 気温の 変わり方（${lo}度より 下は 省略しています）</div><div class="fig" style="max-width:110mm">${SVGW(`0 0 ${ox+6*u+12} ${num(oy+8)}`,g)}</div><div class="figcap">(1) 気温が いちばん 高いのは 何時で、何度ですか。　(2) 気温の 上がり方が いちばん 大きいのは、何時から何時の 間ですか。　(3) ${hrs[a]}時と ${hrs[b]}時の 気温の ちがいは 何度ですか。</div>`,parts:['(1)','(2)','(3)'],
        a:`(1) <b>${hrs[mi]}時、${mx}度</b>　(2) <b>${hrs[di]}時から${hrs[di+1]}時</b>　(3) <b>${Math.abs(v[a]-v[b])}度</b>`,steps:['いちばん 高い 点を さがす',`線が いちばん 急に 上がっているのは ${hrs[di]}時〜${hrs[di+1]}時（${md}度 上がった）`,`${Math.max(v[a],v[b])} − ${Math.min(v[a],v[b])} = ${Math.abs(v[a]-v[b])}`]}}}},
]);
/* ---------- 5年 ---------- */
addUnits(5,'図形の 面積と 体積',[
 {id:'g5-circum',title:'円周の長さ',kind:'fig',n:6,cols:3,lead:'つぎの 長さを 求めましょう。円周率は 3.14 とします。',
  explain:{points:[{h:'円周の 公式',b:'円周 = 直径 × 3.14（半径なら 半径 × 2 × 3.14）',ex:'直径 10 cm → 10 × 3.14 = 31.4 cm'},{h:'直径を 求める',b:'直径 = 円周 ÷ 3.14'}],tip:'<b>ちゅうい</b>　半円の まわりの 長さは、曲線部分（円周 ÷ 2）に 直径の 長さも たします。'},
  gen(){const t=pick(['d','r','rev','half']),Sv=i=>SVGW('0 0 100 92',i),fill='fill="#ededed" stroke="#111" stroke-width="1.3"';
    if(t==='d'){const d=ri(2,20);return{q:`<div class="fig">${Sv(`<circle cx="50" cy="46" r="38" ${fill}/><line x1="12" y1="46" x2="88" y2="46" stroke="#111" stroke-width="1"/>${T(50,42,d+'cm',8)}`)}</div><div class="figcap">円周の長さ</div>`,a:`<b>${num(d*3.14)} cm</b>`,steps:[`直径 × 3.14 = ${d} × 3.14 = ${num(d*3.14)}`]}}
    if(t==='r'){const r=ri(1,10);return{q:`<div class="fig">${Sv(`<circle cx="50" cy="46" r="38" ${fill}/><line x1="50" y1="46" x2="88" y2="46" stroke="#111" stroke-width="1"/>${dot(50,46)}${T(69,42,r+'cm',8)}`)}</div><div class="figcap">円周の長さ</div>`,a:`<b>${num(r*2*3.14)} cm</b>`,steps:[`直径 = ${r} × 2 = ${r*2}`,`${r*2} × 3.14 = ${num(r*2*3.14)}`]}}
    if(t==='rev'){const d=ri(2,20);return{q:`<div class="figcap" style="padding-top:6mm">円周が ${num(d*3.14)} cm の 円の 直径</div>`,a:`<b>${d} cm</b>`,steps:[`直径 = 円周 ÷ 3.14 = ${num(d*3.14)} ÷ 3.14 = ${d}`]}}
    const d=ri(2,10)*2,c=num(d*3.14/2);return{q:`<div class="fig">${Sv(`<path d="M10,66 A40,40 0 0 1 90,66 Z" ${fill}/>${T(50,78,d+'cm',8)}`)}</div><div class="figcap">半円の まわりの長さ</div>`,a:`<b>${num(d*3.14/2+d)} cm</b>`,steps:[`曲線部分：${d} × 3.14 ÷ 2 = ${c}`,`直径を たす：${c} + ${d} = ${num(d*3.14/2+d)}`]}}},
 {id:'g5-cong',title:'合同な図形',kind:'fig',n:2,cols:1,lead:'2つの 三角形は 合同です。',
  explain:{points:[{h:'合同',b:'ぴったり 重ね合わせることが できる 2つの 図形は 合同です。うら返して 重なる ときも 合同です。'},{h:'対応する 辺と 角',b:'合同な 図形では、対応する 辺の 長さと、対応する 角の 大きさが それぞれ 等しくなります。'}],tip:'<b>こつ</b>　図形を 回したり うら返したり したところを 想像して、重なる 頂点を 見つけましょう。'},
  gen(){let b,c;do{b=ri(3,7);c=ri(3,7)}while(b===c||Math.abs(b-c)>3);const A=ri(10,18)*5,ra=A*Math.PI/180;
    const P0=[[0,0],[b,0],[c*Math.cos(ra),-c*Math.sin(ra)]];const flip=chance(.5),rot=chance(.5);
    let Q=P0.map(p=>[flip?-p[0]:p[0],p[1]]);if(rot)Q=Q.map(p=>[-p[0],-p[1]]);
    const fitTo=(P,x0,w,h)=>{const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]),mn=[Math.min(...xs),Math.min(...ys)],sz=Math.max(Math.max(...xs)-mn[0],(Math.max(...ys)-mn[1])*1.2);const u=w/sz;return P.map(p=>[x0+(p[0]-mn[0])*u,6+(p[1]-mn[1])*u])};
    const P1=fitTo(P0,6,38),P2=fitTo(Q,56,38);const nm2=shuffle(['D','E','F']);
    const mid=(p,q,t)=>T((p[0]+q[0])/2,(p[1]+q[1])/2+4,t,4.6);
    const svg=SVGW('0 -4 100 60',`${polyS(P1,1,0,0,'#111','#ededed',1)}${polyS(P2,1,0,0,'#111','#ededed',1)}${vLabels(P1,['A','B','C'],5)}${vLabels(P2,nm2,5)}${sideLab(P1,0,1,b+'cm')}${sideLab(P1,0,2,c+'cm')}${angLab(P1,0,A+'°')}`);
    return{q:`<div class="fig" style="max-width:120mm">${svg}</div><div class="figcap">(1) 頂点Aに 対応する 頂点は どれですか。　(2) 辺${nm2[0]}${nm2[2]}の 長さは 何 cm ですか。　(3) 角${nm2[0]}の 大きさは 何度ですか。</div>`,parts:['(1)','(2)','(3)'],
      a:`(1) <b>頂点${nm2[0]}</b>　(2) <b>${c} cm</b>　(3) <b>${A}°</b>`,steps:[`A ↔ ${nm2[0]}、B ↔ ${nm2[1]}、C ↔ ${nm2[2]} が 対応している`,`辺${nm2[0]}${nm2[2]}は 辺ACと 対応 → ${c} cm`,`角${nm2[0]}は 角Aと 対応 → ${A}°`]}}},
]);
addUnits(5,'平均・単位量・速さ・割合',[
 {id:'g5-pie',title:'円グラフ・帯グラフを読む',kind:'fig',n:2,cols:1,lead:'グラフを見て答えましょう。',
  explain:{points:[{h:'割合のグラフ',b:'円グラフや帯グラフは、全体を100%として、それぞれの割合を面積や長さで表したグラフです。'},{h:'人数を求める',b:'全体の人数 × 割合 = その項目の人数',ex:'200人の 30% → 200 × 0.3 = 60人'}],tip:'<b>こつ</b>　ふつう、割合の大きい順に、「その他」は最後に並べます。'},
  gen(){const items=shuffle(['サッカー','野球','バスケットボール','水泳','テニス','ドッジボール']).slice(0,4);let p;
    for(;;){p=[ri(6,9)*5,ri(3,6)*5,ri(2,4)*5,ri(1,3)*5];const s=p.reduce((a,b)=>a+b);if(s<100&&100-s<=p[3]){p.sort((a,b)=>b-a);if(new Set(p).size===4)break}}
    const other=100-p.reduce((a,b)=>a+b),labs=[...items,'その他'],vals=[...p,other],N=pick([40,60,80,120,200,300]);
    let g='',a0=-Math.PI/2;vals.forEach((v,i)=>{const a1=a0+v/100*2*Math.PI,lg=v>50?1:0;g+=`<path d="M50,45 L${num(50+38*Math.cos(a0))},${num(45+38*Math.sin(a0))} A38,38 0 ${lg} 1 ${num(50+38*Math.cos(a1))},${num(45+38*Math.sin(a1))} Z" fill="${['#e8e8e8','#d0d0d0','#f4f4f4','#bdbdbd','#fff'][i]}" stroke="#111" stroke-width=".7"/>`;
      const m=(a0+a1)/2;g+=T(50+24*Math.cos(m),45+24*Math.sin(m),labs[i].length>5?labs[i].slice(0,4)+'…':labs[i],3.4)+T(50+24*Math.cos(m),45+24*Math.sin(m)+4.5,v+'%',3.6);a0=a1});
    for(let k=0;k<20;k++){const a=-Math.PI/2+k/20*2*Math.PI;g+=`<line x1="${num(50+38*Math.cos(a))}" y1="${num(45+38*Math.sin(a))}" x2="${num(50+41*Math.cos(a))}" y2="${num(45+41*Math.sin(a))}" stroke="#111" stroke-width=".4"/>`}
    const ratio=new Fr(p[0],p[2]);
    return{q:`<div class="figcap">${N}人に、いちばん好きなスポーツを聞きました。（${labs.slice(0,4).join('、')}、その他）</div><div class="fig" style="max-width:70mm">${SVGW('0 0 100 90',g)}</div><div class="figcap">(1) ${labs[1]}は全体の何%ですか。　(2) ${labs[0]}と答えた人は何人ですか。　(3) ${labs[0]}は、${labs[2]}の何倍ですか。</div>`,parts:['(1)','(2)','(3)'],
      a:`(1) <b>${p[1]}%</b>　(2) <b>${N*p[0]/100}人</b>　(3) <b>${A(ratio)}倍</b>`,steps:['円グラフの目もりは1つ5%',`${N} × ${num(p[0]/100)} = ${N*p[0]/100}`,`${p[0]} ÷ ${p[2]} = ${FH(ratio)}`]}}},
]);
