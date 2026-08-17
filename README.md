# Henkimaailma

The frontend for Henkka's personal webpage 'Henkimaailma'. The webpage is built with multirepo architecture.

The project and its contents are mostly written in Finnish, this readme excluded.

## Current Process of To-Do:

The site is in the process of a rehaul. I want to change the architecture to be Typescript-based and at the same time remove some silly features and solutions made when I didn't know better.

## Deployment and developement

When pushed to main, the project automatically deploys to and is published in Netlify.

To start the website locally, run:

```
npm run start
```

The project requires React and some dependencies to run. To install:

```
# Linux

# Install npm
sudo apt install install npm

# Verify installation was succesful
npm -v

# Install Node.js
# Install nvm to ensure latest version of Node.js
sudo apt remove nodejs npm   # remove the old apt version, avoid conflicts
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts

# Verify Node.js version is sensible
node -v

# Install dependencies
npm install
```
