import { atom } from '@cn-ui/use';
import { Link, useParams } from '@solidjs/router';
import { For, Show } from 'solid-js';
import { FontStore, useFontWatcher, setFontStore } from './FontStore';

export const PackageDetails = () => {
    const { packageName } = useParams();
    setFontStore('packageName', packageName);
    const { autoLoadFontList } = useFontWatcher();
    autoLoadFontList();

    return (
        <main class="m-auto flex h-screen w-screen max-w-md flex-col p-4">
            <Show when={!FontStore.loading} fallback={<div> 加载数据中，请稍等</div>}>
                <nav>
                    <div class="flex justify-between text-2xl">
                        <div>仓库代码</div>
                        <div>{packageName}</div>
                    </div>
                    <div class="flex justify-between border-t border-gray-300 pt-2 text-2xl">
                        <div>版本号</div>
                        <select
                            value={FontStore.selectedVersion}
                            onchange={(e) =>
                                setFontStore('selectedVersion', (e.target as any).value)
                            }
                        >
                            <For each={FontStore.versions}>
                                {(item) => <option value={item}>{item}</option>}
                            </For>
                        </select>
                    </div>
                </nav>
                <nav class="mt-2 flex-1 border-t border-gray-300 pt-2">
                    <header class="text-2xl text-orange-500">字体列表</header>
                    <div class="flex flex-col gap-2 py-4">
                        <For each={FontStore.fontList}>
                            {(item) => {
                                return (
                                    <Link href={`/fonts/${packageName}/` + item}>
                                        <div class="text-xl ">
                                            {item}
                                            <span class="float-right  cursor-pointer rounded bg-gray-200 py-2 px-4 text-sm transition-colors duration-300 hover:bg-lime-200">
                                                跳转
                                            </span>
                                        </div>
                                    </Link>
                                );
                            }}
                        </For>
                    </div>
                </nav>
            </Show>
        </main>
    );
};
