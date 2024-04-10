"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ImEnter } from "react-icons/im";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="bg-[url('/home.png')] bg-cover bg-center bg-no-repeat py-20 flex items-center justify-center 3xl:max-w-7xl mx-auto 3xl:rounded-b-2xl">
      <div className="flex items-center justify-center p-5 text-center">
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/logo.png"
            alt="UNIHIVE"
            width={0}
            height={0}
            sizes="100vw"
            className="w-52 h-auto"
          />

          <div className="flex flex-col items-center text-white">
            <h1 className="font-bold text-2xl">Bem-vindo ao UNIHIVE</h1>
            <p className="font-light text-lg">
              Descubra o poder da gestão acadêmica simplificada.
            </p>
          </div>

          {user?.id !== "" ? (
            <Button
              className="flex items-center justify-center gap-2 h-14 w-full"
              asChild
            >
              <Link href={"/dashboard"}>
                Acessar Painel <MdOutlineAdminPanelSettings size={20} />
              </Link>
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center justify-center gap-2 h-14 w-full">
                  Login <ImEnter size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogDescription>
                    <SignIn redirectUrl={"/dashboard"} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </main>
  );
}
