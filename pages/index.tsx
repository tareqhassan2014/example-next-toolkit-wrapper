import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import { useEffect } from 'react';

import Counter from '../features/counter/Counter';
import { increment } from '../features/counter/counterSlice';
import { useAppSelector } from '../store/hooks';
import { wrapper } from '../store/store';
import styles from '../styles/Home.module.css';

const IndexPage: NextPage = () => {
    const store = useAppSelector((state) => state.counter.value);

    useEffect(() => {
        console.log(store);
    }, [store]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Redux Toolkit</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <Image
                    src="/logo.svg"
                    className={styles.logo}
                    width={385}
                    height={385}
                    alt="logo"
                />
                <Counter />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a
                        className={styles.link}
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </a>
                    <span>, </span>
                    <a
                        className={styles.link}
                        href="https://redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux
                    </a>
                    <span>, </span>
                    <a
                        className={styles.link}
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                        className={styles.link}
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </a>
                </span>
            </header>
        </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps =
    //@ts-ignore
    wrapper.getServerSideProps((store) => async () => {
        await store.dispatch(increment());
        await store.dispatch(increment());
        await store.dispatch(increment());
        await store.dispatch(increment());
    });
