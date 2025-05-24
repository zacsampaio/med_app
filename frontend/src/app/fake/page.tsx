"use client"
import React, { useState } from "react";
import axios from 'axios';
import Link from "next/link";
import { FakeApiUser } from "../types";

export default function FakeApi() {

    const [fakeApiData, setFakeApiData] = useState<FakeApiUser[] | null>(null);;

    const requestFakeApi = async () => {
        try {
            const response = await axios.get<FakeApiUser[]>('https://jsonplaceholder.typicode.com/users');
            setFakeApiData(response.data);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <h1>Dados Fake Api</h1>
            <button className="bg-green-500 p-2 inline-block text-white text-sm"
             onClick={() => requestFakeApi()}>Buscar dados Fake Api</button>
            <table>
                {!!fakeApiData && fakeApiData.map((data) => (
                    <tr key={data.id}>
                        <td className='border border-slate-300'>{data.name}</td>
                        <td className='border border-slate-300 text-center'>{data.username}</td>
                        <td className='border border-slate-300 text-center'>{data.email}</td>
                        <td className='border border-slate-300 text-center'>{data.phone}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}