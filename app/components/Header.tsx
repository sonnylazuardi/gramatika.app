import React from "react";

const Header = () => {
  return (
    <header
      className="fixed left-0 right-0 backdrop-blur-sm bg-base-100/80"
      style={{ zIndex: 9999999 }}
    >
      <div className="container mx-auto max-w-screen-lg text-5xl px-4 lg:px-0">
        <div className="flex flex-row justify-between items-center h-20">
          <a href="/" className="text-2xl font-semibold flex flex-row">
            <img src="images/logo.svg" alt="Gramatika" className="mr-2" />{" "}
            Gramatika
          </a>
          <div className="flex flex-row space-x-4">
            {/* <div className="flex flex-row">
              <div className="form-control">
                <label className="sr-only hidden" htmlFor="color-toggle">
                  Ubah mode warna
                </label>
                <input
                  type="checkbox"
                  defaultChecked={false}
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
              <img
                src="images/light_mode.svg"
                className="ml-1"
                role="presentation"
              />
            </div> */}
            <a
              href="https://twitter.com/sonnylazuardi"
              className="text-sm lg:text-base flex flex-row items-end font-semibold"
            >
              <span className="sr-only md:not-sr-only md:inline-block">
                Twitter
              </span>{" "}
              <img
                src="images/arrow_white.svg"
                className="mb-1 ml-1"
                role="presentation"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
