echo "Current Directory:"
pwd
echo "Executing build command..."
npm run build
echo "Renaming directory build > html..."
mv build html
echo "Compressing directory html to html.tar.gz..."
tar -cvzf html.tar.gz ./html
echo "Removing directory html..."
rm -rf html
echo "Build scripts finished executing."