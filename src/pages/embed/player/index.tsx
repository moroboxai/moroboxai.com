"use client";

import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import Layout from "@/embedLayout";

const EmbedPlayer = dynamic(() => import("@/components/Embed/EmbedPlayer"), {
    ssr: false
});

export default function EmbedPlayerPage() {
    return <EmbedPlayer />;
}

EmbedPlayerPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
