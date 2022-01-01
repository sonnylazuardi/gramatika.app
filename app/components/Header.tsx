import React from "react";

const Header = () => {
  return (
    <div className="fixed left-0 right-0 backdrop-blur-sm bg-base-100/80">
      <div className="container mx-auto max-w-screen-lg text-5xl px-4 lg:px-0">
        <div className="flex flex-row justify-between items-center h-20">
          <a href="/">
            <img src="images/logo.svg" />
          </a>
          <div className="flex flex-row space-x-4">
            <div className="flex flex-row">
              <div className="form-control">
                <input
                  type="checkbox"
                  defaultChecked={true}
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
              <img src="images/light_mode.svg" className="ml-1" />
            </div>
            <a
              href="https://twitter.com/sonnylazuardi"
              className="text-sm text-black lg:text-base flex flex-row items-end font-semibold"
            >
              <span className="hidden md:inline-block">@sonnylazuardi</span>{" "}
              <img src="images/arrow_black.svg" className="mb-1 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
