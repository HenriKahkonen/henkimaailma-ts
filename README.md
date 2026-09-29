# Henkimaailma

The frontend for Henkka's personal webpage 'Henkimaailma'. The webpage is built with multirepo architecture. For backend's code and startup guide, see [it's own repo](https://github.com/HenriKahkonen/henkimaailma-django-be)

The project and its contents are mostly written in Finnish, this readme excluded.

## Current Process of To-Do:

The site is in the process of a rehaul. I want to change the architecture to be Typescript-based and at the same time remove some silly features and solutions made when I didn't know better.

## Deployment and developement

When pushed to main, the project automatically deploys to and is published in Netlify.

### Developing and starting the site locally:

If everything is configured:

```
npm run dev
```

#### Installing dependencies

The project requires React and some dependencies to run. To install:

```
# Linux (Debian)

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

```
# Linux (Arch with fish console)

# Installing nvm

# Install nvm.fish with Fisher
fisher install jorgebucaran/nvm.fish

# In new terminal, install node long term support and use it:
nvm install lts
nvm use lts

# Verify Node.js version is sensible
node -v

# In henkimaailma-ts folder install dependencies
# Install Node package manager if not in system yet
sudo pacman -S npm
# Install deps
npm install
```
#### Configuring .env

The site needs to be told where the backend exists for it to function. To do this, create an .env file in the project root with the following content:

> VITE_BACKEND_BASE_URL=http://localhost:8080

In production, replace url with actual location of site backend. When developing locally, you also need to have the backend running on the same machine. For the backend code and starting instructions, refer to [it's own repo found here](https://github.com/HenriKahkonen/henkimaailma-django-be).