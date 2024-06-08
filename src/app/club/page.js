import Arsenal from "../../../public/img/arsenal_img.png";
import Stadium from "../../../public/icons/stadium_icon.png";
import StadiumCapacity from "../../../public/icons/stadiumCapacity_icon.png";
import Stadium_img from "../../../public/img/stadium_img.jpg";
import Manager from "../../../public/img/manager_img.png";
import Home from "../../../public/img/home_img.png";
import Away from "../../../public/img/away_img.png";
import Third from "../../../public/img/third_img.png";
import Trophy from "../../../public/icons/trophy.png";
import Map from "../../components/Map/map";

export default function ClubPage() {
  return (
    <main className="h-fit space-y-20">
      <div className="rounded-lg ">
        <h2 className="text-4xl font-extrabold mb-2 uppercase">History</h2>
        <p className="text-2xl text-justify text-black text-opacity-50">
          Arsenal have played in the top division of English football since
          1913, which is the longest unbroken run in the history of English
          football. Arsenal are the
          <span className="text-red-500"> only team </span>
          to have finished a Premier League season undefeated (2003/04).
        </p>
      </div>
      <div className="text-black font-semibold rounded-lg  grid grid-cols-2 gap-2">
        <div>
          <h2 className="text-4xl font-extrabold uppercase">Nickname</h2>
          <h2 className="font-extrabold text-8xl mb-8  text-[#E63946]">
            The Gunners
          </h2>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold uppercase">Founded</h2>
          <h2 className="font-extrabold text-8xl mb-8  text-[#E63946]">1886</h2>
        </div>
      </div>
      <div className="text-black grid grid-cols-2 gap-2 rounded-lg bg-[#f9f9f9] h-72 overflow-hidden ">
        <div className="flex items-center justify-center">
          <img src={Arsenal.src} alt="Arsenal" className="block w-32 h-auto" />
        </div>
        <div className="p-4 text-white ">
          <div className="rounded-lg bg-[#17263b] p-8">
            <h2 className="uppercase text-2xl font-semibold mb-2">logo</h2>
            <p className="text-2xl text-justify text-white text-opacity-80">
              Arsenal's logo reflects its roots in Woolwich, home to several
              military hospitals, the Royal Arsenal, and the Royal Artillery
              Regiment.
            </p>
          </div>
        </div>
      </div>
      <div className="text-white font-semibold grid grid-cols-2 gap-2 rounded-lg  p-4">
        <div className=" space-y-8">
          <div>
            <h2 className="uppercase rounded-lg text-2xl font-semibold text-black">
              stadium
            </h2>
            <h2 className="text-red-500 font-extrabold capitalize text-8xl">
              Emirates Stadium
            </h2>
          </div>
          <div className="bg-[#17263b] grid grid-cols-2 gap-2 p-6 rounded-lg mr-4">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div>
                  <img
                    src={Stadium.src}
                    alt="Stadium"
                    className="block w-20 h-auto"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-white">Stadium location</p>
                  <p className="font-semibold text-white">
                    Hornsey Rd, London N7 7AJ, UK
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div>
                  <img
                    src={StadiumCapacity.src}
                    alt="StadiumCapacity"
                    className="block w-20 h-auto"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-white">Stadium capacity</p>
                  <p className="font-semibold text-white">59,867</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row-reverse">
            <img
              src={Stadium_img.src}
              alt="Stadium_img"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="text-white font-semibold grid grid-cols-2 gap-2 rounded-lg ">
        <div>
          <img src={Manager.src} alt="Manager" className="w-full rounded-lg" />
        </div>
        <div className="rounded-lg p-3 text-black font-semibold">
          <h2 className="uppercase rounded-lg text-2xl font-semibold text-black">
            Manager
          </h2>
          <h2 className="text-red-500 font-extrabold capitalize text-8xl">
            Mikel Arteta
          </h2>
          <h2>
            Start on <span className="text-red-500">December 2019</span> 
          </h2>
        </div>
      </div>
      <div className="p-4 rounded-lg ">
        <div className="grid grid-cols-4 gap-4 h-72">
          <div className="bg-transparent">
            <h2 className="font-semibold text-2xl uppercase">Kits</h2>
            <h2 className="text-red-500 text-7xl font-extrabold">
              2023 / 2024
            </h2>
          </div>
          <div className="bg-[#f9f9f9] flex items-center justify-center col-span-3 rounded-lg p-4">
            <div className="w-full grid grid-cols-3 gap-4">
              <div className="flex items-center justify-center">
                <img src={Home.src} alt="Home" className="w-2/4 rounded-lg" />
              </div>
              <div className="flex items-center justify-center">
                <img src={Away.src} alt="Away" className="w-2/4 rounded-lg" />
              </div>
              <div className="flex items-center justify-center">
                <img src={Third.src} alt="Third" className="w-2/4 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="font-semibold text-2xl uppercase">Honours</h2>
        <div className="bg-[#17263b] p-4 rounded-lg grid grid-cols-5 gap-5 h-72 text-white font-semibold">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p>First Division Champions:</p>
              <p>13 times</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p>FA Cup Winners:</p>
              <p>14 times (a record)</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p>League Cup Winners:</p>
              <p>1986/87 & 1992/93</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p>UEFA Cup Winners:</p>
              <p>1993/94</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={Trophy.src}
                alt="Trophy"
                className="w-2/4 rounded-lg mb-4"
              />
              <p>Premier League best finish:</p>
              <p>1997/98, 2001/02 & 2003/04</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg ">
        <h2 className="uppercase font-semibold text-2xl">
          Where is <span className="text-red-500">Arsenal?</span>
        </h2>
        <div className="rounded-lg overflow-hidden">
          <div className="h-72">
            <div className="flex items-center justify-center">
              <Map />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg">
          Credit to&nbsp;
          <a
            href="https://premierskillsenglish.britishcouncil.org/clubs/arsenal#:~:text=Arsenal%20was%20formed%20in%201886,the%20top%20level%20since%201913."
            target="_blank"
            className="font-semibold"
          >
            premierskillenglish&nbsp;
          </a>
          and&nbsp;
          <a
            href="https://www.premierleague.com/home"
            target="_blank"
            className="font-semibold"
          >
            premierleague
          </a>
        </p>
      </div>
    </main>
  );
}
