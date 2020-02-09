const logos = [
    {
        image: require("assets/logo-framerx.png"),
        text: "Ялта"
    },
    {
        image: require("assets/logo-figma.png"),
        text: "Алушта"
    },
    {
        image: require("assets/logo-studio.png"),
        text: "Евпатория"
    },
    {
        image: require("assets/logo-react.png"),
        text: "Керч"
    },
    {
        image: require("assets/logo-swift.png"),
        text: "Севастополь"
    },
    {
        image: require("assets/logo-sketch.png"),
        text: "Симферопль"
    },
    {
        image: require("assets/logo-framerx.png"),
        text: "Феодосия"
    }
];

const cards = [
    {
        title: "React Native for Designers",
        image: require("assets/background11.jpg"),
        subtitle: "React Native",
        caption: "1 of 12 sections",
        logo: require("assets/logo-react.png"),
        content: `
        
## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

\`\`\`bash
# Clone this repository
$ git clone https://github.com/

# Go into the repository
$ cd electron-markdownify

# Install dependencies
$ npm install

# Run the app
$ npm start
\`\`\`

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use \`node\` from the command prompt.


## Download

You can [download](https://github.com/amitmerchant1990/electron-markdownify/releases/tag/v1.2.0) the latest installable version of Markdownify for Windows, macOS and Linux.

## Emailware

![screenshot](https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif)

        `
    },
    {
        title: "Styled Components",
        image: require("assets/background12.jpg"),
        subtitle: "React Native",
        caption: "2 of 12 sections",
        logo: require("assets/logo-react.png")
    },
    {
        title: "Props and Icons",
        image: require("assets/background13.jpg"),
        subtitle: "React Native",
        caption: "3 of 12 sections",
        logo: require("assets/logo-react.png")
    },
    {
        title: "Static Data and Loop",
        image: require("assets/background14.jpg"),
        subtitle: "React Native",
        caption: "4 of 12 sections",
        logo: require("assets/logo-react.png")
    }
];

const courses = [
    {
        title: "Prototype in InVision Studio",
        subtitle: "10 sections",
        image: require("assets/background13.jpg"),
        logo: require("assets/logo-studio.png"),
        author: "Meng To",
        avatar: require("assets/avatar.jpg"),
        caption: "Design and interactive prototype"
    },
    {
        title: "React for Designers",
        subtitle: "12 sections",
        image: require("assets/background11.jpg"),
        logo: require("assets/logo-react.png"),
        author: "Meng To",
        avatar: require("assets/avatar.jpg"),
        caption: "Learn to design and code a React site"
    },
    {
        title: "Design and Code with Framer X",
        subtitle: "10 sections",
        image: require("assets/background14.jpg"),
        logo: require("assets/logo-framerx.png"),
        author: "Meng To",
        avatar: require("assets/avatar.jpg"),
        caption: "Create powerful design and code components for your app"
    },
    {
        title: "Design System in Figma",
        subtitle: "10 sections",
        image: require("assets/background6.jpg"),
        logo: require("assets/logo-figma.png"),
        author: "Meng To",
        avatar: require("assets/avatar.jpg"),
        caption:
            "Complete guide to designing a site using a collaborative design tool"
    }
];

const mockData = {
    courses,
    cards,
    logos
};

export default mockData;
