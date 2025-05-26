import WatchClient from "@/components/WatchClient";
import React from "react";

type WatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Watch = async ({ params }: WatchPageProps) => {
  const { id } = await params;

  return <WatchClient id={id} />;
};

export default Watch;
