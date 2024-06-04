import createElement from '@/utils/create-element';
import { Tag } from '@/interface';
import styles from '@/pages/profilePage/profilePage.module.css';

const createTabs = () => {
  const ul = createElement(Tag.UL, { className: styles.navTabs });

  const tabsData = [
    { text: 'Personal', containerId: 'personalContainer', active: true },
    { text: 'Password', containerId: 'passwordContainer', active: false },
    { text: 'Address', containerId: 'addressContainer', active: false },
  ];

  tabsData.forEach((tabData) => {
    const li = createElement(Tag.LI, { className: styles.navItem });
    if (tabData.active) {
      li.classList.add(styles.activeNavItem);
    }

    const handleClick = () => {
      if (!li.classList.contains(styles.activeNavItem)) {
        document.querySelectorAll(`.${styles.navItem}`).forEach((item) => {
          item.classList.remove(styles.activeNavItem);
        });

        li.classList.add(styles.activeNavItem);

        const containers = document.getElementById('profileWrapper');
        if (containers) {
          containers.childNodes.forEach((container) => {
            if (
              container instanceof HTMLElement &&
              container.id === tabData.containerId
            ) {
              container.classList.remove(styles.hidden);
              container.classList.add(styles.container);
            } else if (container instanceof HTMLElement) {
              container.classList.remove(styles.container);
              container.classList.add(styles.hidden);
            }
          });
        }
      }
    };

    li.addEventListener('click', handleClick);

    const span = createElement(Tag.SPAN, {
      className: styles.navLink,
      innerHTML: tabData.text,
    });
    li.appendChild(span);
    ul.appendChild(li);
  });

  return ul;
};

export default createTabs;
