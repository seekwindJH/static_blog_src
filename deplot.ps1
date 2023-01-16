git add -A
git commit -m "Update Articles"
git remote add origin https://github.com/seekwindJH/static_blog_src.git
git branch -M main
git push -u origin main
yarn build
Set-Location .\docs\.vuepress\dist
git init
git add -A
git commit -m "Update Articles"
git remote add origin https://github.com/seekwindJH/seekwindjh.github.io.git
git branch -M main
git push -u origin main
Set-Location .\..\..\..\