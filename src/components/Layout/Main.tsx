import React, { MouseEvent } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { useAccount } from "wagmi";
import Header from "./Header";
import { OpenParams } from "@/types/account";
import classNames from "classnames";
import { useFetchAuth } from "@/hooks/useAuth";

interface LayoutProps {
    children: React.ReactNode;
    type: string
}

const Layout: React.FC<LayoutProps> = ({ children, type }) => {
    const { open } = useWeb3Modal();
    const { address } = useAccount();
    const { data } = useFetchAuth();

    const handleConnect = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        e.preventDefault();
        if (address) {
            open({ view: "Account" } as OpenParams);
        } else {
            open({ view: "Connect" } as OpenParams);
        }
    };

    console.log(data)

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">

            <Header handleConnect={handleConnect} address={address} />

            <main className={classNames({
                "w-full max-w-screen-xl sm:px-2 px-4 pt-8 mx-auto gap-x-5 gap-y-10": type === 'ico',
                "grid grid-cols-2 w-full max-w-screen-xl sm:px-8 px-4 pt-8 pb-20 mx-auto gap-x-5 gap-y-10": type === 'stake'
            })}>
                {children}
            </main>

        </div>
    );
};

export default Layout;