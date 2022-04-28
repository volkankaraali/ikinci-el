import React from 'react';

function CategoriesNav({ categories, activeCategory, handleActiveCategory }) {

  const nav = document.querySelector('nav');
  let isDown = false;
  let startX, scrollLeft;

  if (nav) {
    nav.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - nav.offsetLeft;
      scrollLeft = nav.scrollLeft;
    });
    nav.addEventListener('mouseleave', () => {
      isDown = false;
    });
    nav.addEventListener('mouseup', () => {
      isDown = false;
    });
    nav.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - nav.offsetLeft;
      const walk = (x - startX); //scroll-fast
      nav.scrollLeft = scrollLeft - walk;
    });
  }

  return (
    <nav>
      <a className={`${activeCategory == 'Hepsi' ? 'active' : ''}`} onClick={() => handleActiveCategory('Hepsi')}>Hepsi</a>
      {
        categories.map(category => <a key={category.id} className={`${activeCategory == category.name ? 'active' : ''}`} onClick={() => handleActiveCategory(category.name)}>{category.name}</a>)
      }
      <a className={`${activeCategory == 'Diğer' ? 'active' : ''}`} onClick={() => handleActiveCategory('Diğer')}>Diğer</a>
    </nav>
  );
}

export default CategoriesNav;