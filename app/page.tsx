import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="d-flex justify-content-center vh-90 align-items-center">
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-6">
                        Welcome to the chat app!
                    </div>
                    <div className="col-xs-6">
                        <Link href="dashboard">Enter -{">"}</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
