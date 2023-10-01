/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
// 这里写全局的 CDN 模块定义转接
declare module "https://cdn.jsdelivr.net/npm/@konghayao/cn-font-split*" {
    export * from "@konghayao/cn-font-split/dist/browser/index.d.ts";
}
declare module "@konghayao/opentype.js" {
    export * from "@types/opentype.js";
}
