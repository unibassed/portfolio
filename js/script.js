function handleImgError(img){
  img.onerror = null;
  const label = img.getAttribute('data-fallback-title') || 'your render';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#251a3d"/>
          <stop offset="1" stop-color="#1c1330"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#g)"/>
      <g stroke="#a855f7" stroke-width="1.4" opacity="0.7" fill="none">
        <rect x="150" y="105" width="100" height="75" rx="6"/>
        <circle cx="175" cy="130" r="8"/>
        <path d="M150 165 L185 140 L210 160 L250 130 L250 180 L150 180 Z"/>
      </g>
      <text x="200" y="215" font-family="monospace" font-size="12" fill="#a89bc9" text-anchor="middle">${label}</text>
    </svg>`;
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const workGroups = [
  {
    name: 'Roblox Studio',
    tag: 'MAPS & LEVELS',
    sets: [
      [
        { file:'images/roblox-1.jpg', label:'Mansion Exterior — Front' },
        { file:'images/roblox-2.jpg', label:'Mansion Exterior — Side' },
        { file:'images/roblox-3.jpg', label:'Grand Hall — Columns' },
        { file:'images/roblox-4.jpg', label:'Library Room' },
      ],
      [
        { file:'images/roblox-5.jpg', label:'Cairo Street — Power Lines' },
        { file:'images/roblox-6.jpg', label:'Alleyway Between Buildings' },
        { file:'images/roblox-7.jpg', label:'Cairo Street — Post Office' },
        { file:'images/roblox-8.jpg', label:'Desert' },
      ],
      [
        { file:'images/roblox-9.jpg', label:'Morioh - City' },
        { file:'images/roblox-10.jpg', label:'Morioh - Exterior' },
        { file:'images/roblox-11.jpg', label:'Morioh - Details' },
        { file:'images/roblox-12.jpg', label:'Morioh - Suburb Overview' },
      ],
      [
        { file:'images/roblox-13.jpg', label:'Colosseum — Exterior' },
        { file:'images/roblox-14.jpg', label:'Colosseum — Arena Interior' },
        { file:'images/roblox-15.jpg', label:'Spartan temple' },
        { file:'images/video3.mp4', label:'Spartan temple 2' },
      ],
    ],
  },
  {
    name: 'Blender',
    tag: 'MODELING & RIGS',
    sets: [
      [
        { file:'images/blender-1.png', label:'Stylized Sword — Prop Modeling' },
        { file:'images/blender-2.png', label:'Wolf pet render — Modeling' },
        { file:'images/blender-3.png', label:'Pets render — Modeling' },
        { file:'images/blender-4.png', label:'Spamton Neo — Rig' },
      ],
      [
        { file:'images/blender-5.png', label:'Dio Brando Clothing JJBA' },
        { file:'images/blender-6.png', label:'Bailarina' },
        { file:'images/blender-7.png', label:'Cloud Sword Low Poly' },
        { file:'images/blender-8.png', label:'Monster Model (Rigged) ' },
      ],
      [
        { file: 'images/video1.mp4', label: 'Monster Model animation 1' },
        { file: 'images/video2.mp4', label: 'Monster Model animation 2' }
      ],
    ],
  },
];

const groupsEl = document.getElementById('workGroups');
workGroups.forEach((group) => {
  const section = document.createElement('div');
  section.className = 'work-group';
  const quadsHTML = group.sets.map((imgs) => `
    <div class="work-quad">
      ${imgs.map((item, i) => {
        const label = item.label || `${group.name} ${i+1}`;
        const src = item.file || '';
        const isVideo = item.type === 'video' || src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov') || src.endsWith('.m4v');

        const mediaHTML = isVideo 
          ? `<video src="${src}" controls playsinline preload="metadata" style="width:100%; height:100%; object-fit:cover; display:block;"></video>`
          : `<img src="${src}" data-fallback-title="${label}" onerror="handleImgError(this)" onclick="openLightbox(this)">`;

        return `
          <div class="work-box">
            <div class="media">
              ${mediaHTML}
            </div>
            <div class="cap">${label}</div>
          </div>`;
      }).join('')}
    </div>
  `).join('');
  section.innerHTML = `
    <div class="work-group-head">
      <h3 class="display">${group.name}</h3>
      <span class="mono">${group.tag}</span>
    </div>
    ${quadsHTML}
  `;
  groupsEl.appendChild(section);
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(img){
  lightboxImg.src = img.src;
  lightboxImg.alt = img.getAttribute('data-fallback-title') || '';
  lightbox.classList.add('open');
}
function closeLightbox(){
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
