import DialogflowMessenger from "@/components/component/DialogFlowMessenger";
import { Legal } from "@/components/component/legal";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Legal/>
      <DialogflowMessenger/>
    </main>
  );
}
