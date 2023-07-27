import { Dispatch, ReactNode, SetStateAction } from "react";

export type BaseProp = {
    className?: string,
    children: Array<ReactNode> | ReactNode
}

export enum PlatformStatus {
    ACTIVE,
    ERROR,
    LOADING,
    DISABLE
}
export type PlatformsState = {
    price: number;
    status: { [id: string]: PlatformStatus };
};

export type PlatformContextReturn = {
    platform: [
        PlatformsState,
        Dispatch<SetStateAction<PlatformsState>>,
    ],
    fetch: {
        AsyncSetPlatformsStatefromFetch: () => Promise<void>,
        loadingContext: [
            boolean, Dispatch<SetStateAction<boolean>>]
    },

}
export type WalletContextReturn = {
    wallet: [
        string | null,
        Dispatch<SetStateAction<string | null>>
    ],
    balance: [
        string | null,
        boolean
    ]
}
export type ApiPlatform = {
    id: string,
    logo: StaticImageData,
    api: string,
    getPriceFromQuery: Function,
    isValidQuery: Function
}

type ContractBalance = {
    [key: string]: string;
}

type ContractAllowances = {
    [key: string]: ContractBalance
}

export type ContractState = {
    _balance: string;
    allowances: ContractAllowances;
    balances: ContractBalance;
    contractowner: string;
    lock_proxy: string;
    total_supply: string;
}