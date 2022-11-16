# 中文 Web 免费可商用字体库 v3

[Netlify 网页](https://chinese-font.netlify.app/#/home)
[Gitee 主页](http://dongzhongzhidong.gitee.io/chinese-free-web-font-storage)

## 简介

这是一个用于存储免费可商用的 **web 字体文件** 的仓库！

由于中文的庞大字符数，中文字符在网页中的使用方案屈指可数。

我使用的字体加载方案是 **Google Font** 的 CSS 字体加载方案，使用 **CSS unicode-range + 浏览器** 按需请求载入文件！

并且我查找了中文字符的常用程度，按常用程度截取源字体文件中的**常用 6000 中文字符**（成品中也不包括英文字符），并切割成 10 个 ttf 文件，每个文件大小约为 **500kb** ！

在首页里面，我添加了 Google Fonts 的字体查询，使用 FontSource 的 NPM 字体库和 jsDelivr 进行 CDN 缓存查看，使用比 Google 官网更加便捷。

## 能做啥？

**能做的东西多了！**

1. 不用再截取 HTML 中的中文字符再访问服务器获取制定字符集啦，浏览器会根据需要自动下载！
2. 你可以让你的网页的字体可选择，喜欢啥样子可以随便动态调整！
3. 制作一个字体 Github 仓库配合 jsDelivr 无缝前端字体使用，快捷，方便，高效！

## 我如何用？

> 虽然可以直接使用我的仓库的 jsDelivr 链接进行字体文件的获取，但是我并不推荐您这么做！
> jsDelivr 上的字体并不保证其设定长期有效！

1. 上我的字体网站体验字体的效果！
2. 下载您需要的字体文件夹（在 build 文件夹下面）！
3. 部署文件到服务器！
4. 在您的 HTML 中引用 result.css 文件即可！

## 字体版权

请您尊重字体制作者的权益，我在制作的时候特地将他们的声明文件导出到 license.txt 中，或者在 CSS 文件的开头放置了注释，您可以仔细阅读。大部分的字体都是可以免费商用的，放置到仓库中可以方便各位开发者的引用。

## Material Icons 和 Google Fonts

Material Icons 和 Google Fonts 提供了非常良好的静态字体相关的服务给我们，但是部分地区并没有较好的方式进行 Google Fonts 的查看，所以我将 Google Fonts 的查询功能直接内置在我们的网页中，方便大家查询相关的 CSS 链接。
同时，我们采用了 FontSource 的 NPM 静态仓库进行相关数据和文件的获取，感谢 FontSource 的贡献。

## 注意事项

1. 有些中文字体没有英文部分，所以需要英文部分可以结合 Google Fonts 进行使用。
2. 使用 result.css 引入时，在同一个 DOM 上赋值两种字体可能会导致错误。

## 仓库证书

MIT License

## 您想要添加字体？

请在 Gitee 或者 Github 上提供字体的下载链接和版权声明，如果我有空会帮您的。当然，您也可以直接 PR 一个分支，审核后会加入的。
