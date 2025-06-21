@echo off
echo Updating backend packages...
cd backend
npm install express@latest typescript@latest @types/express@latest socket.io@latest pg@latest redis@latest dotenv@latest cors@latest helmet@latest @types/node@latest @types/cors@latest @types/helmet@latest ts-node-dev@latest jest@latest supertest@latest

echo Updating frontend packages...
cd ../frontend
npm install next@latest react@latest react-dom@latest clsx@latest lucide-react@latest autoprefixer@latest postcss@latest tailwindcss@latest @types/node@latest @types/react@latest @types/react-dom@latest eslint@latest eslint-config-next@latest typescript@latest

echo Updating Docker images...
docker pull postgres:latest
docker pull redis:latest
docker pull node:latest

echo All packages and tools have been updated to their latest versions.
