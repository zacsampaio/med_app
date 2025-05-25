import React from "react";
import Link from "next/link";

export default function Home(){
    
    return (
        <>
            <h1>Home</h1>
            <div>
                <Link href="/doctor/create">Criar um novo doutor</Link><br></br>
                <Link href="/doctor/list">Listar todos os doutores</Link><br></br>
                <Link href="/patient/create">Criar um novo paciente</Link><br></br>
                <Link href="/appointment/create">Criar uma nova consulta</Link><br></br>
                <Link href="/prescription/create">Criar uma nova prescrição</Link><br></br>
                <Link href="/prescription/upload">Enviar prescrição</Link><br></br>
                <br></br>
                <Link href="/fake">Testing fake api</Link>
            </div>
        </>
    )
}