import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import * as anchor from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { PRESALE_AUTHORITY, PRESALE_PROGRAM_PUBKEY, PRESALE_SEED, PRESALE_RESERVE_SEED, TOKEN_DECIMAL, TOKEN_PUBKEY, USER_SEED, ESCROW_SEED } from "./constants.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ASSOCIATED_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import useHistory from "./useHistroy.js";

import { IDL } from "../idl/token_presale.ts";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

/* global BigInt */

export default function usePresale() {
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [transactionPending, setTransactionPending] = useState(false);
  const [price_per_token, setPricePerToken] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [receiver, setReceiver] = useState();
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [stageNumber, setStageNumber] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [totalBuyAmount, setTotalBuyAmount] = useState(0);
  const [entireBuyAmount, setEntireBuyAmount] = useState(0);
  const [totalHardCap, setTotalHardCap] = useState(0);
  const [totalSoftCap, setTotalSoftCap] = useState(0);
  const [loading, setLoading] = useState(false);
  const {getAuthToken, saveData} = useHistory();
  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(IDL, PRESALE_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const getPresaleInfo = async () => {
      if (program && !transactionPending) {
        try {
          setLoading(true);
          const [presale_info, presale_bump] = findProgramAddressSync(
            [
              utf8.encode(PRESALE_SEED),
              PRESALE_AUTHORITY.toBuffer(),
            ],
            program.programId
          );
          // @ts-ignore
          const info = await program.account.presaleInfo.fetch(presale_info);
          setPricePerToken(Number(info.pricePerToken));
          setStageNumber(info.stage)
          setStartTime(info.startTime);
          setEndTime(info.endTime);
          setTotalBuyAmount(Number(info.soldTokenAmount) / 10 ** 9);
          setEntireBuyAmount(Number(info.soldQuoteAmount) / 10 ** 9);
          setTotalHardCap(Number(info.hardcapAmount) / 10 ** 9);
          setTotalSoftCap(Number(info.softcapAmount) / 10 ** 9);
          setReceiver(info.receiver);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const getUserInfo = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [userInfo, userBump] = findProgramAddressSync(
            [
              utf8.encode(USER_SEED),
              PRESALE_AUTHORITY.toBuffer(),
              publicKey.toBuffer(),
            ],
            program.programId
          );
          const balance = await connection.getBalance(publicKey);
          setBalance(balance);
          // @ts-ignore
          const info = await program.account.userInfo.fetch(userInfo);
          setBuyAmount(info.buyTokenAmount);
          setQuoteAmount(info.buyQuoteAmount);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    getPresaleInfo();
    getUserInfo();
  }, [publicKey, transactionPending]);

  const buyToken = async (solBalance, referAddress) => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [presaleInfo] = findProgramAddressSync(
          [
            utf8.encode(PRESALE_SEED),
            PRESALE_AUTHORITY.toBuffer(),
          ],
          program.programId
        );

        const [userInfo] = findProgramAddressSync(
          [
            utf8.encode(USER_SEED),
            PRESALE_AUTHORITY.toBuffer(),
            publicKey.toBuffer(),
          ],
          program.programId
        );
        const buyerAssociatedTokenAccount =
        await anchor.utils.token.associatedAddress({
          mint: TOKEN_PUBKEY,
          owner: publicKey,
        });
        
        const [presaleAssociatedTokenAccount] =
        findProgramAddressSync(
          [
            utf8.encode(ESCROW_SEED),
            presaleInfo.toBuffer(),
            
          ],
          program.programId
        );
        // Use BigInt for large number calculations        
        const bigIntSolAmount =
        BigInt(Number(solBalance * 10 ** TOKEN_DECIMAL).toFixed(0));
        const tx = await program.methods
        .buyToken(
          new anchor.BN(bigIntSolAmount.toString()),
        )
        .accounts({
          presaleInfo,
          presaleTokenMintAccount: TOKEN_PUBKEY,
          buyerPresaleTokenAssociatedTokenAccount: buyerAssociatedTokenAccount,
          presalePresaleTokenAssociatedTokenAccount: presaleAssociatedTokenAccount,
          presaleAuthority: PRESALE_AUTHORITY,
          userInfo,
          buyerAuthority: publicKey,
          buyer: publicKey,
          solReceiver: receiver,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
        })
        .rpc();
        toast.success("Token purchase was successful.");
        saveData(getAuthToken, publicKey?.toBase58(), solBalance, solBalance * price_per_token);
        return false;
      } catch (error) {
        console.log(error);
        toast.error(error.toString());
        return false;
      } finally {
        setTransactionPending(false);
      }
    }
  };

  return {
    buyToken,
    balance,
    price_per_token,
    buyAmount,
    entireBuyAmount,
    totalBuyAmount
  }
}
