import React, { ReactNode } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaLinkedinIn,
  FaChevronRight,
  FaSitemap,
} from "react-icons/fa6";
import Link from "next/link";
import { Button } from "./ui/button";

type ButtonSize = "sm" | "lg" | "icon" | "default" | null | undefined;

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  size: ButtonSize;
}

function SocialLink({ href, icon, size }: SocialLinkProps) {
  return (
    <Button size={size} variant={"outline"} asChild>
      <Link href={href} target="_blank">
        {icon}
      </Link>
    </Button>
  );
}

interface FooterLinkProps {
  text: string;
}

function FooterLink({ text }: FooterLinkProps) {
  return (
    <p className="group flex cursor-pointer items-center justify-center gap-1">
      <span
        className="footerLink hidden group-hover:block group-hover:animate-spin"
        style={{ animationIterationCount: 1, animationDuration: "0.3s" }}
      >
        <FaChevronRight size={12} />
      </span>
      {text}
    </p>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const courses = [
    "Engenharia Civil",
    "Arquitetura e Urbanismo",
    "Administração",
    "Direito",
    "Medicina",
  ];
  
  const administrativeTasks = [
    "Matrículas e Rematrículas",
    "Grade Curricular",
    "Avaliação de Professores",
    "Gestão Financeira",
    "Recursos Humanos",
  ];
  
  const resources = [
    "Biblioteca",
    "Laboratórios",
    "Salas de Aula",
    "Plataforma de E-learning",
    "Centro de Atendimento ao Aluno",
  ];
  

  return (
    <footer className="mx-auto w-full border-t border-input cursor-default items-center justify-center bg-white pt-8 shadow-xl md:px-0 3xl:max-w-7xl 3xl:rounded-t-2xl">
      <section className="flex flex-col items-center justify-around gap-y-4 px-4 pb-8 shadow-xl md:flex-row md:gap-y-0">
        <Link href="/">
          <Image
            src="/Logo.svg"
            alt="UNIHIVE"
            width={200}
            height={50}
            style={{ objectFit: "contain" }}
            className="h-auto w-44"
          />
        </Link>

        <p className="text-sm">
          &copy; {currentYear} UNIHIVE - Todos os direitos reservados.
        </p>

        <div className="flex gap-1">
          <SocialLink
            href="https://guibus.vercel.app/"
            icon={<FaSitemap size={20} />}
            size="icon"
          />
          <SocialLink
            href="https://github.com/gui-bus"
            icon={<FaGithub size={20} />}
            size="icon"
          />
          <SocialLink
            href="https://www.linkedin.com/in/gui-bus"
            icon={<FaLinkedinIn size={20} />}
            size="icon"
          />
        </div>
      </section>

      <div className="bg-zinc-200/60 px-4 py-6">
        <section className="mx-auto flex flex-col items-center justify-center gap-3 text-center text-xs md:flex-row">
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-base font-medium uppercase">Cursos</h3>
            {courses.map((course, index) => (
              <FooterLink key={index} text={course} />
            ))}
          </div>

          <div className="flex w-full flex-col gap-1">
            <h3 className="text-base font-medium uppercase">Administrativo</h3>
            {administrativeTasks.map((task, index) => (
              <FooterLink key={index} text={task} />
            ))}
          </div>

          <div className="flex w-full flex-col gap-1">
            <h3 className="text-base font-medium uppercase">Recursos</h3>
            {resources.map((resource, index) => (
              <FooterLink key={index} text={resource} />
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}
