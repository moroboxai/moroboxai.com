"use client";

import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import Layout from "@/embedLayout";

const EmbedEditor = dynamic(() => import("@/components/Embed/EmbedEditor"), {
    ssr: false
});

export default function EmbedEditorPage() {
    return <EmbedEditor />;
}

EmbedEditorPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
