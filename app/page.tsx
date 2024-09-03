/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Button,
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
import { disabledServerList, serverList } from "./utils/servers";
import {
  Converter,
  LSCBaseConverter,
  MenyooConverter,
  RinaConverter,
  ViceConverter,
} from "./utils/converters";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [appearanceCode, setAppearanceCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [selectedServer, setSelectedServer] = useState(Server.UNKNOWN);

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

    if (selectedServer === Server.UNKNOWN) {
      toast.error("🚨 Hedef sunucu seçilmedi!", {
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
    try {
      const baseFormat = await Converter.convertToBaseFormat(
        detectedServer,
        appearanceCode
      );

      let convertedCode;
      switch (selectedServer) {
        case Server.VICE:
          convertedCode = await ViceConverter.convertSelf(baseFormat);
          setOutputCode(JSON.stringify(convertedCode, null, 2));
          break;
        case Server.RINA:
          convertedCode = await RinaConverter.convertSelf(baseFormat);
          setOutputCode(JSON.stringify(convertedCode, null, 2));
          break;
        case Server.MENYOO:
          try {
            convertedCode = await MenyooConverter.convertSelf(baseFormat);
            setOutputCode(convertedCode);
          } catch (error) {
            toast.error("🚨 Karakter yüzü çevirilirken bir hata oluştu!", {
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
            return;
          }
          break;
        case Server.LSC_BASE:
          convertedCode = await LSCBaseConverter.convertSelf(baseFormat);
          setOutputCode(JSON.stringify(convertedCode, null, 2));
        default:
          break;
      }

      onOpen();

      toast.success("🎉 Karakter yüzü başarıyla çevrildi ve kopyalandı!", {
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

      navigator.clipboard.writeText(outputCode);
    } catch (error) {
      toast.error("🚨 Karakter yüzü çevirilirken bir hata oluştu!", {
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
      return;
    }
  };

  const onCopyClick = () => {
    if (outputCode) {
      navigator.clipboard.writeText(outputCode);
      toast.success("🎉 Karakter yüzü başarıyla kopyalandı!", {
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="ml-auto">
            <div style={{ marginLeft: 140 }}>
              <img src="./weblogo.PNG" />
            </div>
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
              disabledKeys={disabledServerList}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedServer(Number(event.target.value) as Server)
              }
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
              Online, Rina:V, Menyoo / GTA:World, LSC Base (Beyond:V)
            </span>
            <iframe
              className="mt-4 rounded-lg"
              src="https://discord.com/widget?id=1279828773780455507&theme=dark"
              width="350"
              height="200"
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            ></iframe>
            <div className="mt-4 text-sm font-thin">
              Developed by{" "}
              <a
                href="https://github.com/ziyacivan"
                className="text-blue-400"
                target="_blank"
              >
                <span className="font-bold">inkedev</span>
              </a>{" "}
              with ❤️
            </div>
            <div className="mt-2" style={{ display: "inline-block", position: "relative", overflow: "hidden" }}>
            <a href="https://www.buymeacoffee.com/ziyacivan" target="_blank">
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style={{
                    height: "40px !important",
                    width: "150px !important",
                  }}
                />
              </a>
            </div>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-sm">
                    Çıktı Hazır!
                  </ModalHeader>
                  <ModalBody className="text-sm">
                    <Textarea disabled value={outputCode} />
                    <Button
                      className="mt-2"
                      color="primary"
                      variant="solid"
                      onClick={onCopyClick}
                    >
                      Kopyala
                    </Button>
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
