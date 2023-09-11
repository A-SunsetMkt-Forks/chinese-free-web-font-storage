import { isServer } from 'solid-js/web';
import { atom } from '@cn-ui/reactive';
import { onCleanup, onMount } from 'solid-js';
import * as echarts from 'echarts';

const renderSVGChart = (reporter: echarts.EChartsCoreOption, dom: HTMLElement | null = null) => {
    const myChart = echarts.init(dom, null, {
        renderer: 'svg',
        ssr: isServer,
        height: 400,
        width: 600,
    });
    myChart.setOption(reporter);

    return myChart;
};
export const ECharts = (props: { options: any }) => {
    const dom = atom<HTMLElement | null>(null);
    const info = {} as { innerHTML?: string };
    let myChart: echarts.ECharts;
    if (isServer) {
        myChart = renderSVGChart(props.options);
        info.innerHTML = myChart!.renderToSVGString();
    } else {
        onMount(() => {
            !isServer && (dom()!.innerHTML = '');
            myChart = renderSVGChart(props.options, dom());
            setTimeout(() => {
                myChart.resize({
                    height: 400,
                    width: 'auto',
                });
            }, 0);
        });
    }
    onCleanup(() => {
        myChart?.dispose();
    });
    return (
        <div
            ref={dom}
            class="m-auto flex w-full max-w-2xl items-center justify-center rounded-xl bg-white"
            style={{ height: '400px' }}
            {...info}
        ></div>
    );
};
