import axios, { AxiosInstance } from 'axios'
import { IAssetData, IGasPrices, IParsedTx } from './types'

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.bscscan.com/api',
  timeout: 30000, // 30 secs
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function apiGetAccountAssets(
  address: string,
  chainId: number
): Promise<IAssetData[]> {
  const response = await api.get(
    `?module=account&action=balance&address=${address}&tag=latest&apikey=3T5UAVUSAS2FRPS9MI54U1BNDRCWK7XC8M`
  )


  const result = [{"symbol":"BNB","name":"Binance Smart Chain","decimals":"8","contractAddress":"","balance":response.data.result}]
  
  return result
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: number
): Promise<IParsedTx[]> {
  const response = await api.get(
    `/account-transactions?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetAccountNonce = async (
  address: string,
  chainId: number
): Promise<string> => {
  const response = await api.get(
    `/account-nonce?address=${address}&chainId=${chainId}`
  )
  const { result } = response.data
  return result
}

export const apiGetGasPrices = async (): Promise<IGasPrices> => {
  const response = await api.get(`/gas-prices`)
  const { result } = response.data
  return result
}
