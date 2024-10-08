import * as React from "react";
const SvgFrame = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#A7AEC1"
      d="M15.625 7.344h-1.408V4.132C14.217 1.853 12.325 0 10 0s-4.22 1.853-4.22 4.132v3.212H4.376a2.346 2.346 0 0 0-2.344 2.343v7.97A2.346 2.346 0 0 0 4.375 20h11.25a2.346 2.346 0 0 0 2.344-2.344V9.688a2.346 2.346 0 0 0-2.344-2.344M7.342 4.132c0-1.417 1.192-2.57 2.657-2.57 1.464 0 2.656 1.153 2.656 2.57v3.212H7.342zm9.064 13.524c0 .431-.35.782-.781.782H4.375a.78.78 0 0 1-.781-.782V9.688c0-.431.35-.782.781-.782h11.25c.43 0 .781.35.781.781z"
    />
    <path
      fill="#A7AEC1"
      d="M10 11.172a1.445 1.445 0 0 0-.783 2.66v1.715a.781.781 0 0 0 1.563 0v-1.713a1.444 1.444 0 0 0-.78-2.662"
    />
  </svg>
);
export default SvgFrame;
