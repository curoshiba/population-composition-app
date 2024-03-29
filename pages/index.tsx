import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import chartjsPluginColorschemes from "chartjs-plugin-colorschemes";

const Home: NextPage = () => {
  //都道府県一覧のチェックボックス
  type dataType =
    | []
    | [
        {
          prefCode: number;
          prefName: string;
        }
      ];
  const [datas, setData] = useState<dataType>([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("/api/prefectures");
        const resArray = await response.json();
        setData(resArray.data.result);
      };
      fetchData();
    } catch (e) {
      alert("都道府県一覧の取得に失敗しました");
    }
  }, []);

  //人口構成グラフ
  type stateType = {
    labels: Array<number>;
    datasets: Array<object>;
  };
  const [graph, setGraph] = useState<stateType>({ labels: [], datasets: [] });
  const { labels, datasets } = graph;

  const onchangeCheck = (
    prefCode_: number,
    prefName_: string,
    checkStatus: boolean
  ) => {
    //選択された都道府県のグラフを表示
    if (checkStatus) {
      fetchGraphData(prefCode_, prefName_);
    }
    //選択解除された都道府県のグラフを削除
    else {
      // @ts-ignore
      const index = datasets.findIndex((value) => value.label === prefName_);
      datasets.splice(index, 1);
      setGraph({ labels: labels, datasets: datasets });
    }
  };

  /* <summary>
    選択された都道府県データを取得しグラフのstateへ格納する
  </summary> */
  const fetchGraphData = async (prefCode: number, preName: string) => {
    const response = await fetch(`/api/population/${prefCode}`);
    const result = await response.json();
    //key=year => Array<number>
    const labelArray: Array<number> = [...result.data.result.data[0].data].map(
      (value) => value.year
    );
    console.log(labelArray);
    //key=value => Array<string>
    const datArray: Array<string> = [...result.data.result.data[0].data].map(
      (v) => v.value as string
    );
    const dataset = {
      label: preName,
      data: datArray,
      fill: false,
    };
    setGraph({
      labels: [...labelArray],
      datasets: [...graph.datasets, dataset],
    });
  };
  //グラフのオプション
  const options = {
    maintainAspectRatio: false,
    responsive: false,
    plugin: {
      colorschemes: {
        scheme: chartjsPluginColorschemes,
      },
    },
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Population composition</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <header>
        <h2 className={styles.title}>都道府県別人口構成</h2>
      </header>

      <main className={styles.main}>
        <p className={styles.description}>都道府県一覧</p>
        <div className={styles.grid}>
          {datas.map((pre) => (
            <div key={pre.prefCode}>
              <input
                type="checkbox"
                onChange={(event) =>
                  onchangeCheck(
                    pre.prefCode,
                    pre.prefName,
                    event.target.checked
                  )
                }
              />
              <label>{pre.prefName}</label>
            </div>
          ))}
        </div>
        <p className={styles.description}>人口構成グラフ</p>
        <Line width={500} height={400} data={graph} options={options} redraw />
      </main>

      <footer className={styles.footer}>Crested by kazushi</footer>
    </div>
  );
};
export default Home;
