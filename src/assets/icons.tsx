
export const LogoIcon = ({size}:{size: number}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48">
    <g fill="none">
      <path
        fill="url(#SVGIRbAbbIU)"
        d="M12 6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6z"
      />
      <path
        fill="url(#SVGK2yQpb1K)"
        d="M20.884 15.366a1.25 1.25 0 0 1 0 1.768L14.018 24l6.866 6.866a1.25 1.25 0 0 1-1.768 1.768l-7.75-7.75a1.25 1.25 0 0 1 0-1.768l7.75-7.75a1.25 1.25 0 0 1 1.768 0m8 0l7.75 7.75a1.25 1.25 0 0 1 0 1.768l-7.75 7.75a1.25 1.25 0 0 1-1.768-1.768L33.982 24l-6.866-6.866a1.25 1.25 0 0 1 1.768-1.768"
      />
      <defs>
        <linearGradient
          id="SVGIRbAbbIU"
          x1={14.778}
          x2={34.52}
          y1={6}
          y2={42}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.028} stopColor="#e67eea" />
          <stop offset={0.438} stopColor="#ad64d7" />
          <stop offset={1} stopColor="#794dc5" />
        </linearGradient>
        <linearGradient
          id="SVGK2yQpb1K"
          x1={17.165}
          x2={28.034}
          y1={15.692}
          y2={42.785}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fdfdfd" />
          <stop offset={1} stopColor="#f9dcfa" />
        </linearGradient>
      </defs>
    </g>
  </svg>
);

export const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="m5.75 14.25s-.5-2 .5-3c0 0-2 0-3.5-1.5s-1-4.5 0-5.5c-.5-1.5.5-2.5.5-2.5s1.5 0 2.5 1c1-.5 3.5-.5 4.5 0 1-1 2.5-1 2.5-1s1 1 .5 2.5c1 1 1.5 4 0 5.5s-3.5 1.5-3.5 1.5c1 1 .5 3 .5 3"/>
      <path d="m5.25 13.75c-1.5.5-3-.5-3.5-1"/>
    </g>
  </svg>
);