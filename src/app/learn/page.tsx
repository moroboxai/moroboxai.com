"use client";

import React from "react";
import dynamic from "next/dynamic";

const Learn = dynamic(() => import("../../components/Learn"), { ssr: false });

export default function LearnPage() {
    return <Learn />;
}
