// Aplica el logotipo ICQ24 real como bordado sobre la camisa.
// Uso: node bordar.js <ruta sharp> <clave> <imagen-sin-logo> <salida> [escala]
const [, , SHARP, KEY, SRC, OUT, SCALE = '1'] = process.argv;
const sharp = require(SHARP);
const B = require('./boxes.json')[KEY];
const LOGO = __dirname + '/../../../../Img General/Logos Partner/Logo ICQ24_original.png';

(async () => {
  const meta = await sharp(LOGO).metadata();
  const w = Math.max(8, Math.round(B.w * parseFloat(SCALE)));
  const h = Math.round(w * meta.height / meta.width);
  const cx = B.x + B.w / 2, cy = B.y + B.h / 2;
  const x0 = Math.round(cx - w / 2), y0 = Math.round(cy - h / 2);
  const P = 8; // margen para sombra
  const RW = w + 2 * P, RH = h + 2 * P;

  // Logo a 4x y reducido: bordes limpios
  const logo = await sharp(LOGO).resize(w * 4).resize(w, h).extend({ top: P, bottom: P, left: P, right: P, background: { r: 0, g: 0, b: 0, alpha: 0 } }).raw().toBuffer();
  const blurA = await sharp(LOGO).resize(w * 4).resize(w, h).extend({ top: P, bottom: P, left: P, right: P, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel(3).blur(1.7).raw().toBuffer();
  const shadowA = await sharp(LOGO).resize(w * 4).resize(w, h).extend({ top: P + 2, bottom: P - 2, left: P + 1, right: P - 1, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel(3).blur(1.8).raw().toBuffer();

  const im = await sharp(SRC).metadata();

  // 1) Borrar el logo IA: detectar sus píxeles y rellenar con interpolación armónica de la tela
  const E = 14, ex = B.x - E, ey = B.y - E, EW = B.w + 2 * E, EH = B.h + 2 * E;
  const er = await sharp(SRC).extract({ left: ex, top: ey, width: EW, height: EH }).removeAlpha().raw().toBuffer();
  const L = i => 0.299 * er[i * 3] + 0.587 * er[i * 3 + 1] + 0.114 * er[i * 3 + 2];
  const all = []; for (let i = 0; i < EW * EH; i++) all.push(L(i));
  const eref = [...all].sort((a, b) => a - b)[Math.floor(all.length * 0.9)];
  let m = new Uint8Array(EW * EH);
  for (let i = 0; i < EW * EH; i++) {
    const r = er[i * 3], g = er[i * 3 + 1], b = er[i * 3 + 2];
    if (all[i] < eref - 28 || Math.max(r, g, b) - Math.min(r, g, b) > 35) m[i] = 1;
  }
  for (let d = 0; d < 4; d++) { // dilatar
    const n = m.slice();
    for (let y = 1; y < EH - 1; y++) for (let x = 1; x < EW - 1; x++) { const i = y * EW + x; if (m[i - 1] || m[i + 1] || m[i - EW] || m[i + EW]) n[i] = 1; }
    m = n;
  }
  for (let x = 0; x < EW; x++) { m[x] = 0; m[(EH - 1) * EW + x] = 0; }
  for (let y = 0; y < EH; y++) { m[y * EW] = 0; m[y * EW + EW - 1] = 0; }
  const f = Float32Array.from(er);
  for (let it = 0; it < 1500; it++) for (let y = 1; y < EH - 1; y++) for (let x = 1; x < EW - 1; x++) {
    const i = y * EW + x; if (!m[i]) continue;
    for (let c = 0; c < 3; c++) f[i * 3 + c] = (f[(i - 1) * 3 + c] + f[(i + 1) * 3 + c] + f[(i - EW) * 3 + c] + f[(i + EW) * 3 + c]) / 4;
  }
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const clean = Buffer.alloc(EW * EH * 3);
  for (let i = 0; i < EW * EH; i++) { const nz = m[i] ? (rnd() + rnd() - 1) * 2.2 : 0; for (let c = 0; c < 3; c++) clean[i * 3 + c] = Math.max(0, Math.min(255, Math.round(f[i * 3 + c] + nz))); }
  const cleanPng = await sharp(clean, { raw: { width: EW, height: EH, channels: 3 } }).png().toBuffer();
  const base = await sharp(SRC).removeAlpha().composite([{ input: cleanPng, left: ex, top: ey }]).png().toBuffer();
  await sharp(base).extract({ left: ex - 20, top: ey - 20, width: EW + 40, height: EH + 40 }).png().toFile(OUT.replace('.png', '-borrado.png'));
  if (parseFloat(SCALE) === 0) { await sharp(base).png().toFile(OUT); console.log(KEY, 'solo borrado'); return; }

  const region = await sharp(base).extract({ left: x0 - P, top: y0 - P, width: RW, height: RH }).raw().toBuffer();

  // Blanco de referencia de la camisa (percentil 90 de luminancia del área)
  const lums = [];
  for (let i = 0; i < RW * RH; i++) lums.push(0.299 * region[i * 3] + 0.587 * region[i * 3 + 1] + 0.114 * region[i * 3 + 2]);
  const ref = [...lums].sort((a, b) => a - b)[Math.floor(lums.length * 0.9)];

  const out = Buffer.alloc(RW * RH * 3);
  const ab = (x, y) => blurA[Math.min(RH - 1, Math.max(0, y)) * RW + Math.min(RW - 1, Math.max(0, x))] / 255;
  for (let y = 0; y < RH; y++) for (let x = 0; x < RW; x++) {
    const i = y * RW + x;
    const a = logo[i * 4 + 3] / 255;
    const sh = shadowA[i] / 255;
    const fold = Math.min(1.04, Math.max(0.72, lums[i] / ref)); // pliegues de la tela
    // Relieve: gradiente del alfa difuminado, luz desde arriba-izquierda
    const gx = ab(x + 1, y) - ab(x - 1, y), gy = ab(x, y + 1) - ab(x, y - 1);
    const shade = -(gx * 1.1 + gy * 1.4);
    // Puntada: líneas diagonales finas
    const st = 0.97 + 0.05 * Math.sin((x + y) * 1.6) + (rnd() - 0.5) * 0.05;
    for (let c = 0; c < 3; c++) {
      const base = region[i * 3 + c];
      const withShadow = base * (1 - 0.32 * sh * (1 - a));
      let col = logo[i * 4 + c];
      if (Math.abs(logo[i * 4] - logo[i * 4 + 2]) < 12) col = col * 1.12 + 14; // gris algo más claro, como hilo
      col = col * st * (1 + 0.6 * shade) * fold + 12 * Math.max(0, shade);
      out[i * 3 + c] = Math.max(0, Math.min(255, Math.round(withShadow * (1 - a) + col * a)));
    }
  }
  const patch = await sharp(out, { raw: { width: RW, height: RH, channels: 3 } }).png().toBuffer();
  await sharp(base).composite([{ input: patch, left: x0 - P, top: y0 - P }]).png().toFile(OUT);
  console.log(KEY, 'logo', w + 'x' + h, 'en', x0, y0, 'img', im.width + 'x' + im.height);
})();
