# PanicCity
## Dev
### Install Dependencies
```sh
npm i
```
### Run Vercel Dev Server
```sh
vercel dev
```
Run vercel dev server to test `/api`
### Run Snowpack Dev Server
```sh
npm start
```
You should open snowpack server in browser, not vercel. (Default address is http://localhost:8080)

## Deploy
```sh
vercel
```
You should change OUTPUT DIRECTORY to `build`. (Vercel Project > Settings > General > Build & Development Settings) (Default is `public`.)