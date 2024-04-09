import Image from "next/image";
import { Card } from "./ui/card";

const Header = () => {
  return (
    <div className="w-full 3xl:max-w-7xl mx-auto">
      <Card className="flex items-center justify-center py-4 drop-shadow-xl w-full">
        <Image
          src="/logoTxt.svg"
          alt="UNIHIVE"
          width={0}
          height={0}
          sizes="100vw"
          className="w-52 h-auto"
        />
      </Card>
    </div>
  );
};

export default Header;
