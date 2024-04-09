"use client";
import NewStudentForm from "@/components/newStudent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const NewStudentPage = () => {
  const router = useRouter();
  return (
    <main className="w-full 3xl:max-w-7xl mx-auto p-5 bg-neutral-100">
      <Button onClick={() => router.back()}>
        <ChevronLeft size={20} className="mr-2" /> Voltar
      </Button>

      <Separator className="mt-3 mb-5" />

      <div className="mx-auto w-full p-5">
        <div className="mx-auto mb-5 flex w-full flex-col justify-center space-y-2">
          <h1 className="flex justify-center text-2xl font-bold">
            Cadastrar aluno
          </h1>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Cadastre novos alunos no banco de dados da UNIHIVE.
          </p>
          <p className="text-xs text-center text-muted-foreground">
            Os campos marcados com <span className="text-red-500">*</span> são
            obrigatórios.
          </p>
        </div>
        <NewStudentForm />
      </div>
    </main>
  );
};

export default NewStudentPage;
