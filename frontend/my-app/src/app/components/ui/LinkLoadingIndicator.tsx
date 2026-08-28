"use client";


import { useLinkStatus } from "next/link";
import { LoadingOverlay } from "./LoadingOverlay";
import {LinkLoadingIndicatorProps}  from "./LoadingOverlay";


export function LinkLoadingIndicator({
  name,
}: LinkLoadingIndicatorProps) {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return <LoadingOverlay name={name} />;
}