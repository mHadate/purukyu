import type { NextPage } from "next";
import Head from "next/head";
import { WEBSITE_NAME, DESCRIPTION } from "../constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    const uid = query.uid as string | null;
    console.log(uid);

    const postSuccess = async (uid: string) => {
      const body = {
        uid,
      };
      console.log(body);
      const result = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify(body),
      });
    };
    if (uid) {
      (async () => postSuccess(uid))();
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="flex flex-wrap">
        <div className="container text-center">
          <p className="text-xl">ご購入ありがとうございました。</p>
          <p className="m-16">
            <Link href={"/"} passHref>
              <a className="bg-pink-400 w-3/12 p-4 text-white text-xl text-center rounded-xl">
                トップページに戻る
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
