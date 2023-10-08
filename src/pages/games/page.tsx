"use client";

import React from "react";
import dynamic from "next/dynamic";

const Games = dynamic(() => import("../../components/Games"), { ssr: false });

export default function GamesPage() {
    return <Games />;
}
