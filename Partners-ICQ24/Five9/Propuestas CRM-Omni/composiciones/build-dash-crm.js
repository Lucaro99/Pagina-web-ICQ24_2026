// Reconstruye Dash_CRM.html: portátil 16:10 + CRMs como protagonistas.
// Uso: node build-dash-crm.js <carpeta composiciones>
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const src = fs.readFileSync(path.join(dir, 'Dash_CRM_v1.html'), 'utf8');
const L = src.split('\n');

let head = L.slice(0, L.findIndex(l => l.includes('</head>')) + 1).join('\n');
head = head.replace('</style>', `  .lt { position: absolute; z-index: 2; }
  .lt .lid { position: relative; background: #16191f; border-radius: 26px 26px 6px 6px; padding: 18px 18px 24px; box-shadow: 0 0 0 3px #a3a9b2, 0 30px 70px rgba(15,23,42,.16); }
  .lt .lid::before { content: ""; position: absolute; top: 7px; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: #343a44; }
  .lt .screen { position: relative; overflow: hidden; border-radius: 6px; background: #f3f6fb; }
  .lt .base { position: relative; height: 22px; margin: 0 -66px; border-radius: 4px 4px 26px 26px; background: linear-gradient(180deg, #e3e6ea 0%, #c4c9d0 45%, #9ba1aa 100%); box-shadow: 0 24px 34px rgba(15,23,42,.14); }
  .lt .base::before { content: ""; position: absolute; top: 0; left: 50%; width: 190px; height: 9px; margin-left: -95px; border-radius: 0 0 12px 12px; background: #a9afb8; }
  .crm { position: absolute; z-index: 3; width: 390px; height: 160px; padding: 22px 26px; border-radius: 30px; display: flex; flex-direction: column; justify-content: space-between; }
  .crm .top { display: flex; align-items: center; justify-content: space-between; height: 66px; }
  .crm .top img { max-width: 230px; object-fit: contain; }
  .crm p { font-size: 18px; font-weight: 600; color: var(--muted); display: flex; align-items: center; gap: 10px; }
  .crm p i { color: var(--blue); }
  .stage { display: grid; grid-template-columns: 110px 1fr 46px; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; color: var(--muted); margin-top: 14px; }
  .stage .bar-track { height: 12px; }
  .reg { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 2px solid #f1f5f9; }
  .reg:last-child { border-bottom: 0; padding-bottom: 0; }
  .reg b { display: block; font-size: 19px; font-weight: 700; color: var(--text); }
  .reg span { display: block; font-size: 15px; font-weight: 500; color: var(--muted); margin-top: 2px; }
  .regx { flex: 1; display: flex; align-items: center; gap: 10px; padding: 13px 14px; border-radius: 18px; background: #f8fbff; border: 2px solid #e3ecfb; font-size: 17px; font-weight: 700; color: var(--text); white-space: nowrap; }
  .regx > i { color: var(--blue); font-size: 18px; }
  .regx .check { margin-left: auto; width: 30px; height: 30px; font-size: 14px; }
  .reg .check { margin-left: auto; width: 34px; height: 34px; font-size: 16px; }
</style>`);

// Marcado de la app dentro de la pantalla
const s = L.findIndex(l => l.includes('<div class="app">'));
const b = L.findIndex((l, i) => i > s && l.includes('<div class="base"></div>'));
// .app termina 3 líneas antes de la base (</div> screen, </div> lid)
let app = L.slice(s, b - 2).join('\n');

const pipeOld = /<div class="panel">\s*<h5>Pipeline<\/h5>[\s\S]*?margin-top:10px"><\/div>\s*<\/div>/;
if (!pipeOld.test(app)) throw new Error('pipeline no encontrado');
app = app.replace(pipeOld, `<div class="panel">
                <h5>Pipeline <span class="pill-ui green" style="font-size:12px"><i class="fa-solid fa-arrows-rotate"></i> Sincronizado</span></h5>
                <div class="stage">Prospecto<div class="bar-track"><div class="bar-fill" style="width:42%;background:#bcd5fb"></div></div>42</div>
                <div class="stage">Calificado<div class="bar-track"><div class="bar-fill" style="width:64%;background:#8ab4f8"></div></div>31</div>
                <div class="stage">Propuesta<div class="bar-track"><div class="bar-fill" style="width:48%"></div></div>18</div>
                <div class="stage">Cierre<div class="bar-track"><div class="bar-fill" style="width:28%;background:#1e2a8a"></div></div>9</div>
                <h5 style="margin-top:24px">Próxima acción</h5>
                <div class="skeleton" style="width:86%"></div><div class="skeleton" style="width:58%;margin-top:10px"></div>
                <div style="display:flex;gap:8px;margin-top:16px"><span class="pill-ui"><i class="fa-regular fa-calendar"></i> Seguimiento</span></div>
              </div>`);

const LP = '../../../../Img General/Logos Partner/';
const tiles = [
  ['Salesforce.svg', 'Salesforce', 64, 'Service Cloud y Sales Cloud', 'fa-solid fa-headset'],
  ['HubSpot.svg', 'HubSpot', 46, 'Click-to-call y sincronización', 'fa-solid fa-phone'],
  ['Microsoft Dynamics 365.svg', 'Microsoft Dynamics 365', 60, 'Screen pop con contexto', 'fa-solid fa-id-card'],
  ['Odoo.webp', 'Odoo', 46, 'Open CTI y APIs REST', 'fa-solid fa-code'],
];
const tops = [247, 429, 611, 793];

const body = `<body>
<div class="canvas" style="width:1920px;height:1200px">
<div style="position:absolute;inset:0;transform:translateY(-45px)">

  <svg class="abs" style="left:0;top:0;z-index:1" width="1920" height="1200" fill="none">
    <defs>
      <marker id="ae" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="14" refY="10" orient="auto"><path d="M2 2 L16 10 L2 18" fill="none" stroke="#0263e2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
      <marker id="as" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="20" refX="6" refY="10" orient="auto"><path d="M18 2 L4 10 L18 18" fill="none" stroke="#0263e2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></marker>
      <linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#0263e2"/><stop offset="1" stop-color="#8ab4f8"/></linearGradient>
    </defs>
    <path d="M1178 595 H1220" stroke="#0263e2" stroke-width="3.5" marker-start="url(#as)" marker-end="url(#ae)"/>
    <g stroke="url(#lg)" stroke-width="3.5" stroke-linecap="round">
${tops.map(t => `      <path d="M1440 595 C1478 595 1462 ${t + 80} 1500 ${t + 80}"/>`).join('\n')}
    </g>
  </svg>

  <div class="lt" style="left:90px;top:250px;width:1070px">
    <div class="lid">
      <div class="screen" style="width:1034px;height:646px">
        <div style="width:1348px;height:843px;transform:scale(0.7671);transform-origin:0 0">
${app}
        </div>
      </div>
    </div>
    <div class="base"></div>
  </div>

  <!-- Nodo de integración -->
  <div class="node" style="left:1230px;top:490px;width:210px;height:210px;flex-direction:column;gap:6px;font-size:70px">
    <i class="fa-solid fa-link"></i>
    <div style="font-size:17px;font-weight:800;color:#0f172a">Five9 CTI</div>
  </div>

  <div class="t-label" style="position:absolute;left:1502px;top:200px;color:#475569">Integración nativa con</div>
${tiles.map(([f, alt, h, cap, ic], i) => `  <div class="card crm" style="left:1500px;top:${tops[i]}px">
    <div class="top"><img src="${LP}${f}" alt="${alt}" style="max-height:${h}px"/><div class="check"><i class="fa-solid fa-check"></i></div></div>
    <p><i class="${ic}"></i>${cap}</p>
  </div>`).join('\n')}

  <!-- Registro automático -->
  <div class="card" style="left:110px;top:1010px;width:1120px;padding:20px 24px;border-radius:30px;display:flex;align-items:center;gap:16px">
    <div style="display:flex;align-items:center;gap:14px;flex-shrink:0">
      <div class="ico md"><i class="fa-solid fa-arrows-rotate"></i></div>
      <div class="t-title" style="font-size:21px;line-height:1.2">Registro<br/>automático</div>
    </div>
    <div class="regx"><i class="fa-solid fa-phone"></i>Llamada registrada<div class="check"><i class="fa-solid fa-check"></i></div></div>
    <div class="regx"><i class="fa-solid fa-note-sticky"></i>Nota creada<div class="check"><i class="fa-solid fa-check"></i></div></div>
    <div class="regx"><i class="fa-solid fa-ticket"></i>Caso actualizado<div class="check"><i class="fa-solid fa-check"></i></div></div>
  </div>
</div>
</div>
</body>
</html>
`;
fs.writeFileSync(path.join(dir, 'Dash_CRM.html'), head + '\n' + body);
console.log('ok, líneas app:', app.split('\n').length);
