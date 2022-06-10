import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import Header from "../components/Header";
//@ts-ignore
import { TwitterTweetEmbed } from "react-twitter-embed";
import Star from "~/components/Star";

const variants = {
  rest: {
    rotate: 0,
  },
  hover: {
    rotate: 45,
  },
};

export default function Index() {
  const { scrollYProgress } = useViewportScroll();
  const translate = useTransform(scrollYProgress, [0, 0.9], [100, -20]);
  const translate2 = useTransform(scrollYProgress, [0, 0.9], [-40, 100]);
  const animate = useSpring(translate, {
    stiffness: 300,
    damping: 40,
  });
  const animate2 = useSpring(translate2, {
    stiffness: 300,
    damping: 40,
  });

  const renderCircle = (image: string) => {
    return (
      <div
        className="absolute backdrop-blur-sm bg-slate-600/30 shadow-2xl flex justify-center items-center"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          left: "calc(50% - 40px)",
          top: "calc(50% - 40px)",
        }}
      >
        <img src={image} />
      </div>
    );
  };

  const buttonClass = "border border-base-content border-solid bg-base-100 text-base-content text-sm flex flex-row p-4 items-center justify-center rounded-2xl font-semibold mb-2"

  return (
    <div className="px-4 lg:px-0">
      <Header />
      <div className="container mx-auto max-w-screen-lg text-5xl">
        <div className="flex flex-col justify-center items-center mb-12">
          <h1 className="mt-32 text-center max-w-2xl text-4xl lg:text-6xl mb-6 font-bold">
            Memperkenalkan Gramatika!
          </h1>
          <p className="text-base font-normal text-center max-w-md">
            Asisten menulis Bahasa Indonesia baku dan KBBI di peramban (browser)
            dan aplikasi ponsel.
          </p>
        </div>

        <div className="flex lg:flex-row flex-col lg:space-x-6 justify-center mb-6">
          <motion.a
            whileHover="hover"
            href="https://chrome.google.com/webstore/detail/gramatika-bahasa-indonesi/hhodeijkemcdbelkfdhglgmgpmgkfekk?hl=id"
            className={buttonClass}
            data-splitbee-event="Chrome"
            target="_blank"
          >
            <img src="images/chrome_logo.png" className="mr-4" />
            Pasang Pengaya di
            <br /> Chrome Webstore{" "}
            <motion.div
              className="flex justify-center items-center ml-4"
              style={{ width: 40, height: 40 }}
              variants={variants}
            >
              <img src="images/arrow_white.svg" />
            </motion.div>
          </motion.a>
          <motion.a
            whileHover="hover"
            href="https://addons.mozilla.org/en-GB/firefox/addon/gramatika/"
            className={buttonClass}
            data-splitbee-event="Firefox"
            target="_blank"
          >
            <img src="images/firefox_logo.svg" className="mr-4" />
            Pasang Pengaya
            <br /> di Firefox{" "}
            <motion.div
              className="flex justify-center items-center ml-4"
              style={{ width: 40, height: 40 }}
              variants={variants}
            >
              <img src="images/arrow_white.svg" />
            </motion.div>
          </motion.a>
          <motion.a
            whileHover="hover"
            href="https://play.google.com/store/apps/details?id=com.sonnylab.gramatika"
            className={buttonClass}
            data-splitbee-event="Android"
            target="_blank"
          >
            <img src="images/android_logo.png" className="mr-4" />
            Aplikasi Android
            <br /> di Play Store{" "}
            <motion.div
              className="flex justify-center items-center ml-4"
              style={{ width: 40, height: 40 }}
              variants={variants}
            >
              <img src="images/arrow_white.svg" />
            </motion.div>
          </motion.a>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 relative">
          <div className="bg-base-200 h-96 flex items-center justify-center rounded-2xl mb-6 overflow-hidden">
            <motion.div style={{ y: animate2 }}>
              <img src="images/extension.png" style={{ width: 450 }} />
            </motion.div>
          </div>
          <div className="bg-base-200 h-96 flex flex-col p-16 rounded-2xl mb-6 overflow-hidden">
            <h2 className="text-3xl font-semibold mb-6">Mode Menyunting</h2>
            <p className="text-xl font-normal">
              Mengecek kesalahan ejaan otomatis berdasarkan PUEBI dari teks yang
              diketik atau dipilih.
            </p>
          </div>
          {renderCircle("images/edit.svg")}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 relative">
          <div className="bg-base-200 h-96 flex flex-col p-16 rounded-2xl mb-6 overflow-hidden">
            <h2 className="text-3xl font-semibold mb-6">Mode KBBI</h2>
            <p className="text-xl font-normal">
              Lihat definisi kata yang dipilih tanpa harus bolak-balik kamus.
            </p>
          </div>
          <div className="bg-base-200 h-96 flex items-center justify-center rounded-2xl mb-6 overflow-hidden">
            <motion.div style={{ y: animate }}>
              <img src="images/extension2.png" style={{ width: 450 }} />
            </motion.div>
          </div>
          {renderCircle("images/book.svg")}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 relative">
          <div className="bg-base-200 h-96 flex items-center justify-center rounded-2xl mb-6 overflow-hidden">
            <motion.div style={{ y: animate2 }}>
              <img src="images/extension_popup.png" style={{ width: 450 }} />
            </motion.div>
          </div>
          <div className="bg-base-200 h-96 flex flex-col p-16 rounded-2xl mb-6 overflow-hidden">
            <h2 className="text-3xl font-semibold mb-6">Pop-up</h2>
            <p className="text-xl font-normal">
              Pop-up muncul otomatis setelah memilih (select) teks dalam halaman
              peramban
            </p>
          </div>
          {renderCircle("images/popup.svg")}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 relative">
          <div className="bg-base-200 h-96 flex flex-col p-16 rounded-2xl mb-6 overflow-hidden">
            <h2 className="text-3xl font-semibold mb-6">Aplikasi Android</h2>
            <p className="text-xl font-normal">
              Akses asisten Gramatika di mana pun dan kapan pun dalam genggaman
              tangan.
            </p>
          </div>
          <div className="bg-base-200 h-96 flex items-center justify-center rounded-2xl mb-6 overflow-hidden">
            <motion.div style={{ y: animate }}>
              <img src="images/mobile.png" style={{ width: 450 }} />
            </motion.div>
          </div>

          {renderCircle("images/phone.svg")}
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 relative">
          <div className="bg-base-200 h-96 flex flex-col p-4 rounded-2xl mb-6 overflow-hidden">
            <TwitterTweetEmbed
              options={{ conversation: "none" }}
              tweetId={"1470075100758102024"}
            />
          </div>
          <div className="bg-base-200 h-96 flex flex-col justify-center items-center rounded-2xl mb-6 overflow-hidden">
            <h2 className="text-3xl font-semibold mb-2">Rating 4.95/5</h2>
            <div className="mb-2">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p className="text-base">1000+ Pengguna</p>
          </div>
        </div>
        <div className="text-sm text-center">
          <div className="text-base font-semibold">
            <a href="/privacy">Privacy Policy</a>
          </div>
          <div className="py-8">© 2022 Gramatika.app. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
