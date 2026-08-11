import Image from "next/image";

export default function Header() {
    return (
        <header className="h-[60px] border-b border-gray-200"> 
            <div className="mx-auto flex h-full w-full max-w-[1200px] px-5 py-3">
                <Image
                    src="/images/logo.png"
                    alt="doit_logo"
                    width={151}
                    height={40}
                />
            </div>
        </header>
    );
}



