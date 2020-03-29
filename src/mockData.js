const logos = [
  {
    image: require('../assets/yalta-logo.png'),
    text: 'Ялта',
  },
  {
    image: require('../assets/sevas-logo.png'),
    text: 'Севастополь',
  },
  {
    image: require('../assets/alushta-logo.png'),
    text: 'Алушта',
  },
  {
    image: require('../assets/evpatoria-logo.png'),
    text: 'Евпатория',
  },
  {
    image: require('../assets/kerch-logo.png'),
    text: 'Керч',
  },
  {
    image: require('../assets/simf-logo.png'),
    text: 'Симферопль',
  },
  {
    image: require('../assets/feodos-logo.png'),
    text: 'Феодосия',
  },
];

const cards = [
  {
    title: 'React Native for Designers',
    image: require('../assets/background11.jpg'),
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: require('../assets/logo-react.png'),
    content: `
        <body>
<h2>How To Use</h2>

<p>To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:</p>


<h2> Clone this repository </h2>
<strong$ git clone </strong> <a href="https://vk.com/dunaevski_a">https://github.com/</a>

<h2> # Go into the repository</h2>
<strong$ cd electron-markdownify</strong>

<h2># Install dependencies</h2>
<strong$ npm install</strong>

<h2> # Run the app</h2>
<strong$ npm start </strong>

<p>Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use \`node\` from the command prompt.</p>


<h2>## Download</h2>

<p>You can <a href="https://github.com/amitmerchant1990/electron-markdownify/releases/tag/v1.2.0">download</a> the latest installable version of Markdownify for Windows, macOS and Linux. </p>

<h2>## Emailware</h2>

<img src="https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif" alt="img">
</body>
        `
  },
  {
    title: 'Styled Components',
    image: require('../assets/background12.jpg'),
    subtitle: 'React Native',
    caption: '2 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
  {
    title: 'Props and Icons',
    image: require('../assets/background13.jpg'),
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
  {
    title: 'Static Data and Loop',
    image: require('../assets/background14.jpg'),
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: require('../assets/logo-react.png'),
  },
];

export const sections = [
  {
    title: 'React Native for Designers',
    progress: 0.2,
    image: require('../assets/background1.jpg'),
  },
  {
    title: 'Styled Components',
    progress: 0.3,
    image: require('../assets/background2.jpg'),
  },
  {
    title: 'Icons and SVG',
    progress: 0.9,
    image: require('../assets/background3.jpg'),
  },
  {
    title: 'Props and Data',
    progress: 0.5,
    image: require('../assets/background4.jpg'),
  },
  {
    title: 'States and Layout Animation',
    progress: 0.1,
    image: require('../assets/background6.jpg'),
  },
];

export const courses = [
  {
    title: 'Prototype in InVision Studio',
    subtitle: '10 sections',
    image: require('../assets/background13.jpg'),
    logo: require('../assets/logo-studio.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Design and interactive prototype',
  },
  {
    title: 'React for Designers',
    subtitle: '12 sections',
    image: require('../assets/background11.jpg'),
    logo: require('../assets/logo-react.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Learn to design and code a React site',
  },
  {
    title: 'Design and Code with Framer X',
    subtitle: '10 sections',
    image: require('../assets/background14.jpg'),
    logo: require('../assets/logo-framerx.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption: 'Create powerful design and code components for your app',
  },
  {
    title: 'Design System in Figma',
    subtitle: '10 sections',
    image: require('../assets/background6.jpg'),
    logo: require('../assets/logo-figma.png'),
    author: 'Meng To',
    avatar: require('../assets/avatar.jpg'),
    caption:
        'Complete guide to designing a site using a collaborative design tool',
  },
];

export const menuItems = [
  {
    icon: 'ios-person',
    title: 'Account',
    text: 'settings',
  },
  {
    icon: 'ios-card',
    title: 'Billing',
    text: 'payments',
  },
  {
    icon: 'ios-compass',
    title: 'Learn React',
    text: 'start course',
  },
  {
    icon: 'ios-settings',
    title: 'Settings',
    text: 'Preferance',
  },
  {
    icon: 'ios-exit',
    title: 'Log out',
    text: 'see you soon!',
  },
];

export const notificationItems = [
  {
    logo: 'https://cl.ly/a4d00a918f39/download/logo-vue.png',
    title: 'Vue.js for Designers',
    text:
        'Make a dashboard web-app with a complete login system, dark mode, and animated charts for your data.',
    date: '23 Jan',
  },
  {
    logo: 'https://cl.ly/5c470805a500/download/logo-invision.png',
    title: 'InVision Studio',
    text:
        'Learn how to prototype interactions directly in the design tool in this 10-section course.',
    date: '27 Nov',
  },
  {
    logo: 'https://cl.ly/cc8368bef551/download/logo-framerx.png',
    title: 'Framer X',
    text: 'Create production-ready React components right in the design tool.',
    date: '26 SEP',
  },
  {
    logo: 'https://cl.ly/c01bb29804bd/download/logo-figma.png',
    title: 'Design System',
    text:
        'Complete guide to designing a site using a collaborative and powerful design system.',
    date: '4 SEP',
  },
];

export const projects = [
  {
    title: 'Price Tag',
    image: require('../assets/background5.jpg'),
    author: 'Liu Yi',
    text:
        'Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.',
  },
  {
    title: 'The DM App - Ananoumous Chat',
    image: require('../assets/background6.jpg'),
    author: 'Chad Goodman',
    text:
        'Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. ',
  },
  {
    title: 'Nikhiljay',
    image: require('../assets/background7.jpg'),
    author: 'Nikhil D\'Souza',
    text:
        'Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I\'m very excited with it.',
  },
];

export const smallCategory = [
  {
    title: 'Плажи',
  },
  {
    title: 'Ай-Петри',
  },
  {
    title: 'Прогулки на лодках',
  },
  {
    title: 'Набережная',
  },
];

export const category = [
  {
    title: 'Где поесть',
    icon: 'ios-restaurant',
    subtitle: 'Вкусно и сытно перекусить',
  },
  {
    title: 'Магазины',
    icon: 'ios-basket',
    subtitle: 'Накупить продуктов недорого',
  },
  {
    title: 'Достопримечательности',
    icon: 'ios-eye',
    subtitle: 'Взглянуть на итсорию',
  },
  {
    title: 'Искусство',
    icon: 'ios-color-palette',
    subtitle: 'Прикоснуться к высокому',
  },
  {
    title: 'Активный отдых',
    icon: 'ios-bonfire',
    subtitle: 'Отдохнуть с острыми ощущениями',
  },
  {
    title: 'Развлечения',
    icon: 'ios-videocam',
    subtitle: 'Выбраться в город',
  },
  {
    title: 'Ночная жизнь',
    icon: 'ios-wine',
    subtitle: 'Вечернии пляски',
  },
  {
    title: 'Отели',
    icon: 'ios-bed',
    subtitle: 'Отоспаться',
  },
];

const mockData = {
  courses,
  cards,
  logos,
};

export default mockData;
