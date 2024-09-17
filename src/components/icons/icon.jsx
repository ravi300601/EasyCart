export const BytesizeHeart = (props) => (
    <>
        <div className="relative group transition-all ease-in-out">
            {props?.loveditems > 0 ? (
                <div className="absolute left-6 -top-2">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full text-sm bg-blue-500 p-2 text-white">
                        {props?.loveditems}
                    </p>
                </div>
            ) : (
                ""
            )}
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    fill="white"
                    stroke="#5e3fde"
                    className="group-hover:stroke-red-600"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12s-12 12-12 12s-9-8-12-12"
                ></path>
            </svg>
        </div>
    </>
);

export const IlHeart = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 710 780"
        {...props}
    >
        <path
            fill="#ff0000"
            d="M651 55q29 27 44 61t15 71t-13 71t-42 63L371 605q-7 7-16 7t-17-7L54 321q-27-28-40-63T1 187t14-71t42.5-61T121 17t70-11t70 16t61 42l33 33l33-33q27-27 61-42t70-16t70 11t62 38z"
        ></path>
    </svg>
);

export const ZmdiDelete = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 304 384"
        {...props}
    >
        <path
            fill="currentColor"
            d="M21 341V85h256v256q0 18-12.5 30.5T235 384H64q-18 0-30.5-12.5T21 341zM299 21v43H0V21h75L96 0h107l21 21h75z"
        ></path>
    </svg>
);
