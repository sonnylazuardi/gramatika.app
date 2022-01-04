import Header from "../components/Header";

export default function Index() {
  return (
    <div className="px-4 lg:px-0">
      <Header />
      <div className="container mx-auto max-w-screen-lg text-5xl">
        <div className="flex flex-col justify-center items-center mb-12">
          <h1 className="mt-32 text-center max-w-2xl text-3xl lg:text-6xl mb-4 font-bold">
            Memperkenalkan Gramatika!
          </h1>
          <p className="text-base font-normal text-center max-w-md">
            Asisten menulis Bahasa Indonesia baku di peramban (browser) dan
            aplikasi ponsel.
          </p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 mb-4 lg:mb-0">
          <div className="flex flex-row justify-center lg:justify-end">
            <a
              href="https://chrome.google.com/webstore/detail/gramatika-bahasa-indonesi/hhodeijkemcdbelkfdhglgmgpmgkfekk?hl=id"
              className="bg-black text-white text-sm flex flex-row p-4 items-center justify-center rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl font-semibold"
            >
              <img
                src="images/chrome_logo.png"
                className="mr-4"
                role="presentation"
              />
              Pasang Pengaya di
              <br /> Chrome Webstore{" "}
              <img
                src="images/arrow_white.svg"
                className="ml-4"
                role="presentation"
              />
            </a>
          </div>
          <div className="flex flex-row justify-center lg:justify-start">
            <a
              href="https://play.google.com/store/apps/details?id=com.sonnylab.gramatika"
              className="border border-base-content border-solid bg-base-100 text-base-content text-sm flex flex-row p-4 items-center justify-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl font-semibold"
            >
              <img
                src="images/android_logo.png"
                className="mr-4"
                role="presentation"
              />
              Aplikasi Android
              <br /> di Play Store{" "}
              <img
                src="images/arrow_black.svg"
                className="ml-4"
                role="presentation"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 mb-20">
          <div className="bg-base-200 h-96 flex items-center justify-center rounded-tl-2xl rounded-bl-2xl rounded-br-2xl mb-4 overflow-hidden">
            <img src="images/extension.png" style={{ width: 450 }} />
          </div>
          <div className="bg-base-200 h-96 flex items-center justify-center rounded-tr-2xl rounded-bl-2xl rounded-br-2xl mb-4 overflow-hidden">
            <img src="images/mobile.png" style={{ width: 450 }} />
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
