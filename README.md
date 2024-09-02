## karakteryuzu.com

**karakteryuzu.com**, herhangi bir kâr amacı gütmeden, piyasada aktif bulunan bazı sunucular tarafından desteklenen, sunucudan sunucuya karakter yüzlerinin çevrilebilmesini sağlayan, her formattan veri kabul eden ve her formata çeviren, tamamen ücretsiz ve bağımsız bir araçtır. Herhangi bir yükleme gerektirmez, kopyala ve yapıştır hızında gerekli çevirme işlerini gerçekleştirir.

Not: Bu bir hobi projedir, tüm sunucu geliştiricilerinin katkısına açıktır. Kod kalitesinden rahatsız olursanız veya bir hata tespit ederseniz, yeni bir özellik getirmek isterseniz, pull-request oluşturmanız yeterlidir.

Credits:

- [Play:V Freeroam (Menyoo Import/Export)](https://github.com/MyHwu9508/PlayVFreeroam)
- [Manifesto & Flaviano (Karakter Yüzü Kodu)](https://vice-online.com/anasayfa/)

### Nasıl kullanılır?

Kullanımı çok basit, internet sitesine gittikten sonra desteklenen sunuculardan herhangi birisinin (buna Menyoo dahil) karakter yüz kodunu yapıştırın ve hedef çıktıyı seçin, bağlantı hızına bağlı olarak beş saniye içerisinde çıktınız hazır.

### Sunucu ekleme

Sunucu ekleme işlemleri için Discord ID: inkedev üzerinden ulaşabilirsiniz. Herhangi bir teknik destek almadan eklenmesi için aşağıda yer alan rehberi takip ederek `pull-request` oluşturabilir, geliştirici tarafından onaylanması sonrasında sisteme dahil olabilirsiniz.

#### 1. Projeyi fork edin

https://github.com/ziyacivan/karakteryuzu/fork bağlantısını kullanarak projeyi fork edebilirsiniz.

#### 2. Sunucu listesi tanımlamasını yapın

`app/utils/servers.ts` path'i içerisinde yer alan `serverList` değişkenini güncelleyerek kendi sunucunuzu listeye dahil edin.

Örnek kod:

```ts
export const serverList = [
  {
    key: Server.VICE,
    label: "Vice Online",
  },
  {
    key: Server.RINA,
    label: "Rina:V",
  },
  {
    key: Server.MENYOO,
    label: "Menyoo / GTA:World",
  },
  {
    key: Server.VINEWOOD,
    label: "Vinewood:V",
    isActive: false,
  },
  {
    key: Server.NEW_SERVER, // Yeni eklenen
    label: "New Server",
  },
];
```

`app/utils/enums.ts` path'ine giderek, `Server` tanımlamasını güncelleyin:

Örnek kod:

```ts
export enum Server {
  VICE = 1,
  RINA = 2,
  MENYOO = 3,
  VINEWOOD = 4,
  UNKNOWN = 5,
  NEW_SERVER = 6, // Yeni eklenen
}
```

#### 3. Converter Güncellemesi

`app/utils/converters.ts` path'inde yer alan `Converter` sınıfının `detectServer` method'u, karakter yüzünün hangi sunucuya ait olduğunu tespit etmektedir. Fonksiyonun içeriğini güncelleyerek, kendi karakter yüzünüze ait benzersiz anahtarı belirterek, `Server` enum tanımlaması içerisinde yaptığınız değeri döndürün.

Örnek kod:

```ts
public static async detectServer(appearanceCode: string): Promise<Server> {
  ...
  if (typeof appearanceCode === "object" && "unique-key" in appearanceCode) {
    return Server.NEW_SERVER
  }
  ...
}
```

#### 4. Base Format Güncellemesi

`app/utils/converters.ts` path'inde yer alan `convertToBaseFormat` method'u, herhangi bir sunucudan gelen formatın, karakteryuzu.com standart formatına çevrilmesini sağlar. Standart formata çevrilmesinin nedeni, çıktı alınacak formata belirli kurallandırmalara göre çevrilmesini sağlamaktır.

Kod içerisinde yer alan `switch-case` tanımında yeni eklediğiniz sunucunun tanımlamasını yaparak, kendinize ait `Converter` sınıfının `convertToBaseFormat` method'una yönlendirme gerçekleştirmelisiniz.

Örnek kod:

```ts
switch(from) {
  ...
  case Server.NEW_SERVER:
    return await NewServerConverter.convertToBaseFormat(appearanceCode);
  ...
}
```

#### 5. Yeni Convert Sınıfının Tanımlanması

Her sunucu için tanımlanan `Convert` sınıflar, kendi içerisinde standart olarak iki method taşımalıdır. Bunlar sırası ile karakteryuzu.com formatına çevrimi sağlayan `convertToBaseFormat` ve karakteryuzu.com formatını kendi sunucu formatına çevirmesini sağlayan `convertSelf` method'ları.

Basitliği ve pratikliği sebebi ile `ViceConverter` sınıfı örnek kod olarak incelenebilir, ilgili path: `app/utils/converters.ts:54`

https://github.com/ziyacivan/karakteryuzu/blob/75ffbe3c126e2166e54b528d9837419f789890e9/app/utils/converters.ts#L54

#### 6. Pull-request

Fork ettiğiniz projeden, ana repository olan "karakteryuzu" repo'suna pull-request oluşturduktan sonra, onaylanması için geliştiriciye ulaşabilirsiniz. Doküman içerisinde zor görünebilen entegrasyon, pratik ettikçe kolaylaşacaktır. Herhangi bir teknik sorun yaşanması durumunda, Discord sunucusu üzerinden ulaşabilirsiniz.
