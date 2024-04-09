"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserPlus2 } from "lucide-react";
import { COURSES } from "../../helpers/courses";
import { useState } from "react";

const newStudentSchema = z
  .object({
    name: z
      .string({ required_error: "Campo obrigatório!" })
      .trim()
      .min(1, "Campo obrigatório!"),
    email: z
      .string({ required_error: "Campo obrigatório!" })
      .trim()
      .min(1, "Campo obrigatório!"),
    course: z
      .string({ required_error: "Campo obrigatório!" })
      .refine((val) => Object.values(COURSES).includes(val as COURSES)),
    courseOther: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.course === COURSES.OUTRO) {
        return data.courseOther !== undefined && data.courseOther !== "";
      }
      return true;
    },
    { message: "Campo obrigatório quando 'Outro' é selecionado" }
  );

const NewStudentForm = () => {
  const [courseSelected, setCourseSelected] = useState<string>("");

  const form = useForm<z.infer<typeof newStudentSchema>>({
    resolver: zodResolver(newStudentSchema),
  });

  const handleSubmit = async () => {
    try {
      form.setValue("name", "");
      form.setValue("email", "");
      form.setValue("course", "");
      form.setValue("courseOther", "");
      setCourseSelected("");

      toast.success("Aluno cadastrado com sucesso!", {
        style: {
          fontSize: "12px",
        },
      });
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar este aluno!", {
        style: {
          fontSize: "12px",
        },
      });
    }
  };

  function handleChangeCourse(value: string) {
    setCourseSelected(value);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
      <div className="w-full">
        <Form {...form}>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex flex-col items-center gap-5 lg:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Nome <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do aluno..."
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o email do aluno..."
                        {...field}
                        autoComplete="off"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Curso <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl>
                      <select
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        {...field}
                        onChange={(e) => {
                          handleChangeCourse(e.target.value);
                          field.onChange(e);
                        }}
                      >
                        <option
                          value="default"
                          className="hidden text-muted-foreground"
                        >
                          Selecione o curso do aluno...
                        </option>
                        {Object.values(COURSES).map((course) => (
                          <option
                            className="text-black dark:text-white"
                            key={course}
                            value={course}
                          >
                            {course}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {courseSelected === COURSES.OUTRO && (
              <FormField
                control={form.control}
                name="courseOther"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Curso Personalizado{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o curso do aluno..."
                        {...field}
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Por favor, forneça o nome do curso desejado caso não tenha
                      sido possível encontrá-lo na lista.
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <Button
              variant={"default"}
              type="submit"
              className="w-full rounded-md"
            >
              Cadastrar novo aluno
              <UserPlus2 size={25} className="ml-2 text-white" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewStudentForm;
