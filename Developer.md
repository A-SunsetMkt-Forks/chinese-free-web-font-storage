## 开发者文档

### Workflow

1. 模板脚手架 -> /templates
2. pnpm new 创建一个新的子 NPM 仓库用于一个字体文件的打包
    1. 创建的子项目在 /packages
    2. 创建的名称必须为符合 NPM 规范的名称
    3. 如果字体有英文名称，那么用英文；如果没有，中文名称的逐个字的拼音第一字母
3. pnpm build 直接打包整个项目(有缓存)，--mode=rebuild 将会重新打包整个项目
    1. packages/{项目名}/cache.json 是缓存记录文件，若 fonts 文件夹下的字体文件没有变化，则不会进行打包。
    2. packages/{项目名}/fonts 目录下放置字体文件，程序将自动进行打包
4. node ./scripts/moveFile.mjs 将所有 packages 内的字体成品转移到 dist 文件夹下面
    1. 上传文件时，由于部分文件夹路径较奇怪，所以进行了一些更改，更改方式看源码
    2. netlify deploy 直接将 dist 文件夹部署到 netlify，CORS 已设置为 \*
5. 先写 override.json 然后 node ./scripts/createIndex.mjs 将会创建索引文件 index.json
