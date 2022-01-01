export default function Index() {
  return (
    <div className="px-4 lg:px-0">
      <header className="fixed left-0 right-0 backdrop-blur-sm bg-base-100/80">
        <div className="container mx-auto max-w-screen-lg text-5xl px-4 lg:px-0">
          <div className="flex flex-row justify-between items-center h-20">
            <img src="images/logo.svg" alt="Gramatika" />
            <div className="flex flex-row space-x-4">
              <div className="flex flex-row">
                <div className="form-control">
                  <label className="sr-only" htmlFor="color-toggle">Ubah mode warna</label>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    id="color-toggle"
                    name="color-toggle"
                    className="toggle"
                    onChange={(e) => {
                      try {
                        if (e.target.checked) {
                          document.documentElement.dataset.theme = "light";
                        } else {
                          document.documentElement.dataset.theme = "dark";
                        }
                      } catch (e) {}
                    }}
                  />
                </div>
                <img src="images/light_mode.svg" className="ml-1" role="presentation" />
              </div>
              <a
                href="https://twitter.com/sonnylazuardi"
                className="text-sm text-black lg:text-base flex flex-row items-end font-semibold"
              >
                <span className="sr-only md:not-sr-only md:inline-block">@sonnylazuardi</span>{" "}
                <img src="images/arrow_black.svg" className="mb-1 ml-1" role="presentation" />
              </a>
            </div>
          </div>
        </div>
      </header>
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
              <img src="images/chrome_logo.png" className="mr-4" role="presentation" />
              Pasang Pengaya di
              <br /> Chrome Webstore{" "}
              <img src="images/arrow_white.svg" className="ml-4" role="presentation" />
            </a>
          </div>
          <div className="flex flex-row justify-center lg:justify-start">
            <a
              href="https://twitter.com/sonnylazuardi/status/1476510329471258624?s=20"
              className="border border-base-content border-solid bg-base-100 text-base-content text-sm flex flex-row p-4 items-center justify-center rounded-tl-2xl rounded-tr-2xl rounded-br-2xl font-semibold"
            >
              <img src="images/android_logo.png" className="mr-4" role="presentation" />
              Aplikasi Ponsel dalam
              <br /> Pengembangan{" "}
              <img src="images/arrow_black.svg" className="ml-4" role="presentation" />
            </a>
          </div>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 mb-20">
          <div className="bg-base-300 h-96 flex items-center justify-center rounded-tl-2xl rounded-bl-2xl rounded-br-2xl mb-4 overflow-hidden">
            <img src="images/extension.png" role="presentation" style={{ width: 450 }} />
          </div>
          <div className="bg-base-300 h-96 flex items-center justify-center rounded-tr-2xl rounded-bl-2xl rounded-br-2xl mb-4 overflow-hidden">
            <img src="images/mobile.png" role="presentation" style={{ width: 450 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
