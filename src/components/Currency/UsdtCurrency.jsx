import React, { useEffect, useState, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import toast, { Toaster } from "react-hot-toast";
import ConnectWalletButton from "../ConnectWalletButton";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useBalance,
} from "wagmi";
import { parseUnits, parseEther, formatEther, formatUnits } from "viem";
import presaleAbi from "../../abi/presale.json";
import erc20Abi from "../../abi/erc20.json";
import {
  tokenAdd,
  usdcAdd,
  usdtAdd,
  contractAddr,
  chainId,
} from "../../config";

export default function UsdtCurrency() {
  const [usdtAmount, setUsdtAmount] = useState("");
  const [usdtErrorMessage, setUsdtErrorMessage] = useState("");
  const [allowance, setAllowance] = useState(new BigNumber(0));

  const { address } = useAccount();

  const balanceUsdt = useBalance({
    address: address,
    token: usdtAdd,
    chainId: chainId,
    enabled: !!address,
    watch: true,
  });

  const usdtBalanceBig = new BigNumber(balanceUsdt.data?.formatted);
  const isValidUsdt = usdtBalanceBig.gte(usdtAmount);

  const allowanceUsdtGet = useContractRead({
    address: usdtAdd,
    abi: erc20Abi,
    functionName: "allowance",
    enabled: !!address,
    args: [address, contractAddr],
    watch: true,
    chainId: chainId,
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: usdtAdd,
    abi: erc20Abi,
    functionName: "approve",
    args: [contractAddr, parseUnits(usdtAmount, 6)],
    enabled: !!address && !!usdtAmount && !!isValidUsdt,
    chainId: chainId,
  });

  const { data: approveData, write: approveWrite } =
    useContractWrite(approveConfig);

  const {
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    isError: approveIsError,
  } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  useEffect(() => {
    if (allowanceUsdtGet.data !== undefined) {
      const allowanceValue = new BigNumber(allowanceUsdtGet.data);
      setAllowance(allowanceValue);
    }
  }, [address, allowanceUsdtGet.data]);

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "buyTokensWithUSDT",
    args: [parseUnits(usdtAmount, 6)],
    enabled: !!address && !!usdtAmount && !!allowance.gt(0),
    chainId: chainId,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (approveIsSuccess) {
      toast.success(
        <div className="text-center py-2">
          Success! Approval Complete
          <div>
            <a
              style={{ color: "#fff" }}
              href={`https://sepolia.etherscan.io/tx/${approveData?.hash}`}
            >
              View On Etherscan
            </a>
          </div>
        </div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [approveIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        <div className="text-center py-2">
          Success! Purchase Complete
          <div>
            <a
              style={{ color: "#fff" }}
              href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
            >
              View On Etherscan
            </a>
          </div>
        </div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="text-center py-2">Error! Something Went Wrong</div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isError]);

  const getAmount = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTokenAmountUSDT",
    args: [parseUnits(usdtAmount, 6)],
    enabled: !!usdtAmount,
    watch: true,
    chainId: chainId,
  });

  const getResult = new BigNumber(getAmount.data);
  const result = isNaN(getResult)
    ? 0
    : new BigNumber(getResult).dividedBy(new BigNumber(10).pow(6)).toFixed(3);

  useEffect(() => {
    if (isSuccess) {
      setAllowance(new BigNumber(0));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data?.hash) {
      setAllowance(new BigNumber(0));
    }
  }, [data?.hash]);

  const handleUsdtAmount = useMemo(
    () => (event) => {
      const inputValue = event.target.value;
      const parsedAmount = Number(inputValue);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setUsdtErrorMessage("Amount must be greater than zero");
      } else if (balanceUsdt.data?.formatted < parsedAmount) {
        setUsdtErrorMessage("Insufficient balance.");
      } else {
        setUsdtErrorMessage("");
      }
      setUsdtAmount(inputValue);
    },
    []
  );

  return (
    <div>
      <div className="inputContainer">
        <div>
          <label htmlFor="paymentInput">YOU PAY IN USDT:</label>
          <div className="inputBox">
            <input
              type="number"
              placeholder="0"
              name="usdtAmount"
              value={usdtAmount}
              onChange={handleUsdtAmount}
              step="any"
            />
            <img
              className="inputIcon"
              src="/images/usdt.svg"
              width={36}
              height={36}
              alt="usdt"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tokenInput">$CLAIR YOU RECEIVE:</label>
          <div className="inputBox">
            <input type="number" placeholder={result} readOnly />
            <img
              className="inputIcon"
              src="/images/clair.png"
              width={36}
              height={36}
              alt="coin"
            />
          </div>
        </div>
      </div>
      {usdtErrorMessage && <p style={{ color: "red" }}>{usdtErrorMessage}</p>}
      {address && (
        <>
          {allowance.toNumber() < usdtAmount ? (
            <button
              type="button"
              className="button w-button"
              disabled={!approveWrite || approveIsLoading}
              onClick={() => approveWrite()}
            >
              {approveIsLoading ? "Approving..." : "Approve"}
            </button>
          ) : (
            <button
              type="button"
              className="button w-button"
              disabled={!write || isLoading}
              onClick={() => write()}
            >
              {isLoading ? "Buying..." : "Buy Now"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
