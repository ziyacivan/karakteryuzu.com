"use client";

import {
  Button,
  Code,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Server } from "./utils/enums";
import { serverList } from "./utils/servers";
import { Converter } from "./utils/converters";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [appearanceCode, setAppearanceCode] = useState<string>("");

  const onClick = async () => {
    if (!appearanceCode) {
      toast.error("🚨 Karakter yüz kodu boş bırakılamaz!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        style: { fontSize: 14 },
      });
    }

    const detectedServer = await Converter.detectServer(appearanceCode);
    const baseFormat = await Converter.convertToBaseFormat(
      detectedServer,
      appearanceCode
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="ml-auto">
            <h1 className="text-2xl font-bold">
              Yeni bir sunucuya mı geçiyorsunuz?
              <br />{" "}
              <span className="font-thin text-base">
                Kopyala ve yapıştır, karakter yüzünü bir tıkla dilediğin
                sunucuya taşı!
              </span>
            </h1>
            <Divider className="mt-4" />
            <Textarea
              className="mt-4"
              isRequired
              label="Karakter Yüzü"
              placeholder="Karakter yüzüne ait kodu girin"
              onChange={(e) => setAppearanceCode(e.target.value)}
            />
            <Select
              className="mt-4"
              label="Hedef sunucuyu seçin"
              disabledKeys={[Server.VINEWOOD.toString()]}
            >
              {serverList.map((server) => (
                <SelectItem key={server.key} value={server.key}>
                  {server.label}
                </SelectItem>
              ))}
            </Select>
            <Button
              className="mt-4"
              color="primary"
              variant="shadow"
              onClick={onClick}
            >
              Çevir
            </Button>
          </div>
          <div>
            <span className="text-sm font-thin">
              ℹ️ Karakter yüzü çevirme işlemlerinde, aktif oynadığınız sunucudan
              aldığınız kod, özel modeller ve özellikler içerebilir. Bu nedenle,
              çevirme işlemi sonucunda geçiş yaptığınız sunucuda bu modeller ve
              özellikleri tekrar düzenlemeniz gerekebilir.
            </span>{" "}
            <br />
            <br />
            <span className="text-sm font-thin">
              <span className="font-bold">Kabul edilen formatlar:</span> Vice
              Online, Rina:V, Menyoo / GTA:World
            </span>
            <iframe
              className="mt-4 rounded-lg"
              src="https://discord.com/widget?id=1279828773780455507&theme=dark"
              width="350"
              height="200"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-sm">
                    Çıktı Hazır!
                  </ModalHeader>
                  <ModalBody className="text-sm">
                    <Code className="text-sm"></Code>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
