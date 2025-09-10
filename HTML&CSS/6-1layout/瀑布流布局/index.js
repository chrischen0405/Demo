// 模拟数据
const mockData = [
  {
    id: 1,
    title: "美丽的山川风景",
    description: "这是一张令人惊叹的山川风景照片，展现了大自然的壮丽美景。",
    image: "https://picsum.photos/300/200?random=1",
    tags: ["风景", "摄影", "自然"],
    likes: 128,
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "现代建筑设计",
    description: "探索现代建筑的线条美学和空间设计理念。",
    image: "https://picsum.photos/300/350?random=2",
    tags: ["建筑", "设计", "现代"],
    likes: 95,
    date: "2024-01-14"
  },
  {
    id: 3,
    title: "城市夜景",
    description: "繁华都市的夜晚，灯火辉煌，车水马龙，展现城市的活力与魅力。",
    image: "https://picsum.photos/300/280?random=3",
    tags: ["城市", "夜景", "灯光"],
    likes: 203,
    date: "2024-01-13"
  },
  {
    id: 4,
    title: "美食艺术",
    description: "精致的美食摆盘，不仅是味觉的享受，更是视觉的盛宴。",
    image: "https://picsum.photos/300/320?random=4",
    tags: ["美食", "艺术", "摄影"],
    likes: 167,
    date: "2024-01-12"
  },
  {
    id: 5,
    title: "宠物萌照",
    description: "可爱的小动物总是能带给我们无尽的欢乐和温暖。",
    image: "https://picsum.photos/300/240?random=5",
    tags: ["宠物", "可爱", "动物"],
    likes: 312,
    date: "2024-01-11"
  },
  {
    id: 6,
    title: "艺术创作",
    description: "艺术家的创意无限，每一幅作品都是心灵的表达和情感的宣泄。",
    image: "https://picsum.photos/300/380?random=6",
    tags: ["艺术", "创作", "绘画"],
    likes: 89,
    date: "2024-01-10"
  },
  {
    id: 7,
    title: "海边日落",
    description: "金色的夕阳洒在海面上，海浪轻抚着沙滩，这是大自然最美的画卷。",
    image: "https://picsum.photos/300/260?random=7",
    tags: ["海边", "日落", "浪漫"],
    likes: 456,
    date: "2024-01-09"
  },
  {
    id: 8,
    title: "科技产品",
    description: "最新的科技产品展示，体验未来科技带来的便利和创新。",
    image: "https://picsum.photos/300/300?random=8",
    tags: ["科技", "产品", "创新"],
    likes: 234,
    date: "2024-01-08"
  },
  {
    id: 9,
    title: "花卉摄影",
    description: "春天的花朵竞相绽放，用镜头捕捉这些美丽的瞬间。",
    image: "https://picsum.photos/300/220?random=9",
    tags: ["花卉", "春天", "摄影"],
    likes: 178,
    date: "2024-01-07"
  },
  {
    id: 10,
    title: "运动瞬间",
    description: "运动员在赛场上的精彩瞬间，展现了人类极限的挑战精神。",
    image: "https://picsum.photos/300/340?random=10",
    tags: ["运动", "竞技", "精神"],
    likes: 145,
    date: "2024-01-06"
  },
  {
    id: 11,
    title: "古典建筑",
    description: "历史悠久的古典建筑，承载着深厚的文化底蕴和时代记忆。",
    image: "https://picsum.photos/300/290?random=11",
    tags: ["古典", "建筑", "历史"],
    likes: 267,
    date: "2024-01-05"
  },
  {
    id: 12,
    title: "抽象艺术",
    description: "抽象艺术的魅力在于它能激发观者的想象力和创造力。",
    image: "https://picsum.photos/300/360?random=12",
    tags: ["抽象", "艺术", "创意"],
    likes: 98,
    date: "2024-01-04"
  }
];

// 瀑布流布局实现
class WaterfallLayout {
  constructor(container, data, columns = 3) {
    this.container = container;
    this.data = data;
    this.columns = columns;
    this.columnElements = [];
    this.init();
  }

  init() {
    this.createColumns();
    this.renderItems(this.data);
    this.handleResize();
    this.handleScroll();
  }

  createColumns() {
    this.container.innerHTML = '';
    this.columnElements = [];

    for (let i = 0; i < this.columns; i++) {
      const column = document.createElement('div');
      column.className = 'waterfall-column';
      this.container.appendChild(column);
      this.columnElements.push(column);
    }
  }

  handleScroll() {
    window.addEventListener('scroll', this.checkScroll.bind(this));
  }

  checkScroll() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // 判断是否滚动到底部
    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    this.data.push(...mockData);
    // 重新渲染瀑布流布局
    this.renderItems(mockData);
  }

  getShortestColumn() {
    let shortestIndex = 0;
    let shortestHeight = this.getColumnHeight(0);

    for (let i = 1; i < this.columnElements.length; i++) {
      const currentHeight = this.getColumnHeight(i);
      if (currentHeight < shortestHeight) {
        shortestHeight = currentHeight;
        shortestIndex = i;
      }
    }

    return this.columnElements[shortestIndex];
  }

  getColumnHeight(columnIndex) {
    const column = this.columnElements[columnIndex];
    let height = 0;
    const items = column.children;

    for (let i = 0; i < items.length; i++) {
      height += items[i].offsetHeight;
      if (i < items.length - 1) {
        // 添加gap高度（15px）
        height += 15;
      }
    }

    return height;
  }

  createItem(itemData) {
    const item = document.createElement('div');
    item.className = 'waterfall-item';
    item.innerHTML = `
      <img src="${itemData.image}" alt="${itemData.title}" class="item-image" loading="lazy">
      <div class="item-content">
        <h3 class="item-title">${itemData.title}</h3>
        <p class="item-description">${itemData.description}</p>
        <div class="item-tags">
          ${itemData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="item-meta">
          <span class="item-date">${itemData.date}</span>
          <div class="item-likes">
            <span class="heart">♥</span>
            <span>${itemData.likes}</span>
          </div>
        </div>
      </div>
    `;

    // 添加点击事件
    item.addEventListener('click', () => {
      this.showItemDetail(itemData);
    });

    return item;
  }

  renderItems(data) {
    // 使用轮询分发算法作为初始分配
    data.forEach((itemData, index) => {
      const item = this.createItem(itemData);
      const columnIndex = index % this.columns;
      const targetColumn = this.columnElements[columnIndex];
      targetColumn.appendChild(item);

      // 添加渐入动画延迟
      item.style.animationDelay = `${(index % this.columns) * 0.1}s`;
    });
  }

  showItemDetail(itemData) {
    alert(`查看详情：${itemData.title}\n${itemData.description}`);
  }

  handleResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = window.innerWidth;
        let newColumns;

        if (width < 768) {
          newColumns = 1;
        } else if (width < 1024) {
          newColumns = 2;
        } else {
          newColumns = 3;
        }

        if (newColumns !== this.columns) {
          this.columns = newColumns;
          this.createColumns();
          this.renderItems();
        }
      }, 250);
    });
  }
}

// 初始化瀑布流
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('waterfallContainer');
  const waterfall = new WaterfallLayout(container, mockData, 3);
});