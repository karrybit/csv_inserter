/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import SqlViewer from "../islands/SqlViewer.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Input csv file to insert DB.
      </p>
      <SqlViewer />
    </div>
  );
}
