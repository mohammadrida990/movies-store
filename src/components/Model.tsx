"use client";
import React from "react";
import InfoModel from "./InfoModel";
import useInfoModel from "@/hooks/useInfoModel";

const Model = () => {
  const { isOpen, closeModel } = useInfoModel();
  return <InfoModel visible={isOpen} onClose={closeModel} />;
};

export default Model;
