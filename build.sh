yarn install || npm install
echo "building..."
webpack --env.mode=production --progress
cp -r ./assets ./src/server
rm -rf src/server/dist
mv dist src/server
node src/server/index.js

