import { config } from '@/configurations/wagmi';
import {
    getBalance,
    waitForTransactionReceipt
} from '@wagmi/core'
import { getContractAddress } from '../contract';
import { Address } from 'viem/accounts';
import { Hash } from 'viem';
import { getChainNetwork } from '@/configurations/chains';

/* global BigInt */
export const CURRENT_EVENT = process.env.REACT_APP_EVENTID
export const DECIMALS = BigInt(1_000_000_000_000_000_000);
export const REAL_DECIMALS = 18
export const SUCCESS_STATUS = "success"


export async function walletBalance(address: Address, type: string ) {
    const contract : Address =  getContractAddress(type)
    
    const balance = await getBalance(config, {
        address: address as Address,
        token: contract
    })

    return balance
}

export async function formattedBalance(address: Address, type: string ) {
    const contract : Address =  getContractAddress(type)
    
    const balance = await getBalance(config, {
        address: address as Address,
        token: contract
    })

    return Number(balance?.formatted)
}

export async function getTransactionConfirmed(hash: Hash) {
    const chain = getChainNetwork()
    const transaction = await waitForTransactionReceipt(config, {
        chainId: chain.id, 
        hash: hash
    })

    return transaction
}