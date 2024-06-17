import { Tag } from '@/interface';
import createElement from '@/utils/create-element';
import karzhenPhoto from '@assets/images/karzhen.png';
import tabriselPhoto from '@assets/images/tabrisel.png';
import evvrodPhoto from '@assets/images/evvrod.png';
import styles from './aboutPage.module.css';

function createProfileBox(
  name: string,
  photoSrc: string,
  bioText: string,
  roleText: string,
  photoClass: string,
  boxClass: string,
) {
  const box = createElement(Tag.DIV, { className: boxClass });

  const pic = createElement(Tag.DIV, { className: styles.pic });
  const photo = createElement(Tag.IMG, {
    className: photoClass,
  }) as HTMLImageElement;
  photo.src = photoSrc;
  pic.append(photo);

  const profile = createElement(Tag.DIV, { className: styles.profiles });
  const profileName = createElement(Tag.H3, { className: styles.names });
  profileName.innerText = name;
  profile.append(profileName, pic);

  const info = createElement(Tag.DIV, { className: styles.info });
  const bio = createElement(Tag.P, {
    className: styles.bio,
    id: `${name.toLowerCase().replace(/\s/g, '-')}-bio`,
  });
  bio.textContent = bioText;
  bio.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
  bio.style.position = 'absolute';
  bio.style.top = '0';
  bio.style.left = '0';
  bio.style.opacity = '1';
  bio.style.visibility = 'visible';
  const role = createElement(Tag.P, {
    className: styles.role,
    id: `${name.toLowerCase().replace(/\s/g, '-')}-role`,
    style: { visibility: 'hidden' } as CSSStyleDeclaration,
  });
  role.innerHTML = roleText;
  role.style.position = 'absolute';
  role.style.top = '0';
  role.style.left = '0';
  role.style.opacity = '0';
  role.style.visibility = 'hidden';

  info.append(bio, role);

  box.addEventListener('click', () => {
    const bioElement = document.getElementById(
      `${name.toLowerCase().replace(/\s/g, '-')}-bio`,
    ) as HTMLElement;
    const roleElement = document.getElementById(
      `${name.toLowerCase().replace(/\s/g, '-')}-role`,
    ) as HTMLElement;

    if (bioElement && roleElement) {
      if (bioElement.style.opacity === '1') {
        bioElement.style.opacity = '0';
        bioElement.style.visibility = 'hidden';
        roleElement.style.visibility = 'visible';
        setTimeout(() => {
          roleElement.style.opacity = '1';
        }, 10);
      } else {
        roleElement.style.opacity = '0';
        roleElement.style.visibility = 'hidden';
        bioElement.style.visibility = 'visible';
        setTimeout(() => {
          bioElement.style.opacity = '1';
        }, 10);
      }
    }
  });

  box.append(profile, info);
  return box;
}

export default function createFields() {
  const wrapper = createElement(Tag.DIV, { className: styles.aboutWrapper });

  const title = createElement(Tag.H2, { className: styles.title });
  title.innerText = 'About us';

  const ball = createElement(Tag.DIV, { className: styles.circle });
  const ballSecond = createElement(Tag.DIV, { className: styles.circleSecond });

  const boxes = createElement(Tag.DIV, { className: styles.boxes });

  const evvrodBio = `"In 2010, I graduated from university with a degree in IT, but for a long time, my career was related to education. Despite a successful career in this field, my dream has always been to return to IT. Now, I have decided to pursue this dream and develop in the technology sector. A passion for learning and the latest technologies inspires me to explore new horizons in the IT industry."`;
  const evvrodRole = `
    Role in project:
    <ul>
      <li>Routing</li>
      <li>Login page</li>
      <li>Catalog page</li>
      <li>Cart implementation</li>
      <li>Creation of basic components</li>
      <li>Configuration setup</li>
      <li>Invaluable help with refactoring/bug fixing</li>
    </ul>
  `;

  const karzhenBio = `"In 2020, I completed my Bachelor's degree in Management of Technical Systems. In 2022, I earned my Master's degree in the same field. Currently, I am a postgraduate student of the Russian Academy of Sciences in the direction of System Analysis, Control and Information Processing, Statistics. During my work in Management of Technical Systems, I worked with Python. However, in 2023, I decided to transition to frontend development, which has proven to be one of the best decisions of my life 🙂"`;
  const karzhenRole = `
    Role in project:
    <ul>
      <li>Project creation in CommerceTools</li>
      <li>Login page</li>
      <li>Registration page</li>
      <li>Detailed product page</li>
      <li>Handling an empty cart</li>
      <li>Creation of products and provision of resources for the project</li>
    </ul>
  `;

  const tabriselBio = `"Hey there! I'm glad you're interested in getting to know me. I graduated from Saint-Petersburg State University of Economics in 2022. After some time working in my field, I realized it wasn't the right fit for me and decided to explore programming. The frontend sector, with its immediate results, relevance, and creative freedom, drew me in. Currently, I'm participating in an internship at a digital agency in Amsterdam."`;
  const tabriselRole = `
    Role in project:
    <ul>
      <li>Project and documentation management</li>
      <li>Registration page</li>
      <li>404 page</li>
      <li>Profile page</li>
      <li>About us page</li>
      <li>Synchronization of anonymous cart and user's cart</li>
      <li>Writing tests</li>
    </ul>
  `;

  const evvrodBox = createProfileBox(
    'Evgeniya Rodionova',
    evvrodPhoto,
    evvrodBio,
    evvrodRole,
    styles.evvrodPhoto,
    styles.box,
  );
  const karzhenBox = createProfileBox(
    'Egor Cherkashin',
    karzhenPhoto,
    karzhenBio,
    karzhenRole,
    styles.karzhenPhoto,
    styles.boxSpecial,
  );
  const tabriselBox = createProfileBox(
    'Elizaveta Zakharova',
    tabriselPhoto,
    tabriselBio,
    tabriselRole,
    styles.tabriselPhoto,
    styles.box,
  );

  boxes.append(evvrodBox, karzhenBox, tabriselBox);
  wrapper.append(title, ball, ballSecond, boxes);

  return wrapper;
}
