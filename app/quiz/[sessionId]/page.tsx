"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

type Team = { id:number; name:string };
const START_TEAMS: Team[] = [
  { id:1, name:"Georgia" },
  { id:2, name:"Ohio State" },
  { id:3, name:"Texas" },
  { id:4, name:"Alabama" },
  { id:5, name:"Michigan" },
];

export default function Quiz() {
  const params = useParams<{ sessionId: string }>();
  const sessionId = params.sessionId as string;

  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const a = START_TEAMS[i];
  const b = START_TEAMS[j];

  function pick() {
    if (j < START_TEAMS.length - 1) {
      setJ(j + 1);
    } else if (i < START_TEAMS.length - 2) {
      setI(i + 1);
      setJ(i + 2);
    } else {
      alert(`Finished demo! (Session: ${sessionId})`);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-sm text-gray-500">Session: {sessionId}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <button onClick={pick} className="border rounded-xl p-8 text-xl">
          {a.name}
        </button>
        <button onClick={pick} className="border rounded-xl p-8 text-xl">
          {b.name}
        </button>
      </div>
    </main>
  );
}
