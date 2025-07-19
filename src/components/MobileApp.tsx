import Container from "../components/Container";
import google from "../assets/google-play.svg";
import apple from "../assets/app-store.svg";
import apkOne from "../assets/images/apk1.png";
import apkTwo from "../assets/images/apk2.png";

const MobileApp = () => {

  return (
    <section className="mobile-app bg-[#597C9A] pt-20 gap-6 text-white">
      <Container>
        <div className="md:flex gap-[40px] justify-center" >
          <div className="flex flex-col  md:w-1/3">
            <h2 className="text-[32px] font-semibold">Мобильное приложение</h2>
            <p className="text-[16px] mt-8 mb-8">
              Теперь оформить страховку можно не только дома за компьютером,
              но и в дороге, в очереди, на прогулке, в общественном транспорте —
              в любое время, в любом месте, где есть Интернет.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#fff] rounded-lg"
              >
                <img
                  src={google}
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={apple}
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
            </div>
          </div>
          <div className="mt-[110px]">
            <div className="flex gap-5 justify-center">
              <img
                src={apkOne}
                alt="App Screenshot 1"
                  className="w-[130px] md:w-[240px]"
              />
              <img
                src={apkTwo}
                alt="App Screenshot 2"
                  className="w-[130px] object-contain md:w-[240px]  mt-[70px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MobileApp;
