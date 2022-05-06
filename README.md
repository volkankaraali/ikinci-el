# ikinci-el [livedemo](https://ikinci-el.netlify.app)

|Bağımlılıklar|Dosya Yapısı|
|--|--|
|chakra ui| components|
| mantine| constants|
|axios|context|
| formik| hooks|
| yup| images|
| reac-router-dom| [pages](#Pages)|
| react-dropzone|scss
| sass|services
| |app.js
| |index.js
| |chakraCustomtheme

---
## Proje Özeti
Proje, toplamda 5 ekrandan oluşmaktadır. 2 tanesi için sadece giriş yapmış kullanıcının erişimi olması gerekmekte. Bu nedenle, sayfaların
yönlendirilmesi için **reac-router-dom** kullanıldı. Ekran tasarımları için; **scss**, **chakra ui** ve **mantine** kullanıldı. 
2 tane ekran için kullanıcı kontrolü RequireAuth.js componenti içerinde yapılmakta. cookie içerisinde token olması durumunda kullanıcı giriş yapmış sayılmakta.
cookie'nin temizlenmesi için bir kısıtlama bulunmuyor. Kullanıcı, hesabım sayfasından çıkış yapmadığı sürece giriş yapmış sayılır. Giriş yapmamış kullanıcı,
herhangi bir ürüne satın alma veya teklif vermesine izin verilmez, ekranda hata mesajı ile karşılaşır. Üye Girişi ve Kayıt Ol ekranları, kullanıcı giriş yapmış ise
ana sayfaya yönlendirme yapmaktadır. 
