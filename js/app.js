/**
 * Awesome Cosmos - 主應用程式交互邏輯
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化 3D 引擎
  const container = document.getElementById('cosmos-canvas-container');
  const cosmos = new CosmosEngine(container);

  // 2. 狀態管理
  let bookmarks = JSON.parse(localStorage.getItem('awesome_cosmos_bookmarks') || '[]');
  let activeSector = 'all';

  // 3. UI 元素參照
  const searchInput = document.getElementById('search-input');
  const sectorBar = document.getElementById('sector-bar');
  const warpBtn = document.getElementById('warp-btn');
  const gachaBtn = document.getElementById('gacha-btn');
  const soundBtn = document.getElementById('sound-btn');
  const fontScaleBtn = document.getElementById('font-scale-btn');
  const constellationBtn = document.getElementById('constellation-btn');
  const starCountEl = document.getElementById('stat-stars-count');
  const bookmarkCountEl = document.getElementById('stat-bookmark-count');
  
  // Modals & Tooltip
  const starTooltip = document.getElementById('star-tooltip');
  const tooltipName = document.getElementById('tooltip-name');
  const tooltipSector = document.getElementById('tooltip-sector');

  const detailModal = document.getElementById('detail-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalRepo = document.getElementById('modal-repo');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalVisit = document.getElementById('modal-visit');
  const modalBookmark = document.getElementById('modal-bookmark');
  const modalWarp = document.getElementById('modal-warp');

  // Gacha Modal
  const gachaModal = document.getElementById('gacha-modal');
  const gachaClose = document.getElementById('gacha-close');
  const gachaVortex = document.getElementById('gacha-vortex');
  const gachaCard = document.getElementById('gacha-card');
  const gachaTitle = document.getElementById('gacha-title');
  const gachaDesc = document.getElementById('gacha-desc');
  const gachaVisit = document.getElementById('gacha-visit');
  const gachaReroll = document.getElementById('gacha-reroll');

  // Constellation Drawer
  const constellationDrawer = document.getElementById('constellation-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerList = document.getElementById('drawer-list');
  const exportMdBtn = document.getElementById('export-md-btn');

  let currentDetailStar = null;

  // 更新計數與星圖連線
  function updateBookmarkUI() {
    localStorage.setItem('awesome_cosmos_bookmarks', JSON.stringify(bookmarks));
    if (bookmarkCountEl) {
      bookmarkCountEl.innerText = bookmarks.length;
    }
    cosmos.updateConstellations(bookmarks);
    renderDrawerItems();
  }

  // 初始化統計
  if (starCountEl) starCountEl.innerText = window.COSMOS_DATA.length;
  updateBookmarkUI();

  // 4. 動態渲染星域導覽列
  function buildSectorBar() {
    sectorBar.innerHTML = '';
    const allBtn = document.createElement('div');
    allBtn.className = 'sector-pill active';
    allBtn.innerText = '全部星系 (All)';
    allBtn.addEventListener('click', () => {
      document.querySelectorAll('.sector-pill').forEach(p => p.classList.remove('active'));
      allBtn.classList.add('active');
      activeSector = 'all';
      cosmos.controls.target.set(0, 0, 0);
    });
    sectorBar.appendChild(allBtn);

    Object.keys(window.SECTORS).forEach(key => {
      const sector = window.SECTORS[key];
      const pill = document.createElement('div');
      pill.className = 'sector-pill';
      pill.innerText = sector.name;
      pill.addEventListener('click', () => {
        document.querySelectorAll('.sector-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeSector = key;

        // 平滑平移至星區中心
        cosmos.controls.autoRotate = false;
        cosmos.controls.target.set(sector.coord.x, sector.coord.y, sector.coord.z);
        if (window.cosmosAudio) window.cosmosAudio.playStarPing();
      });
      sectorBar.appendChild(pill);
    });
  }
  buildSectorBar();

  // 5. 懸停 Tooltip 與點擊選取
  cosmos.onStarHover = (data, mouseX, mouseY) => {
    if (!data) {
      starTooltip.classList.remove('visible');
      return;
    }
    const sector = window.SECTORS[data.category] || {};
    tooltipName.innerText = data.name;
    tooltipSector.innerText = `${sector.name || ''} · ★ ${data.stars}`;
    starTooltip.style.left = `${mouseX}px`;
    starTooltip.style.top = `${mouseY}px`;
    starTooltip.classList.add('visible');
  };

  cosmos.onStarSelect = (data) => {
    showStarDetail(data);
  };

  function showStarDetail(star) {
    currentDetailStar = star;
    const sector = window.SECTORS[star.category] || {};

    modalBadge.innerText = `${sector.name || '星區'} · ★ ${star.stars}`;
    modalBadge.style.borderColor = sector.color || '#38bdf8';
    modalBadge.style.color = sector.color || '#38bdf8';

    modalTitle.innerText = star.name;
    modalRepo.innerText = `github.com/${star.repo}`;
    modalDesc.innerText = star.desc;

    // 標籤
    modalTags.innerHTML = '';
    (star.tags || []).forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag-pill';
      span.innerText = `#${t}`;
      modalTags.appendChild(span);
    });

    modalVisit.href = star.url;

    // 收藏按鈕狀態
    const isBookmarked = bookmarks.includes(star.id);
    modalBookmark.innerText = isBookmarked ? '★ 已收錄於星座' : '☆ 點亮並連入星座';
    modalBookmark.className = `action-btn btn-bookmark ${isBookmarked ? 'bookmarked' : ''}`;

    detailModal.classList.add('active');
  }

  // 關閉詳情彈窗
  modalClose.addEventListener('click', () => {
    detailModal.classList.remove('active');
  });

  // 躍遷按鈕 (在卡片內)
  modalWarp.addEventListener('click', () => {
    if (currentDetailStar) {
      detailModal.classList.remove('active');
      cosmos.warpToStar(currentDetailStar.id);
    }
  });

  // 收藏/移除星座按鈕
  modalBookmark.addEventListener('click', () => {
    if (!currentDetailStar) return;
    const idx = bookmarks.indexOf(currentDetailStar.id);
    if (idx > -1) {
      bookmarks.splice(idx, 1);
      modalBookmark.innerText = '☆ 點亮並連入星座';
      modalBookmark.classList.remove('bookmarked');
    } else {
      bookmarks.push(currentDetailStar.id);
      modalBookmark.innerText = '★ 已收錄於星座';
      modalBookmark.classList.add('bookmarked');
    }
    updateBookmarkUI();
  });

  // 隨機曲率跳躍 (Warp Jump)
  warpBtn.addEventListener('click', () => {
    const randomStar = window.COSMOS_DATA[Math.floor(Math.random() * window.COSMOS_DATA.length)];
    if (randomStar) {
      cosmos.warpToStar(randomStar.id);
    }
  });

  // 6. 黑洞引力抽卡盲盒 (Gravitational Discovery)
  function triggerGacha() {
    gachaModal.classList.add('active');
    gachaVortex.style.display = 'flex';
    gachaCard.style.display = 'none';

    if (window.cosmosAudio) {
      window.cosmosAudio.playBlackHoleCharge();
    }

    setTimeout(() => {
      const randomStar = window.COSMOS_DATA[Math.floor(Math.random() * window.COSMOS_DATA.length)];
      gachaVortex.style.display = 'none';
      gachaCard.style.display = 'block';

      gachaTitle.innerText = randomStar.name;
      gachaDesc.innerText = randomStar.desc;
      gachaVisit.href = randomStar.url;

      if (window.cosmosAudio) {
        window.cosmosAudio.playDiscoveryFanfare();
      }

      // 如果尚未收藏，自動標亮
      if (!bookmarks.includes(randomStar.id)) {
        bookmarks.push(randomStar.id);
        updateBookmarkUI();
      }
    }, 1500);
  }

  gachaBtn.addEventListener('click', triggerGacha);
  gachaReroll.addEventListener('click', triggerGacha);
  gachaClose.addEventListener('click', () => {
    gachaModal.classList.remove('active');
  });

  // 7. 星座抽屜清單
  constellationBtn.addEventListener('click', () => {
    constellationDrawer.classList.add('open');
  });
  drawerClose.addEventListener('click', () => {
    constellationDrawer.classList.remove('open');
  });

  function renderDrawerItems() {
    drawerList.innerHTML = '';
    if (bookmarks.length === 0) {
      drawerList.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem; padding:1rem 0;">尚未收錄任何星體。點擊宇宙中的星星並加入星座吧！</div>`;
      return;
    }

    bookmarks.forEach(id => {
      const star = window.COSMOS_DATA.find(s => s.id === id);
      if (!star) return;

      const item = document.createElement('div');
      item.className = 'drawer-item';
      item.innerHTML = `
        <div style="cursor:pointer;" class="drawer-jump">
          <div class="drawer-item-title">${star.name}</div>
          <div class="drawer-item-repo">${star.repo}</div>
        </div>
        <button class="drawer-remove-btn" title="從星座移除">&times;</button>
      `;

      item.querySelector('.drawer-jump').addEventListener('click', () => {
        constellationDrawer.classList.remove('open');
        cosmos.warpToStar(star.id);
      });

      item.querySelector('.drawer-remove-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        bookmarks = bookmarks.filter(bId => bId !== star.id);
        updateBookmarkUI();
      });

      drawerList.appendChild(item);
    });
  }

  // 匯出 Markdown
  exportMdBtn.addEventListener('click', () => {
    if (bookmarks.length === 0) {
      alert("尚未收錄任何專案至星座中！");
      return;
    }

    let md = `# 🌌 我的開源探索星座 (Awesome Constellation)\n\n> 匯出時間：${new Date().toLocaleString()}\n\n`;
    bookmarks.forEach((id, idx) => {
      const s = window.COSMOS_DATA.find(item => item.id === id);
      if (s) {
        md += `### ${idx + 1}. [${s.name}](${s.url}) (★ ${s.stars})\n`;
        md += `- **倉庫**: \`${s.repo}\`\n`;
        md += `- **簡介**: ${s.desc}\n`;
        md += `- **標籤**: ${s.tags.map(t => '`' + t + '`').join(', ')}\n\n`;
      }
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `awesome-constellation-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // 8. 音效開關
  soundBtn.addEventListener('click', () => {
    if (window.cosmosAudio) {
      window.cosmosAudio.resumeIfNeeded();
      const isMuted = window.cosmosAudio.toggleMute();
      soundBtn.innerHTML = isMuted ? '🔇 音效已靜音' : '🔊 宇宙音頻開啟';
    }
  });

  // 9. 即時搜尋
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;

    const match = window.COSMOS_DATA.find(s => 
      s.name.toLowerCase().includes(q) || 
      s.repo.toLowerCase().includes(q) || 
      s.tags.some(t => t.toLowerCase().includes(q))
    );

    if (match) {
      cosmos.warpToStar(match.id);
    }
  });

  // 10. 字體縮放控制 (適中 -> 放大 -> 特大 循環)
  const fontScales = [
    { key: 'medium', label: '🔠 字體: 適中' },
    { key: 'large', label: '🔠 字體: 放大' },
    { key: 'huge', label: '🔠 字體: 特大' }
  ];

  let currentFontScale = localStorage.getItem('awesome_cosmos_font_scale') || 'medium';

  function applyFontScale(scaleKey) {
    currentFontScale = scaleKey;
    document.documentElement.setAttribute('data-font-scale', scaleKey);
    localStorage.setItem('awesome_cosmos_font_scale', scaleKey);

    const currentConfig = fontScales.find(f => f.key === scaleKey) || fontScales[0];
    if (fontScaleBtn) {
      fontScaleBtn.innerText = currentConfig.label;
    }
  }

  // 初始化套用
  applyFontScale(currentFontScale);

  if (fontScaleBtn) {
    fontScaleBtn.addEventListener('click', () => {
      const currentIndex = fontScales.findIndex(f => f.key === currentFontScale);
      const nextIndex = (currentIndex + 1) % fontScales.length;
      applyFontScale(fontScales[nextIndex].key);
      if (window.cosmosAudio) {
        window.cosmosAudio.playStarPing();
      }
    });
  }
});
