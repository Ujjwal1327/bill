'use client';

import { useRef } from 'react';
import Image from 'next/image';
const Quotation = () => {
    const quotationRef = useRef();

    const handleDownload = async () => {
        const html2pdf = (await import('html2pdf.js')).default;

        const opt = {
            margin: 0.1,
            filename: 'quotation.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(quotationRef.current).save();
    };

    return (
        <div>
            <div ref={quotationRef}>

                <div style={{
                    background: "url(/images/bg.jpg)",
                    height: "160px",
                    backgroundSize: "cover"
                }}>
                    <div style={{
                        margin: "auto",
                        width: "fit-content",
                        display: "flex",
                        gap: "10px",

                    }}>
                        <div id="leftImage" style={{
                            display: "flex",
                            aligItems: "center",
                            width: "80px",
                            height: "80px",
                            justifyContent: "center",
                            background: "transparent",
                            overflow: "hidden",
                            borderRadius: "0 0 20px 20px",
                            position: "relative",
                        }}>
                            <Image src="/images/Logo.png" alt="logo image" fill className="object-cover" />
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                        }} >
                            <h1 style={{
                                fontSize: "40px",
                                color: "white",
                                border: "1px solid black",
                                fontWeight: "bold",
                            }}>NextGen safe n secure </h1>
                            <p style={{
                                backgroundColor: "orangered",
                                color: "white",
                                fontSize: "20px",
                                width: "100%",
                                textAlign: "center",
                                letterSpacing: "1px",
                            }}>Car Transport packers and movers Services</p>
                        </div>

                    </div>
                    <hr />
                    <div>

                    </div>
                </div>


            </div>




            <button
                onClick={handleDownload}
                className='bg-blue-600 text-white px-4 p-1 ml-5'>
                Download PDF
            </button>
        </div >
    )
}

export default Quotation