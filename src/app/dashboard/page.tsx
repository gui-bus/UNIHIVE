"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

import {
  Pagination as PaginationShad,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UserPlus2 } from "lucide-react";
import Link from "next/link";

interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const StudentsList = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>("default");

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortStudents = (students: User[]): User[] => {
    switch (filterType) {
      case "nameAsc":
        return [...students].sort((a, b) =>
          a.name.first.localeCompare(b.name.first)
        );
      case "nameDesc":
        return [...students].sort((a, b) =>
          b.name.first.localeCompare(a.name.first)
        );
      case "ageAsc":
        return [...students].sort((a, b) => a.dob.age - b.dob.age);
      case "ageDesc":
        return [...students].sort((a, b) => b.dob.age - a.dob.age);
      default:
        return students;
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?results=50`);
      const data = await response.json();
      const sortedStudents = sortStudents(data.results);
      setStudents(sortedStudents);
    } catch (error) {
      console.error("Erro ao encontrar a lista de estudantes:", error);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onNextPageClick = () => {
    if (currentPage === 5) return;
    setCurrentPage(currentPage + 1);
  };

  const onPreviousPageClick = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const studentsPerPage = 10;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const sortedStudents = sortStudents(students);
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  return (
    <main className="w-full 3xl:max-w-7xl mx-auto p-5 bg-neutral-100">
      <div>
        <div className="flex items-center justify-between">
          <Button asChild>
            <Link href={"/dashboard/new"}>
              Cadastrar aluno <UserPlus2 size={18} className="ml-2" />
            </Link>
          </Button>
          <UserButton />
        </div>

        <Separator className="mt-3 mb-5" />
      </div>

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 mb-5"
      >
        <option value="default" disabled className="text-muted-foreground">
          Selecione o filtro desejado
        </option>
        <option value="nameAsc">Nome (A-Z)</option>
        <option value="nameDesc">Nome (Z-A)</option>
        <option value="ageAsc">Idade (crescente)</option>
        <option value="ageDesc">Idade (decrescente)</option>
        <option value="" disabled></option>
        <option value="default">Remover filtros</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentStudents.map((student, index) => (
          <Card
            key={index}
            className="cursor-default transition-all duration-200 ease-in-out hover:scale-[1.01] shadow-md"
          >
            <CardHeader className="py-5">
              <div className="flex items-center justify-center gap-3">
                <Image
                  src={student.picture.thumbnail}
                  alt={student.name.first}
                  width={0}
                  height={0}
                  className="size-8 rounded-full object-cover"
                />
                <CardTitle>
                  <div>
                    <p>
                      {student.name.first} {student.name.last}
                    </p>
                    <p className="font-light text-xs">{student.email}</p>
                  </div>
                </CardTitle>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ReactCountryFlag
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                  }}
                  className="rounded-md"
                  countryCode={student.nat}
                />
                <p className="text-xs">
                  {student.location.city}, {student.location.state}
                </p>
              </div>
              <CardDescription></CardDescription>
            </CardHeader>

            <Separator className="mb-5" />

            <CardContent className="text-center">
              <p className="text-sm">
                <span className="font-bold">Endereço -</span> Rua{" "}
                {student.location.street.name}, nº{" "}
                {student.location.street.number}
              </p>
              <p className="text-sm">
                <span className="font-bold">Data de nascimento -</span>{" "}
                {format(new Date(student.dob.date), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-sm">
                <span className="font-bold">Idade -</span> {student.dob.age}{" "}
                Anos
              </p>
              <p className="text-sm">
                <span className="font-bold">Telefone -</span> {student.phone}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        studentsPerPage={studentsPerPage}
        totalStudents={students.length}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onNext={onNextPageClick}
        onPrevious={onPreviousPageClick}
      />
    </main>
  );
};

interface PaginationProps {
  studentsPerPage: number;
  totalStudents: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  studentsPerPage,
  totalStudents,
  currentPage,
  onPageChange,
  onNext,
  onPrevious,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStudents / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationShad className="my-10 cursor-pointer select-none">
      <PaginationContent>
        <PaginationPrevious onClick={onPrevious} />
        {pageNumbers.map((number) => (
          <PaginationItem
            key={number}
            className={
              currentPage === number ? "bg-primary text-white rounded-lg" : ""
            }
          >
            <PaginationLink href="#" onClick={() => onPageChange(number)}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext onClick={onNext} />
      </PaginationContent>
    </PaginationShad>
  );
};

export default StudentsList;
