import { atom } from '@cn-ui/reactive';
import { FontAnalyze } from 'font-analyze';
import { Match, Show, Switch, batch, createSignal } from 'solid-js';
type Result = Awaited<ReturnType<typeof FontAnalyze>>;
export const FontAnalyzeUI = () => {
    const loading = atom(false);
    const result = atom<Result | null>(null);
    const filename = atom('');
    return (
        <Switch
            fallback={
                <main>
                    <section class="flex w-full flex-col items-center justify-center p-12">
                        <h1 class="text-xl">在线字体分析器</h1>
                        <button
                            onclick={() => {
                                (
                                    document.querySelector('input[type="file"]')! as HTMLDivElement
                                ).click();
                            }}
                            class="m-4 bg-rose-700 p-2 text-2xl text-white "
                        >
                            上传字体文件
                        </button>
                        <aside class="text-neutral-600">
                            中文网字计划将会分析您的字体文件，并提供一份详尽的分析报告
                        </aside>
                        <aside class="text-neutral-600">支持 .ttf 、.woff2，暂时不支持 .otf</aside>
                    </section>
                    <input
                        class="hidden"
                        type="file"
                        accept=".ttf,.woff2"
                        oninput={async (e) => {
                            const input = e.target as HTMLInputElement;
                            const file = input.files?.[0];
                            if (file) {
                                loading(true);
                                const buffer = await file.arrayBuffer();
                                await FontAnalyze(buffer, {
                                    charsetLoader: (name) => {
                                        return fetch(
                                            `https://cdn.jsdelivr.net/npm/font-analyze@1.2.0/data/${name}`
                                        ).then((res) => res.json());
                                    },
                                })
                                    .then((res) => {
                                        batch(() => {
                                            filename(file.name);
                                            result(res);
                                            loading(false);
                                        });
                                    })
                                    .catch(() => {
                                        loading(false);
                                    });
                            }
                        }}
                    />
                </main>
            }
        >
            <Match when={loading()}>🔔正在积极导入数据中，请稍等。。。</Match>
            <Match when={result()}>
                <AnalyzeResult filename={filename()} result={result()!}></AnalyzeResult>
            </Match>
        </Switch>
    );
};
import '../../style/analyze.css';
import { ColoredNumber } from '../../utils/ColoredNumber';
import { ensureFontMessageString } from '../../utils/ensureFontMessageString';
function StringObjectToTable(props: { data: Record<string, string> }) {
    const { data } = props;

    // 将数据对象转换为二维数组，方便生成表格
    const rows = Object.entries(data);

    return (
        <table>
            <tbody>
                {rows.map((row, index) => (
                    <tr>
                        <td>{ensureFontMessageString(row[0])}</td>
                        <td>{ensureFontMessageString(row[1])}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
const StandardAnalyzeTable = (props: { data: Result['standard'] }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>字符标准名称</th>

                    <th>覆盖率 (%)</th>
                    <th>字体占有率 (%)</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((item, index) => {
                    const percent = parseInt(item.coverage);

                    return (
                        <tr class={ColoredNumber(percent)}>
                            <td>{item.name}</td>
                            <td>
                                {item.coverage} ({item.support_count}/{item.area_count})
                            </td>
                            <td>{item.in_set_rate}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const UnicodeTable = (props: { data: Result['unicode'] }) => {
    const [data, setData] = createSignal(props.data, { equals: false });
    const [ignoreUnder, setIgnoreUnder] = createSignal(0);
    return (
        <>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked
                        oninput={(e) => {
                            setIgnoreUnder(() => {
                                const isChecked = (e.target as any).checked;
                                return isChecked ? 0 : -1;
                            });
                        }}
                    ></input>
                    忽略0% 覆盖
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th
                            onclick={() => {
                                setData(() =>
                                    props.data.sort((a, b) => {
                                        return a.start - b.start;
                                    })
                                );
                            }}
                        >
                            名称
                        </th>
                        <th>区域</th>

                        <th
                            onclick={() => {
                                setData(() =>
                                    props.data.sort((a, b) => {
                                        return b.support_count - a.support_count;
                                    })
                                );
                            }}
                        >
                            字符个数
                        </th>
                        <th
                            onclick={() => {
                                setData(() =>
                                    props.data.sort((a, b) => {
                                        return parseFloat(b.coverage) - parseFloat(a.coverage);
                                    })
                                );
                            }}
                        >
                            覆盖率 (%)
                        </th>
                        <th>字体占有率 (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {data().map((item, index) => {
                        if (item.support_count <= ignoreUnder()) return <></>;
                        return (
                            <tr class={ColoredNumber(parseInt(item.coverage))}>
                                <td>
                                    <ul>
                                        <li class="text-xs">{item.name}</li>
                                        <li>{item.cn}</li>
                                    </ul>
                                </td>
                                <td>
                                    <span>
                                        {item.start.toString(16).toUpperCase().padStart(4, '0')}
                                    </span>{' '}
                                    -
                                    <span>
                                        {item.end.toString(16).toUpperCase().padStart(4, '0')}
                                    </span>
                                </td>
                                <td>
                                    {item.support_count}/{item.area_count}
                                </td>
                                <td>{item.coverage}</td>
                                <td>{item.in_set_rate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};
const AnalyzeResult = ({ result, filename }: { result: Result; filename: string }) => {
    return (
        <article class="mx-auto my-8 min-h-[80vh] max-w-3xl bg-white p-8">
            <h1 class="py-2 text-center text-2xl">字体检测报告</h1>
            <h2 class="py-2 text-center">📖{filename} ✨中文网字计划提供</h2>
            <details>
                <summary>字体首部信息表</summary>
                <StringObjectToTable data={result.headers}></StringObjectToTable>
            </details>
            <details open>
                <summary>字体字符标准检测</summary>
                <StandardAnalyzeTable data={result.standard}></StandardAnalyzeTable>
            </details>
            <details>
                <summary>Unicode 统一码全字符检测</summary>
                <UnicodeTable data={result.unicode}></UnicodeTable>
            </details>
        </article>
    );
};
